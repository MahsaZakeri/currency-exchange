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
import React from 'react';

const ExchangeResultTable = ({ rateHistory, base }) => {
  const rows = [];
  for (const key in rateHistory) {
    // console.log(`${key}: ${rateHistory[key][`${base}`]}`)
    rows.push(
      <TableRow key={key}>
        <TableCell align="left">{key}</TableCell>
        <TableCell align="left">{rateHistory[key][base]}</TableCell>
      </TableRow>
    );
  }
  console.log(rateHistory);
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
        HEllooooo
      </Grid>
    </Grid>
  );
};

export default ExchangeResultTable;
