import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@skmtickets/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { showAllTicketsRouter } from './routes';
import { updateTicketRouter } from './routes/update';

const app = express();

// we are telling express that it should trust the traffic coming through ingress-nginx
// this is required because we have added cookie-session package and said that it should only work in https connections.
app.set('trust proxy', true);

// body parser
app.use(json());

// cookie-session middleware
app.use(
  cookieSession({
    signed: false, // disables encryption
    secure: process.env.NODE_ENV !== 'test',
  })
);

// make sure you run the below statement after cookieSession
app.use(currentUser);

// routes
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(showAllTicketsRouter);
app.use(updateTicketRouter);

// handling unknown routes
// throw syntax is working inside async block because of the package express-async-errors
app.all('*', async () => {
  throw new NotFoundError();
});

// Error Handler
app.use(errorHandler);

export { app };
