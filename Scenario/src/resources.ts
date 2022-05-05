import { getUserAccount } from "@decentraland/EthereumController";
import { BigNumber, RequestManager} from 'eth-connect'
import { getProvider } from "@decentraland/web3-provider"

export let currentUserAddress: string;
executeTask(async () => {
    try {
        currentUserAddress = await getUserAccount()
    } catch (error) {
        log("Error")
    }
})

// export async function getBalance(address: string): Promise<BigNumber> {
//     const provider = await getProvider();
//     const requestManager = new RequestManager(provider);

//     return requestManager.eth_getBalance(address, "latest");
// }

export let price = 0.000001;
export const currency = 'ETH';

export function setPrice(newPrice: number) {
    price = newPrice;
}

export const sceneMessageBus = new MessageBus();
export type TransactionRequest = {
    senderAddress: string,
    receiverAddress: string,
    contractAddress: string,
    balance: BigNumber
}
export type TransactionResponse = {
    senderAddress: string,
    receiverAddress: string,
    price: number,
    status: string
}