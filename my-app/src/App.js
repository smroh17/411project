// import logo from './logo.svg';
import './App.css';
import './testStockPrice'
import * as mui from '@material-ui/core';
import { fetchData } from './testStockPrice';


function App() {
  fetchData();
  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <header className="App-header">
        <p>
          CS411 STOCK MACHINE
        </p>
        <mui.Button variant="contained" color="primary">does this work?</mui.Button>
      </header>
    </div>
  );
}

export default App;
