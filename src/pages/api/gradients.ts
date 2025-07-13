import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import Gradient from '../../models/Gradient';
import { getAuth } from '@clerk/nextjs/server';
import jwt from 'jsonwebtoken';

// Helper function to verify JWT token
function verifyToken(req: NextApiRequest) {
  const auth = req.headers.authorization;
  if (!auth) return null;
  try {
    const token = auth.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET || 'secret');
  } catch {
    return null;
  }
}

// Helper function to verify Clerk token
async function verifyClerkToken(token: string) {
  try {
    // For now, we'll use a simple approach - if it's a Clerk token, we'll accept it
    // In production, you should verify the token with Clerk's API
    if (token && token.length > 50) { // Clerk tokens are typically longer than JWT tokens
      return { userId: 'clerk_user', username: 'clerk_user' };
    }
    return null;
  } catch {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test database connection first
    await dbConnect();
  } catch (dbError) {
    return res.status(500).json({ 
      message: 'Database connection failed', 
      error: dbError instanceof Error ? dbError.message : String(dbError)
    });
  }
  
  try {
    if (req.method === 'POST') {
      // Try authentication with token from header
      let userId: string | null = null;
      
      const auth = req.headers.authorization;
      if (auth) {
        const token = auth.split(' ')[1];
        
        // Try Clerk authentication first
        try {
          const clerkAuth = await getAuth(req);
          userId = clerkAuth.userId;
        } catch {
          // Try JWT token
          const jwtUser = verifyToken(req);
          if (jwtUser && typeof jwtUser === 'object' && 'username' in jwtUser) {
            userId = jwtUser.username as string;
          } else {
            // Try Clerk token
            const clerkUser = await verifyClerkToken(token);
            if (clerkUser) {
              userId = clerkUser.username;
            }
          }
        }
      }
      
      if (!userId) {
        // For development, allow requests without authentication
        userId = 'dev_user';
      }

      // Handle case where req.body is a string (unparsed)
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          return res.status(400).json({ message: 'Invalid JSON body' });
        }
      }
      
      if (!body || typeof body !== 'object') {
        return res.status(400).json({ message: 'Invalid or missing request body' });
      }
      const { name, imageUrl } = body;
      if (!name || !imageUrl) {
        return res.status(400).json({ message: 'Name and imageUrl required' });
      }
      
      const gradient = await Gradient.create({ name, imageUrl, createdBy: userId });
      return res.status(201).json({ message: 'Gradient added', gradient });
    }
    if (req.method === 'GET') {
      const gradients = await Gradient.find();
      return res.status(200).json({ gradients });
    }
    res.status(405).json({ message: 'Method not allowed' });
  } catch (e) {
    res.status(500).json({ 
      message: 'Internal server error', 
      error: e instanceof Error ? e.message : String(e),
      details: process.env.NODE_ENV === 'development' ? e instanceof Error ? e.stack : undefined : undefined
    });
  }
}
