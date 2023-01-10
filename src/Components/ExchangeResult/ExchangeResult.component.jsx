import {
  Autocomplete,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { rateInDays } from "../../Api/api.services";
import ExchangeResultTable from "./ExchangeResultTable.component";
import { duration, sevenDaysAgo } from "../../Assets/Data/mockData";
const ExchangeResult = ({ currencyData, result }) => {
  
  const [rateHistory, setRateHistory] = useState();
  const [durationOfRate, setDurationOfRate] = useState(7);
  const startDayData = new Date(Date.now() - durationOfRate * 24 * 60 * 60 * 1000)
  let date  = {
    endDate:  moment(new Date()).format("YYYY-MM-DD"),
    startDate: moment(sevenDaysAgo).format("YYYY-MM-DD"),
    base: currencyData.from,
  }
  const durationHandler = function (e) {
    ;
    // // const calculateDate =;
 
    // rateInDays(date).then(res => {
    //   setRateHistory(res.data.rates);
    // });

  };
  const handleMuiSelectOnChange = ( event) => {
    setDurationOfRate(event.target.value)
   
    date ={
      endDate:  moment(new Date()).format("YYYY-MM-DD"),
      startDate: moment(startDayData).format("YYYY-MM-DD"),
      base: currencyData.from,
    };
    
   
    console.log(event.target.value);
  };



  useEffect(() => {
    rateInDays(date).then(res => {
      setRateHistory(res.data.rates);
    });
    console.log('render');
  }, [durationOfRate]);

  return (
    <Box>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          my: 3,
        }}
      >
        <Typography variant="h3">
          {currencyData.amount} {currencyData.from} ={" "}
          <span style={{ color: "#94C720" }}>
            {" "}
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
        <FormControl variant="standard" >
          <Select
            value={durationOfRate}
            onChange={handleMuiSelectOnChange}
            label="Duration"
          >
            {duration.map(day => (
              <MenuItem key={day.value} value={day.value}>
                {day.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
          {/* <Autocomplete
          sx={{minWidth : '200px'}}
          options={duration}
          inputValue={durationOfRate}
          onInputChange={(e, newInputValue) => {
            setDurationOfRate(newInputValue)
            console.log(newInputValue)
          }}
          renderInput={params => (
            <TextField {...params} label="Duration" variant="standard" />
          )}
          /> */}
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
