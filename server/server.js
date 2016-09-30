var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var passport = require('passport');
var router = require('./resources/router');
var app = express();

var helperFunctions = require('./resources/helperFunctions.js');
var authConfig = require('./resources/authConfig.js');

helperFunctions.useWebpackMiddleware(app);
app.use(cookieParser());
app.use(bodyParser());
app.use('/api', router); // added /api prefix to distinguish back end routes
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


// Database connection
var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://docker:docker@db:5432/fitcoin');
var path = require('path');
sequelize.sync({force: true});


// Database schemas
// Users Table
var User = sequelize.define('users', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  },
  accessToken: {
    type: Sequelize.STRING
  },
  refreshToken: {
    type: Sequelize.STRING
  },
  expiresIn: {
    type: Sequelize.INTEGER
  },
  fbUserId: {
    type: Sequelize.STRING
  }, 
  expiresAt: {
    type: Sequelize.DATE
  }
});


var FbAttributes = sequelize.define('fb_attributes', {
  avatar: {
    type: Sequelize.STRING
  },
  avatar150: {
    type: Sequelize.STRING
  },
  dateOfBirth: {
    type: Sequelize.DATE
  },
  displayName: {
    type: Sequelize.STRING
  },
  distanceUnit: {
    type: Sequelize.STRING
  },
  encodedId: {
    type: Sequelize.STRING
  },
  height: {
    type: Sequelize.STRING // num with floating point? 193.10000000000002
  },
  heightUnit: {
    type: Sequelize.STRING
  },
  locale: {
    type: Sequelize.STRING
  },
  offsetFromUTCMillis: {
    type: Sequelize.INTEGER // signed int? -25200000,
  },
  strideLengthRunning: {
    type: Sequelize.STRING // num with floating point?
  },
  strideLengthRunningType: {
    type: Sequelize.STRING // decimal place?114.7
  },
  strideLengthWalking: {
    type: Sequelize.INTEGER // num with large floating point 80.10000000000001,
  },
  strideLengthWalkingType: {
    type: Sequelize.STRING
  },
  timezone: {
    type: Sequelize.STRING
  },
  weight: {
    type: Sequelize.INTEGER  // decimal usints
  },
  weightUnit: {
    type: Sequelize.STRING
  }
});



var FbActivityStats = sequelize.define('fb_lifetime_stats', {
  totalCaloriesOut: {
    type: Sequelize.INTEGER
  },
  totalDistance: {
    type: Sequelize.INTEGER
  },
  totalFloors: {
    type: Sequelize.INTEGER
  },
  totalSteps: {
    type: Sequelize.INTEGER
  },
  trackerCaloriesOut: {
    type: Sequelize.INTEGER
  },
  trackerDistance: {
    type: Sequelize.INTEGER
  },
  trackerFloors: {
    type: Sequelize.INTEGER
  },
  trackerSteps: {
    type: Sequelize.INTEGER
  }  
});


var UserChallengesJT = sequelize.define('user_challenges_jt', {
  userId: {
    type: Sequelize.STRING // num?
  },
  challengeId: {
    type: Sequelize.STRING // num?
  },
  metricType: {
    type: Sequelize.STRING
  },
  metricStart: {
    type: Sequelize.STRING
  },
  metricCurrent: {
    type: Sequelize.STRING
  }, 
  metricGoal: {
    type: Sequelize.STRING
  }
});

var Challenges = sequelize.define('challenges', {
  ethereumAddress: {
    type: Sequelize.STRING // just a string?
  },
  creationDate: {
    type: Sequelize.DATE // special date?
  },
  expirationDate: {
    type: Sequelize.DATE // special date?
  },
  status: {
    type: Sequelize.STRING
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
