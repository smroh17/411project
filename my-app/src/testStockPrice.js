const alpha = require('alphavantage')({key: 'qweqweqwe'});

export function fetchData () {
  return alpha.data.intraday('tsla').then(data => {
    return data;
  });
}
