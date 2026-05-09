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

// ── Quiz scores ───────────────────────────────────────────────────────────────

const QUIZ_LEADERBOARD_KEY = "quiz_leaderboard";

export async function saveQuizScore(
  userId: string,
  userName: string,
  userImage: string,
  slug: string,
  score: number
): Promise<void> {
  const bestKey = `quiz_best:${userId}:${slug}`;
  const prev = (await redis.get<number>(bestKey)) ?? 0;
  if (score > prev) {
    await redis.set(bestKey, score);
    // Add delta to the global quiz leaderboard
    await redis.zincrby(QUIZ_LEADERBOARD_KEY, score - prev, userId);
    await redis.hset(`user_info:${userId}`, { name: userName, image: userImage });
  }
}

export async function getUserQuizScore(userId: string, slug: string): Promise<number | null> {
  return redis.get<number>(`quiz_best:${userId}:${slug}`);
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
  articlesRead: number;
  quizPoints: number;
}

export async function getLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
  // Collect all unique userIds from both leaderboards
  const [readResults, quizResults] = await Promise.all([
    redis.zrange<string[]>(LEADERBOARD_KEY, 0, limit - 1, { rev: true, withScores: true }),
    redis.zrange<string[]>(QUIZ_LEADERBOARD_KEY, 0, limit - 1, { rev: true, withScores: true }),
  ]);

  const userMap = new Map<string, { articlesRead: number; quizPoints: number }>();

  for (let i = 0; i < readResults.length; i += 2) {
    const uid = readResults[i];
    const score = Number(readResults[i + 1]);
    userMap.set(uid, { articlesRead: score, quizPoints: 0 });
  }
  for (let i = 0; i < quizResults.length; i += 2) {
    const uid = quizResults[i];
    const score = Number(quizResults[i + 1]);
    const existing = userMap.get(uid) ?? { articlesRead: 0, quizPoints: 0 };
    userMap.set(uid, { ...existing, quizPoints: score });
  }

  // Sort by quizPoints desc, then articlesRead desc
  const sorted = [...userMap.entries()].sort((a, b) => {
    const diff = b[1].quizPoints - a[1].quizPoints;
    return diff !== 0 ? diff : b[1].articlesRead - a[1].articlesRead;
  }).slice(0, limit);

  const entries: LeaderboardEntry[] = await Promise.all(
    sorted.map(async ([userId, scores]) => {
      const info = await redis.hgetall<{ name: string; image: string }>(`user_info:${userId}`);
      return {
        userId,
        name: info?.name ?? "Anonymous",
        image: info?.image ?? "",
        articlesRead: scores.articlesRead,
        quizPoints: scores.quizPoints,
      };
    })
  );
  return entries;
}
