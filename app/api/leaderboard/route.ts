import { NextResponse } from "next/server";
import { getLeaderboard } from "@/lib/post-store";

export async function GET() {
  const entries = await getLeaderboard(10);
  return NextResponse.json({ leaderboard: entries });
}
