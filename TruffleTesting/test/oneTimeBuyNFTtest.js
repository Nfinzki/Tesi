const OneTimeBuyNFT = artifacts.require("OneTimeBuyNFT")

contract("Testing OneTimeBuyNFT", accounts => {

    it ("Should test the safeTransferFrom", async () => {
        const nftInstance = await OneTimeBuyNFT.new();
        await nftInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

        await nftInstance.safeTransferFrom(accounts[0], accounts[1], 1, {from: accounts[0]});
        const owner = await nftInstance.ownerOf(1);
        assert.equal(owner, accounts[1], "The NFT isn't owned by account1");
        
        await nftInstance.safeTransferFrom(accounts[1], accounts[0], 1, {from: accounts[0]});
    });
});