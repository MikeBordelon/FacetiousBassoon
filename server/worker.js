const {User, Challenge, UserChallenges, db, Sequelize} = require('./database/db-config.js');

var tendChallenges = function() {
  var startedChallenges = [];

    // look up FitBit steps for newly started challenges
  var checkFitBitStats = function(challengeId) {
    console.log('checkFitBitStats called', challengeId);
    Challenge.findOne({
      where: { id: challengeId }
    })
    .then(function(challenge) {
      console.log('checkFitBitStats challenge lookup: ', challenge);
      challenge.getUsers({
      })
      .then(function(result) {
        console.log(results);
      })
      .catch(function(results) {
        console.log(results);
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