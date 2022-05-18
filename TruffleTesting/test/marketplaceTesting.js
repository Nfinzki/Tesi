const Marketplace = artifacts.require("Marketplace");
const MyNFT = artifacts.require("MyNFT")

contract("Testing Marketplace", accounts => {

    it ("Should test the buyNFT", async () => {
        const nftInstance = await MyNFT.new();
        await nftInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

        const marketplaceInstance = await Marketplace.new();
        
        await nftInstance.approve(marketplaceInstance.address, 1, {from: accounts[0]});
        const approved = await nftInstance.getApproved(1);
        assert.equal(approved, marketplaceInstance.address, "The token is not approved");

        await marketplaceInstance.buyNFT(nftInstance.address, 1, {from: accounts[1], value: web3.utils.toWei("1")});
        const owner = await nftInstance.ownerOf(1);
        assert.equal(owner, accounts[1], "The NFT isn't owned by account1");
        
        //Get balance
        const balance = await web3.eth.getBalance(accounts[0]);
        assert.equal(balance - 99987869202869932519, web3.utils.toWei("1"), "The account didn't receive 1 Ether");

    });

    it ("Should test exchange NFT", async () => {
        const nftInstance = await MyNFT.new();
        await nftInstance.mintNFT(accounts[1], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
        await nftInstance.mintNFT(accounts[2], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

        const marketplaceInstance = await Marketplace.new();

        await nftInstance.approve(marketplaceInstance.address, 1, {from: accounts[1]});
        const approved1 = await nftInstance.getApproved(1);
        assert.equal(approved1, marketplaceInstance.address, "The first token is not approved");

        await nftInstance.approve(marketplaceInstance.address, 2, {from: accounts[2]});
        const approved2 = await nftInstance.getApproved(2);
        assert.equal(approved2, marketplaceInstance.address, "The second token is not approved");

        await marketplaceInstance.exchangeNFT(nftInstance.address, 1, nftInstance.address, 2, {from: accounts[2]});
        const firstOwner = await nftInstance.ownerOf(2);
        const secondOwner = await nftInstance.ownerOf(1);
        assert.equal(firstOwner, accounts[1], "The NFT isn't owned by account1");
        assert.equal(secondOwner, accounts[2], "The NFT isn't owned by account2");
    });
});