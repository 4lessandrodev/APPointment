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

test('Deve acessar uma rota autenticada', async () => {
    const response = await request.get('/api/tasks')
        .set('authorization', `Bearer ${TOKEN}`);
    
    const status = response.status;
    expect(status).toBe(200);
});

test('Deve listar as tarefas de todos os usuários da equipe do admin ', async () => {
    const response = await request.get('/api/tasks')
        .set('authorization', `Bearer ${TOKEN}`);
    
    const { tasks } = response.body;
    expect(tasks.length).toBeGreaterThanOrEqual(4);
});

test('O admin pode visualizar a tarefa de um membro da equipe ', async () => {
    const response = await request.get('/api/tasks/2')
        .set('authorization', `Bearer ${TOKEN}`);
    
    const status = response.status;
    expect(status).toBe(200);
});

test('Deve exibir apenas a tarefa com o id 1 ', async () => {
    const response = await request.get('/api/tasks/1')
    .set('authorization', `Bearer ${TOKEN}`);
    const { task } = response.body;
    expect(task.id).toBe(1);
});