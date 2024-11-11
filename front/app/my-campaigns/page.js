"use client";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
import campaignsContractABI from "../../campaignsContract.json";
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

const web3 = new Web3("http://localhost:8545");
const contractAddress = "0xc42411093090108709aFe70Dde10BCCF249C5ACc";
const campaignsContract = new web3.eth.Contract(
  campaignsContractABI,
  contractAddress
);

const MyCampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    amount: "",
    deadline: "",
  });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    async function fetchCampaigns() {
      const contract_campaigns = await campaignsContract.methods
        .getCampaigns()
        .call();
      setCampaigns(contract_campaigns);
    }
    fetchCampaigns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign({ ...newCampaign, [name]: value });
  };

  const setCampaign = () => {
    async () => {
      await campaignsContract.methods
        .setCampaign(
          web3.utils.toBN(newCampaign.amount),
          web3.utils.toBN(newCampaign.deadline),
          newCampaign.name
        )
        .send();
    };
    setOpenModal(false);
  };

  console.log(campaigns);

  return (
    <Container
      sx={{
        py: 4,
        minHeight: "100vh",
      }}>
      <Grid2 container spacing={3}>
        {campaigns.map((campaign) => (
          <Grid2 xs={12} sm={6} md={4} key={campaign.creationDate}>
            <Card
              sx={{
                backgroundColor: blue[30],
                borderLeft: `5px solid ${blue[700]}`,
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
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>

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
            Nueva Campaña
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
            onClick={setCampaign}>
            Crear Campaña
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default MyCampaignsPage;
