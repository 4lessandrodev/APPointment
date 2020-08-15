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
  }, {
    tableName: 'users',
    defaultScope: {
      attributes:{exclude:['password']}
    },
    escopes: {
      withPassword: {
        attributes:{}
      }
    }
  });
  
  User.associate = (models) => {
    
    User.belongsToMany(models.Team, {
      through: 'team_has_users',
      as: 'team_users',
      foreignKey: 'users_id'
    });
    
    User.associate = (models) => {
      User.belongsTo(models.Task, {
        as: 'users_task',
        foreignKey: 'users_id'
      });
    };
    
  };
  
  return User;
};
