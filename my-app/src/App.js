import React, { Component } from 'react'
import axios from 'axios';
import { Card, CardBody, CardTitle, CardText } from 'mdbreact';
import './testStockPrice';
import * as mui from '@material-ui/core';
import { IconButton } from '@material-ui/core';

import './App.css';


class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            Search: '',
            result: [],
            //These are the choosen name and symbol changes
            companyName: '',
            companySymbol: ''
        }
    }
    //when form is submitted, call the API for search results
    handleSubmit = (event) => {
        event.preventDefault()
        const data = this.state
        const API_KEY= process.env.API_KEY;
        let API_Call= `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${data.Search}&apikey=${API_KEY}`;
        axios.get(API_Call).then((response) => {
       console.log(response.data);
       this.setState({
        result: response.data.bestMatches
     });

    });

  }

    handleInputChange = (event) => {
        event.preventDefault()
       this.setState({
           [event.target.name]: event.target.value
       })
    }

  render () {
      const {myFullName} = this.state
    return (
      <div  className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <header className="App-header">
        <h1>Stock Machine</h1>
        <form onSubmit={this.handleSubmit}>
            <input type='text' name='Search' onChange={this.handleInputChange}/>
          <mui.Button variant="contained" color="primary" type="submit">Search</mui.Button>
          {this.state.result.map((val, key) =>{
            return(
              <div className="card">
            <Card border="dark" style={{ width: '30rem', height: '5rem' }} onClick={() => {this.chooseStock(val["2. name"], val["1. symbol"] )}}>
            <CardBody>
                <CardTitle style={{ color: '#000000' }} title={val["2. name"]}>{val["2. name"]}</CardTitle>
                <CardText>{val["1. symbol"]}</CardText>
            </CardBody>
        </Card>
        </div>
            );
          }
          )
        }
          <div className="col-md-3" style={{ marginTop : '20px' }}>
        </div>
        </form>
        </header>
      </div>
    )
  }

  //called when user clicks on a stock card
  async chooseStock(name, symbol){
    console.log("choosen", name);
    console.log("choosen", symbol);
    var x = await this.setState({
      companyName: name,
      companySymbol: symbol
   });
   console.log(this.state);
   //now stock is choosen, navigate to next page here 

  }
  

}

export default App
