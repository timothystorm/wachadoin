import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/app/lib/firebase/admin';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const idToken = request.cookies.get(process.env.ID_TOKEN_NAME ?? 'idToken')?.value;

  if (!idToken) {
    return NextResponse.json({ message: 'Token invalid' }, { status: 401 });
  } else {
    return await adminAuth
      .verifySessionCookie(idToken, true)
      .then(() => NextResponse.json({ message: 'success' }, { status: 200 }))
      .catch((err) => NextResponse.json({ message: err?.message || err }, { status: 401 }));
  }
}
