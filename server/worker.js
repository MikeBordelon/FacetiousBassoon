const {User, Challenge, UserChallenges, db, Sequelize} = require('./database/db-config.js');
var request = require('request');
var authKeys = require('./resources/passportAuth.js');

// worker container function
var tendChallenges = function() {
  var startedChallenges = [];

  // helper function to grab FitBit steps from API for challenges
  var checkFitBitStats = function(challengeId, needsBaseline) {
    
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
        // console.log('getUsers: ', JSON.stringify( resultChallengesArr[0].dataValues.UserChallenge ));

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
            if (error) { 
              console.log('Worker - FitBit API call failed: ', error);

              // handle expired access token for FitBit API: https://dev.fitbit.com/docs/oauth2/#refreshing-tokens
              if (body.errors[0].errorType === 'expired_token') {
               
                // make request to FitBit API using refresh token 
                var options = { method: 'POST',
                  url: 'https://api.fitbit.com/oauth2/token',
                  qs: 
                   { grant_type: 'refresh_token',
                     refresh_token: challengePlusJT.refresh_token },
                  headers: 
                   { 'postman-token': '03443faa-a85f-bfb0-193f-898295898d27',
                     'cache-control': 'no-cache',
                     'content-type': 'application/x-www-form-urlencoded',
                     authorization: 'Basic ' + btoa(authKeys.lex.clientId + ':' + authKeys.lex.clientSecret)},
                  form: false };

                request(options, function (error, response, body) {
                  if (error) { 
                    console.log('Worker - refresh token update has failed: ', error);
                    throw new Error(error);

                    // handle expired access token for FitBit API: https://dev.fitbit.com/docs/oauth2/#refreshing-tokens
                    if (body.errors[0].errorType === 'expired_token') {
                     
                    }
                  }
                });
                return; 
              }
              return; 
            }

            // FitBit API worker 
            // console.log('FitBit API returned: ', JSON.stringify(body));
            console.log('Worker - challenge ' + challengePlusJT.UserChallenge.challengeId + ' participant userID: ' + challengePlusJT.dataValues.fbUserId + ' Total steps: ', JSON.stringify(body.lifetime.tracker.steps)); // distance floors steps caloriesOut
            
            var updateFields;
            if (needsBaseline) {
              updateFields = 
              {
                goalStart: body.lifetime.tracker.steps,
                goalCurrent: body.lifetime.tracker.steps
              };
            } else {
              updateFields = 
              {
                goalCurrent: body.lifetime.tracker.steps
              };
            }

            // update challenge join table
            challengePlusJT.dataValues.UserChallenge.update(updateFields)
            .then(function(result) {
              // console.log(JSON.stringify(result)); 
              return;
            })
            .catch(function(err) {
              console.log(JSON.stringify(err));
            });
            return;
          });
          // some available fields
          // challengePlusJT.id;
          // challengePlusJT.fbUserId;
          // challengePlusJT.access_token;
          // challengePlusJT.refresh_token;
          // challengePlusJT.UserChallenge.challengeId;
          // challengePlusJT.UserChallenge.goalStart;
          // challengePlusJT.UserChallenge.goalCurrent;
        });
      })
      .catch(function(err) {
        console.log(JSON.stringify(err));
      });
    })
    .catch(function(err) {
      console.log(JSON.stringify(err));
    });
  };

  // helper function to update challenge status and grab steps from FitBit API
  var updateChallenge = function(newChallenge, updateText) {
    Challenge.findOne({
      where: { id: newChallenge.id } 
    })
    .then(function(challenge) {
      // call FitBit helper function based on updateText type
      var needsBaseline = false;
      if (updateText === 'started') {
        needsBaseline = true;
      }
      // check FitBit API and update goal fields
      checkFitBitStats(challenge.id, needsBaseline);
      
      // update challenge status
      challenge.update(
        {
          status: updateText,
        }
      )
      .then(function(result) {
        console.log('Worker - challenge ' + challenge.id + ' status changed to: ', updateText);
        // console.log(JSON.stringify(result));
        return;
      })
      .catch(function(err) {
        console.log(err); 
      });
    })
    .catch(function(err) {
      console.log(err);
    });
    return;
  };

  // main worker interval loop
  setInterval(function() {

    // Find and transition all challenges that need to flip from 'new' to 'started'
    Challenge.findAll({
      where: {
        $or: [
                { status: 'new' }, 
                { status: 'started' }
        ]
      }
    })
    .then(function(newChallenges) {

      // check and update challenges that should change status 
      newChallenges.forEach(function(newChallenge) {
        var nowNow = Date.now();
        // challenges of two statuses need tending - new and started
        if ( (newChallenge.status === 'new') && ( Date.parse(newChallenge.startDate) <= nowNow ) ) {
          // update the challenge status - new->started
          updateChallenge(newChallenge, 'started');
          newChallenge.status = 'new';
        }
        if ( (newChallenge.status === 'started') && ( nowNow >= Date.parse(newChallenge.expirationDate) ) ) {
          // update the challenge status - started->expired
          updateChallenge(newChallenge, 'expired');
          newChallenge.status = 'started';
        }
      });
    })
    .catch(function(err) {
      console.log(err);
    });

  // end setTimeout
  }, process.env.WORKER_1_SETTIMEOUT); // 20000 every twenty seconds

};

tendChallenges();