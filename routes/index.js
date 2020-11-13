const express = require('express');
const router = express.Router();
const passport = require("passport");


const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

router.get('/', user_controller.index);

router.get('/sign-up', user_controller.sign_up_get);

router.post('/sign-up', user_controller.sign_up_post);

router.post(
  '/log-in',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

router.get('/log-out', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/new_message', message_controller.new_message_get);

router.post('/new_message', message_controller.new_message_post);

module.exports = router;
