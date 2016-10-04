module.exports = (db, Sequelize) => {
  const Challenge = db.define('challenges', {
    ethereumAddress: {
      type: Sequelize.STRING // just a string?
    },
    creationDate: {
      type: Sequelize.DATE // special date?
    },
    expirationDate: {
      type: Sequelize.DATE // special date?
    }
  });
  return {
    Challenge: Challenge
  };
};