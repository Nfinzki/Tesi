import { createTable } from './entities/table';
import { LabledNFT } from './entities/labeledNFT';
import { createWall } from './entities/wall';
import { ChangedForSale, sceneMessageBus } from './resources';

createTable();
createWall(
    new Vector3(15, 10, 1),
    new Vector3(8, 0, 15),
    "Marketplace",
    new Transform({
        position: new Vector3(8, 4, 14.45)
    })
);

createWall(
    new Vector3(1, 10, 10),
    new Vector3(1, 0, 10),
    "Buy NFTs",
    new Transform({
        position: new Vector3(1.6, 4, 10),
        rotation: Quaternion.Euler(0, -90, 0)
    })
);

const nft = new LabledNFT(
    "images/NFT/BennyTheBull.jpg",
    new Vector3(4, 2, 14.45),
    Quaternion.Euler(0, 0, 180),
    "0x6865582a1402F690EA25FDB5d8601bED0Cb0cA43",
    1
);

sceneMessageBus.on("changedForSale", (syncMsg: ChangedForSale) => {
    nft.forSaleText.visible = syncMsg.forSale;
})
