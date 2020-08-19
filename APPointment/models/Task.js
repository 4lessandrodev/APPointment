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
    'start_at': {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    'done_at': {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null"
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.TIMESTAMP,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "null",
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.TIMESTAMP,
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

  Task.associate = (models) => {
    Task.belongsTo(models.User, {
      as: 'users_task',
      foreignKey: 'users_id'
    });
  };
  
  return Task;
};
