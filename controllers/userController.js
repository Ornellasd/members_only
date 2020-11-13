const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Message = require('../models/message');


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

exports.sign_up_get = (req, res, next) => {
  res.render('sign-up', { title: 'Sign Up'});
}

exports.sign_up_post = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
    if(err) {
      return next(err);
    };
    const user = new User({
      username: req.body.username,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: hashedPassword
    }).save(err => {
      if(err) {
        return next(err);
      };
      res.redirect('/');
    })
  });
}