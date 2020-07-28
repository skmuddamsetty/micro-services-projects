import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'First Ticket',
      price: 20,
    });
  expect(response.status).toEqual(404);
});

it('returns a 401 if the user is not authenticated', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  const response = await request(app).put(`/api/tickets/${id}`).send({
    title: 'First Ticket',
    price: 20,
  });
  expect(response.status).toEqual(401);
});

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'First Ticket', price: 20 })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({ title: 'Second Ticket', price: 20 })
    .expect(401);
});

it('returns a 400 if the user does not provide valid title or price', async () => {
  const userId = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', userId)
    .send({ title: 'First Ticket', price: 20 })
    .expect(201);
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', userId)
    .send({})
    .expect(400);
});

it('updates the ticket provided valid inputs', async () => {
  const userId = global.signin();
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', userId)
    .send({ title: 'First Ticket', price: 20 })
    .expect(201);
  const updatedResponse = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', userId)
    .send({ title: 'Second Ticket', price: 30 })
    .expect(200);
  // const updatedResponse = await request(app)
  //   .get(`/api/tickets/${response.body.id}`)
  //   .send();
  expect(updatedResponse.body.title).toBe('Second Ticket');
  expect(updatedResponse.body.price).toBe(30);
});
