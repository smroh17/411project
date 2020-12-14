const alpha = require('alphavantage')({key: 'qweqweqwe'});

export function fetchData () {
  return alpha.data.intraday('tsla', 'compact', 'json', '60min').then(data => {
    return data;
  });
}
