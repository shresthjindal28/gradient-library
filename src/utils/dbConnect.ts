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

// Function to create alternative connection strings for MongoDB Atlas
function createAlternativeConnectionStrings(originalUri: string): string[] {
  const alternatives: string[] = [];
  
  if (originalUri.includes('mongodb+srv://')) {
    // Try converting to standard MongoDB connection
    const standardUri = originalUri.replace('mongodb+srv://', 'mongodb://');
    alternatives.push(standardUri);
    
    // Try with different DNS servers
    const withDNS = originalUri + '&dnsServer=8.8.8.8';
    alternatives.push(withDNS);
    
    const withDNS2 = originalUri + '&dnsServer=1.1.1.1';
    alternatives.push(withDNS2);
  }
  
  return alternatives;
}

type MongoError = Error & { code?: string; syscall?: string };

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
      // DNS resolution options
      family: 4, // Force IPv4 to avoid IPv6 issues
      // Additional options for better reliability
      heartbeatFrequencyMS: process.env.NODE_ENV === 'production' ? 30000 : 10000,
      maxIdleTimeMS: process.env.NODE_ENV === 'production' ? 60000 : 30000,
      // Production-specific options
      ...(process.env.NODE_ENV === 'production' && {
        ssl: true,
        sslValidate: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    };

    // Try multiple connection strategies
    const connectionStrategies = [
      { uri: MONGODB_URI, description: 'Original connection string' },
      ...createAlternativeConnectionStrings(MONGODB_URI).map((uri, index) => ({
        uri,
        description: `Alternative ${index + 1}`
      }))
    ];

    let lastError: Error | null = null;

    for (const strategy of connectionStrategies) {
      try {
        console.log(`Trying ${strategy.description}...`);
        
        cached!.promise = mongoose.connect(strategy.uri, connectionOptions)
          .then((mongoose) => {
            console.log(`MongoDB connected successfully using ${strategy.description}`);
            
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
        lastError = error as Error;
        console.error(`Failed with ${strategy.description}:`, error);
        
        // Reset for next attempt
        cached!.promise = null;
        
        // If it's a DNS resolution error, provide helpful suggestions
        if (
          error instanceof Error &&
          (((error as MongoError).code === 'ETIMEOUT') || ((error as MongoError).syscall === 'querySrv'))
        ) {
          console.error('DNS resolution failed. This could be due to:');
          console.error('1. Network connectivity issues');
          console.error('2. Firewall blocking MongoDB Atlas');
          console.error('3. Incorrect connection string');
          console.error('4. MongoDB Atlas cluster being down');
          console.error('5. DNS server issues');
          console.error('Please check your network connection and MongoDB Atlas status.');
        }
        
        // Continue to next strategy
        continue;
      }
    }

    // If all strategies failed, throw the last error
    if (lastError) {
      console.error('All connection strategies failed');
      throw lastError;
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
