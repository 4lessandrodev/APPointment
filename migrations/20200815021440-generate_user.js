'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', { 
      'id': {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: "null",
        primaryKey: true,
        autoIncrement: true
      },
      'name': {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "null"
      },
      'email': {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "null"
      },
      'password': {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "null"
      },
      'admin': {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: "null"
      },
      'created_at': {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "null"
      },
      'updated_at': {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: "null"
      } 
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
