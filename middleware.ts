import { NextResponse } from 'next/server';

/**
 * 🖥️ Guard against unauthorized access
 */
export async function middleware(): Promise<NextResponse> {
  console.log('MIDDLEWARE CALLED...');
  return NextResponse.next();
}

/**
 * Only run middleware on protected routes
 */
export const config = {
  matcher: ['/:path*'], // String instead of array, // Fallback to original style, but singular
  runtime: 'nodejs', // Force Node.js runtime since we are using firebase-admin
};
