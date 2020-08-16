const { User } = require('../models');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

let TOKEN = '';

beforeAll(async () => {
    const response = await request.post('/api/login')
    .send({
        email: 'admin@admin.com',
        password:'admin'
      });
    TOKEN = response.body.token;
});

afterAll(async () => await User.sequelize.close());

test('Listar usuários e o primeiro deve ter id 1 ', async () => {
    const response = await request.get('/api/users')
     .set('authorization', `Bearer ${TOKEN}`);
    let { users } = response.body;
    expect(users[0].id).toBe(1);
});

test('A lista de usuário não pode conter senha ', async () => {
    const response = await request.get('/api/users')
     .set('authorization', `Bearer ${TOKEN}`);
    let { users } = response.body;
    expect(users[0].password).toBeUndefined();
});