const {User, Challenge, UserChallenges, db, Sequelize} = require('./database/db-config.js');


setInterval(function() {
 
  Challenge.findAll({
    where: { status: 'new' }
  })
  .then(function(found) {
    console.log(found);
  })
  .catch(function(err) {
    console.log(err);
  });

}, 10000); // 60000 every five minutes