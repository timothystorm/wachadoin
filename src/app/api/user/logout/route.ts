import { NextResponse } from 'next/server';

/**
 * Remove the login session by invalidating the session cookie
 */
export async function POST(): Promise<NextResponse> {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(process.env.ID_TOKEN_NAME || 'idToken');
  return response;
}
