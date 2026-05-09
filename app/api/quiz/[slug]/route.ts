import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import quizzes from "@/data/quizzes";
import { saveQuizScore, getUserQuizScore } from "@/lib/post-store";

interface Params { params: { slug: string } }

// GET — fetch question count and user's previous best score
export async function GET(_req: Request, { params }: Params) {
  const quiz = quizzes[params.slug];
  if (!quiz) return NextResponse.json({ error: "No quiz for this post" }, { status: 404 });

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? session?.user?.email ?? null;
  const bestScore = userId ? await getUserQuizScore(userId, params.slug) : null;

  return NextResponse.json({
    total: quiz.questions.length,
    bestScore,
  });
}

// POST — submit answers, return score + explanations
export async function POST(req: Request, { params }: Params) {
  const quiz = quizzes[params.slug];
  if (!quiz) return NextResponse.json({ error: "No quiz for this post" }, { status: 404 });

  const { answers } = await req.json() as { answers: number[] };
  if (!Array.isArray(answers) || answers.length !== quiz.questions.length) {
    return NextResponse.json({ error: "Invalid answers" }, { status: 400 });
  }

  // Grade server-side — answers never sent to client
  const results = quiz.questions.map((q, i) => ({
    correct: answers[i] === q.answer,
    correctAnswer: q.answer,
    explanation: q.explanation,
  }));

  const score = results.filter((r) => r.correct).length;

  // Persist score if signed in
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const userId = session.user.id ?? session.user.email ?? "unknown";
    const userName = session.user.name ?? "Anonymous";
    const userImage = session.user.image ?? "";
    await saveQuizScore(userId, userName, userImage, params.slug, score).catch(() => {});
  }

  return NextResponse.json({ score, total: quiz.questions.length, results });
}
