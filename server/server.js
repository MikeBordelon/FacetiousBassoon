var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var passport = require('passport');
var app = express();

var helperFunctions = require('./resources/helperFunctions.js');
var authConfig = require('./resources/authConfig.js');

helperFunctions.useWebpackMiddleware(app);
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session({
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());

var fitbitStrategy = new FitbitStrategy({
  clientID: authConfig.lex.clientId,
  clientSecret: authConfig.lex.clientSecret,
  scope: ['activity', 'heartrate', 'location', 'profile'],
  callbackURL: authConfig.lex.callbackURL
}, function(accessToken, refreshToken, profile, done) {
  // TODO: save accessToken here for later use

  done(null, {
    accessToken: accessToken,
    refreshToken: refreshToken,
    profile: profile
  });

});

passport.use(fitbitStrategy);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

var fitbitAuthenticate = passport.authenticate('fitbit', {
  successRedirect: '/auth/fitbit/success',
  failureRedirect: '/auth/fitbit/failure'
});


var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://docker:docker@db:5432/fitcoin');
var path = require('path');
sequelize.sync({force: true});
var User = sequelize.define('users', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  },
  access_token: {
    type: Sequelize.STRING
  },
  refresh_token: {
    type: Sequelize.STRING
  },
  expires_in: {
    type: Sequelize.INTEGER
  },
  fb_user_id: {
    type: Sequelize.STRING
  },
  expires_at: {
    type: Sequelize.DATE
  }
});

app.use(express.static(path.join(__dirname, '../app/public')));

app.get('/auth/fitbit', fitbitAuthenticate);
app.get('/auth/fitbit/callback', fitbitAuthenticate);

app.get('/auth/fitbit/success', function(req, res, next) {

  res.send(req.user);
});

// this is for React Router, it's supposed to help with browserHistory and
// allow the user to refresh on say the /about page and it'll work...but it's broke
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../app/public', 'index.html'));
});

app.listen(3000, function () {
  console.log('Our app is listening on port 3000!');
});
