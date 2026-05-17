import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.author.name}, ${siteConfig.author.title}`,
};

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Badge variant="secondary">About</Badge>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
          Hey, I&apos;m {siteConfig.author.name}.
        </h1>
        <p className="mt-3 text-xl text-muted-foreground">
          {siteConfig.author.title}
        </p>

        <div className="prose-content mt-10">
          <p>
            {siteConfig.author.bio}
          </p>
          <p>
            Over the last several years I&apos;ve designed and operated systems that serve millions
            of users, mentored dozens of engineers through senior and staff-level interview loops,
            and sat on both sides of the interview table at major tech companies.
          </p>

          <h2>What I write about</h2>
          <p>
            This site is a long-form, no-fluff resource on the four topics I get asked about most:
          </p>
          <ul>
            <li>
              <strong>System Design</strong>, End-to-end designs of real products with capacity
              numbers, trade-offs, and follow-up depth.
            </li>
            <li>
              <strong>Low-Level Design (LLD)</strong>, Object-oriented design problems with class
              diagrams, SOLID principles and production-ready code.
            </li>
            <li>
              <strong>DSA Patterns</strong>, Pattern-first prep so you stop grinding 500 problems
              and start recognizing the 20 that matter.
            </li>
            <li>
              <strong>Interview Experiences</strong>, Honest, round-by-round debriefs from real
              loops at Google, Meta, Amazon, Atlassian and more.
            </li>
          </ul>

          <h2>How I can help</h2>
          <p>
            If you&apos;re actively interviewing or planning a level transition, I run 1:1 mock
            interviews and mentorship through Topmate. The flagship{" "}
            <a href="/courses/system-design-vault">System Design Vault</a>, 90+ deep-dive
            questions modeled on what big-tech interviewers actually look for, is in development;
            join the waitlist to be the first in.
          </p>

          <h2>How to reach me</h2>
          <p>
            The fastest way is email at <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>{" "}
            or a DM on{" "}
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            .
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <LinkButton href="/mentorship">Book a 1:1 session</LinkButton>
          <LinkButton href="/blog" variant="outline">
            Read the blog
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
