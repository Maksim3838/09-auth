type ProxyRequest = Request & {
  nextUrl: URL;
  cookies: {
    get(name: string): { value: string } | undefined;
  };
};


const PRIVATE_ROUTES = ['/profile', '/notes'];


const AUTH_ROUTES = ['/sign-in', '/sign-up'];

export default function proxy(request: ProxyRequest) {
  const { pathname, origin } = request.nextUrl;

  
  const token = request.cookies.get('token')?.value;

  
  const isPrivateRoute = PRIVATE_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  const isAuthRoute = AUTH_ROUTES.some(route =>
    pathname.startsWith(route)
  );

  
  if (isPrivateRoute && !token) {
    return Response.redirect(new URL('/sign-in', origin));
  }

  
  if (isAuthRoute && token) {
    return Response.redirect(new URL('/profile', origin));
  }

  
  return new Response(null, { status: 200 });
}
