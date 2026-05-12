import type { Metadata } from "next";
import { QuestionsExplorer } from "./questions-explorer";
import {
  interviewQuestions,
  allCompanies,
  allTypes,
  allDifficulties,
  getCompanyCount,
} from "@/data/interview-questions";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Interview Questions — Filter by Company & Type",
  description:
    "1000+ curated interview questions across 90+ companies — Google, Meta, Amazon, Uber, LinkedIn, Flipkart, Swiggy, and more. Filter by company, type (System Design / LLD / DSA), and difficulty.",
};

export default function InterviewQuestionsPage() {
  const total = interviewQuestions.length;
  const companyCount = getCompanyCount();

  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="muted">Question Bank</Badge>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          Interview questions, tagged by company.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {total}+ curated questions from {allCompanies.length} major companies. Filter by
          company, type (System Design, LLD, DSA), or difficulty.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Sourced from widely-reported interview write-ups across LeetCode, GeeksforGeeks,
          Glassdoor, Blind, engineering blogs, and books. Not NDA-protected — all questions
          are publicly shared patterns.
        </p>
      </div>

      <QuestionsExplorer
        questions={interviewQuestions}
        companies={allCompanies}
        types={allTypes}
        difficulties={allDifficulties}
        companyCount={companyCount}
      />
    </div>
  );
}
