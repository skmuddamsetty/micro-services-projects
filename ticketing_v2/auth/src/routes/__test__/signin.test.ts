import request from 'supertest';
import { app } from '../../app';

it('should return a 200 on successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});

it('fails when an email that does not exists get supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
});

it('fails when an incorrect password gets supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'pass' })
    .expect(400);
  expect(response.get('Set-Cookie')).toBeUndefined();
});
