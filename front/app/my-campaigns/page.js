"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import campaignsContractABI from "../../campaignsContract.json";

const web3 = new Web3("http://localhost:8545");
const contractAddress = "0x693A5A22ABd25009a20261091da95eE4c01f0831";
const campaignsContract = new web3.eth.Contract(
  campaignsContractABI,
  contractAddress
);

const MyCampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    async function fetchCampaigns() {
      const contract = await campaignsContract.methods.getCampaigns().call();
      const totalCampaigns = await campaignsContract.methods
        .totalCampaigns()
        .call();
      console.log("las campañas son", totalCampaigns);
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
