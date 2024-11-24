"use client";

import React, { useState, createContext } from "react";
import CustomAlert from "../components/CustomAlert";

export const AlertContext = createContext({
  showError: () => {},
  showSuccess: () => {},
  showInfo: () => {},
  showWarning: () => {},
});

const AlertContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("error");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const showError = (msg) => {
    setOpen(true);
    setMessage(msg);
    setSeverity("error");
  };

  const showSuccess = (msg) => {
    setOpen(true);
    setMessage(msg);
    setSeverity("success");
  };

  const showInfo = (msg) => {
    setOpen(true);
    setMessage(msg);
    setSeverity("info");
  };

  const showWarning = (msg) => {
    setOpen(true);
    setMessage(msg);
    setSeverity("warning");
  };

  return (
    <AlertContext.Provider
      value={{ showError, showSuccess, showInfo, showWarning }}
    >
      <CustomAlert
        open={open}
        handleClose={handleClose}
        msg={message}
        severity={severity}
      />
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
