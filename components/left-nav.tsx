"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronRight, BookOpen, Code, Database, MessageSquare, GraduationCap, HelpCircle, Layers } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const navIcons = {
  "How to Use": HelpCircle,
  "Learning Resources": BookOpen,
  "System Design": Database,
  "LLD": Layers,
  "DSA": Code,
  "Interview Stories": MessageSquare,
  "Courses": GraduationCap,
} as const;

export function LeftNav() {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 z-50 h-full bg-background/95 backdrop-blur-sm border-r border-border transition-all duration-300 ease-in-out hidden md:block shadow-sm",
        isHovered ? "w-64" : "w-16"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo/Brand - Always visible */}
      <div className="flex items-center h-16 px-4 border-b border-border">
        <Link href="/" className="flex items-center gap-3 w-full">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold flex-none">
            {siteConfig.shortName}
          </div>
          <div className={cn(
            "font-bold text-foreground transition-all duration-300 overflow-hidden",
            isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
          )}>
            <div className="whitespace-nowrap text-lg">
              {siteConfig.name}
            </div>
            <div className="text-xs text-muted-foreground font-normal">
              {siteConfig.tagline}
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col p-2 space-y-1">
        {siteConfig.nav.map((item) => {
          const IconComponent = navIcons[item.title as keyof typeof navIcons] || BookOpen;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground group relative",
                "min-h-[44px]"
              )}
            >
              <IconComponent className="h-5 w-5 flex-none" />
              <span className={cn(
                "transition-opacity duration-300",
                isHovered ? "opacity-100" : "opacity-0"
              )}>
                {item.title}
              </span>
              
              {/* Hover arrow indicator */}
              {!isHovered && (
                <ChevronRight className="h-4 w-4 absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom CTA */}
      <div className={cn(
        "absolute bottom-4 left-2 right-2 transition-opacity duration-300",
        isHovered ? "opacity-100" : "opacity-0"
      )}>
        <Link
          href="/courses/system-design-vault"
          className="block w-full px-4 py-2 bg-primary text-primary-foreground text-center text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          Get the Vault
        </Link>
      </div>

      {/* Collapsed state indicator */}
      {!isHovered && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
          <div className="w-8 h-1 bg-primary/30 rounded-full"></div>
          <div className="w-6 h-0.5 bg-primary/20 rounded-full"></div>
          <div className="w-4 h-0.5 bg-primary/10 rounded-full"></div>
        </div>
      )}
    </div>
  );
}