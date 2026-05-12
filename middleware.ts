import { NextResponse } from "next/server";

// Reading is fully public. No category requires sign-in anymore.
// This file is kept (instead of deleted) so future paid-only gating
// can be re-introduced by adding routes to the `matcher` below.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
