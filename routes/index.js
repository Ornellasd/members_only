const express = require('express');
const router = express.Router();
const passport = require("passport");

const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

router.get('/', user_controller.index);

router.post('/sign-up', user_controller.sign_up_post);

router.post('/log-in', user_controller.log_in_post);

router.get('/log-out', user_controller.log_out_get);

router.post('/elevate_privileges', user_controller.elevate_privileges);

router.post('/new-message', message_controller.new_message_post);

module.exports = router;
