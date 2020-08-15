/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Team = sequelize.define('Team', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true,
      autoIncrement: true
    },
    'description': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    },
    createdAt: {
      field: 'createdat',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null",
    },
    updatedAt: {
      field: 'updatedat',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    'manager': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    tableName: 'teams'
  });

  return Team;
};
