const { User } = require('../models');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

afterAll(async() => await User.sequelize.close());

test('O status da resposta deve ser 200 ', async () => {
    const response = await request.get('/');
    const status = response.status;
    expect(status).toBe(200);
});

test('O primeiro usuário deve ter id 1 ', async () => {
    const response = await request.get('/');
    let data = JSON.parse(response.text);
    expect(data.users[0].id).toBe(1);
});