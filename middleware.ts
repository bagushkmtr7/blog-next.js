import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // Cek apakah pengunjung punya tiket masuk bernama "admin_session"
  const session = req.cookies.get('admin_session');

  // Kalau mau ke halaman /admin tapi BELUM punya tiket, lempar/usir ke /login
  if (!session && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Kalau udah punya tiket atau halamannya bukan /admin, biarin lewat
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
