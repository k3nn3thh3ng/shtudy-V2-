const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose'); 

const userSchema = new Schema({
    email: {type: String, unique:true}, 
    username: {type: String, unique:true}, 
	password: String,
	google: Array
});

userSchema.plugin(passportLocalMongoose); 

const User = mongoose.model("User", userSchema);

module.exports = User;