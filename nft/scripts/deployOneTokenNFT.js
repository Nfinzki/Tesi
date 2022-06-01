async function main() {
    const OneTokenNFT = await ethers.getContractFactory("OneTokenNFT")
  
    // Start deployment, returning a promise that resolves to a contract object
    const oneTokenNFT = await OneTokenNFT.deploy()
    await oneTokenNFT.deployed()
    console.log("Contract deployed to address:", oneTokenNFT.address)
  }
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
  