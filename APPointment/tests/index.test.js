const { User } = require('../models');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const faker = require('faker');
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

test('Usuário sem token não pode ter acesso as tarefas ', async () => {
    const response = await request.get('/api/tasks');
    const status = response.status;
    expect(status).toBe(401);
});

test('Usuário sem token não pode ter acesso a usuários ', async () => {
    const response = await request.get('/api/usuarios');
    const status = response.status;
    expect(status).toBe(401);
});

test('Deve pedir um email e uma senha para se cadastrar ', async () => {
    const response = await request.post('/api/register');
    const status = response.status;
    expect(status).toBe(422);
});

test('Deve pedir uma senha para se cadastrar ', async () => {
    const response = await request.post('/api/register')
    .send({ email: faker.internet.email() });
    const status = response.status;
    expect(status).toBe(422);
});

test('Deve pedir um email para se cadastrar ', async () => {
    const response = await request.post('/api/register')
    .send({ password: faker.internet.password() });
    
    const status = response.status;
    expect(status).toBe(422);
});

test('Deve cadastrar um novo usuário ', async () => {
    const response = await request.post('/api/register')
        .send({
            email: faker.internet.email(),
            password: faker.internet.password(),
        });
    
    const status = response.status;
    expect(status).toBe(200);
    
});




