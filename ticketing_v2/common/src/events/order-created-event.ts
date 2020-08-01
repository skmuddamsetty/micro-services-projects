import { Subjects } from './subjects';
import { OrderStatus } from './types/order-status';

// here we are setting tight coupling between this very specific subject name 'Subjects.TicketCreated' and the structure of data
// this coupling is enforced in the TicketCreatedListener class
export interface OrderCreatedEvent {
  // subject that is expected to see in the event that will be emitted by listener class
  subject: Subjects.OrderCreated;
  // data that is expected to see in this event that will be emitted by listener class
  data: {
    id: string;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
