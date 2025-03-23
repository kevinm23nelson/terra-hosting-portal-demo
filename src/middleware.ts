// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // For demo purposes, you can use a simple check or localStorage
  // In a real app, you'd verify session cookies or tokens
  const isLoggedIn = request.cookies.has('demo-auth');
  
  if (!isLoggedIn && !request.nextUrl.pathname.includes('/dashboard/login')) {
    return NextResponse.redirect(new URL('/dashboard/login', request.url));
  }
  
  return NextResponse.next();
}

// Only run middleware on dashboard routes
export const config = {
  matcher: '/dashboard/:path*',
};