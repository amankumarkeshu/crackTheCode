import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// ── Views ─────────────────────────────────────────────────────────────────────

export async function getViews(postKey: string): Promise<number> {
  return (await redis.get<number>(`views:${postKey}`)) ?? 0;
}

export async function incrementViews(postKey: string): Promise<number> {
  return await redis.incr(`views:${postKey}`);
}

// ── Reactions ─────────────────────────────────────────────────────────────────

export async function getReactions(postKey: string): Promise<number> {
  return (await redis.get<number>(`reactions:${postKey}`)) ?? 0;
}

export async function incrementReactions(postKey: string): Promise<number> {
  return await redis.incr(`reactions:${postKey}`);
}

export async function decrementReactions(postKey: string): Promise<number> {
  const val = await redis.decr(`reactions:${postKey}`);
  if (val < 0) {
    await redis.set(`reactions:${postKey}`, 0);
    return 0;
  }
  return val;
}

// ── Comments ──────────────────────────────────────────────────────────────────

export interface Comment {
  id: string;
  postKey: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  text: string;
  createdAt: string;
}

export async function getComments(postKey: string): Promise<Comment[]> {
  const data = await redis.get<Comment[]>(`comments:${postKey}`);
  return (data ?? []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addComment(comment: Comment): Promise<Comment> {
  const key = `comments:${comment.postKey}`;
  const existing = (await redis.get<Comment[]>(key)) ?? [];
  existing.unshift(comment);
  await redis.set(key, existing);
  return comment;
}

export async function deleteComment(
  postKey: string,
  commentId: string,
  userId: string
): Promise<boolean> {
  const key = `comments:${postKey}`;
  const existing = (await redis.get<Comment[]>(key)) ?? [];
  const idx = existing.findIndex(
    (c) => c.id === commentId && c.authorId === userId
  );
  if (idx === -1) return false;
  existing.splice(idx, 1);
  await redis.set(key, existing);
  return true;
}

// ── Leaderboard ───────────────────────────────────────────────────────────────

const LEADERBOARD_KEY = "leaderboard";

export async function trackUserRead(
  userId: string,
  userName: string,
  userImage: string,
  postKey: string
): Promise<void> {
  const readsKey = `user_reads:${userId}`;
  // Only count each article once per user
  const alreadyRead = await redis.sismember(readsKey, postKey);
  if (!alreadyRead) {
    await redis.sadd(readsKey, postKey);
    await redis.zincrby(LEADERBOARD_KEY, 1, userId);
    // Store user info separately so name/image updates are reflected
    await redis.hset(`user_info:${userId}`, { name: userName, image: userImage });
  }
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  image: string;
  count: number;
}

export async function getLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  const results = await redis.zrange<string[]>(LEADERBOARD_KEY, 0, limit - 1, {
    rev: true,
    withScores: true,
  });

  const entries: LeaderboardEntry[] = [];
  // zrange with withScores returns [member, score, member, score, ...]
  for (let i = 0; i < results.length; i += 2) {
    const userId = results[i];
    const count = Number(results[i + 1]);
    const info = await redis.hgetall<{ name: string; image: string }>(
      `user_info:${userId}`
    );
    entries.push({
      userId,
      name: info?.name ?? "Anonymous",
      image: info?.image ?? "",
      count,
    });
  }
  return entries;
}
