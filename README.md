# amankumarkeshu.in

Personal site, blog, and (eventually) paid System Design Vault for [CrackTheCode](https://amankumarkeshu.in).

Built with **Next.js 14 (App Router)**, **MDX**, **Tailwind CSS** and TypeScript.

## Quick start

```bash
nvm use 18                 # requires Node ≥ 18.17
npm install
npm run dev                # http://localhost:3000
```

If you're behind a corporate proxy (Nutanix Artifactory etc.) and the platform-specific Next SWC binary fails to install, the project-local `.npmrc` already contains `optional=true` to override `~/.npmrc`. Re-run `npm install` after pulling.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run build` | Production build (statically prerenders all pages) |
| `npm run start` | Run the production build locally |
| `npm run lint` | ESLint via `next lint` |
| `npm run typecheck` | `tsc --noEmit` for type-safety only |

## Project structure

```
amankumarkeshu/
├─ app/                            # Next.js App Router
│  ├─ (marketing) →                # implicit, served from app/page.tsx etc.
│  ├─ page.tsx                     # landing
│  ├─ about/page.tsx
│  ├─ blog/
│  │  ├─ page.tsx                  # all-posts index
│  │  └─ [category]/
│  │     ├─ page.tsx               # category hub (SD / LLD / DSA / IE / Concepts)
│  │     └─ [slug]/page.tsx        # individual post (MDX-rendered)
│  ├─ courses/system-design-vault/page.tsx
│  ├─ mentorship/page.tsx
│  ├─ rss.xml/route.ts
│  ├─ sitemap.ts
│  ├─ robots.ts
│  ├─ not-found.tsx
│  ├─ layout.tsx
│  └─ globals.css
├─ components/
│  ├─ marketing/                   # Hero, FlagshipCard, CompaniesStrip, TopicGrid, NewsletterCTA
│  ├─ mdx/                         # MDXContent, Callout
│  ├─ ui/                          # Button, Badge (shadcn-style)
│  ├─ post-card.tsx
│  ├─ site-header.tsx
│  ├─ site-footer.tsx
│  ├─ theme-provider.tsx
│  └─ theme-toggle.tsx
├─ lib/
│  ├─ site.ts                      # site/author config (edit me!)
│  ├─ categories.ts                # 5 sections + icons + descriptions
│  ├─ content.ts                   # MDX loader + zod frontmatter schema
│  └─ utils.ts                     # cn(), formatDate()
├─ content/                        # ← write your blog posts here
│  ├─ system-design/
│  ├─ lld/
│  ├─ dsa/
│  ├─ interview-experiences/
│  └─ concepts/
├─ tailwind.config.ts
├─ next.config.mjs
├─ tsconfig.json
└─ package.json
```

## Adding a new post

1. Create an `.mdx` file in `content/<category>/<slug>.mdx`.
2. Required frontmatter:

```yaml
---
title: "Your post title"
slug: "your-post-slug"           # must match the filename
category: "system-design"        # one of: system-design | lld | dsa | interview-experiences | concepts
tags: ["caching", "scaling"]
difficulty: "senior"             # junior | mid | senior | staff | principal
readingTime: 12
publishedAt: "2026-05-10"
excerpt: "One-sentence summary used in cards and meta tags."
---
```

3. For an interview-experience post, add `company`, `level`, `year`, `location`, `outcome`.
4. Use the `<Callout type="tip|info|warn|success" title="...">` component anywhere in MDX for styled callouts.

That's it. The post is automatically picked up at build time, listed on the category hub, the all-posts page, and added to `sitemap.xml` and `rss.xml`.

## Customizing for you

Open `lib/site.ts` and edit:

- Author name, title, bio
- Email
- Social links (Twitter, LinkedIn, GitHub, Topmate, YouTube)
- Companies you've worked at / interviewed at (used in the marquee)

## Auth gate (login required for SD / LLD / DSA articles)

Individual article pages under the **System Design**, **LLD**, and **DSA**
categories require a signed-in user. Listing pages (`/blog`,
`/blog/system-design`, `/blog/lld`, `/blog/dsa`) stay public so visitors can
still browse titles and excerpts as a teaser.

- Enforced by `middleware.ts` (uses `next-auth/middleware`).
- Protected slugs are listed in `lib/access.ts` (`PROTECTED_CATEGORIES`).
- Unauthenticated visitors are redirected to `/login?callbackUrl=…` and bounced
  back to the article after Google sign-in.
- Cards in protected categories show a small **"Sign in to read"** pill while
  signed out (see `components/post-lock-badge.tsx`).

To migrate from "logged-in only" → "paid only" later, change the `authorized`
callback in `middleware.ts` (e.g. `({ token }) => token?.isPremium === true`)
and update the badge copy. The route matcher itself does not need to change.

## Roadmap (Phase 2 — not built yet)

- Magic-link auth (NextAuth + Resend)
- Postgres + Drizzle/Prisma schema for users, purchases, entitlements
- Razorpay checkout + webhook
- `/vault` gated content (`isPremium: true` posts visible only to members)
- `/sample` free Vault preview (lead magnet)
- Real newsletter integration (Resend Audiences or Substack embed)

## Deployment

Recommended: **Vercel**. Connect the repo, set the production domain to `amankumarkeshu.in`, done.

## License

All rights reserved © Aman Kumar Keshu.
