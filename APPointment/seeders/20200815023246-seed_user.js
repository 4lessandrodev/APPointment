const faker = require('faker');
const bcrypt = require('bcrypt');
const moment = require('moment');
const currentDate = new Date();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        'id': 1,
        'name': faker.internet.userName(),
        'email': faker.internet.email(),
        'password': bcrypt.hashSync('123456', 10),
        'admin': false,
        'createdat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'updatedat':  moment(currentDate).format('YYYY-MM-DD hh:mm:ss')
      },
      {
        'id': 2,
        'name': faker.internet.userName(),
        'email': faker.internet.email(),
        'password': bcrypt.hashSync('123456', 10),
        'admin': false,
        'createdat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'updatedat':  moment(currentDate).format('YYYY-MM-DD hh:mm:ss')
      },
      {
        'id': 3,
        'name': faker.internet.userName(),
        'email': faker.internet.email(),
        'password': bcrypt.hashSync('123456', 10),
        'admin': false,
        'createdat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'updatedat':  moment(currentDate).format('YYYY-MM-DD hh:mm:ss')
      },
      {
        'id': 4,
        'name': faker.internet.userName(),
        'email': faker.internet.email(),
        'password': bcrypt.hashSync('123456', 10),
        'admin': false,
        'createdat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'updatedat':  moment(currentDate).format('YYYY-MM-DD hh:mm:ss')
      },
      {
        'id': 5,
        'name': faker.internet.userName(),
        'email': 'admin@admin.com',
        'password': bcrypt.hashSync('admin', 10),
        'admin': true,
        'createdat': moment(currentDate).format('YYYY-MM-DD hh:mm:ss'),
        'updatedat':  moment(currentDate).format('YYYY-MM-DD hh:mm:ss')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
