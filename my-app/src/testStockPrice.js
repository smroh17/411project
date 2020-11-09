const alpha = require('alphavantage')({key: 'qweqweqwe'});

export async function fetchData () {
    var data = await alpha.data.intraday('tsla');
    let datalength = Object.keys(data).length;
    console.log(datalength);
    return datalength;
}