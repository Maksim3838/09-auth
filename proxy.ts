import { NextRequest, NextResponse } from "next/server";
import { checkServerSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let isAuthenticated = false;

  // Якщо accessToken є — перевіряємо сесію
  if (accessToken) {
    const session = await checkServerSession();
    isAuthenticated = session?.status === 200;
  }

  // Якщо accessToken немає, але є refreshToken —
  // checkServerSession() має спробувати оновити сесію
  if (!accessToken && refreshToken) {
    const session = await checkServerSession();
    isAuthenticated = session?.status === 200;
  }

  // Неавторизований → приватна сторінка
  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Авторизований → публічна сторінка
  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/notes/:path*",
    "/sign-in",
    "/sign-up",
  ],
};