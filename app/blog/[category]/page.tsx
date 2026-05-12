import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { categories, getCategory, type CategorySlug } from "@/lib/categories";
import { getPostsByCategory } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import { Badge } from "@/components/ui/badge";

interface PageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const cat = getCategory(params.category);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.description,
  };
}

export default function CategoryPage({ params }: PageProps) {
  const cat = getCategory(params.category);
  if (!cat) notFound();
  const posts = getPostsByCategory(cat.slug as CategorySlug);
  const Icon = cat.icon;

  return (
    <div className="container py-16 md:py-20">
      <div className="mx-auto max-w-3xl">
        <Badge variant="muted">
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
        </Badge>
        <div className="mt-4 flex items-center gap-3">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{cat.title}</h1>
        </div>
        <p className="mt-4 text-lg text-muted-foreground">{cat.description}</p>

        {cat.slug === "interview-experiences" && (
          <div className="mt-6 rounded-xl border border-amber-400/40 bg-amber-500/5 p-4 text-sm">
            Looking for the question bank instead?{" "}
            <Link
              href="/interview-questions"
              className="font-medium text-amber-700 underline-offset-4 hover:underline dark:text-amber-300"
            >
              Browse 1000+ tagged questions →
            </Link>
          </div>
        )}
      </div>

      <div className="mt-12">
        {posts.length === 0 ? (
          <div className="mx-auto max-w-md text-center text-muted-foreground">
            <p>No posts in this section yet — the first batch is coming this week.</p>
            <Link href="/blog" className="mt-3 inline-block text-primary hover:underline">
              See all posts →
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.frontmatter.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
