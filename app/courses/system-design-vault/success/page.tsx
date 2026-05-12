import type { Metadata } from "next";
import { CheckCircle2, BookOpen, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Payment Successful, System Design Vault",
  description: "You now have full lifetime access to the System Design Vault.",
};

export default function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: { payment_id?: string };
}) {
  const paymentId = searchParams.payment_id;

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-20">
      <div className="mx-auto max-w-lg text-center">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>

        <Badge variant="default" className="mt-6">
          Payment confirmed
        </Badge>

        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          You&apos;re in! Welcome to the Vault.
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          You now have <strong>full lifetime access</strong> to the System Design Vault, all 90+
          deep-dive questions, worked answers, and trade-off analyses.
        </p>

        {paymentId && (
          <p className="mt-3 text-xs text-muted-foreground">
            Payment ID: <span className="font-mono">{paymentId}</span>
          </p>
        )}

        <div className="mt-4 rounded-2xl border border-border bg-secondary/40 p-6 text-left">
          <h2 className="flex items-center gap-2 font-semibold">
            <BookOpen className="h-4 w-4 text-primary" />
            What happens next
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• You&apos;ll receive an email with your access link shortly.</li>
            <li>• Full content will be live when the vault launches (updated for 2026).</li>
            <li>• All future updates and new questions are included at no extra cost.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton href="/blog/system-design">
            Read free articles
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
          <LinkButton href="/mentorship" variant="outline">
            Book a mock interview
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
