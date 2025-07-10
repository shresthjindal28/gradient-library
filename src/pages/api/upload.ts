import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import Busboy from 'busboy';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

export const config = {
  api: {
    bodyParser: false,
  },
};

type UploadResult = { secure_url: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const user = verifyToken(req);
  if (!user || !user.isAdmin) return res.status(401).json({ message: 'Unauthorized' });

  const bb = Busboy({ headers: req.headers });
  let uploadPromise: Promise<UploadResult>;
  let name = '';

  bb.on('field', (fieldname: string, val: string) => {
    if (fieldname === 'name') name = val;
  });
  bb.on('file', (fieldname: string, file: NodeJS.ReadableStream) => {
    uploadPromise = new Promise<UploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: 'gradients' }, (err: Error | undefined, result: UploadResult | undefined) => {
        if (err || !result) reject(err);
        else resolve(result);
      }).end(file);
    });
  });
  bb.on('finish', async () => {
    try {
      const result = await uploadPromise;
      res.status(200).json({ name, imageUrl: result.secure_url });
    } catch (e) {
      res.status(500).json({ message: 'Upload failed', error: e });
    }
  });
  req.pipe(bb);
}
