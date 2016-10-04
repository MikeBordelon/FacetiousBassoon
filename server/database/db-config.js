var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL || 'postgres://docker:docker@db:5432/fitcoin', { logging: false });

db.sync({force: true});

const {User} = require('./controllers/UserController.js')(db, Sequelize);
const {Challenge} = require('./controllers/ChallengeController.js')(db, Sequelize);
const {UserChallengeJT} = require('./controllers/UserChallengeJTController.js')(db, Sequelize);

User.belongsToMany(Challenge, {through: 'UserChallengeJT', foreignKey: 'userId'});  
Challenge.belongsToMany(User, {through: 'UserChallengeJT', foreignKey: 'challengeId'});

module.exports = {db, User, UserChallengeJT, Challenge};