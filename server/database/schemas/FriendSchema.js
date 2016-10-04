module.exports = (db, Sequelize) => {
  const Friend = db.define('friends', {
    userId: {
      type: Sequelize.INTEGER
    },
    friendId: {
      type: Sequelize.INTEGER
    }
  });
  return {
    Friend: Friend
  };
};