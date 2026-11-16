import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SESSION_COOKIE } from './lib/session-cookie';

const PUBLIC_PATHS = new Set(['/login', '/cadastro', '/termos', '/privacidade']);

// Checagem otimista: só redireciona quem não tem cookie. A API valida a sessão de verdade.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (PUBLIC_PATHS.has(pathname)) return NextResponse.next();
  if (request.cookies.has(SESSION_COOKIE)) return NextResponse.next();

  const loginUrl = new URL('/login', request.url);
  if (pathname !== '/') loginUrl.searchParams.set('next', pathname + search);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [String.raw`/((?!api|_next/static|_next/image|favicon.ico|.*\..*).*)`],
};
