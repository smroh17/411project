const Stocks = require('stocks.js');
const stocks = new Stocks('01Y8MBKXLAP7V4CZ');
//var stocks = new Stocks('SYTCQBUIU44BX2G4');


// module.exports = {ß
//     fetchData: symbol => {
//       const options = {
//         symbol: 'TSLA',
//         interval: 'daily',
//         start: Date('2020-11-01'),
//         end: Date('2020-11-05')
//       }

//       console.log(stocks.timeSeries(options));
  
//       return stocks.timeSeries(options);
//     }
// }
  const options = {
    symbol: 'TSLA',
    interval: 'daily',
    start: new Date('2017-07-01'),
    end: new Date('2017-07-09')
  }

  async function request () {
    var result = await stocks.timeSeries(options);
    
     return result;
  }

  module.exports = () => {
    return request();
  }

request();