"use client";

import { useEffect, useState, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import { MessageSquare, Send, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Comment } from "@/lib/post-store";

interface Props {
  category: string;
  slug: string;
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function CommentsSection({ category, slug }: Props) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const base = `/api/posts/${category}/${slug}/comments`;

  useEffect(() => {
    fetch(base)
      .then((r) => r.json())
      .then((d) => setComments(d.comments ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [base]);

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(base, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (res.status === 401) { setError("Please sign in to comment."); return; }
      if (!res.ok) { setError("Something went wrong. Try again."); return; }
      const { comment } = await res.json();
      setComments((prev) => [comment, ...prev]);
      setText("");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function deleteComment(id: string) {
    const res = await fetch(base, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ commentId: id }),
    });
    if (res.ok) setComments((prev) => prev.filter((c) => c.id !== id));
  }

  const currentUserId = session?.user?.id ?? session?.user?.email;

  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="flex items-center gap-2 text-xl font-bold tracking-tight">
        <MessageSquare className="h-5 w-5 text-primary" />
        Discussion
        {comments.length > 0 && (
          <span className="ml-1 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground font-normal">
            {comments.length}
          </span>
        )}
      </h2>

      {/* Comment form */}
      <div className="mt-6">
        {session ? (
          <form onSubmit={submitComment} className="space-y-3">
            <div className="flex gap-3">
              {session.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? ""}
                  width={36}
                  height={36}
                  className="h-9 w-9 flex-none rounded-full"
                />
              ) : (
                <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {(session.user?.name ?? "?")[0]}
                </span>
              )}
              <div className="flex-1">
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your thoughts or ask a question…"
                  rows={3}
                  maxLength={1000}
                  className="w-full resize-none rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{text.length}/1000</span>
                  {error && <p className="text-xs text-red-500">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting || !text.trim()}
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                    Post
                  </button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="rounded-xl border border-border bg-secondary/40 p-5 text-center">
            <p className="text-sm text-muted-foreground">
              Sign in with Google to join the discussion.
            </p>
            <button
              type="button"
              onClick={() => signIn("google")}
              className="mt-3 inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-secondary"
            >
              <GoogleIcon />
              Sign in with Google
            </button>
          </div>
        )}
      </div>

      {/* Comments list */}
      <div className="mt-8 space-y-6">
        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
        {!loading && comments.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="flex gap-3">
            {c.authorImage ? (
              <Image
                src={c.authorImage}
                alt={c.authorName}
                width={36}
                height={36}
                className="h-9 w-9 flex-none rounded-full"
              />
            ) : (
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-secondary text-secondary-foreground text-xs font-bold">
                {c.authorName[0]}
              </span>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{c.authorName}</span>
                <span className="text-xs text-muted-foreground">{timeAgo(c.createdAt)}</span>
              </div>
              <p className={cn(
                "mt-1 text-sm leading-relaxed whitespace-pre-wrap",
                "text-foreground"
              )}>
                {c.text}
              </p>
            </div>
            {currentUserId && currentUserId === c.authorId && (
              <button
                type="button"
                onClick={() => deleteComment(c.id)}
                aria-label="Delete comment"
                className="self-start mt-1 flex-none text-muted-foreground/40 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" />
      <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58Z" />
    </svg>
  );
}
