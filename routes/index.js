const express = require('express');
const router = express.Router();
const passport = require("passport");


const user_controller = require('../controllers/userController');
const message_controller = require('../controllers/messageController');

router.get('/', user_controller.index);

router.get('/sign-up', user_controller.sign_up_get);

router.post('/sign-up', user_controller.sign_up_post);

router.post('/log-in', user_controller.log_in_post);

router.get('/log-out', user_controller.log_out_get);

router.get('/new_message', message_controller.new_message_get);

router.post('/new_message', message_controller.new_message_post);

module.exports = router;
