module.exports = (db, Sequelize) => {
  const Challenge = db.define('challenge', {
    creatorUserId: {
      type: Sequelize.INTEGER
    },
    ethereumSCAddress: {
      type: Sequelize.STRING
    },
    startDate: {
      type: Sequelize.DATE
    },
    expirationDate: {
      type: Sequelize.DATE
    },
    status: {
      type: Sequelize.STRING
    },
    goalType: {
      type: Sequelize.STRING
    },
    goalAmount: {
      type: Sequelize.BIGINT
    },
    buyInAmount: {
      type: Sequelize.NUMERIC
    },
    totalPot: {
      type: Sequelize.NUMERIC
    },
    numOfParticipants: {
      type: Sequelize.INTEGER
    }
  });
  return {
    Challenge: Challenge
  };
};