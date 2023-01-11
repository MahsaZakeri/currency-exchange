import { Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
  palette: {
    primary: {
      main: '#009688',
    },
    secondary: {
      main: '#94C720',
    },
    warn: {
      main: '#C70D38',
    },
    white: {
      main: '#fffffff',
    },
    text: {
      primary: '#404040',
      secondary: '#8D8D8D',
    },
  },

  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          MuiTab: {
            styleOverrides: {
              root: {
                fontFamily: 'Roboto',
                fontSize: ' 1.5rem',
                fontWeight: '900',
              },
            },
          },
        },
      },
    },
  },
  typography: {
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
  },
});
