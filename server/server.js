var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackconfig = require('../webpack.config.js');
var webpackcompiler = webpack(webpackconfig);



//enable webpack middleware for hot-reloads in development
var useWebpackMiddleware = function (app) {
  app.use(webpackDevMiddleware(webpackcompiler, {
    publicPath: webpackconfig.output.publicPath,
    stats: {
      colors: true,
      chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
      'errors-only': true
    }
  }));
  app.use(webpackHotMiddleware(webpackcompiler, {
    log: console.log
  }));

  return app;
};

const clientId = "228246";
const clientSecret = "7491889262e92cce0bd1244fbacc14ab";
const callback_url = "http://127.0.0.1:3000/auth/fitbit/callback";
var bodyParser = require('body-parser');
var FitbitClient = require('fitbit-client-oauth2');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://docker:docker@db:5432/fitcoin');
var path = require('path');
var express = require('express');

var app = express();
var client = new FitbitClient(clientId, clientSecret);
var redirect_uri = callback_url;


useWebpackMiddleware(app);
app.use(bodyParser());

// this is for React Router, it's supposed to help with browserHistory and
// allow the user to refresh on say the /about page and it'll work...but it's broke
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../app/public', 'index.html'));
});

app.use(express.static(path.join(__dirname, '../app/public')));

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

// sequelize.sync().then(function () {
//   // Table created
//   User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   }).then(function() {

//     User.findAll({}).then(function(found) {
//       console.log('HEY!kuhdasdhasdkashdsakjhdsadasdasd', found);
//     });

//   });

// });


app.get('/auth/fitbit', function(req, res) {
  var auth_url = client.getAuthorizationUrl(callback_url);
  res.redirect(auth_url);
});

app.get('/auth/fitbit/callback', function(req, res, next) {

  client.getToken(req.query.code, redirect_uri)
    .then(function(token) {

      // ... save your token on session or db ...
      token = token.token;
      User
         .find( {where: {fb_user_id: token.user_id}} )
         .then(function(user) {
          if(user === null) {
           console.log('user not found, creating user...');
           // console.log('TOKEN.access_token', token.access_token);
           User.create({
             firstName: "Test",
             lastName: "Testerson",
             access_token: token.access_token,
             refresh_token: token.refresh_token,
             expires_in: token.expires_in,
             fb_user_id: token.user_id,
             expires_at: token.expires_at
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


app.listen(3000, function () {
  console.log('Our app is listening on port 3000!');
});