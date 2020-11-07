const Stocks = require('stocks.js');
const stocks = new Stocks('01Y8MBKXLAP7V4CZ');


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
  amount: 10
}

async function request () {
  var result = await stocks.timeSeries(options);
  
    console.log(result);
    return result;
}

let req = request();

exports.req = req; 


//request();