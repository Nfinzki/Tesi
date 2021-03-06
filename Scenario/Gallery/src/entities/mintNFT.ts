import { getProvider } from "@decentraland/web3-provider";
import RequestManager, { ContractFactory } from "eth-connect";
import { currentUserAddress } from "src/resources";
import { NFTComponent } from "./NFTComponent";

export class MintNFT extends NFTComponent {
    constructor(imagePath: string, position: Vector3, rotation: Quaternion, addressRotation: Quaternion, contractAddress: string, tokenURI: string, abi: any) {
        super(imagePath, position, rotation);

        let textPosition = new Transform({ position: position.clone(), rotation: addressRotation});
        textPosition.position.y -= 0.7;

        let forSalePosition = new Transform({position: position.clone()});
        forSalePosition.position.y += 0.7;

        executeTask(async () => {
            const provider = await getProvider();
            const requestManager = new RequestManager(provider)
            const factory = new ContractFactory(requestManager, abi);
            const contract = (await factory.at(contractAddress)) as any
            
            const contractAddressEntity = new Entity();
            const textComponent = new TextShape(contractAddress);
            textComponent.fontSize = 1;
            textComponent.color = Color3.Black();
            contractAddressEntity.addComponent(textComponent)
            contractAddressEntity.addComponent(textPosition)
            engine.addEntity(contractAddressEntity);

            this.nftImage.addComponent(new OnPointerDown(async (e) => {
                log("mint Txn", contract.mintNFT(currentUserAddress, tokenURI, {from: currentUserAddress}));
            }, {
                button: ActionButton.POINTER
            },
            ))
        })
    }
}