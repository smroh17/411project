import React, { Component } from 'react';
import {fetchData} from '../testStockPrice';
import * as mui from '@material-ui/core';
import LineGraph from '@chartiful/react-line-graph';
import './stockGraph.css';
//npm i @chartiful/react-chart-builder @chartiful/react-line-graph to install dependencies for LineGraph

class StockGraph extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            tesla: {},
            name: "Apple"
        };
    }

    render() { 
        let tesla = this.state.tesla;
        let prices = [];
        let dates = [];


        return (
            <React.Fragment>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <div className = "App">
                
                    <mui.Button variant="contained" color="primary" onClick={() => {
                        fetchData().then(data => {
                            this.setState({tesla: data['Time Series (60min)']})
                        })
                    
                    }}>Get Prices</mui.Button>
                </div>
                <div>
                {       
                    Object.keys(tesla).map((value)=>{
                        prices.push(tesla[value]["1. open"])
                    })
                }   

                {
                    Object.keys(tesla).map((value)=>{
                        dates.push(value)
                    })
                }
                </div>
                <p>{this.state.name}</p>
                {console.log(dates.slice(0, dates.length/ 12).reverse())}
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