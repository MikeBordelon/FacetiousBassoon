var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./passport.js');
var hotModuleReload = require('./hotModuleReload.js');
var path = require('path');

module.exports = (app, express) => {
  hotModuleReload.useWebpackMiddleware(app);
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
  app.use(express.static(path.join(__dirname, '../app/public')));
};