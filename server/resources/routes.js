const fitCoinController = require('../database/db-helpers.js');
const passport = require('./passport.js');
const path = require('path');
var cloudinary = require('cloudinary');
var request = require('request');
var fs = require('fs');
const axios = require('axios');

var isAuthMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/');
  }
};

module.exports = (app, express) => {
  //Passport Oauth 2.0 - Fitbit Strategy
  var fitbitAuthenticate = passport.authenticate('fitbit', {
    successRedirect: '/auth/fitbit/success',
    failureRedirect: '/auth/fitbit/failure'
  });

  app.get('/auth/fitbit', fitbitAuthenticate);

  app.get('/auth/fitbit/callback', fitbitAuthenticate);

  app.get('/auth/fitbit/success', function(req, res, next) {
    res.redirect('/');
  });

  app.get('/auth/fitbit/failure', function (req, res, next) {
    res.redirect('/');
  });

  app.get('/auth/checkLogin', function(req, res) {
    if (req.isAuthenticated()) {
      // console.log(req.session);
      res.send(
        {logInStatus: 'authenticated',
        user: req.user.user});
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
      fitCoinController.retrieveAllUsers(req, res);
    })
    .post(function(req, res) {
      fitCoinController.retrieve(req, res);
    })
    .put(function(req, res) {
      fitCoinController.retrieve(req, res);
    });

  app.route('/myInfo')
    .get(function(req, res) {
      fitCoinController.retrieveOneUser(req, res);
    })
    .delete(function(req, res) {
      fitCoinController.delete(req, res);
    });


  //Challenges
  app.route('/challenges')
    .post(function(req, res) {
      fitCoinController.createChallenge(req, res);
    })
    .get(function(req, res) {
      fitCoinController.retrieveAllChallenges(req, res);
    });

  app.route('/user_joinable_challenges')
    .get(function(req, res) {
      fitCoinController.retrieveAllJoinableChallenges(req, res);
    });

  app.route('/challenges/:id')
    .get(function(req, res) {
      console.log('request hit challenges/' + req.params.id);
      // req.params: { "id": USER };
      fitCoinController.retrieveChallenges(req, res);
    })
    .put(function(req, res) {
      fitCoinController.updateChallenge(req, res);
    });

  app.route('/messages')
    .get((req, res) => {
      fitCoinController.getMessage(req, res);
    });
  app.route('/messages/:msgId')
    .put((req, res) => {
      fitCoinController.updateMessage(req, res);
    });

  //OpenCV
  cloudinary.config({ 
    cloud_name: 'dsz0gov6k', 
    api_key: '674192445522955', 
    api_secret: 't6uJBD_T4bzaAYa1-YXJ2E7Oxtw' 
  });

  // app.get('/cloudSignature', function(req, res) {
  //   var secret='t6uJBD_T4bzaAYa1-YXJ2E7Oxtw';
  //   var str='context=true&prefix=' + req.params.userId + '&timestamp=' + Date.now() + secret;
  //   res.json(sha1(str));
  // });

  // app.get('/cloudinaryUpdate', function(req, res) {
  //   cloudinary.api.update("1/ub11jimadmgpopm2jsat",
  //   function(result) { console.log(result); res.json(result);},
  //   { context: "waist=30|weight=160"});
  // });

  app.get('/cloudinaryGet/:userId', function(req, res) {
    console.log(req.params.userId);
    cloudinary.api.resources(function(result){
      res.json(result);
    },
    { type: 'upload', prefix: req.params.userId, context: 'true' });
  });

  app.post('/openCV', function(req, res) {
    var result = [];

    const spawn = require('child_process').spawn;

    var download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };

    download(req.body.url, 'temp.jpg', function(){
      
      var picture = '../temp.jpg';
      var program = './imageproc2';
      const getPics = spawn(program, [picture], {cwd: 'BodyCV'});

      getPics.stdout.on('data', function(data) {
        data.forEach(function(elem) {
          result.push(String.fromCharCode(elem));
        });

        cloudinary.v2.uploader.upload("BodyCV/outline1.jpg", 
          {
            folder: 'outline/' + req.body.userId, 
            public_id: req.body.public_id.slice(2),
            context: "area=" + result.join('')
          },
          function(error, picture) {
            res.json(picture); 
          });
      });  
    });
  });
  
//ethereumaddress
  app.get('/accounts', (req, res) => {
    axios.get('http://ethereum:3002/api/accounts')
    .then((results) => {
      res.status(200).send(results.data);
    })
    .catch((err) => {
      // console.log(err);
      res.status(404).send(err);
    });
  });

//End of endpoint routes
  app.get('/', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../../app/public', 'index.html'));
  });
  app.get('/about', function (request, response) {
    response.sendFile(path.resolve(__dirname, '../../app/public', 'index.html'));
  });
  //Wildcard to pass through to react router routes
  app.get('*', isAuthMiddleware, function (request, response) {
    response.sendFile(path.resolve(__dirname, '../../app/public', 'index.html'));
  });
};