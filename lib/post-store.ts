import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(file: string, fallback: T): T {
  const p = path.join(DATA_DIR, file);
  try {
    if (!fs.existsSync(p)) return fallback;
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

function writeJson(file: string, data: unknown) {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf-8");
}

// ── Views ────────────────────────────────────────────────────────────────────

export function getViews(postKey: string): number {
  const store = readJson<Record<string, number>>("views.json", {});
  return store[postKey] ?? 0;
}

export function incrementViews(postKey: string): number {
  const store = readJson<Record<string, number>>("views.json", {});
  store[postKey] = (store[postKey] ?? 0) + 1;
  writeJson("views.json", store);
  return store[postKey];
}

// ── Reactions ────────────────────────────────────────────────────────────────

export function getReactions(postKey: string): number {
  const store = readJson<Record<string, number>>("reactions.json", {});
  return store[postKey] ?? 0;
}

export function incrementReactions(postKey: string): number {
  const store = readJson<Record<string, number>>("reactions.json", {});
  store[postKey] = (store[postKey] ?? 0) + 1;
  writeJson("reactions.json", store);
  return store[postKey];
}

export function decrementReactions(postKey: string): number {
  const store = readJson<Record<string, number>>("reactions.json", {});
  store[postKey] = Math.max(0, (store[postKey] ?? 0) - 1);
  writeJson("reactions.json", store);
  return store[postKey];
}

// ── Comments ─────────────────────────────────────────────────────────────────

export interface Comment {
  id: string;
  postKey: string;
  authorId: string;
  authorName: string;
  authorImage: string;
  text: string;
  createdAt: string;
}

export function getComments(postKey: string): Comment[] {
  const store = readJson<Record<string, Comment[]>>("comments.json", {});
  return (store[postKey] ?? []).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addComment(comment: Comment): Comment {
  const store = readJson<Record<string, Comment[]>>("comments.json", {});
  if (!store[comment.postKey]) store[comment.postKey] = [];
  store[comment.postKey].unshift(comment);
  writeJson("comments.json", store);
  return comment;
}

export function deleteComment(postKey: string, commentId: string, userId: string): boolean {
  const store = readJson<Record<string, Comment[]>>("comments.json", {});
  const list = store[postKey] ?? [];
  const idx = list.findIndex((c) => c.id === commentId && c.authorId === userId);
  if (idx === -1) return false;
  list.splice(idx, 1);
  store[postKey] = list;
  writeJson("comments.json", store);
  return true;
}
