module.exports = (db, Sequelize) => {
  const User = db.define('users', {
    firstName: {
      type: Sequelize.STRING,
      field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    lastName: {
      type: Sequelize.STRING
    },
    accessToken: {
      type: Sequelize.STRING
    },
    refreshToken: {
      type: Sequelize.STRING
    },
    expiresIn: {
      type: Sequelize.INTEGER
    },
    fbUserId: {
      type: Sequelize.STRING
    },
    expiresAt: {
      type: Sequelize.DATE
    }
  });
  return {
    User: User
  };
};