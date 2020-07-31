import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';

// connecting to mongodb
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined!');
  }
  try {
    // nats connection
    await natsWrapper.connect('ticketing', 'asdf', 'http://nats-srv:4222');
    // nats graceful shutdown
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB inside Tickets application!');
  } catch (error) {
    console.error(error);
  }
  // server start
  app.listen(3000, () => {
    console.log('Tickets Service listening on port 3000!');
  });
};

start();
