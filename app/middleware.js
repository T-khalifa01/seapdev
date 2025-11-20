// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req) {
//   // Get the token from the request, which NextAuth sets for authenticated users.
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const { pathname } = req.nextUrl;

//   // Protect the dashboard route
//   if (pathname.startsWith('/dashboard')) {
//     // If there's no token, the user is not authenticated. Redirect them to the login page.
//     if (!token) {
//       return NextResponse.redirect(new URL('/login', req.url));
//     }
//   }

//   return NextResponse.next();
// }

// // Define the routes that the middleware should run on.
// // This is more efficient than running it on every single page.
// export const config = {
//   matcher: ['/dashboard/:path*'],
// };

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/audits/:path*",
    "/api/lga-list/:path*",
    "/api/investments/:path*",
    "/api/subscription-forms/:path*",
    "/api/contact-forms/:path*",
    "/api/restore/:path*",
  ],
};