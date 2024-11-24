import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { blue } from "@mui/material/colors";
import BadgeCampaignState from "./BadgeCampaignState";

const CardCampaign = ({ campaign, handleCancelCampaign }) => {
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
          {campaign.name}
        </Typography>
        <Typography variant='body1' sx={{ color: blue[700] }}>
          Monto: {campaign.target_amount} ETH
        </Typography>
        <Typography variant='body2' sx={{ color: blue[700], mb: 1 }}>
          Duración: {campaign.deadline} días
        </Typography>
        <BadgeCampaignState state={campaign.state} />
        <Button
          variant='outlined'
          color='error'
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => handleCancelCampaign(campaign.id_campaign)}
          disabled={campaign.state === 2n}>
          Cancelar Campaña
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardCampaign;
