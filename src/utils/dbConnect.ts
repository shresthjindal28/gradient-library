/* eslint-disable no-console */
import mongoose from 'mongoose';

// Production MongoDB Atlas configuration
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gradientlib';

// For production, ensure we're using MongoDB Atlas
if (process.env.NODE_ENV === 'production') {
  if (!MONGODB_URI.includes('mongodb+srv://')) {
    throw new Error('MongoDB Atlas connection string required for production');
  }
}

// Ensure the connection string has a database name
if (MONGODB_URI.includes('mongodb+srv://') && !MONGODB_URI.includes('/gradientlib')) {
  MONGODB_URI += '/gradientlib';
}

interface CachedConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

interface GlobalWithMongoose extends Global {
  mongoose?: CachedConnection;
}

const globalWithMongoose = global as GlobalWithMongoose;

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached!.conn) return cached!.conn;
  
  if (!cached!.promise) {
    console.log('Connecting to MongoDB...');
    console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    
    const connectionOptions = {
      bufferCommands: false,
      maxPoolSize: process.env.NODE_ENV === 'production' ? 20 : 10,
      serverSelectionTimeoutMS: process.env.NODE_ENV === 'production' ? 60000 : 30000,
      socketTimeoutMS: process.env.NODE_ENV === 'production' ? 90000 : 45000,
      connectTimeoutMS: process.env.NODE_ENV === 'production' ? 60000 : 30000,
      retryWrites: true,
      retryReads: true,
      // Force IPv4 to avoid IPv6 issues
      family: 4,
      // Additional options for better reliability
      heartbeatFrequencyMS: process.env.NODE_ENV === 'production' ? 30000 : 10000,
      maxIdleTimeMS: process.env.NODE_ENV === 'production' ? 60000 : 30000,
    };

    try {
      cached!.promise = mongoose.connect(MONGODB_URI, connectionOptions)
        .then((mongoose) => {
          console.log('MongoDB connected successfully');
          
          // Handle connection events
          mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
          });
          
          mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
          });
          
          mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected');
          });
          
          return mongoose;
        });

      // Wait for this connection attempt
      cached!.conn = await cached!.promise;
      return cached!.conn;
      
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      
      // Reset for next attempt
      cached!.promise = null;
      throw error;
    }
  }
  
  try {
    cached!.conn = await cached!.promise;
    return cached!.conn;
  } catch (error) {
    // Reset the promise on error so we can retry
    cached!.promise = null;
    throw error;
  }
}

export default dbConnect;
