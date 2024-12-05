// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ierc165.sol";

contract ERC165 is IERC165 {
    // Mapeo para almacenar las interfaces soportadas
    mapping(bytes4 => bool) private _supportedInterfaces;

    constructor() {
        // Registrar ERC165 como una interfaz soportada
        _registerInterface(type(IERC165).interfaceId);
    }

    /**
     * @dev Implementación de supportsInterface de IERC165.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return _supportedInterfaces[interfaceId];
    }

    /**
     * @dev Función interna para registrar una interfaz como soportada.
     */
    function _registerInterface(bytes4 interfaceId) internal virtual {
        require(interfaceId != 0xffffffff, "Invalid interface ID");
        _supportedInterfaces[interfaceId] = true;
    }
}