const fitCoinController = require('../database/db-helpers.js');
const passport = require('./passport.js');
const path = require('path');

module.exports = (app, express) => {
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
    response.sendFile(path.resolve(__dirname, '../../app/public', 'index.html'));
  });
};

// Routes - basic format
// app.route('/users')
//   .get(fitCoinController.retrieve(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/users/:userId')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/users:userId/friends')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/challenges')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/challenges/:status')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/challenges/:id')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/challenges/:id/participants')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/challenges/:id/participants')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));



// Routes - router format
// app.route('/users')
//   .get(fitCoinController.retrieve(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/users/:userId')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/users:userId/friends')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/challenges')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/challenges/:status')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/challenges/:id')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/challenges/:id/participants')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));

// app.route('/challenges/:id/participants')
//   .get(fitCoinController.retrieveOne(req, res))
//   .post(fitCoinController.createOne(req, res))
//   .update(fitCoinController.updateOne(req, res))
//   .delete(fitCoinController.delete(req, res));


// module.exports = router;