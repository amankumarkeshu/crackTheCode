import { withAuth } from "next-auth/middleware";

/**
 * Auth gate for individual blog posts in the protected categories
 * (System Design, LLD, DSA).
 *
 * Listing pages (/blog, /blog/system-design, /blog/lld, /blog/dsa) stay
 * public so visitors can browse titles + excerpts as a teaser. Only the
 * full article body is gated.
 *
 * Phase 2 (paid-only): change the `authorized` callback below to also
 * require a `token.isPremium === true` (or whatever entitlement claim
 * we put on the JWT). The matcher list itself does not need to change.
 */
export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: ({ token }) => Boolean(token),
  },
});

export const config = {
  matcher: [
    "/blog/system-design/:slug+",
    "/blog/lld/:slug+",
    "/blog/dsa/:slug+",
  ],
};
