import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

// tight coupling here is done with the help of using the TicketCreatedEvent interface in the generic
export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  // here we are first defining the subject to be of type Subjects.TicketCreated and then assigning the value of Subjects.TicketCreated on purpose so that subject is exactly always equal to Subjects.TicketCreated
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';
  // implementing onMessage
  // TicketCreatedEvent['data'] - using this we are enforcing that the data property here must be of type data inside TicketCreatedEvent
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Processed Event data!', msg.getSequence(), data);
    msg.ack();
  }
}
