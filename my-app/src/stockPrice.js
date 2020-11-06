var Stocks = require('stocks.js')
var stocks = new Stocks('Z1GV1ER2RRMHAFL7');


module.exports = {
    fetchData: symbol => {
      const options = {
        symbol: 'TSLA',
        interval: 'daily',
        start: Date('2020-11-01'),
        end: Date('2020-11-05')
      }
  
      return stocks.timeSeries(options);
    }
}
