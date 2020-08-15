/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true,
      autoIncrement: true
    },
    'name': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    },
    'password': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    },
    'admin': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "null"
    },
    'createdat': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    'updatedat': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    }
  }, {
    tableName: 'users'
  });
  
  return User;
};
