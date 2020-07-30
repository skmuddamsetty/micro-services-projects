import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear();
// create a client
// second argument here is clientid and the name is abc
const stan = nats.connect('ticketing', 'abc', { url: 'http://localhost:4222' });

// below function is executed after the client is successfully connected to the nats streaming server
stan.on('connect', async () => {
  console.log('Publisher connected to nats!');
  /********** commenting old logic */
  // const data = JSON.stringify({
  //   id: 'awdawdawd',
  //   title: 'concert',
  //   price: 20,
  // });
  // stan.publish('ticket:created', data, () => {
  //   console.log('Event Published!');
  // });
  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: 'jbskjdba123',
      title: 'concert',
      price: 20,
    });
  } catch (error) {
    console.log(error);
  }
});
