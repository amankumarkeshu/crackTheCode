"use client";

import { useSession } from "next-auth/react";
import { Lock } from "lucide-react";
import { isProtectedCategory } from "@/lib/access";

/**
 * Tiny "Sign in to read" pill. Renders only when:
 *   - the post belongs to a protected category, AND
 *   - the visitor is not currently signed in.
 *
 * Server-rendered nothing for signed-in users (and during the brief
 * loading state) so the card stays clean for paying / logged-in folks.
 */
export function PostLockBadge({ category }: { category: string }) {
  const { status } = useSession();

  if (!isProtectedCategory(category)) return null;
  if (status !== "unauthenticated") return null;

  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-700 dark:bg-amber-950/40 dark:text-amber-300">
      <Lock className="h-2.5 w-2.5" />
      Sign in to read
    </span>
  );
}
