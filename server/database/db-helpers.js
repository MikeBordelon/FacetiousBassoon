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
    
    Challenge.create({
      creatorUserId: req.body.userId,
      ethereumSCAddress: 'null',
      startDate: req.body.startDate,
      expirationDate: req.body.expirationDate,
      status: 'new',
      goalType: req.body.goalType,
      goalAmount: req.body.goalAmount,
      buyInAmount: req.body.buyInAmount
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
  retrieveChallenges: function (req, res) {
    console.log('request hit retrieveChallenges with id:' + req.params.id);

    // User.findAll(
    //   {
    //     include: {
    //       model: Challenge,
    //       through: {
    //         attributes: ['userId', 'metricType', 'metricStart', 'metricCurrent', 'metricGoal', 'createdAt', 'updatedAt'],
    //         where: { id: req.params.id },
    //       }

    //     }
    //   }
    // )
    db.query('select * from users inner join ', { type: db.QueryTypes.SELECT})
      .then(function(found) {
        res.statusCode === 200;
        res.end(JSON.stringify(found)); 
      })
      .catch(function(err) {
        res.statusCode === 404;
        res.end(); 
      });
  }
};
