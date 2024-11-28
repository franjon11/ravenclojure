import { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";
import { UserContext } from "../providers/UserContextProvider";

const web3 = new Web3("http://localhost:8545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userAccount } = useContext(UserContext);

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
    console.log(userAccount);
    setLoading(true);
    setError(null);
    try {
      await campaignsContract.methods
        .createNewCampaign(amount, daysRemaining, name)
        .send({ from: userAccount, gas: 3000000 });
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
      await campaignsContract.methods
        .cancelCampaign(id_campaign)
        .send({ from: userAccount, gas: 3000000 });
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
