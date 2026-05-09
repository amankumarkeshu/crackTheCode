import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="container py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
              {siteConfig.shortName}
            </span>
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            {siteConfig.description}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            {siteConfig.email}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Learn</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link className="hover:text-foreground" href="/blog/system-design">
                System Design
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/blog/lld">
                LLD
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/blog/dsa">
                DSA Patterns
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/blog/interview-experiences">
                Interview Stories
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/blog/concepts">
                Concepts
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Work with me</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link className="hover:text-foreground" href="/courses/system-design-vault">
                System Design Vault
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/mentorship">
                1:1 Mentorship
              </Link>
            </li>
            <li>
              <Link className="hover:text-foreground" href="/about">
                About
              </Link>
            </li>
            <li>
              <a
                className="hover:text-foreground"
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground"
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="container py-6 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
          <span>Built with Next.js + MDX.</span>
        </div>
      </div>
    </footer>
  );
}
