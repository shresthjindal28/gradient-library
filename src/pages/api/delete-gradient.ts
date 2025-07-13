import type { NextApiRequest, NextApiResponse } from 'next';
import { requireClerkAuth } from './clerkAuth';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).json({ message: 'Method not allowed' });
  try {
    await requireClerkAuth(req);
    const { public_id } = req.body;
    if (!public_id) return res.status(400).json({ message: 'Missing public_id' });
    await cloudinary.uploader.destroy(public_id);
    res.status(200).json({ message: 'Gradient deleted successfully' });
  } catch (e) {
    res.status(500).json({ message: 'Failed to delete gradient', error: e instanceof Error ? e.message : String(e) });
  }
}
