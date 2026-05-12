import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/post-card";
import { Badge } from "@/components/ui/badge";
import { InFeedAd } from "@/components/ad-unit";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "All articles across System Design, LLD, DSA, Interview Experiences and core Concepts.",
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="container py-16 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="muted">Blog</Badge>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Long-form, no-fluff articles for senior engineers.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Pick a topic to dive in, or scroll for everything in chronological order.
        </p>
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
            No posts yet. The first batch is coming this week.
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
