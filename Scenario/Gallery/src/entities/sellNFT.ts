import { getProvider } from "@decentraland/web3-provider";
import { RequestManager, ContractFactory, toWei } from "eth-connect";
import Marketplace_ABI from "src/contracts/Marketplace_ABI";
import { ChangedForSale, currentUserAddress, marketplaceAddress, NewOwnerText, nullAddress, sceneMessageBus } from "src/resources";
import { NFTComponent } from "./NFTComponent";

export class SellNFT extends NFTComponent {
    forSaleText: TextShape;

    constructor(imagePath: string, position: Vector3, rotation: Quaternion, addressRotation: Quaternion, contractAddress: string, tokenId: number, abi: any) {
        super(imagePath, position, rotation);

        let textPosition = new Transform({ position: position.clone(), rotation: addressRotation});
        textPosition.position.y -= 0.7;

        let forSalePosition = new Transform({position: position.clone()});
        forSalePosition.position.y += 0.7;

        //Create "For Sale" entity
        const forSale = new Entity();
        this.forSaleText = new TextShape("For sale - 0.5 ETH");
        this.forSaleText.fontSize = 3;
        this.forSaleText.color = Color3.Green();
        this.forSaleText.visible = false;
        forSale.addComponent(this.forSaleText);
        forSale.addComponent(forSalePosition);
        engine.addEntity(forSale);

        executeTask(async () => {
            const provider = await getProvider();
            const requestManager = new RequestManager(provider)
            const factory = new ContractFactory(requestManager, abi);
            const contract = (await factory.at(contractAddress)) as any

            const marketplaceFactory = new ContractFactory(requestManager, Marketplace_ABI);
            const marketplace = (await marketplaceFactory.at(marketplaceAddress)) as any

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
                this.forSaleText.visible = true;

            this.nftImage.addComponent(new OnPointerDown(async (e) => {
                if (currentUserAddress.toLocaleLowerCase() === ownerAddress.toLocaleLowerCase()) {
                    if (!this.forSaleText.visible) {
                        //Approve Marketplace
                        log("approve sell txn: ", await contract.approve(marketplaceAddress, tokenId, {from: currentUserAddress}));
                    } else {
                        //Revoke approval
                        await contract.approve(nullAddress, tokenId, {from: currentUserAddress});
                    }

                    this.forSaleText.visible = !this.forSaleText.visible;
                    const syncMsg: ChangedForSale = {
                        forSale: this.forSaleText.visible
                    }
                    sceneMessageBus.emit("changedForSale", syncMsg);
                } else {
                    if (this.forSaleText.visible) {
                        //Marketplace.buyNFT
                        log("buyNFT txn: ", await marketplace.buyNFT(contractAddress, tokenId, {from: currentUserAddress, value: toWei("0.5", "ether")}));
                        
                        const response: NewOwnerText = {
                            newOwner: currentUserAddress
                        }
                        sceneMessageBus.emit("updateOwnerText", response);
                        
                        this.forSaleText.visible = false;
                        const syncMsg: ChangedForSale = {
                            forSale: this.forSaleText.visible
                        }
                        sceneMessageBus.emit("changedForSale", syncMsg);
                        // acquireNFT(currentUserAddress, ownerAddress, contractAddress, tokenId, textComponent);
                    }
                }
            }, {
                button: ActionButton.POINTER
            },
            ))
        })
    }
}