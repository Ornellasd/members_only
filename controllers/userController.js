const User = require('../models/user');

exports.sign_up_get = (req, res, next) => {
	res.render('sign-up', { title: 'Sign Up'});
}

exports.sign_up_post = (req, res, next) => {
	const user = new User({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		password: req.body.password,
	}).save(err => {
		if(err) {
			return next(err);
		};
		res.redirect('/');
	});
}