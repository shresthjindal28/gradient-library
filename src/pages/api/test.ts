import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test environment variables
    const envCheck = {
      MONGODB_URI: process.env.MONGODB_URI ? 'Set' : 'Missing',
      JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'Missing',
      NODE_ENV: process.env.NODE_ENV || 'Not set'
    };

    // Test database connection
    let dbStatus = 'Not tested';
    try {
      await dbConnect();
      dbStatus = 'Connected';
    } catch (dbError) {
      dbStatus = `Failed: ${dbError instanceof Error ? dbError.message : String(dbError)}`;
    }

    res.status(200).json({
      message: 'Test endpoint working',
      environment: envCheck,
      database: dbStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      message: 'Test failed',
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
} 