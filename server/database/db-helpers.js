const {User, Challenge, UserChallenges, db, Message, Sequelize} = require('./db-config.js');
const axios = require('axios');

module.exports = {
  retrieve: function (req, res) {
    User.findAll({})
      .then(function(found) {
        res.status(200).send(found);
      })
      .catch(function(err) {
        res.status(404).send(err);
      });
  },
  retrieveOneUser: function (req, res) { // to do: send also challenges you are a part of, not just ones you created
    User.findOne({
      where: { id: req.user.user.id },
      attributes: ['name', 'email', 'fbUserId'],
      include: {
        model: Challenge,
        through: {
          where: { userId: req.user.user.id }, // added this
          attributes: ['userId', 'createdAt', 'updatedAt']
        }

      }
    })
      .then(function(found) {
        res.status(200).send(found);
      })
      .catch(function(err) {
        res.status(404).send(err);
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
        res.status(200).send(found);
      })
      .catch(function(err) {
        res.status(404).send(err);
      });
  },
  delete: function (req, res) {
    User.destroy({
      where: {}  // {status: 'inactive'} // specifics
    })
      .then(function(deleted) {
        res.status(200).send(deleted);
      })
      .catch(function(err) {
        res.status(404).send(err);
      });
  },
  createChallengeType: function (req, res) {
    Challenge.create({
      name: req.params.name
    })
      .then(function(created) {
        res.status(200).send(created);
      })
      .catch(function(err) {
        res.status(404).send(err);
      });
  },
  createChallenge: function (req, res) {
    console.log('request hit createChallenge');
    axios.post('http://ethereum:3002/api/challenge', {
      senderAddress: req.body.userEtherWallet,
      buyInAmount: req.body.buyInAmount
    }).then((response) => {
      Challenge.create({
        creatorUserId: req.body.userId,
        ethereumSCAddress: response.data,
        startDate: req.body.startDate,
        expirationDate: req.body.expirationDate,
        status: 'new',
        goalType: req.body.goalType,
        goalAmount: req.body.goalAmount,
        buyInAmount: req.body.buyInAmount,
        numOfParticipants: 1,
        totalPot: req.body.buyInAmount
      })
        .then(function(challenge) {
          axios.post('http://ethereum:3002/api/addUser', {
            fromAddress: req.body.userEtherWallet,
            contractAddress: response.data,
            buyInAmount: req.body.buyInAmount,
            userId: req.body.userId,
            userName: 'sampleUsername',
            gas: 300000
          }).then((response) => {
            console.log(response.data, 'challenge created, now creating join table entry...');
            UserChallenges.create({
              userId: req.body.userId,
              challengeId: challenge.id,
              goalType: req.body.goalType,
              goalStart: 'null',  // worker will update these
              goalCurrent: 'null', // worker will update these
              userEtherWallet: req.body.userEtherWallet
            })
              .then(function(result) {
                res.status(200).send(result);
              })
              .catch(function(err) {
                res.status(404).send(err);
              });

          }).catch((error) => {
            res.status(400).send(error);
          });
        })
        .catch(function(err) {
          res.status(404).send(err);
        });
    })
    .catch((err) => {
      res.status(404).send(err);
    });

  },
  updateChallenge: function (req, res) {
    console.log('request hit updateChallenge');
    Challenge.findOne({
      where: { id: req.params.id }
    })
    .then(function(challenge) {
      console.log(challenge.dataValues, 'this is the challenge from updateChallenge!');
      axios.post('http://ethereum:3002/api/addUser', {
        fromAddress: req.body.userEtherWallet,
        contractAddress: challenge.dataValues.ethereumSCAddress,
        buyInAmount: challenge.dataValues.buyInAmount,
        userId: req.body.userId,
        userName: 'sampleUsername',
        gas: 300000
      }).then((response) => {
        challenge.update(
          { numOfParticipants: challenge.numOfParticipants + 1,
          totalPot: challenge.totalPot + challenge.buyInAmount},
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
            res.status(200).send(result);
          })
          .catch(function(err) {
            res.status(404).send(err);
          });
        })
        .catch(function(err) {
          res.status(404).send(err);
        });
      })
      .catch((error) => {
        res.status(404).send(error);
      });
      console.log('findOne returned: ' + challenge);
    })
    .catch(function(err) {
      res.status(404).send(err);
    });
  },
  retrieveAllChallenges: function (req, res) {
    console.log('request hit retrieveAllChallenges');

    Challenge.findAll({
      where: {},
    })
      .then(function(found) {
        res.status(200).send(found);
      })
      .catch(function(err) {
        res.status(404).end();
      });
  },
  retrieveAllJoinableChallenges: function (req, res) {
    console.log('request hit retrieveAllJoinableChallenges');
    Challenge.findAll({
      where: {status: 'new'}
    })
      .then(function(allChallenges) {
        UserChallenges.findAll({
          where: { userId: req.user.user.id }
        })
        .then(function(usersChallenges) {
          // find challenges user is already a part of
          var badChallengeIds = [];
          usersChallenges.forEach(function(elem) {
            badChallengeIds.push(elem.challengeId);
          });
          // filter out challenges user is already part of
          var result = allChallenges.filter(function(challenge) {
            return !badChallengeIds.includes(challenge.id);
          });
          res.status(200).send(result);
        })
        .catch(function(err) {
          res.status(404).end();
        });
      })
      .catch(function(err) {
        res.status(404).end();
      });
  },
  getMessage: (req, res) => {
    Message.findAll({
      where: {
        userId: req.user.user.id
      }
    })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
  },
  updateMessage: (req, res) => {
    Message.findOne({
      where: {
        id: req.params.msgId
      }
    })
    .then((message) => {
      message.update({
        read: req.data.read
      }).then((updated) => {
        res.status(200).send(updated);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
  }
};


/* FOR DUSTIN
retrieveOne: function (req, res) {
    User.findOne({
      where: {fbUserId: req.params.fbUserId}, // fbUserId
      // attributes: ['id', ['name', 'title']] // can specifiy needed fields
    })
      .then(function(found) {
        res.status(200).send(found);
      })
      .catch(function(err) {
        res.status(404).end();
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
        res.status(200).send(created);
      })
      .catch(function(err) {
        res.status(404).end();
      });
  },
  updateOne: function (req, res) {
    User.findAll({})
      .then(function(found) {
        res.status(200).send(found);
      })
      .catch(function(err) {
        res.status(404).end();
      });
  },
  deleteOne: function (req, res) {
    User.findAll({})
      .then(function(found) {
        res.status(200).send(found);
      })
      .catch(function(err) {
        res.status(404).end();
      });
  },
  */
