// Accessing environment variables
require('dotenv').config()

// Importing express and app
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());

// Importing Twit and Sentiment
const Twit = require('twit');
const Sentiment = require('sentiment');


// Initializing the Twit instance
const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY, // Twitter Developer - https://developer.twitter.com
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

// Calculating the mean of an array
function calculate_mean(num_array) {
  return num_array.reduce((a, b) => a + b, 0) / num_array.length;
}

// Listening on port 5000
app.listen(5000, () => {
 console.log("Server running on port 5000");
});

// Creating API endpoint for getting tweets and calculating sentiment
app.get('/api/tweets/:company/:date', function (req, res){
  const company = req.params["company"].toLowerCase();
  const date = req.params["date"];

  T.get('search/tweets', { q: `${company} since:${date}`, count: 300}, function(err, data, response) {
    const tweets = data.statuses;
    const sentiment_scores = [];
    const tweets_text = [];
    const response_obj = {};

    const sentiment = new Sentiment();

    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].lang === 'en') {
        sentiment_scores.push(sentiment.analyze(tweets[i].text).score);
        tweets_text.push(tweets[i].text)
      }
    }

    response_obj.tweets = tweets_text;
    response_obj.sentiment_scores = sentiment_scores;
    response_obj.mean_sentiment = calculate_mean(sentiment_scores);

    res.json(response_obj);
  })
})
