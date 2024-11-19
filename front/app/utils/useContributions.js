import { useState, useEffect } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";

const useContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener contribuciones desde el contrato
  const fetchContributions = async (userAddress) => {
    setLoading(true);
    setError(null);
    try {
      const contributionsData = await campaignsContract.methods
        .getContributions(userAddress)
        .call();
      //...
    } catch (err) {
      setError("Error al obtener las campañas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    contributions,
    fetchContributions,
    loading,
    error,
  };
};

export default useContributions;
