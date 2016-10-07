module.exports = (db, Sequelize) => {
  const User = db.define('user', {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING
    },
    accessToken: {
      type: Sequelize.STRING
    },
    refreshToken: {
      type: Sequelize.STRING
    },
    tokenExpiresIn: {
      type: Sequelize.INTEGER
    },
    fbUserId: {
      type: Sequelize.STRING
    }
  });
  return {
    User: User
  };
};