import { verify } from 'jsonwebtoken';
import { NextResponse } from 'next/server'
 
export function middleware(req) {
    const token = req.cookies.get('token');
    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      try {
        verify(token, process.env.TOKEN_SECRET); 
        return NextResponse.next(); 
      } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
}
 
export const config = {
  matcher: ['/login','/signup','/dashboard'],
}