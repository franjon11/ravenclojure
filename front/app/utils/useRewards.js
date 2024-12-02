import { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract.js";
import { UserContext } from "../providers/UserContextProvider";
import { AlertContext } from "../providers/AlertContextProvider.jsx";

const web3 = new Web3("http://localhost:8545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useRewards = () => {
  const [userRewards, setUserRewards] = useState([0, 0, 0, 0]);
  const [contributors, setContributors] = useState([]);
  const [scores, setScores] = useState([]);
  const [medals, setMedals] = useState([]);
  const { userAccount } = useContext(UserContext);
  const { showError } = useContext(AlertContext);

  const fetchUserRewards = async () => {
    try {
      const userRewardsData = await campaignsContract.methods
        .getRewardsByContributor(userAccount)
        .call();
      setUserRewards(userRewardsData);
    } catch (err) {
      showError("Error al obtener las medallas del usuario");
    }
  };

  const fetchRewards = async () => {
    try {
      const result = await campaignsContract.methods.getRanking().call();

      console.log(result);

      setContributors(result[0]);
      setScores(result[1]);
      setMedals(result[2]);
    } catch (err) {
      showError("Error al obtener las medallas del usuario");
      console.log(err);
    }
  };

  useEffect(() => {
    if (userAccount != null) {
      fetchUserRewards();
      fetchRewards();
    }
  }, [userAccount]);

  return {
    userRewards,
    contributors,
    scores,
    medals,
  };
};
export default useRewards;
