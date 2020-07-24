import express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';

const app = express();

// body parser
app.use(json());

// routes
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);

// server start
app.listen(3000, () => {
  console.log('Auth Service listening on port 3000!');
});