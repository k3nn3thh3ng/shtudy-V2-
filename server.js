require('dotenv').config()
const express = require('express'),
	  bodyParser = require('body-parser'),
	  mongoose = require('mongoose'),
	  cors = require('cors'),
	  passport = require("passport"),
	  expressSession = require('express-session');

const app = express();

//Models
const User = require("./models/user-model");

//Requiring Routes
const questionRoute = require("./router/question"),
	  userCRUD = require('./router/userCRUD'),
	  userAuth = require('./router/userAuth'),
	  googleAuth = require('./router/googleAuth');

//Requiring Custom Middleware
const middlewareObj = require('./middleware/index');

//port configuration
const PORT = process.env.PORT || 3001;
	
//allowing cors
app.use(cors({
	origin: true,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",  
	credentials: true, 
	optionsSuccessStatus: 204,
	maxAge: 3600
}))

//session configuration
app.use(expressSession({
    secret: "What is the purpose of keeping secrets",
    resave: false,
    saveUninitialized: true
}));


//Passport config import
app.use(passport.initialize());
app.use(passport.session());
const passportSetup = require("./config/passport-local-setup");
const passportGoogleAuthSetup = require('./config/passport-google-oauth-setup');
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

//body parser middleware config
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//mongoose configuration
mongoose.connect(process.env.MONGODB_CONNECT, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB Connected!')
});

//Routes Config
app.use('/questions', questionRoute);
app.use('', userCRUD);
app.use('', userAuth);
app.use('/auth/google', googleAuth);


app.get("/", middlewareObj.authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});


//app listening start
app.listen(PORT, () => {
    console.log('Server started on port', PORT);
});



