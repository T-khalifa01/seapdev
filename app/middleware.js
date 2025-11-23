

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