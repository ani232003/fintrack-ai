import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/account', '/transaction'];

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSign } = await auth();

  const pathname = req.nextUrl.pathname;


  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!userId && isProtected) {
    return redirectToSign();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
