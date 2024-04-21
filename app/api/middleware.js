import { NextResponse } from "next/server";

// Specify protected and public routes
const protectedRoutes = ["/"];
const publicRoutes = ["/login", "/signup"];

export async function applyMiddleware(req) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // Decrypt the session from the cookie
  const cookie = req.headers.cookie;
  const session = await decrypt(cookie);

  // Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect("/login");
  }

  // Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect("/");
  }

  // No redirection needed
  return NextResponse.next();
}
