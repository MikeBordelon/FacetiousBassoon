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

      // collect win conditions
      var winnerIds = [];
      var ethereumSCAddress = challenge.ethereumSCAddress;
      var creatorWalletAddress = null; 
      var goalAmount = challenge.goalAmount;

      // get all users associated with that challenge
      challenge.getUsers({
        where: {}
      })
      .then(function(resultChallengesArr) {
        // console.log('getUsers: ', JSON.stringify( resultChallengesArr[0].dataValues.UserChallenge ));
        

        // get the UserChallenge 
        resultChallengesArr.forEach(function(userPlusJT) {
          
          // some available fields
            // userPlusJT.id
            // userPlusJT.fbUserId
            // userPlusJT.access_token
            // userPlusJT.refresh_token
            // userPlusJT.UserChallenge.challengeId
            // userPlusJT.UserChallenge.goalStart
            // userPlusJT.UserChallenge.goalCurrent
            // userPlusJT.UserChallenge.userEtherWallet
            // challenge.creatorUserId

          // find challenge creator
          if (challenge.creatorUserId === userPlusJT.id) {
            creatorWalletAddress = userPlusJT.UserChallenge.userEtherWallet;
          }

          // log winner ids
          if (userPlusJT.UserChallenge.goalStart - userPlusJT.UserChallenge.goalCurrent >= goalAmount) {
            winnerIds.push(userPlusJT.id);
          }
          
          // make an API call to FitBit
          var options = { method: 'GET',
            url: 'https://api.fitbit.com/1/user/' + userPlusJT.dataValues.fbUserId + '/activities.json',
            headers: 
             { 'postman-token': '7dbc8c9f-431c-b847-16be-2fba85f0eab9',
               'cache-control': 'no-cache',
               'content-type': 'application/json',
               authorization: 'Bearer ' + userPlusJT.dataValues.accessToken },
            json: true };
          request(options, function (error, response, body) {

            // if FitBit API call fails
            if (error) { 
              console.log('Worker - FitBit API call failed: ', error);

              // If FitBit API call fails because access token is expired...
              if (body.errors[0].errorType === 'expired_token') {
               
                // Then re-up tokens using refresh token: https://dev.fitbit.com/docs/oauth2/#refreshing-tokens
                // POST request with user's  refresh token in order to... refresh tokens
                var options = { method: 'POST',
                  url: 'https://api.fitbit.com/oauth2/token',
                  qs: 
                   { grant_type: 'refresh_token',
                     refresh_token: userPlusJT.refresh_token },
                  headers: 
                   { 'postman-token': '03443faa-a85f-bfb0-193f-898295898d27',
                     'cache-control': 'no-cache',
                     'content-type': 'application/x-www-form-urlencoded',
                     authorization: 'Basic ' + btoa(authKeys.lex.clientId + ':' + authKeys.lex.clientSecret)},
                  form: false };
                request(options, function (error, response, body) {
                  // 
                  if (error) { 
                    console.log('Worker - refresh token update has failed: ', error);
                    throw new Error(error);
                  } else {

                    // have new access token and refresh token
                    console.log('  New access_token: ', response.access_token);
                    console.log('  New refresh_token: ', response.refresh_token);

                    // save access token and refresh token
                    User.findOne({
                      where: {id: userPlusJT.id }
                    })
                    .then(function(userRow) {
                      
                      // save access token and refresh token to userRow
                      userRow.update(
                        { accessToken: response.access_token },
                        { refreshToken: response.refresh_token }
                      )
                      .then(function(result) {
                        console.log('Worker - refreshed tokens save has succeeed: ', result);
                      })
                      .catch(function(err) {
                        console.log('Worker - refreshed tokens save has failed: ', error);
                      });
                    })
                    .catch(function(err) {
                      console.log('Worker - refreshed tokens user lookup, save has failed: ', error);
                    });

                    // make an API call to FitBit with new access token
                    var options = { method: 'GET',
                      url: 'https://api.fitbit.com/1/user/' + userPlusJT.dataValues.fbUserId + '/activities.json',
                      headers: 
                       { 'postman-token': '7dbc8c9f-431c-b847-16be-2fba85f0eab9',
                         'cache-control': 'no-cache',
                         'content-type': 'application/json',
                         authorization: 'Bearer ' + response.access_token },
                      json: true };
                    request(options, function (error, response, body) {

                      // have new auth token now and can re-query FitBit API
                      // console.log('FitBit API returned: ', JSON.stringify(body));
                      console.log('Worker - challenge ' + userPlusJT.UserChallenge.challengeId + ' participant userID: ' + userPlusJT.dataValues.fbUserId + ' Total steps: ', JSON.stringify(body.lifetime.tracker.steps)); // distance floors steps caloriesOut
                      
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
                      userPlusJT.dataValues.UserChallenge.update(updateFields)
                      .then(function(result) {
                        // console.log(JSON.stringify(result)); 
                        return;
                      })
                      .catch(function(err) {
                        console.log(JSON.stringify(err));
                      });
                      return;
                    });
                  }
                });
                return; 
              }
              return; 
            }

            // FitBit API worker 
            // console.log('FitBit API returned: ', JSON.stringify(body));
            console.log('Worker - challenge ' + userPlusJT.UserChallenge.challengeId + ' participant userID: ' + userPlusJT.dataValues.fbUserId + ' Total steps: ', JSON.stringify(body.lifetime.tracker.steps)); // distance floors steps caloriesOut
            
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
            userPlusJT.dataValues.UserChallenge.update(updateFields)
            .then(function(result) {
              // console.log(JSON.stringify(result)); 
              return;
            })
            .catch(function(err) {
              console.log(JSON.stringify(err));
            });
            return;
          });

        });

        if (!needsBaseline) {
          if (winnerIds.length === 0) {
            winnerIds.push(/* NO WINNERs ADDRESS */);
          }
          
          console.log('Winners: ');
          console.log('winnerIds', winnerIds);
          console.log('ethereumSCAddress', ethereumSCAddress);
          console.log('goalAmount', goalAmount);
          console.log('creatorWalletAddress', creatorWalletAddress);
          
          // Make request to eth:3002/API/outcomeChallenge with 
            // winnerIds
            // ethereumSCAddress
            // goalAmount
            // creatorWalletAddress

        }
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