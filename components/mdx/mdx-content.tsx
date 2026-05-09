import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";

import { Callout } from "./callout";

const components = {
  Callout,
};

export function MDXContent({ source }: { source: string }) {
  // Plugin types across the rehype/unified ecosystem don't always line up due to
  // duplicate vfile versions in the dependency tree. Cast to `any` to bypass.
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

  return (
    <article className="prose-content">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins,
          },
        }}
      />
    </article>
  );
}
