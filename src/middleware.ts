import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get('jwt')?.value;

  if (!jwt && !req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|static).*)'], // Apply middleware to all pages except API routes, Next.js internal files, and static files
};
