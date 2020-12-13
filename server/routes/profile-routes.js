const router = require('express').Router();
const User = require('../models/user-model');
const authCheck = (req, res, next) => {
  User.findById(req.user).then((user) => {
    if (!user){
      //if user is not logged in or not found
      res.redirect('/auth/login');
    } else{
      //if logged in
      next();
    }
  })
};


router.get('/', authCheck, (req, res) => {
  User.findById(req.user).then((user) => {
    res.send('you are logged in, this is your profile - ' + user.username);
  });

})

module.exports = router;
