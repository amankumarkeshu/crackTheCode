import type { CategorySlug } from "./categories";

/**
 * Categories whose individual post pages require the user to be signed in.
 *
 * Phase 1 (current): logged-in users get full access.
 * Phase 2 (planned): same list will gate behind a paid entitlement instead -
 *   only the `authorized` callback in `middleware.ts` and the badge copy in
 *   `components/post-lock-badge.tsx` need to change.
 */
export const PROTECTED_CATEGORIES: readonly CategorySlug[] = [
  "system-design",
  "lld",
  "dsa",
] as const;

export function isProtectedCategory(slug: string): boolean {
  return (PROTECTED_CATEGORIES as readonly string[]).includes(slug);
}
