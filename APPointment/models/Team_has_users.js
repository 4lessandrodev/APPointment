/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Team_has_users = sequelize.define('Team_has_users', {
    'teams_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      references: {
        model: 'Team',
        key: 'id'
      }
    },
    'users_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      references: {
        model: 'User',
        key: 'id'
      }
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
    tableName: 'team_has_users'
  });

  return Team_has_users;
};
