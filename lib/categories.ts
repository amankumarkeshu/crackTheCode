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
    short: "Learn to design scalable distributed systems with proper architecture.",
    description:
      "Comprehensive guides on designing systems like Twitter, WhatsApp, Uber, and payment platforms, with capacity planning, trade-offs, and interview-focused solutions.",
    icon: Network,
    accent: "from-indigo-500/20 to-indigo-500/0",
  },
  {
    slug: "lld",
    title: "Low-Level Design",
    short: "Master object-oriented design with practical examples and clean architecture.",
    description:
      "Common design problems like Parking Lot, Splitwise, BookMyShow, and Rate Limiter, solved using SOLID principles, design patterns, and clean code practices.",
    icon: Boxes,
    accent: "from-fuchsia-500/20 to-fuchsia-500/0",
  },
  {
    slug: "dsa",
    title: "DSA Patterns",
    short: "Learn algorithm patterns that solve most interview coding problems.",
    description:
      "Efficient preparation through pattern recognition. Master 20 core patterns including sliding window, monotonic stack, binary search, dynamic programming, and graph algorithms that cover most interview scenarios.",
    icon: Binary,
    accent: "from-emerald-500/20 to-emerald-500/0",
  },
  {
    slug: "interview-experiences",
    title: "Interview Experiences",
    short: "Real interview experiences and lessons from top technology companies.",
    description:
      "Detailed accounts of technical interviews at Google, Meta, Amazon, and other leading companies. Learn from real examples of questions asked, successful strategies, and common pitfalls.",
    icon: MessagesSquare,
    accent: "from-amber-500/20 to-amber-500/0",
  },
  {
    slug: "concepts",
    title: "Concepts",
    short: "Core computer science concepts for advanced engineering roles.",
    description:
      "Essential topics including consensus algorithms, distributed transactions, event sourcing, observability, and networking fundamentals. Concise explanations perfect for interview preparation and knowledge reinforcement.",
    icon: Lightbulb,
    accent: "from-sky-500/20 to-sky-500/0",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
