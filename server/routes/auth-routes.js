const router = require('express').Router(); //creates an instance of a router which we can attach routes to it.

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
router.get('/google', (req, res) => {
  //handle using passport.js
  res.send('logging in with google');
})

module.exports = router;
