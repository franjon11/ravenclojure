import React from "react";
import { Chip } from "@mui/material";

const BadgeCampaignState = ({ state }) => {
  return (
    <Chip
      label={state === 0n ? "Activa" : "Vencida"}
      color={state === 0n ? "success" : "error"}
      sx={{ mt: 1 }}
    />
  );
};

export default BadgeCampaignState;
