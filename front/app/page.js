import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='100vh'>
      <Typography variant='h3' gutterBottom>
        Bienvenido a <strong>Ravenclojure</strong>
      </Typography>
      <Typography variant='h6' color='textSecondary' gutterBottom>
        Una plataforma donde puedes crear campañas y permitir que las personas
        contribuyan a causas que importan.
      </Typography>
      <Box mt={4}>
        <div>
          <iframe
            src='https://giphy.com/embed/XcculRCJY4Y6wgVCB1'
            width='100%'
            height='100%'
            className='giphy-embed'
            allowFullScreen></iframe>
        </div>
      </Box>
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
  );
};

export default HomePage;
