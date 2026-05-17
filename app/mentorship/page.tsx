import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { Calendar, MessageSquareCode, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Mentorship & Mock Interviews",
  description:
    "1:1 mock interviews and career mentorship for engineers preparing for Senior, Staff and Principal-level loops at big tech.",
};

const OFFERINGS = [
  {
    icon: MessageSquareCode,
    title: "System Design Mock Interview",
    desc: "60 min. End-to-end mock with detailed feedback against the bar at Google / Meta / Amazon / Atlassian.",
    cta: "Book a mock",
  },
  {
    icon: Trophy,
    title: "Monthly Mock Interview Bundle",
    desc: "4 sessions over 4 weeks, system design + behavioral + tactical follow-ups. Best for active candidates in a loop.",
    cta: "Get the bundle",
  },
  {
    icon: Calendar,
    title: "Career Mentorship",
    desc: "Bi-weekly 1:1s on level transitions, scope, visibility and navigating the path to Senior / Staff / Principal.",
    cta: "Start mentorship",
  },
];

export default function MentorshipPage() {
  return (
    <div className="container py-16 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="secondary">Mentorship</Badge>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          1:1 mock interviews & mentorship.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Strategic prep that has helped engineers land roles at Google, Meta, Amazon, Atlassian,
          Salesforce, Walmart and more.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {OFFERINGS.map((o) => {
          const Icon = o.icon;
          return (
            <div
              key={o.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{o.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{o.desc}</p>
              <LinkButton
                href={siteConfig.social.topmate}
                variant="outline"
                size="sm"
                className="mt-5 self-start"
              >
                {o.cta}
              </LinkButton>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-border bg-secondary/40 p-8 text-center md:p-12">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
          Not sure which one is right?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Send a quick note describing where you are in your prep, and I&apos;ll suggest the right
          starting point, no obligation.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <LinkButton href={`mailto:${siteConfig.email}?subject=Mentorship%20question`}>
            Email me
          </LinkButton>
          <LinkButton href={siteConfig.social.topmate} variant="outline">
            Open my Topmate
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
