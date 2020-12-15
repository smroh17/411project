import React, {Component} from 'react'
import {BrowserRouter, NavLink} from "react-router-dom";
import axios from 'axios';
import {Card, CardBody, CardTitle, CardText} from 'mdbreact'
import * as mui from '@material-ui/core';

import './home.css';
import queryString from "query-string";


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    const cache = window.localStorage.getItem('jwt');
    const query = cache ?
      cache :
      queryString.parse(this.props.location.search).id
    if (query) {
      window.localStorage.setItem("jwt", query);
      this.props.history.push("/");
      axios.get('http://localhost:4000/auth/user?id=' + query).then((res) => {
        this.props.updateUsername(res.data.username);
      })
    }
  }

  //when form is submitted, call the API for search results
  handleSubmit = (event) => {
    event.preventDefault()
    const data = this.state
    const API_KEY = process.env.API_KEY;
    let API_Call = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${data.Search}&apikey=${API_KEY}`;
    axios.get(API_Call).then((response) => {
      this.props.updateResult(response.data.bestMatches);
    });

  }

  handleInputChange = (event) => {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const userId = window.localStorage.getItem('jwt');
    return (
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <div className="login">
          {
            userId ?
              <mui.Button  variant="contained" color="primary" onClick={() => {
                this.props.updateUsername("");
                window.localStorage.clear();
                window.open("http://localhost:4000/auth/logout", "_self");
              }}>Logout
              </mui.Button> :
              <mui.Button variant="contained" color="primary" onClick={() => {
                window.open("http://localhost:4000/auth/google", "_self");
              }}>Google+
              </mui.Button>
          }
        </div>
        <header className="App-header">

          {this.props.username ?
            <h1>Welcome {this.props.username}!</h1> :
            <h1>Stock Machine</h1>
          }
          <p>Search for a stock below</p>
          <form onSubmit={this.handleSubmit}>
            <input type='text' name='Search' onChange={this.handleInputChange}/>
            <mui.Button variant="contained" color="primary" type="submit">Search</mui.Button>
            <NavLink to="/stockgraph">
              {this.props.result.map((val) => {
                  return (
                    <div className="card">
                      <Card border="dark" style={{width: '30rem', height: '5rem'}} onClick={() => {
                        this.chooseStock(val["2. name"], val["1. symbol"])
                      }}>
                        <CardBody>
                          <CardTitle style={{color: '#000000'}} title={val["2. name"]}>{val["2. name"]}</CardTitle>
                          <CardText>{val["1. symbol"]}</CardText>
                        </CardBody>
                      </Card>
                    </div>
                  );
                }
              )
              }
            </NavLink>
            <div className="col-md-3" style={{marginTop: '20px'}}>
            </div>

          </form>
        </header>
      </div>
    )
  }

  //called when user clicks on a stock card
  async chooseStock(name, symbol) {
    console.log("choosen", name);
    console.log("choosen", symbol);
    this.props.updateCN(name)
    this.props.updateCS(symbol)
    console.log(this.props.companySymbol);
    //now stock is choosen, navigate to next page here

  }


}

export default Home
