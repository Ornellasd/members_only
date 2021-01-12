const User = require('../models/user');
const Message = require('../models/message');
const { body,validationResult } = require('express-validator');

exports.new_message_get = (req, res, next) => {
  res.render('new_message', { 
    title: 'New Message',
    user: req.user,
  });
}

exports.new_message_post = [
  body('message_title', 'title required').trim().isLength({
    min: 1
  }).escape(),
  body('message_text', 'message required').trim().isLength({
    min: 1
  }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.message_title,
      text: req.body.message_text,
      user: req.user._id,
    });

    if (!errors.isEmpty()) {
      res.render('new_message', {
        title: 'Post New Message',
        errors: errors.array()
      });
      return;
    } else {
      message.save(err => {
        if(err) {
          return next(err);
        };
        res.redirect('/');
      });
    }
  }
];


exports.delete_message_post = (req, res) => {
  Message.findByIdAndRemove(req.params.id, (err, message) => {
    if (err) return next(err);
    res.redirect('/')
  });
}