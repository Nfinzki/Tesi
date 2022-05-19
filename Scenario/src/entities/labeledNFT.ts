import { getProvider } from "@decentraland/web3-provider";
import {RequestManager, BigNumber, ContractFactory, fromWei } from "eth-connect"
import NFT_ABI from "src/contracts/NFT_ABI";
import { ChangedForSale, currentUserAddress, sceneMessageBus } from "src/resources"
import { acquireNFT } from "src/transactions"

export class LabledNFT {
    contract: any;
    forSaleText: TextShape;

    constructor(imagePath: string, position: Vector3, rotation: Quaternion, contractAddress: string, tokenId: number) {
        executeTask(async () => {
            const provider = await getProvider();
            const requestManager = new RequestManager(provider)
            const factory = new ContractFactory(requestManager, NFT_ABI);
            const contract = (await factory.at(contractAddress)) as any

            let ownerAddress = await contract.ownerOf(tokenId);
            
            const nftOwner = new Entity();
            const textComponent = new TextShape(ownerAddress);
            textComponent.fontSize = 1;
            textComponent.color = Color3.Black();
            nftOwner.addComponent(textComponent)
            nftOwner.addComponent(textPosition)
            engine.addEntity(nftOwner);

            

            // const balanceWei = await requestManager.eth_getBalance(ownerAddress, "latest");
            // const balance = fromWei(balanceWei, "ether");

            nftImage.addComponent(new OnPointerDown((e) => {
                log("Dati: " + currentUserAddress + "\n" + ownerAddress)
                
                if (currentUserAddress.toLocaleLowerCase() === ownerAddress.toLocaleLowerCase()) {
                    if (!this.forSaleText.visible) {
                        //Approve Marketplace
                    } else {
                        //Approve 0x00000000000
                    }

                    this.forSaleText.visible = !this.forSaleText.visible;
                    const syncMsg: ChangedForSale = {
                        forSale: this.forSaleText.visible
                    }
                    sceneMessageBus.emit("changedForSale", syncMsg);
                } else {
                    //Marketplace.buyNFT
                    
                    //acquireNFT(currentUserAddress, ownerAddress, contractAddress, tokenId, new BigNumber(5), textComponent);
                }
            }, {
                button: ActionButton.POINTER
            },
            ))
        })

        //Create entity and assign shape
        const nftImage = new Entity()
        nftImage.addComponent(new PlaneShape())
        //Create material and configure its fields
        const myMaterial = new BasicMaterial()
        myMaterial.texture = new Texture(imagePath)
        //Assign the material to the entity
        nftImage.addComponent(myMaterial)
        nftImage.addComponent(new Transform({
            position: position,
            rotation: rotation
        }))
        
        engine.addEntity(nftImage)

        let textPosition = new Transform({ position: position.clone()});
        textPosition.position.y -= 0.7;

        let forSalePosition = new Transform({position: position.clone()});
        forSalePosition.position.y += 0.7;

        //Create "For Sale" entity
        const forSale = new Entity();
        this.forSaleText = new TextShape("For sale");
        this.forSaleText.fontSize = 3;
        this.forSaleText.color = Color3.Green();
        this.forSaleText.visible = false;
        forSale.addComponent(this.forSaleText);
        forSale.addComponent(forSalePosition);
        engine.addEntity(forSale);
    }


}