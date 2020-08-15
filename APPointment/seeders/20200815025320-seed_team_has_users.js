const moment = require('moment');
const currentDate = new Date();
const faker = require('faker');

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('team_has_users', [
      {
        'teams_id': 1,
        'users_id': 1,
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        'teams_id': 1,
        'users_id': 2,
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
      },
      {
        'teams_id': 1,
        'users_id': 3,
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('team_has_users', null, {});
  }
};
