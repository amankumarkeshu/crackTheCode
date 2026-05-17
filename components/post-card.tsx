import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { Post } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import { getCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";

// Per-category hover accent colours
const CATEGORY_HOVER: Record<string, { border: string; bg: string; text: string; arrow: string }> = {
  lld: {
    border: "hover:border-pink-400",
    bg: "",
    text: "group-hover:text-primary",
    arrow: "text-primary",
  },
  "system-design": {
    border: "hover:border-indigo-400/60",
    bg: "hover:bg-indigo-50/60 dark:hover:bg-indigo-950/20",
    text: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400",
    arrow: "text-indigo-500",
  },
  dsa: {
    border: "hover:border-emerald-400/60",
    bg: "hover:bg-emerald-50/60 dark:hover:bg-emerald-950/20",
    text: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    arrow: "text-emerald-500",
  },
  "interview-experiences": {
    border: "hover:border-amber-400/60",
    bg: "hover:bg-amber-50/60 dark:hover:bg-amber-950/20",
    text: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    arrow: "text-amber-500",
  },
  concepts: {
    border: "hover:border-sky-400/60",
    bg: "hover:bg-sky-50/60 dark:hover:bg-sky-950/20",
    text: "group-hover:text-sky-600 dark:group-hover:text-sky-400",
    arrow: "text-sky-500",
  },
};

const DEFAULT_HOVER = {
  border: "hover:border-primary/40",
  bg: "",
  text: "group-hover:text-primary",
  arrow: "text-primary",
};

export function PostCard({ post }: { post: Post }) {
  const fm = post.frontmatter;
  const category = getCategory(fm.category);
  const href = `/blog/${fm.category}/${fm.slug}`;
  const hover = CATEGORY_HOVER[fm.category] ?? DEFAULT_HOVER;

  return (
    <Link
      href={href}
      className={cn(
        "group block rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg",
        hover.border,
        hover.bg
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        {category && <Badge variant="default">{category.title}</Badge>}
        {["junior", "mid", "senior"].includes(fm.difficulty) && (
          <Badge variant="secondary" className="capitalize">
            {fm.difficulty}
          </Badge>
        )}
        {fm.isPremium && <Badge variant="default">Vault</Badge>}
        {fm.company && <Badge variant="outline">{fm.company}</Badge>}
      </div>

      <h3 className={cn("mt-3 text-lg font-semibold leading-snug transition-colors", hover.text)}>
        {fm.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{fm.excerpt}</p>

      <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
        <span>{formatDate(fm.publishedAt)}</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {fm.readingTime} min read
        </span>
      </div>

      <span className={cn(
        "mt-4 inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100",
        hover.arrow
      )}>
        Read article <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
