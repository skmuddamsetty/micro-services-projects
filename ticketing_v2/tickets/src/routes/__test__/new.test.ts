import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { natsWrapper } from '../../nats-wrapper';

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  const response = await request(app).post('/api/tickets').send({});
  expect(response.status).toBe(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({});
  expect(response.status).not.toBe(401);
});

it('returns an error if an invalid title is provided', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: '', price: 400 });
  expect(response.status).toBe(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ price: 400 })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'First Ticket', price: -10 });
  expect(response.status).toBe(400);

  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'First Ticket' })
    .expect(400);
});

it('creates a ticket with valid parameters', async () => {
  // add in a check to make sure a ticket was saved
  let tickets = await Ticket.find({});
  expect(tickets.length).toBe(0);
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'First Ticket', price: 20 })
    .expect(201);
  tickets = await Ticket.find({});
  expect(tickets.length).toBe(1);
  expect(tickets[0].price).toBe(20);
});

it('publishes an event', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'First Ticket', price: 20 })
    .expect(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
