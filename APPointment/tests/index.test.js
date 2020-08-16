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

test('O status da resposta deve ser 422 pedir email e senha ', async () => {
    const response = await request.post('/api/login');
    const status = response.status;
    expect(status).toBe(422);
});

test('O status da resposta deve ser 422 pedir senha ', async () => {
    const response = await request.post('/api/login')
        .send({
            email:'admin@admin.com'
        });
    const status = response.status;
    expect(status).toBe(422);
});

test('O status da resposta deve ser 401 senha inválida ', async () => {
    const response = await request.post('/api/login')
        .send({
            email:'admin@admin.com',
            password:'123456'
        });
    const status = response.status;
    expect(status).toBe(401);
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