"use client";

import { useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, ShieldCheck } from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
}

interface RazorpayButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg";
  product?: "lld" | "hld" | "bundle";
  label?: string;
}

const PRODUCT_CONFIG = {
  lld: { amount: 149900, description: "LLD Vault, 20 Problems · Lifetime Access", label: "Buy LLD Vault, ₹1,499", successPath: "/courses/system-design-vault/success?product=lld" },
  hld: { amount: 149900, description: "System Design Vault, 90+ Questions · Lifetime Access", label: "Buy HLD Vault, ₹1,499", successPath: "/courses/system-design-vault/success?product=hld" },
  bundle: { amount: 199900, description: "Full Vault Bundle (LLD + HLD) · Lifetime Access", label: "Buy Full Bundle, ₹1,999", successPath: "/courses/system-design-vault/success?product=bundle" },
};

export function RazorpayButton({ className, size = "lg", product = "bundle", label }: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false);
  const cfg = PRODUCT_CONFIG[product];

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cfg.amount }),
      });
      if (!res.ok) throw new Error("Order creation failed");
      const { orderId, amount } = await res.json();

      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
        amount,
        currency: "INR",
        name: "CrackTheLoop",
        description: cfg.description,
        order_id: orderId,
        handler(response) {
          window.location.href = `${cfg.successPath}&payment_id=${response.razorpay_payment_id}`;
        },
        theme: { color: "#0ea5e9" },
        modal: {
          ondismiss() {
            setLoading(false);
          },
        },
      });
      rzp.open();
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <div className="flex flex-col items-start gap-2">
        <Button
          size={size}
          className={cn("gap-2", className)}
          onClick={handleBuy}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing…
            </>
          ) : (
            label ?? cfg.label
          )}
        </Button>
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-green-500" />
          Secure payment via Razorpay · Lifetime access · No subscription
        </p>
      </div>
    </>
  );
}
