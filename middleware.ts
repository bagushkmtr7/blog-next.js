import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];
    // Membaca kombinasi username:password
    const [user, pwd] = atob(authValue).split(':');

    // 🔑 GANTI USERNAME DAN PASSWORD LU DI SINI:
    if (user === '1' && pwd === '1') {
      return NextResponse.next();
    }
  }

  // Kalau gagal/belum login, munculin popup!
  return new NextResponse('Akses Ditolak! Masukkan Username dan Password.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Dashboard Admin ILHAM.LOG"',
    },
  });
}

// Aturan: Gembok SEMUA halaman yang depannya /admin
export const config = {
  matcher: ['/admin/:path*'],
};
