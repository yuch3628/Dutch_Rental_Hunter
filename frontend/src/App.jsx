import './App.css';

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
          </Routes>
        </div>
      </Router>
   </ThemeProvider>
  );
}

export default App;
