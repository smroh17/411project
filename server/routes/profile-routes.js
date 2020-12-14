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
    res.redirect('http://localhost:3000/') // next time do tokens and send it to frontend
  });

})

module.exports = router;
