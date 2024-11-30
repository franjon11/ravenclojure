import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
} from "@mui/material";
import { blue, green } from "@mui/material/colors";
import BadgeCampaignState from "./BadgeCampaignState";
import { ethers } from "ethers";
import { calculateDaysRemaining } from "../utils/utils";

const CardCampaign = ({
  campaign,
  handleCancelCampaign,
  handleContributeCampaign,
}) => {
  const [open, setOpen] = useState(false);
  const [showContributionInput, setShowContributionInput] = useState(false);
  const [contributionAmount, setContributionAmount] = useState("");

  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setShowContributionInput(false);
    setContributionAmount("");
  };

  const handleContribute = () => {
    if (contributionAmount > 0) {
      handleContributeCampaign(campaign.id_campaign, contributionAmount);
      handleCloseModal();
    } else {
      alert("Por favor, ingresa un monto válido.");
    }
  };

  // Convierte montos de Wei a ETH
  const targetAmountInEth = ethers.formatEther(
    campaign.target_amount.toString()
  );
  const currentAmountInEth = ethers.formatEther(
    campaign.current_amount.toString()
  );

  const daysRemaining = calculateDaysRemaining(campaign.deadline);

  return (
    <>
      <Card
        sx={{
          backgroundColor: blue[30],
          borderLeft: `5px solid ${blue[700]}`,
          width: 300,
          maxWidth: 300,
          cursor: "pointer",
        }}
        onClick={handleOpenModal}>
        <CardContent>
          <Typography
            variant='h6'
            sx={{ fontWeight: "bold", color: blue[900] }}>
            {campaign.name}
          </Typography>
          <Typography variant='body1' sx={{ color: blue[700] }}>
            Monto objetivo: {targetAmountInEth} ETH
          </Typography>
          <Typography variant='body1' sx={{ color: blue[700] }}>
            Monto recaudado: {currentAmountInEth} ETH
          </Typography>
          <Typography variant='body2' sx={{ color: blue[700], mb: 1 }}>
            Duración: {daysRemaining} días
          </Typography>
          <BadgeCampaignState state={campaign.state} />
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth='sm'>
        <DialogTitle sx={{ fontWeight: "bold", color: blue[900] }}>
          {campaign.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant='body1' sx={{ color: blue[700], mb: 2 }}>
            Monto objetivo: {targetAmountInEth} ETH
          </Typography>
          <Typography variant='body1' sx={{ color: blue[700], mb: 2 }}>
            Monto recaudado: {currentAmountInEth} ETH
          </Typography>
          <Typography variant='body1' sx={{ color: blue[700], mb: 2 }}>
            Duración: {daysRemaining} días
          </Typography>
          <BadgeCampaignState state={campaign.state} />

          {showContributionInput && (
            <Box mt={2}>
              <TextField
                type='number'
                inputProps={{ step: "0.01" }}
                label='Monto de contribución (ETH)'
                fullWidth
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='error'
            onClick={() => {
              handleCancelCampaign(campaign.id_campaign);
              handleCloseModal();
            }}
            disabled={campaign.state === 2n}>
            Cancelar Campaña
          </Button>
          {showContributionInput ? (
            <Button
              variant='contained'
              sx={{ backgroundColor: green[700] }}
              onClick={handleContribute}>
              Confirmar Contribución
            </Button>
          ) : (
            <Button
              variant='contained'
              sx={{ backgroundColor: green[700] }}
              onClick={() => setShowContributionInput(true)}>
              Contribuir
            </Button>
          )}
          <Button onClick={handleCloseModal}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CardCampaign;
