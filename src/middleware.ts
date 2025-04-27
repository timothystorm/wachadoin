import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Routes Middleware should NOT run
export const config = {
  matcher: ['/((?!installHook.*|firebase.*|api|_next/static|_next/image|.*\\.png$).*)'],
};

const publicRoutes = ['/', '/login', '/signup'];

/**
 * 🖥️ Guard against unauthorized access
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
  const path = request.nextUrl.pathname;
  if (!publicRoutes.includes(path) /* whitelist security */) {
    console.debug(`Handled Path: ${path}`);

    const idTokenCookie = request.cookies.get(process.env.ID_TOKEN_NAME ?? 'idToken');
    if (!idTokenCookie) {
      return NextResponse.redirect(new URL(`${request.nextUrl.origin}/login`, request.url));
    } else {
      return await axios
        .get(`${request.nextUrl.origin}/api/user/validate`, {
          headers: {
            Cookie: `${idTokenCookie?.name}=${idTokenCookie?.value}`,
          },
        })
        .then(() => NextResponse.next())
        .catch((error) => {
          return NextResponse.redirect(new URL(`${request.nextUrl.origin}/login`, request.url), {
            statusText: error,
          });
        });
    }
  }

  return NextResponse.next();
}
