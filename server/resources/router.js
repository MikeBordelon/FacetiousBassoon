var router = require('express').Router();
var controller = require('./controller');

// Routes

// Auth routes
// Initiate FitBit auth flow
app.get('/auth/fitbit', function(req, res) {
  var auth_url = client.getAuthorizationUrl(callback_url);
  res.redirect(auth_url);
});

// Success callback for FitBit auth
app.get('/auth/fitbit/callback', function(req, res, next) {

  client.getToken(req.query.code, redirect_uri)
    .then(function(token) {

      // ... save your token on session or db ...
      token = token.token;
      User
         .find( {where: {fbUserId: token.user_id}} )
         .then(function(user) { 
           if (user === null) {
             console.log('user not found, creating user...');
           // console.log('TOKEN.access_token', token.access_token);
             User.create({
               firstName: "Test",
               lastName: "Testerson",
               accessToken: token.access_token,
               refreshToken: token.refresh_token,
               expiresIn: token.expires_in,
               fbUserId: token.user_id,
               expiresAt: token.expires_at
             })
           .then(function() {
             User.findAll({}).then(function(found) {
               console.log('HEY!kuhdasdhasdkashdsakjhdsadasdasd', found);
             });
           });
           } else {
             console.log('User found', user);
           }
         });
         
      // then redirect
      //res.redirect(302, '/user');
      res.send(token);
    })
    .catch(function(err) {
      // something went wrong.
      res.send(500, err);
    });
});

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
    if (error) throw new Error(error);
    console.log('\n');
    console.log('FITBIT API returned: ' + body);
    res.statusCode === 200;
    res.end(body);
  });
});

// Routes - basic format
app.get('/users', function(req, res) {});
app.get('/users/:userId', function(req, res) {
  // req.params: { "userId": USER };
});
app.get('/users:userId/friends', function(req, res) {
  // req.params: { "userId": USER };
});
app.get('/challenges', function(req, res) {});
app.get('/challenges/:status', function(req, res) {
  // req.params: { "status": STATUS };
});
app.get('/challenges/:id', function(req, res) {
  // req.params: { "id": USER };
});
app.get('/challenges/:id/participants', function(req, res) {
  // req.params: { "id": ID };
});
app.get('/challenges/:id/participants/:id', function(req, res) {
  // req.params: { "id": ID };
});
// app.get('/auth/:status', function(req, res) {});

// Routes - basic format
router.route('/users/:userId')
  .get(fitCoinController.retrieveOne(req, res))
  .post(fitCoinController.createOne(req, res))
  .update(fitCoinController.updateOne(req, res))
  .delete(fitCoinController.delete(req, res));

router.route('/users/:userId')
  .get(fitCoinController.retrieveOne(req, res))
  .post(fitCoinController.createOne(req, res))
  .update(fitCoinController.updateOne(req, res))
  .delete(fitCoinController.delete(req, res));

router.route('/users:userId/friends')
  .get(fitCoinController.retrieveOne(req, res))
  .post(fitCoinController.createOne(req, res))
  .update(fitCoinController.updateOne(req, res))
  .delete(fitCoinController.delete(req, res));

router.route('/challenges')
  .get(fitCoinController.retrieveOne(req, res))
  .post(fitCoinController.createOne(req, res))
  .update(fitCoinController.updateOne(req, res))
  .delete(fitCoinController.delete(req, res));

router.route('/challenges/:status')
  .get(fitCoinController.retrieveOne(req, res))
  .post(fitCoinController.createOne(req, res))
  .update(fitCoinController.updateOne(req, res))
  .delete(fitCoinController.delete(req, res));

router.route('/challenges/:id')
  .get(fitCoinController.retrieveOne(req, res))
  .post(fitCoinController.createOne(req, res))
  .update(fitCoinController.updateOne(req, res))
  .delete(fitCoinController.delete(req, res));

router.route('/challenges/:id/participants')
  .get(fitCoinController.retrieveOne(req, res))
  .post(fitCoinController.createOne(req, res))
  .update(fitCoinController.updateOne(req, res))
  .delete(fitCoinController.delete(req, res));

router.route('/challenges/:id/participants')
  .get(fitCoinController.retrieveOne(req, res))
  .post(fitCoinController.createOne(req, res))
  .update(fitCoinController.updateOne(req, res))
  .delete(fitCoinController.delete(req, res));



module.exports = router;