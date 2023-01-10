import {
  AppBar,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import TabPanel from './TabPanel.component';
import CurrencyConverter from '../CurrencyConverter/CurrencyConverter.component';
import ExchangeHistory from '../ExchangeHistory/ExchangeHistory.component';

const Header = () => {
  const [value, setValue] = useState('1');

  const logoutHandler = function () {
    setValue('1');
    localStorage.removeItem('History');
  };

  return (
    <Box>
      <AppBar position="static" color="white">
        <Toolbar
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'stretch',
            fontSize: '24px',
          }}
        >
          <IconButton size="large" edge="start" color="inherit">
            <YoutubeSearchedForIcon />
            <Typography>currency Exchange</Typography>
          </IconButton>
          <Tabs
            sx={{ ml: '5', mt: 1 }}
            value={value}
            onChange={(e, newValue) => setValue(newValue)}
            textColor="inherit"
          >
            <Tab
              label="Currency Converter"
              value="1"
              id="1"
              sx={{ fontSize: '24px' }}
            />
            <Tab
              label="Conversion History"
              value="2"
              id="2"
              sx={{ fontSize: '24px' }}
            />
          </Tabs>
          <TabPanel value={value} index="1">
            {<CurrencyConverter />}
          </TabPanel>
          <TabPanel value={value} index="2">
            {<ExchangeHistory setValue={setValue} />}
          </TabPanel>
          <IconButton
            size="large"
            edge="start"
            color="primary"
            onClick={logoutHandler}
          >
            <Typography>Logout</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
