import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-mesh">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="accent" className="mb-6 inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            New: System Design Vault, joining the waitlist
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Hey, I&apos;m {siteConfig.author.name.split(" ")[0]}.
          </h1>
          <p className="mt-3 text-lg text-muted-foreground md:text-xl">
            {siteConfig.author.title}
          </p>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-foreground/80 md:text-lg">
            I write deep, no-fluff guides on{" "}
            <span className="font-semibold text-foreground">System Design</span>,{" "}
            <span className="font-semibold text-foreground">Low-Level Design</span>,{" "}
            <span className="font-semibold text-foreground">DSA patterns</span> and real{" "}
            <span className="font-semibold text-foreground">interview experiences</span>{" "}
            from big-tech loops, the stuff I wish I&apos;d had when I was prepping.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/blog" size="lg">
              Read the blog
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton
              href="/courses/system-design-vault"
              variant="outline"
              size="lg"
            >
              Join the Vault waitlist
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
