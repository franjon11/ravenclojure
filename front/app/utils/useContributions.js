import { useState, useEffect } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";

const web3 = new Web3("http://localhost:8545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener contribuciones desde el contrato
  const fetchContributions = async (userAddress) => {
    setLoading(true);
    setError(null);
    try {
      const [campaigns, amounts] = await campaignsContract.methods
        .getContributions(userAddress)
        .call( );
      
      const contributionsData = campaigns.map((campaign, index) => ({
        name: campaign.name,
        targetAmount: campaign.targetAmount,
        amountDonated: amounts[index],
        deadline: campaign.deadline,
      }));

      setContributions(contributionsData);
    } catch (err) {
      setError("Error al obtener las campañas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, [])
  
  return {
    contributions,
    fetchContributions,
    loading,
    error,
  };
};

export default useContributions;