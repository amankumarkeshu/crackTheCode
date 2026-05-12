"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

interface Props {
  category: string;
  slug: string;
}

export function PostInteractions({ category, slug }: Props) {
  const [views, setViews] = useState<number | null>(null);

  const base = `/api/posts/${category}/${slug}`;

  useEffect(() => {
    fetch(`${base}/views`, { method: "POST" })
      .then((r) => r.json())
      .then((d) => setViews(d.views))
      .catch(() => {});
  }, [base]);

  return (
    <div className="flex items-center gap-4">
      <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <Eye className="h-4 w-4" />
        {views === null ? "—" : views.toLocaleString()} views
      </span>
    </div>
  );
}
