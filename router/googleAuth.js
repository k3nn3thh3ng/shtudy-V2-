const express       = require("express"),
	  passport      = require('passport'),
	  
	  
	  User          = require("../models/user-model"),
	  
	  router        = express.Router();

router.get('',
  	passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
  		]
  	}));

router.get('/callback', 
  	passport.authenticate('google', { failureRedirect: 'https://expressandreact-oalsz.run.goorm.io/login' }),
		function(req, res) {
		console.log('google auth successful')
		res.redirect('https://expressandreact-oalsz.run.goorm.io')
	});

module.exports = router;

		// res.json({
		// 	success: true,
		// 	message: 'google auth done'
		// });