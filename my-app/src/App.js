// import logo from './logo.svg';
import './App.css';
import './testStockPrice';
import axios from 'axios';
import * as mui from '@material-ui/core';
import { fetchData } from './testStockPrice';
import {useEffect, useState} from "react";


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // axios.get("http://localhost:5000/api/tweets/tesla/2020-11-28").then((response) => {//tweet sentiment analysis
    //   console.log(response.data);
    // });
    // axios.get('http://localhost:8000/api/stocks/tsla').then((response) => {//stock api
    //   console.log(response.data);
    // });
  }, []); // empty array parameter ensures this call only runs once like componentDidMount, adding variables will call the function again if the variables ever get updated or changed.

  let tesla = {};
  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <header className="App-header">
        <p>
          CS411 STOCK MACHINE
        </p>
        <mui.Button variant="contained" color="primary" onClick={() => {
          fetchData().then(data => {
            console.log(data);
          })
        }}>does this work?</mui.Button>
        <mui.Button variant="contained" color="primary" onClick={() => {
          fetchData().then(data => {
            tesla = data;
            axios.get("http://localhost:4000/auth/login").then(response => {
              console.log(response);
            })
          })
        }}>Google+</mui.Button>
      </header>
    </div>
  );
}

Object.size = function(obj) {
  let size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

export default App;
