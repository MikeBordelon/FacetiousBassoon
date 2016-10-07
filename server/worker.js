const {User, Challenge, UserChallenges, db, Sequelize} = require('./database/db-config.js');
var request = require('request');


// container function for worker to tend challenge statuses and fitbit data
var tendChallenges = function() {
  var startedChallenges = [];

  // look up FitBit steps for newly started challenges
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

            // 
            challengePlusJT.dataValues.UserChallenge.update(updateFields)
            .then(function(result) {
              console.log(JSON.stringify(result)); 
            })
            .catch(function(err) {
              console.log(JSON.stringify(err));
            });
            return;
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
      
      challenge.update(
        {
          status: updateText,
        }
      )
      .then(function(result) {
        console.log('Worker - challenge ' + challenge.id + ' status changed to: ', updateText);
        console.log(JSON.stringify(result));
        return;
      })
      .catch(function(err) {
        console.log(err); 
      });
    })
    .catch(function(err) {
      console.log(err);
    });
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
      // console.log(JSON.stringify(newChallenges));
      newChallenges.forEach(function(newChallenge) {
        // if challenge is status 'new' but should be 'started'...
        // console.log('newChallenge.status HERE: ', newChallenge.status);
        // console.log('newChallenge.status = new: ', newChallenge.status = 'new');
        // console.log('Date.parse(newChallenge.startDate): ', Date.parse(newChallenge.startDate));
        // console.log('Date.now(): ', Date.now());
        // console.log('Date.parse(newChallenge.expirationDate): ', Date.parse(newChallenge.expirationDate));
        // console.log('entire if statement: ', ( (newChallenge.status = 'new') && ( Date.parse(newChallenge.startDate) >= Date.now() ) && ( Date.now() < Date.parse(newChallenge.expirationDate) ) ));

        if ( (newChallenge.status = 'new') && ( Date.parse(newChallenge.startDate) <= Date.now() ) && ( Date.now() < Date.parse(newChallenge.expirationDate) ) ) {
          // update the challenge status - new->started
          console.log('updating challenge: new->started');
          updateChallenge(newChallenge, 'started');
        }
        if ( (newChallenge.status = 'started') && ( Date.parse(newChallenge.expirationDate) >= Date.now() ) ) {
          // update the challenge status - started->expired
          updateChallenge(newChallenge, 'expired');
        }
      });
    })
    .catch(function(err) {
      console.log(err);
    });


  }, 10000); // 10000 every ten seconds

};

tendChallenges();