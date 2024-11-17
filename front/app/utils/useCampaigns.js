import { useState, useEffect } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";

const web3 = new Web3("http://localhost:7545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Conectar a Metamask
  const connectToMetamask = async () => {
    try {
      await window.ethereum.enable();
    } catch (err) {
      console.error(err);
    }
  };

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
  const createNewCampaign = async (amount, daysRemaining, name) => {
    console.log(amount, daysRemaining, name);
    setLoading(true);
    setError(null);
    try {
      const accounts = await web3.eth.getAccounts();

      await campaignsContract.methods
        .createNewCampaign(amount, daysRemaining, name)
        .send({ from: accounts[0], gas: 3000000 });
      fetchCampaigns();
    } catch (err) {
      setError("Error al crear la campaña");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Cancelar una campaña
  const cancelCampaign = async (id_campaign) => {
    setLoading(true);
    setError(null);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaignsContract.methods
        .cancelCampaign(id_campaign)
        .send({ from: accounts[0], gas: 3000000 });
      fetchCampaigns();
    } catch (err) {
      setError("Error al cancelar la campaña");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
    connectToMetamask();
  }, []);

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    createNewCampaign,
    cancelCampaign,
  };
};

export default useCampaigns;
