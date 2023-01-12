import React from 'react';
import { Container, Typography } from '@mui/material';
import CurrencyConverterForm from './CurrencyConventerForm.component';

const CurrencyConverter = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography align="left" variant="h3" id="currencyConverterTitle">
        {' '}
        I want to convert
      </Typography>
      <CurrencyConverterForm />
    </Container>
  );
};

export default CurrencyConverter;
