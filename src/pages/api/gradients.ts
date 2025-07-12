import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import Gradient from '../../models/Gradient';
import jwt from 'jsonwebtoken';

interface JwtUser {
  _id?: string;
  id?: string;
  isAdmin: boolean;
}

function verifyToken(req: NextApiRequest): JwtUser | null {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    const token = auth.split(' ')[1];
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtUser;
    if (decoded && typeof decoded === 'object' && decoded.isAdmin === true) {
      return { ...decoded, isAdmin: true };
    }
    return null;
  } catch (e) {
    console.error('JWT verification failed:', e);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  try {
    if (req.method === 'POST') {
      const user = verifyToken(req);
      if (!user || !user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // Handle case where req.body is a string (unparsed)
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          console.error('Could not parse req.body string:', req.body);
          return res.status(400).json({ message: 'Invalid JSON body' });
        }
      }
      console.log('POST /api/gradients parsed body:', body); // Debug log
      if (!body || typeof body !== 'object') {
        console.error('No body or invalid body:', body);
        return res.status(400).json({ message: 'Invalid or missing request body' });
      }
      const { name, imageUrl } = body;
      if (!name || !imageUrl) {
        console.error('Missing name or imageUrl:', body);
        return res.status(400).json({ message: 'Name and imageUrl required' });
      }
      const createdBy = user._id || user.id || null;
      const gradient = await Gradient.create({ name, imageUrl, createdBy });
      return res.status(201).json({ message: 'Gradient added', gradient });
    }
    if (req.method === 'GET') {
      const gradients = await Gradient.find();
      return res.status(200).json({ gradients });
    }
    res.status(405).json({ message: 'Method not allowed' });
  } catch (e) {
    console.error('Gradients API error:', e);
    res.status(500).json({ message: 'Internal server error', error: e instanceof Error ? e.message : String(e) });
  }
}
