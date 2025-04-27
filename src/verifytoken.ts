'use server';

import { adminAuth } from '@/app/lib/firebase/admin';

export async function verifyToken(token: string): Promise<boolean> {
  return adminAuth.verifySessionCookie(token, true).then(() => true);
}
