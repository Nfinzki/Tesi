async function main() {
    const OneTimeBuyNFT = await ethers.getContractFactory("OneTimeBuyNFT")
  
    // Start deployment, returning a promise that resolves to a contract object
    const oneTimeBuyNFT = await OneTimeBuyNFT.deploy()
    await oneTimeBuyNFT.deployed()
    console.log("Contract deployed to address:", oneTimeBuyNFT.address)
  }
  
main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error)
    process.exit(1)
})
  