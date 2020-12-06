// Accessing environment variables
require('dotenv').config()

// Initializing stock API instance
const alpha = require('alphavantage')({ key: process.env.API_KEY });

// Importing express and app
var express = require("express");
var app = express();

// Listening on port 8000
app.listen(8000, () => {
    console.log("Server running on port 8000");
   });

// Creating API endpoint for getting stock data
app.get('/api/stocks/:ticker', function (req, res){
    var ticker = req.params['ticker'].toLowerCase();
    alpha.data.daily(ticker, 'compact', 'json', '60min').then(data => {
        res.send(data);
    });
})