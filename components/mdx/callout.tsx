import { AlertTriangle, Info, CheckCircle2, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "info" | "warn" | "success" | "tip";

const STYLES: Record<CalloutType, { wrap: string; icon: React.ComponentType<{ className?: string }> }> = {
  info: { wrap: "border-sky-500/40 bg-sky-500/10 text-sky-700 dark:text-sky-300", icon: Info },
  warn: { wrap: "border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300", icon: AlertTriangle },
  success: { wrap: "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", icon: CheckCircle2 },
  tip: { wrap: "border-primary/40 bg-primary/10 text-primary", icon: Lightbulb },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}) {
  const { wrap, icon: Icon } = STYLES[type];
  return (
    <div className={cn("my-6 flex gap-3 rounded-xl border p-4", wrap)}>
      <Icon className="mt-0.5 h-5 w-5 flex-none" />
      <div className="space-y-1">
        {title && <p className="font-semibold leading-none">{title}</p>}
        <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
      </div>
    </div>
  );
}
