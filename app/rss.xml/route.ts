import { Feed } from "feed";
import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const feed = new Feed({
    title: siteConfig.name,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: "en",
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} ${siteConfig.name}`,
    feedLinks: { rss2: `${siteConfig.url}/rss.xml` },
    author: { name: siteConfig.author.name, link: siteConfig.url },
  });

  for (const post of getAllPosts()) {
    const url = `${siteConfig.url}/blog/${post.frontmatter.category}/${post.frontmatter.slug}`;
    feed.addItem({
      title: post.frontmatter.title,
      id: url,
      link: url,
      description: post.frontmatter.excerpt,
      author: [{ name: post.frontmatter.author }],
      date: new Date(post.frontmatter.publishedAt),
      category: [{ name: post.frontmatter.category }],
    });
  }

  return new Response(feed.rss2(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
