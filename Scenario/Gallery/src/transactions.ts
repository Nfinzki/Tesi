import { requirePayment } from "@decentraland/EthereumController";
import RequestManager, { BigNumber, ContractFactory } from 'eth-connect';
import { currentUserAddress, currency, price, sceneMessageBus, TransactionRequest, TransactionResponse, NewOwnerText } from "src/resources"
import NFT_ABI from "src/contracts/NFT_ABI";
import { getProvider } from "@decentraland/web3-provider";

let addressOwner: TextShape
let contractAddr: string
export function acquireNFT(from: string, to: string, contractAddress: string, tokenId: number, owner: TextShape) {
    addressOwner = owner;
    contractAddr = contractAddress;
    
    if (from.toLowerCase() === owner.value.toLowerCase()) return;
    
    const message: TransactionRequest = {
        senderAddress: from,
        receiverAddress: to,
        contractAddress: contractAddress,
        tokenId: tokenId
    }

    sceneMessageBus.emit("acquire", message);
    log("Sent acquire message")
}

sceneMessageBus.on("acquire", (message: TransactionRequest) => {
    if (message.senderAddress.toLowerCase() !== currentUserAddress.toLowerCase()) {
        log("Received acquire request")

        const response: TransactionResponse = {
            senderAddress: message.receiverAddress,
            receiverAddress: message.senderAddress,
            price: price,
            status: "NFT sent"
        }

        executeTask(async () => {
            const provider = await getProvider();
            const requestManager = new RequestManager(provider);
    
            const factory = new ContractFactory(requestManager, NFT_ABI);
            const contract = (await factory.at(message.contractAddress)) as any
    
            
            const res = await contract.safeTransferFrom(
                currentUserAddress,
                message.senderAddress,
                message.tokenId,
                {from: currentUserAddress}
            )
            
            sceneMessageBus.emit("requirePayment", response);
            log("Sent NFT sent")
        })
    }
})

sceneMessageBus.on("requirePayment", (message: TransactionResponse) => {
    if (message.senderAddress.toLowerCase() !== currentUserAddress.toLowerCase()) {
        
        if (message.status === "NFT sent") {
            log("Received requirePayment")
            payment(message.senderAddress, message.price, currency);

            const response: NewOwnerText = {
                newOwner: message.receiverAddress
            }
            sceneMessageBus.emit("updateOwnerText", response);
        }
    }
})

sceneMessageBus.on("updateOwnerText", (message: NewOwnerText) => {
    addressOwner.value = message.newOwner;
})

function payment(to: string, price: number, currency: string) {
    executeTask(async () => {
        try {
            await requirePayment(to, price, currency);
        } catch {
            log("Payment failed");
        }
    })
}

