// Accessing environment variables
require('dotenv').config()

// Importing express and app
var express = require("express");
var app = express();

// Importing Twit and Sentiment
const Twit = require('twit');
const Sentiment = require('sentiment');

// Listening on port 3000
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

// Creating API endpoint for getting tweets and calculating sentiment
app.get('/api/tweets/:company/:date', function (req, res){
    var company = req.params["company"].toLowerCase();
    var date = req.params["date"];

    const T = new Twit({
        consumer_key: process.env.CONSUMER_KEY, // Twitter Developer - https://developer.twitter.com
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
        strictSSL: true, // optional - requires SSL certificates to be valid.
      });

      T.get('search/tweets', { q: `${company} since:${date}`, count: 12, language: 'en'}, function(err, data, response) {
        var tweets = data.statuses;
        var sentiment_scores = [];
        var tweets_text = [];
        var response_obj = {};

        const sentiment = new Sentiment();

        for (var i = 0; i < tweets.length; i++) {
            sentiment_scores.push(sentiment.analyze(tweets[i].text).score);
            tweets_text.push(tweets[i].text)

          }

        function sentiment_mean(sentiment_scores) {
              return sentiment_scores.reduce((a, b) => a + b, 0) / sentiment_scores.length;
          }

        response_obj.tweets = tweets_text;
        response_obj.sentiment_scores = sentiment_scores;
        response_obj.mean_sentiment = sentiment_mean(sentiment_scores);

        res.json(response_obj);
      })
}) 