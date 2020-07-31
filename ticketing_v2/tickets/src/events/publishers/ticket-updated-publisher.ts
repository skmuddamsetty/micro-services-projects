import { Publisher, TicketUpdatedEvent, Subjects } from '@skmtickets/common';
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  // subject is the name of the channel we want to emit this event to
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
