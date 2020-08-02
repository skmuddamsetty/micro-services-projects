import { Subjects } from './subjects';

// here we are setting tight coupling between this very specific subject name 'Subjects.TicketCreated' and the structure of data
// this coupling is enforced in the TicketCreatedListener class
export interface TicketCreatedEvent {
  // subject that is expected to see in the event that will be emitted by listener class
  subject: Subjects.TicketCreated;
  // data that is expected to see in this event that will be emitted by listener class
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
