const { User } = require('../models');
const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

afterAll(async () => await User.sequelize.close());

test('Deve acessar uma rota autenticada', async () => {
    const response = await request.get('/api/tasks');
    const status = response.status;
    expect(status).toBe(200);
});

test('Deve listar apenas as tarefas do usuário 1 ', async () => {
    const response = await request.get('/api/tasks');
    const tasks = JSON.parse(response.text);
    expect(tasks.length).toBe(5);
});