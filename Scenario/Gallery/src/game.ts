import { createTable } from './entities/table';
import { LabledNFT } from './entities/labeledNFT';
import { createWall } from './entities/wall';
import { ChangedExchange, ChangedForSale, ipfsMJ, ipfsSax, ipfsTrumpet, myNFTAddress, oneTimeBuyNFTAddress, oneTokenNFTAddress, sceneMessageBus } from './resources';
import { SellNFT } from './entities/sellNFT';
import { ExchangeNFT } from './entities/exchangeNFT';
import { MintNFT } from './entities/mintNFT';
import { AddressButton } from './ui/addressButton';
import { createButton } from './entities/button';
import OneTimeBuyNFT_ABI from './contracts/OneTimeBuyNFT_ABI';
import OneTokenNFT_ABI from './contracts/OneTokenNFT_ABI';
import NFT_ABI from './contracts/NFT_ABI';

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
    "images/NFT/MJ.jpg",
    new Vector3(1.55, 2, 7),
    Quaternion.Euler(0, -90, 180),
    Quaternion.Euler(0, -90, 0),
    oneTimeBuyNFTAddress,
    ipfsMJ,
    OneTimeBuyNFT_ABI
);

const oneTimeBuyNFT = new MintNFT(
    "images/NFT/trumpet.png",
    new Vector3(1.55, 2, 10),
    Quaternion.Euler(0, -90, 180),
    Quaternion.Euler(0, -90, 0),
    oneTokenNFTAddress,
    ipfsTrumpet,
    OneTokenNFT_ABI
);

const oneTimeBuyNFT2 = new MintNFT(
    "images/NFT/Sax.jpg",
    new Vector3(1.55, 2, 13),
    Quaternion.Euler(0, -90, 180),
    Quaternion.Euler(0, -90, 0),
    oneTokenNFTAddress,
    ipfsSax,
    OneTokenNFT_ABI
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
    1,
    NFT_ABI
);

const exchangeNft1 = new ExchangeNFT(
    "images/NFT/MJ.jpg",
    new Vector3(9, 2, 14.45),
    Quaternion.Euler(0, 0, 180),
    Quaternion.Euler(0, 0, 0),
    oneTimeBuyNFTAddress,
    3,
    OneTimeBuyNFT_ABI,
    0
);

const exchangeNft2 = new ExchangeNFT(
    "images/NFT/trumpet.png",
    new Vector3(13, 2, 14.45),
    Quaternion.Euler(0, 0, 180),
    Quaternion.Euler(0, 0, 0),
    oneTokenNFTAddress,
    1,
    OneTokenNFT_ABI,
    1
);

createButton(exchangeNft1, exchangeNft2);

sceneMessageBus.on("changedForSale", (syncMsg: ChangedForSale) => {
    myNft.forSaleText.visible = syncMsg.forSale;
})

sceneMessageBus.on("changedExchange", (syncMsg: ChangedExchange) => {
    if (syncMsg.num === 0) {
        exchangeNft1.selectedText.visible = syncMsg.exchange;
    } else {
        exchangeNft2.selectedText.visible = syncMsg.exchange;
    }
})