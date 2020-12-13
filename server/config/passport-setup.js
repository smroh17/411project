const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

passport.serializeUser((user, done) => { //serialize the user into a cookie session
  done(null, user.id);
});

passport.deserializeUser((id, done) => {//deserialize the user from the cookie session
  User.findById(id).then((user) => {
    done(null, id);
  })
})

passport.use(
  new GoogleStrategy({
    // options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  }, (accessToke, refreshToken, profile, done) => {
    // check if user exists in our db
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if (currentUser){
        //already have user
        console.log('user is: ', currentUser);
        done(null, currentUser);
      } else{
        //if not, create user in our db
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then((newUser) => {
          console.log('new user is created: ', newUser);
          done(null, newUser);
        }).catch((err) => {
          console.error(err);
        })
      }
    })
  })
)
