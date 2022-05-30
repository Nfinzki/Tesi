import { createTable } from './entities/table';
import { LabledNFT } from './entities/labeledNFT';
import { createWall } from './entities/wall';
import { ChangedForSale, myNFTAddress, sceneMessageBus } from './resources';
import { SellNFT } from './entities/sellNFT';
import { ExchangeNFT } from './entities/exchangeNFT';
import { MintNFT } from './entities/mintNFT';
import { AddressButton } from './ui/addressButton';
import { createButton } from './entities/button';

createTable();

//Mint area
createWall(
    new Vector3(1, 10, 10),
    new Vector3(1, 0, 10),
    "Mint NFTs",
    new Transform({
        position: new Vector3(1.55, 4, 9.5),
        rotation: Quaternion.Euler(0, -90, 0)
    })
);

const oneTokenNft = new MintNFT(
    "images/NFT/BennyTheBull.jpg",
    new Vector3(1.55, 2, 8),
    Quaternion.Euler(0, -90, 180),
    Quaternion.Euler(0, -90, 0),
    myNFTAddress,
    "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB"
);

const oneTimeBuyNFT = new MintNFT(
    "images/NFT/trumpet.png",
    new Vector3(1.55, 2, 11),
    Quaternion.Euler(0, -90, 180),
    Quaternion.Euler(0, -90, 0),
    myNFTAddress,
    "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB"
);


//Marketplace area
createWall(
    new Vector3(15, 10, 1),
    new Vector3(8, 0, 15),
    "Marketplace",
    new Transform({
        position: new Vector3(8, 4, 14.45)
    })
);
    
const myNft = new SellNFT(
    "images/NFT/BennyTheBull.jpg",
    new Vector3(4, 2, 14.45),
    Quaternion.Euler(0, 0, 180),
    Quaternion.Euler(0, 0, 0),
    myNFTAddress,
    1
);

const exchangeNft1 = new ExchangeNFT(
    "images/NFT/BennyTheBull.jpg",
    new Vector3(10, 2, 14.45),
    Quaternion.Euler(0, 0, 180),
    Quaternion.Euler(0, 0, 0),
    myNFTAddress,
    1
);

const exchangeNft2 = new ExchangeNFT(
    "images/NFT/BennyTheBull.jpg",
    new Vector3(13, 2, 14.45),
    Quaternion.Euler(0, 0, 180),
    Quaternion.Euler(0, 0, 0),
    myNFTAddress,
    1
);

createButton(exchangeNft1, exchangeNft2);

sceneMessageBus.on("changedForSale", (syncMsg: ChangedForSale) => {
    myNft.forSaleText.visible = syncMsg.forSale;
})