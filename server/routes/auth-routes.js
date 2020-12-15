const router = require('express').Router(); //creates an instance of a router which we can attach routes to it.
const passport = require('passport');
const User = require('../models/user-model');

// auth login
router.get('/login', (req, res) => {
  console.log('request to login');
  res.send('logging in');
})

// auth logout
router.get('/logout', ((req, res) => {
  //handle using passport.js
  req.logout();
  res.redirect('http://localhost:3000/')
}))

//auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'),
  (req, res) => {//exchange the code from google redirect URI for profile info
    res.redirect('/profile?id='+req.user.user.id);
  }
)

router.get('/user', (req, res) => {
  User.findById(req.query.id).then((userData) => {
    console.log(userData);
    res.send(userData);
  });
})

module.exports = router;
