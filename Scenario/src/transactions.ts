import { requirePayment } from "@decentraland/EthereumController";
import { RequestManager, BigNumber, ContractFactory } from 'eth-connect';
import { currentUserAddress, currency, price, sceneMessageBus, TransactionRequest, TransactionResponse } from "src/resources"
import { getProvider } from "@decentraland/web3-provider"
import NFT_ABI from "src/contracts/NFT_ABI";

let userAddress: string;
export function acquireNFT(from: string, to: string, contract: string, balance: BigNumber) {
    const message: TransactionRequest = {
        senderAddress: from,
        receiverAddress: to,
        contractAddress: contract,
        balance: balance,
    }

    userAddress = from;

    executeTask(async () => {
        const provider = await getProvider();
        const requestManager = new RequestManager(provider);

        const factory = new ContractFactory(requestManager, NFT_ABI);
        const contract = (await factory.at(
            "0x6865582a1402F690EA25FDB5d8601bED0Cb0cA43"
        )) as any

        const prova = await contract.balanceOf("0x30dce1ecc30ca8880ef9bbd2664be7f2a41d0637")
        log("Prova: " + prova)
        const res = await contract.safeTransferFrom(userAddress, "0x30dce1ecc30ca8880ef9bbd2664be7f2a41d0637", 1)
    })
    //sceneMessageBus.emit("acquire", message);
    log("Sent acquire message")
}

sceneMessageBus.on("acquire", (message: TransactionRequest) => {
    if (message.senderAddress !== currentUserAddress) {
        //TODO Controllo sul balance
        log("Received acquire request")

        const response: TransactionResponse = {
            senderAddress: message.receiverAddress,
            receiverAddress: message.senderAddress,
            price: price, //TODO Provvisorio
            status: "NFT sent"
        }

        sceneMessageBus.emit("requirePayment", response);
        log("Sent NFT sent")
    }
})

sceneMessageBus.on("requirePayment", (message: TransactionResponse) => {
    if (message.senderAddress !== currentUserAddress) {
        
        if (message.status === "NFT sent") {
            log("Received requirePayment")
            payment(message.senderAddress, message.price, currency);
        }
    }
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

