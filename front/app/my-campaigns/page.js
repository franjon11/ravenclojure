"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import campaignsContractABI from "../../campaignsContract.json";

const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
const contractAddress = "0xcD6a42782d230D7c13A74ddec5dD140e55499Df9";
const campaignsContract = new web3.eth.Contract(
  campaignsContractABI,
  contractAddress
);

const MyCampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      const contract = await campaignsContract.methods.getCampaigns();
      setCampaigns(contract);
    }
    fetchCampaigns();
  }, []);

  console.log(campaigns);

  return (
    <div>
      <h1>My Campaigns</h1>
      <p>LISTADO DE CAMPAÑAS</p>
    </div>
  );
};

export default MyCampaignsPage;
