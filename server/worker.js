const {User, Challenge, UserChallenges, db, Sequelize} = require('./database/db-config.js');
var request = require('request');


var tendChallenges = function() {
  var startedChallenges = [];

  // look up FitBit steps for newly started challenges
  var checkFitBitStats = function(challengeId) {
    
    // get a single challenge by challengeId
    Challenge.findOne({
      where: { id: challengeId }
    })
    .then(function(challenge) {

      // get all users associated with that challenge
      challenge.getUsers({
        where: {}
      })
      .then(function(resultChallengesArr) {
        console.log('getUsers: ', JSON.stringify( resultChallengesArr[0].dataValues.UserChallenge ));

        // get the UserChallenge 
        resultChallengesArr.forEach(function(challengePlusJT) {
          
          // make an API call to FitBit
          var options = { method: 'GET',
            url: 'https://api.fitbit.com/1/user/' + challengePlusJT.dataValues.fbUserId + '/activities.json',
            headers: 
             { 'postman-token': '7dbc8c9f-431c-b847-16be-2fba85f0eab9',
               'cache-control': 'no-cache',
               'content-type': 'application/json',
               authorization: 'Bearer ' + challengePlusJT.dataValues.accessToken },
            json: true };
          request(options, function (error, response, body) {
            if (error) { throw new Error(error); }
            // console.log('FitBit API returned: ', JSON.stringify(body));
            console.log('userID: ' + challengePlusJT.dataValues.fbUserId + ' Total steps: ', JSON.stringify(body.lifetime.tracker.steps)); // distance floors steps caloriesOut
            
            // 
            challengePlusJT.dataValues.UserChallenge.update(
              {
                goalStart: body.lifetime.tracker.steps,
                goalCurrent: body.lifetime.tracker.steps
              }
            )
            .then(function(result) {
              console.log(JSON.stringify(result)); 
            })
            .catch(function(err) {
              console.log(JSON.stringify(err));
            });
          });

          // available fields
          // challengePlusJT.id;
          // challengePlusJT.fbUserId;
          // challengePlusJT.access_token;
          // challengePlusJT.refresh_token;
          // challengePlusJT.UserChallenge.challengeId;
          // challengePlusJT.UserChallenge.goalStart;
          // challengePlusJT.UserChallenge.goalCurrent;
        });
      })
      .catch(function(result) {
      });
    })
    .catch(function(err) {
    });
  };


  // main worker interval loop
  setInterval(function() {
    // Find and transition all challenges that need to flip from 'new' to 'started'
    Challenge.findAll({
      where: { status: 'new' }
    })
    .then(function(newChallenges) {
      // console.log(JSON.stringify(newChallenges));
      newChallenges.forEach(function(newChallenge) {
        // console.log('newChallenge.id: ', newChallenge.id);
        // console.log('Date.parse(newChallenge.startDate) >= Date.now(): ', Date.parse(newChallenge.startDate) >= Date.now());
        if ( Date.parse(newChallenge.startDate) <= Date.now() ) {
          startedChallenges.push(newChallenge);
          Challenge.findOne({
            where: { id: newChallenge.id } 
          })
          .then(function(challenge) {
            checkFitBitStats(challenge.id);
            challenge.update(
              {
                status: 'started',
              }
            )
            .then(function(result) {
              console.log('Worker - challenges, new->starting: ', JSON.stringify(result));
            })
            .catch(function(err) {
              console.log(err);	
            });
          })
          .catch(function(err) {
            console.log(err);
          });
        } 
      });
      startedChallenges.forEach(function(startedChal) {

      });
    })
    .catch(function(err) {
      console.log(err);
    });

    // Find and transition all challenges that need to flip from 'started' to 'expired'
    Challenge.findAll({
      where: { status: 'started' }
    })
    .then(function(newChallenges) {
      // console.log(JSON.stringify(newChallenges));
      newChallenges.forEach(function(newChallenge) {
        // console.log('newChallenge.id: ', newChallenge.id);
        // console.log('Date.parse(newChallenge.startDate) >= Date.now(): ', Date.parse(newChallenge.startDate) >= Date.now());
        if ( Date.parse(newChallenge.expirationDate) <= Date.now() ) {
          Challenge.findOne({
            where: { id: newChallenge.id } 
          })
          .then(function(challenge) {
            challenge.update(
              {
                status: 'expired',
              }
            )
            .then(function(result) {
              console.log('Worker - challenges, starting->expired: ', JSON.stringify(result));
            })
            .catch(function(err) {
              console.log(err);	
            });
          })
          .catch(function(err) {
            console.log(err);
          });
        } 
      });
    })
    .catch(function(err) {
      console.log(err);
    });

  }, 10000); // 10000 every ten seconds

};

tendChallenges();