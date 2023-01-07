import { Button, Grid, IconButton, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { convertCurrency, rateInDays } from '../Services/services';
import ExchangeResult from './ExchangeResult';
import moment from 'moment';
const CurrencyConverter = () => {
  const [currencyData, setCurrencyData] = useState({
    amount: 0,
    from: '',
    to: '',
  });
  const [result, setResult] = useState({
    rate: 0,
    result: 0,
  });
  const defaultDate = {
    startDate: moment(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).format(
      'YYYY-MM-DD'
    ),
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    base: currencyData?.from,
  };

  const convertHandler = function () {
    convertCurrency(currencyData).then(res => {
      setResult({
        rate: res.data.info.rate,
        result: res.data.result,
      });
    });
    rateInDays(defaultDate);
  };
  const changeCurrency = function () {
    const fromCurr = currencyData.from;
    setCurrencyData({ ...currencyData, from: currencyData.to, to: fromCurr });
    rateInDays(defaultDate);
  };
  return (
    <Grid>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
          alignItems: 'end',
        }}
      >
        <TextField
          id="Amount"
          label="Amount"
          variant="standard"
          onChange={e =>
            setCurrencyData({ ...currencyData, amount: e.target.value })
          }
        />
        <TextField
          id="From"
          label="From"
          variant="standard"
          value={currencyData.from}
          onChange={e =>
            setCurrencyData({ ...currencyData, from: e.target.value })
          }
        />
        <IconButton
          size="small"
          edge="start"
          color="secondary"
          sx={{
            maxWidth: '40px',
            border: 'solid 1px ',
            borderRadius: '0',
            mx: 1,
          }}
          onClick={changeCurrency}
        >
          <CompareArrowsIcon />
        </IconButton>
        <TextField
          id="To"
          label="To"
          variant="standard"
          value={currencyData.to}
          onChange={e =>
            setCurrencyData({ ...currencyData, to: e.target.value })
          }
        />
        <Button variant="contained" onClick={convertHandler}>
          Convert
        </Button>
      </Box>
      <Box sx={{my : 2}}>
      {result.result !== 0 && (
        <ExchangeResult
          currencyData={currencyData}
          result={result}
          defaultDate={defaultDate}
        />
      )}
      </Box>
      
    </Grid>
  );
};

export default CurrencyConverter;
