import { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";
import { UserContext } from "../providers/UserContextProvider";
import { ethers } from "ethers";
import { AlertContext } from "../providers/AlertContextProvider.jsx";

const web3 = new Web3("http://localhost:7545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useContributions = () => {
  const [contributions, setContributions] = useState([]);
  const { userAccount } = useContext(UserContext);
  const { showError } = useContext(AlertContext);

  // Obtener contribuciones desde el contrato
  const fetchContributions = async () => {
    try {
      const result = await campaignsContract.methods
        .getContributions(userAccount)
        .call();

      const campaigns = result[0];
      const amounts = result[1];

      const contributionsData = campaigns.map((campaign, index) => ({
        creationDate: campaign.creationDate,
        creator: campaign.creator,
        name: campaign.name,
        current_amount: ethers.formatEther(campaign.current_amount.toString()),
        id_campaign: campaign.id_campaign,
        state: campaign.state,
        target_amount: ethers.formatEther(campaign.target_amount.toString()),
        amount_donated: ethers.formatEther(amounts[index].toString()),
        deadline: campaign.deadline,
      }));

      setContributions(contributionsData);
    } catch (err) {
      showError("Error al obtener las contribuciones");
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
      fetchContributions();
    } catch (err) {
      showError("No podes contribuir a tu propia campaña");
    }
  };

  useEffect(() => {
    if (userAccount) fetchContributions();
  }, [userAccount]);

  return {
    contributions,
    contribute,
  };
};

export default useContributions;
