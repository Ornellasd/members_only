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
  body('message_title', 'Title required').trim().isLength({
    min: 1,
    max: 60
  }).escape(),
  body('message_text', 'Message required').trim().isLength({
    min: 1
  }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
      Message.find({}, 'title timestamp text user')
        .populate('user')
        .exec((err, list_messages) => {
          res.render('index', {
          title: 'Members Only',
          alerts: errors.array(),
          user: req.user,
          messages: list_messages.reverse(),
        });
      });
    } else {
      const message = new Message({
        title: req.body.message_title,
        text: req.body.message_text,
        user: req.user._id,
      });

      message.save(err => {
        if(err) {
          return next(err);
        } else {
          res.redirect('/');
        }
      });
    }
  }
];

exports.delete_message_post = (req, res) => {
  Message.findByIdAndRemove(req.params.id, (err, message) => {
    if (err) {
      return next(err);
    } else {
      res.redirect('/');  
    }
  });
}