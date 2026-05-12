"use client";

import { useMemo, useState } from "react";
import { Search, X, ChevronDown, Network, Boxes, Binary } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  InterviewQuestion,
  QuestionDifficulty,
  QuestionType,
} from "@/data/interview-questions";

interface ExplorerProps {
  questions: InterviewQuestion[];
  companies: string[];
  types: { value: QuestionType; label: string }[];
  difficulties: QuestionDifficulty[];
  companyCount: { company: string; count: number }[];
}

const TYPE_META: Record<QuestionType, { label: string; accent: string; dot: string; icon: typeof Network }> = {
  "system-design": { label: "System Design", accent: "border-l-indigo-400", dot: "bg-indigo-400", icon: Network },
  lld:             { label: "Low-Level Design", accent: "border-l-fuchsia-400", dot: "bg-fuchsia-400", icon: Boxes },
  dsa:             { label: "DSA", accent: "border-l-emerald-400", dot: "bg-emerald-400", icon: Binary },
};

const DIFF_COLORS: Record<QuestionDifficulty, string> = {
  easy:   "text-emerald-600 dark:text-emerald-400",
  medium: "text-amber-600 dark:text-amber-400",
  hard:   "text-rose-600 dark:text-rose-400",
};

type SortOption = "default" | "difficulty-asc" | "difficulty-desc" | "company";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default",          label: "Recent & Popular" },
  { value: "difficulty-asc",   label: "Easiest First" },
  { value: "difficulty-desc",  label: "Hardest First" },
  { value: "company",          label: "Company A–Z" },
];

const DIFF_ORDER: Record<QuestionDifficulty, number> = { easy: 0, medium: 1, hard: 2 };

export function QuestionsExplorer({
  questions,
  companies,
  types,
  difficulties,
  companyCount,
}: ExplorerProps) {
  const [search, setSearch]               = useState("");
  const [company, setCompany]             = useState("all");
  const [type, setType]                   = useState<QuestionType | "all">("all");
  const [difficulty, setDifficulty]       = useState<QuestionDifficulty | "all">("all");
  const [sort, setSort]                   = useState<SortOption>("default");

  // Sort companies by question count for the dropdown
  const sortedCompanies = useMemo(
    () => companyCount.map((c) => c.company),
    [companyCount]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let rows = questions.filter((row) => {
      if (company !== "all" && row.company !== company) return false;
      if (type !== "all" && row.type !== type) return false;
      if (difficulty !== "all" && row.difficulty !== difficulty) return false;
      if (q) {
        const hay = `${row.question} ${row.tags.join(" ")} ${row.note ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    if (sort === "difficulty-asc")  rows = [...rows].sort((a, b) => DIFF_ORDER[a.difficulty] - DIFF_ORDER[b.difficulty]);
    if (sort === "difficulty-desc") rows = [...rows].sort((a, b) => DIFF_ORDER[b.difficulty] - DIFF_ORDER[a.difficulty]);
    if (sort === "company")         rows = [...rows].sort((a, b) => a.company.localeCompare(b.company));

    return rows;
  }, [questions, search, company, type, difficulty, sort]);

  const anyActive = search || company !== "all" || type !== "all" || difficulty !== "all";

  const resetAll = () => {
    setSearch(""); setCompany("all"); setType("all"); setDifficulty("all"); setSort("default");
  };

  return (
    <div className="mt-8">
      {/* ── Search bar ── */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search all questions…"
          className="h-11 w-full rounded-lg border border-input bg-background pl-10 pr-10 text-sm shadow-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* ── Filter row ── */}
      <div className="mt-3 flex flex-wrap gap-2">
        <Select
          value={company}
          onChange={setCompany}
          placeholder="All Companies"
          options={[
            { value: "all", label: "All Companies" },
            ...sortedCompanies.map((c) => ({ value: c, label: c })),
          ]}
          className="min-w-[160px]"
        />
        <Select
          value={type}
          onChange={(v) => setType(v as QuestionType | "all")}
          placeholder="All Types"
          options={[
            { value: "all", label: "All Types" },
            ...types.map((t) => ({ value: t.value, label: t.label })),
          ]}
        />
        <Select
          value={difficulty}
          onChange={(v) => setDifficulty(v as QuestionDifficulty | "all")}
          placeholder="All Levels"
          options={[
            { value: "all",    label: "All Levels" },
            ...difficulties.map((d) => ({ value: d, label: d.charAt(0).toUpperCase() + d.slice(1) })),
          ]}
        />
        <Select
          value={sort}
          onChange={(v) => setSort(v as SortOption)}
          placeholder="Sort By"
          options={SORT_OPTIONS.map((s) => ({ value: s.value, label: s.label }))}
        />

        {anyActive && (
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-rose-400 hover:text-rose-600"
          >
            <X className="h-3.5 w-3.5" /> Clear
          </button>
        )}
      </div>

      {/* ── Result count ── */}
      <p className="mt-4 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{filtered.length.toLocaleString()}</span>{" "}
        {filtered.length === 1 ? "question" : "questions"}
        {anyActive ? " match your filters" : " in the bank"}
      </p>

      {/* ── Results ── */}
      <div className="mt-4">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
            No questions match, try adjusting or clearing the filters.
          </div>
        ) : (
          <ul className="divide-y divide-border rounded-xl border border-border bg-card">
            {filtered.map((q, i) => (
              <QuestionRow key={q.id} q={q} index={i} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ── Reusable dropdown ── */
function Select({
  value,
  onChange,
  options,
  placeholder,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-lg border border-input bg-background pl-3 pr-8 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

/* ── Single question row ── */
function QuestionRow({ q, index }: { q: InterviewQuestion; index: number }) {
  const meta = TYPE_META[q.type];
  const TypeIcon = meta.icon;

  return (
    <li className={cn("flex items-start gap-4 px-5 py-4 transition-colors hover:bg-secondary/40", meta.accent, "border-l-[3px]")}>
      {/* Row number */}
      <span className="mt-0.5 w-6 shrink-0 text-right text-xs tabular-nums text-muted-foreground/50">
        {index + 1}
      </span>

      {/* Main content */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-snug text-foreground">{q.question}</p>

        {q.note && (
          <p className="mt-1 text-xs text-muted-foreground">{q.note}</p>
        )}

        {/* Tags */}
        {q.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {q.tags.map((t) => (
              <span key={t} className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Right-side meta */}
      <div className="flex shrink-0 flex-col items-end gap-1.5">
        {/* Company */}
        <span className="text-xs font-medium text-foreground">{q.company}</span>

        {/* Type + difficulty on one line */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <TypeIcon className="h-3 w-3" />
            {meta.label}
          </span>
          <span className={cn("text-[11px] font-medium capitalize", DIFF_COLORS[q.difficulty])}>
            {q.difficulty}
          </span>
        </div>

        {/* Frequent badge */}
        {q.frequency === "high" && (
          <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">
            Frequent
          </span>
        )}
      </div>
    </li>
  );
}
