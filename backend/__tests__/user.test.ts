import request from 'supertest';
import { app } from '../src/index';
import { User } from '../src/models/user';

describe('Testes da rota de criação de usuários', () => {
  beforeEach(async () => {
    await User.sync({ force: true });
  });

  it('Deve criar um novo usuário', async () => {
    const userData = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201);

    const createdUser = response.body;

    expect(createdUser.id).toBeDefined();
    expect(createdUser.name).toBe(userData.name);
    expect(createdUser.email).toBe(userData.email);
  });

  it('Deve retornar um erro ao criar um usuário sem dados obrigatórios', async () => {
    const userData = {
      name: 'John Doe',
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(500);

    const errorResponse = response.body;

    expect(errorResponse.error).toBe('Erro ao criar usuário');
  });
});
