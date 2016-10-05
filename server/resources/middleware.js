var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('./passport.js');
var hotModuleReload = require('./hotModuleReload.js');
var path = require('path');
var RedisStore = require('connect-redis')(session);
var options = {url: 'redis://redisdb:6379/0', logErrors: true};

module.exports = (app, express) => {
  hotModuleReload.useWebpackMiddleware(app);
  app.use(cookieParser());
  // app.use(bodyParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.use('/api', router); // added /api prefix to distinguish back end routes
  app.use(session({ secret: 'keyboard cat', store: new RedisStore(options), saveUninitialized: true, resave: false}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.initialize());
  app.use(express.static(path.join(__dirname, '../app/public')));
};