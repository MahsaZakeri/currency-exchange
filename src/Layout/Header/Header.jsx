import { AppBar, IconButton, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import YoutubeSearchedForIcon from '@mui/icons-material/YoutubeSearchedFor';
import TabPanel from "../../Components/TabPanel";
import CurrencyConverterPage from '../../Pages/CurrencyConverter/CurrencyConverterPage'
import ConversionHistory from '../../Pages/ConversionHistory/ConversionHistory'

const Header = () =>{
    const [value, setValue] = React.useState('1');
    const handleChange = (e, newValue) => {
        setValue(newValue);
      };

    return(
        <Box  >
            <AppBar position="static" color='tableHeaderText' >
            <Toolbar sx={{ flexGrow:1 ,  display: 'flex' ,justifyContent: 'space-between' }}>
            
                    <IconButton
            size="large"
            edge="start"
            color="inherit"
          >
            <YoutubeSearchedForIcon />
            <Typography >
                    currency Exchange
            </Typography>
            </IconButton>
              <Tabs sx={{ml : '5'}} value={value} onChange={handleChange}
                textColor='inherit'  variant="fullWidth" >
                 
               <Tab label="Currency Converter" value='1' id='1' sx={{fontSize:'24px'}}/>
               <Tab label="Conversion History" value='2' id='2' sx={{fontSize:'24px'}}/>
              </Tabs>
              <TabPanel value={value} index='1'>
                {<CurrencyConverterPage /> }
                </TabPanel>
                <TabPanel value={value} index='2'>
                {<ConversionHistory /> }
                </TabPanel>
                <Typography >
                  Logout
                </Typography>
            </Toolbar>
          </AppBar>
        </Box>
    )
}
export default Header