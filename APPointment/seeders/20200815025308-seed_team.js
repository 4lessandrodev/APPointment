const moment = require('moment');
const currentDate = new Date();
const faker = require('faker');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('teams', [
      {
        'id': 1,
        'description': faker.random.word(),
        'created_at':moment(currentDate).subtract(4, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updated_at': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'manager': 5,
      }
    ], {});
    
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('teams', null, {});
  }
};
