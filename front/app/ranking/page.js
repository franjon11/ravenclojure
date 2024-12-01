"use client";
import React from "react";
import { Card, Box, Typography, Grid2 } from "@mui/material";
import { blue } from "@mui/material/colors";
import Image from "next/image";
import bronce from "../Bronce.png";
import plata from "../Plata.png";
import oro from "../Oro.png";
import diamante from "../Diamante.png";

const cardData = [
  { tier: "Bronce", image: bronce, amount: 0 },
  { tier: "Plata", image: plata, amount: 0 },
  { tier: "Oro", image: oro, amount: 0 },
  { tier: "Diamante", image: diamante, amount: 0 },
];

const TokenCard = ({ tier, image, amount }) => (
  <Card
    sx={{
      width: 200,
      height: 200,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 2,
      textAlign: "center",
    }}
  >
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={image} alt={tier} width={60} height={60} />
      <Typography variant="h5" align="center" sx={{ mt: 1 }}>
        {tier}
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: blue[900] }}>
        {amount}
      </Typography>
    </Box>
  </Card>
);

const TokenLeaderboard = () => (
  <Box>
    <Grid2 container spacing={4} justifyContent="center">
      {cardData.map(({ tier, image, amount }, index) => (
        <Grid2 item key={index}>
          <TokenCard tier={tier} image={image} amount={amount} />
        </Grid2>
      ))}
    </Grid2>
  </Box>
);

export default TokenLeaderboard;
