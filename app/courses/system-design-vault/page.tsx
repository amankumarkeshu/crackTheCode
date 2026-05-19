import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star, Sparkles, Lock, Unlock, BadgeCheck, Boxes, Network } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { RazorpayButton } from "@/components/razorpay-button";

export const metadata: Metadata = {
  title: "CrackTheLoop Vault - Complete Interview Mastery",
  description:
    "Complete system design and coding interview preparation. 90+ questions, real-world examples, lifetime access.",
};

const LLD_FREE = [
  { title: "Library Management System", desc: "State machine, SOLID, waitlist design." },
  { title: "Elevator System", desc: "LOOK algorithm, dispatcher strategy." },
  { title: "Snake and Ladder", desc: "BoardElement abstraction, OCP in action." },
  { title: "LRU Cache", desc: "HashMap + doubly linked list, thread safety." },
  { title: "Logger Framework", desc: "Chain of responsibility, pluggable appenders." },
];

const LLD_LOCKED = [
  { title: "Chess Game", count: 1 },
  { title: "ATM Machine", count: 1 },
  { title: "Vending Machine", count: 1 },
  { title: "Movie Ticket Booking", count: 1 },
  { title: "Hotel Management", count: 1 },
  { title: "Notification System", count: 1 },
  { title: "Rate Limiter", count: 1 },
  { title: "Task Scheduler", count: 1 },
  { title: "Shopping Cart", count: 1 },
  { title: "Food Delivery App", count: 1 },
  { title: "Cab Booking (Uber)", count: 1 },
  { title: "Social Media Feed", count: 1 },
  { title: "Airline Reservation", count: 1 },
  { title: "Inventory Management", count: 1 },
  { title: "Document Editor", count: 1 },
];

const HLD_FREE = [
  {
    title: "Core Systems",
    desc: "Load balancing, replication, sharding, queues.",
    sample: ["How does consistent hashing work?", "Leader-follower vs leaderless replication trade-offs?"],
  },
  {
    title: "Data Modeling",
    desc: "Picking databases, schema design, indexing.",
    sample: ["Wide-column vs relational for time-series?", "Social graph schema for feed + friend lookups?"],
  },
  {
    title: "Caching",
    desc: "Strategies, invalidation, consistency, multi-tier.",
    sample: ["Write-through vs write-back vs write-around?", "How to prevent cache stampede?"],
  },
];

const HLD_LOCKED = [
  { title: "Transactions & Sagas", count: 10 },
  { title: "Reliability & Retries", count: 11 },
  { title: "Async Jobs & Queues", count: 9 },
  { title: "API Contracts", count: 10 },
  { title: "Observability", count: 8 },
  { title: "Real-World Trade-offs", count: 12 },
];

const LLD_FEATURES = [
  "20 deep-dive object-oriented design problems",
  "Java code with SOLID & design patterns for each",
  "Class diagrams, state machines, entity models",
  "Common follow-ups interviewers actually ask",
  "Lifetime access, updated as new problems added",
];

const HLD_FEATURES = [
  "90+ system design deep-dives across 9 domains",
  "Real capacity numbers, QPS, storage, bandwidth",
  "Staff-Level Spectrum: same question at L4 → L5 → L6",
  "Principal-mode follow-ups after every question",
  "Lifetime access + free future updates",
];

