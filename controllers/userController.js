const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Message = require('../models/message');
const { body,validationResult } = require('express-validator');

exports.index = (req, res, next) => {
  Message.find({}, 'title timestamp text user')
    .populate('user')
    .exec((err, list_messages) => {
      res.render('index', {
        title: 'Member Only',
        user: req.user,
        messages: list_messages,
      });
    });
}

exports.log_in_post = ( 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  })
)

exports.log_out_get = (req, res) => {
  req.logout();
  res.redirect('/');
}

exports.sign_up_get = (req, res, next) => {
  res.render('sign-up', { title: 'Sign Up', errors: ''});
}

exports.sign_up_post = [
  body('username', 'username required').trim().isLength({
    min: 1
  }).escape(),
  body('first_name', 'first name required').trim().isLength({
    min: 1
  }).escape(),
  body('last_name', 'last name required').trim().isLength({
    min: 1
  }).escape(),
  body('password', 'password required').trim().isLength({
    min: 1
  }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render('sign-up', {
          title: 'Sign Up',
          errors: errors.array()
        });
      return;
    } else {
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if(err){
          return next(err);
        };

        const user = new User({
          username: req.body.username,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          password: hashedPassword,
        });

        user.save((err) => {
          if(err) {
            return next(err);
          };
          res.redirect('/')
        });
      });
    }
  }
];
