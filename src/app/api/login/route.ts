import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdminAuth } from '@/app/lib/firebase-admin';

/**
 * Persist the login session by verifying token and creating a session cookie.
 *
 * @param request - which should contain a valid 'idToken' for the logged-in user
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const { idToken } = await request.json();

  if (!idToken) return NextResponse.json({ error: 'Missing idToken' }, { status: 400 });

  try {
    await firebaseAdminAuth.verifyIdToken(idToken);
    const resp = NextResponse.json({ success: true });
    resp.cookies.set(process.env.ID_TOKEN_NAME || 'idToken', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return resp;
  } catch (error) {
    console.error('invalid session token', error);
    return NextResponse.json({ error: 'invalid session' }, { status: 401 });
  }
}
