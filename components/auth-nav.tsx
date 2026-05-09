"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { LogOut, ChevronDown, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function AuthNav() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  if (status === "loading") {
    return (
      <div className="h-8 w-8 animate-pulse rounded-full bg-secondary" />
    );
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="inline-flex h-9 items-center rounded-md border border-input bg-background px-4 text-sm font-medium transition-colors hover:bg-secondary"
      >
        Sign in
      </Link>
    );
  }

  const name = session.user?.name ?? "Account";
  const email = session.user?.email ?? "";
  const image = session.user?.image;
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full pl-1 pr-2 py-1 text-sm font-medium transition-colors hover:bg-secondary"
        aria-expanded={open}
        aria-haspopup="true"
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            width={28}
            height={28}
            className="rounded-full"
          />
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            {initials}
          </span>
        )}
        <span className="hidden sm:inline max-w-[120px] truncate">{name.split(" ")[0]}</span>
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-card shadow-lg z-50">
          {/* User info */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
            {image ? (
              <Image src={image} alt={name} width={32} height={32} className="rounded-full flex-none" />
            ) : (
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                {initials}
              </span>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{name}</p>
              <p className="truncate text-xs text-muted-foreground">{email}</p>
            </div>
          </div>

          {/* Menu items */}
          <div className="p-1">
            <Link
              href="/courses/system-design-vault"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-secondary"
            >
              <User className="h-4 w-4 text-muted-foreground" />
              My Vault
            </Link>
            <button
              type="button"
              onClick={() => { setOpen(false); signOut({ callbackUrl: "/" }); }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
