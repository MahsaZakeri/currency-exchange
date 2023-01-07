import { Box } from "@mui/material";
import React from "react";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
      >
        {value === index && (
          <Box sx={{ position : "absolute" ,top : '80px' , left : '0' , width : '100%'}}>
           {children}
          </Box>
        )}
      </div>
    );
  }

  export default TabPanel