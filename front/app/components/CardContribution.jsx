import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import BadgeCampaignState from "./BadgeCampaignState";

const CardContribution = ({ contribution }) => {
  return (
    <Card
      sx={{
        backgroundColor: blue[30],
        borderLeft: `5px solid ${blue[700]}`,
        width: 300,
        maxWidth: 300,
      }}>
      <CardContent>
        <Typography variant='h6' sx={{ fontWeight: "bold", color: blue[900] }}>
          {contribution.name}
        </Typography>
        <Typography variant='body1' sx={{ color: blue[700] }}>
          Monto donado: {contribution.amount_donated}
        </Typography>
        <Typography variant='body1' sx={{ color: blue[700] }}>
          Objetivo: {contribution.target_amount}
        </Typography>
        <Typography variant='body1' sx={{ color: blue[700] }}>
          Recaudado: {contribution.current_amount}
        </Typography>
        <Typography variant='body2' sx={{ color: blue[700], mb: 1 }}>
          Duración: {contribution.deadline} días
        </Typography>
        <BadgeCampaignState state={contribution.state} />
      </CardContent>
    </Card>
  );
};

export default CardContribution;
