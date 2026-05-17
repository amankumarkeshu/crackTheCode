import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import {
  getPostBySlug,
  getAllPosts,
  getPostsByCategory,
} from "@/lib/content";
import { getCategory, type CategorySlug } from "@/lib/categories";
import { Badge } from "@/components/ui/badge";
import { MDXContent } from "@/components/mdx/mdx-content";
import { PostCard } from "@/components/post-card";
import { PostInteractions } from "@/components/post-interactions";
import { CommentsSection } from "@/components/comments-section";
import { MarkAsRead } from "@/components/mark-as-read";
import { PostCoverImage } from "@/components/post-cover-image";
import { QuizWidget } from "@/components/quiz-widget";
import { InArticleAd, DisplayAd } from "@/components/ad-unit";
import { formatDate } from "@/lib/utils";
import quizzes from "@/data/quizzes";

interface PageProps {
  params: { category: string; slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({
    category: p.frontmatter.category,
    slug: p.frontmatter.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.category as CategorySlug, params.slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
      type: "article",
      publishedTime: post.frontmatter.publishedAt,
      authors: [post.frontmatter.author],
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.excerpt,
    },
  };
}

// Show difficulty only up to "senior", hide staff / principal labels
const VISIBLE_DIFFICULTIES = ["junior", "mid", "senior"];

export default function PostPage({ params }: PageProps) {
  const post = getPostBySlug(params.category as CategorySlug, params.slug);
  if (!post) notFound();
  const cat = getCategory(post.frontmatter.category)!;

  const related = getPostsByCategory(cat.slug as CategorySlug)
    .filter((p) => p.frontmatter.slug !== post.frontmatter.slug)
    .slice(0, 3);

  const showDifficulty = VISIBLE_DIFFICULTIES.includes(post.frontmatter.difficulty);

  return (
    <article>
      {/* ── Hero banner ──────────────────────────────────────────────── */}
      <PostCoverImage
        category={post.frontmatter.category}
        title={post.frontmatter.title}
        tags={post.frontmatter.tags}
      />

      <div className="border-b border-border/60 bg-secondary/20">
        <div className="container py-10 md:py-12">
          <Link
            href={`/blog/${cat.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {cat.title}
          </Link>

          <div className="mt-6 mx-auto max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{cat.title}</Badge>
              {showDifficulty && (
                <Badge variant="secondary" className="capitalize">
                  {post.frontmatter.difficulty}
                </Badge>
              )}
              {post.frontmatter.tags.slice(0, 3).map((t) => (
                <Badge key={t} variant="outline">
                  {t}
                </Badge>
              ))}
              {post.frontmatter.company && (
                <Badge variant="default">{post.frontmatter.company}</Badge>
              )}
            </div>

            <h1 className="mt-5 text-balance text-4xl font-bold tracking-tight md:text-5xl">
              {post.frontmatter.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">{post.frontmatter.excerpt}</p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span>By {post.frontmatter.author}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.frontmatter.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.frontmatter.readingTime} min read
                </span>
              </div>

              {/* Views + Likes + Mark as read */}
              <div className="flex flex-wrap items-center gap-3">
                <PostInteractions
                  category={params.category}
                  slug={params.slug}
                />
                <MarkAsRead category={params.category} slug={params.slug} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Article body ─────────────────────────────────────────────── */}
      <div className="container py-12 md:py-16">
        {/* In-article ad, highest CPM placement, loads after content starts */}
        <div className="mx-auto max-w-3xl">
          <InArticleAd slot={process.env.NEXT_PUBLIC_ADSENSE_IN_ARTICLE_SLOT ?? ""} />
        </div>

        <MDXContent source={post.content} />

        {/* Bottom interaction strip */}
        <div className="mx-auto mt-10 max-w-3xl flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-secondary/30 px-6 py-4">
          <p className="text-sm text-muted-foreground">Did this help you?</p>
          <div className="flex items-center gap-3">
            <PostInteractions category={params.category} slug={params.slug} />
            <MarkAsRead category={params.category} slug={params.slug} />
          </div>
        </div>

        {/* Display ad, end of article, high viewability */}
        <div className="mx-auto max-w-3xl mt-10">
          <DisplayAd slot={process.env.NEXT_PUBLIC_ADSENSE_DISPLAY_SLOT ?? ""} />
        </div>

        {/* Quiz, only for system-design posts */}
        {params.category === "system-design" && quizzes[params.slug] && (
          <QuizWidget
            slug={params.slug}
            questions={quizzes[params.slug].questions.map((q) => ({
              q: q.q,
              options: q.options,
            }))}
          />
        )}

        {/* Comments */}
        <div className="mx-auto max-w-3xl">
          <CommentsSection category={params.category} slug={params.slug} />
        </div>
      </div>

      {/* ── Related posts ────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="container pb-20">
          <h2 className="mb-6 text-2xl font-bold tracking-tight">More in {cat.title}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.frontmatter.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
