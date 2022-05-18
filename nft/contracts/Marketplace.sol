// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Marketplace {

    error NotApproved();

    function buyNFT(address nftContract, uint256 tokenId) public payable {
        IERC721 nft = IERC721(nftContract);

        if (nft.getApproved(tokenId) != address(this)) {
            revert NotApproved();
            return;
        }

        address payable seller = payable(nft.ownerOf(tokenId));

        seller.transfer(msg.value);
        nft.safeTransferFrom(address(this), msg.sender, tokenId);
    }

    function exchangeNFT(address nftContract1, uint256 tokenId1, address nftContract2, uint256 tokenId2) public {
        IERC721 nft1 = IERC721(nftContract1);
        IERC721 nft2 = IERC721(nftContract2);

        if (nft1.getApproved(tokenId1) != address(this) || nft2.getApproved(tokenId2) != address(this)) {
            revert NotApproved();
            return;
        }

        address firstExchanger = nft1.ownerOf(tokenId1);
        address secondExchanger = nft2.ownerOf(tokenId2);

        nft1.safeTransferFrom(address(this), secondExchanger, tokenId1);
        nft2.safeTransferFrom(address(this), firstExchanger, tokenId2);

    }
}