/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Task = sequelize.define('Task', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true,
      autoIncrement: true
    },
    'startat': {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    'doneat': {
      type: DataTypes.DATE,
      allowNull: true,
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
    'description': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    },
    'done': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "null"
    },
    'users_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    tableName: 'tasks'
  });
  
  return Task;
};
