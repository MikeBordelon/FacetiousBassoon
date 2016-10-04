module.exports = (db, Sequelize) => {
  const UserChallengeJT = db.define('user_challenges_jt', {
    id: {
      type: Sequelize.INTEGER, autoIncrement: true, unique: true, primaryKey: true
    },
    userid: {
      type: Sequelize.STRING // num?
    },
    challengeid: {
      type: Sequelize.STRING // num?
    },
    metricType: {
      type: Sequelize.STRING
    },
    metricStart: {
      type: Sequelize.STRING
    },
    metricCurrent: {
      type: Sequelize.STRING
    },
    metricGoal: {
      type: Sequelize.STRING
    }
  });
  return {
    UserChallengeJT: UserChallengeJT
  };
};