import { LinkButton } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden gradient-mesh">
      <div className="container py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="default" className="mb-6 inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            Professional Interview Preparation Platform
          </Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">
            Master Technical Interviews with Structured Learning
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-foreground/80 md:text-lg">
            Learn{" "}
            <span className="font-semibold text-foreground">System Design</span>,{" "}
            <span className="font-semibold text-foreground">Low-Level Design</span>,{" "}
            <span className="font-semibold text-foreground">Algorithm patterns</span>, and{" "}
            <span className="font-semibold text-foreground">interview strategies</span>{" "}
            through structured courses and real-world examples from experienced engineers.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LinkButton href="/how-to-use" size="lg">
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </LinkButton>
            <LinkButton
              href="/blog"
              variant="outline"
              size="lg"
            >
              Browse Resources
            </LinkButton>
          </div>
        </div>
      </div>
    </section>
  );
}
