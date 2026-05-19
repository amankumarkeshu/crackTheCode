import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import { Badge } from "@/components/ui/badge";
import { InFeedAd } from "@/components/ad-unit";

export const metadata: Metadata = {
  title: "Learning Resources",
  description:
    "Comprehensive learning materials covering System Design, Low-Level Design, Data Structures & Algorithms, and Interview Experiences.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-16 md:py-20">
      <div className="mx-auto max-w-4xl text-center">
        <Badge variant="secondary">Learning Resources</Badge>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Structured Learning for Technical Interviews
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Choose your learning path below, or browse all resources to find exactly what you need.
        </p>
      </div>

      <div className="mx-auto max-w-4xl mt-8 mb-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Link href="/how-to-use" className="rounded-lg border border-border bg-card p-6 block hover:border-primary/50 transition-colors">
            <h3 className="font-semibold mb-2">📚 How to Use This Platform</h3>
            <p className="text-sm text-muted-foreground mb-4">Start here if you&apos;re new. Learn how to structure your preparation and make the most of available resources.</p>
            <p className="text-xs text-primary font-medium">→ Recommended first step</p>
          </Link>
          <Link href="/how-to-use#learning-paths" className="rounded-lg border border-border bg-card p-6 block hover:border-primary/50 transition-colors">
            <h3 className="font-semibold mb-2">🎯 Learning Paths</h3>
            <p className="text-sm text-muted-foreground mb-4">Follow curated sequences of topics designed to build knowledge progressively from fundamentals to advanced concepts.</p>
            <p className="text-xs text-primary font-medium">→ Structured approach</p>
          </Link>
          <div className="rounded-lg border border-border bg-card p-6">
            <h3 className="font-semibold mb-2">🔍 Topic Browser</h3>
            <p className="text-sm text-muted-foreground mb-4">Browse by category below to focus on specific areas like System Design, LLD, or Algorithm patterns.</p>
            <p className="text-xs text-primary font-medium">→ Browse categories below</p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        <Link
          href="/blog"
          className="rounded-full border border-primary bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/${cat.slug}`}
            className="rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            {cat.title}
          </Link>
        ))}
      </div>

      <div className="mt-12">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Learning materials are being prepared. Check back soon for comprehensive content.
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <>
                <PostCard key={`${post.frontmatter.category}/${post.frontmatter.slug}`} post={post} />
                {/* In-feed ad after every 6th card, high viewability, non-intrusive */}
                {(i + 1) % 6 === 0 && (
                  <div key={`ad-${i}`} className="col-span-full">
                    <InFeedAd slot={process.env.NEXT_PUBLIC_ADSENSE_IN_FEED_SLOT ?? ""} />
                  </div>
                )}
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
