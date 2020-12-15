import React, {Component} from 'react';
import * as mui from '@material-ui/core';
import LineGraph from '@chartiful/react-line-graph';
import './stockGraph.css';
import './home';
import axios from 'axios';
import {BrowserRouter, NavLink} from "react-router-dom";
import {Card, CardBody, CardTitle, CardText} from 'mdbreact';
//npm i @chartiful/react-chart-builder @chartiful/react-line-graph to install dependencies for LineGraph

const alpha = require('alphavantage')({key: 'qweqweqwe'});

class StockGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      company: {},
      tweets: [],
      sentiments: [],
      meanSenScore: ""
    };
  }

  fetchTweetData = () => {
    //const API_KEY= process.env.API_KEY;
    console.log(this.props.Search);
    let API_Call = `http://localhost:5000/api/tweets/${this.props.Search}/2020-12-1`;
    axios.get(API_Call).then((response) => {
      this.setState({
        tweets: response.data.tweets,
        sentiments: response.data.sentiment_scores,
        meanSenScore: response.data.mean_sentiment
      });

      console.log(this.state.tweets);

    });

  }
  fetchData = () => {
    console.log(this.props.companySymbol)
    return alpha.data.intraday((this.props.companySymbol).toLowerCase(), 'compact', 'json', '60min').then(data => {
      return data;
    });
  };

  componentDidMount() {
    //load stock and twitter data upon page load
    this.fetchData().then(data => {
      this.setState({company: data['Time Series (60min)']})
    })
    this.fetchTweetData()
  }

  render() {
    let company = this.state.company;
    let prices = [];


    return (
      <React.Fragment>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <NavLink to="/">
          <div style={{position:'absolute'}}>
            <mui.Button variant="contained" color="primary">Back</mui.Button>
          </div>
        </NavLink>
        <header className="App-header">
          <div className="App">


          </div>
          <div>
            {
              Object.keys(company).map((value) => {
                prices.push(company[value]["1. open"])
              })
            }
          </div>
          <p>{this.props.companyName}</p>
          <LineGraph
            data={prices.slice(0, prices.length / 12).reverse()}
            width={1100}
            height={300}
            lineColor='#347975'
            dotColor='#347975'
            lineWidth={3}
            hasDots={true}
            baseConfig={{
              startAtZero: false,
              hasXAxisBackgroundLines: true,
              xAxisLabelStyle: {
                prefix: '$',
                decimals: 2,
                xOffset: -20
              },
            }}
            style={{
              marginBottom: 30,
              padding: 10,
              paddingTop: 20,
              borderRadius: 20,
              width: 1100,
              backgroundColor: `#dbf0ef`
            }}
          />

          <div>
            <h3>Tweets</h3>
            <p>Mean Sentiment: {this.state.meanSenScore}</p>
            {this.state.tweets.map((val) => {
                return (
                  <div className="card">
                    <Card border="dark" style={{width: '60rem', height: 'auto'}}>
                      <CardBody>
                        <CardTitle style={{color: '#000000'}} title={val}>{val}</CardTitle>
                        <CardText>Sentiment Score: {this.state.sentiments[this.state.tweets.indexOf(val)]}</CardText>
                      </CardBody>
                    </Card>
                  </div>
                );
              }
            )
            }

          </div>
        </header>
      </React.Fragment>

    );
  }
}

export default StockGraph;
