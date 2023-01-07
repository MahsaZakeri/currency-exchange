import {
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
  TableHead,
  TableRow,
  Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

const ExchangeResultTable = ({ rateHistory, base }) => {
  const allRates = []
  const [statics , setStatics] = useState({
    lowest : '',
    highest : '' , 
    avarage: ''
  })
  const rows = [];
  for (const key in rateHistory) {
    allRates.push(rateHistory[key][base])
    rows.push(
      <TableRow key={key}>
        <TableCell align="left">{key}</TableCell>
        <TableCell align="left">{rateHistory[key][base]}</TableCell>
      </TableRow>
    );
  }

  const calculateStatics = function(){
    let avarageRate = 0
    for(let i = 0 ; i < allRates.length ; i++){
      avarageRate += allRates[i]
    }
    setStatics({lowest : String(Math.min(...allRates)) , avarage : avarageRate/allRates.length , highest :String(Math.max(...allRates)) })
   
  }

  useEffect(() => {
    calculateStatics()
  }, [rateHistory]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Date</TableCell>
                <TableCell align="left">Exchange Rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={6}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Static</TableCell>
              <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell  component="th" scope="row" align="left">Lowest</TableCell>
                <TableCell align="left">{statics?.lowest}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Highest</TableCell>
                <TableCell align="left">{statics?.highest}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell align="left">Avarage</TableCell>
                <TableCell align="left">{statics?.avarage}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ExchangeResultTable;
