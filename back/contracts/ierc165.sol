// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC165 {
    /**
     * @dev Devuelve true si el contrato implementa la interfaz indicada por interfaceId.
     * Este método utiliza menos de 30,000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}