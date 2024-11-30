import React from "react";
import { Snackbar, Alert } from "@mui/material";

const CustomAlert = ({ open, handleClose, msg, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        variant="filled"
        severity={severity}
        sx={{ width: "100%" }}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
};

export default CustomAlert;
