// import './App.css';
import Routes from './routes';
import { ThemeProvider, createTheme } from '@mui/material';

function App() {

  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Routes/>
    </ThemeProvider>
  );
}

export default App;
