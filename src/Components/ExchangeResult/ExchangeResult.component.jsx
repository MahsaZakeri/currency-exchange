import {
  Autocomplete,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import { rateInDays } from '../../Api/api.services';
import ExchangeResultTable from './ExchangeResultTable.component';
import { duration, sevenDaysAgo } from '../../Assets/Data/data';
import ExchangeResultChart from './ExchangeResultChart.component';
const ExchangeResult = ({ currencyData, result }) => {
  const [rateHistory, setRateHistory] = useState();
  const [durationOfRate, setDurationOfRate] = useState('7');
  const [resultView, setResultView] = useState('Table');
  //calculating sencond currency rate
  const otherCurrencyRate = (Math.round((1 / result.rate) * 100) / 100).toFixed(
    6
  );

  let date = {
    endDate: moment(new Date()).format('YYYY-MM-DD'),
    startDate: moment(sevenDaysAgo).format('YYYY-MM-DD'),
    base: currencyData.from,
  };

  useEffect(() => {
    if (durationOfRate !== '7') {
      //calculating the start date of rates
      const startDayData = new Date(
        Date.now() - Number(durationOfRate) * 24 * 60 * 60 * 1000
      );
      date = {
        endDate: moment(new Date()).format('YYYY-MM-DD'),
        startDate: moment(startDayData).format('YYYY-MM-DD'),
        base: currencyData.from,
      };
    }

    rateInDays(date).then(res => {
      setRateHistory(res.data.rates);
    });
  }, [durationOfRate]);

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          my: 3,
        }}
      >
        <Typography variant="h3">
          <span style={{ fontWeight: 300 }}>
            {currencyData.amount === '' ? 1 : currencyData.amount}{' '}
            {currencyData.from} ={' '}
          </span>
          <span style={{ color: '#94C720' }}>
            {' '}
            {result.result} {currencyData.to}
          </span>
        </Typography>
        <Typography>
          1 {currencyData.from} = {result.rate} {currencyData.to}
        </Typography>
        <Typography>
          1 {currencyData.to} = {otherCurrencyRate} {currencyData.from}
        </Typography>
      </Box>
      <Divider />
      <Grid container direction="column" alignItems="flex-start" sx={{ my: 3 }}>
        <Typography variant="h5">Exchange History</Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '50%',
          }}
        >
          <Autocomplete
            isOptionEqualToValue={(option, value) =>
              value.label === option.label
            }
            sx={{ minWidth: '200px', my: 2 }}
            options={duration}
            value={durationOfRate}
            inputValue={durationOfRate}
            onInputChange={(e, newInputValue) => {
              setDurationOfRate(newInputValue);
            }}
            renderInput={params => (
              <TextField {...params} label="Duration" variant="standard" />
            )}
          />
          <RadioGroup
            row
            value={resultView}
            onChange={e => setResultView(e.target.value)}
          >
            <FormControlLabel value="Table" control={<Radio />} label="Table" />
            <FormControlLabel value="Chart" control={<Radio />} label="Chart" />
          </RadioGroup>
        </Box>
      </Grid>
      <Grid container spacing={2}>
        {resultView === 'Table' ? (
          <ExchangeResultTable
            rateHistory={rateHistory}
            base={currencyData.from}
          />
        ) : (
          <ExchangeResultChart
            rateHistory={rateHistory}
            base={currencyData.from}
          />
        )}
      </Grid>
    </Box>
  );
};

export default ExchangeResult;
