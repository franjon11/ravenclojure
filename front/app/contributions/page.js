"use client";
import React from "react";
import { Box, Typography, Grid2, Button } from "@mui/material";
import CardContribution from "../components/CardContribution";
import useContributions from "../utils/useContributions";
import Link from "next/link";

const ContributionsPage = () => {
  const { contributions } = useContributions();

  return (
    <Box>
      {contributions.length === 0 ? (
        <Typography variant='h5' align='center' sx={{ mt: 4 }}>
          No has contribuido a ninguna campaña
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {contributions.map((contribution, index) => (
            <Grid2 xs={12} sm={6} md={4} key={index}>
              <CardContribution contribution={contribution} />
            </Grid2>
          ))}
        </Grid2>
      )}
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        textAlign='center'
        height='20vh'>
        <Button
          component={Link}
          href='/campaigns'
          variant='contained'
          color='primary'
          size='large'
          sx={{
            marginTop: 4,
          }}>
          Ver campañas existentes
        </Button>
      </Box>
    </Box>
  );
};

export default ContributionsPage;
