const router = require('express').Router(); //creates an instance of a router which we can attach routes to it.
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
  console.log('request to login');
  res.send('logging in');
})

// auth logout
router.get('/logout', ((req, res) => {
  //handle using passport.js
  res.send('logging out');
}))

//auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {//exchange the code from google redirect URI for profile info
  res.send('you reached the callback URI');
})

module.exports = router;
