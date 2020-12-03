# Making An API Call

First run `npm install` to install the dependencies and then start up the server by running `node server.js`.

The API calls will take the following form:
http://localhost:3000/api/tweets/{companyname}/{date}

The `companyname` is just the name of the company in lowercase. The `date` will be the date from where you want to start seeing tweets. The API doesn't allow to search specific days. 

For example, to analyze the sentiment of Tesla tweets since November 28, 2020, you would make the following API call:
http://localhost:3000/api/tweets/tesla/2020-11-28

This would analyze the sentiment of all Tesla tweets from November 28, 2020 to the present day.
