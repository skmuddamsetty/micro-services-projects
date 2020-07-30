import { Stan, Message } from 'node-nats-streaming';
import { Subjects } from './subjects';

// this interface describes a very generic kind of event
// we are telling that is something is an event it is going to have subject of type from Subjects and data of any
interface Event {
  subject: Subjects;
  data: any;
}

// we are using abstract class and abstract properties in order to customize the these in sub-classes
// Listener<T extends Event> using this we are telling typescipt that this is a generic class
// T extends event - this means that whenever we try to use listener we are going to have to provide some custom type of type Event
// this is how we are enforcing the coupling between subject and data inside of actual listener i.e. TicketCreatedListener
export abstract class Listener<T extends Event> {
  // need to send in the pre-initialized stan client
  private client: Stan;
  // Name of the channel this listener is going to listen to
  // this is implemented in subclass since this is an abstract property
  // T['subject] comes from the actual implementor of this class For ex: TicketCreatedListener
  abstract subject: T['subject'];
  // this is queueGroupName that this listener has to be attached to
  // this has to be implemented by sub-class
  abstract queueGroupName: string;
  // function to run when the message has been received
  // this is implemented in the subclass
  // T['data] comes from the actual implementor of this class For ex: TicketCreatedListener
  abstract onMessage(data: T['data'], msg: Message): void;
  // protected here is useful if the subclass wants to overwrite this
  protected ackWait = 5 * 1000; // 5 Seconds
  constructor(client: Stan) {
    this.client = client;
  }

  // default subscription options
  subscriptionOptions() {
    return (
      this.client
        .subscriptionOptions()
        // this makes sure that all the messages are delivered for teh first time when a listener comes live
        .setDeliverAllAvailable()
        // manually acknowledging the msg delivery
        .setManualAckMode(true)
        // overriding the default timeout of 30 seconds to 5 seconds
        .setAckWait(this.ackWait)
        // this makes sure that the messages that are already delivered will not be delivered again when a new listener with same queueGroupName comes live
        .setDurableName(this.queueGroupName)
    );
  }

  listen() {
    // stan subscribe method require three arguments i.e subject, queueGroupName, subscriptionOptions
    // therefore we are initializing a variable with these three inputs
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );
    // listening to messages when a message has been received
    subscription.on('message', (msg: Message) => {
      console.log(`Message Received: ${this.subject} / ${this.queueGroupName}`);
      // parsing the message using the parseMessage helper
      const parsedData = this.parseMessage(msg);
      // here the onMessage method inside the sub-class is called
      this.onMessage(parsedData, msg);
    });
  }

  // helper function to parse a message
  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
