import React from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Modal,
  InputAdornment,
} from "@mui/material";

const ModalNewCampaign = ({
  newCampaign,
  openModal,
  setOpenModal,
  handleChange,
  handleCreateCampaign,
}) => {
  return (
    <Modal
      open={openModal}
      onClose={() => {
        setOpenModal(false);
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
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
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2, color: "black" }}
        >
          Crear nueva Campaña
        </Typography>
        <TextField
          fullWidth
          label="Nombre"
          name="name"
          variant="outlined"
          sx={{ mb: 2 }}
          value={newCampaign.name}
          onChange={handleChange}
        />
        <TextField
          type="number"
          InputProps={{
            endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
          }}
          fullWidth
          label="Monto"
          name="amount"
          variant="outlined"
          sx={{ mb: 2 }}
          value={newCampaign.amount}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Fecha límite"
          name="deadline"
          type="date"
          variant="outlined"
          sx={{ mb: 2 }}
          value={newCampaign.deadline}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateCampaign}
        >
          Crear Campaña
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalNewCampaign;
