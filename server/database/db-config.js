var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL || 'postgres://docker:docker@db:5432/fitcoin', { logging: false });

db.sync({force: true});

const {User} = require('./schemas/UserSchema.js')(db, Sequelize);
const {Challenge} = require('./schemas/ChallengeSchema.js')(db, Sequelize);
const {UserChallengeJT} = require('./schemas/UserChallengeJTSchema.js')(db, Sequelize);
const {Picture} = require('./schemas/PictureSchema.js')(db, Sequelize);
const {Friend} = require('./schemas/FriendSchema.js')(db, Sequelize);

User.belongsToMany(Challenge, {through: 'UserChallengeJT', foreignKey: 'userId'});  
Challenge.belongsToMany(User, {through: 'UserChallengeJT', foreignKey: 'challengeId'});
User.belongsToMany(User, {as: 'friends', through: 'friends', otherKey: 'userId', foreignKey: 'friendId' }); //doublecheck

module.exports = {db, User, UserChallengeJT, Challenge, Sequelize};