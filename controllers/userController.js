const passport = require('passport');
const bcrypt = require('bcryptjs');
const {
  body,
  validationResult
} = require('express-validator');

const User = require('../models/user');
const Message = require('../models/message');

exports.index = (req, res, next) => {
  Message.find({}, 'title timestamp text user')
    .populate('user')
    .exec((err, list_messages) => {
      res.render('index', {
        title: 'Members Only',
        user: req.user,
        messages: list_messages.reverse(),
      });
    });
}

exports.log_in_post = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      res.render('index', {
        title: 'Members Only',
        alerts: [{
          'msg': 'Wrong username and/or password'
        }]
      });
    } else {
      req.logIn(user, (err) => {
        if (err) return next(err);
        res.redirect('/');
      });
    }
  })(req, res, next)
}


exports.log_out_get = (req, res) => {
  req.logout();
  res.redirect('/');
}

exports.elevate_privileges = (req, res) => {
  function setPrivilege(privilege) {
    User.findByIdAndUpdate(req.user._id, {
      membership_status: privilege
    }, (err, result) => {
      if (err) {
        return err;
      }
    });
  }

  switch (req.body.secret_word) {
    case process.env.ADMIN:
      setPrivilege('Admin');
      break;
    case process.env.MEMBER:
      setPrivilege('Member');
      break;
    case process.env.NONMEMBER:
      setPrivilege('Non-Member');
      break;
    default:
      res.render('index', {
        title: 'Members Only',
        alerts: [{
          'msg': 'ACCESS DENIED'
        }]
      });
  }
  res.redirect('/');
}

exports.sign_up_get = (req, res, next) => {
  res.render('sign-up', {
    title: 'Sign Up',
    user: req.user,
    alerts: '',
  });
}

exports.sign_up_post = [
  body('username', 'Username required').trim().notEmpty().custom(value => {
    return User.findOne({
      username: value.toLowerCase()
    }).then(user => {
      if (user) {
        return Promise.reject('Email already in use');
      }
    })
  }).escape(),
  body('first_name', 'First name required').trim().isLength({
    min: 1
  }).escape(),
  body('last_name', 'Last name required').trim().isLength({
    min: 1
  }).escape(),
  body('password', 'Password required').trim().isLength({
    min: 1
  }).escape(),

  async (req, res, next) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('index', {
        title: 'Members Only',
        alerts: errors.array()
      });
    } else {
      const user = new User({
        username: req.body.username.toLowerCase(),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: await bcrypt.hash(req.body.password, 10),
      });

      user.save((err) => {
        if (err) {
          return next(err);
        } else {
          res.render('index', {
            title: 'Members Only',
            alerts: [{
              'msg': 'Sign Up Successful!',
              'type': 'success'
            }]
          });
        }
      });
    }
  }
];
