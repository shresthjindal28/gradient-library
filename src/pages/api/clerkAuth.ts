import { getAuth } from '@clerk/nextjs/server';
import type { NextApiRequest } from 'next';

export async function requireClerkAuth(req: NextApiRequest): Promise<string> {
  const auth = await getAuth(req);
  if (!auth.userId) throw new Error('Unauthorized');
  return auth.userId;
}
