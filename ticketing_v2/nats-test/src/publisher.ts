import nats from 'node-nats-streaming';
console.clear();
// create a client
// second argument here is clientid and the name is abc
const stan = nats.connect('ticketing', 'abc', { url: 'http://localhost:4222' });

// below function is executed after the client is successfully connected to the nats streaming server
stan.on('connect', () => {
  console.log('Publisher connected to nats!');
  const data = JSON.stringify({
    id: 'awdawdawd',
    title: 'concert',
    price: 20,
  });
  stan.publish('ticket:created', data, () => {
    console.log('Event Published!');
  });
});
