import React, { useEffect, useState } from 'react';
import {
  Autocomplete,
  Button,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { convertCurrency, rateInDays } from '../../Api/api.services';
import { currenciesData, sevenDaysAgo } from '../../Assets/Data/mockData';
import ExchangeResult from '../ExchangeResult/ExchangeResult.component';
import moment from 'moment';

const CurrencyConverter = () => {
  const [conversionHistory, setConversionHistory] = useState([]);
  // const [selectedHistory , setSelectedHistory] = useState()
  const [currencyData, setCurrencyData] = useState({
    amount: '',
    from: '',
    to: '',
  });

  const [result, setResult] = useState({
    rate: 0,
    result: 0,
  });

  const convertHandler = () => {
    convertCurrency(currencyData).then(res => {
      setResult({
        rate: res.data.info.rate,
        result: res.data.result,
      });
    });
  };
  const changeCurrency = function () {
    const fromCurr = currencyData.from;
    setCurrencyData({ ...currencyData, from: currencyData.to, to: fromCurr });
  };

  const newConversionHandler = function () {
    setResult({ rate: 0, result: 0 });
    setCurrencyData({ amount: '', from: '', to: '' });
  };

  useEffect(() => {
    if (result.result !== 0) {
      const conversionData = {
        amount: currencyData.amount,
        from: currencyData.from,
        to: currencyData.to,
        date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      };
      setConversionHistory(curr => [...curr, conversionData]);
    }
  }, [result]);

  useEffect(() => {
    if (conversionHistory.length > 0) {
      localStorage.setItem('History', JSON.stringify(conversionHistory));
    }
  }, [conversionHistory]);

  useEffect(() => {
    const historySaved = JSON.parse(localStorage.getItem('History'));
    const viewSelectedHistory = JSON.parse(
      localStorage.getItem('selectedHistory')
    );
    if (historySaved) {
      setConversionHistory(historySaved);
    }
    if (viewSelectedHistory) {
      setCurrencyData(viewSelectedHistory);
      convertHandler();
      localStorage.removeItem('selectedHistory');
    }
  }, []);
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
          disabled={result.result !== 0}
          id="Amount"
          label="Amount"
          variant="standard"
          value={currencyData.amount}
          onChange={e =>
            setCurrencyData({ ...currencyData, amount: e.target.value })
          }
        />

        <Autocomplete
          disabled={result.result !== 0}
          options={currenciesData}
          value={currencyData.from}
          inputValue={currencyData.from}
          onInputChange={(event, newInputValue) => {
            setCurrencyData({ ...currencyData, from: newInputValue });
          }}
          renderInput={params => (
            <TextField {...params} label="From" variant="standard" />
          )}
        />
        <IconButton
          size="small"
          edge="start"
          color="primary"
          disabled={result.result !== 0}
          sx={{
            maxWidth: '40px',
            border: 'solid 1px',
            borderRadius: '0',
            mx: 0.5,
            bgcolor: 'white',
          }}
          onClick={changeCurrency}
        >
          <CompareArrowsIcon />
        </IconButton>
        <Autocomplete
          disabled={result.result !== 0}
          value={currencyData.to}
          options={currenciesData}
          inputValue={currencyData.to}
          onInputChange={(e, newInputValue) => {
            setCurrencyData({ ...currencyData, to: newInputValue });
          }}
          renderInput={params => (
            <TextField {...params} label="To" variant="standard" />
          )}
        />

        <Button
          variant="contained"
          onClick={result.result == 0 ? convertHandler : newConversionHandler}
        >
          {result.result !== 0 ? `Convert again` : `Convert`}
        </Button>
      </Box>
      <Box sx={{ my: 2 }}>
        {result.result !== 0 && (
          <ExchangeResult currencyData={currencyData} result={result} />
        )}
      </Box>
    </Grid>
  );
};

export default CurrencyConverter;
