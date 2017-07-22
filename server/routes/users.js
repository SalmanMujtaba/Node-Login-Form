var express = require('express');
var router = express.Router();
var {
    User
} = require('../models/user');
var {
    mongoose
} = require('../db/mongoose');


// Register
router.get('/register', function(req, res) {
    res.render('register');
});

// Login
router.get('/login', function(req, res) {
    res.render('login');
});


// Register User
router.post('/register', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Validation
    req.check('email', 'Email is already in use').isEmailAvailable();
    req.check('username', 'Username already in use').isUsernameAvailable();
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    req.getValidationResult().then((result) => {

        var errors = result.array();
        if (errors.length > 0) {
            console.log(errors);
            res.render('register', {
                errors
            });

        } else {
            var newUser = new User({
                name,
                email,
                username,
                password
            });

            newUser.save().then(() => {

                req.flash('success_msg', 'You are registered and can now login');
                res.redirect('/users/login');
                console.log(newUser);

            }).catch((e) => {
                console.log(e + 'something went wrong');
            });
        }
    });
});
module.exports = router;