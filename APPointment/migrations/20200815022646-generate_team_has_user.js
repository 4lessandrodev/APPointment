'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('team_has_users', {
      'teams_id': {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "null",
        references: {
          model: 'teams',
          key: 'id'
        }
      },
      'users_id': {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "null",
        references: {
          model: 'users',
          key: 'id'
        }
      },
      'createdat': {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "null"
      },
      'updatedat': {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "null"
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('team_has_users');
  }
};
