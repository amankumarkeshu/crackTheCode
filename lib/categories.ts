import { Network, Boxes, Binary, MessagesSquare, Lightbulb } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CategorySlug =
  | "system-design"
  | "lld"
  | "dsa"
  | "interview-experiences"
  | "concepts";

export interface Category {
  slug: CategorySlug;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

export const categories: Category[] = [
  {
    slug: "system-design",
    title: "System Design",
    short: "Design large-scale distributed systems like a staff engineer.",
    description:
      "Deep-dives into how to design Twitter, WhatsApp, Uber, payment systems and more, with real capacity numbers, trade-offs, and what interviewers actually want to hear.",
    icon: Network,
    accent: "from-indigo-500/20 to-indigo-500/0",
  },
  {
    slug: "lld",
    title: "Low-Level Design",
    short: "Object-oriented design problems with clean code & class diagrams.",
    description:
      "Parking Lot, Splitwise, BookMyShow, Rate Limiter and more, modelled with SOLID principles, design patterns, and production-ready code in Java/Python.",
    icon: Boxes,
    accent: "from-fuchsia-500/20 to-fuchsia-500/0",
  },
  {
    slug: "dsa",
    title: "DSA Patterns",
    short: "Pattern-first DSA prep, recognize, template, then solve.",
    description:
      "Forget grinding 500 problems. Learn the 20 patterns that cover 90% of interview questions: sliding window, monotonic stack, binary search on answer, DP on trees, and more.",
    icon: Binary,
    accent: "from-emerald-500/20 to-emerald-500/0",
  },
  {
    slug: "interview-experiences",
    title: "Interview Experiences",
    short: "First-person debriefs from real big-tech loops.",
    description:
      "Round-by-round breakdowns from Google, Meta, Amazon and more, what was asked, what worked, what didn't, and the tactical lessons you can apply tomorrow.",
    icon: MessagesSquare,
    accent: "from-amber-500/20 to-amber-500/0",
  },
  {
    slug: "concepts",
    title: "Concepts",
    short: "Foundational ideas every senior engineer should own.",
    description:
      "Consensus, distributed transactions, event sourcing, observability, networking primitives, short, dense explainers you can revisit before any interview.",
    icon: Lightbulb,
    accent: "from-sky-500/20 to-sky-500/0",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
