const { User } = require('../models');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

afterAll(async () => await User.sequelize.close());

test('O status da resposta deve ser 200 ', async () => {
    const response = await request.get('/api/');
    const status = response.status;
    expect(status).toBe(200);
});

test('O primeiro usuário deve ter id 1 ', async () => {
    const response = await request.get('/api/');
    let { users } = response.body;
    expect(users[0].id).toBe(1);
});

test('A lista de usuário não pode conter senha ', async () => {
    const response = await request.get('/api/');
    let { users } = response.body;
    expect(users[0].password).toBeUndefined();
});