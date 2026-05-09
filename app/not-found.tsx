import Link from "next/link";
import { LinkButton } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
        That page wandered off.
      </h1>
      <p className="mt-3 text-muted-foreground">
        It might have been moved or it may never have existed. Try one of these instead:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <LinkButton href="/blog">Browse the blog</LinkButton>
        <LinkButton href="/" variant="outline">
          Back to home
        </LinkButton>
      </div>
      <p className="mt-10 text-sm text-muted-foreground">
        Or jump to a section:{" "}
        <Link className="text-primary hover:underline" href="/blog/system-design">System Design</Link>
        {" · "}
        <Link className="text-primary hover:underline" href="/blog/lld">LLD</Link>
        {" · "}
        <Link className="text-primary hover:underline" href="/blog/dsa">DSA</Link>
        {" · "}
        <Link className="text-primary hover:underline" href="/blog/interview-experiences">Interview Stories</Link>
      </p>
    </div>
  );
}
