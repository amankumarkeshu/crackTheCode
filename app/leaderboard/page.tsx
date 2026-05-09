import type { Metadata } from "next";
import Image from "next/image";
import { Trophy, BookOpen, Medal } from "lucide-react";
import { getLeaderboard } from "@/lib/post-store";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Leaderboard",
  description: "Top readers on CrackTheLoop — ranked by articles read.",
};

export const revalidate = 60;

const RANK_STYLES = [
  { bg: "bg-amber-50 dark:bg-amber-950/30", border: "border-amber-300 dark:border-amber-700", badge: "bg-amber-400 text-white", icon: "text-amber-500" },
  { bg: "bg-slate-50 dark:bg-slate-800/40", border: "border-slate-300 dark:border-slate-600", badge: "bg-slate-400 text-white", icon: "text-slate-400" },
  { bg: "bg-orange-50 dark:bg-orange-950/20", border: "border-orange-300 dark:border-orange-700", badge: "bg-orange-500 text-white", icon: "text-orange-500" },
];

export default async function LeaderboardPage() {
  const entries = await getLeaderboard(10);

  return (
    <div className="container max-w-2xl py-16">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mb-4 flex justify-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/30">
            <Trophy className="h-7 w-7 text-amber-500" />
          </span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Leaderboard</h1>
        <p className="mt-2 text-muted-foreground">
          Top readers ranked by number of articles read. Keep learning!
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border py-20 text-center">
          <BookOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground/50" />
          <p className="font-medium text-muted-foreground">No readers yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in and start reading to appear here!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, i) => {
            const style = RANK_STYLES[i] ?? {
              bg: "bg-card",
              border: "border-border",
              badge: "bg-muted text-muted-foreground",
              icon: "text-muted-foreground",
            };
            const rank = i + 1;

            return (
              <div
                key={entry.userId}
                className={`flex items-center gap-4 rounded-2xl border ${style.border} ${style.bg} px-5 py-4 transition-shadow hover:shadow-sm`}
              >
                {/* Rank badge */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${style.badge}`}>
                  {rank <= 3 ? (
                    <Medal className="h-4 w-4" />
                  ) : (
                    rank
                  )}
                </div>

                {/* Avatar */}
                {entry.image ? (
                  <Image
                    src={entry.image}
                    alt={entry.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-background"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground">
                    {entry.name.charAt(0).toUpperCase()}
                  </div>
                )}

                {/* Name */}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{entry.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {entry.count === 1 ? "1 article read" : `${entry.count} articles read`}
                  </p>
                </div>

                {/* Score */}
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <BookOpen className={`h-4 w-4 ${style.icon}`} />
                  <span>{entry.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        Updates every minute · Only signed-in readers are counted ·{" "}
        <span className="font-medium">{siteConfig.name}</span>
      </p>
    </div>
  );
}
