import React from "react";
import { Chip } from "@mui/material";
import { MAP_STATES, MAP_STATES_COLORS } from "../utils/utils";

const BadgeCampaignState = ({ state }) => {
  return (
    <Chip
      label={MAP_STATES[state]}
      color={MAP_STATES_COLORS[state]}
      sx={{ mt: 1 }}
    />
  );
};

export default BadgeCampaignState;
