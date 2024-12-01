module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Dirección del sv de Ganache
      port: 7545, // Puerto
      network_id: "*", // Cualquier network ID
    },
  },

  // Configuración de Solidity
  compilers: {
    solc: {
      version: "0.8.0", // Versión de Solidity
      settings: {
        optimizer: {
          enabled: true, // Habilita el optimizador de Solidity
          runs: 200, // Ajusta la cantidad de optimizaciones
        },
      },
    },
  },

  // Configuración de Mocha para los tests
  mocha: {
    timeout: 100000, // Aumenta el tiempo de espera si las pruebas tardan mucho
  },
};
