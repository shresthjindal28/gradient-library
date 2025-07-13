import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import Gradient from '../../models/Gradient';
import jwt from 'jsonwebtoken';
import { getAuth } from '@clerk/nextjs/server';

interface User {
  userId: string;
  username: string;
}

function verifyToken(req: NextApiRequest): User | null {
  const auth = req.headers.authorization;
  if (!auth) return null;
  try {
    const token = auth.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as User;
  } catch {
    return null;
  }
}

// Helper function to verify Clerk token
async function verifyClerkToken(token: string): Promise<User | null> {
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
  await dbConnect();
  if (req.method === 'GET') {
    let user: User | null = null;
    const auth = req.headers.authorization;
    
    if (auth) {
      const token = auth.split(' ')[1];
      
      // Try Clerk authentication first
      try {
        const clerkAuth = await getAuth(req);
        if (clerkAuth.userId) {
          user = { userId: clerkAuth.userId, username: clerkAuth.userId };
        }
      } catch {
        // If Clerk auth fails, try JWT token
        try {
          user = verifyToken(req);
        } catch {
          // JWT verification failed, try simple Clerk token check
          user = await verifyClerkToken(token);
        }
      }
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const { id } = req.query;
    const gradient = await Gradient.findById(id);
    if (!gradient) {
      return res.status(404).json({ message: 'Gradient not found' });
    }
    
    try {
      // Fetch the actual image data
      const imageResponse = await fetch(gradient.imageUrl);
      if (!imageResponse.ok) {
        return res.status(404).json({ message: 'Image not found' });
      }
      
      const imageBuffer = await imageResponse.arrayBuffer();
      const contentType = imageResponse.headers.get('content-type') || 'image/png';
      
      // Set headers for download
      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${gradient.name.replace(/[^a-zA-Z0-9]/g, '_')}.png"`);
      res.setHeader('Content-Length', imageBuffer.byteLength);
      
      // Send the image data
      res.send(Buffer.from(imageBuffer));
      
    } catch {
      return res.status(500).json({ message: 'Failed to fetch image' });
    }
  }
  
  res.status(405).json({ message: 'Method not allowed' });
}
