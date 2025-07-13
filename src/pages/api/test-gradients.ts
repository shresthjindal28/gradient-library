import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect';
import Gradient from '../../models/Gradient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test database connection
    await dbConnect();
    
    if (req.method === 'POST') {
      const { name } = req.body;
      const testName = name || 'Test Gradient';
      const testImageUrl = 'https://via.placeholder.com/300x200/8B5CF6/FFFFFF?text=Test+Gradient';
      
      const gradient = await Gradient.create({ 
        name: testName, 
        imageUrl: testImageUrl, 
        createdBy: 'test_user' 
      });
      
      return res.status(201).json({ 
        message: 'Test gradient created', 
        gradient 
      });
    }
    
    if (req.method === 'GET') {
      const gradients = await Gradient.find();
      
      return res.status(200).json({ 
        message: 'Gradients fetched', 
        count: gradients.length,
        gradients 
      });
    }
    
    res.status(405).json({ message: 'Method not allowed' });
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Test failed', 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
  }
} 