const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);


test('O status da resposta deve ser 200 ', async () => {
    const response = await request.get('/');
    const status = response.status;
    expect(status).toBe(200);
});

test('O status da resposta deve ser 200 ', async () => {
    const response = await request.get('/');
    let data = () => response.json();
    expect(data.users[0].id).toBe(1);
});