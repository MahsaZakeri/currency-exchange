import { Divider, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { rateInDays } from '../Services/services';
import ExchangeResultTable from './ExchangeResultTable';


const ExchangeResult = ({ currencyData, result , defaultDate}) => {
  const [date, setDate] = useState({
    startDate: defaultDate.startDate,
    endDate: defaultDate.endDate,
    base: defaultDate.base,
  });
  const [rateHistory , setRateHistory] = useState() 
  const duration = [
    {
      value: 7,
      label: '7 Days',
    },
    {
      value: 14,
      label: '14 Days',
    },
    {
      value: 30,
      label: '30 Days',
    },
    {
      value: 40,
      label: '40 Days',
    },
  ];

  const durationHandler = function (e) {
    const calculateDate = new Date(
        Date.now() - e.target.value * 24 * 60 * 60 * 1000
        );
    e.preventDefault()
    setDate({
      startDate: moment(calculateDate).format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD'),
      base: currencyData.from,
    });
   rateInDays(date).then(res => {
    setRateHistory(res.data.rates)
  })
  
};

  useEffect(()=>{
    rateInDays(date).then(res => {
      setRateHistory(res.data.rates)
    })
  },[])
  return (
    <>
      <Divider />
      <Box  sx={{my : 3}}>
        <Typography variant='h3'>
          {currencyData.amount} {currencyData.from} = <span style={{color : "#94C720"}}> {result.result}{' '}
          {currencyData.to}</span>
        </Typography>
        <Typography>
          1 {currencyData.from} = {result.rate} {currencyData.to}
        </Typography>
      </Box>
      <Divider />
      <Grid container direction="column" alignItems="flex-start" sx={{my : 3}}>
        <Typography>Exchange History</Typography>
        <TextField
          sx={{ width: '200px', my: 3 }}
          id="duration"
          select
          label="Duration"
         defaultValue={7}
          variant="standard"
          SelectProps={{
            native: true,
          }}
          onChange={durationHandler}
        >
          {duration.map(day => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </TextField>
      </Grid>
      <Grid container spacing={2}>
        <ExchangeResultTable rateHistory={rateHistory} base={ currencyData.from}/>
      </Grid>
    </>
  );
};

export default ExchangeResult;
