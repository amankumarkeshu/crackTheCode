# CrackTheCode Architecture Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Architecture](#core-architecture)
5. [Content Management System](#content-management-system)
6. [Authentication & Authorization](#authentication--authorization)
7. [Key Components](#key-components)
8. [Data Flow](#data-flow)
9. [Making Changes](#making-changes)
10. [Deployment](#deployment)
11. [Best Practices](#best-practices)

## Project Overview

**CrackTheCode** (also known as CrackTheLoop) is a Next.js-based blog and educational platform focused on helping engineers crack big-tech interviews. It covers System Design, Low-Level Design (LLD), Data Structures & Algorithms (DSA), interview experiences, and foundational concepts.

### Key Features
- **Content Categories**: System Design, LLD, DSA, Interview Experiences, Concepts
- **MDX-powered Blog**: Rich markdown content with React components
- **Authentication Gate**: Protected content requiring login
- **Interactive Elements**: Comments, quizzes, leaderboards
- **Premium Content**: Future paid content system (System Design Vault)

## Technology Stack

### Frontend & Framework
- **Next.js 14** (App Router) - React framework with file-based routing
- **React 18** - Component library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Content & Data
- **MDX (next-mdx-remote)** - Markdown with JSX components
- **Gray Matter** - Frontmatter parsing
- **Zod** - Schema validation
- **Upstash Redis** - Caching and data storage

### Authentication & Payments
- **NextAuth.js** - Authentication system
- **Razorpay** - Payment processing (for future premium features)

### Development & Build
- **ESLint** - Code linting
- **PostCSS & Autoprefixer** - CSS processing
- **Feed** - RSS feed generation

## Project Structure

```
crackTheCode/
├── app/                           # Next.js App Router
│   ├── (marketing)/              # Route groups (implicit)
│   │   ├── page.tsx              # Landing page (/)
│   │   └── layout.tsx            # Shared layout
│   ├── about/page.tsx            # About page
│   ├── blog/                     # Blog routes
│   │   ├── page.tsx              # All posts index (/blog)
│   │   ├── [category]/           # Dynamic category routes
│   │   │   ├── page.tsx          # Category hub (/blog/system-design)
│   │   │   └── [slug]/page.tsx   # Individual post (/blog/system-design/url-shortener)
│   ├── interview-questions/      # Interview questions explorer
│   ├── leaderboard/             # User rankings
│   ├── mentorship/              # Mentorship services
│   ├── courses/                 # Course pages
│   ├── login/                   # Authentication pages
│   ├── api/                     # API routes
│   ├── rss.xml/route.ts         # RSS feed generation
│   ├── sitemap.ts               # SEO sitemap
│   ├── robots.ts                # SEO robots.txt
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Global styles
│   └── not-found.tsx           # 404 page
├── components/                   # Reusable components
│   ├── marketing/               # Landing page components
│   │   └── flagship-card.tsx   # Feature cards
│   ├── mdx/                    # MDX-specific components
│   ├── ui/                     # Shared UI components
│   ├── site-header.tsx         # Navigation header
│   ├── site-footer.tsx         # Footer
│   └── theme-toggle.tsx        # Dark/light mode
├── lib/                        # Utility libraries
│   ├── site.ts                 # Site configuration & metadata
│   ├── categories.ts           # Content categories definition
│   ├── content.ts              # MDX content loader & validation
│   ├── auth.ts                 # Authentication configuration
│   ├── access.ts               # Access control rules
│   └── utils.ts                # Shared utilities
├── content/                    # MDX blog posts
│   ├── system-design/          # System design articles
│   ├── lld/                    # Low-level design articles
│   ├── dsa/                    # Algorithm articles
│   ├── interview-experiences/  # Interview stories
│   └── concepts/               # Foundational concepts
├── data/                       # Static data
│   ├── comments.json           # Comment storage
│   └── quizzes.ts             # Quiz questions
├── public/                     # Static assets
│   └── diagrams/              # Architecture diagrams
├── types/                      # TypeScript definitions
└── middleware.ts              # Route protection middleware
```

## Core Architecture

### 1. Next.js App Router Architecture
The application uses Next.js 14's App Router for file-based routing:

- **Route Groups**: `(marketing)` for grouping related routes
- **Dynamic Routes**: `[category]` and `[slug]` for content pages
- **Parallel Routes**: Future support for modals and layouts
- **Server Components**: Default rendering for performance

### 2. Content-First Architecture
The system is built around content consumption:

```
Content Flow: MDX Files → Zod Validation → Static Generation → User Access
```

### 3. Authentication Layer
Protection system for premium content:

```
Request → Middleware → Auth Check → Content Access → Response
```

## Content Management System

### MDX Processing Pipeline

1. **File Discovery**: `lib/content.ts` scans `content/` directory
2. **Frontmatter Parsing**: Gray Matter extracts metadata
3. **Schema Validation**: Zod ensures data consistency
4. **Content Caching**: In-memory cache for performance
5. **Static Generation**: Next.js pre-renders at build time

### Frontmatter Schema

Every MDX file requires this frontmatter structure:

```yaml
---
title: "Article Title"
slug: "article-slug"                    # Must match filename
category: "system-design"               # One of 5 categories
tags: ["caching", "scaling"]
difficulty: "senior"                    # junior|mid|senior|staff|principal  
readingTime: 12                        # Minutes
publishedAt: "2026-05-10"             # ISO date
excerpt: "Brief summary for cards"
draft: false                           # Hide if true
isPremium: false                       # Future paid content flag
# Optional for interview-experiences:
company: "Google"
level: "L5"
year: 2026
outcome: "Offer"
location: "Remote"
---
```

### Content Categories System

Defined in `lib/categories.ts`:

```typescript
export type CategorySlug = 
  | "system-design"    # Architecture & scaling
  | "lld"             # Object-oriented design
  | "dsa"             # Algorithms & patterns  
  | "interview-experiences"  # First-person stories
  | "concepts"        # Foundational knowledge
```

Each category has:
- **Slug**: URL identifier
- **Title & Description**: Display metadata
- **Icon**: Lucide React icon
- **Accent Color**: Visual theming

## Authentication & Authorization

### Current System (NextAuth.js)
- **Google OAuth**: Single sign-on provider
- **Session Management**: JWT tokens with Next.js middleware
- **Route Protection**: Middleware intercepts protected routes

### Access Control Rules (`lib/access.ts`)
```typescript
const PROTECTED_CATEGORIES = ["system-design", "lld", "dsa"];
```

- **Public Access**: Landing, category hubs, interview experiences
- **Login Required**: Individual articles in protected categories
- **Future Premium**: `isPremium` flag for paid content

### Middleware Protection (`middleware.ts`)
```typescript
// Protects routes matching: /blog/(system-design|lld|dsa)/[slug]
export const config = {
  matcher: ["/blog/(system-design|lld|dsa)/:slug*"]
};
```

## Key Components

### Content Components

#### `app/blog/[category]/[slug]/page.tsx`
- **Purpose**: Renders individual MDX articles
- **Features**: 
  - Server-side content fetching
  - MDX processing with custom components
  - SEO metadata generation
  - Authentication check integration

#### `lib/content.ts` - Content Engine
- **getAllPosts()**: Loads and caches all content
- **getPostsByCategory()**: Filters by category
- **getPostBySlug()**: Retrieves specific article
- **Caching**: In-memory cache prevents repeated file reads

### UI Components

#### `components/site-header.tsx`
- **Navigation**: Category-based menu structure
- **Authentication**: Login/logout state
- **Responsive**: Mobile-first design

#### `components/marketing/flagship-card.tsx`
- **Purpose**: Showcases key content categories
- **Design**: Card-based layout with gradients
- **Interaction**: Hover states and animations

## Data Flow

### Content Publishing Flow
```
1. Create MDX file in content/[category]/
2. Add required frontmatter metadata  
3. Write content with optional JSX components
4. Build process validates and caches content
5. Static pages generated for all articles
6. Client requests routed through authentication
7. Authorized users access rendered content
```

### Authentication Flow
```
1. User visits protected route (/blog/system-design/article)
2. Middleware checks authentication status
3. If unauthenticated: redirect to /login?callbackUrl=...
4. User completes Google OAuth flow
5. Redirect back to original article
6. Content rendered and delivered
```

### Build-Time Processing
```
1. Next.js build starts
2. getAllPosts() scans content directory
3. Frontmatter validation with Zod
4. Static page generation for all routes
5. Sitemap and RSS feed creation
6. Asset optimization and bundling
```

## Making Changes

### Adding New Content

#### 1. Create New Article
```bash
# Create new file
touch content/system-design/new-article.mdx
```

#### 2. Add Frontmatter
```yaml
---
title: "Building a URL Shortener"
slug: "url-shortener"
category: "system-design"
tags: ["caching", "databases", "scaling"]
difficulty: "senior"
readingTime: 15
publishedAt: "2026-05-14"
excerpt: "Learn how to design a URL shortener like bit.ly with proper scaling considerations."
---
```

#### 3. Write Content
```markdown
# Introduction

URL shorteners like bit.ly handle billions of requests...

<Callout type="tip" title="Pro Tip">
Always consider read/write ratios in system design.
</Callout>
```

### Modifying Site Configuration

#### Update Site Metadata (`lib/site.ts`)
```typescript
export const siteConfig = {
  name: "Your Site Name",
  url: "https://yoursite.com",
  author: {
    name: "Your Name",
    bio: "Your bio...",
  },
  // ... other config
};
```

#### Add New Category (`lib/categories.ts`)
```typescript
export const categories: Category[] = [
  // ... existing categories
  {
    slug: "new-category",
    title: "New Category", 
    short: "Brief description",
    description: "Detailed description...",
    icon: YourIcon,
    accent: "from-purple-500/20 to-purple-500/0",
  },
];
```

### Adding New Components

#### Create MDX Component (`components/mdx/`)
```typescript
// components/mdx/code-block.tsx
interface CodeBlockProps {
  language: string;
  children: React.ReactNode;
}

export function CodeBlock({ language, children }: CodeBlockProps) {
  return (
    <pre className={`language-${language}`}>
      <code>{children}</code>
    </pre>
  );
}
```

#### Register in MDX Provider
```typescript
// Update MDX components mapping
const mdxComponents = {
  Callout,
  CodeBlock, // Add your new component
};
```

### Styling Changes

#### Tailwind Configuration (`tailwind.config.ts`)
```typescript
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Add custom colors
        brand: {
          50: '#f0f9ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

#### Global Styles (`app/globals.css`)
```css
/* Add custom styles */
.prose {
  /* Custom typography styles */
}

.dark {
  /* Dark mode overrides */
}
```

### Authentication Changes

#### Modify Protected Routes (`lib/access.ts`)
```typescript
// Add/remove categories from protection
const PROTECTED_CATEGORIES = ["system-design", "lld", "dsa", "new-premium-category"];
```

#### Update Middleware (`middleware.ts`)
```typescript
export const config = {
  matcher: [
    "/blog/(system-design|lld|dsa|new-category)/:slug*",
    "/premium/:path*" // Add new protected paths
  ]
};
```

### API Routes

#### Create New API Route (`app/api/example/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Handle GET requests
  return NextResponse.json({ data: 'example' });
}

export async function POST(request: NextRequest) {
  // Handle POST requests
  const body = await request.json();
  return NextResponse.json({ success: true });
}
```

## Deployment

### Environment Setup

#### Required Environment Variables
```bash
# .env.local
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Redis (optional)
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Razorpay (future)
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

### Build Process

#### Local Development
```bash
npm run dev         # Development server
npm run build       # Production build
npm run start       # Production server
npm run lint        # Code linting
npm run typecheck   # Type checking
```

#### Production Deployment

**Netlify (Recommended)**
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Add environment variables
5. Deploy automatically on push

**Vercel**
```bash
npm install -g vercel
vercel --prod
```

**Manual/Self-hosted**
```bash
npm run build
# Copy .next/ folder to server
npm start  # Run production server
```

## Best Practices

### Content Guidelines

#### 1. Frontmatter Consistency
- Always validate frontmatter with Zod schema
- Use consistent date formats (YYYY-MM-DD)
- Keep excerpts under 160 characters for SEO

#### 2. MDX Best Practices
```markdown
# Use semantic heading hierarchy
## Always start with h2 after title

# Include calls-to-action
<Callout type="tip">
Actionable advice for readers
</Callout>

# Optimize images
![Alt text](image-url "Caption")
```

#### 3. Performance Considerations
- Use `draft: true` for unpublished content
- Optimize images before adding to `public/`
- Keep reading time estimates accurate

### Code Organization

#### 1. Component Structure
```
components/
├── ui/           # Reusable UI primitives  
├── marketing/    # Landing page specific
├── mdx/         # Content-specific components
└── [feature]/   # Feature-specific components
```

#### 2. Type Safety
```typescript
// Always export types for reuse
export interface PostCardProps {
  post: Post;
  showCategory?: boolean;
}

// Use Zod for runtime validation
const ConfigSchema = z.object({
  apiKey: z.string(),
  timeout: z.number(),
});
```

#### 3. Error Handling
```typescript
// Graceful degradation
export function getPostBySlug(category: CategorySlug, slug: string): Post | undefined {
  try {
    return getAllPosts().find(/* ... */);
  } catch (error) {
    console.error(`Error loading post ${category}/${slug}:`, error);
    return undefined;
  }
}
```

### SEO & Performance

#### 1. Metadata Management
```typescript
// In page components
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.category, params.slug);
  
  return {
    title: post?.frontmatter.title,
    description: post?.frontmatter.excerpt,
    openGraph: {
      title: post?.frontmatter.title,
      description: post?.frontmatter.excerpt,
    },
  };
}
```

#### 2. Static Generation
```typescript
// Generate static paths for dynamic routes
export async function generateStaticParams() {
  const posts = getAllPosts();
  
  return posts.map((post) => ({
    category: post.frontmatter.category,
    slug: post.frontmatter.slug,
  }));
}
```

### Security Considerations

#### 1. Content Sanitization
- MDX content is processed server-side
- User-generated content should be sanitized
- Validate all frontmatter with Zod

#### 2. Authentication Security
- Use HTTPS in production
- Rotate NextAuth secrets regularly
- Implement proper CORS policies

#### 3. Environment Variables
- Never commit secrets to version control
- Use different secrets for each environment
- Validate required environment variables at startup

---

This architecture documentation provides a comprehensive guide to understanding and modifying the CrackTheCode platform. For specific implementation questions, refer to the individual component files and their inline documentation.