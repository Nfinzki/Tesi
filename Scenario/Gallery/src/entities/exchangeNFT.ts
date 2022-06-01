import { getProvider } from "@decentraland/web3-provider";
import RequestManager, { ContractFactory } from "eth-connect";
import NFT_ABI from "src/contracts/NFT_ABI";
import { ChangedExchange, ChangedForSale, currentUserAddress, marketplaceAddress, NewOwnerText, nullAddress, sceneMessageBus } from "src/resources";
import { LabledNFT } from "./labeledNFT";

export class ExchangeNFT extends LabledNFT {
    selectedText: TextShape;
    contractAddress: string;
    tokenId: number;

    constructor(imagePath: string, position: Vector3, rotation: Quaternion, addressRotation: Quaternion, contractAddress: string, tokenId: number, abi: any, num: number) {
        super(imagePath, position, rotation);

        this.contractAddress = contractAddress;
        this.tokenId = tokenId;

        let textPosition = new Transform({ position: position.clone(), rotation: addressRotation});
        textPosition.position.y -= 0.7;

        let forSalePosition = new Transform({position: position.clone()});
        forSalePosition.position.y += 0.7;

        //Create "Selected" entity
        const selected = new Entity();
        this.selectedText = new TextShape("Selected for the exchange");
        this.selectedText.fontSize = 3;
        this.selectedText.color = Color3.Green();
        this.selectedText.visible = false;
        selected.addComponent(this.selectedText);
        selected.addComponent(forSalePosition);
        engine.addEntity(selected);

        executeTask(async () => {
            const provider = await getProvider();
            const requestManager = new RequestManager(provider)
            const factory = new ContractFactory(requestManager, abi);
            const contract = (await factory.at(contractAddress)) as any

            let ownerAddress = await contract.ownerOf(tokenId);
            
            const nftOwner = new Entity();
            const textComponent = new TextShape(ownerAddress);
            textComponent.fontSize = 1;
            textComponent.color = Color3.Black();
            nftOwner.addComponent(textComponent)
            nftOwner.addComponent(textPosition)
            engine.addEntity(nftOwner);

            const approvedAddress = await contract.getApproved(tokenId);
            if (approvedAddress.toLocaleLowerCase() != nullAddress)
                this.selectedText.visible = true;

            this.nftImage.addComponent(new OnPointerDown(async (e) => {
                if (currentUserAddress.toLocaleLowerCase() === ownerAddress.toLocaleLowerCase()) {
                    if (!this.selectedText.visible) {
                        //Approve Marketplace
                        log(await contract.approve(marketplaceAddress, tokenId, {from: currentUserAddress}));
                    } else {
                        //Revoke approval
                        await contract.approve(nullAddress, tokenId, {from: currentUserAddress});
                    }

                    this.selectedText.visible = !this.selectedText.visible;
                    const syncMsg: ChangedExchange = {
                        exchange: this.selectedText.visible,
                        num: num
                    }
                    sceneMessageBus.emit("changedExchange", syncMsg);
                }
            }, {
                button: ActionButton.POINTER
            },
            ))
        })
    }

    getSelected() : boolean {
        return this.selectedText.visible;
    }

    getContractAddress() : string {
        return this.contractAddress;
    }
    
    getTokenId(): number {
        return this.tokenId;
    }
}