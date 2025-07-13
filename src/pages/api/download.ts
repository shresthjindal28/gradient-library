
import type { NextApiRequest, NextApiResponse } from 'next';
import { requireClerkAuth } from './clerkAuth';

// Example: /api/download?url=https://res.cloudinary.com/your_cloud/image/upload/v12345/gradient.png




export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  try {
    await requireClerkAuth(req);
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ message: 'Missing or invalid image url' });
    }
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(404).json({ message: 'Image not found' });
    }
    const contentType = response.headers.get('content-type') || 'image/png';
    const buffer = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', 'attachment; filename="gradient.png"');
    res.send(buffer);
  } catch (e) {
    res.status(401).json({ message: (e instanceof Error ? e.message : 'Unauthorized') });
  }
}
