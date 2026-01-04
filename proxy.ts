
import { NextRequest, NextResponse } from 'next/server';
import { checkSession } from '@/lib/api/serverApi';

const PRIVATE_ROUTES = ['/profile', '/notes'];
const PUBLIC_ROUTES = ['/sign-in', '/sign-up'];

const matchRoute = (pathname: string, routes: string[]) =>
  routes.some(route => pathname.startsWith(route));

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  const isPrivateRoute = matchRoute(pathname, PRIVATE_ROUTES);
  const isPublicRoute = matchRoute(pathname, PUBLIC_ROUTES);

 
  if (accessToken) {
    if (isPublicRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  
  if (!accessToken && refreshToken) {
    try {
      const session = await checkSession(refreshToken);

      if (session?.accessToken) {
        const response = NextResponse.next();

        response.cookies.set('accessToken', session.accessToken, {
          httpOnly: true,
          path: '/',
        });

        if (session.refreshToken) {
          response.cookies.set('refreshToken', session.refreshToken, {
            httpOnly: true,
            path: '/',
          });
        }
        
        if (isPublicRoute) {
          const url = request.nextUrl.clone();
          url.pathname = '/';
          return NextResponse.redirect(url, {
            headers: response.headers,
          });
        }

        return response;
      }
    } catch (error) {console.error('Refresh session failed', error);
     
    }
  }

 
  if (isPrivateRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  
  return NextResponse.next();
}
