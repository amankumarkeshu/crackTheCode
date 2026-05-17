import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const TOPICS = [
  "Core Systems",
  "Data Modeling",
  "Caching",
  "Transactions",
  "Reliability",
  "Async Jobs",
  "API Contracts",
  "Observability",
  "Real-World Trade-offs",
];

const PROMISES = [
  "9 Core Distributed System Domains → 90+ deep-dives covering everything from Data Modeling to Observability.",
  "The Staff-Level Spectrum → Go beyond \"Boxes and Arrows\" to master Real-World Trade-offs, Decision Making, and Component Analysis.",
  "Senior+ Mental Models → Frameworks I use myself in real big-tech design rounds.",
];

export function FlagshipCard() {
  return (
    <section className="container py-16 md:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">System Design Question Bank</Badge>
              <Badge variant="secondary">Updated for 2026</Badge>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-current text-accent" />
                <span>Coming soon · join waitlist</span>
              </span>
            </div>

            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              The Ultimate System Design Vault: 90+ questions to sharpen your engineering mind.
            </h2>

            <p className="mt-4 max-w-2xl text-muted-foreground">
              A comprehensive curriculum of 90+ foundational questions designed for Senior, Staff,
              and Principal Engineer interviews, with worked answers, trade-offs, and the
              follow-ups interviewers actually ask.
            </p>

            <ul className="mt-6 space-y-3">
              {PROMISES.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-primary" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton href="/courses/system-design-vault" size="lg">
                Join the waitlist
              </LinkButton>
              <LinkButton href="/blog/system-design" variant="outline" size="lg">
                Browse free articles
              </LinkButton>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="rounded-2xl border border-border/80 bg-background/60 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Topics covered
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {TOPICS.map((t) => (
                  <Badge key={t} variant="outline">
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                <div className="rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-base font-bold text-foreground">90+</p>
                  <p>Questions</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-base font-bold text-foreground">9</p>
                  <p>Domains</p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/40 p-3">
                  <p className="text-base font-bold text-foreground">∞</p>
                  <p>Lifetime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
