// subject is the name of the channel inside world of nats
export enum Subjects {
  TicketCreated = 'ticket:created',
  OrderUpdated = 'order:updated',
}

// example of using enum
// const printSubject = (subject: Subjects) => {};

// printSubject(Subjects.TicketCreated);
