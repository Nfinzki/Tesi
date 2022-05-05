import { BigNumber } from "eth-connect"
import { currentUserAddress } from "src/resources"
import { acquireNFT } from "src/transactions"

export class LabledNFT {
    
    constructor(imagePath: string, position: Vector3, rotation: Quaternion, ownerAddress: string) {
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
        nftImage.addComponent(new OnPointerDown((e) => {
            //let balance = await getBalance(address);
            //log("Balance: " + balance);
            acquireNFT(currentUserAddress, ownerAddress, "Prova", new BigNumber(5));
        }, {
            button: ActionButton.POINTER
        },
        ))
        engine.addEntity(nftImage)

        let textPosition = new Transform({ position: position.clone()});
        textPosition.position.y -= 0.7;

        const nftOwner = new Entity();
        const textComponent = new TextShape(ownerAddress);
        textComponent.fontSize = 1;
        textComponent.color = Color3.Black();
        nftOwner.addComponent(textComponent)
        nftOwner.addComponent(textPosition)
        engine.addEntity(nftOwner);


    }
}