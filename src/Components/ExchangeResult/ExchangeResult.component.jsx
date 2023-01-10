import {
  Autocomplete,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { rateInDays } from '../../Api/api.services';
import ExchangeResultTable from './ExchangeResultTable.component';
import { duration, sevenDaysAgo } from '../../Assets/Data/mockData';
const ExchangeResult = ({ currencyData, result }) => {
  const [rateHistory, setRateHistory] = useState();
  const [durationOfRate, setDurationOfRate] = useState('7');

  let date = {
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    startDate: moment(sevenDaysAgo).format('YYYY-MM-DD'),
    base: currencyData.from,
  };

  useEffect(() => {
    const startDayData = new Date(
      Date.now() - Number(durationOfRate) * 24 * 60 * 60 * 1000
    );
    date = {
      endDate: moment(new Date()).format('YYYY-MM-DD'),
      startDate: moment(startDayData).format('YYYY-MM-DD'),
      base: currencyData.from,
    };
    rateInDays(date).then(res => {
      setRateHistory(res.data.rates);
    });
    console.log('render1', durationOfRate);
  }, [durationOfRate]);

  useEffect(() => {
    rateInDays(date).then(res => {
      setRateHistory(res.data.rates);
    });
    console.log('rende2r', rateHistory);
  }, []);

  return (
    <Box>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          my: 3,
        }}
      >
        <Typography variant="h3">
          {currencyData.amount} {currencyData.from} ={' '}
          <span style={{ color: '#94C720' }}>
            {' '}
            {result.result} {currencyData.to}
          </span>
        </Typography>
        <Typography>
          1 {currencyData.from} = {result.rate} {currencyData.to}
        </Typography>
      </Box>
      <Divider />
      <Grid container direction="column" alignItems="flex-start" sx={{ my: 3 }}>
        <Typography variant="h5">Exchange History</Typography>
        <Autocomplete
          sx={{ minWidth: '200px', my: 2 }}
          options={duration}
          value={durationOfRate}
          inputValue={durationOfRate}
          onInputChange={(e, newInputValue) => {
            setDurationOfRate(newInputValue);
            console.log(newInputValue);
          }}
          renderInput={params => (
            <TextField {...params} label="Duration" variant="standard" />
          )}
        />
      </Grid>
      <Grid container spacing={2}>
        <ExchangeResultTable
          rateHistory={rateHistory}
          base={currencyData.from}
        />
      </Grid>
    </Box>
  );
};

export default ExchangeResult;
