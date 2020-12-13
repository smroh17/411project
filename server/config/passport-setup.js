const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

passport.use(
  new GoogleStrategy({
    // options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }, (accessToke, refreshToken, profile, done) => {
    // passport callback function
    console.log('passport cb function fired');
    console.log(profile);
  })
)
