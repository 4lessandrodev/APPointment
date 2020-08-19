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
        const response = await request.get('/api/teams')
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

    test('Deve buscar o usuário pelo id ', async() => {
        const response = await request.get('/users/search?id=1')
        .set('authorization', `Bearer ${TOKEN}`);
        let status = response.status;
        expect(status).toBe(200);
    });

    test('Deve buscar o usuário pelo nome ', async() => {
        const response = await request.get('/users/search?name=John')
        .set('authorization', `Bearer ${TOKEN}`);
       let status = response.status;
       expect(status).toBe(200);
    });

    test('Deve buscar o usuário pelo email ', async() => {
        const response = await request.get('/users/search?email=admin@admin')
        .set('authorization', `Bearer ${TOKEN}`);
       let user = response.body;
       expect(user.email).toBe('admin@admin.com');
    });

});

