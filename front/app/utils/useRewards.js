import { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";
import { UserContext } from "../providers/UserContextProvider";
import { ethers } from "ethers";

const web3 = new Web3("http://localhost:7545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useRewards = () => {
  const [userRewards, setUserRewards] = useState([]);
  const [allRewards, setAllRewards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userAccount } = useContext(UserContext);

  const fetchUserRewards = async () => {
    setLoading(true);
    setError(null);
    try {
    const userRewardsData = await campaignsContract.methods
        .getRewardsByContributor(userAccount)
        .call();

        setUserRewards(userRewardsData);
    } catch (err) {
      setError("Error al obtener las medallas del usuario");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllRewards = async () => {
    setLoading(true);
    setError(null);
    try {
      const campaigns = await campaignsContract.methods
        .getCampaigns()
        .call();
      const addresses = new Set();

      for (const campaign of campaigns) {
        const { id_campaign } = campaign;
        const contributors = await campaignsContract.methods
          .getContributorsByCampaign(id_campaign)
          .call();
        contributors.forEach((address) => addresses.add(address));
      }
      
      const allRewardsData = await Promise.all(
        Array.from(addresses).map(async (address) => {
          const rewards = await campaignsContract.methods
            .getRewardsByContributor(address)
            .call();
          return { address, rewards };
        })
      );
      setAllRewards(allRewardsData);
    } catch (err) {
      setError("Error al obtener las medallas de los usuarios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRewards();
    fetchAllRewards();
  }, []);
  
  return {
    userRewards,
    allRewards,
    loading,
    error,
  };
};
export default useRewards;
