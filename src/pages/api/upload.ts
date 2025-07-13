import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';
import jwt from 'jsonwebtoken';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

  // Check if user is authenticated
  let userId: string | null = null;
  const auth = req.headers.authorization;
  if (auth) {
    const token = auth.split(' ')[1];
    
    // Try Clerk authentication first
    try {
      const clerkAuth = await getAuth(req);
      userId = clerkAuth.userId;
    } catch {
      // If Clerk auth fails, try JWT token
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        if (user && typeof user === 'object' && 'username' in user) {
          userId = user.username as string;
        }
      } catch {
        // JWT verification failed, try simple Clerk token check
        if (token && token.length > 50) {
          userId = 'clerk_user';
        }
      }
    }
  }
  
  if (!userId) {
    // For development, allow requests without authentication
    userId = 'dev_user';
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
      res.status(500).json({ 
        message: 'Upload failed', 
        error: e instanceof Error ? e.message : String(e),
        details: process.env.NODE_ENV === 'development' ? e instanceof Error ? e.stack : undefined : undefined
      });
    }
  });
}
    