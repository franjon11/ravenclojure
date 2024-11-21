"use client";
import React from "react";
import { Typography, Grid2, Card, CardContent, Button } from "@mui/material";
import CardContribution from "../components/CardContribution";
import useContributions from "../utils/useContributions";

const ContributionsPage = () => {
  const {contributions} = useContributions();

  return (
    <>
      {contributions.length === 0  ? (
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          No has contribuido a ninguna campaña
        </Typography>
      ) : (
        <Grid2 container spacing={3}>
          {contributions.map((contribution, index) => (
            <Grid2 xs={12} sm={6} md={4} key={index}>
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