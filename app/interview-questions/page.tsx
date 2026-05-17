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
  title: "Interview Questions, Filter by Company & Type",
  description:
    "1000+ curated interview questions across 90+ companies, Google, Meta, Amazon, Uber, LinkedIn, Flipkart, Swiggy, and more. Filter by company, type (System Design / LLD / DSA), and difficulty.",
};

export default function InterviewQuestionsPage() {
  const total = interviewQuestions.length;
  const companyCount = getCompanyCount();

  return (
    <div className="container max-w-5xl py-10 md:py-14">
      <div className="mb-8">
        <Badge variant="secondary">Question Bank</Badge>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Interview Questions
        </h1>
        <p className="mt-2 text-muted-foreground">
          {total.toLocaleString()} questions across {allCompanies.length} companies, System Design, LLD &amp; DSA.
          Sourced from publicly reported interview experiences.
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
