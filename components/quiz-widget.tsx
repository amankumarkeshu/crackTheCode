"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CheckCircle2, XCircle, Trophy, RefreshCw, Lock, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizResult {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
}

interface Props {
  slug: string;
  questions: Array<{ q: string; options: string[] }>;
}

type Phase = "idle" | "answering" | "submitted";

export function QuizWidget({ slug, questions }: Props) {
  const { data: session } = useSession();
  const [phase, setPhase] = useState<Phase>("idle");
  const [selected, setSelected] = useState<(number | null)[]>(
    Array(questions.length).fill(null)
  );
  const [results, setResults] = useState<QuizResult[] | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch(`/api/quiz/${slug}`)
      .then((r) => r.json())
      .then((d) => { if (d.bestScore !== null) setBestScore(d.bestScore); })
      .catch(() => {});
  }, [slug]);

  function startQuiz() {
    setPhase("answering");
    setCurrent(0);
    setSelected(Array(questions.length).fill(null));
    setResults(null);
    setScore(null);
  }

  function selectOption(optionIdx: number) {
    setSelected((prev) => {
      const next = [...prev];
      next[current] = optionIdx;
      return next;
    });
  }

  function next() {
    if (current < questions.length - 1) setCurrent((c) => c + 1);
  }
  function prev() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  async function submit() {
    if (selected.some((s) => s === null)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/quiz/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: selected }),
      });
      const data = await res.json();
      setResults(data.results);
      setScore(data.score);
      if (data.score > (bestScore ?? -1)) setBestScore(data.score);
      setPhase("submitted");
    } catch {
      // noop
    } finally {
      setLoading(false);
    }
  }

  const total = questions.length;
  const answered = selected.filter((s) => s !== null).length;

  // ── IDLE ──────────────────────────────────────────────────────────────────
  if (phase === "idle") {
    return (
      <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50/60 px-8 py-8 dark:border-amber-800/40 dark:bg-amber-950/20">
        <div className="flex flex-col items-center gap-4 text-center">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/40">
            <Trophy className="h-6 w-6 text-amber-500" />
          </span>
          <div>
            <h2 className="text-xl font-bold tracking-tight">Test Your Knowledge</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {total} multiple-choice questions · Your score is saved to the leaderboard
            </p>
            {bestScore !== null && (
              <p className="mt-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                Your best score: {bestScore}/{total}
              </p>
            )}
          </div>
          {!session ? (
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span>
                <a href="/login" className="font-medium text-foreground underline underline-offset-2">
                  Sign in
                </a>{" "}
                to save your score to the leaderboard
              </span>
            </div>
          ) : null}
          <button
            onClick={startQuiz}
            className="mt-1 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600 active:scale-95"
          >
            Start Quiz <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // ── ANSWERING ─────────────────────────────────────────────────────────────
  if (phase === "answering") {
    const q = questions[current];
    const progress = Math.round(((current + 1) / total) * 100);

    return (
      <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-border bg-card shadow-sm">
        {/* Progress bar */}
        <div className="h-1.5 w-full overflow-hidden rounded-t-2xl bg-muted">
          <div
            className="h-full bg-amber-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="px-8 py-7">
          {/* Counter */}
          <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Question {current + 1} of {total}</span>
            <span>{answered}/{total} answered</span>
          </div>

          {/* Question */}
          <p className="text-base font-semibold leading-snug">{q.q}</p>

          {/* Options */}
          <div className="mt-5 grid gap-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectOption(i)}
                className={cn(
                  "flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-all",
                  selected[current] === i
                    ? "border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-950/30"
                    : "border-border bg-background hover:border-amber-300 hover:bg-amber-50/40 dark:hover:bg-amber-950/10"
                )}
              >
                <span className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors",
                  selected[current] === i
                    ? "border-amber-500 bg-amber-500 text-white"
                    : "border-muted-foreground/40 text-muted-foreground"
                )}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            ))}
          </div>

          {/* Nav */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={current === 0}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary disabled:opacity-40"
            >
              ← Previous
            </button>

            {current < total - 1 ? (
              <button
                onClick={next}
                disabled={selected[current] === null}
                className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-80 disabled:opacity-40"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={answered < total || loading}
                className="rounded-lg bg-amber-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:opacity-40"
              >
                {loading ? "Submitting…" : "Submit Quiz"}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── SUBMITTED ─────────────────────────────────────────────────────────────
  if (phase === "submitted" && results) {
    const pct = Math.round(((score ?? 0) / total) * 100);
    const grade =
      pct === 100 ? "Perfect! 🏆" :
      pct >= 80 ? "Excellent!" :
      pct >= 60 ? "Good job!" :
      pct >= 40 ? "Keep learning!" :
      "Need more practice";

    return (
      <div className="mx-auto mt-12 max-w-3xl space-y-5">
        {/* Score card */}
        <div className="rounded-2xl border border-border bg-card px-8 py-7 text-center shadow-sm">
          <p className="text-sm font-medium text-muted-foreground">{grade}</p>
          <p className="mt-1 text-5xl font-black tracking-tight text-amber-500">
            {score}<span className="text-2xl text-muted-foreground">/{total}</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{pct}% correct</p>
          {session && (
            <p className="mt-3 text-xs text-muted-foreground">
              Score saved to the <a href="/leaderboard" className="underline underline-offset-2 font-medium">leaderboard</a>
            </p>
          )}
          <button
            onClick={startQuiz}
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Try again
          </button>
        </div>

        {/* Detailed results */}
        <div className="space-y-4">
          {questions.map((q, i) => {
            const r = results[i];
            return (
              <div
                key={i}
                className={cn(
                  "rounded-2xl border p-5",
                  r.correct
                    ? "border-green-200 bg-green-50/60 dark:border-green-800/40 dark:bg-green-950/20"
                    : "border-red-200 bg-red-50/60 dark:border-red-800/40 dark:bg-red-950/20"
                )}
              >
                <div className="flex items-start gap-3">
                  {r.correct
                    ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    : <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{q.q}</p>
                    <div className="mt-2 grid gap-1.5">
                      {q.options.map((opt, j) => (
                        <div
                          key={j}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2 text-xs",
                            j === r.correctAnswer
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : selected[i] === j && !r.correct
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                              : "text-muted-foreground"
                          )}
                        >
                          <span className="font-bold">{String.fromCharCode(65 + j)}.</span>
                          {opt}
                          {j === r.correctAnswer && (
                            <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-green-700 dark:text-green-400">
                              Correct
                            </span>
                          )}
                          {selected[i] === j && j !== r.correctAnswer && (
                            <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-red-700 dark:text-red-400">
                              Your answer
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">Explanation: </span>
                      {r.explanation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
