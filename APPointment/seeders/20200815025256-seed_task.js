const moment = require('moment');
const currentDate = new Date();
const faker = require('faker');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tasks', [
      {
        'id': 1,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 1,
      },
      {
        'id': 2,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 2,
      },
      {
        'id': 3,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 1,
      },
      {
        'id': 4,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 1,
      },
      {
        'id': 5,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 2,
      },
      {
        'id': 6,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 2,
      },
      {
        'id': 7,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': false,
        'users_id': 1,
      },
      {
        'id': 8,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 2,
      },
      {
        'id': 9,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 3,
      },
      {
        'id': 10,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 4,
      },
      {
        'id': 11,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': false,
        'users_id': 4,
      },
      {
        'id': 1,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 1,
      },
      {
        'id': 12,
        'startat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'doneat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'createdat': moment(currentDate).subtract(1, 'day').format('YYYY-MM-DD hh:mm:ss'),
        'updatedat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'description': faker.lorem.sentence(3),
        'done': true,
        'users_id': 4,
      }
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};