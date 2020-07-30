import nats, { Message, Stan } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();
// create a client
// second argument here is clientid and the name is 123
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});
stan.on('connect', () => {
  console.log('Listener connected to nats!');

  // close is going to tell nats to not send this listener any more messages
  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });
  // manualAckMode tells nats to not automaticall aknowledge that the event has been sucessfull
  // it is up to the user to acknowledge the msg to nats after processing the events successfully

  /*****Commenting below code as part of refactor */
  // const options = stan
  //   .subscriptionOptions()
  //   .setManualAckMode(true)
  //   .setDeliverAllAvailable()
  //   .setDurableName('orders-service');
  // const subscription = stan.subscribe(
  //   'ticket:created',
  //   // orders-service-queue-group is a queue group which makes sure that the event is sent to only one listener which are attached to this queue group
  //   'orders-service-queue-group',
  //   options
  // );
  // subscription.on('message', (msg: Message) => {
  //   const data = msg.getData();
  //   if (typeof data === 'string') {
  //     console.log(`Received Event # ${msg.getSequence()}, with data ${data}`);
  //   }
  //   // acknowledging the msg
  //   msg.ack();
  // });

  new TicketCreatedListener(stan).listen();
});

// intercepting if a listener has been interrupted by using rs or control + c
// when this happens we are calling the stan.close subscription for a graceful exit
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());

abstract class Listener {
  private client: Stan;
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  protected ackWait = 5 * 1000; // 5 Seconds
  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );
    subscription.on('message', (msg: Message) => {
      console.log(`Message Received: ${this.subject} / ${this.queueGroupName}`);
      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}

class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'payments-service';
  onMessage(data: any, msg: Message) {
    console.log('Event data!', msg.getSequence(), data);
    msg.ack();
  }
}
