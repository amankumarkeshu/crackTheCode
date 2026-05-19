import { Hero } from "@/components/marketing/hero";
import { CompaniesStrip } from "@/components/marketing/companies-strip";
import { FlagshipCard } from "@/components/marketing/flagship-card";
import { TopicGrid } from "@/components/marketing/topic-grid";
import { NewsletterCTA } from "@/components/marketing/newsletter-cta";
import { PostCard } from "@/components/post-card";
import { LinkButton } from "@/components/ui/button";
import { getAllPosts } from "@/lib/content";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 6);

  return (
    <>
      <Hero />
      <CompaniesStrip />
      <FlagshipCard />
      <TopicGrid />

      <section className="container py-16 md:py-24">
          <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Latest Learning Materials
            </h2>
            <p className="mt-2 text-muted-foreground">
              New content across system design, low-level design, algorithms, and interview preparation.
            </p>
          </div>
          <LinkButton href="/blog" variant="outline" size="sm">
            All Resources
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
        </div>

        {latestPosts.length === 0 ? (
          <p className="text-muted-foreground">Learning materials coming soon. Check back for comprehensive content.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={`${post.frontmatter.category}/${post.frontmatter.slug}`} post={post} />
            ))}
          </div>
        )}
      </section>

      <NewsletterCTA />
    </>
  );
}
