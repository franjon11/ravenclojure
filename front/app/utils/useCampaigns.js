import { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";
import { UserContext } from "../providers/UserContextProvider";
import { ethers } from "ethers";
import { AlertContext } from "../providers/AlertContextProvider.jsx";

const web3 = new Web3("http://localhost:8545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const { userAccount } = useContext(UserContext);
  const { showError } = useContext(AlertContext);

  // Obtener campañas desde el contrato
  const fetchCampaigns = async () => {
    try {
      const contractCampaigns = await campaignsContract.methods
        .getCampaigns()
        .call();
      setCampaigns(contractCampaigns);
    } catch (err) {
      showError("Error al obtener las campañas");
    }
  };

  // Crear una nueva campaña
  const createNewCampaign = async (amount, daysRemaining, name) => {
    try {
      const amountInWei = ethers.parseUnits(amount.toString(), "ether");
      await campaignsContract.methods
        .createNewCampaign(amountInWei, daysRemaining, name)
        .send({ from: userAccount, gas: 3000000 });
      fetchCampaigns();
    } catch (err) {
      showError("Error al crear la campaña");
    }
  };

  // Cancelar una campaña
  const cancelCampaign = async (id_campaign) => {
    try {
      await campaignsContract.methods
        .cancelCampaign(id_campaign)
        .send({ from: userAccount, gas: 3000000 });
      fetchCampaigns();
    } catch (err) {
      showError("Error al cancelar la campaña");
    }
  };

  // Contribuir a campaña
  const contribute = async (campaign_id, contribution_amount) => {
    try {
      const valueInWei = ethers.parseUnits(
        contribution_amount.toString(),
        "ether"
      );

      await campaignsContract.methods
        .contribute(campaign_id)
        .send({ from: userAccount, gas: 3000000, value: valueInWei });
      fetchCampaigns();
    } catch (err) {
      showError("No podes contribuir a tu propia campaña");
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return {
    campaigns,
    fetchCampaigns,
    createNewCampaign,
    cancelCampaign,
    contribute,
  };
};

export default useCampaigns;
