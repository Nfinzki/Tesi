//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract OneTimeBuyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(address => uint256[]) ownedNFT;

    constructor() ERC721("MyNFT", "NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        ownedNFT[recipient].push(newItemId);

        return newItemId;
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public override {
        uint i;
        for(i = 0; i < ownedNFT[to].length; i++) {
            if (tokenId == ownedNFT[to][i])
                revert ("Token already owned");
        }

        super.safeTransferFrom(from, to, tokenId, "");
        ownedNFT[to].push(tokenId);
    }
}