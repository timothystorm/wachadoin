import { NextRequest, NextResponse } from 'next/server';
import { firebaseAdminAuth } from './src/app/lib/firebase-admin';

/**
 * 🖥️ Guard against unauthorized access
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  console.log('Middleware invoked for path:', pathname);

  const protectedPaths = ['/dashboard', '/protected'];

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const tokenName = process.env.ID_TOKEN_NAME || 'idToken';
    const token = request.cookies.get(tokenName)?.value;
    console.log('Token name:', tokenName, 'Token:', token ? 'Present' : 'Missing');

    if (!token) {
      console.log('No token found, redirecting to login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      await firebaseAdminAuth.verifyIdToken(token);
      console.log('Token verified successfully for path:', pathname);
      return NextResponse.next();
    } catch (error) {
      console.error('Invalid token for path:', pathname, 'Error:', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  console.log('Path not protected, proceeding:', pathname);
  return NextResponse.next();
}

/**
 * Only run middleware on protected routes
 */
export const config = {
  // matcher: ['/dashboard', '/dashboard/:path*', '/protected', '/protected/:path*'],
  runtime: 'nodejs', // Force Node.js runtime since we are using firebase-admin
};
