const router = require('express').Router();
const User = require('../models/user-model');
const authCheck = (req, res, next) => {
  if (req.isAuthenticated()){
    next();
  }
  else{
    res.redirect('/auth/login');
  }
};

router.get('/', authCheck, (req, res) => {
  res.redirect('http://localhost:3000?id='+req.query.id);
})

module.exports = router;
