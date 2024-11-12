import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home.jsx';
import House from './pages/House.jsx';
import History from './pages/History.jsx';
import Faq from './pages/Faq.jsx';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className='App'>
          <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/today" element={<House />} />
          <Route exact path="/history" element={<History />} />
          <Route exact path="/faq" element={<Faq />} />
          </Routes>
        </div>
      </Router>
   </ThemeProvider>
  );
}

export default App;
