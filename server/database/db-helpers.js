const {User, Challenge, UserChallengeJT, db} = require('./db-config.js');

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
    Challenge.create({
      ethereumAddress: req.body.ethereumAddress,
      status: 'new',
      expirationDate: req.body.expirationDate,
      creationDate: Date.now()
    })
      .then(function(challenge) {
        console.log(challenge);
        UserChallengeJT.create({
          userId: req.body.userId,
          challengeId: challenge.id,
          metricType: req.body.metricType,
          metricGoal: req.body.metricGoal,
          metricCurrent: 10,
          metricStart: 0
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
        res.end(err); 
      });
  },
  retrieveChallenges: function (req, res) {
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
