"use client";

import { useEffect, useState } from "react";
import { BookCheck, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  category: string;
  slug: string;
}

export function MarkAsRead({ category, slug }: Props) {
  const key = `read:${category}/${slug}`;
  const [read, setRead] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setRead(localStorage.getItem(key) === "1");
    setMounted(true);
  }, [key]);

  function toggle() {
    const next = !read;
    setRead(next);
    localStorage.setItem(key, next ? "1" : "0");
  }

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
        read
          ? "border-green-400 bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400"
          : "border-border bg-background text-muted-foreground hover:border-green-400 hover:text-green-600"
      )}
    >
      {read ? (
        <>
          <BookCheck className="h-4 w-4" />
          Read
        </>
      ) : (
        <>
          <BookOpen className="h-4 w-4" />
          Mark as read
        </>
      )}
    </button>
  );
}
