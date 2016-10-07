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
      type: Sequelize.INTEGER
    },
    buyInAmount: {
      type: Sequelize.INTEGER
    },
    totalPot: {
      type: Sequelize.INTEGER
    },
    numOfParticipants: {
      type: Sequelize.INTEGER
    }
  });
  return {
    Challenge: Challenge
  };
};