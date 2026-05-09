import { NextResponse } from "next/server";
import { getViews, incrementViews } from "@/lib/post-store";

interface Params { params: { category: string; slug: string } }

export async function GET(_req: Request, { params }: Params) {
  const key = `${params.category}/${params.slug}`;
  return NextResponse.json({ views: getViews(key) });
}

export async function POST(_req: Request, { params }: Params) {
  const key = `${params.category}/${params.slug}`;
  return NextResponse.json({ views: incrementViews(key) });
}
