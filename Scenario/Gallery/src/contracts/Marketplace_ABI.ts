export default [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftContract",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId",
				"type": "uint256"
			}
		],
		"name": "buyNFT",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "nftContract1",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId1",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "nftContract2",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "tokenId2",
				"type": "uint256"
			}
		],
		"name": "exchangeNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]