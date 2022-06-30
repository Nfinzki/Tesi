import { getProvider } from "@decentraland/web3-provider";
import RequestManager, { ContractFactory } from "eth-connect";
import Marketplace_ABI from "src/contracts/Marketplace_ABI";
import { currentUserAddress, marketplaceAddress, sceneMessageBus } from "src/resources";
import { ExchangeNFT } from "./exchangeNFT";

export function createButton(nft1: ExchangeNFT, nft2: ExchangeNFT) {
    const button = new Entity();
    engine.addEntity(button);
    button.addComponent(new GLTFShape("models/Square_Button.glb"));
    button.addComponent(new Transform({
        position: new Vector3(15, 2, 14.5),
        rotation: Quaternion.Euler(-90, 0, 0)
    }));

    button.addComponent(new Animator());
    button.getComponent(Animator).addClip(new AnimationState("Button_Action", {looping: false}));

    button.addComponent(new AudioSource(new AudioClip("sounds/button.mp3")));
    
    executeTask(async () => {
        const provider = await getProvider();
        const requestManager = new RequestManager(provider);
        const marketplaceFactory = new ContractFactory(requestManager, Marketplace_ABI);
        const marketplace = (await marketplaceFactory.at(marketplaceAddress)) as any

        button.addComponent(
            new OnPointerDown(async (e) => {
                button.getComponent(Animator).getClip("Button_Action").play();
                button.getComponent(AudioSource).playOnce();
    
                if (nft1.isSelected() && nft2.isSelected()) {
                    log(await marketplace.exchangeNFT(
                        nft1.getContractAddress(),
                        nft1.getTokenId(),
                        nft2.getContractAddress(),
                        nft2.getTokenId(),
                        {from: currentUserAddress})
                    )

                    sceneMessageBus.emit("nftExchanged", {});
                }
            }, {
                button: ActionButton.POINTER
            })
        )
    })
}