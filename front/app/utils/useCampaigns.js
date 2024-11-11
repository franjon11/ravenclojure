import { useState, useEffect } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";

const web3 = new Web3("http://localhost:8545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener campañas desde el contrato
  const fetchCampaigns = async () => {
    setLoading(true);
    setError(null);
    try {
      const contractCampaigns = await campaignsContract.methods
        .getCampaigns()
        .call();
      setCampaigns(contractCampaigns);
    } catch (err) {
      setError("Error al obtener las campañas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Crear una nueva campaña
  const setCampaign = async (amount, daysRemaining, name) => {
    setLoading(true);
    setError(null);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaignsContract.methods
        .setCampaign(amount, daysRemaining, name)
        .send({ from: accounts[0], gas: 3000000 });
      fetchCampaigns();
    } catch (err) {
      setError("Error al crear la campaña");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    setCampaign,
  };
};

export default useCampaigns;
