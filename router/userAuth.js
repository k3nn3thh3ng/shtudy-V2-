const express       = require("express"),
	  passport      = require('passport'),
	  cors          = require('cors')
	  
	  
	  User          = require("../models/user-model"),
	  middlewareObj = require("../middleware/index"),
	  
	  router        = express.Router();

//routes(Authentication

router.get("/login/success", (req, res) => {
  if (req.user) {
	console.log(req.user)
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  } else {
	  res.status(400).json({
      success: false,
      message: "user no authenticated"
    })
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

router.get("/logout", (req, res) => {
	req.logout();
	console.log("successfully logout")
	res.redirect('https://expressandreact-oalsz.run.goorm.io/login');
});
	

router.post('/login', 
	function(req, res) {
		console.log(req.body);
		const user = new User({
			username: req.body.username,
			password: req.body.password
		})
		
		req.login(user, function(err) {
			if (err) {
				console.log(err)
			} else {
				passport.authenticate('local', { failureRedirect: 'https://expressandreact-oalsz.run.goorm.io/login' })(req, res, function(){
					console.log('local auth successful')
					res.status(200).json({
						message: 'local auth success'
					})
				}) 
			}			
		})
	}
);
	
	
	
	
	
	
	
	
	
	
	
	
	
	


module.exports = router;