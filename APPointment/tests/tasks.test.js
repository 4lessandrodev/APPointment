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
    const { tasks } = response.body;
    expect(tasks.length).toBe(5);
});

test('O usuário comun só pode listar suas próprias tarefas ', async () => {
    const response = await request.get('/api/tasks/2');
    const status = response.status;
    expect(status).toBe(401);
});

test('Deve exibir apenas a tarefa com o id 1 ', async () => {
    const response = await request.get('/api/tasks/1');
    const { task } = response.body;
    expect(task.id).toBe(1);
});