// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ownable.sol";
import "./erc721.sol";

contract CampaignRewards is Ownable, ERC721 {

    enum Tier { BRONZE, SILVER, GOLD, DIAMOND }

    uint256 private _tokenIds; // Contador para asignar IDs únicos a las medallas
    mapping(uint256 => address) private _tokenOwners; // Relación entre token ID y dueño
    mapping(address => uint256[]) private _ownerTokens; // Relación entre dueño y sus tokens
    mapping(uint256 => Tier) public tokenMetadata; // Metadata asociada a cada token (descripción de la medalla)

    event RewardMinted(uint256 tokenId, address recipient, Tier metadata);

    function getContributorRanking() external view returns (address[] memory, uint[] memory, uint[4][] memory) {
        uint contributorCount = _tokenIds; // Usamos el número de tokens como indicador de contribuyentes
        address[] memory contributors = new address[](contributorCount);
        uint[] memory scores = new uint[](contributorCount);
        uint[4][] memory medalsCount = new uint[4][](contributorCount); // Crear el array para contar medallas

        // Llenamos el array de contribuyentes y su puntaje
        uint index = 0;
        for (uint256 i = 1; i <= _tokenIds; i++) {
            address owner = _tokenOwners[i];
            
            // Verificamos si el contribuyente ya está en la lista
            bool exists = false;
            for (uint256 j = 0; j < index; j++) {
                if (contributors[j] == owner) {
                    exists = true;
                    break;
                }
            }

            if (!exists) {
                contributors[index] = owner;
                uint score = getContributorScore(owner);
                scores[index] = score;
                medalsCount[index] = this.balanceOf(owner); // Llamamos a balanceOf para obtener las medallas
                index++;
            }
        }

        // Ahora ordenamos el ranking de mayor a menor, usando un algoritmo de clasificación
        for (uint256 i = 0; i < contributors.length; i++) {
            for (uint256 j = i + 1; j < contributors.length; j++) {
                if (scores[i] < scores[j]) {
                    // Intercambiamos las posiciones en el ranking
                    address tempAddr = contributors[i];
                    contributors[i] = contributors[j];
                    contributors[j] = tempAddr;

                    uint tempScore = scores[i];
                    scores[i] = scores[j];
                    scores[j] = tempScore;

                    uint[4] memory tempMedals = medalsCount[i];
                    medalsCount[i] = medalsCount[j];
                    medalsCount[j] = tempMedals;
                }
            }
        }

        return (contributors, scores, medalsCount);
    }

    // Función que calcula el puntaje de un contribuyente basado en su tier de medallas
    function getContributorScore(address contributor) internal view returns (uint) {
        uint score = 0;
        
        // Obtenemos las medallas del contribuyente
        uint256[] memory tokens = _ownerTokens[contributor];

        // Sumamos el puntaje basado en el tier
        for (uint256 i = 0; i < tokens.length; i++) {
            Tier tier = tokenMetadata[tokens[i]];

            if (tier == Tier.DIAMOND) {
                score += 4; // 4 puntos por Diamond
            } else if (tier == Tier.GOLD) {
                score += 3; // 3 puntos por Gold
            } else if (tier == Tier.SILVER) {
                score += 2; // 2 puntos por Silver
            } else if (tier == Tier.BRONZE) {
                score += 1; // 1 punto por Bronze
            }
        }
        
        return score;
    }


    function balanceOf(address _owner) external view override returns (uint256[4] memory) {
        uint256[4] memory rewards;

        for (uint i = 0; i < _ownerTokens[_owner].length; i++) {
            Tier tier = tokenMetadata[_ownerTokens[_owner][i]];

            if(tier == Tier.BRONZE){
                rewards[0]++;
            }

            if(tier == Tier.SILVER){
                rewards[1]++;
            }

            if(tier == Tier.GOLD){
                rewards[2]++;
            }

            if(tier == Tier.DIAMOND){
                rewards[3]++;
            }

        }

        return rewards;
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

         Tier tier;

        // Determinamos el tier basado en el porcentaje
        if (percentage > 0 && percentage <= 25) {
            tier = Tier.BRONZE;
        } else if (percentage > 25 && percentage <= 50) {
            tier = Tier.SILVER;
        } else if (percentage > 50 && percentage <= 75) {
            tier = Tier.GOLD;
        } else if (percentage > 75) {
            tier = Tier.DIAMOND;
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
