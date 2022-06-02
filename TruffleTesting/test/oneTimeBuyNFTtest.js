const OneTimeBuyNFT = artifacts.require("OneTimeBuyNFT")
const truffleAssert = require('truffle-assertions');

contract("Testing OneTimeBuyNFT", accounts => {

    it ("Should test the safeTransferFrom", async () => {
        const nftInstance = await OneTimeBuyNFT.new();
        await nftInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

        await nftInstance.safeTransferFrom(accounts[0], accounts[1], 1, {from: accounts[0]});
        const owner = await nftInstance.ownerOf(1);
        assert.equal(owner, accounts[1], "The NFT isn't owned by account1");
        
        await truffleAssert.reverts(
            nftInstance.safeTransferFrom(accounts[1], accounts[0], 1, {from: accounts[0]}),
            "Token already owned"
        );
    });

    // it ("Should test the safeTransferFrom with data", async () => {
    //     const nftInstance = await OneTimeBuyNFT.new();
    //     await nftInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

    //     await nftInstance.safeTransferFrom(accounts[0], accounts[1], 1, {from: accounts[0]});
    //     const owner = await nftInstance.ownerOf(1);
    //     assert.equal(owner, accounts[1], "The NFT isn't owned by account1");
        
    //     await nftInstance.safeTransferFrom(accounts[1], accounts[0], 1, "", {from: accounts[0]});
    // });

    it ("Should test the transferFrom", async () => {
        const nftInstance = await OneTimeBuyNFT.new();
        await nftInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

        await nftInstance.safeTransferFrom(accounts[0], accounts[1], 1, {from: accounts[0]});
        const owner = await nftInstance.ownerOf(1);
        assert.equal(owner, accounts[1], "The NFT isn't owned by account1");
        
        await truffleAssert.reverts(
            nftInstance.transferFrom(accounts[1], accounts[0], 1, {from: accounts[0]}),
            "Token already owned"
        );
    });
});