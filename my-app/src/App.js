// import logo from './logo.svg';
import './App.css';
import './testStockPrice';
import axios from 'axios';
import * as mui from '@material-ui/core';
//import { fetchData } from './testStockPrice';
import {useEffect, useState} from "react";
const alpha = require('alphavantage')({key: 'qweqweqwe'});


function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/tweets/tesla/2020-11-28").then((response) => {//tweet sentiment analysis
      console.log(response.data);
    });
    // axios.get("http://localhost:4000").then((response) => {
      // setUsers({users: response.data});
      // console.log(users);
      // console.log('asdzsd')
    // })
    axios.get('http://localhost:8000/api/stocks/tsla').then((response) => {//stock api
      console.log(response.data);
    });
  }, []); // empty array parameter ensures this call only runs once like componentDidMount, adding variables will call the function again if the variables ever get updated or changed.

  var stockData = "<p>";
  var search;

  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <header className="App-header">
        <p>
          CS411 STOCK MACHINE
        </p>
        <form>
        <label>
          <input type="text" value= {search}/>
        </label>
        <mui.Button variant="contained" color="primary" type="submit" onClick={() => {
          fetchData().then(data => {
            console.log(data);
            stockData+= data["Meta Data"]["1. Information"];
            stockData+="</p>"
            console.log(stockData);
          })
        }}>Search</mui.Button>
        </form>
      <p>{search}</p>
        <script>
        document.write=(stockData);
        </script>
      </header>
    </div>
  );
}

export function fetchData () {
  return alpha.data.intraday('tsla').then(data => {
    return data;
  });
}
Object.size = function(obj) {
  let size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

export default App;
