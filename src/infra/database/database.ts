import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? '';
const DB_NAME = process.env.DB_NAME ?? '';

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      dbName: DB_NAME,
    });

    console.log('🚀 MongoDB successfully connected!');
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('🚀 MongoDB successfully disconnected!');
  } catch (error) {
    console.error('❌ Error disconnecting from MongoDB:', error);
  }
};
