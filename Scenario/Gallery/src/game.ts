import { createTable } from './entities/table';
import { LabledNFT } from './entities/labeledNFT';
import { createWall } from './entities/wall';
import { ChangedForSale, sceneMessageBus } from './resources';

createTable();
createWall();
const nft = new LabledNFT("images/NFT/BennyTheBull.jpg", new Vector3(3, 1.7, 14.45), Quaternion.Euler(0, 0, 180), "0x6865582a1402F690EA25FDB5d8601bED0Cb0cA43", 1);

sceneMessageBus.on("changedForSale", (syncMsg: ChangedForSale) => {
    nft.forSaleText.visible = syncMsg.forSale;
})
