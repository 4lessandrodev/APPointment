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


describe('Grupo de teste de times, rota autenticada', () => {
    
    test('Listar todos os membros do time do usuário conectado ', async () => {
        const response = await request.get('/api/teams?limit=10')
         .set('authorization', `Bearer ${TOKEN}`);
        let status = response.status;
        expect(status).toBe(200);
    });
    
});

