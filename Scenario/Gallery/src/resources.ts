import { getUserAccount } from "@decentraland/EthereumController";
import { BigNumber, RequestManager} from 'eth-connect'
import { getProvider } from "@decentraland/web3-provider"

export const myNFTAddress = "0x6865582a1402F690EA25FDB5d8601bED0Cb0cA43";
export const marketplaceAddress = "0xd95b0D87b7e5531712702fAa7dD227ff29DFdCd8";
export const oneTimeBuyNFTAddress = "0xaFb24f93E8724F163c22FEe42d3b772F1143D9a0";
export const oneTokenNFTAddress = "0xbB59aC8819342d0aF2768715bF86365c95C703bf";
export const nullAddress = "0x0000000000000000000000000000000000000000";

export const ipfsMyNFT = "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB";
export const ipfsMJ = "ipfs://QmTvWLAtfeq3gg6PokA2BjTNUKxNmEVbtosd845MDBuXCD";
export const ipfsSax = "ipfs://QmPCVMAG1dqU3rfnZV8TkNLd6CBwLP6cJAd38Yr6vSRDYg";
export const ipfsTrumpet = "ipfs://QmSvF1mYzRcfZ1Xe46WNz1wQC4E63oCAxW6NxBEaQMkCXG";

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

export type ChangedForSale = {
    forSale: boolean
}