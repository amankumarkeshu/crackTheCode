import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { CategorySlug } from "./categories";

const CONTENT_DIR = path.join(process.cwd(), "content");

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.enum([
    "system-design",
    "lld",
    "dsa",
    "interview-experiences",
    "concepts",
  ]),
  tags: z.array(z.string()).default([]),
  difficulty: z
    .enum(["junior", "mid", "senior", "staff", "principal"])
    .default("senior"),
  readingTime: z.number().int().positive().default(8),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  author: z.string().default("Aman Kumar Keshu"),
  excerpt: z.string().min(1),
  coverImage: z.string().optional(),
  draft: z.boolean().default(false),
  isPremium: z.boolean().default(false),
  // Optional, only meaningful for interview-experiences
  company: z.string().optional(),
  level: z.string().optional(),
  year: z.number().int().optional(),
  outcome: z.string().optional(),
  location: z.string().optional(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

export interface Post {
  frontmatter: Frontmatter;
  content: string;
  filePath: string;
}

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    if (entry.isFile() && entry.name.endsWith(".mdx")) return [full];
    return [];
  });
}

let cache: Post[] | null = null;

export function getAllPosts(): Post[] {
  if (cache) return cache;

  const files = walk(CONTENT_DIR);
  const posts: Post[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(file, "utf8");
    const { data, content } = matter(raw);
    const parsed = FrontmatterSchema.safeParse(data);
    if (!parsed.success) {
      console.warn(`[content] invalid frontmatter in ${file}:`, parsed.error.flatten());
      continue;
    }
    if (parsed.data.draft) continue;
    posts.push({ frontmatter: parsed.data, content, filePath: file });
  }

  posts.sort(
    (a, b) =>
      new Date(b.frontmatter.publishedAt).getTime() -
      new Date(a.frontmatter.publishedAt).getTime()
  );

  cache = posts;
  return posts;
}

export function getPostsByCategory(category: CategorySlug): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.category === category);
}

export function getPostBySlug(category: CategorySlug, slug: string): Post | undefined {
  return getAllPosts().find(
    (p) => p.frontmatter.category === category && p.frontmatter.slug === slug
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.frontmatter.tags) tags.add(tag);
  }
  return Array.from(tags).sort();
}
