import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/ui/button";
import { CheckCircle, BookOpen, Target, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Use This Platform",
  description:
    "Learn how to make the most of CrackTheCode platform for your technical interview preparation.",
};

const LEARNING_PATHS = [
  {
    title: "Complete Beginner",
    description: "New to technical interviews or need to refresh fundamentals",
    steps: [
      "Start with Core Concepts to build foundation",
      "Practice basic DSA patterns",
      "Move to simple System Design problems",
      "Read Interview Experiences for context"
    ],
    timeframe: "3-4 months",
    badge: "Comprehensive"
  },
  {
    title: "Experienced Developer",
    description: "Have industry experience, preparing for senior roles",
    steps: [
      "Focus on System Design fundamentals",
      "Study Low-Level Design patterns",
      "Practice advanced DSA problems",
      "Review interview experiences at your target level"
    ],
    timeframe: "2-3 months",
    badge: "Targeted"
  },
  {
    title: "Senior/Staff Preparation", 
    description: "Preparing for senior, staff, or principal level roles",
    steps: [
      "Master advanced System Design concepts",
      "Focus on architectural trade-offs",
      "Study leadership and communication patterns",
      "Practice with real senior-level questions"
    ],
    timeframe: "1-2 months",
    badge: "Advanced"
  }
];

const CATEGORIES_GUIDE = [
  {
    icon: "🏗️",
    title: "System Design",
    description: "Large-scale system architecture, scalability, and distributed systems",
    whenToUse: "For senior+ roles, backend positions, and architecture discussions",
    startWith: "Basic system design principles and common patterns"
  },
  {
    icon: "🔧",
    title: "Low-Level Design (LLD)",
    description: "Object-oriented design, design patterns, and code architecture",
    whenToUse: "For mid-level to senior roles, focusing on code structure and OOP",
    startWith: "SOLID principles and common design patterns"
  },
  {
    icon: "📊",
    title: "Data Structures & Algorithms",
    description: "Problem-solving techniques, algorithmic thinking, and optimization",
    whenToUse: "Essential for all technical roles, especially junior to mid-level",
    startWith: "Arrays, strings, and basic sorting algorithms"
  },
  {
    icon: "💼",
    title: "Interview Experiences",
    description: "Real interview stories, questions asked, and lessons learned",
    whenToUse: "To understand company-specific expectations and prepare mentally",
    startWith: "Experiences from your target companies or similar roles"
  },
  {
    icon: "📚",
    title: "Core Concepts",
    description: "Fundamental computer science concepts and principles",
    whenToUse: "To fill knowledge gaps or refresh theoretical understanding",
    startWith: "Topics you feel less confident about"
  }
];

export default function HowToUsePage() {
  return (
    <div className="container py-16 md:py-20">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center mb-16">
        <Badge variant="secondary">Platform Guide</Badge>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
          How to Use This Platform Effectively
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          A structured approach to technical interview preparation tailored to your experience level and career goals.
        </p>
      </div>

      {/* Quick Start */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8">🚀 Quick Start Guide</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">1️⃣</span>
            </div>
            <h3 className="font-semibold mb-2">Assess Your Level</h3>
            <p className="text-sm text-muted-foreground">Choose your experience level below to get a customized learning path.</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">2️⃣</span>
            </div>
            <h3 className="font-semibold mb-2">Pick Categories</h3>
            <p className="text-sm text-muted-foreground">Focus on 2-3 categories that align with your target role requirements.</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">3️⃣</span>
            </div>
            <h3 className="font-semibold mb-2">Study Systematically</h3>
            <p className="text-sm text-muted-foreground">Follow the recommended sequence and practice regularly with consistent progress.</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">4️⃣</span>
            </div>
            <h3 className="font-semibold mb-2">Apply & Practice</h3>
            <p className="text-sm text-muted-foreground">Use mock interviews and real problem-solving to reinforce your learning.</p>
          </div>
        </div>
      </div>

      {/* Learning Paths */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8">📈 Choose Your Learning Path</h2>
        <div className="grid gap-8 lg:grid-cols-3">
          {LEARNING_PATHS.map((path, index) => (
            <div key={path.title} className="rounded-lg border border-border bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant={index === 1 ? "default" : "secondary"}>{path.badge}</Badge>
                <span className="text-sm text-muted-foreground">{path.timeframe}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{path.title}</h3>
              <p className="text-muted-foreground mb-6">{path.description}</p>
              <div className="space-y-3">
                {path.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-none mt-0.5" />
                    <span className="text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Guide */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8">📋 Understanding Categories</h2>
        <div className="space-y-6">
          {CATEGORIES_GUIDE.map((category) => (
            <div key={category.title} className="rounded-lg border border-border bg-card p-6">
              <div className="flex gap-4">
                <span className="text-2xl flex-none">{category.icon}</span>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-3">{category.description}</p>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div>
                      <span className="text-sm font-medium">When to focus here:</span>
                      <p className="text-sm text-muted-foreground">{category.whenToUse}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Start with:</span>
                      <p className="text-sm text-muted-foreground">{category.startWith}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Study Tips */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight mb-8">💡 Study Tips & Best Practices</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Effective Study Sessions
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Dedicate 1-2 hours daily for consistent progress</li>
                <li>• Focus on one category at a time to build depth</li>
                <li>• Take notes and summarize key concepts</li>
                <li>• Practice explaining concepts out loud</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Active Learning
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Try to solve problems before reading solutions</li>
                <li>• Draw diagrams and system architectures</li>
                <li>• Ask yourself "why" and "what if" questions</li>
                <li>• Connect new concepts to your existing knowledge</li>
              </ul>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Interview Simulation
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Practice explaining solutions clearly</li>
                <li>• Time yourself on problem-solving exercises</li>
                <li>• Record yourself to identify improvement areas</li>
                <li>• Join mock interview sessions when possible</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Progress Tracking
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Keep a study log with topics covered</li>
                <li>• Rate your confidence level on each topic</li>
                <li>• Revisit challenging concepts regularly</li>
                <li>• Set weekly goals and celebrate achievements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Ready to Start Learning?</h2>
        <p className="text-muted-foreground mb-8">Browse our learning resources and begin your structured preparation journey.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <LinkButton href="/blog" size="lg">
            Browse Learning Resources
            <ArrowRight className="h-4 w-4" />
          </LinkButton>
          <LinkButton href="/courses/system-design-vault" variant="outline" size="lg">
            View Course Catalog
          </LinkButton>
        </div>
      </div>
    </div>
  );
}