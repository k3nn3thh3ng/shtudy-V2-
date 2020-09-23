const express       = require("express"),
	  passport      = require('passport'),

	  User          = require("../models/user-model"),

	  router        = express.Router();

//routes(Authentication)
router.post('/user', function(req, res){
	var Creation = new User({email: req.body.user.email, username: req.body.user.username});
		User.register(Creation, req.body.user.password, function(err, user) { 
			if (err) { 
				console.log(err);
				res.json({
					success: false,
					message: err.message
				});
			} 
			// else (req.login(user, function(err) {
			// if (err) {
			// console.log(err);
			// } 
				else {
					console.log('A user just registered');
					passport.authenticate('local');
						res.json({
							success: true,
							message: `Welcome ${user.username}!`
						})
					}
     			});
		}); 


router.get('/user/:id', function(req, res){
	User.find((req.params.id), req.body.user, function(err, user){
		if(err){
			console.log(err)
		} else {
			res.status(200).json({
				success: true,
				message: `${user.username} Profile Found!`
			})
		}
	})
})

router.put('/user/:id', function(req, res){
	User.findOneAndUpdate((req.params.id), req.body.user, function(err, user){
		if(err){
			console.log(err)
		} else {
			res.status(200).json({
				success: true,
				message: `${user.username} Profile Updated!`
			})
		}
	})
})

module.exports = router