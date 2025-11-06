import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('🔍 MIDDLEWARE DEBUG:');
  console.log('📡 Method:', request.method);
  console.log('🌐 URL:', request.url);
  console.log('📍 Pathname:', request.nextUrl.pathname);
  console.log('🏠 Host:', request.headers.get('host'));
  console.log('🔗 Origin:', request.headers.get('origin'));
  console.log('📋 Headers:', Object.fromEntries(request.headers.entries()));
  console.log('---');

  // Log if this is the root path
  if (request.nextUrl.pathname === '/') {
    console.log('🎯 ROOT PATH REQUEST DETECTED!');
  }

  return NextResponse.next();
}

// Match all paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};