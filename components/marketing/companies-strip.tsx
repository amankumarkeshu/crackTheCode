import { siteConfig } from "@/lib/site";

export function CompaniesStrip() {
  const companies = [...siteConfig.author.interviewedAt, ...siteConfig.author.interviewedAt];
  return (
    <section className="border-y border-border/60 bg-secondary/30 py-8">
      <div className="container">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by engineers preparing for
        </p>
        <div className="mt-5 overflow-hidden">
          <div className="flex animate-marquee gap-12 whitespace-nowrap">
            {companies.map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="text-lg font-semibold text-muted-foreground/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
