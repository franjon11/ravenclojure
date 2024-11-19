import React from "react";
import { Typography, Grid2, Card, CardContent, Button } from "@mui/material";
import CardContribution from "../components/CardContribution";

const ContributionsPage = () => {
  // Datos de prueba
  const rand = false;
  const contributions = [
    {
      campaignId: 1,
      name: "Campaña Ayuda Escolar",
      amount: "0.5 ETH",
      target: "5 ETH",
      deadline: 12,
      state: 0n,
    },
    {
      campaignId: 2,
      name: "Campaña Médica",
      amount: "1.2 ETH",
      target: "10 ETH",
      deadline: 10,
      state: 1,
    },
  ];

  return (
    <>
      {contributions.length === 0 || rand == true ? (
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          No has contribuido a ninguna campaña
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {contributions.map((contribution) => (
            <Grid2 xs={12} sm={6} md={4} key={contribution.campaignId}>
              <CardContribution
                contribution={contribution}
              />
            </Grid2>
          ))}
        </Grid2>
      )}
    </>
  );
};

export default ContributionsPage;