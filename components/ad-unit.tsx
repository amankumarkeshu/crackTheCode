"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdFormat = "auto" | "rectangle" | "leaderboard" | "in-article" | "in-feed";

interface AdUnitProps {
  slot: string;
  format?: AdFormat;
  className?: string;
  fullWidthResponsive?: boolean;
}

const FORMAT_STYLES: Record<AdFormat, React.CSSProperties> = {
  auto: { display: "block" },
  rectangle: { display: "inline-block", width: "300px", height: "250px" },
  leaderboard: { display: "inline-block", width: "728px", height: "90px" },
  "in-article": { display: "block", textAlign: "center" },
  "in-feed": { display: "block" },
};

export function AdUnit({
  slot,
  format = "auto",
  className = "",
  fullWidthResponsive = true,
}: AdUnitProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const ref = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!publisherId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet
    }
  }, [publisherId]);

  // Don't render anything if publisher ID is not configured
  if (!publisherId) return null;

  const isInArticle = format === "in-article";
  const isInFeed = format === "in-feed";

  return (
    <div className={`ad-unit overflow-hidden ${className}`}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={FORMAT_STYLES[format]}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={isInArticle ? "fluid" : isInFeed ? "fluid" : format === "auto" ? "auto" : undefined}
        data-ad-layout={isInArticle ? "in-article" : isInFeed ? "in-feed" : undefined}
        data-ad-layout-key={isInFeed ? "-fb+5w+4e-db+86" : undefined}
        data-full-width-responsive={fullWidthResponsive ? "true" : undefined}
      />
    </div>
  );
}

/** Responsive in-article ad — best for mid-article placement */
export function InArticleAd({ slot, className }: { slot: string; className?: string }) {
  return (
    <AdUnit
      slot={slot}
      format="in-article"
      className={`my-8 ${className ?? ""}`}
      fullWidthResponsive={true}
    />
  );
}

/** Responsive display ad — good for sidebar / end of article */
export function DisplayAd({ slot, className }: { slot: string; className?: string }) {
  return (
    <div className={`flex justify-center ${className ?? ""}`}>
      <AdUnit slot={slot} format="auto" fullWidthResponsive={true} />
    </div>
  );
}

/** In-feed ad — for blog listing pages between post cards */
export function InFeedAd({ slot, className }: { slot: string; className?: string }) {
  return (
    <AdUnit
      slot={slot}
      format="in-feed"
      className={className ?? ""}
      fullWidthResponsive={true}
    />
  );
}
