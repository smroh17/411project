const alpha = require('alphavantage')({key: 'qweqweqwe'});

export function fetchData () {
  return alpha.data.intraday('tsla').then(data => {
      console.log("hello");
    return data;
  });
}

//other stuff

// import logo from './logo.svg';
import './App.css';
import './testStockPrice';
import axios from 'axios';
import * as mui from '@material-ui/core';
//import Stock from "./Stock"
//import { fetchData } from './testStockPrice';
import {useEffect, useState} from "react";

const alpha = require('alphavantage')({key: 'qweqweqwe'});
require('dotenv').config();

// function App() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5000/api/tweets/tesla/2020-11-28").then((response) => {//tweet sentiment analysis
//       console.log(response.data);
//     });
//     // axios.get("http://localhost:4000").then((response) => {
//       // setUsers({users: response.data});
//       // console.log(users);
//       // console.log('asdzsd')
//     // })

//     axios.get('http://localhost:8000/api/stocks/tsla').then((response) => {//stock api
//       console.log(response.data);
//     });
//   }, []); // empty array parameter ensures this call only runs once like componentDidMount, adding variables will call the function again if the variables ever get updated or changed.

function fetchData(){
  const API_KEY= process.env.API_KEY;
  const keywords="tsla";
  let API_Call= `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${keywords}&apikey=${API_KEY}`;
  let stocksFunction= [];
  
  fetch(API_Call)
  .then(
    function(response) {
      return response.json();
    }
  )
  .then(
    function(data) {
      console.log(data);
      var len= data['bestMatches'].length;
      
      for (var i = 0; i < len; i++) {
          stocksFunction.push([[data.bestMatches[i]["1. symbol"]],[data.bestMatches[i]["2. name"]]]);
          
      }
      console.log(stocksFunction);
  
      // // console.log(stockChartXValuesFunction);
      // pointerToThis.setState({
      //   stocks: stocksFunction
      //   //st: stocksFunction;
      // });
    }
  )
  }


  function App(){
  return (
    <div className="App">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <header className="App-header">
        <p>
          STOCK MACHINE
        </p>
        {/* <Stock></Stock> */}
        <form >
          <input 
          id="frm1" 
          type="text"
          value={search}
          // onChange={event => setSearch(event.target.value)}/>
          />
        <mui.Button variant="contained" color="primary" type="submit" onClick={fetchData()}>Search</mui.Button>
        </form>
      {/* <p>{stockData}</p> */}
      </header>
    </div>
    
  );
  }

// Object.size = function(obj) {
//   let size = 0, key;
//   for (key in obj) {
//       if (obj.hasOwnProperty(key)) size++;
//   }
//   return size;
// };

export default App;
