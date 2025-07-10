import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import Gradient from '../../models/Gradient';
import jwt from 'jsonwebtoken';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === 'GET') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ message: 'Unauthorized' });
    const { id } = req.query;
    const gradient = await Gradient.findById(id);
    if (!gradient) return res.status(404).json({ message: 'Not found' });
    return res.status(200).json({ imageUrl: gradient.imageUrl });
  }
  res.status(405).json({ message: 'Method not allowed' });
}
