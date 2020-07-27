import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';

import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

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

// routes
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// handling unknown routes
// throw syntax is working inside async block because of the package express-async-errors
app.all('*', async () => {
  throw new NotFoundError();
});

// Error Handler
app.use(errorHandler);

export { app };
