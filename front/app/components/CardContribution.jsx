import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import BadgeCampaignState from "./BadgeCampaignState";
import { calculateDaysRemaining, STATES } from "../utils/utils";

const CardContribution = ({ contribution }) => {
  const daysRemaining = calculateDaysRemaining(contribution.deadline);
  const colorBorder = () => {
    if (contribution.state === STATES.ACTIVE) {
      return blue[700];
    } else if (contribution.state === STATES.SUCCESSFUL) {
      return green[700];
    } else {
      return red[700];
    }
  };
  return (
    <Card
      sx={{
        borderLeft: `5px solid ${colorBorder()}`,
        width: 300,
        maxWidth: 300,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {contribution.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Monto donado: {contribution.amount_donated}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Objetivo: {contribution.target_amount}
        </Typography>
        <em>
          <Typography variant="subtitle2">
            Recaudado: {contribution.current_amount}
          </Typography>
        </em>
        <p>
          <Typography variant="overline" sx={{ mb: 1 }}>
            {daysRemaining} días restantes
          </Typography>
        </p>
        <BadgeCampaignState state={contribution.state} />
      </CardContent>
    </Card>
  );
};

export default CardContribution;
