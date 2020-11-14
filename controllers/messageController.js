const User = require('../models/user');
const Message = require('../models/message');
const { body,validationResult } = require('express-validator');

exports.new_message_get = (req, res, next) => {
  res.render('new_message', { title: 'New Message'} );
}

exports.new_message_post = (req, res, next) => {
  const message = new Message({
    title: req.body.message_title,
    text: req.body.message_text,
    user: req.user._id,
  }).save(err => {
    if(err) {
      return next(err);
    };
    res.redirect('/');
  })  
}