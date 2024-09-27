import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const apiCall = () => {
  axios.get('http://localhost:9000/').then((res) => {
    //this console.log will be in our frontend console
    console.log(res.data)
  })
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <button onClick={apiCall}>Make API Call</button>
      </header>
    </div>
  );
}

export default App;
