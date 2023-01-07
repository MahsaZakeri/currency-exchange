import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#009688"
    },
    secondary: {
      main: "#94C720"
    },
    warn: {
      main: "#C70D38"
    },
    defaultText: {
      main: "#404040"
    },
    tableHeaderText: {
      main: "#8D8D8D"
    }
},

components:{
  MuiButtonBase:{
    styleOverrides: {
    root:{
      MuiTab:{
        styleOverrides:{
          root:{
            fontFamily : 'Roboto',
            fontSize :' 1.5rem',
            fontWeight : '900'
          }
        }
      }
    }
  }
  }
  
}
});