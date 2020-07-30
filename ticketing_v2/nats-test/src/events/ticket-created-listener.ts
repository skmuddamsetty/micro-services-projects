import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payments-service';
  // implementing onMessage
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Processed Event data!', msg.getSequence(), data);
    msg.ack();
  }
}
