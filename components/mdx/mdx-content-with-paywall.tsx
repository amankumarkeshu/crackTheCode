import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

import { Callout } from "./callout";
import { Excalidraw } from "./excalidraw";
import { ContentPaywall } from "../content-paywall";
import { splitContent, shouldShowPaywall, paywallConfig } from "@/lib/content-preview";

const components = {
  Callout,
  Excalidraw,
};

interface MDXContentWithPaywallProps {
  source: string;
  category: string;
  title: string;
  readingTime?: number;
}

export async function MDXContentWithPaywall({ 
  source, 
  category, 
  title, 
  readingTime 
}: MDXContentWithPaywallProps) {
  const session = await getServerSession(authOptions);

  // Plugin configuration (same as original MDXContent)
  const rehypePlugins = [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        properties: { className: ["heading-link"] },
      },
    ],
    [
      rehypePrettyCode,
      {
        theme: "github-dark-dimmed",
        keepBackground: false,
      },
    ],
  ] as unknown as never;

  const mdxOptions = {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins,
    },
  };

  const isAuthenticated = !!session?.user;
  const needsPaywall = shouldShowPaywall(category) && !isAuthenticated;

  if (!needsPaywall) {
    // Show full content for authenticated users or non-protected categories
    return (
      <article className="prose-content">
        <MDXRemote
          source={source}
          components={components}
          options={mdxOptions}
        />
      </article>
    );
  }

  // Show preview + paywall for unauthenticated users on protected content
  const config = paywallConfig[category as keyof typeof paywallConfig] || paywallConfig.default;
  const { previewContent } = splitContent(source, config.previewLength);

  return (
    <>
      <article className="prose-content">
        <MDXRemote
          source={previewContent}
          components={components}
          options={mdxOptions}
        />
      </article>
      
      <div className="mt-8">
        <ContentPaywall
          category={category}
          previewContent=""
          fullContent=""
          title={title}
          readingTime={readingTime}
        />
      </div>
    </>
  );
}