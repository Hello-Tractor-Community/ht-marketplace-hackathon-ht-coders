import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthPage = pathname === '/auth/signin' || pathname === '/auth/signup';

  if (!req.auth && pathname.startsWith('/admin')) {
    // Redirect unauthenticated users trying to access admin routes to the sign-in page
    return NextResponse.redirect(new URL('/auth/signin', req.nextUrl.origin));
  }

  if (req.auth && isAuthPage) {
    // Redirect authenticated users trying to access sign-in or sign-up pages to the home page
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }
});
