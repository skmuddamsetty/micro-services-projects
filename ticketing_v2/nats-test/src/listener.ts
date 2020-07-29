import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();
// create a client
// second argument here is clientid and the name is 123
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});
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
