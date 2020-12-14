import React, { Component } from 'react';
import * as mui from '@material-ui/core';
import LineGraph from '@chartiful/react-line-graph';
import './stockGraph.css';
import './home';
//npm i @chartiful/react-chart-builder @chartiful/react-line-graph to install dependencies for LineGraph

const alpha = require('alphavantage')({key: 'qweqweqwe'});

class StockGraph extends Component {

    
    constructor(props){
        super(props);
        this.state = {
            company: {}
        };
    }


    fetchData = () => {
        console.log(this.props)
        return alpha.data.intraday(this.props.companySymbol, 'compact', 'json', '60min').then(data => {
            return data;
        });
    };

    render() { 
        let company = this.state.company;
        let prices = [];


        return (
            <React.Fragment>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <div className = "App">
                
                    <mui.Button variant="contained" color="primary" onClick={() => {
                        this.fetchData().then(data => {
                            this.setState({company: data['Time Series (60min)']})
                        })
                    
                    }}>Get Prices</mui.Button>
                </div>
                <div>
                {       
                    Object.keys(company).map((value)=>{
                        prices.push(company[value]["1. open"])
                    })
                }  
                </div>
                <p>{this.props.companyName}</p>
                {console.log(this.props.companyName, this.props.companySymbol)}
                <LineGraph
                    data = {prices.slice(0, prices.length / 12).reverse()}
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
            </React.Fragment>
        );
    }
}
 
export default StockGraph;