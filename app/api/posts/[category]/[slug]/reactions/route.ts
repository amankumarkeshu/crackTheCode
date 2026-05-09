import { NextResponse } from "next/server";
import { getReactions, incrementReactions, decrementReactions } from "@/lib/post-store";

interface Params { params: { category: string; slug: string } }

export async function GET(_req: Request, { params }: Params) {
  const key = `${params.category}/${params.slug}`;
  return NextResponse.json({ reactions: await getReactions(key) });
}

export async function POST(req: Request, { params }: Params) {
  const key = `${params.category}/${params.slug}`;
  const { action } = await req.json() as { action: "like" | "unlike" };
  const reactions =
    action === "unlike"
      ? await decrementReactions(key)
      : await incrementReactions(key);
  return NextResponse.json({ reactions });
}
