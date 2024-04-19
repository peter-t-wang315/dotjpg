import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const protectedRoutes = ['/api/reviews']

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const isProtected = protectedRoutes.includes(path);

  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if(isProtected && !session?.email) {
    return NextResponse.redirect(new URL('/api/login', req.nextUrl));
  }

  return NextResponse.next();
}