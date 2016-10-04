module.exports = (db, Sequelize) => {
  const UserChallengeJT = db.define('user_challenges_jt', {
    id: {
      type: Sequelize.INTEGER, autoIncrement: true, unique: true, primaryKey: true
    },
    userid: {
      type: Sequelize.INTEGER
    },
    challengeid: {
      type: Sequelize.INTEGER
    },
    goalType: {
      type: Sequelize.STRING
    },
    goalStart: {
      type: Sequelize.STRING
    },
    goalCurrent: {
      type: Sequelize.STRING
    },
    userEtherWallet: {
      type: Sequelize.STRING
    }
  });
  return {
    UserChallengeJT: UserChallengeJT
  };
};