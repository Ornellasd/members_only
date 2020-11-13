const express = require('express');
const router = express.Router();
const passport = require("passport");


const user_controller = require('../controllers/userController');


router.get('/', user_controller.index);

router.get('/sign-up', user_controller.sign_up_get);

router.post('/sign-up', user_controller.sign_up_post);

router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

module.exports = router;
