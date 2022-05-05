import { createTable } from './entities/table';
import { LabledNFT } from './entities/labeledNFT';
import { createWall } from './entities/wall';

createTable();
createWall();
new LabledNFT("images/NFT/StefaMind.jpg", new Vector3(3, 1.7, 14.45), Quaternion.Euler(0, 0, 180), "0x057090d040197b75810e4f251b8315bf842f09f0")
