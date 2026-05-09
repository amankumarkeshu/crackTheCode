import { cn } from "@/lib/utils";

const CATEGORY_STYLES: Record<string, { bg: string; text: string; icon: string }> = {
  "system-design": {
    bg: "from-indigo-600/90 to-violet-700/90",
    text: "text-white",
    icon: "⚙️",
  },
  lld: {
    bg: "from-fuchsia-600/90 to-pink-700/90",
    text: "text-white",
    icon: "🧩",
  },
  dsa: {
    bg: "from-emerald-600/90 to-teal-700/90",
    text: "text-white",
    icon: "📊",
  },
  "interview-experiences": {
    bg: "from-amber-500/90 to-orange-600/90",
    text: "text-white",
    icon: "💼",
  },
  concepts: {
    bg: "from-sky-600/90 to-blue-700/90",
    text: "text-white",
    icon: "💡",
  },
};

interface Props {
  category: string;
  title: string;
  tags?: string[];
}

export function PostCoverImage({ category, title, tags = [] }: Props) {
  const style = CATEGORY_STYLES[category] ?? CATEGORY_STYLES["concepts"];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "bg-gradient-to-br",
        style.bg
      )}
      style={{ minHeight: "200px" }}
    >
      {/* Dot grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-white/10 blur-2xl" />

      <div className="relative container py-12 md:py-14">
        <div className="mx-auto max-w-3xl">
          {/* Emoji icon */}
          <span className="text-4xl leading-none select-none">{style.icon}</span>

          {/* Title */}
          <h2
            className={cn(
              "mt-4 text-balance text-2xl font-bold leading-snug md:text-3xl",
              style.text
            )}
          >
            {title}
          </h2>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
