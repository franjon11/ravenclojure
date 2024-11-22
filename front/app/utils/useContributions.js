import { useState, useEffect } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";

const web3 = new Web3("http://localhost:8545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const connectToMetamask = async () => {
    try {
      await window.ethereum.enable();
    } catch (err) {
      console.error(err);
    }
  };

  // Obtener contribuciones desde el contrato
  const fetchContributions = async () => {
    setLoading(true);
    setError(null);
    try {
      const accounts = await web3.eth.getAccounts();
      const [campaigns, amounts] = await campaignsContract.methods
        .getContributions(accounts[0])
        .call();
      
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
    connectToMetamask();
  }, [])

  return {
    contributions,
    fetchContributions,
    loading,
    error,
  };
};

export default useContributions;
