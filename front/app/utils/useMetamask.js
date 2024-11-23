"use client";

import { useEffect } from "react";
const useMetamask = (setUserAccount, showError) => {
  const ethereum = window.ethereum;
  async function connect() {
    if (ethereum) {
      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAccount(accounts[0]);
      } catch (err) {
        showError("Error al conectar con MetaMask");
      }
    } else {
      showError("MetaMask no detectado - Instala la extensión");
    }
  }

  useEffect(() => {
    if (ethereum) {
      ethereum.on("accountsChanged", (accounts) => {
        setUserAccount(accounts[0]);
      });
    }
  }, [ethereum, setUserAccount]);

  return connect;
};

export default useMetamask;
