import React from 'react';
import App from "./App";

var st= [];

class Stock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        stocks:[]
        //companyName: [],
        //companySymbol: []
      }
    }
  
    componentDidMount() {
      this.fetchStock();
    }
  

fetchStock(){
const pointerToThis= this; 
const API_KEY= '01Y8MBKXLAP7V4CZ';
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

    // console.log(stockChartXValuesFunction);
    pointerToThis.setState({
      stocks: stocksFunction
      //st: stocksFunction;
    });
  }
)
}

render() {
return (
<div>
  <h1>Stock Market</h1>
<p>Stock 1: {this.state.stocks}</p>
  {/* <Plot
    data={[
      {
        x: this.state.stockChartXValues,
        y: this.state.stockChartYValues,
        type: 'scatter',
        mode: 'lines+markers',
        marker: {color: 'red'},
      }
    ]}
    layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
  /> */}
</div>
)
}
}

export default Stock;