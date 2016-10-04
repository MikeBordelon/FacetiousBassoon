module.exports = (db, Sequelize) => {
  const UserChallengeJT = db.define('UserChallengeJT', {
    id: {
      type: Sequelize.INTEGER, autoIncrement: true, unique: true, primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER
    },
    challengeId: {
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