const OneTokenNFT = artifacts.require("OneTokenNFT")
const MyNFT = artifacts.require("MyNFT")

contract("Testing OneTokenNFT", accounts => {

    it ("Should test the safeTransferFrom", async () => {
        const oneTokenNFTInstance = await OneTokenNFT.new();
        await oneTokenNFTInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
        await oneTokenNFTInstance.mintNFT(accounts[1], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");
        
        const myNFTInstance = await MyNFT.new();
        await myNFTInstance.mintNFT(accounts[0], "ipfs://QmSgNUUUGciW3y5RrzrH3FVvUN4PErd3VUYcVKEwmjW1xB");

        const oneTokenNFTOwned = await oneTokenNFTInstance.balanceOf(accounts[0]);
        assert.equal(oneTokenNFTOwned, 1, "He had more than 1 OneTokenNFT");
        
        await oneTokenNFTInstance.safeTransferFrom(accounts[0], accounts[1], 1);
    });
});