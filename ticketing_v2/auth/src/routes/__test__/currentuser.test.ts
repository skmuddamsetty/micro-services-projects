import request from 'supertest';
import { app } from '../../app';

it('should respond with details of current user', async () => {
  const cookie = await global.signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  // console.log(response.body);
  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('should respond with null of current user if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);

  // console.log(response.body);
  expect(response.body.currentUser).toEqual(null);
});
