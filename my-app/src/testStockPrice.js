const alpha = require('alphavantage')({key: 'qweqweqwe'});

export async function fetchData () {
    var data = await alpha.data.intraday('tsla');
    console.log(data);
    return data;
}