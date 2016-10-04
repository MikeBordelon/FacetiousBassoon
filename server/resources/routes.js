const fitCoinController = require('../database/db-helpers.js');
const passport = require('./passport.js');
const path = require('path');

module.exports = (app, express) => {
  //Passport Oauth 2.0 - Fitbit Strategy
  var fitbitAuthenticate = passport.authenticate('fitbit', {
    successRedirect: '/auth/fitbit/success',
    failureRedirect: '/auth/fitbit/failure'
  });

  app.get('/auth/fitbit', fitbitAuthenticate);

  app.get('/auth/fitbit/callback', fitbitAuthenticate);

  app.get('/auth/fitbit/success', function(req, res, next) {
    res.redirect('/allChallenges');
  });

  app.get('/auth/fitbit/failure', function (req, res, next) {
    res.redirect('/');
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
  //End Authentication
  

  //Get info from FitBit API
  app.get('/get_stats', function(req, res) {
    // get user ID
    // sequelize.query('SELECT * FROM "users"', { type: sequelize.QueryTypes.SELECT})
    //   .then(function(found) {});


    //get data from fitbit API
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

//Database Endpoints

  //Users
  app.route('/user')
    .get(function(req, res) {
      fitCoinController.retrieve(req, res);
    })
    .post(function(req, res) {
      fitCoinController.retrieve(req, res);
    })
    .put(function(req, res) {
      fitCoinController.retrieve(req, res);
    });

  app.route('/user/:id')
    .get(function(req, res) {
      fitCoinController.retrieveOne(req, res);
    })
    .delete(function(req, res) {
      fitCoinController.delete(req, res);
    });


  //Challenges
  app.route('/challenges')    
    .post(function(req, res) {
      fitCoinController.createChallenge(req, res);
    })
    .put(function(req, res) {
      fitCoinController.updateChallenge(req, res);
    });

  app.get('/challenges/:id', function(req, res) {
    console.log('request hit challenges/' + req.params.id);
    // req.params: { "id": USER };
    fitCoinController.retrieveChallenges(req, res);
  });

  //Friends
  app.route('/friends')
    .get(function (req, res) {

    });

  app.route('/friends/:id')
    .delete(function (req, res) {

    });

//End of endpoint routes
  
  //Wildcard to pass through to react router routes
  app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../../app/public', 'index.html'));
  });
};