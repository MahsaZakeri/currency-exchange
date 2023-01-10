import { ThemeContext } from '@emotion/react';
import { Container, Typography } from '@mui/material';
import React from 'react';
import CurrencyConverterForm from './CurrencyConventerForm.component'
const CurrencyConverter = () => {
  return (
    <Container maxWidth="lg" sx={{py : 3}}>
      <Typography align='left' variant="h3"> I want to convert</Typography>
      <CurrencyConverterForm />
    </Container>
  );
};

export default CurrencyConverter;
