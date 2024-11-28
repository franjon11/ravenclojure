import { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";
import { UserContext } from "../providers/UserContextProvider";

const web3 = new Web3("http://localhost:8545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userAccount } = useContext(UserContext);

  // Obtener contribuciones desde el contrato
  const fetchContributions = async () => {
    console.log(userAccount);
    setLoading(true);
    setError(null);
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
        current_amount: campaign.current_amount,
        id_campaign: campaign.id_campaign,
        state: campaign.state,
        target_amount: campaign.target_amount,
        amount_donated: amounts[index],
        deadline: campaign.deadline,
      }));

      setContributions(contributionsData);
    } catch (err) {
      setError("Error al obtener las contribuciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Contribuir a campaña
  const contribute = async (campaign_id, contribution_amount) => {
    setLoading(true);
    setError(null);

    console.log("El monto es", campaign_id, contribution_amount);
    try {
      const valueInWei = Web3.utils.toWei(
        contribution_amount.toString(),
        "ether"
      );

      await campaignsContract.methods
        .contribute(campaign_id)
        .send({ from: userAccount, gas: 3000000, value: valueInWei });
      fetchContributions();
    } catch (err) {
      setError("Error al obtener las contribuciones");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return {
    contributions,
    contribute,
    loading,
    error,
  };
};

export default useContributions;
