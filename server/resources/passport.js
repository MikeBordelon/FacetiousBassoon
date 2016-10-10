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
  console.log('accessToken: ', accessToken);
  console.log('refreshToken: ', refreshToken);
  User.find( {where: {fbUserId: params.user_id}} )
    .then(function(user) {
      if (user === null) {
        console.log('user not found, creating user...');
     // console.log('TOKEN.access_token', token.access_token);
        User.create({
          name: profile._json.user.fullName,
          email: 'user@user.com',
          accessToken: params.access_token,
          refreshToken: refreshToken,
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
        user.update({
          refreshToken: refreshToken
        });
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