// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ownable.sol";
import "./erc721.sol";

contract CampaignRewards is Ownable, ERC721 {
    uint256 private _tokenIds; // Contador para asignar IDs únicos a las medallas
    mapping(uint256 => address) private _tokenOwners; // Relación entre token ID y dueño
    mapping(address => uint256[]) private _ownerTokens; // Relación entre dueño y sus tokens
    mapping(uint256 => string) public tokenMetadata; // Metadata asociada a cada token (descripción de la medalla)

    event RewardMinted(uint256 tokenId, address recipient, string metadata);

    function balanceOf(address _owner) external view override returns (uint256) {
        return _ownerTokens[_owner].length;
    }

    function ownerOf(uint256 _tokenId) external view override returns (address) {
        return _tokenOwners[_tokenId];
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external payable override {
        require(_tokenOwners[_tokenId] == _from, "You are not the owner of this token");
        require(_to != address(0), "Invalid recipient address");

        // Actualiza los datos de propiedad
        _removeTokenFromOwner(_from, _tokenId);
        _tokenOwners[_tokenId] = _to;
        _ownerTokens[_to].push(_tokenId);

        emit Transfer(_from, _to, _tokenId);
    }

    function approve(address /*_approved*/, uint256 /*_tokenId*/) external payable override {
        revert("Approval not implemented"); // Este contrato no permite aprobaciones
    }
    /**
     * @dev Emite una medalla como recompensa a un contribuyente.
     * Solo el propietario del contrato puede llamar a esta función.
     */
    function mintReward(address recipient, uint percentage) external {
        require(recipient != address(0), "Invalid recipient address");

         string memory tier;

        // Determinamos el tier basado en el porcentaje
        if (percentage > 0 && percentage <= 25) {
            tier = "BRONZE";
        } else if (percentage > 25 && percentage <= 50) {
            tier = "SILVER";
        } else if (percentage > 50 && percentage <= 75) {
            tier = "GOLD";
        } else if (percentage > 75) {
            tier = "DIAMOND";
        }

        _tokenIds++; // Incrementa el contador de tokens
        uint256 newTokenId = _tokenIds;

        // Asigna la medalla al destinatario
        _tokenOwners[newTokenId] = recipient;
        _ownerTokens[recipient].push(newTokenId);
        tokenMetadata[newTokenId] = tier;

        emit RewardMinted(newTokenId, recipient, tier);
    }

    /**
     * @dev Obtiene los tokens que posee un usuario.
     */
    function getTokensByOwner(address owner) external view returns (uint256[] memory) {
        return _ownerTokens[owner];
    }

    /**
     * @dev Elimina un token de la lista de un dueño al transferirlo.
     */
    function _removeTokenFromOwner(address owner, uint256 tokenId) private {
        uint256[] storage tokens = _ownerTokens[owner];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == tokenId) {
                tokens[i] = tokens[tokens.length - 1]; // Reemplaza con el último token
                tokens.pop(); // Elimina el último elemento
                return;
            }
        }
    }
}
