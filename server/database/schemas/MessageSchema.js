module.exports = (db, Sequelize) => {
  const Message = db.define('message', {
    userId: {
      type: Sequelize.INTEGER
    },
    challengeId: {
      type: Sequelize.INTEGER
    },
    outcome: {
      type: Sequelize.STRING
    },
    amount: {
      type: Sequelize.NUMERIC
    },
    read: {
      type: Sequelize.BOOLEAN
    }
  });
  return {
    Message: Message
  };
};