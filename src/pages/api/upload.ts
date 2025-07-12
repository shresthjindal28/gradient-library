import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

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
  if (!auth || !auth.startsWith('Bearer ')) return null;
  try {
    const token = auth.split(' ')[1];
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as JwtUser;
    // Accept any JWT with isAdmin: true (admin login does not have _id/id)
    if (decoded && typeof decoded === 'object' && decoded.isAdmin === true) {
      return { ...decoded, isAdmin: true };
    }
    return null;
  } catch {
    return null;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

async function uploadToCloudinary(filePath: string): Promise<{ secure_url: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { folder: 'gradients' },
      (error, result) => {
        if (error || !result) {
          reject(error);
        } else {
          resolve({ secure_url: result.secure_url });
        }
      }
    );
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const user = verifyToken(req);
  if (!user || !user.isAdmin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const form = formidable({ multiples: false });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ message: 'File parsing error' });
    }
    const name = Array.isArray(fields.name) ? fields.name[0] : fields.name ?? '';
    const fileInput = files.file;
    const file = Array.isArray(fileInput) ? fileInput[0] : fileInput;
    if (!file || !file.filepath) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    try {
      const result = await uploadToCloudinary(file.filepath);
      // Optionally remove temp file
      fs.unlink(file.filepath, () => {});
      res.status(200).json({ name, imageUrl: result.secure_url });
    } catch (e) {
     
      res.status(500).json({ message: 'Upload failed', error: e instanceof Error ? e.message : String(e) });
    }
  });
}
    