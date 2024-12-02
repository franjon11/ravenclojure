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
import { blue, green, red } from "@mui/material/colors";
import BadgeCampaignState from "./BadgeCampaignState";
import { ethers } from "ethers";
import {
  calculateDaysRemaining,
  STATES,
  timestampToDate,
} from "../utils/utils";

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
  const diaCierre = timestampToDate(campaign.deadline);

  const colorBorder = () => {
    if (campaign.state === STATES.ACTIVE) {
      return blue[700];
    } else if (campaign.state === STATES.SUCCESSFUL) {
      return green[700];
    } else {
      return red[700];
    }
  };

  return (
    <>
      <Card
        sx={{
          borderLeft: `5px solid ${colorBorder()}`,
          width: 300,
          maxWidth: 300,
          cursor: "pointer",
        }}
        onClick={handleOpenModal}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {campaign.name}
          </Typography>
          <Typography variant="body1">
            Monto objetivo: {targetAmountInEth} ETH
          </Typography>
          <Typography variant="body1">
            Monto recaudado: {currentAmountInEth} ETH
          </Typography>
          <p>
            <Typography variant="overline" sx={{ mb: 1 }}>
              {daysRemaining} días restantes
            </Typography>
          </p>
          <em>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Cierra el {diaCierre}
            </Typography>
          </em>
          <BadgeCampaignState state={campaign.state} />
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleCloseModal} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold", color: blue[900] }}>
          {campaign.name}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ color: blue[700], mb: 2 }}>
            Monto objetivo: {targetAmountInEth} ETH
          </Typography>
          <Typography variant="body1" sx={{ color: blue[700], mb: 2 }}>
            Monto recaudado: {currentAmountInEth} ETH
          </Typography>
          <p>
            <Typography variant="overline" sx={{ color: blue[700], mb: 2 }}>
              {daysRemaining} días restantes
            </Typography>
          </p>
          <BadgeCampaignState state={campaign.state} />

          {showContributionInput && (
            <Box mt={2}>
              <TextField
                type="number"
                inputProps={{ step: "0.01" }}
                label="Monto de contribución (ETH)"
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
            variant="contained"
            color="error"
            onClick={() => {
              handleCancelCampaign(campaign.id_campaign);
              handleCloseModal();
            }}
            disabled={campaign.state !== STATES.ACTIVE}
          >
            Cancelar Campaña
          </Button>
          {showContributionInput ? (
            <Button
              variant="contained"
              sx={{ backgroundColor: green[700] }}
              onClick={handleContribute}
            >
              Confirmar Contribución
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{ backgroundColor: green[700] }}
              onClick={() => setShowContributionInput(true)}
              disabled={campaign.state !== STATES.ACTIVE}
            >
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
