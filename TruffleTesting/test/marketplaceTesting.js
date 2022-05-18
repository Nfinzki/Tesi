const Marketplace = artifacts.require("Marketplace");
const MyNFT = artifacts.require("MyNFT")

contract("Testing Marketplace", accounts => {

    it ("Should test the buyNFT", async () => {
        const nftInstance = await MyNFT.new();
        await nftInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

        const marketplaceInstance = await Marketplace.new();
        
        await nftInstance.approve(marketplaceInstance.address, 1, {from: accounts[0]});
        const approved = await nftInstance.getApproved(1);
        assert.equal(approved, marketplaceInstance.address, "Prova");
        
        await marketplaceInstance.buyNFT(nftInstance.address, 1, {from: accounts[1], value: "1"});

        const owner = await nftInstance.ownerOf(1);

        assert.equal(owner, accounts[1], "Prova2");

    });

    // if ("Should test exchange NFT", async () => {
    //     const nftInstance = await MyNFT.new();
    //     await nftInstance.mintNFT(accounts[1], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
    //     await nftInstance.mintNFT(accounts[2], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
    // });
});