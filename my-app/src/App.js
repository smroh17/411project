// import logo from './logo.svg';
import './App.css';
import './testStockPrice';
import axios from 'axios';
import * as mui from '@material-ui/core';
import { fetchData } from './testStockPrice';
import {useEffect, useState} from "react";


function App() {
  const AppNavigator = createStackNavigator({
    Home: {
      screen: SearchForm
    },
    Results: {
      screen: SearchResults
    }
  });
  const [users, setUsers] = useState([]);

  const AppContainer = createAppContainer(AppNavigator);

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

  return (
    <AppContainer/>;
  )

Object.size = function(obj) {
  let size = 0, key;
  for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

export default App;
