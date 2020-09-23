var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require("../models/user-model");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    callbackURL: "https://testingexpressandreact.run.goorm.io/auth/google/callback"
  },
  	function(accessToken, refreshToken, profile, done) {
		console.log(profile)
		User.findOne({
			'google.sub': profile.id 
		}, function(err, user) {
			if (err) {
				return done(err);
			}
		//No user was found... so create a new user with values from Facebook (all the profile. stuff)
			if (!user) {
				user = new User({
					email: profile.emails[0].value,
					username: profile.displayName,
					//now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
					google: profile._json
				});
				user.save(function(err) {
					if (err) console.log(err);
					return done(err, user);
				});
			} else {
				//found user. Return
				return done(err, user);
			}
		});
 	}
));
