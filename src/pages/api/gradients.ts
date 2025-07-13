import formidable from 'formidable';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { requireClerkAuth } from './clerkAuth';
import { v2 as cloudinary } from 'cloudinary';

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
  try {
    await requireClerkAuth(req);
    if (req.method === 'GET') {
      // List all gradients in the 'gradients' folder on Cloudinary
      const result = await cloudinary.search.expression('folder:gradients').sort_by('created_at','desc').max_results(100).execute();
      const gradients = result.resources.map((img: { public_id: string; secure_url: string; created_at: string }) => ({
        public_id: img.public_id,
        url: img.secure_url,
        created_at: img.created_at
      }));
      return res.status(200).json({ gradients });
    }
    if (req.method === 'POST') {
      const form = formidable({ multiples: false });
      form.parse(req, async (err, fields, files) => {
        if (err) {
          // eslint-disable-next-line no-console
          // console.error('Formidable error:', err);
          return res.status(400).json({ message: 'File parsing error', error: String(err) });
        }
        const name = Array.isArray(fields.name) ? fields.name[0] : fields.name ?? '';
        // Try to find the file field regardless of its key
        let file: formidable.File | null = null;
        if (files.file) {
          const fileInput = files.file;
          file = Array.isArray(fileInput) ? fileInput[0] : fileInput;
        } else {
          // Try to find the first file in files object
          const fileKeys = Object.keys(files);
          if (fileKeys.length > 0) {
            const fileInput = files[fileKeys[0]];
            file = Array.isArray(fileInput) ? fileInput[0] : fileInput;
            if (!file) file = null;
          }
        }
        if (!file || !file.filepath) {
          // eslint-disable-next-line no-console
          // console.error('No file uploaded. fields:', fields, 'files:', files);
          return res.status(400).json({ message: 'No file uploaded', fields, files });
        }
        try {
          const result = await uploadToCloudinary(file.filepath);
          fs.unlink(file.filepath, () => {});
          res.status(200).json({ name, imageUrl: result.secure_url });
        } catch (e) {
          // eslint-disable-next-line no-console
          // console.error('Cloudinary upload error:', e);
          res.status(500).json({ 
            message: 'Upload failed', 
            error: e instanceof Error ? e.message : String(e),
            details: process.env.NODE_ENV === 'development' ? e instanceof Error ? e.stack : undefined : undefined
          });
        }
      });
      return;
    }
    res.status(405).json({ message: 'Method not allowed' });
  } catch (e) {
    res.status(401).json({ message: (e instanceof Error ? e.message : 'Unauthorized') });
  }
}
