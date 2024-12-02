import Web3 from "web3";
import { ABI, contractAddress } from "../constants/campaignsContract";

const web3 = new Web3("http://localhost:7545");
const campaignsContract = new web3.eth.Contract(ABI, contractAddress);

const useTimer = (userAccount, showError) => {
  const setRemainingTime = async () => {
    try {
      await campaignsContract.methods
        .setRemainingTime()
        .call({ from: userAccount });
    } catch (err) {
      console.log(err);
      showError("Error, contacte al administrador");
    }
  };
  return { setRemainingTime };
};

export default useTimer;
