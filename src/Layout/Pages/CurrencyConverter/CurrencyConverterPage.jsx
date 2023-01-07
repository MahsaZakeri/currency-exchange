import { Container, Typography } from '@mui/material';
import React from 'react';
import CurrencyConverter from '../../../Components/CurrencyConventer';

const CurrencyConverterPage = () => {
  return (
    <Container maxWidth="xl" sx={{p : 3}}>
      <Typography align='left' variant="h3"> I want to convert</Typography>
      <CurrencyConverter />
    </Container>
  );
};

export default CurrencyConverterPage;
