import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/app/lib/firebase/admin';

/**
 * Persist the login session by verifying token and creating a session cookie.
 *
 * @param request - which should contain a valid 'idToken' for the logged-in user
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { idToken } = await request.json();
  if (!idToken) return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });

  // validate and creates a session cookie
  const expiresIn = 60 * 60 * 24 * 1000; // 1 day
  return await adminAuth.createSessionCookie(idToken, { expiresIn }).then(
    (cookie) => {
      const resp = NextResponse.json({ success: true });
      resp.cookies.set(process.env.ID_TOKEN_NAME || 'idToken', cookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: expiresIn,
      });
      return resp;
    },
    (error) => {
      console.error('invalid session', error);
      return NextResponse.json({ error: 'invalid session' }, { status: 401 });
    },
  );
}
