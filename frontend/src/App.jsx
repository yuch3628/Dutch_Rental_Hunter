import './App.css';
import {primary,secondary,background} from './style/color.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import House from './pages/House.jsx';
import History from './pages/History.jsx';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

let theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    background: {
      default: background,
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <div className='App'>
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/today" element={<House />} />
          <Route exact path="/history" element={<History />} />
          </Routes>
        </div>
      </Router>
   </ThemeProvider>
  );
}

export default App;
