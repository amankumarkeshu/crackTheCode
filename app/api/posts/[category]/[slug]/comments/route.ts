import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getComments, addComment, deleteComment } from "@/lib/post-store";
import { randomUUID } from "crypto";

interface Params { params: { category: string; slug: string } }

export async function GET(_req: Request, { params }: Params) {
  const key = `${params.category}/${params.slug}`;
  return NextResponse.json({ comments: getComments(key) });
}

export async function POST(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Sign in to comment" }, { status: 401 });
  }

  const { text } = await req.json() as { text: string };
  if (!text?.trim() || text.trim().length > 1000) {
    return NextResponse.json({ error: "Invalid comment" }, { status: 400 });
  }

  const key = `${params.category}/${params.slug}`;
  const comment = addComment({
    id: randomUUID(),
    postKey: key,
    authorId: session.user.id ?? session.user.email ?? "unknown",
    authorName: session.user.name ?? "Anonymous",
    authorImage: session.user.image ?? "",
    text: text.trim(),
    createdAt: new Date().toISOString(),
  });

  return NextResponse.json({ comment }, { status: 201 });
}

export async function DELETE(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }

  const { commentId } = await req.json() as { commentId: string };
  const key = `${params.category}/${params.slug}`;
  const userId = session.user.id ?? session.user.email ?? "unknown";
  const deleted = deleteComment(key, commentId, userId);

  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}
