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
    tokenId: number
}
export type TransactionResponse = {
    senderAddress: string,
    receiverAddress: string,
    price: number,
    status: string
}
export type NewOwnerText = {
    newOwner: string
}