import { Mail } from "lucide-react";

export function NewsletterCTA() {
  return (
    <section className="container py-16 md:py-20">
      <div className="rounded-3xl border border-border bg-secondary/40 p-8 md:p-12 text-center">
        <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Mail className="h-5 w-5" />
        </div>
        <h2 className="mt-5 text-2xl font-bold tracking-tight md:text-3xl">
          Weekly Learning Updates
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Get the latest learning materials, interview insights, and platform updates delivered weekly.
          Quality content focused on your technical growth.
        </p>

        <form
          className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row"
          action="https://formspree.io/f/your-id"
          method="POST"
        >
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="h-11 w-full rounded-md border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="h-11 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Subscribe
          </button>
        </form>

        <p className="mt-3 text-xs text-muted-foreground">
          Free weekly updates. Unsubscribe anytime. Your email stays private.
        </p>
      </div>
    </section>
  );
}
