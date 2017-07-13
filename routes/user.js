var express = require('express');
var router = express.Router();

//Get Homepage
router.get('/register', function(req, res){
  res.render('register');
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/register', function(req, res){
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;
    var name = req.body.name;
    var name = req.body.name;
    console.log(name);
});


module.exports = router;
