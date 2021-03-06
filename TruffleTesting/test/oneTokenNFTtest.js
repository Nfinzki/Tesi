const OneTokenNFT = artifacts.require("OneTokenNFT")
const MyNFT = artifacts.require("MyNFT")
const truffleAssert = require('truffle-assertions');

contract("Testing OneTokenNFT", accounts => {

    it ("Should test the safeTransferFrom", async () => {
        const oneTokenNFTInstance = await OneTokenNFT.new();
        await oneTokenNFTInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
        await oneTokenNFTInstance.mintNFT(accounts[1], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
        
        const myNFTInstance = await MyNFT.new();
        await myNFTInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

        const oneTokenNFTOwned = await oneTokenNFTInstance.balanceOf(accounts[0]);
        assert.equal(oneTokenNFTOwned, 1, "He had more than 1 OneTokenNFT");
        
        await truffleAssert.reverts(
            oneTokenNFTInstance.safeTransferFrom(accounts[0], accounts[1], 1, {from: accounts[0]}),
            "Already owns one NFT of that family"
        );
    });

    // it ("Should test the safeTransferFrom with data", async () => {
    //     const oneTokenNFTInstance = await OneTokenNFT.new();
    //     await oneTokenNFTInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
    //     await oneTokenNFTInstance.mintNFT(accounts[1], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
        
    //     const myNFTInstance = await MyNFT.new();
    //     await myNFTInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

    //     const oneTokenNFTOwned = await oneTokenNFTInstance.balanceOf(accounts[0]);
    //     assert.equal(oneTokenNFTOwned, 1, "He had more than 1 OneTokenNFT");
        
    //     await oneTokenNFTInstance.safeTransferFrom(accounts[0], accounts[1], 1, "", {from: accounts[0]});
    // });

    it ("Should test the transferFrom", async () => {
        const oneTokenNFTInstance = await OneTokenNFT.new();
        await oneTokenNFTInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
        await oneTokenNFTInstance.mintNFT(accounts[1], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
        
        const myNFTInstance = await MyNFT.new();
        await myNFTInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

        const oneTokenNFTOwned = await oneTokenNFTInstance.balanceOf(accounts[0]);
        assert.equal(oneTokenNFTOwned, 1, "He had more than 1 OneTokenNFT");
        
        await truffleAssert.reverts(
            oneTokenNFTInstance.transferFrom(accounts[0], accounts[1], 1, {from: accounts[0]}),
            "Already owns one NFT of that family"
        );
    });

    it ("Should test the mint", async () => {
        const oneTokenNFTInstance = await OneTokenNFT.new();
        await oneTokenNFTInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
        
        await truffleAssert.reverts(
            oneTokenNFTInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB"),
            "Already owns one NFT of that family"
        );
    });
});