
import Header from './Components/Header/Header.component';
import {ThemeProvider } from '@mui/material/styles';
import { theme } from './Assets/Theme/Theme'
function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
        <Header />
    </div>
    </ThemeProvider>
  );
}

export default App;
