var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var passport = require('passport');
var router; //  = require('./resources/router.js');
var app = express();

var helperFunctions = require('./resources/helperFunctions.js');
var authConfig = require('./resources/authConfig.js');

helperFunctions.useWebpackMiddleware(app);
app.use(cookieParser());
// app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/api', router); // added /api prefix to distinguish back end routes
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session({
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());

// Passport strategy for FitBit API
var fitbitStrategy = new FitbitStrategy({
  clientID: authConfig.lex.clientId,
  clientSecret: authConfig.lex.clientSecret,
  scope: ['activity', 'heartrate', 'location', 'profile'],
  callbackURL: authConfig.lex.callbackURL
}, function(accessToken, refreshToken, params, profile, done) {

  User.find( {where: {fbUserId: params.user_id}} )
    .then(function(user) {
      if (user === null) {
        console.log('user not found, creating user...');
     // console.log('TOKEN.access_token', token.access_token);
        User.create({
          firstName: profile._json.user.fullName.split(' ')[0],
          lastName: profile._json.user.fullName.split(' ')[profile._json.user.fullName.split(' ').length - 1],
          accessToken: params.access_token,
          refreshToken: params.refresh_token,
          expiresIn: params.expires_in,
          fbUserId: params.user_id
        })
    .then(function() { 
      User.find({where: {fbUserId: params.user_id}}).then(function(found) {
        done(null, {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile,
          userId: found.dataValues.id
        });
      });
    });
      } else {
        done(null, {
          accessToken: accessToken,
          refreshToken: refreshToken,
          profile: profile,
          userId: user.id
        });
      }
    });

});

passport.use(fitbitStrategy);
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
//
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


var FbAttribute = sequelize.define('fb_attributes', {
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



var FbActivityStat = sequelize.define('fb_lifetime_stats', {
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

var UserChallengeJT = sequelize.define('user_challenges_jt', {
  id: {
    type: Sequelize.INTEGER, autoIncrement: true, unique: true, primaryKey: true
  },
  userid: {
    type: Sequelize.STRING // num?
  },
  challengeid: {
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

var Challenge = sequelize.define('challenges', {
  ethereumAddress: {
    type: Sequelize.STRING // just a string?
  },
  creationDate: {
    type: Sequelize.DATE // special date?
  },
  expirationDate: {
    type: Sequelize.DATE // special date?
  }
});

// Create join table relationship
User.belongsToMany(Challenge, {through: 'UserChallengeJT', foreignKey: 'userId'});  
Challenge.belongsToMany(User, {through: 'UserChallengeJT', foreignKey: 'challengeId'});

app.use(express.static(path.join(__dirname, '../app/public')));

app.get('/auth/fitbit', fitbitAuthenticate);
app.get('/auth/fitbit/callback', fitbitAuthenticate);

app.get('/auth/fitbit/success', function(req, res, next) {

  res.redirect('/allChallenges');
});

app.get('/auth/fitbit/failure', function (req, res, next) {

  res.send('Failure');

});

app.get('/auth/checkLogin', function(req, res) {
  if (req.user) {
    // console.log(req.session);
    res.send(
      {logInStatus: 'authenticated',
      user: req.user});

  } else {
    res.send({logInStaus: 'unauthenticated', user: null});
  }
});

app.get('/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});





// Controller object
var fitCoinController = {
  retrieve: function (req, res) {
    User.findAll({})
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  retrieveOne: function (req, res) {
    User.findOne({
      where: {fbUserId: req.params.fbUserId}, // fbUserId
      // attributes: ['id', ['name', 'title']] // can specifiy needed fields
    })
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  createOne: function (req, res) {
    User.create({
      firstName: req.params.firstName,
      lastName: req.params.lastName,
      // accessToken: req.params.accessToken,
      // refreshToken: req.params.refreshToken,
      // expiresIn: req.params.expiresIn,
      // fbUserId: req.params.fbUserId
    })
      .then(function(created) {
        res.statusCode === 200;
        res.end(JSON.stringify(created)); 
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  updateOne: function (req, res) {
    User.findAll({})
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  deleteOne: function (req, res) {
    User.findAll({})
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  delete: function (req, res) {
    User.destroy({
      where: {}  // {status: 'inactive'} // specifics
    })
      .then(function(deleted) {
        res.statusCode === 200;
        res.end(JSON.stringify(deleted));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  createChallengeType: function (req, res) {
    Challenge.create({
      name: req.params.name
    })
      .then(function(created) {
        res.statusCode === 200;
        res.end(JSON.stringify(created)); 
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end(); 
      });
  },
  createChallenge: function (req, res) {
    Challenge.create({
      ethereumAddress: req.body.ethereumAddress,
      status: 'new',
      expirationDate: req.body.expirationDate,
      creationDate: Date.now()
    })
      .then(function(challenge) {
        console.log(challenge);
        UserChallengeJT.create({
          userId: req.body.userId,
          challengeId: challenge.id,
          metricType: req.body.metricType,
          metricGoal: req.body.metricGoal,
          metricCurrent: 10,
          metricStart: 0
        })
          .then(function(result) {
            res.statusCode === 200;
            res.end(JSON.stringify(result)); 
          })
          .catch(function(err) {
            res.statusCode === 404;
            res.end(JSON.stringify(err)); 
          });
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end(err); 
      });
  },
  retrieveChallenges: function (req, res) {
    // User.findAll(
    //   {
    //     include: {
    //       model: Challenge,
    //       through: {
    //         attributes: ['userId', 'metricType', 'metricStart', 'metricCurrent', 'metricGoal', 'createdAt', 'updatedAt'],
    //         where: { id: req.params.id },
    //       }

    //     }
    //   }
    // )
    sequelize.query("select * from users inner join ", { type: sequelize.QueryTypes.SELECT})
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found)); 
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end(); 
      });
  }
};



// Routes

// Get info from FitBit API
app.get('/get_stats', function(req, res) {
  // get user ID
  // sequelize.query('SELECT * FROM "users"', { type: sequelize.QueryTypes.SELECT})
  //   .then(function(found) {});


  // get data from fitbit API
  var options = { method: 'GET',
    // url: 'https://api.fitbit.com/1/user/4Y8S2G/activities.json',
    url: 'https://api.fitbit.com/1/user/4Y8S2G/profile.json',
    headers:
     { 'postman-token': 'c17d8f37-ed07-6f46-b56e-2fe51919302f',
       'cache-control': 'no-cache',
       'x-fitbit-subscriber-id': '4Y8S2G',
       authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0WThTMkciLCJhdWQiOiIyMjgyNDYiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCByd2VpIHJociBybnV0IHJwcm8gcnNsZSIsImV4cCI6MTQ3NTIwNDg2OCwiaWF0IjoxNDc1MTc2MDY4fQ.WaacKNsO6GjJozbw5Cp-aKtXCIK63dGEo4jMijVo1iI' } };

  request(options, function (error, response, body) {
    if (error) {
      throw new Error(error);
    }
    console.log('\n');
    console.log('FITBIT API returned: ' + body);
    res.statusCode === 200;
    res.end(body);
  });
});

// Routes - basic format

// Users
app.get('/users', function(req, res) {
  fitCoinController.retrieve(req, res);
});

app.get('/users/:fbUserId', function(req, res) {
  fitCoinController.retrieveOne(req, res);
});

app.delete('/users', function(req, res) {
  fitCoinController.delete(req, res);
});

app.post('/users/:fbUserId', function(req, res) {
  fitCoinController.retrieveOne(req, res);
});

// Challenges

// creates a new challenge type in the DB
app.post('/challenges_types/:name', function(req, res) {
  fitCoinController.createChallengeType(req, res);
});

// creates a new challenge for a userId
app.post('/challenges', function(req, res) {
  fitCoinController.createChallenge(req, res);
});

app.get('/challenges/:id', function(req, res) {
  // req.params: { "id": USER };
  fitCoinController.retrieveChallenges(req, res);
});

// app.get('/challenges', function(req, res) {

// });
// app.get('/challenges/:status', function(req, res) {
//   // req.params: { "status": STATUS };
// });
// app.get('/challenges/:id/participants', function(req, res) {
//   // req.params: { "id": ID };
// });
// app.get('/challenges/:id/participants/:id', function(req, res) {
//   // req.params: { "id": ID };
// });
// app.get('/auth/:status', function(req, res) {});




// this is for React Router, it's supposed to help with browserHistory and
// allow the user to refresh on say the /about page and it'll work...but it's broke

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../app/public', 'index.html'));
});

app.listen(3000, function () {
  console.log('Our app is listening on port 3000!');
});
