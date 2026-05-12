import type { Metadata } from "next";
import { Check, Star, Sparkles, Lock, Unlock, BadgeCheck, Boxes, Network } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { RazorpayButton } from "@/components/razorpay-button";

export const metadata: Metadata = {
  title: "Vault, LLD + System Design",
  description:
    "20 LLD deep-dives and 90+ System Design questions, lifetime access, one-time payment.",
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
        <div className="container py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="accent" className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Updated for 2026 · Early-access pricing
            </Badge>
            <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight md:text-6xl">
              The CrackTheLoop Vault
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Two vaults. One for LLD. One for System Design. Buy separately or together.
            </p>
            <div className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current text-accent" />
              ))}
              <span className="ml-2">Early-access pricing, first 100 members</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ────────────────────────────────────────────── */}
      <section className="container py-12" id="pricing">
        <div className="grid gap-6 md:grid-cols-3 mx-auto max-w-4xl">
          {/* LLD Vault */}
          <div className="rounded-3xl border-2 border-fuchsia-400/40 bg-card p-8 shadow-md flex flex-col">
            <div className="flex items-center gap-2">
              <Boxes className="h-5 w-5 text-fuchsia-500" />
              <h2 className="font-bold text-lg">LLD Vault</h2>
            </div>
            <div className="mt-3">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold tracking-tight">₹1,499</span>
                <span className="mb-1 text-sm text-muted-foreground line-through">₹3,499</span>
              </div>
              <p className="text-xs text-green-600 font-medium">57% off · Early-access</p>
            </div>
            <ul className="mt-5 space-y-2 flex-1">
              {LLD_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-fuchsia-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <RazorpayButton product="lld" className="w-full justify-center" />
            </div>
          </div>

          {/* HLD Vault */}
          <div className="rounded-3xl border-2 border-indigo-400/40 bg-card p-8 shadow-md flex flex-col">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-indigo-500" />
              <h2 className="font-bold text-lg">System Design Vault</h2>
            </div>
            <div className="mt-3">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold tracking-tight">₹1,499</span>
                <span className="mb-1 text-sm text-muted-foreground line-through">₹3,499</span>
              </div>
              <p className="text-xs text-green-600 font-medium">57% off · Early-access</p>
            </div>
            <ul className="mt-5 space-y-2 flex-1">
              {HLD_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-indigo-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <RazorpayButton product="hld" className="w-full justify-center" />
            </div>
          </div>

          {/* Bundle */}
          <div className="rounded-3xl border-2 border-primary bg-card p-8 shadow-xl flex flex-col relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Best Value</span>
            </div>
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-primary" />
              <h2 className="font-bold text-lg">Full Bundle</h2>
            </div>
            <div className="mt-3">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold tracking-tight">₹1,999</span>
                <span className="mb-1 text-sm text-muted-foreground line-through">₹6,999</span>
              </div>
              <p className="text-xs text-green-600 font-medium">71% off · LLD + HLD together</p>
            </div>
            <ul className="mt-5 space-y-2 flex-1">
              {["Everything in LLD Vault", "Everything in System Design Vault", "Single lifetime purchase", "All future updates free"].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <RazorpayButton product="bundle" className="w-full justify-center" />
            </div>
          </div>
        </div>
      </section>

      {/* ── LLD Free Preview ─────────────────────────────────────────── */}
      <section className="container py-16 md:py-20" id="lld-preview">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="default" className="inline-flex items-center gap-1.5">
            <Unlock className="h-3.5 w-3.5" />
            LLD, Free Preview (5 of 20)
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            Low-Level Design problems
          </h2>
          <p className="mt-3 text-muted-foreground">
            5 problems free to read. 15 more unlock with the LLD Vault.
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

        <div className="mt-6 text-center text-sm text-muted-foreground">
          + {LLD_LOCKED.length - 6} more locked problems in the LLD Vault
        </div>
        <div className="mt-4 flex justify-center">
          <RazorpayButton product="lld" />
        </div>
      </section>

      {/* ── HLD Free Preview ─────────────────────────────────────────── */}
      <section className="container py-16 md:py-20 border-t border-border" id="hld-preview">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="default" className="inline-flex items-center gap-1.5">
            <Unlock className="h-3.5 w-3.5" />
            System Design, Free Preview (3 of 9 domains)
          </Badge>
          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
            System Design questions
          </h2>
          <p className="mt-3 text-muted-foreground">
            3 domains free to explore. 6 more unlock with the System Design Vault.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mx-auto max-w-4xl">
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

        <div className="mt-8 flex justify-center">
          <RazorpayButton product="hld" />
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="container pb-24">
        <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-secondary/40 p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Get both vaults for ₹1,999
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            One-time payment. Lifetime access. LLD + System Design, everything you need to crack Senior and Staff-level loops.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <RazorpayButton product="bundle" size="lg" />
            <LinkButton href="/blog/system-design" variant="outline" size="lg">
              Preview free articles
            </LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
