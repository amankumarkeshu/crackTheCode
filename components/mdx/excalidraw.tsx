import Image from "next/image";
import { cn } from "@/lib/utils";

interface BaseProps {
  caption?: string;
  alt?: string;
  className?: string;
  /** Tighter width for inline diagrams; defaults to full content width. */
  size?: "sm" | "md" | "lg" | "full";
}

interface SrcProps extends BaseProps {
  /** Path to an exported Excalidraw image (SVG or PNG) under `/public`. */
  src: string;
  url?: never;
}

interface UrlProps extends BaseProps {
  /**
   * Excalidraw share link, e.g.
   * `https://excalidraw.com/#json=ENC_ID,KEY`
   * Rendered as a live, pan-and-zoom iframe.
   */
  url: string;
  src?: never;
  /** Iframe height in px. Defaults to 480. */
  height?: number;
}

type Props = SrcProps | UrlProps;

const SIZE_CLS: Record<NonNullable<BaseProps["size"]>, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  full: "max-w-full",
};

/**
 * Render an Excalidraw diagram in an article.
 *
 * Two modes:
 *  1. Static image (recommended for SEO + perf):
 *     `<Excalidraw src="/diagrams/rate-limiter.svg" caption="Token bucket flow" />`
 *  2. Live embed (interactive, pan/zoom):
 *     `<Excalidraw url="https://excalidraw.com/#json=..." />`
 */
export function Excalidraw(props: Props) {
  const { caption, className, size = "lg" } = props;

  const isLive = "url" in props && props.url;

  return (
    <figure
      className={cn(
        "not-prose my-8 mx-auto",
        SIZE_CLS[size],
        className,
      )}
    >
      <div
        className={cn(
          "overflow-hidden rounded-xl border border-border bg-white dark:bg-zinc-900",
          "shadow-sm",
        )}
      >
        {isLive ? (
          <iframe
            src={(props as UrlProps).url}
            title={props.alt || caption || "Excalidraw diagram"}
            loading="lazy"
            className="block w-full"
            style={{ height: (props as UrlProps).height ?? 480 }}
            allow="clipboard-write"
          />
        ) : (
          // Use a plain <img> for SVGs so Excalidraw's embedded fonts/strokes
          // render exactly as exported. Next/Image's optimizer can mangle SVGs.
          (() => {
            const src = (props as SrcProps).src;
            const isSvg = src.toLowerCase().endsWith(".svg");
            if (isSvg) {
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt={props.alt || caption || "Diagram"}
                  className="block w-full h-auto"
                  loading="lazy"
                />
              );
            }
            return (
              <Image
                src={src}
                alt={props.alt || caption || "Diagram"}
                width={1600}
                height={900}
                className="block w-full h-auto"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            );
          })()
        )}
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
