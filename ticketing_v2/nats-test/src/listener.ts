import nats, { Message } from 'node-nats-streaming';
console.clear();
// create a client
const stan = nats.connect('ticketing', '123', { url: 'http://localhost:4222' });
stan.on('connect', () => {
  console.log('Listener connected to nats!');
  const subscription = stan.subscribe('ticket:created');
  subscription.on('message', (msg: Message) => {
    const data = msg.getData();
    if (typeof data === 'string') {
      console.log(
        `Received Event Number ${msg.getSequence()}, with data ${data}`
      );
    }
  });
});