export default function VaultPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden gradient-mesh">
        <div className="container py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="default" className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              founding member pass · closes in 12 days · lifetime access for early supporters · claim yours
            </Badge>
            <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight md:text-6xl">
              complete interview mastery for the AI era.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              AI writes code. You architect systems. Complete system design and coding interview preparation for engineers who want to stay valuable as the job shifts under our feet.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <LinkButton href="#pricing" size="lg" className="text-lg px-8">
                i&apos;m ready to purchase
              </LinkButton>
              <LinkButton href="#preview" variant="outline" size="lg" className="text-lg px-8">
                start free
              </LinkButton>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              free preview lesson on every course. no credit card.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why CrackTheLoop ──────────────────────────────────────────── */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-8">why cracktheloop</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>
              AI can write code. what it can&apos;t do is understand how the whole system fits together -- how services connect, where failures cascade, why one tradeoff matters more than another. that&apos;s systems thinking, and it&apos;s the skill that compounds fastest right now.
            </p>
            <p>
              the engineers who thrive with AI aren&apos;t the ones writing more code. they&apos;re the ones who know what to ask for and can review what comes back with the judgment that only comes from fundamentals.
            </p>
            <p>
              cracktheloop is a comprehensive curriculum for that kind of engineer. every course is first-principles, long-form, and dense on purpose. no bootcamp filler, no summaries of summaries.
            </p>
          </div>
          
          <div className="mt-12">
            <p className="text-sm text-muted-foreground text-center mb-8">trusted by engineers at</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {["Google", "Meta", "Amazon", "Microsoft", "Atlassian", "Salesforce"].map((company) => (
                <span key={company} className="text-lg font-semibold text-muted-foreground">{company}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses ─────────────────────────────────────────────────── */}
      <section className="container py-16 md:py-24" id="courses">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">courses</h2>
            <span className="text-sm text-muted-foreground">2 courses</span>
          </div>
          
          <div className="space-y-6">
            {/* System Design Course */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">live</span>
                    <h3 className="text-xl font-semibold">system design mastery</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    AI writes code. you architect systems. 90+ questions across 9 domains, first principles, no hand-waving.
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>90+ questions</span>
                    <span>9 domains</span>
                    <span>6 hours</span>
                  </div>
                </div>
                <LinkButton href="#pricing" variant="outline" size="sm">start learning</LinkButton>
              </div>
            </div>

            {/* LLD Course */}
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">live</span>
                    <h3 className="text-xl font-semibold">low-level design patterns</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    object-oriented design problems with clean code and class diagrams. 20 problems, SOLID principles, design patterns.
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span>20 problems</span>
                    <span>Java code</span>
                    <span>4 hours</span>
                  </div>
                </div>
                <LinkButton href="#pricing" variant="outline" size="sm">start learning</LinkButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────────── */}
      <section className="container py-16 md:py-24" id="pricing">
        <div className="mx-auto max-w-2xl">
          <div className="rounded-3xl border-2 border-primary bg-card p-12 shadow-xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl mb-4">
              founding member pass
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              be in the room while cracktheloop is built. a one-time pass for the first wave of supporters. lifetime access to every course i ship, plus a few perks only this group ever gets.
            </p>

            <div className="mb-8">
              <div className="flex items-center justify-center gap-3 mb-2">
                <span className="text-5xl font-bold tracking-tight">₹1,999</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">one-time. lifetime access. no subscription.</p>
                <p className="text-sm text-red-500 font-medium">closes may 31, 2026 (12 days left)</p>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="mb-8 p-4 rounded-lg border border-green-200 bg-green-50">
              <div className="text-center">
                <p className="text-sm font-medium text-green-700 mb-2">🎉 EARLY50 - Limited Time Offer</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-bold text-green-700">₹999</span>
                  <span className="text-lg text-muted-foreground line-through">₹1,999</span>
                </div>
                <p className="text-xs text-green-600 mt-1">50% OFF - First 50 members only</p>
              </div>
            </div>

            <div className="mb-8 text-left max-w-sm mx-auto">
              <h4 className="font-semibold mb-4">what you get</h4>
              <ul className="space-y-3 text-sm">
                {[
                  "lifetime access to cracktheloop - every course i ship, forever. no renewals, no upsells.",
                  "direct whatsapp line to aman - stuck on a concept? text me.",
                  "vote on what gets built next - founders pick the next course title.",
                  "1-week early access on every new course - before the public launch, every time."
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-none"></span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <RazorpayButton product="founding-member" size="lg" className="w-full text-lg py-4">
                become a founding member · ₹999
              </RazorpayButton>
              <p className="text-xs text-muted-foreground">
                7-day refund, no questions. email hello@cracktheloop.in
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Free Preview ─────────────────────────────────────────────── */}
      <section className="container py-16 md:py-20" id="preview">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-8">
            sample problems
          </h2>
          <p className="text-muted-foreground">
            try a few problems from each course. no signup required.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-4xl">
          {LLD_FREE.map((t) => (
            <div key={t.title} className="rounded-xl border border-fuchsia-300/40 bg-card p-5 flex items-start gap-3">
              <Unlock className="h-4 w-4 mt-0.5 flex-none text-green-500" />
              <div>
                <p className="font-semibold text-sm">{t.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
              </div>
            </div>
          ))}
          {LLD_LOCKED.slice(0, 6).map((t) => (
            <div key={t.title} className="rounded-xl border border-border bg-card/50 p-5 flex items-start gap-3 opacity-60">
              <Lock className="h-4 w-4 mt-0.5 flex-none text-muted-foreground" />
              <p className="font-semibold text-sm text-muted-foreground">{t.title}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            + {LLD_LOCKED.length - 6} more problems available with full access
          </p>
        </div>

        <div className="container mx-auto max-w-2xl text-center mt-16 pt-16 border-t border-border">
          <h3 className="text-2xl font-bold tracking-tight mb-4">
            system design domains
          </h3>
          <p className="text-muted-foreground mb-8">
            sample questions from 3 of 9 domains. full access unlocks everything.
          </p>
        </div>

        <div className="container mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-4xl">
          {HLD_FREE.map((t) => (
            <div key={t.title} className="rounded-xl border border-indigo-300/40 bg-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{t.title}</h3>
                <Unlock className="h-4 w-4 text-green-500" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
              <ul className="mt-3 space-y-1">
                {t.sample.map((q) => (
                  <li key={q} className="rounded bg-secondary/50 px-3 py-2 text-xs leading-relaxed">
                    &ldquo;{q}&rdquo;
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {HLD_LOCKED.map((t) => (
            <div key={t.title} className="rounded-xl border border-border bg-card/50 p-5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm text-muted-foreground">{t.title}</h3>
                <Lock className="h-4 w-4 text-muted-foreground/40" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground/50">{t.count}0+ questions inside</p>
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[1px] rounded-xl">
                <Lock className="h-5 w-5 text-muted-foreground/30" />
              </div>
            </div>
          ))}
        </div>

        <div className="container mt-12 flex justify-center">
          <LinkButton href="#pricing" size="lg">
            access all domains
          </LinkButton>
        </div>
      </section>

      {/* ── Engineers Who Took It ────────────────────────────────────── */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl mb-12">engineers who took it</h2>
          <p className="text-muted-foreground mb-12">notes from a few learners across backend, systems, and frontend roles.</p>
          
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <blockquote className="text-muted-foreground mb-6">
                &ldquo;I&apos;ve been working as a backend engineer for a while, and most of my system design understanding came from scattered blogs and docs. CrackTheLoop helped bring that into a much clearer structure. The approach worked really well for me.&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold">priya sharma</p>
                <p className="text-sm text-muted-foreground">senior software engineer at zomato</p>
              </div>
            </div>
            
            <div className="rounded-2xl border border-border bg-card p-8">
              <blockquote className="text-muted-foreground mb-6">
                &ldquo;I&apos;m a frontend engineer who&apos;d been faking my way through system design conversations for years. This course is the first thing that actually closed the gap. Now I can sit in design reviews and actually follow what&apos;s happening.&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold">arjun patel</p>
                <p className="text-sm text-muted-foreground">senior frontend engineer at flipkart</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold tracking-tight mb-4">ready to join them?</h3>
            <LinkButton href="#pricing" size="lg" className="text-lg px-8">
              become a founding member
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
