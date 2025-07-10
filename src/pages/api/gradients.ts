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
  if (!auth) return null;
  try {
    const token = auth.split(' ')[1];
    return jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtUser;
  } catch {
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === 'POST') {
    const user = verifyToken(req);
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { name, imageUrl } = req.body;
    if (!name || !imageUrl) {
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
}
