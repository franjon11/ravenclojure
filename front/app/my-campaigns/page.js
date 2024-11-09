"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import campaignsContractABI from "../../campaignsContract.json";

const web3 = new Web3("http://localhost:7545");
const contractAddress = "0xC6aFdC45B5D0F360b8b87D6a5aDB4AC5315FB713";
const campaignsContract = new web3.eth.Contract(
  campaignsContractABI,
  contractAddress
);

const MyCampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      const contract_campaigns = await campaignsContract.methods
        .getCampaigns()
        .call();
      console.log("las campañas son", contract_campaigns.length);
      setCampaigns(contract_campaigns);
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
