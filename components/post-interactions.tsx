"use client";

import { useEffect, useState } from "react";
import { Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  category: string;
  slug: string;
}

export function PostInteractions({ category, slug }: Props) {
  const [views, setViews] = useState<number | null>(null);
  const [reactions, setReactions] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const storageKey = `liked:${category}/${slug}`;
  const base = `/api/posts/${category}/${slug}`;

  useEffect(() => {
    // Track view on mount
    fetch(`${base}/views`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => setViews(d.views))
      .catch(() => {});

    // Get current reaction count
    fetch(`${base}/reactions`)
      .then((r) => r.json())
      .then((d) => setReactions(d.reactions))
      .catch(() => {});

    // Restore liked state from localStorage
    setLiked(localStorage.getItem(storageKey) === "1");
  }, [base, storageKey]);

  async function toggleLike() {
    if (likeLoading) return;
    setLikeLoading(true);
    const newLiked = !liked;
    const action = newLiked ? "like" : "unlike";

    // Optimistic update
    setLiked(newLiked);
    setReactions((r) => (r ?? 0) + (newLiked ? 1 : -1));
    localStorage.setItem(storageKey, newLiked ? "1" : "0");

    try {
      const res = await fetch(`${base}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const d = await res.json();
      setReactions(d.reactions);
    } catch {
      // Revert on failure
      setLiked(!newLiked);
      setReactions((r) => (r ?? 0) + (newLiked ? -1 : 1));
      localStorage.setItem(storageKey, newLiked ? "0" : "1");
    } finally {
      setLikeLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      {/* View count */}
      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <Eye className="h-4 w-4" />
        {views === null ? "—" : views.toLocaleString()} views
      </span>

      {/* Like button */}
      <button
        type="button"
        onClick={toggleLike}
        disabled={likeLoading}
        aria-label={liked ? "Unlike this post" : "Like this post"}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
          liked
            ? "border-red-400 bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400"
            : "border-border bg-background text-muted-foreground hover:border-red-300 hover:text-red-500"
        )}
      >
        <Heart
          className={cn("h-4 w-4 transition-transform", liked && "fill-current scale-110")}
        />
        {reactions === null ? "—" : reactions}
      </button>
    </div>
  );
}
