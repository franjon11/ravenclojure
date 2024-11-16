"use client";
import React, { useState } from "react";
import {
  Typography,
  Fab,
  Container,
  Card,
  CardContent,
  Chip,
  Grid2,
  Modal,
  Box,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";
import useCampaigns from "../utils/useCampaigns";

const CampaignsPage = () => {
  const { campaigns, setCampaign, cancelCampaign } = useCampaigns();
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
    setCampaign(newCampaign.amount, daysRemaining, newCampaign.name);
    setOpenModal(false);
  };

  const handleCancelCampaign = (campaignId) => {
    cancelCampaign(campaignId);
  };

  return (
    <Container
      sx={{
        py: 4,
        minHeight: "100vh",
      }}>
      {campaigns.length === 0 ? (
        <Typography
          variant='h5'
          align='center'
          color='textSecondary'
          sx={{ mt: 4 }}>
          No hay campañas activas para donar
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {campaigns.map((campaign, index) => (
            <Grid2 xs={12} sm={6} md={4} key={campaign.creationDate}>
              <Card
                sx={{
                  backgroundColor: blue[30],
                  borderLeft: `5px solid ${blue[700]}`,
                  width: 300,
                  maxWidth: 300,
                }}>
                <CardContent>
                  <Typography
                    variant='h6'
                    sx={{ fontWeight: "bold", color: blue[900] }}>
                    {campaign.name}
                  </Typography>
                  <Typography variant='body1' sx={{ color: blue[700] }}>
                    Monto: {campaign.target_amount}
                  </Typography>
                  <Typography variant='body2' sx={{ color: blue[700], mb: 1 }}>
                    Duración: {campaign.deadline} días
                  </Typography>
                  <Chip
                    label={campaign.state === 0n ? "Activa" : "Vencida"}
                    color={campaign.state === 0n ? "success" : "error"}
                    sx={{ mt: 1 }}
                  />
                  <Button
                    variant='outlined'
                    color='error'
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => handleCancelCampaign(index)}>
                    Cancelar Campaña
                  </Button>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}

      <Fab
        color='primary'
        aria-label='add'
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: blue[700],
          "&:hover": { backgroundColor: blue[900] },
        }}>
        <AddIcon
          onClick={() => {
            setOpenModal(true);
          }}
        />
      </Fab>

      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        aria-labelledby='modal-title'
        aria-describedby='modal-description'>
        <Box
          sx={{
            position: "fixed",
            bottom: 80,
            right: 20,
            width: 300,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
          <Typography
            id='modal-title'
            variant='h6'
            component='h2'
            sx={{ mb: 2 }}>
            Crear nueva Campaña
          </Typography>
          <TextField
            fullWidth
            label='Nombre'
            name='name'
            variant='outlined'
            sx={{ mb: 2 }}
            value={newCampaign.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label='Monto'
            name='amount'
            variant='outlined'
            sx={{ mb: 2 }}
            value={newCampaign.amount}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label='Fecha límite'
            name='deadline'
            type='date'
            variant='outlined'
            sx={{ mb: 2 }}
            value={newCampaign.deadline}
            onChange={handleChange}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleCreateCampaign}>
            Crear Campaña
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default CampaignsPage;
