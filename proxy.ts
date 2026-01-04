import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const PRIVATE_ROUTES = ['/profile', '/notes'];
const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];

const matchRoute = (pathname: string, routes: string[]) =>
  routes.some(route => pathname.startsWith(route));

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  const isPrivateRoute = matchRoute(pathname, PRIVATE_ROUTES);
  const isPublicRoute = matchRoute(pathname, PUBLIC_ROUTES);

    if (isPrivateRoute && !accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }
  
     if (isPublicRoute && accessToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/profile';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
