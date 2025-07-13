import type { NextApiRequest, NextApiResponse } from 'next';
import { requireClerkAuth } from './clerkAuth';

interface ClerkApiUser {
  id: string;
  email_addresses?: { email_address: string }[];
  first_name?: string;
  last_name?: string;
  created_at?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
  try {
    await requireClerkAuth(req);
    // This requires a Clerk API key in server env
    const apiKey = process.env.CLERK_SECRET_KEY;
    if (!apiKey) return res.status(500).json({ message: 'Missing Clerk API key' });
    const response = await fetch('https://api.clerk.com/v1/users', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) return res.status(500).json({ message: 'Failed to fetch users from Clerk' });
    const users: ClerkApiUser[] = await response.json();
    // Map to minimal user info
    const mapped = users.map((u) => ({
      id: u.id,
      email: u.email_addresses?.[0]?.email_address || '',
      firstName: u.first_name,
      lastName: u.last_name,
      createdAt: u.created_at,
    }));
    res.status(200).json({ users: mapped });
  } catch (err) {
    res.status(401).json({ message: (err instanceof Error ? err.message : 'Unauthorized') });
  }
}
