"use client";

import { useMemo, useState } from "react";
import { Search, X, Filter, Building2, Boxes, Network, Binary } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

const TYPE_META: Record<
  QuestionType,
  { label: string; short: string; chip: string; accent: string; icon: typeof Network }
> = {
  "system-design": {
    label: "System Design",
    short: "SD",
    chip:
      "border-indigo-400/50 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    accent: "border-l-indigo-400",
    icon: Network,
  },
  lld: {
    label: "Low-Level Design",
    short: "LLD",
    chip:
      "border-fuchsia-400/50 bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300",
    accent: "border-l-fuchsia-400",
    icon: Boxes,
  },
  dsa: {
    label: "DSA",
    short: "DSA",
    chip:
      "border-emerald-400/50 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    accent: "border-l-emerald-400",
    icon: Binary,
  },
};

const DIFFICULTY_META: Record<QuestionDifficulty, string> = {
  easy: "border-emerald-400/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  medium: "border-amber-400/40 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  hard: "border-rose-400/40 bg-rose-500/10 text-rose-700 dark:text-rose-300",
};

export function QuestionsExplorer({
  questions,
  companies,
  types,
  difficulties,
  companyCount,
}: ExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<QuestionType | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<QuestionDifficulty | "all">("all");
  const [selectedCompanies, setSelectedCompanies] = useState<Set<string>>(new Set());
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  const topCompanies = useMemo(
    () => companyCount.slice(0, 14).map((c) => c.company),
    [companyCount]
  );
  const visibleCompanies = showAllCompanies ? companies : topCompanies;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return questions.filter((row) => {
      if (selectedType !== "all" && row.type !== selectedType) return false;
      if (selectedDifficulty !== "all" && row.difficulty !== selectedDifficulty) return false;
      if (selectedCompanies.size > 0 && !selectedCompanies.has(row.company)) return false;
      if (q) {
        const hay =
          row.question.toLowerCase() +
          " " +
          row.tags.join(" ").toLowerCase() +
          " " +
          (row.note?.toLowerCase() ?? "");
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [questions, search, selectedType, selectedDifficulty, selectedCompanies]);

  const toggleCompany = (c: string) => {
    setSelectedCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(c)) next.delete(c);
      else next.add(c);
      return next;
    });
  };

  const clearAll = () => {
    setSearch("");
    setSelectedType("all");
    setSelectedDifficulty("all");
    setSelectedCompanies(new Set());
  };

  const anyFilterActive =
    search.length > 0 ||
    selectedType !== "all" ||
    selectedDifficulty !== "all" ||
    selectedCompanies.size > 0;

  return (
    <div className="mt-10">
      {/* Filter bar */}
      <div className="sticky top-16 z-20 -mx-4 rounded-2xl border border-border bg-background/85 px-4 py-4 shadow-sm backdrop-blur md:mx-0 md:px-6">
        {/* Search */}
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions, tags, topics — e.g. 'rate limiter', 'lru', 'dijkstra'"
            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-9 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Type filter */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Filter className="h-3 w-3" /> Type
          </span>
          <FilterChip
            active={selectedType === "all"}
            onClick={() => setSelectedType("all")}
          >
            All
          </FilterChip>
          {types.map((t) => (
            <FilterChip
              key={t.value}
              active={selectedType === t.value}
              onClick={() => setSelectedType(t.value)}
            >
              {t.label}
            </FilterChip>
          ))}
        </div>

        {/* Difficulty filter */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Difficulty
          </span>
          <FilterChip
            active={selectedDifficulty === "all"}
            onClick={() => setSelectedDifficulty("all")}
          >
            All
          </FilterChip>
          {difficulties.map((d) => (
            <FilterChip
              key={d}
              active={selectedDifficulty === d}
              onClick={() => setSelectedDifficulty(d)}
            >
              <span className="capitalize">{d}</span>
            </FilterChip>
          ))}
        </div>

        {/* Company filter */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <Building2 className="h-3 w-3" /> Company
          </span>
          {selectedCompanies.size > 0 && (
            <button
              type="button"
              onClick={() => setSelectedCompanies(new Set())}
              className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              Clear ({selectedCompanies.size})
            </button>
          )}
          {visibleCompanies.map((c) => (
            <FilterChip
              key={c}
              active={selectedCompanies.has(c)}
              onClick={() => toggleCompany(c)}
            >
              {c}
            </FilterChip>
          ))}
          {companies.length > topCompanies.length && (
            <button
              type="button"
              onClick={() => setShowAllCompanies((s) => !s)}
              className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-foreground"
            >
              {showAllCompanies
                ? "Show fewer"
                : `+ ${companies.length - topCompanies.length} more`}
            </button>
          )}
        </div>

        {/* Result count + clear */}
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-sm">
          <span className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "question" : "questions"}
            {anyFilterActive ? " match your filters" : " total"}
          </span>
          {anyFilterActive && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <X className="h-3 w-3" /> Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="mt-8">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">
              No questions match. Try widening filters or clearing the search.
            </p>
          </div>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {filtered.map((q) => (
              <QuestionCard key={q.id} q={q} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}

function QuestionCard({ q }: { q: InterviewQuestion }) {
  const typeMeta = TYPE_META[q.type];
  const TypeIcon = typeMeta.icon;
  return (
    <li
      className={cn(
        "group flex flex-col rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md",
        "border-l-4",
        typeMeta.accent
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium",
            typeMeta.chip
          )}
        >
          <TypeIcon className="h-3 w-3" />
          {typeMeta.short}
        </span>
        <Badge variant="outline">{q.company}</Badge>
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
            DIFFICULTY_META[q.difficulty]
          )}
        >
          {q.difficulty}
        </span>
        {q.frequency === "high" && (
          <Badge variant="accent" className="text-[10px]">
            Frequent
          </Badge>
        )}
        {q.askedFor && (
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            {q.askedFor}
          </span>
        )}
      </div>

      <p className="mt-3 text-sm font-medium leading-snug text-foreground">
        {q.question}
      </p>

      {q.note && (
        <p className="mt-2 text-xs italic text-muted-foreground">{q.note}</p>
      )}

      {q.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {q.tags.map((t) => (
            <span
              key={t}
              className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}
