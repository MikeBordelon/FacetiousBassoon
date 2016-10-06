const {User, Challenge, UserChallenges, db, Sequelize} = require('./db-config.js');

module.exports = {
  retrieve: function (req, res) {
    User.findAll({})
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  retrieveOneUser: function (req, res) {
    User.findOne({
      where: { id: req.params.userId },
      attributes: ['name', 'email', 'fbUserId'],
      include: {
        model: Challenge,
        through: {
          where: { userId: req.params.userId }, // added this
          attributes: ['userId', 'createdAt', 'updatedAt']
        }

      }
    })
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  retrieveAllUsers: function (req, res) {
    User.findAll({
      attributes: ['name', 'email', 'fbUserId'],
      include: {
        model: Challenge,
        through: {
          attributes: ['userId', 'createdAt', 'updatedAt']
        }

      }
    })
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  retrieveOne: function (req, res) {
    User.findOne({
      where: {fbUserId: req.params.fbUserId}, // fbUserId
      // attributes: ['id', ['name', 'title']] // can specifiy needed fields
    })
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  createOne: function (req, res) {
    User.create({
      firstName: req.params.firstName,
      lastName: req.params.lastName,
      // accessToken: req.params.accessToken,
      // refreshToken: req.params.refreshToken,
      // expiresIn: req.params.expiresIn,
      // fbUserId: req.params.fbUserId
    })
      .then(function(created) {
        res.statusCode === 200;
        res.end(JSON.stringify(created));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  updateOne: function (req, res) {
    User.findAll({})
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  deleteOne: function (req, res) {
    User.findAll({})
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  delete: function (req, res) {
    User.destroy({
      where: {}  // {status: 'inactive'} // specifics
    })
      .then(function(deleted) {
        res.statusCode === 200;
        res.end(JSON.stringify(deleted));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  createChallengeType: function (req, res) {
    Challenge.create({
      name: req.params.name
    })
      .then(function(created) {
        res.statusCode === 200;
        res.end(JSON.stringify(created));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  createChallenge: function (req, res) {
    console.log('request hit createChallenge');

    Challenge.findOne({
      where: { id: req.params.challengeId },
      attributes: ['name', 'email', 'fbUserId'],
      include: {
        model: Challenge,
        through: {
          attributes: ['userId', 'createdAt', 'updatedAt']
        }

      }
    })
    Challenge.create({
      creatorUserId: req.body.userId,
      ethereumSCAddress: 'null',
      startDate: req.body.startDate,
      expirationDate: req.body.expirationDate,
      status: 'new',
      goalType: req.body.goalType,
      goalAmount: req.body.goalAmount,
      buyInAmount: req.body.buyInAmount,
      numOfParticipants: 1
    })
      .then(function(challenge) {
        console.log('challenge created, now creating join table entry...');
        UserChallenges.create({
          userId: req.body.userId,
          challengeId: challenge.id,
          goalType: req.body.goalType,
          goalStart: 'null',  // worker will update these
          goalCurrent: 'null', // worker will update these
          userEtherWallet: req.body.userEtherWallet
        })
          .then(function(result) {
            res.statusCode === 200;
            res.end(JSON.stringify(result));
          })
          .catch(function(err) {
            res.statusCode === 404;
            res.end(JSON.stringify(err));
          });
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end(JSON.stringify(err));
      });
  },
  updateChallenge: function (req, res) {
    console.log('request hit updateChallenge');
    Challenge.findOne({
      where: { id: req.params.id }
    })
    .then(function(challenge) {
      console.log('findOne returned: ' + challenge);
      challenge.update(
        { numOfParticipants: challenge.numOfParticipants + 1 },
        { totalPot: challenge.totalPot + challenge.buyInAmount },
        { where: { id: req.params.id } }
      )
      .then(function(result) {
        UserChallenges.create({
          userId: req.body.userId,
          challengeId: req.params.id,
          goalType: result.goalType,
          userEtherWallet: req.body.userEtherWallet
        })
        .then(function(result) {
          res.statusCode === 200;
          res.end(JSON.stringify(result));
        })
        .catch(function(err) {
          res.statusCode === 404;
          res.end(JSON.stringify(err));
        });
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end(JSON.stringify(err));
      });
    })
    .catch(function(err) {
      res.statusCode === 404;
      res.end(JSON.stringify(err));
    });
  },
  retrieveAllChallenges: function (req, res) {
    console.log('request hit retrieveAllChallenges');

    Challenge.findAll({
      where: {},
    })
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found));
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  },
  retrieveAllJoinableChallenges: function (req, res) {
    console.log('request hit retrieveAllJoinableChallenges');
    Challenge.findAll({
      where: {status: 'new'}
    })
      .then(function(allChallenges) {
        UserChallenges.findAll({
          where: { userId: req.params.userId }
        })
        .then(function(usersChallenges) {
          // find challenges user is already a part of
          var badChallengeIds = [];
          usersChallenges.forEach(function(elem){
            badChallengeIds.push(elem.challengeId);
          });
          // filter out challenges user is already part of
          var result = allChallenges.filter(function(challenge) {
            return !badChallengeIds.includes(challenge.id);
          });
          res.statusCode === 200;
          res.end(JSON.stringify(result));
        })
        .catch(function(err) {
          res.statusCode === 404;
          res.end();
        });
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end();
      });
  }
};
