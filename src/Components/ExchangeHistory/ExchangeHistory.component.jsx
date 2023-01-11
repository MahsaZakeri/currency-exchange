import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
  TableHead,
  TableRow,
  Grid,
  IconButton,
  Typography,
  Card,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BorderClear } from '@mui/icons-material';
import { Box } from '@mui/system';
const ExchangeHistory = ({ setValue }) => {
  const [savedHistory, setSaveHistory] = useState([]);
  const [isHovering, setIsHovering] = useState(-1);
  const handleMouseOver = i => {
    setIsHovering(i);
  };

  const handleMouseOut = () => {
    setIsHovering(-1);
  };
  const viewCurrencyConverterHandler = history => {
    setValue('1');
    localStorage.setItem('selectedHistory', JSON.stringify(history));
    deleteHandler(history.date);
  };
  const deleteHandler = date => {
    const filteredHistory = savedHistory.filter(el => el.date !== date);
    localStorage.setItem('History', JSON.stringify(filteredHistory));
    setSaveHistory(filteredHistory);
  };
  useEffect(() => {
    const localStorageHistory = JSON.parse(localStorage.getItem('History'));

    if (localStorageHistory) {
      setSaveHistory(localStorageHistory);
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Grid item xs={6}>
        {savedHistory.length > 0 ? (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Event</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {savedHistory.map((history, i) => (
                  <TableRow
                    key={history.date}
                    onMouseEnter={() => handleMouseOver(i)}
                    onMouseLeave={handleMouseOut}
                  >
                    <TableCell align="left">{history.date}</TableCell>
                    <TableCell align="left">
                      Converted an amount of {history.amount} from{' '}
                      {history.from} to {history.to}
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{ display: isHovering === i ? 'block' : 'none' }}
                      >
                        <IconButton
                          size="small"
                          edge="start"
                          color="primary"
                          onClick={() => viewCurrencyConverterHandler(history)}
                        >
                          <RemoveRedEyeIcon sx={{ mx: 0.5 }} />
                          <Typography>View</Typography>
                        </IconButton>

                        <IconButton
                          size="small"
                          edge="start"
                          color="warn"
                          onClick={() => deleteHandler(history.date)}
                        >
                          <DeleteForeverIcon sx={{ mx: 0.5 }} />
                          <Typography>Delete from history</Typography>
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper align="center" sx={{ p: 3 }}>
            <Typography variant="h5">
              Sorry you have not any conversion data!
            </Typography>
          </Paper>
        )}
      </Grid>
    </Container>
  );
};

export default ExchangeHistory;
