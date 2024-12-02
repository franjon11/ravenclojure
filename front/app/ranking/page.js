"use client";
import React from "react";
import { Card, Box, Typography, Grid2, Stack, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { blue } from "@mui/material/colors";
import Image from "next/image";
import bronce from "../Bronce.png";
import plata from "../Plata.png";
import oro from "../Oro.png";
import diamante from "../Diamante.png";
import useRewards from "../utils/useRewards";

const cardData = [
  { tier: "Bronce", image: bronce},
  { tier: "Plata", image: plata},
  { tier: "Oro", image: oro},
  { tier: "Diamante", image: diamante},
];

const RewardCard = ({ tier, image, amount }) => (
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

const RankingPage = () => {
  const { userRewards, allRewards } = useRewards();

  return (
    <Box>
      <Typography variant='h5' align='center' sx={{ mt: 4 }}>
        Mis medallas
      </Typography>
      <Stack direction="row" justifyContent="center">
        {cardData.map((card, index) => (
        <RewardCard key={index} tier={card.tier} image={card.image} amount={userRewards[index]} />
        ))}
      </Stack>
      <Typography variant='h5' align='center' sx={{ mt: 4 }}>
        Ranking
      </Typography>
      <Table sx={{ maxWidth: 1200, margin: "0 auto", mt: 2, border: "1px solid #ccc" }}>
        <TableHead>
        <TableRow>
            <TableCell align="center"><strong>Usuario</strong></TableCell>
            <TableCell align="center"><strong>Bronce</strong></TableCell>
            <TableCell align="center"><strong>Plata</strong></TableCell>
            <TableCell align="center"><strong>Oro</strong></TableCell>
            <TableCell align="center"><strong>Diamante</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allRewards && allRewards.length > 0 ? (
            allRewards.map(({ address, rewards }, index) => (
              <TableRow key={index}>
                <TableCell align="center">{address}</TableCell>
                {rewards.map((medals, index) => (
                  <TableCell key={index} align="center">{medals}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">No hay usuarios</TableCell>
            </TableRow>
          )}
        </TableBody>

      </Table>
    </Box>
  );
};

export default RankingPage;