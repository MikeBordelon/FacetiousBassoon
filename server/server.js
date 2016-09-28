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

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://docker:docker@db:5432/fitcoin');
var path = require('path');
var express = require('express');
var app = express();
useWebpackMiddleware(app);

app.use(express.static(path.join(__dirname, '../app/public')));

var User = sequelize.define('users', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING
  }
});

sequelize.sync().then(function () {
  // Table created
  User.create({
    firstName: 'John',
    lastName: 'Hancock'
  }).then(function() {

    User.findAll({}).then(function(found) {
      console.log('HEY!kuhdasdhasdkashdsakjhdsadasdasd', found);
    });

  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});