import { Ticket } from '../ticket';
it('implements optimistic concurrency control', async (done) => {
  // Create an instance of a ticket
  const ticket = Ticket.build({ title: 'concert', price: 4, userId: '123' });
  // save the ticket to the database
  await ticket.save();
  // fecth the ticket two times
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });
  await firstInstance!.save();
  try {
    await secondInstance!.save();
  } catch (error) {
    return done();
  }
  throw new Error('should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  // Create an instance of a ticket
  const ticket = Ticket.build({ title: 'concert', price: 4, userId: '123' });
  // save the ticket to the database
  await ticket.save();
  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
});
