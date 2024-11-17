"use client";
import React, { useState } from "react";
import { Typography, Fab, Card, Grid2 } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import useCampaigns from "../utils/useCampaigns";
import ModalNewCampaign from "../components/ModalNewCampaign";
import CardCampaign from "../components/CardCampaign";

const CampaignsPage = () => {
  const { campaigns, createNewCampaign, cancelCampaign } = useCampaigns();
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    amount: "",
    deadline: "",
  });
  const [daysRemaining, setDaysRemaining] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "deadline") {
      const today = new Date();
      const selectedDate = new Date(value);

      const differenceInTime = selectedDate.getTime() - today.getTime();
      const daysRemaining = Math.ceil(differenceInTime / (1000 * 3600 * 24));

      setDaysRemaining(daysRemaining);
    }

    setNewCampaign((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCampaign = () => {
    createNewCampaign(newCampaign.amount, daysRemaining, newCampaign.name);
    setOpenModal(false);
  };

  const handleCancelCampaign = (campaignId) => {
    cancelCampaign(campaignId);
  };

  return (
    <>
      {campaigns.length === 0 ? (
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          No hay campañas activas para donar
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {campaigns.map((campaign, index) => (
            <Grid2 xs={12} sm={6} md={4} key={campaign.creationDate}>
              <CardCampaign
                campaign={campaign}
                handleCancelCampaign={handleCancelCampaign}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: blue[700],
          "&:hover": { backgroundColor: blue[900] },
        }}
        onClick={() => {
          setOpenModal(true);
        }}
      >
        <AddIcon />
      </Fab>

      <ModalNewCampaign
        openModal={openModal}
        setOpenModal={setOpenModal}
        newCampaign={newCampaign}
        handleChange={handleChange}
        handleCreateCampaign={handleCreateCampaign}
      />
    </>
  );
};

export default CampaignsPage;
