// subject is the name of the channel inside world of nats
// this enum is going to list out all valid subject names we are going to receive
export enum Subjects {
  TicketCreated = 'ticket:created',
  OrderUpdated = 'order:updated',
  TicketUpdated = 'ticket:updated',
}

// example of using enum
// const printSubject = (subject: Subjects) => {};

// printSubject(Subjects.TicketCreated);
