var authKeys = require('./passportAuth.js');
var passport = require('passport');
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;

//Database methods
var {User} = require('../database/db-config.js');
//Passport configuration
var fitbitStrategy = new FitbitStrategy({
  clientID: authKeys.lex.clientId,
  clientSecret: authKeys.lex.clientSecret,
  scope: ['activity', 'heartrate', 'location', 'profile'],
  callbackURL: authKeys.lex.callbackURL
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
          tokenExpiresIn: params.expires_in,
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

module.exports = passport;