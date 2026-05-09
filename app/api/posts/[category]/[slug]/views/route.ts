import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getViews, incrementViews, trackUserRead } from "@/lib/post-store";

interface Params { params: { category: string; slug: string } }

export async function GET(_req: Request, { params }: Params) {
  const key = `${params.category}/${params.slug}`;
  return NextResponse.json({ views: await getViews(key) });
}

export async function POST(_req: Request, { params }: Params) {
  const key = `${params.category}/${params.slug}`;
  const views = await incrementViews(key);

  // Track authenticated user reads for the leaderboard
  const session = await getServerSession(authOptions);
  if (session?.user) {
    const userId = session.user.id ?? session.user.email ?? "unknown";
    const userName = session.user.name ?? "Anonymous";
    const userImage = session.user.image ?? "";
    await trackUserRead(userId, userName, userImage, key).catch(() => {});
  }

  return NextResponse.json({ views });
}
