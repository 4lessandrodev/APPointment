'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      'id': {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "null",
        primaryKey: true,
        autoIncrement: true
      },
      'description': {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "null"
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
      },
      'manager': {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "null",
        references: {
          model: 'users',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('teams');
  }
};
