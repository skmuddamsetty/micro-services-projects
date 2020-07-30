import { Publisher, TicketCreatedEvent, Subjects } from '@skmtickets/common';
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  // subject is the name of the channel we want to emit this event to
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
