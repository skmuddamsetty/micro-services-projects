import mongoose from 'mongoose';
import { app } from './app';

// connecting to mongodb
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined!');
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDB inside Auth application!');
  } catch (error) {
    console.error(error);
  }
  // server start
  app.listen(3000, () => {
    console.log('Auth Service listening on port 3000!');
  });
};

start();
