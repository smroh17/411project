const alpha = require('alphavantage')({key: 'qweqweqwe'});

let symbol = 'aapl'

export function fetchData () {
  return alpha.data.intraday(symbol, 'compact', 'json', '60min').then(data => {
    return data;
  });
}
