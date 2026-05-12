// Curated interview-question bank.
//
// Sources (all publicly reported / widely shared):
//   - LeetCode "Companies" lists & discuss threads
//   - GeeksforGeeks "Interview Experience" archive
//   - Glassdoor, Blind, Reddit r/cscareerquestions, Levels.fyi posts
//   - "Cracking the Coding Interview", "System Design Interview" (Alex Xu vols 1&2),
//     "Designing Data-Intensive Applications", "Grokking" series
//   - Public engineering blogs (Uber, Airbnb, Meta, Netflix, etc.) and conference talks
//
// None of these are NDA-protected internals; they are widely-repeated patterns/prompts.
// Re-phrased to neutral wording where useful.

export type QuestionType = "system-design" | "lld" | "dsa";
export type QuestionDifficulty = "easy" | "medium" | "hard";
export type QuestionFrequency = "low" | "medium" | "high";

export interface InterviewQuestion {
  id: string;
  question: string;
  company: string;
  type: QuestionType;
  difficulty: QuestionDifficulty;
  tags: string[];
  askedFor?: string;
  frequency?: QuestionFrequency;
  note?: string;
}

// Keep alphabetical-ish. New entries: just push to the array.
export const interviewQuestions: InterviewQuestion[] = [
  // ────────────────────────────────────────────────────────────────────
  // GOOGLE
  // ────────────────────────────────────────────────────────────────────
  { id: "google-sd-1", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Search autocomplete (typeahead) — billions of queries/day, sub-100ms latency.", tags: ["trie", "ranking", "caching", "ml-ranking"], askedFor: "L5–L6", frequency: "high", note: "Classic loop question. Expect to discuss data freshness, trie sharding, personalization." },
  { id: "google-sd-2", company: "Google", type: "system-design", difficulty: "hard", question: "Design YouTube — upload, transcode, store, and stream video at planetary scale.", tags: ["video", "cdn", "storage", "transcoding"], askedFor: "L5–L6", frequency: "high" },
  { id: "google-sd-3", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Drive / Dropbox — file sync, dedup, conflict resolution.", tags: ["storage", "sync", "chunking", "dedup"], askedFor: "L5", frequency: "high" },
  { id: "google-sd-4", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Maps — map tiles, ETA, traffic, routing.", tags: ["geo", "graph", "tiles", "routing"], askedFor: "L5–L6", frequency: "medium" },
  { id: "google-sd-5", company: "Google", type: "system-design", difficulty: "hard", question: "Design a web crawler with politeness, dedup, and freshness guarantees.", tags: ["crawler", "queue", "bloom-filter", "dns"], askedFor: "L5", frequency: "high" },
  { id: "google-sd-6", company: "Google", type: "system-design", difficulty: "medium", question: "Design a URL shortener (TinyURL) — billions of links, custom aliases, analytics.", tags: ["hashing", "key-generation", "kv-store"], askedFor: "L4–L5", frequency: "high" },
  { id: "google-sd-7", company: "Google", type: "system-design", difficulty: "hard", question: "Design a global rate limiter — per-user, per-IP, distributed.", tags: ["rate-limit", "redis", "token-bucket"], askedFor: "L5", frequency: "medium" },
  { id: "google-sd-8", company: "Google", type: "system-design", difficulty: "hard", question: "Design Gmail — store, index, search, and deliver email at scale.", tags: ["search", "indexing", "storage"], askedFor: "L5–L6", frequency: "medium" },
  { id: "google-lld-1", company: "Google", type: "lld", difficulty: "medium", question: "Design an in-memory file system with mkdir, addFile, readFile, ls.", tags: ["trees", "design-pattern", "composite"], askedFor: "L4–L5", frequency: "high" },
  { id: "google-lld-2", company: "Google", type: "lld", difficulty: "medium", question: "Design an LRU cache with TTL support — production-quality API.", tags: ["lru", "linked-list", "hashmap"], askedFor: "L4", frequency: "high" },
  { id: "google-lld-3", company: "Google", type: "lld", difficulty: "hard", question: "Design Google Calendar's scheduling/availability engine.", tags: ["intervals", "scheduling"], askedFor: "L5", frequency: "medium" },
  { id: "google-dsa-1", company: "Google", type: "dsa", difficulty: "hard", question: "Number of Islands II — dynamic Union-Find with rank/path compression.", tags: ["union-find", "grid"], askedFor: "L4–L5", frequency: "high" },
  { id: "google-dsa-2", company: "Google", type: "dsa", difficulty: "hard", question: "Word Ladder II — return all shortest transformation sequences.", tags: ["bfs", "backtracking", "graph"], askedFor: "L4–L5", frequency: "high" },
  { id: "google-dsa-3", company: "Google", type: "dsa", difficulty: "medium", question: "Meeting Rooms II — minimum rooms required given intervals.", tags: ["intervals", "heap"], askedFor: "L4", frequency: "high" },
  { id: "google-dsa-4", company: "Google", type: "dsa", difficulty: "hard", question: "Bus Routes — minimum buses to reach target stop (BFS on routes).", tags: ["bfs", "graph"], askedFor: "L4–L5", frequency: "medium" },
  { id: "google-dsa-5", company: "Google", type: "dsa", difficulty: "hard", question: "Decode Ways II — count decodings with '*' wildcard.", tags: ["dp"], askedFor: "L4", frequency: "medium" },
  { id: "google-dsa-6", company: "Google", type: "dsa", difficulty: "medium", question: "Evaluate Division — graph DFS / Union-Find with weights.", tags: ["graph", "dfs", "union-find"], askedFor: "L4", frequency: "high" },
  { id: "google-dsa-7", company: "Google", type: "dsa", difficulty: "medium", question: "Snapshot Array — versioned array with binary-search-on-snapshot.", tags: ["binary-search", "design"], askedFor: "L4–L5", frequency: "medium" },
  { id: "google-dsa-8", company: "Google", type: "dsa", difficulty: "hard", question: "Longest Increasing Path in a Matrix — DFS + memoization.", tags: ["dfs", "memoization", "grid"], askedFor: "L4–L5", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // META (FACEBOOK)
  // ────────────────────────────────────────────────────────────────────
  { id: "meta-sd-1", company: "Meta", type: "system-design", difficulty: "hard", question: "Design the News Feed — ranking, fan-out, push vs pull, edge ranking.", tags: ["feed", "fan-out", "ranking"], askedFor: "E5–E6", frequency: "high", note: "Their flagship SD prompt. Expect deep discussion on push vs pull and feed ranking signals." },
  { id: "meta-sd-2", company: "Meta", type: "system-design", difficulty: "hard", question: "Design Facebook Messenger / WhatsApp — 1:1, group, presence, read receipts.", tags: ["chat", "websocket", "presence"], askedFor: "E5", frequency: "high" },
  { id: "meta-sd-3", company: "Meta", type: "system-design", difficulty: "hard", question: "Design Instagram Stories — TTL content, view tracking, ranking.", tags: ["feed", "ttl", "cdn"], askedFor: "E5", frequency: "high" },
  { id: "meta-sd-4", company: "Meta", type: "system-design", difficulty: "hard", question: "Design a typeahead/search-suggest service for Facebook.", tags: ["trie", "ranking", "cache"], askedFor: "E5", frequency: "medium" },
  { id: "meta-sd-5", company: "Meta", type: "system-design", difficulty: "hard", question: "Design a notification system — push to billions, dedup, batching.", tags: ["notifications", "queue", "fan-out"], askedFor: "E5", frequency: "high" },
  { id: "meta-sd-6", company: "Meta", type: "system-design", difficulty: "hard", question: "Design Facebook Live — broadcast to millions concurrently.", tags: ["streaming", "cdn", "hls"], askedFor: "E5–E6", frequency: "medium" },
  { id: "meta-sd-7", company: "Meta", type: "system-design", difficulty: "medium", question: "Design a privacy-aware photo storage service (Haystack-like).", tags: ["storage", "blobs", "photos"], askedFor: "E5", frequency: "medium" },
  { id: "meta-lld-1", company: "Meta", type: "lld", difficulty: "medium", question: "Design a thread-safe rate limiter (token bucket) in Java/Python.", tags: ["concurrency", "rate-limit"], askedFor: "E5", frequency: "high" },
  { id: "meta-lld-2", company: "Meta", type: "lld", difficulty: "medium", question: "Design a publish-subscribe library (in-memory, multi-topic).", tags: ["pubsub", "observer"], askedFor: "E5", frequency: "medium" },
  { id: "meta-dsa-1", company: "Meta", type: "dsa", difficulty: "medium", question: "Valid Palindrome II — at most one deletion.", tags: ["two-pointers", "string"], askedFor: "E4–E5", frequency: "high" },
  { id: "meta-dsa-2", company: "Meta", type: "dsa", difficulty: "medium", question: "Subarray Sum Equals K — prefix sum + hashmap.", tags: ["prefix-sum", "hashmap"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-3", company: "Meta", type: "dsa", difficulty: "medium", question: "Random Pick with Weight — prefix sum + binary search.", tags: ["binary-search", "prefix-sum"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-4", company: "Meta", type: "dsa", difficulty: "medium", question: "Kth Largest Element in a Stream — min-heap.", tags: ["heap"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-5", company: "Meta", type: "dsa", difficulty: "medium", question: "Binary Tree Vertical Order Traversal — BFS with column index.", tags: ["tree", "bfs"], askedFor: "E4–E5", frequency: "high" },
  { id: "meta-dsa-6", company: "Meta", type: "dsa", difficulty: "hard", question: "Range Sum of BST + iterative variant follow-up.", tags: ["tree", "dfs"], askedFor: "E4", frequency: "medium" },
  { id: "meta-dsa-7", company: "Meta", type: "dsa", difficulty: "hard", question: "Minimum Remove to Make Valid Parentheses.", tags: ["stack", "string"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-8", company: "Meta", type: "dsa", difficulty: "medium", question: "Lowest Common Ancestor of a Binary Tree (no parent pointers).", tags: ["tree", "dfs"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-9", company: "Meta", type: "dsa", difficulty: "hard", question: "Basic Calculator II/III — parser with stack.", tags: ["stack", "parsing"], askedFor: "E4–E5", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // AMAZON
  // ────────────────────────────────────────────────────────────────────
  { id: "amazon-sd-1", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Amazon.com product catalog + search.", tags: ["search", "indexing", "elasticsearch"], askedFor: "SDE-3 / L6", frequency: "high" },
  { id: "amazon-sd-2", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design the shopping cart + checkout pipeline (inventory, payments).", tags: ["transactions", "inventory", "consistency"], askedFor: "SDE-2 / L5", frequency: "high" },
  { id: "amazon-sd-3", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design an order-fulfilment workflow across warehouses.", tags: ["workflow", "queue", "saga"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-sd-4", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Amazon Prime Video streaming.", tags: ["cdn", "drm", "streaming"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "amazon-sd-5", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design a distributed message queue (SQS/Kafka-like).", tags: ["queue", "kafka", "replication"], askedFor: "SDE-3", frequency: "high" },
  { id: "amazon-sd-6", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design an item-recommendation service (people-who-bought).", tags: ["recommendation", "collaborative-filtering"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "amazon-sd-7", company: "Amazon", type: "system-design", difficulty: "medium", question: "Design a flash-sale (Lightning Deal) system for hot inventory.", tags: ["inventory", "lock-free", "queue"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-lld-1", company: "Amazon", type: "lld", difficulty: "medium", question: "Design a Parking Lot — multi-floor, multi-vehicle, ticket + payment.", tags: ["oop", "strategy", "state"], askedFor: "SDE-2", frequency: "high", note: "Most common Amazon LLD." },
  { id: "amazon-lld-2", company: "Amazon", type: "lld", difficulty: "medium", question: "Design Amazon Locker assignment.", tags: ["oop", "strategy"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-lld-3", company: "Amazon", type: "lld", difficulty: "medium", question: "Design an elevator system (multiple cars, scheduling strategy).", tags: ["oop", "state-machine"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-lld-4", company: "Amazon", type: "lld", difficulty: "medium", question: "Design a Library Management System.", tags: ["oop"], askedFor: "SDE-1/2", frequency: "medium" },
  { id: "amazon-dsa-1", company: "Amazon", type: "dsa", difficulty: "easy", question: "Two Sum — classic warm-up.", tags: ["hashmap", "array"], askedFor: "SDE-1", frequency: "high" },
  { id: "amazon-dsa-2", company: "Amazon", type: "dsa", difficulty: "medium", question: "Trapping Rain Water — two pointers or stack.", tags: ["two-pointers", "stack"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-dsa-3", company: "Amazon", type: "dsa", difficulty: "medium", question: "K Closest Points to Origin — heap or quickselect.", tags: ["heap", "quickselect"], askedFor: "SDE-1/2", frequency: "high" },
  { id: "amazon-dsa-4", company: "Amazon", type: "dsa", difficulty: "medium", question: "LRU Cache — implement get/put in O(1).", tags: ["lru", "linked-list", "hashmap"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-dsa-5", company: "Amazon", type: "dsa", difficulty: "medium", question: "Word Ladder — shortest transformation length (BFS).", tags: ["bfs"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-dsa-6", company: "Amazon", type: "dsa", difficulty: "hard", question: "Merge K Sorted Lists — min-heap of heads.", tags: ["heap", "linked-list"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-dsa-7", company: "Amazon", type: "dsa", difficulty: "medium", question: "Number of Islands — DFS/BFS on grid.", tags: ["grid", "dfs", "bfs"], askedFor: "SDE-1/2", frequency: "high" },
  { id: "amazon-dsa-8", company: "Amazon", type: "dsa", difficulty: "medium", question: "Copy List with Random Pointer.", tags: ["linked-list", "hashmap"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-dsa-9", company: "Amazon", type: "dsa", difficulty: "hard", question: "Word Break II — return all sentences.", tags: ["dp", "backtracking"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // MICROSOFT
  // ────────────────────────────────────────────────────────────────────
  { id: "microsoft-sd-1", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design Microsoft Teams chat + meetings (signalling, media).", tags: ["chat", "webrtc", "media"], askedFor: "L63–L65", frequency: "high" },
  { id: "microsoft-sd-2", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design OneDrive (file sync, conflict resolution).", tags: ["sync", "storage"], askedFor: "L62–L64", frequency: "medium" },
  { id: "microsoft-sd-3", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design Bing/Search index pipeline.", tags: ["search", "indexing"], askedFor: "L63+", frequency: "medium" },
  { id: "microsoft-sd-4", company: "Microsoft", type: "system-design", difficulty: "medium", question: "Design a calendar/scheduling service (Outlook).", tags: ["scheduling", "calendar"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-sd-5", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design Azure Blob Storage.", tags: ["storage", "replication", "erasure-coding"], askedFor: "L64+", frequency: "medium" },
  { id: "microsoft-lld-1", company: "Microsoft", type: "lld", difficulty: "medium", question: "Design Snake & Ladder game.", tags: ["oop"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-lld-2", company: "Microsoft", type: "lld", difficulty: "medium", question: "Design a chess engine API (legal moves, board state).", tags: ["oop", "strategy"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-dsa-1", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Serialize and Deserialize Binary Tree.", tags: ["tree", "design"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-dsa-2", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Reverse Linked List in Groups of K.", tags: ["linked-list"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-dsa-3", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Spiral Matrix traversal.", tags: ["matrix"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-dsa-4", company: "Microsoft", type: "dsa", difficulty: "hard", question: "Median of Two Sorted Arrays — O(log(min(m,n))).", tags: ["binary-search"], askedFor: "L63", frequency: "medium" },
  { id: "microsoft-dsa-5", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Implement Trie (insert, search, startsWith).", tags: ["trie"], askedFor: "L62", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // APPLE
  // ────────────────────────────────────────────────────────────────────
  { id: "apple-sd-1", company: "Apple", type: "system-design", difficulty: "hard", question: "Design iMessage with E2E encryption + multi-device sync.", tags: ["chat", "e2ee", "sync"], askedFor: "ICT4–ICT5", frequency: "high" },
  { id: "apple-sd-2", company: "Apple", type: "system-design", difficulty: "hard", question: "Design Apple Push Notification Service (APNs).", tags: ["push", "fan-out", "tls"], askedFor: "ICT4", frequency: "medium" },
  { id: "apple-sd-3", company: "Apple", type: "system-design", difficulty: "hard", question: "Design iCloud Photos backup + sync.", tags: ["sync", "storage", "dedup"], askedFor: "ICT4", frequency: "medium" },
  { id: "apple-sd-4", company: "Apple", type: "system-design", difficulty: "medium", question: "Design a music-streaming service (Apple Music).", tags: ["streaming", "cdn"], askedFor: "ICT4", frequency: "medium" },
  { id: "apple-lld-1", company: "Apple", type: "lld", difficulty: "medium", question: "Design a Vending Machine — state machine + payment.", tags: ["state-machine", "oop"], askedFor: "ICT3", frequency: "high" },
  { id: "apple-lld-2", company: "Apple", type: "lld", difficulty: "medium", question: "Design a Music Player (queue, shuffle, repeat).", tags: ["oop", "queue"], askedFor: "ICT3", frequency: "medium" },
  { id: "apple-dsa-1", company: "Apple", type: "dsa", difficulty: "medium", question: "Validate Binary Search Tree.", tags: ["tree", "dfs"], askedFor: "ICT3", frequency: "high" },
  { id: "apple-dsa-2", company: "Apple", type: "dsa", difficulty: "medium", question: "Longest Substring Without Repeating Characters.", tags: ["sliding-window"], askedFor: "ICT3", frequency: "high" },
  { id: "apple-dsa-3", company: "Apple", type: "dsa", difficulty: "medium", question: "Implement a circular queue / deque from scratch.", tags: ["queue", "design"], askedFor: "ICT3", frequency: "medium" },
  { id: "apple-dsa-4", company: "Apple", type: "dsa", difficulty: "hard", question: "Sliding Window Maximum — monotonic deque.", tags: ["sliding-window", "deque"], askedFor: "ICT4", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // NETFLIX
  // ────────────────────────────────────────────────────────────────────
  { id: "netflix-sd-1", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design Netflix video streaming — encoding, CDN, adaptive bitrate.", tags: ["cdn", "hls", "dash", "encoding"], askedFor: "Senior SWE", frequency: "high" },
  { id: "netflix-sd-2", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design the recommendation/ranking system.", tags: ["ml", "ranking", "personalization"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-sd-3", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design a global content metadata service (KV at scale).", tags: ["kv-store", "replication"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-sd-4", company: "Netflix", type: "system-design", difficulty: "medium", question: "Design A/B testing platform.", tags: ["experimentation", "metrics"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-dsa-1", company: "Netflix", type: "dsa", difficulty: "medium", question: "Top K Frequent Elements.", tags: ["heap", "bucket-sort"], askedFor: "Senior", frequency: "high" },
  { id: "netflix-dsa-2", company: "Netflix", type: "dsa", difficulty: "medium", question: "Design TinyURL (encode/decode).", tags: ["design", "hashing"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-dsa-3", company: "Netflix", type: "dsa", difficulty: "hard", question: "Find Median from Data Stream (two heaps).", tags: ["heap", "design"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // UBER
  // ────────────────────────────────────────────────────────────────────
  { id: "uber-sd-1", company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber — rider/driver matching, ETA, surge.", tags: ["geo", "matching", "real-time"], askedFor: "L5", frequency: "high" },
  { id: "uber-sd-2", company: "Uber", type: "system-design", difficulty: "hard", question: "Design a geo-spatial index for nearby-drivers query.", tags: ["geo", "quadtree", "geohash"], askedFor: "L5", frequency: "high" },
  { id: "uber-sd-3", company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber Eats / food delivery system.", tags: ["matching", "geo", "workflow"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-4", company: "Uber", type: "system-design", difficulty: "hard", question: "Design a payments/payouts ledger.", tags: ["ledger", "consistency", "double-entry"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-5", company: "Uber", type: "system-design", difficulty: "medium", question: "Design distributed surge pricing computation.", tags: ["pricing", "stream"], askedFor: "L5", frequency: "medium" },
  { id: "uber-lld-1", company: "Uber", type: "lld", difficulty: "medium", question: "Design a Cab Booking app (entities, state, strategy).", tags: ["oop", "strategy", "state"], askedFor: "L4–L5", frequency: "high" },
  { id: "uber-lld-2", company: "Uber", type: "lld", difficulty: "medium", question: "Design Splitwise — expense splitting + simplify debts.", tags: ["graph", "oop"], askedFor: "L4–L5", frequency: "high" },
  { id: "uber-dsa-1", company: "Uber", type: "dsa", difficulty: "medium", question: "Design Hit Counter (last 5 min).", tags: ["queue", "design"], askedFor: "L4", frequency: "high" },
  { id: "uber-dsa-2", company: "Uber", type: "dsa", difficulty: "medium", question: "Time-based Key-Value Store.", tags: ["binary-search", "design"], askedFor: "L4", frequency: "high" },
  { id: "uber-dsa-3", company: "Uber", type: "dsa", difficulty: "hard", question: "Alien Dictionary — topological sort.", tags: ["graph", "topo-sort"], askedFor: "L5", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // AIRBNB
  // ────────────────────────────────────────────────────────────────────
  { id: "airbnb-sd-1", company: "Airbnb", type: "system-design", difficulty: "hard", question: "Design Airbnb — listings, search by date/location, booking with concurrency.", tags: ["search", "geo", "booking", "consistency"], askedFor: "Senior SWE", frequency: "high" },
  { id: "airbnb-sd-2", company: "Airbnb", type: "system-design", difficulty: "hard", question: "Design a search/filter ranking pipeline for listings.", tags: ["search", "ranking"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-sd-3", company: "Airbnb", type: "system-design", difficulty: "medium", question: "Design a review + rating system with abuse detection.", tags: ["moderation", "ranking"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-lld-1", company: "Airbnb", type: "lld", difficulty: "medium", question: "Design a Hotel/Room booking system (no double-bookings).", tags: ["oop", "concurrency"], askedFor: "Senior", frequency: "high" },
  { id: "airbnb-dsa-1", company: "Airbnb", type: "dsa", difficulty: "medium", question: "Pour Water — simulation problem.", tags: ["simulation"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-dsa-2", company: "Airbnb", type: "dsa", difficulty: "medium", question: "Regular Expression Matching — DP.", tags: ["dp", "string"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-dsa-3", company: "Airbnb", type: "dsa", difficulty: "medium", question: "Boggle / Word Search II — Trie + DFS.", tags: ["trie", "dfs"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // LINKEDIN
  // ────────────────────────────────────────────────────────────────────
  { id: "linkedin-sd-1", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn Feed + connection graph.", tags: ["feed", "graph", "fan-out"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-sd-2", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design 'People You May Know' recommendation.", tags: ["graph", "recommendation"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-sd-3", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design a distributed real-time messaging system.", tags: ["chat", "kafka", "websocket"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-lld-1", company: "LinkedIn", type: "lld", difficulty: "medium", question: "Design a Job Board posting + application system.", tags: ["oop"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-1", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Maximum Product Subarray.", tags: ["dp", "array"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-dsa-2", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Permutation in String (sliding window).", tags: ["sliding-window"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-3", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Implement a custom HashMap.", tags: ["design", "hashmap"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // TWITTER / X
  // ────────────────────────────────────────────────────────────────────
  { id: "twitter-sd-1", company: "Twitter / X", type: "system-design", difficulty: "hard", question: "Design Twitter — timeline (home + user), follow graph, fan-out.", tags: ["feed", "fan-out", "graph"], askedFor: "Senior", frequency: "high" },
  { id: "twitter-sd-2", company: "Twitter / X", type: "system-design", difficulty: "hard", question: "Design trending hashtags (top-K over a stream).", tags: ["stream", "top-k", "count-min"], askedFor: "Senior", frequency: "high" },
  { id: "twitter-sd-3", company: "Twitter / X", type: "system-design", difficulty: "medium", question: "Design tweet search.", tags: ["search", "elasticsearch"], askedFor: "Senior", frequency: "medium" },
  { id: "twitter-dsa-1", company: "Twitter / X", type: "dsa", difficulty: "medium", question: "Design Twitter (data structure problem — postTweet/getNewsFeed).", tags: ["design", "heap"], askedFor: "Mid–Senior", frequency: "high" },
  { id: "twitter-dsa-2", company: "Twitter / X", type: "dsa", difficulty: "hard", question: "Find Median from Data Stream.", tags: ["heap", "design"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // STRIPE
  // ────────────────────────────────────────────────────────────────────
  { id: "stripe-sd-1", company: "Stripe", type: "system-design", difficulty: "hard", question: "Design an idempotent payment API.", tags: ["payments", "idempotency", "consistency"], askedFor: "L3–L4 (Stripe)", frequency: "high", note: "Idempotency keys + dedup are the core of the answer." },
  { id: "stripe-sd-2", company: "Stripe", type: "system-design", difficulty: "hard", question: "Design a webhook delivery system with retries + dedup.", tags: ["webhook", "queue", "retry"], askedFor: "L3", frequency: "high" },
  { id: "stripe-sd-3", company: "Stripe", type: "system-design", difficulty: "hard", question: "Design a double-entry ledger.", tags: ["ledger", "consistency"], askedFor: "L3–L4", frequency: "medium" },
  { id: "stripe-sd-4", company: "Stripe", type: "system-design", difficulty: "medium", question: "Design a rate limiter for an API gateway.", tags: ["rate-limit", "redis"], askedFor: "L3", frequency: "high" },
  { id: "stripe-lld-1", company: "Stripe", type: "lld", difficulty: "medium", question: "Implement a retry-with-exponential-backoff library.", tags: ["concurrency", "retry"], askedFor: "L3", frequency: "high" },
  { id: "stripe-lld-2", company: "Stripe", type: "lld", difficulty: "medium", question: "Implement an in-memory key-value store with TTL + LRU.", tags: ["cache", "ttl", "lru"], askedFor: "L3", frequency: "medium" },
  { id: "stripe-dsa-1", company: "Stripe", type: "dsa", difficulty: "medium", question: "Currency conversion via graph (cycle detection + path).", tags: ["graph", "dfs"], askedFor: "L3", frequency: "high", note: "Reportedly Stripe's signature DSA prompt." },
  { id: "stripe-dsa-2", company: "Stripe", type: "dsa", difficulty: "medium", question: "Parse and evaluate a balanced-paren expression.", tags: ["stack", "parsing"], askedFor: "L3", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ATLASSIAN
  // ────────────────────────────────────────────────────────────────────
  { id: "atlassian-sd-1", company: "Atlassian", type: "system-design", difficulty: "hard", question: "Design Jira — projects, issues, workflow, permissions.", tags: ["workflow", "rbac", "search"], askedFor: "P50–P60", frequency: "high" },
  { id: "atlassian-sd-2", company: "Atlassian", type: "system-design", difficulty: "hard", question: "Design Confluence — collaborative document editing.", tags: ["crdt", "ot", "collaboration"], askedFor: "P50", frequency: "medium" },
  { id: "atlassian-sd-3", company: "Atlassian", type: "system-design", difficulty: "medium", question: "Design a notification + email digest service.", tags: ["notifications", "queue"], askedFor: "P50", frequency: "medium" },
  { id: "atlassian-lld-1", company: "Atlassian", type: "lld", difficulty: "medium", question: "Design a task scheduler (cron-like) with retries.", tags: ["scheduler", "queue"], askedFor: "P50", frequency: "high" },
  { id: "atlassian-lld-2", company: "Atlassian", type: "lld", difficulty: "medium", question: "Design Logger Rate Limiter.", tags: ["rate-limit"], askedFor: "P40–P50", frequency: "medium" },
  { id: "atlassian-dsa-1", company: "Atlassian", type: "dsa", difficulty: "medium", question: "Course Schedule II — topological sort.", tags: ["graph", "topo-sort"], askedFor: "P50", frequency: "high" },
  { id: "atlassian-dsa-2", company: "Atlassian", type: "dsa", difficulty: "medium", question: "Design a Hit Counter with sliding window.", tags: ["sliding-window", "design"], askedFor: "P50", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SALESFORCE
  // ────────────────────────────────────────────────────────────────────
  { id: "sfdc-sd-1", company: "Salesforce", type: "system-design", difficulty: "hard", question: "Design a multi-tenant SaaS platform with metadata-driven schemas.", tags: ["multi-tenant", "metadata"], askedFor: "MTS–LMTS", frequency: "high" },
  { id: "sfdc-sd-2", company: "Salesforce", type: "system-design", difficulty: "hard", question: "Design a workflow/automation engine (Process Builder-like).", tags: ["workflow", "rules"], askedFor: "MTS+", frequency: "medium" },
  { id: "sfdc-lld-1", company: "Salesforce", type: "lld", difficulty: "medium", question: "Design a rule engine evaluating boolean expressions.", tags: ["interpreter", "oop"], askedFor: "MTS", frequency: "medium" },
  { id: "sfdc-dsa-1", company: "Salesforce", type: "dsa", difficulty: "medium", question: "Group Anagrams.", tags: ["hashmap", "string"], askedFor: "MTS", frequency: "high" },
  { id: "sfdc-dsa-2", company: "Salesforce", type: "dsa", difficulty: "medium", question: "Rotting Oranges — multi-source BFS.", tags: ["bfs", "grid"], askedFor: "MTS", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // ADOBE
  // ────────────────────────────────────────────────────────────────────
  { id: "adobe-sd-1", company: "Adobe", type: "system-design", difficulty: "hard", question: "Design Adobe Creative Cloud file sync.", tags: ["sync", "storage"], askedFor: "MTS", frequency: "medium" },
  { id: "adobe-sd-2", company: "Adobe", type: "system-design", difficulty: "medium", question: "Design a font/asset CDN.", tags: ["cdn"], askedFor: "MTS", frequency: "low" },
  { id: "adobe-lld-1", company: "Adobe", type: "lld", difficulty: "medium", question: "Design a Snake game (collisions, food, state).", tags: ["oop", "state"], askedFor: "MTS", frequency: "medium" },
  { id: "adobe-dsa-1", company: "Adobe", type: "dsa", difficulty: "medium", question: "Find Peak Element (binary search).", tags: ["binary-search"], askedFor: "MTS", frequency: "high" },
  { id: "adobe-dsa-2", company: "Adobe", type: "dsa", difficulty: "medium", question: "Reverse Nodes in K-Group.", tags: ["linked-list"], askedFor: "MTS", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // ORACLE
  // ────────────────────────────────────────────────────────────────────
  { id: "oracle-sd-1", company: "Oracle", type: "system-design", difficulty: "hard", question: "Design a distributed relational database (OLTP).", tags: ["db", "consensus", "replication"], askedFor: "IC4–IC5", frequency: "medium" },
  { id: "oracle-lld-1", company: "Oracle", type: "lld", difficulty: "medium", question: "Design a BlockingQueue from scratch (no java.util.concurrent).", tags: ["concurrency"], askedFor: "IC4", frequency: "medium" },
  { id: "oracle-dsa-1", company: "Oracle", type: "dsa", difficulty: "medium", question: "Implement strStr() / KMP.", tags: ["string", "kmp"], askedFor: "IC4", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // BLOOMBERG
  // ────────────────────────────────────────────────────────────────────
  { id: "bb-sd-1", company: "Bloomberg", type: "system-design", difficulty: "hard", question: "Design a real-time stock-price subscription service.", tags: ["pubsub", "streaming", "fan-out"], askedFor: "Senior", frequency: "high" },
  { id: "bb-sd-2", company: "Bloomberg", type: "system-design", difficulty: "hard", question: "Design a news/feed aggregation with low-latency push.", tags: ["feed", "kafka"], askedFor: "Senior", frequency: "medium" },
  { id: "bb-lld-1", company: "Bloomberg", type: "lld", difficulty: "medium", question: "Design an Order Matching Engine (limit + market orders).", tags: ["oop", "data-structures"], askedFor: "Senior", frequency: "high" },
  { id: "bb-dsa-1", company: "Bloomberg", type: "dsa", difficulty: "medium", question: "Flatten a Nested List Iterator.", tags: ["iterator", "design"], askedFor: "Senior", frequency: "high" },
  { id: "bb-dsa-2", company: "Bloomberg", type: "dsa", difficulty: "medium", question: "Encode and Decode Strings.", tags: ["string", "design"], askedFor: "Senior", frequency: "high" },
  { id: "bb-dsa-3", company: "Bloomberg", type: "dsa", difficulty: "medium", question: "Longest Consecutive Sequence.", tags: ["hashmap", "union-find"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // BYTEDANCE / TIKTOK
  // ────────────────────────────────────────────────────────────────────
  { id: "bytedance-sd-1", company: "ByteDance / TikTok", type: "system-design", difficulty: "hard", question: "Design TikTok feed with ML-driven ranking and infinite scroll.", tags: ["feed", "ml", "ranking"], askedFor: "Senior", frequency: "high" },
  { id: "bytedance-sd-2", company: "ByteDance / TikTok", type: "system-design", difficulty: "hard", question: "Design short-video upload + encoding pipeline.", tags: ["video", "queue", "transcoding"], askedFor: "Senior", frequency: "medium" },
  { id: "bytedance-dsa-1", company: "ByteDance / TikTok", type: "dsa", difficulty: "medium", question: "LFU Cache.", tags: ["cache", "design"], askedFor: "Senior", frequency: "high" },
  { id: "bytedance-dsa-2", company: "ByteDance / TikTok", type: "dsa", difficulty: "hard", question: "Maximum Frequency Stack.", tags: ["stack", "design"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SNOWFLAKE
  // ────────────────────────────────────────────────────────────────────
  { id: "snowflake-sd-1", company: "Snowflake", type: "system-design", difficulty: "hard", question: "Design a query-planning + execution layer for an analytical DB.", tags: ["db", "olap", "query-planner"], askedFor: "Senior", frequency: "medium" },
  { id: "snowflake-dsa-1", company: "Snowflake", type: "dsa", difficulty: "medium", question: "Range Sum Query — 2D Immutable (prefix sum).", tags: ["prefix-sum"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // DATABRICKS
  // ────────────────────────────────────────────────────────────────────
  { id: "databricks-sd-1", company: "Databricks", type: "system-design", difficulty: "hard", question: "Design a job scheduler for Spark clusters (multi-tenant).", tags: ["scheduler", "cluster"], askedFor: "Senior", frequency: "medium" },
  { id: "databricks-sd-2", company: "Databricks", type: "system-design", difficulty: "hard", question: "Design a Delta Lake-style transactional layer over object storage.", tags: ["acid", "storage", "lakehouse"], askedFor: "Senior", frequency: "medium" },
  { id: "databricks-dsa-1", company: "Databricks", type: "dsa", difficulty: "hard", question: "Sliding Window Median.", tags: ["sliding-window", "heap", "ordered-set"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // CLOUDFLARE
  // ────────────────────────────────────────────────────────────────────
  { id: "cloudflare-sd-1", company: "Cloudflare", type: "system-design", difficulty: "hard", question: "Design a global DNS + CDN edge.", tags: ["dns", "cdn", "anycast"], askedFor: "Senior", frequency: "high" },
  { id: "cloudflare-sd-2", company: "Cloudflare", type: "system-design", difficulty: "hard", question: "Design a DDoS-mitigation service.", tags: ["security", "rate-limit"], askedFor: "Senior", frequency: "medium" },
  { id: "cloudflare-dsa-1", company: "Cloudflare", type: "dsa", difficulty: "medium", question: "Design a TTL-aware concurrent hash table.", tags: ["concurrency", "design"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // DROPBOX
  // ────────────────────────────────────────────────────────────────────
  { id: "dropbox-sd-1", company: "Dropbox", type: "system-design", difficulty: "hard", question: "Design Dropbox — chunking, dedup, sync, conflict resolution.", tags: ["sync", "chunking", "dedup"], askedFor: "IC3–IC4", frequency: "high" },
  { id: "dropbox-sd-2", company: "Dropbox", type: "system-design", difficulty: "medium", question: "Design a file-sharing link service.", tags: ["sharing", "auth"], askedFor: "IC3", frequency: "medium" },
  { id: "dropbox-dsa-1", company: "Dropbox", type: "dsa", difficulty: "medium", question: "Find Duplicate Files in a Filesystem.", tags: ["hashmap", "filesystem"], askedFor: "IC3", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // PINTEREST
  // ────────────────────────────────────────────────────────────────────
  { id: "pinterest-sd-1", company: "Pinterest", type: "system-design", difficulty: "hard", question: "Design a pin/board feed with visual search.", tags: ["feed", "search", "ml"], askedFor: "Senior", frequency: "medium" },
  { id: "pinterest-dsa-1", company: "Pinterest", type: "dsa", difficulty: "medium", question: "Course Schedule (cycle detection).", tags: ["graph"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // SLACK
  // ────────────────────────────────────────────────────────────────────
  { id: "slack-sd-1", company: "Slack", type: "system-design", difficulty: "hard", question: "Design Slack — channels, real-time messages, search.", tags: ["chat", "websocket", "search"], askedFor: "Senior", frequency: "high" },
  { id: "slack-sd-2", company: "Slack", type: "system-design", difficulty: "medium", question: "Design Slack message search across workspaces.", tags: ["search", "indexing"], askedFor: "Senior", frequency: "medium" },
  { id: "slack-dsa-1", company: "Slack", type: "dsa", difficulty: "medium", question: "Design In-Memory File System.", tags: ["trie", "design"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ZOOM
  // ────────────────────────────────────────────────────────────────────
  { id: "zoom-sd-1", company: "Zoom", type: "system-design", difficulty: "hard", question: "Design Zoom — video conferencing for 1000+ participants.", tags: ["webrtc", "sfu", "media"], askedFor: "Senior", frequency: "high" },
  { id: "zoom-sd-2", company: "Zoom", type: "system-design", difficulty: "medium", question: "Design webinar broadcast (one-to-many).", tags: ["streaming"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // DOORDASH
  // ────────────────────────────────────────────────────────────────────
  { id: "doordash-sd-1", company: "DoorDash", type: "system-design", difficulty: "hard", question: "Design DoorDash — courier/restaurant/customer matching.", tags: ["matching", "geo"], askedFor: "Senior", frequency: "high" },
  { id: "doordash-sd-2", company: "DoorDash", type: "system-design", difficulty: "medium", question: "Design real-time delivery tracking.", tags: ["geo", "websocket"], askedFor: "Senior", frequency: "medium" },
  { id: "doordash-dsa-1", company: "DoorDash", type: "dsa", difficulty: "medium", question: "Asteroid Collision (stack).", tags: ["stack"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // LYFT
  // ────────────────────────────────────────────────────────────────────
  { id: "lyft-sd-1", company: "Lyft", type: "system-design", difficulty: "hard", question: "Design a ride-matching service.", tags: ["geo", "matching"], askedFor: "Senior", frequency: "medium" },
  { id: "lyft-dsa-1", company: "Lyft", type: "dsa", difficulty: "medium", question: "Design Tic-Tac-Toe (incremental).", tags: ["design"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // COINBASE
  // ────────────────────────────────────────────────────────────────────
  { id: "coinbase-sd-1", company: "Coinbase", type: "system-design", difficulty: "hard", question: "Design a crypto trading exchange (matching engine + ledger).", tags: ["matching-engine", "ledger"], askedFor: "L4–L5", frequency: "high" },
  { id: "coinbase-sd-2", company: "Coinbase", type: "system-design", difficulty: "medium", question: "Design a wallet system with custody + cold storage.", tags: ["security", "wallet"], askedFor: "L4", frequency: "medium" },
  { id: "coinbase-lld-1", company: "Coinbase", type: "lld", difficulty: "medium", question: "Design an order book (limit/market) data structure.", tags: ["oop", "data-structures"], askedFor: "L4", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // PAYPAL
  // ────────────────────────────────────────────────────────────────────
  { id: "paypal-sd-1", company: "PayPal", type: "system-design", difficulty: "hard", question: "Design a peer-to-peer money-transfer system.", tags: ["payments", "ledger"], askedFor: "MTS", frequency: "high" },
  { id: "paypal-sd-2", company: "PayPal", type: "system-design", difficulty: "medium", question: "Design fraud detection pipeline.", tags: ["stream", "ml"], askedFor: "MTS", frequency: "medium" },
  { id: "paypal-dsa-1", company: "PayPal", type: "dsa", difficulty: "medium", question: "Add Two Numbers (linked list).", tags: ["linked-list"], askedFor: "MTS", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // SHOPIFY
  // ────────────────────────────────────────────────────────────────────
  { id: "shopify-sd-1", company: "Shopify", type: "system-design", difficulty: "hard", question: "Design a checkout system handling Black-Friday-scale spikes.", tags: ["checkout", "queue", "scaling"], askedFor: "Senior", frequency: "high" },
  { id: "shopify-sd-2", company: "Shopify", type: "system-design", difficulty: "medium", question: "Design a multi-tenant storefront platform.", tags: ["multi-tenant"], askedFor: "Senior", frequency: "medium" },
  { id: "shopify-dsa-1", company: "Shopify", type: "dsa", difficulty: "medium", question: "Best Time to Buy and Sell Stock with Cooldown.", tags: ["dp"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // FLIPKART
  // ────────────────────────────────────────────────────────────────────
  { id: "flipkart-sd-1", company: "Flipkart", type: "system-design", difficulty: "hard", question: "Design Flipkart Big Billion Day flash sale.", tags: ["inventory", "queue", "scaling"], askedFor: "SDE-3", frequency: "high" },
  { id: "flipkart-sd-2", company: "Flipkart", type: "system-design", difficulty: "hard", question: "Design Flipkart product search + filters.", tags: ["search", "elasticsearch"], askedFor: "SDE-2/3", frequency: "high" },
  { id: "flipkart-sd-3", company: "Flipkart", type: "system-design", difficulty: "hard", question: "Design the order-management system across warehouses.", tags: ["workflow", "inventory"], askedFor: "SDE-3", frequency: "medium" },
  { id: "flipkart-lld-1", company: "Flipkart", type: "lld", difficulty: "medium", question: "Design BookMyShow / movie ticket booking (seat lock).", tags: ["oop", "concurrency"], askedFor: "SDE-2", frequency: "high" },
  { id: "flipkart-lld-2", company: "Flipkart", type: "lld", difficulty: "medium", question: "Design Notification Service with multiple channels.", tags: ["strategy", "queue"], askedFor: "SDE-2", frequency: "medium" },
  { id: "flipkart-dsa-1", company: "Flipkart", type: "dsa", difficulty: "medium", question: "Min Stack — O(1) getMin.", tags: ["stack"], askedFor: "SDE-1/2", frequency: "high" },
  { id: "flipkart-dsa-2", company: "Flipkart", type: "dsa", difficulty: "medium", question: "Maximum of all subarrays of size K.", tags: ["sliding-window", "deque"], askedFor: "SDE-2", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // RAZORPAY
  // ────────────────────────────────────────────────────────────────────
  { id: "razorpay-sd-1", company: "Razorpay", type: "system-design", difficulty: "hard", question: "Design a payment gateway with multiple PSPs and retries.", tags: ["payments", "idempotency"], askedFor: "SDE-3", frequency: "high" },
  { id: "razorpay-sd-2", company: "Razorpay", type: "system-design", difficulty: "hard", question: "Design a webhook delivery system (retries, ordering).", tags: ["webhook", "queue"], askedFor: "SDE-2/3", frequency: "high" },
  { id: "razorpay-lld-1", company: "Razorpay", type: "lld", difficulty: "medium", question: "Design a Payment Gateway Java API.", tags: ["oop", "strategy"], askedFor: "SDE-2", frequency: "high" },
  { id: "razorpay-lld-2", company: "Razorpay", type: "lld", difficulty: "medium", question: "Design a Rate Limiter with multiple algorithms.", tags: ["rate-limit", "strategy"], askedFor: "SDE-2", frequency: "high" },
  { id: "razorpay-dsa-1", company: "Razorpay", type: "dsa", difficulty: "medium", question: "Detect a cycle in a directed graph.", tags: ["graph", "dfs"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SWIGGY
  // ────────────────────────────────────────────────────────────────────
  { id: "swiggy-sd-1", company: "Swiggy", type: "system-design", difficulty: "hard", question: "Design Swiggy — restaurant discovery, ordering, delivery matching.", tags: ["geo", "matching", "workflow"], askedFor: "SDE-3", frequency: "high" },
  { id: "swiggy-sd-2", company: "Swiggy", type: "system-design", difficulty: "hard", question: "Design dynamic ETA service for food delivery.", tags: ["ml", "geo"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "swiggy-lld-1", company: "Swiggy", type: "lld", difficulty: "medium", question: "Design a Food Delivery app (entities + state).", tags: ["oop", "state-machine"], askedFor: "SDE-2", frequency: "high" },
  { id: "swiggy-dsa-1", company: "Swiggy", type: "dsa", difficulty: "medium", question: "Find nearest K restaurants (heap + geohash).", tags: ["heap", "geo"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ZOMATO
  // ────────────────────────────────────────────────────────────────────
  { id: "zomato-sd-1", company: "Zomato", type: "system-design", difficulty: "hard", question: "Design Zomato — restaurant search + ordering + reviews.", tags: ["search", "ranking"], askedFor: "SDE-2/3", frequency: "high" },
  { id: "zomato-lld-1", company: "Zomato", type: "lld", difficulty: "medium", question: "Design a Review/Rating system with abuse detection.", tags: ["oop"], askedFor: "SDE-2", frequency: "medium" },
  { id: "zomato-dsa-1", company: "Zomato", type: "dsa", difficulty: "medium", question: "Top K Most Frequent Items.", tags: ["heap", "hashmap"], askedFor: "SDE-2", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // PHONEPE
  // ────────────────────────────────────────────────────────────────────
  { id: "phonepe-sd-1", company: "PhonePe", type: "system-design", difficulty: "hard", question: "Design a UPI payment processing system.", tags: ["payments", "upi", "idempotency"], askedFor: "SDE-3", frequency: "high" },
  { id: "phonepe-sd-2", company: "PhonePe", type: "system-design", difficulty: "hard", question: "Design a wallet (balance, transactions, settlements).", tags: ["ledger", "wallet"], askedFor: "SDE-2/3", frequency: "high" },
  { id: "phonepe-lld-1", company: "PhonePe", type: "lld", difficulty: "medium", question: "Design Splitwise — group expense splitting.", tags: ["oop", "graph"], askedFor: "SDE-2", frequency: "high" },
  { id: "phonepe-dsa-1", company: "PhonePe", type: "dsa", difficulty: "medium", question: "Minimum cash flow among friends (simplify debts).", tags: ["graph", "greedy"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // PAYTM
  // ────────────────────────────────────────────────────────────────────
  { id: "paytm-sd-1", company: "Paytm", type: "system-design", difficulty: "hard", question: "Design a digital wallet + KYC pipeline.", tags: ["wallet", "kyc"], askedFor: "SDE-2/3", frequency: "high" },
  { id: "paytm-lld-1", company: "Paytm", type: "lld", difficulty: "medium", question: "Design a movie ticket booking system.", tags: ["oop", "concurrency"], askedFor: "SDE-2", frequency: "high" },
  { id: "paytm-dsa-1", company: "Paytm", type: "dsa", difficulty: "medium", question: "Stock Buy-Sell with at most K transactions.", tags: ["dp"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // CRED
  // ────────────────────────────────────────────────────────────────────
  { id: "cred-sd-1", company: "CRED", type: "system-design", difficulty: "hard", question: "Design a credit-card-bill rewards/coin engine.", tags: ["rewards", "ledger"], askedFor: "Senior SDE", frequency: "high" },
  { id: "cred-lld-1", company: "CRED", type: "lld", difficulty: "medium", question: "Design a coupon/discount engine.", tags: ["oop", "strategy"], askedFor: "Senior SDE", frequency: "high" },
  { id: "cred-dsa-1", company: "CRED", type: "dsa", difficulty: "medium", question: "Implement an LRU + LFU hybrid cache.", tags: ["cache", "design"], askedFor: "Senior SDE", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ZERODHA
  // ────────────────────────────────────────────────────────────────────
  { id: "zerodha-sd-1", company: "Zerodha", type: "system-design", difficulty: "hard", question: "Design an equities trading platform (orders, positions, P&L).", tags: ["trading", "ledger"], askedFor: "Senior", frequency: "medium" },
  { id: "zerodha-lld-1", company: "Zerodha", type: "lld", difficulty: "medium", question: "Design an order book.", tags: ["oop"], askedFor: "Senior", frequency: "high" },
  { id: "zerodha-dsa-1", company: "Zerodha", type: "dsa", difficulty: "medium", question: "Stock Span problem (monotonic stack).", tags: ["stack"], askedFor: "Mid", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // MEESHO
  // ────────────────────────────────────────────────────────────────────
  { id: "meesho-sd-1", company: "Meesho", type: "system-design", difficulty: "hard", question: "Design a social-commerce feed for resellers.", tags: ["feed", "commerce"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "meesho-lld-1", company: "Meesho", type: "lld", difficulty: "medium", question: "Design a Catalog/Inventory service.", tags: ["oop"], askedFor: "SDE-2", frequency: "medium" },
  { id: "meesho-dsa-1", company: "Meesho", type: "dsa", difficulty: "medium", question: "Subset Sum / 0-1 Knapsack.", tags: ["dp"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // DREAM11
  // ────────────────────────────────────────────────────────────────────
  { id: "dream11-sd-1", company: "Dream11", type: "system-design", difficulty: "hard", question: "Design Dream11 — fantasy sports with live leaderboards.", tags: ["leaderboard", "real-time", "scaling"], askedFor: "Senior", frequency: "high" },
  { id: "dream11-lld-1", company: "Dream11", type: "lld", difficulty: "medium", question: "Design a leaderboard (top-K + ranks).", tags: ["heap", "design"], askedFor: "Senior", frequency: "high" },
  { id: "dream11-dsa-1", company: "Dream11", type: "dsa", difficulty: "medium", question: "K-th Largest in Stream (heap).", tags: ["heap"], askedFor: "Mid", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // MYNTRA
  // ────────────────────────────────────────────────────────────────────
  { id: "myntra-sd-1", company: "Myntra", type: "system-design", difficulty: "hard", question: "Design an end-of-reason-sale (EORS) inventory + cart system.", tags: ["inventory", "scaling"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "myntra-lld-1", company: "Myntra", type: "lld", difficulty: "medium", question: "Design Cart + Coupon application engine.", tags: ["oop", "strategy"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // WALMART LABS
  // ────────────────────────────────────────────────────────────────────
  { id: "walmart-sd-1", company: "Walmart Labs", type: "system-design", difficulty: "hard", question: "Design Walmart product catalog + checkout.", tags: ["search", "checkout"], askedFor: "SDE-3", frequency: "high" },
  { id: "walmart-sd-2", company: "Walmart Labs", type: "system-design", difficulty: "hard", question: "Design an inventory-reservation system with optimistic locking.", tags: ["inventory", "concurrency"], askedFor: "SDE-3", frequency: "high" },
  { id: "walmart-lld-1", company: "Walmart Labs", type: "lld", difficulty: "medium", question: "Design Parking Lot with payment.", tags: ["oop"], askedFor: "SDE-2", frequency: "high" },
  { id: "walmart-dsa-1", company: "Walmart Labs", type: "dsa", difficulty: "medium", question: "Sliding Window Maximum.", tags: ["sliding-window"], askedFor: "SDE-2", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // INSTACART
  // ────────────────────────────────────────────────────────────────────
  { id: "instacart-sd-1", company: "Instacart", type: "system-design", difficulty: "hard", question: "Design a grocery-delivery shopper-matching service.", tags: ["matching", "geo"], askedFor: "Senior", frequency: "medium" },
  { id: "instacart-dsa-1", company: "Instacart", type: "dsa", difficulty: "medium", question: "Logger Rate Limiter.", tags: ["design", "rate-limit"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // ROBINHOOD
  // ────────────────────────────────────────────────────────────────────
  { id: "robinhood-sd-1", company: "Robinhood", type: "system-design", difficulty: "hard", question: "Design a brokerage platform with real-time quotes + orders.", tags: ["trading", "real-time"], askedFor: "Senior", frequency: "medium" },
  { id: "robinhood-dsa-1", company: "Robinhood", type: "dsa", difficulty: "medium", question: "Online Stock Span.", tags: ["stack", "design"], askedFor: "Mid", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // GOOGLE (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "google-sd-9",  company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Photos — upload, dedup, ML tagging, album sharing.", tags: ["storage", "ml", "dedup", "sharing"], askedFor: "L5–L6", frequency: "medium" },
  { id: "google-sd-10", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Docs collaborative editor (OT / CRDT).", tags: ["crdt", "ot", "collaboration", "websocket"], askedFor: "L5–L6", frequency: "high", note: "Operational Transformation vs CRDT tradeoff is the crux." },
  { id: "google-sd-11", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Calendar — recurring events, timezone handling, invites.", tags: ["scheduling", "calendar", "timezone"], askedFor: "L5", frequency: "medium" },
  { id: "google-sd-12", company: "Google", type: "system-design", difficulty: "hard", question: "Design Bigtable — wide-column storage, compaction, tablet splits.", tags: ["storage", "wide-column", "lsm"], askedFor: "L6", frequency: "medium" },
  { id: "google-sd-13", company: "Google", type: "system-design", difficulty: "hard", question: "Design a distributed key-value store (Spanner-like, multi-region).", tags: ["distributed-db", "consensus", "paxos", "spanner"], askedFor: "L6", frequency: "medium" },
  { id: "google-sd-14", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Pay — payments, UPI rails, fraud detection.", tags: ["payments", "fraud", "upi"], askedFor: "L5", frequency: "medium" },
  { id: "google-sd-15", company: "Google", type: "system-design", difficulty: "hard", question: "Design a large-scale ad serving platform (DoubleClick-like).", tags: ["ads", "real-time-bidding", "targeting"], askedFor: "L5–L6", frequency: "medium" },
  { id: "google-sd-16", company: "Google", type: "system-design", difficulty: "hard", question: "Design PubSub (Cloud Pub/Sub) — durable, at-least-once delivery.", tags: ["pubsub", "queue", "replication"], askedFor: "L5", frequency: "medium" },
  { id: "google-sd-17", company: "Google", type: "system-design", difficulty: "hard", question: "Design a CDN from scratch — PoPs, cache hierarchy, purge.", tags: ["cdn", "cache", "anycast"], askedFor: "L5", frequency: "medium" },
  { id: "google-sd-18", company: "Google", type: "system-design", difficulty: "hard", question: "Design a real-time analytics pipeline (Dataflow-like).", tags: ["stream", "analytics", "beam"], askedFor: "L5", frequency: "low" },
  { id: "google-lld-4", company: "Google", type: "lld", difficulty: "medium", question: "Design a parking lot fee calculator with multiple fee strategies.", tags: ["strategy", "oop"], askedFor: "L4", frequency: "medium" },
  { id: "google-lld-5", company: "Google", type: "lld", difficulty: "hard",   question: "Design a code deployment pipeline (stages, rollback, approval gates).", tags: ["oop", "state-machine"], askedFor: "L5", frequency: "medium" },
  { id: "google-lld-6", company: "Google", type: "lld", difficulty: "medium", question: "Design a concurrent task queue (worker pool pattern).", tags: ["concurrency", "thread-pool"], askedFor: "L5", frequency: "medium" },
  { id: "google-dsa-9",  company: "Google", type: "dsa", difficulty: "medium", question: "Find the Celebrity (API-restricted graph).", tags: ["graph"], askedFor: "L4", frequency: "high" },
  { id: "google-dsa-10", company: "Google", type: "dsa", difficulty: "hard",   question: "Trapping Rain Water II (3-D, heap BFS).", tags: ["heap", "bfs", "grid"], askedFor: "L5", frequency: "medium" },
  { id: "google-dsa-11", company: "Google", type: "dsa", difficulty: "hard",   question: "Text Justification — greedy + string formatting.", tags: ["string", "greedy"], askedFor: "L4–L5", frequency: "high" },
  { id: "google-dsa-12", company: "Google", type: "dsa", difficulty: "medium", question: "Jump Game II — minimum jumps (greedy).", tags: ["greedy"], askedFor: "L4", frequency: "high" },
  { id: "google-dsa-13", company: "Google", type: "dsa", difficulty: "hard",   question: "Count of Range Sum — merge-sort or BIT.", tags: ["divide-conquer", "bit"], askedFor: "L5", frequency: "medium" },
  { id: "google-dsa-14", company: "Google", type: "dsa", difficulty: "medium", question: "Most Common Word (ignoring banned).", tags: ["hashmap", "string"], askedFor: "L4", frequency: "medium" },
  { id: "google-dsa-15", company: "Google", type: "dsa", difficulty: "hard",   question: "Maximal Rectangle (stack on histogram).", tags: ["stack", "dp"], askedFor: "L5", frequency: "high" },
  { id: "google-dsa-16", company: "Google", type: "dsa", difficulty: "medium", question: "Strobogrammatic Number II — recursion.", tags: ["recursion"], askedFor: "L4", frequency: "medium" },
  { id: "google-dsa-17", company: "Google", type: "dsa", difficulty: "hard",   question: "Minimum Window Substring.", tags: ["sliding-window", "hashmap"], askedFor: "L4–L5", frequency: "high" },
  { id: "google-dsa-18", company: "Google", type: "dsa", difficulty: "medium", question: "Rotate Array in-place (reversal trick).", tags: ["array"], askedFor: "L4", frequency: "medium" },
  { id: "google-dsa-19", company: "Google", type: "dsa", difficulty: "hard",   question: "Robot Room Cleaner (backtracking, virtual coordinates).", tags: ["backtracking", "dfs"], askedFor: "L5", frequency: "high" },
  { id: "google-dsa-20", company: "Google", type: "dsa", difficulty: "medium", question: "Fruit Into Baskets (sliding window, ≤2 distinct).", tags: ["sliding-window"], askedFor: "L4", frequency: "medium" },
  { id: "google-dsa-21", company: "Google", type: "dsa", difficulty: "hard",   question: "Strange Printer — interval DP.", tags: ["dp", "interval-dp"], askedFor: "L5", frequency: "medium" },
  { id: "google-dsa-22", company: "Google", type: "dsa", difficulty: "medium", question: "Next Permutation — O(n) in-place.", tags: ["array"], askedFor: "L4", frequency: "high" },
  { id: "google-dsa-23", company: "Google", type: "dsa", difficulty: "hard",   question: "Largest Rectangle in Histogram.", tags: ["stack"], askedFor: "L5", frequency: "high" },
  { id: "google-dsa-24", company: "Google", type: "dsa", difficulty: "medium", question: "Decode String (stack, nested brackets).", tags: ["stack", "string"], askedFor: "L4", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // META (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "meta-sd-8",  company: "Meta", type: "system-design", difficulty: "hard", question: "Design Facebook Marketplace — listing, search, messaging.", tags: ["search", "geo", "messaging"], askedFor: "E5", frequency: "medium" },
  { id: "meta-sd-9",  company: "Meta", type: "system-design", difficulty: "hard", question: "Design Instagram Reels — short-video feed ranking + CDN.", tags: ["video", "cdn", "ranking", "ml"], askedFor: "E5–E6", frequency: "high" },
  { id: "meta-sd-10", company: "Meta", type: "system-design", difficulty: "hard", question: "Design a global distributed cache (Memcache at Meta scale).", tags: ["cache", "replication", "consistency"], askedFor: "E6", frequency: "medium", note: "Directly maps to Meta's published Memcache paper." },
  { id: "meta-sd-11", company: "Meta", type: "system-design", difficulty: "hard", question: "Design a graph-aware social search (across users, posts, pages).", tags: ["search", "graph", "indexing"], askedFor: "E5–E6", frequency: "medium" },
  { id: "meta-sd-12", company: "Meta", type: "system-design", difficulty: "hard", question: "Design Facebook Events — RSVP, recommendation, scalability.", tags: ["events", "recommendation"], askedFor: "E5", frequency: "low" },
  { id: "meta-sd-13", company: "Meta", type: "system-design", difficulty: "hard", question: "Design WhatsApp group chat (up to 1024 members, E2EE).", tags: ["chat", "e2ee", "group"], askedFor: "E5", frequency: "high" },
  { id: "meta-sd-14", company: "Meta", type: "system-design", difficulty: "hard", question: "Design a content moderation pipeline (images, video, text).", tags: ["ml", "moderation", "queue"], askedFor: "E5", frequency: "medium" },
  { id: "meta-sd-15", company: "Meta", type: "system-design", difficulty: "hard", question: "Design the Ads bidding & auction system.", tags: ["ads", "rtb", "auction"], askedFor: "E6", frequency: "medium" },
  { id: "meta-lld-3", company: "Meta", type: "lld", difficulty: "medium", question: "Design a multi-level cache (L1 in-process, L2 Redis, L3 DB).", tags: ["cache", "oop"], askedFor: "E5", frequency: "medium" },
  { id: "meta-lld-4", company: "Meta", type: "lld", difficulty: "hard",   question: "Design a type-safe event bus (generics, thread-safe subscriptions).", tags: ["oop", "concurrency", "pubsub"], askedFor: "E5", frequency: "medium" },
  { id: "meta-dsa-10", company: "Meta", type: "dsa", difficulty: "hard",   question: "Accounts Merge (Union-Find + string keys).", tags: ["union-find", "graph"], askedFor: "E5", frequency: "high" },
  { id: "meta-dsa-11", company: "Meta", type: "dsa", difficulty: "medium", question: "Continuous Subarray Sum (multiple of K, prefix sum).", tags: ["prefix-sum", "hashmap"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-12", company: "Meta", type: "dsa", difficulty: "hard",   question: "Max Points on a Line (slope hashing).", tags: ["math", "hashmap"], askedFor: "E5", frequency: "medium" },
  { id: "meta-dsa-13", company: "Meta", type: "dsa", difficulty: "medium", question: "Brace Expansion (backtracking).", tags: ["backtracking"], askedFor: "E4–E5", frequency: "medium" },
  { id: "meta-dsa-14", company: "Meta", type: "dsa", difficulty: "hard",   question: "Minimum Number of Remove to Make Array Sorted.", tags: ["dp", "lis"], askedFor: "E5", frequency: "low" },
  { id: "meta-dsa-15", company: "Meta", type: "dsa", difficulty: "medium", question: "Longest Palindromic Subsequence — DP.", tags: ["dp", "string"], askedFor: "E4", frequency: "medium" },
  { id: "meta-dsa-16", company: "Meta", type: "dsa", difficulty: "medium", question: "Dot Product of Two Sparse Vectors.", tags: ["design", "math"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-17", company: "Meta", type: "dsa", difficulty: "medium", question: "Add Strings (big-integer addition without libraries).", tags: ["string", "math"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-18", company: "Meta", type: "dsa", difficulty: "medium", question: "Staircase / Climbing Stairs — 1D DP.", tags: ["dp"], askedFor: "E3", frequency: "high" },
  { id: "meta-dsa-19", company: "Meta", type: "dsa", difficulty: "hard",   question: "Rearrange String k Distance Apart (greedy + heap).", tags: ["greedy", "heap"], askedFor: "E5", frequency: "medium" },
  { id: "meta-dsa-20", company: "Meta", type: "dsa", difficulty: "medium", question: "Find All Anagrams in a String (sliding window).", tags: ["sliding-window"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-21", company: "Meta", type: "dsa", difficulty: "medium", question: "Product of Array Except Self.", tags: ["array", "prefix-sum"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-22", company: "Meta", type: "dsa", difficulty: "medium", question: "Integer to English Words.", tags: ["string", "recursion"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-23", company: "Meta", type: "dsa", difficulty: "hard",   question: "Student Attendance Record II — DP counting valid sequences.", tags: ["dp"], askedFor: "E5", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // AMAZON (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "amazon-sd-8",  company: "Amazon", type: "system-design", difficulty: "hard", question: "Design AWS S3 — object storage, multipart upload, replication.", tags: ["storage", "replication", "s3"], askedFor: "SDE-3 / L6", frequency: "high" },
  { id: "amazon-sd-9",  company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Amazon Alexa / voice assistant pipeline.", tags: ["nlp", "streaming", "pipeline"], askedFor: "SDE-3", frequency: "medium" },
  { id: "amazon-sd-10", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design a delivery-route optimization service.", tags: ["geo", "graph", "optimization"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "amazon-sd-11", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design AWS Lambda (serverless function invocation at scale).", tags: ["serverless", "containers", "scheduling"], askedFor: "SDE-3", frequency: "medium" },
  { id: "amazon-sd-12", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design a distributed session management service.", tags: ["session", "cache", "kv-store"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-sd-13", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design a product review + ranking system.", tags: ["ranking", "ml", "search"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-sd-14", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Amazon DynamoDB — partition key design, hot partitions.", tags: ["dynamo", "kv-store", "partitioning"], askedFor: "SDE-3", frequency: "high" },
  { id: "amazon-sd-15", company: "Amazon", type: "system-design", difficulty: "medium", question: "Design a coupon/voucher engine.", tags: ["oop", "cache"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-lld-5", company: "Amazon", type: "lld", difficulty: "medium", question: "Design an Online Shopping Cart (items, discounts, checkout).", tags: ["oop", "strategy"], askedFor: "SDE-1/2", frequency: "high" },
  { id: "amazon-lld-6", company: "Amazon", type: "lld", difficulty: "medium", question: "Design a Movie Rental system (inventory, late fees).", tags: ["oop"], askedFor: "SDE-1", frequency: "medium" },
  { id: "amazon-lld-7", company: "Amazon", type: "lld", difficulty: "medium", question: "Design a thread-safe Singleton + dependency injection container.", tags: ["concurrency", "design-pattern"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-dsa-10", company: "Amazon", type: "dsa", difficulty: "medium", question: "Longest Palindromic Substring (expand around center).", tags: ["string", "dp"], askedFor: "SDE-1", frequency: "high" },
  { id: "amazon-dsa-11", company: "Amazon", type: "dsa", difficulty: "medium", question: "3Sum — two-pointer dedup.", tags: ["two-pointers"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-dsa-12", company: "Amazon", type: "dsa", difficulty: "medium", question: "Maximum Subarray (Kadane's algorithm).", tags: ["dp", "array"], askedFor: "SDE-1", frequency: "high" },
  { id: "amazon-dsa-13", company: "Amazon", type: "dsa", difficulty: "hard",   question: "Minimum Cost to Connect All Points (Prim's / Kruskal's MST).", tags: ["graph", "mst"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-dsa-14", company: "Amazon", type: "dsa", difficulty: "medium", question: "Spiral Matrix II — generate in-place.", tags: ["matrix"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-dsa-15", company: "Amazon", type: "dsa", difficulty: "hard",   question: "Critical Connections in a Network (Tarjan's bridges).", tags: ["graph", "dfs"], askedFor: "SDE-3", frequency: "medium" },
  { id: "amazon-dsa-16", company: "Amazon", type: "dsa", difficulty: "medium", question: "Find if Path Exists in Graph.", tags: ["graph", "union-find"], askedFor: "SDE-1", frequency: "medium" },
  { id: "amazon-dsa-17", company: "Amazon", type: "dsa", difficulty: "medium", question: "String to Integer (atoi) — edge cases.", tags: ["string"], askedFor: "SDE-1", frequency: "high" },
  { id: "amazon-dsa-18", company: "Amazon", type: "dsa", difficulty: "medium", question: "Reorder List (linked list split + reverse + merge).", tags: ["linked-list"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-dsa-19", company: "Amazon", type: "dsa", difficulty: "medium", question: "Pacific Atlantic Water Flow — multi-source DFS.", tags: ["dfs", "grid"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-dsa-20", company: "Amazon", type: "dsa", difficulty: "medium", question: "Top K Frequent Words (heap + custom comparator).", tags: ["heap", "hashmap"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-dsa-21", company: "Amazon", type: "dsa", difficulty: "hard",   question: "Minimum Number of Arrows to Burst Balloons (greedy intervals).", tags: ["greedy", "intervals"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-dsa-22", company: "Amazon", type: "dsa", difficulty: "hard",   question: "Serialize and Deserialize N-ary Tree.", tags: ["tree", "design"], askedFor: "SDE-3", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // MICROSOFT (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "microsoft-sd-6", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design Azure Service Bus (reliable message broker).", tags: ["queue", "reliability", "broker"], askedFor: "L63", frequency: "medium" },
  { id: "microsoft-sd-7", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design GitHub (repos, PRs, CI/CD pipelines).", tags: ["vcs", "git", "ci-cd"], askedFor: "L64", frequency: "high" },
  { id: "microsoft-sd-8", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design a real-time collaborative whiteboard.", tags: ["crdt", "websocket", "canvas"], askedFor: "L63", frequency: "medium" },
  { id: "microsoft-sd-9", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design Windows Update delivery (delta updates, CDN).", tags: ["cdn", "delta", "updates"], askedFor: "L63", frequency: "low" },
  { id: "microsoft-sd-10",company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design LinkedIn (acquired) — feed + job recommendations.", tags: ["feed", "recommendation"], askedFor: "L63", frequency: "medium" },
  { id: "microsoft-sd-11",company: "Microsoft", type: "system-design", difficulty: "medium", question: "Design a feature flag / config management service.", tags: ["config", "feature-flags"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-lld-3", company: "Microsoft", type: "lld", difficulty: "medium", question: "Design Tic-Tac-Toe (generalised N×N board, incremental win check).", tags: ["oop", "design"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-lld-4", company: "Microsoft", type: "lld", difficulty: "medium", question: "Design a spreadsheet (cells, formulas, dependency graph).", tags: ["graph", "design", "topo-sort"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-lld-5", company: "Microsoft", type: "lld", difficulty: "medium", question: "Design a plugin / extension system.", tags: ["oop", "design-pattern"], askedFor: "L63", frequency: "medium" },
  { id: "microsoft-dsa-6", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Reverse Words in a String.", tags: ["string"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-dsa-7", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Group Anagrams.", tags: ["hashmap", "string"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-dsa-8", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Path Sum II — root-to-leaf paths equalling target.", tags: ["tree", "dfs"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-dsa-9", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Design HashMap — open addressing or chaining.", tags: ["design", "hashmap"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-dsa-10",company: "Microsoft", type: "dsa", difficulty: "hard",   question: "Minimum Window Substring.", tags: ["sliding-window", "hashmap"], askedFor: "L63", frequency: "high" },
  { id: "microsoft-dsa-11",company: "Microsoft", type: "dsa", difficulty: "medium", question: "Binary Search Tree Iterator.", tags: ["tree", "iterator"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-dsa-12",company: "Microsoft", type: "dsa", difficulty: "medium", question: "Count and Say.", tags: ["string"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-dsa-13",company: "Microsoft", type: "dsa", difficulty: "hard",   question: "Longest Increasing Subsequence (O(n log n) patience sort).", tags: ["dp", "binary-search"], askedFor: "L63", frequency: "high" },
  { id: "microsoft-dsa-14",company: "Microsoft", type: "dsa", difficulty: "medium", question: "Search in Rotated Sorted Array.", tags: ["binary-search"], askedFor: "L62", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // APPLE (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "apple-sd-5", company: "Apple", type: "system-design", difficulty: "hard", question: "Design Siri — speech recognition, NLU, response generation pipeline.", tags: ["ml", "nlp", "pipeline"], askedFor: "ICT4–ICT5", frequency: "medium" },
  { id: "apple-sd-6", company: "Apple", type: "system-design", difficulty: "hard", question: "Design Apple Maps routing engine.", tags: ["geo", "graph", "routing"], askedFor: "ICT4", frequency: "medium" },
  { id: "apple-sd-7", company: "Apple", type: "system-design", difficulty: "hard", question: "Design App Store — listings, ratings, review moderation, download delivery.", tags: ["cdn", "moderation", "search"], askedFor: "ICT4", frequency: "medium" },
  { id: "apple-sd-8", company: "Apple", type: "system-design", difficulty: "hard", question: "Design FaceTime group calls (STUN/TURN, mesh vs SFU).", tags: ["webrtc", "sfu", "media"], askedFor: "ICT4", frequency: "medium" },
  { id: "apple-sd-9", company: "Apple", type: "system-design", difficulty: "hard", question: "Design Apple Health data store (time-series, privacy).", tags: ["time-series", "privacy", "storage"], askedFor: "ICT4", frequency: "low" },
  { id: "apple-lld-3", company: "Apple", type: "lld", difficulty: "medium", question: "Design a Download Manager (pause, resume, priority, progress).", tags: ["concurrency", "oop", "state"], askedFor: "ICT3", frequency: "medium" },
  { id: "apple-lld-4", company: "Apple", type: "lld", difficulty: "medium", question: "Design an App Store app detail page model layer.", tags: ["oop"], askedFor: "ICT3", frequency: "low" },
  { id: "apple-dsa-5", company: "Apple", type: "dsa", difficulty: "medium", question: "Two Sum IV — input is BST.", tags: ["tree", "hashmap"], askedFor: "ICT3", frequency: "medium" },
  { id: "apple-dsa-6", company: "Apple", type: "dsa", difficulty: "medium", question: "Move Zeroes in-place.", tags: ["array", "two-pointers"], askedFor: "ICT3", frequency: "high" },
  { id: "apple-dsa-7", company: "Apple", type: "dsa", difficulty: "medium", question: "Sort Colors (Dutch National Flag).", tags: ["two-pointers"], askedFor: "ICT3", frequency: "high" },
  { id: "apple-dsa-8", company: "Apple", type: "dsa", difficulty: "hard",   question: "Number of Digit One (math pattern).", tags: ["math"], askedFor: "ICT4", frequency: "medium" },
  { id: "apple-dsa-9", company: "Apple", type: "dsa", difficulty: "medium", question: "Intersection of Two Arrays II.", tags: ["hashmap", "array"], askedFor: "ICT3", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // NETFLIX (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "netflix-sd-5", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design a chaos engineering platform (Chaos Monkey-like).", tags: ["reliability", "testing"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-sd-6", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design a distributed tracing system (Zipkin/Jaeger-like).", tags: ["observability", "tracing"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-sd-7", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design a feature toggle / experimentation platform.", tags: ["feature-flags", "experimentation"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-sd-8", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design Netflix billing — subscription, proration, dunning.", tags: ["billing", "payments"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-sd-9", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design a service-mesh / sidecar proxy (Envoy-like).", tags: ["service-mesh", "proxy"], askedFor: "Senior", frequency: "low" },
  { id: "netflix-lld-1", company: "Netflix", type: "lld", difficulty: "medium", question: "Design a Movie/Show recommendation engine class hierarchy.", tags: ["oop", "strategy"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-lld-2", company: "Netflix", type: "lld", difficulty: "medium", question: "Design a Video Player with buffering, subtitle, chapter support.", tags: ["oop", "state"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-dsa-4", company: "Netflix", type: "dsa", difficulty: "medium", question: "Implement Stack using Queues.", tags: ["stack", "queue", "design"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-dsa-5", company: "Netflix", type: "dsa", difficulty: "hard",   question: "Word Search II — Trie + DFS on board.", tags: ["trie", "dfs", "backtracking"], askedFor: "Senior", frequency: "high" },
  { id: "netflix-dsa-6", company: "Netflix", type: "dsa", difficulty: "medium", question: "Number of Connected Components in an Undirected Graph.", tags: ["union-find", "dfs"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // UBER (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "uber-sd-6",  company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber's driver location tracking service (50M pings/min).", tags: ["geo", "stream", "kv-store"], askedFor: "L5–L6", frequency: "high" },
  { id: "uber-sd-7",  company: "Uber", type: "system-design", difficulty: "hard", question: "Design a map-tile serving system.", tags: ["geo", "tiles", "cache"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-8",  company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber's trip lifecycle service (state machine: request → match → ride → end).", tags: ["state-machine", "workflow"], askedFor: "L5", frequency: "high" },
  { id: "uber-sd-9",  company: "Uber", type: "system-design", difficulty: "hard", question: "Design a dynamic ETA prediction service.", tags: ["ml", "geo", "real-time"], askedFor: "L5", frequency: "high" },
  { id: "uber-sd-10", company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber's safety feature — Share Trip, Emergency SOS.", tags: ["safety", "geo", "notifications"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-11", company: "Uber", type: "system-design", difficulty: "hard", question: "Design a real-time fraud detection system for rides.", tags: ["fraud", "stream", "ml"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-12", company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber's pricing engine (surge, upfront pricing, promotions).", tags: ["pricing", "real-time"], askedFor: "L5–L6", frequency: "high" },
  { id: "uber-sd-13", company: "Uber", type: "system-design", difficulty: "medium", question: "Design a driver incentives / rewards platform.", tags: ["rewards", "ledger"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-14", company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber Freight — freight matching + load board.", tags: ["matching", "geo"], askedFor: "L5", frequency: "low" },
  { id: "uber-sd-15", company: "Uber", type: "system-design", difficulty: "hard", question: "Design a high-throughput event streaming platform (Kafka-based).", tags: ["kafka", "stream", "replication"], askedFor: "L5", frequency: "medium" },
  { id: "uber-lld-3", company: "Uber", type: "lld", difficulty: "medium", question: "Design a Trip History service with paging API.", tags: ["oop", "pagination"], askedFor: "L4", frequency: "medium" },
  { id: "uber-lld-4", company: "Uber", type: "lld", difficulty: "medium", question: "Design a Driver Rating system (rolling average).", tags: ["oop", "math"], askedFor: "L4", frequency: "medium" },
  { id: "uber-lld-5", company: "Uber", type: "lld", difficulty: "hard",   question: "Design a Geo-fence alert service (enter/exit polygons).", tags: ["geo", "oop"], askedFor: "L5", frequency: "medium" },
  { id: "uber-lld-6", company: "Uber", type: "lld", difficulty: "medium", question: "Design a Notification dispatcher (SMS, push, email — strategy pattern).", tags: ["strategy", "oop"], askedFor: "L4", frequency: "high" },
  { id: "uber-dsa-4", company: "Uber", type: "dsa", difficulty: "medium", question: "Minimum Number of Platforms at a station.", tags: ["intervals", "sorting"], askedFor: "L4", frequency: "high" },
  { id: "uber-dsa-5", company: "Uber", type: "dsa", difficulty: "hard",   question: "Shortest Path in a Weighted Graph (Dijkstra).", tags: ["graph", "heap"], askedFor: "L5", frequency: "high" },
  { id: "uber-dsa-6", company: "Uber", type: "dsa", difficulty: "medium", question: "Task Scheduler — CPU idle slots.", tags: ["greedy", "heap"], askedFor: "L4–L5", frequency: "high" },
  { id: "uber-dsa-7", company: "Uber", type: "dsa", difficulty: "medium", question: "Find All Pairs with Given Difference.", tags: ["hashmap", "array"], askedFor: "L4", frequency: "medium" },
  { id: "uber-dsa-8", company: "Uber", type: "dsa", difficulty: "hard",   question: "Cheapest Flights Within K Stops (Bellman-Ford / BFS).", tags: ["graph", "dp"], askedFor: "L5", frequency: "high" },
  { id: "uber-dsa-9", company: "Uber", type: "dsa", difficulty: "medium", question: "Max Area of Island.", tags: ["dfs", "grid"], askedFor: "L4", frequency: "high" },
  { id: "uber-dsa-10",company: "Uber", type: "dsa", difficulty: "hard",   question: "Sliding Window Median (two heaps).", tags: ["sliding-window", "heap"], askedFor: "L5", frequency: "medium" },
  { id: "uber-dsa-11",company: "Uber", type: "dsa", difficulty: "medium", question: "Bulls and Cows.", tags: ["hashmap", "string"], askedFor: "L4", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // LINKEDIN (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "linkedin-sd-4",  company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn Job Search — full-text, filters, personalisation.", tags: ["search", "elasticsearch", "ml"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-sd-5",  company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn Notifications (in-app, email digest, push).", tags: ["notifications", "fan-out", "queue"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-sd-6",  company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn InMail / messaging system.", tags: ["chat", "search"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-7",  company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn Premium analytics — profile views, search appearances.", tags: ["analytics", "time-series"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-8",  company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design 'Who Viewed Your Profile' with privacy tiers.", tags: ["privacy", "analytics"], askedFor: "Senior", frequency: "high", note: "Classic LinkedIn prompt — privacy settings complicate the naive solution." },
  { id: "linkedin-sd-9",  company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn Learning — course catalog, progress tracking, certs.", tags: ["catalog", "cdn", "progress"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-10", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design a graph-based 2nd / 3rd degree connection resolver.", tags: ["graph", "bfs", "cache"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-sd-11", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design a recruiter search / talent-pipeline tool.", tags: ["search", "filtering"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-12", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn's data lake / member data platform.", tags: ["data-lake", "kafka", "hadoop"], askedFor: "Senior+", frequency: "low" },
  { id: "linkedin-sd-13", company: "LinkedIn", type: "system-design", difficulty: "medium", question: "Design a skill endorsement system.", tags: ["graph", "ranking"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-lld-2", company: "LinkedIn", type: "lld", difficulty: "medium", question: "Design an Activity Feed (observer pattern, multiple event types).", tags: ["observer", "oop"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-lld-3", company: "LinkedIn", type: "lld", difficulty: "medium", question: "Design a Connection Request workflow (pending/accept/reject).", tags: ["state-machine", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-lld-4", company: "LinkedIn", type: "lld", difficulty: "medium", question: "Design a Profile Recommendation engine data model.", tags: ["oop", "graph"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-lld-5", company: "LinkedIn", type: "lld", difficulty: "medium", question: "Design a Job Posting lifecycle (draft, open, closed, filled).", tags: ["state-machine", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-4", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Nested List Weight Sum (DFS with depth).", tags: ["dfs", "recursion"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-dsa-5", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Find K-th Smallest in Sorted Matrix.", tags: ["heap", "binary-search"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-dsa-6", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Isomorphic Strings.", tags: ["hashmap", "string"], askedFor: "Mid", frequency: "medium" },
  { id: "linkedin-dsa-7", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Second Minimum Node in Binary Tree.", tags: ["tree", "dfs"], askedFor: "Mid", frequency: "medium" },
  { id: "linkedin-dsa-8", company: "LinkedIn", type: "dsa", difficulty: "hard",   question: "Minimum Height Trees (topological peel).", tags: ["graph", "topo-sort"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-9", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "One Edit Distance.", tags: ["string"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-dsa-10",company: "LinkedIn", type: "dsa", difficulty: "hard",   question: "Sqrt(x) using binary search (Newton's method).", tags: ["math", "binary-search"], askedFor: "Mid–Senior", frequency: "medium" },
  { id: "linkedin-dsa-11",company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Range Addition (difference array).", tags: ["array", "prefix-sum"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-12",company: "LinkedIn", type: "dsa", difficulty: "medium", question: "All Paths from Source to Target (DFS, DAG).", tags: ["graph", "dfs"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // AIRBNB (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "airbnb-sd-4", company: "Airbnb", type: "system-design", difficulty: "hard", question: "Design Airbnb Experiences — discovery, booking, host management.", tags: ["search", "booking"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-sd-5", company: "Airbnb", type: "system-design", difficulty: "hard", question: "Design a pricing / calendar availability service.", tags: ["calendar", "pricing", "concurrency"], askedFor: "Senior", frequency: "high" },
  { id: "airbnb-sd-6", company: "Airbnb", type: "system-design", difficulty: "hard", question: "Design a trust & safety scoring system.", tags: ["ml", "fraud"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-sd-7", company: "Airbnb", type: "system-design", difficulty: "hard", question: "Design Airbnb's payments — split, refund, host payout.", tags: ["payments", "ledger"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-lld-2", company: "Airbnb", type: "lld", difficulty: "medium", question: "Design a Rate Limiter using sliding-window log.", tags: ["rate-limit"], askedFor: "Senior", frequency: "high" },
  { id: "airbnb-lld-3", company: "Airbnb", type: "lld", difficulty: "medium", question: "Design Host Calendar (blocked dates, availability windows).", tags: ["oop", "calendar"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-dsa-4", company: "Airbnb", type: "dsa", difficulty: "hard",   question: "First Missing Positive (O(n) time, O(1) space).", tags: ["array"], askedFor: "Senior", frequency: "high" },
  { id: "airbnb-dsa-5", company: "Airbnb", type: "dsa", difficulty: "medium", question: "Subsets II (with duplicates).", tags: ["backtracking"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-dsa-6", company: "Airbnb", type: "dsa", difficulty: "hard",   question: "Optimal Account Balancing (NP graph problem).", tags: ["graph", "backtracking"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // TWITTER / X (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "twitter-sd-4", company: "Twitter / X", type: "system-design", difficulty: "hard", question: "Design a real-time event / space (audio rooms).", tags: ["webrtc", "sfu", "real-time"], askedFor: "Senior", frequency: "medium" },
  { id: "twitter-sd-5", company: "Twitter / X", type: "system-design", difficulty: "hard", question: "Design Twitter's anti-spam + abuse detection.", tags: ["ml", "fraud", "moderation"], askedFor: "Senior", frequency: "medium" },
  { id: "twitter-sd-6", company: "Twitter / X", type: "system-design", difficulty: "hard", question: "Design Twitter analytics dashboard (impressions, engagements).", tags: ["analytics", "time-series"], askedFor: "Senior", frequency: "medium" },
  { id: "twitter-sd-7", company: "Twitter / X", type: "system-design", difficulty: "hard", question: "Design Moments / Curated events feed.", tags: ["curation", "feed"], askedFor: "Senior", frequency: "low" },
  { id: "twitter-lld-1", company: "Twitter / X", type: "lld", difficulty: "medium", question: "Design a tweet thread model (parent/child, flatten/expand).", tags: ["tree", "oop"], askedFor: "Mid–Senior", frequency: "medium" },
  { id: "twitter-dsa-3", company: "Twitter / X", type: "dsa", difficulty: "medium", question: "Reorganize String (greedy, most frequent char).", tags: ["greedy", "heap"], askedFor: "Senior", frequency: "high" },
  { id: "twitter-dsa-4", company: "Twitter / X", type: "dsa", difficulty: "hard",   question: "Minimum Cost to Hire K Workers.", tags: ["greedy", "heap", "sorting"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // STRIPE (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "stripe-sd-5", company: "Stripe", type: "system-design", difficulty: "hard", question: "Design Stripe Radar — ML-driven fraud scoring at checkout.", tags: ["fraud", "ml", "real-time"], askedFor: "L3–L4", frequency: "high" },
  { id: "stripe-sd-6", company: "Stripe", type: "system-design", difficulty: "hard", question: "Design Stripe Connect — multi-party payouts (platforms + sellers).", tags: ["payments", "ledger", "multi-party"], askedFor: "L4", frequency: "medium" },
  { id: "stripe-sd-7", company: "Stripe", type: "system-design", difficulty: "hard", question: "Design a global payment routing engine (PSP fallback).", tags: ["payments", "routing", "retry"], askedFor: "L4", frequency: "medium" },
  { id: "stripe-lld-3", company: "Stripe", type: "lld", difficulty: "medium", question: "Design a pipeline / middleware chain (Express-style).", tags: ["oop", "chain-of-responsibility"], askedFor: "L3", frequency: "medium" },
  { id: "stripe-lld-4", company: "Stripe", type: "lld", difficulty: "medium", question: "Design an idempotency key store.", tags: ["design", "kv-store"], askedFor: "L3", frequency: "high" },
  { id: "stripe-dsa-3", company: "Stripe", type: "dsa", difficulty: "medium", question: "Minimum Operations to Make Array Contiguous.", tags: ["sorting", "sliding-window"], askedFor: "L3", frequency: "medium" },
  { id: "stripe-dsa-4", company: "Stripe", type: "dsa", difficulty: "hard",   question: "Longest Substring with At Most K Distinct Characters.", tags: ["sliding-window"], askedFor: "L3–L4", frequency: "high" },
  { id: "stripe-dsa-5", company: "Stripe", type: "dsa", difficulty: "medium", question: "Design a log aggregator: return top-N error messages.", tags: ["heap", "hashmap"], askedFor: "L3", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ATLASSIAN (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "atlassian-sd-4", company: "Atlassian", type: "system-design", difficulty: "hard", question: "Design Bitbucket — code hosting, PR review, webhooks.", tags: ["vcs", "git", "webhooks"], askedFor: "P50", frequency: "medium" },
  { id: "atlassian-sd-5", company: "Atlassian", type: "system-design", difficulty: "hard", question: "Design Statuspage — incident management, subscriber notifications.", tags: ["reliability", "notifications"], askedFor: "P50", frequency: "medium" },
  { id: "atlassian-sd-6", company: "Atlassian", type: "system-design", difficulty: "hard", question: "Design Atlassian Identity (SSO, SAML, OAuth2 multi-tenant).", tags: ["auth", "sso", "multi-tenant"], askedFor: "P50+", frequency: "medium" },
  { id: "atlassian-lld-3", company: "Atlassian", type: "lld", difficulty: "medium", question: "Design an undo/redo system (Command pattern).", tags: ["command", "oop"], askedFor: "P50", frequency: "high" },
  { id: "atlassian-lld-4", company: "Atlassian", type: "lld", difficulty: "medium", question: "Design a Jira-style issue workflow engine.", tags: ["state-machine", "oop"], askedFor: "P50", frequency: "high" },
  { id: "atlassian-dsa-3", company: "Atlassian", type: "dsa", difficulty: "medium", question: "Evaluate Reverse Polish Notation.", tags: ["stack"], askedFor: "P50", frequency: "high" },
  { id: "atlassian-dsa-4", company: "Atlassian", type: "dsa", difficulty: "hard",   question: "Bus Routes (BFS on route sets).", tags: ["bfs", "graph"], askedFor: "P50", frequency: "medium" },
  { id: "atlassian-dsa-5", company: "Atlassian", type: "dsa", difficulty: "medium", question: "LRU Cache — full O(1) implementation.", tags: ["lru", "design"], askedFor: "P40–P50", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // BLOOMBERG (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "bb-sd-3",  company: "Bloomberg", type: "system-design", difficulty: "hard", question: "Design a financial data analytics platform (OLAP).", tags: ["olap", "time-series", "analytics"], askedFor: "Senior", frequency: "medium" },
  { id: "bb-sd-4",  company: "Bloomberg", type: "system-design", difficulty: "hard", question: "Design a reference data / security master service.", tags: ["kv-store", "consistency"], askedFor: "Senior", frequency: "low" },
  { id: "bb-sd-5",  company: "Bloomberg", type: "system-design", difficulty: "hard", question: "Design Bloomberg Terminal collaborative chat.", tags: ["chat", "websocket"], askedFor: "Senior", frequency: "medium" },
  { id: "bb-lld-2", company: "Bloomberg", type: "lld", difficulty: "medium", question: "Design a Least Recently Used (LRU) + Frequency (LFU) cache.", tags: ["cache", "design"], askedFor: "Senior", frequency: "high" },
  { id: "bb-lld-3", company: "Bloomberg", type: "lld", difficulty: "hard",   question: "Design an in-memory event store (time-ordered, multi-stream).", tags: ["event-store", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "bb-dsa-4", company: "Bloomberg", type: "dsa", difficulty: "medium", question: "Interval List Intersections.", tags: ["intervals", "two-pointers"], askedFor: "Senior", frequency: "high" },
  { id: "bb-dsa-5", company: "Bloomberg", type: "dsa", difficulty: "hard",   question: "Insert Interval (merge into sorted list).", tags: ["intervals"], askedFor: "Senior", frequency: "high" },
  { id: "bb-dsa-6", company: "Bloomberg", type: "dsa", difficulty: "medium", question: "Design Circular Deque.", tags: ["design", "queue"], askedFor: "Senior", frequency: "medium" },
  { id: "bb-dsa-7", company: "Bloomberg", type: "dsa", difficulty: "hard",   question: "Merge Intervals (sort + sweep).", tags: ["intervals", "sorting"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // BYTEDANCE / TIKTOK (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "bytedance-sd-3", company: "ByteDance / TikTok", type: "system-design", difficulty: "hard", question: "Design a real-time comment system for live streams (at 10M QPS).", tags: ["real-time", "scaling", "pubsub"], askedFor: "Senior", frequency: "high" },
  { id: "bytedance-sd-4", company: "ByteDance / TikTok", type: "system-design", difficulty: "hard", question: "Design TikTok LIVE gifting + coins economy.", tags: ["payments", "ledger", "real-time"], askedFor: "Senior", frequency: "medium" },
  { id: "bytedance-sd-5", company: "ByteDance / TikTok", type: "system-design", difficulty: "hard", question: "Design a content moderation pipeline for short videos.", tags: ["ml", "moderation", "queue"], askedFor: "Senior", frequency: "medium" },
  { id: "bytedance-sd-6", company: "ByteDance / TikTok", type: "system-design", difficulty: "hard", question: "Design a creator monetisation / ads revenue split.", tags: ["payments", "ads"], askedFor: "Senior+", frequency: "low" },
  { id: "bytedance-lld-1",company: "ByteDance / TikTok", type: "lld", difficulty: "medium", question: "Design a Trending Topics service (top-K with decay).", tags: ["heap", "design"], askedFor: "Senior", frequency: "high" },
  { id: "bytedance-dsa-3",company: "ByteDance / TikTok", type: "dsa", difficulty: "medium", question: "Top K Frequent Elements (bucket sort O(n)).", tags: ["bucket-sort", "heap"], askedFor: "Senior", frequency: "high" },
  { id: "bytedance-dsa-4",company: "ByteDance / TikTok", type: "dsa", difficulty: "hard",   question: "Sliding Window Maximum.", tags: ["deque", "sliding-window"], askedFor: "Senior", frequency: "high" },
  { id: "bytedance-dsa-5",company: "ByteDance / TikTok", type: "dsa", difficulty: "medium", question: "Find Duplicate Number (Floyd's cycle detection).", tags: ["cycle-detection", "array"], askedFor: "Mid", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // SALESFORCE (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "sfdc-sd-3",  company: "Salesforce", type: "system-design", difficulty: "hard", question: "Design Salesforce Einstein (CRM AI) inference pipeline.", tags: ["ml", "pipeline"], askedFor: "MTS+", frequency: "low" },
  { id: "sfdc-sd-4",  company: "Salesforce", type: "system-design", difficulty: "hard", question: "Design a multi-region active-active CRM platform.", tags: ["multi-region", "consistency"], askedFor: "LMTS", frequency: "medium" },
  { id: "sfdc-sd-5",  company: "Salesforce", type: "system-design", difficulty: "hard", question: "Design a Slack-integrated alert + incident management service.", tags: ["alerts", "notifications"], askedFor: "MTS", frequency: "medium" },
  { id: "sfdc-lld-2", company: "Salesforce", type: "lld", difficulty: "medium", question: "Design an observer/event-hook system (Apex Triggers analogy).", tags: ["observer", "oop"], askedFor: "MTS", frequency: "medium" },
  { id: "sfdc-lld-3", company: "Salesforce", type: "lld", difficulty: "medium", question: "Design a SOQL-like query parser.", tags: ["parser", "oop"], askedFor: "MTS", frequency: "medium" },
  { id: "sfdc-dsa-3", company: "Salesforce", type: "dsa", difficulty: "medium", question: "Valid Parentheses (stack).", tags: ["stack", "string"], askedFor: "MTS", frequency: "high" },
  { id: "sfdc-dsa-4", company: "Salesforce", type: "dsa", difficulty: "medium", question: "Merge Two Sorted Lists.", tags: ["linked-list"], askedFor: "MTS", frequency: "high" },
  { id: "sfdc-dsa-5", company: "Salesforce", type: "dsa", difficulty: "medium", question: "Kth Largest Element in an Array (quickselect).", tags: ["quickselect", "heap"], askedFor: "MTS", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // ADOBE (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "adobe-sd-3",  company: "Adobe", type: "system-design", difficulty: "hard", question: "Design Adobe Sign (e-signature workflow).", tags: ["workflow", "state-machine", "storage"], askedFor: "MTS", frequency: "medium" },
  { id: "adobe-sd-4",  company: "Adobe", type: "system-design", difficulty: "hard", question: "Design Adobe Analytics — event collection, OLAP query.", tags: ["analytics", "olap", "stream"], askedFor: "MTS", frequency: "medium" },
  { id: "adobe-sd-5",  company: "Adobe", type: "system-design", difficulty: "medium", question: "Design a media asset management (DAM) system.", tags: ["storage", "cdn", "search"], askedFor: "MTS", frequency: "medium" },
  { id: "adobe-lld-2", company: "Adobe", type: "lld", difficulty: "medium", question: "Design a document undo/redo history stack.", tags: ["command", "oop"], askedFor: "MTS", frequency: "high" },
  { id: "adobe-lld-3", company: "Adobe", type: "lld", difficulty: "medium", question: "Design a color palette tool (hex/RGB/HSL conversions).", tags: ["oop", "math"], askedFor: "MTS", frequency: "low" },
  { id: "adobe-dsa-3", company: "Adobe", type: "dsa", difficulty: "medium", question: "Count Complete Tree Nodes (binary search on height).", tags: ["tree", "binary-search"], askedFor: "MTS", frequency: "medium" },
  { id: "adobe-dsa-4", company: "Adobe", type: "dsa", difficulty: "medium", question: "Non-overlapping Intervals (greedy).", tags: ["greedy", "intervals"], askedFor: "MTS", frequency: "high" },
  { id: "adobe-dsa-5", company: "Adobe", type: "dsa", difficulty: "hard",   question: "Burst Balloons — interval DP.", tags: ["dp", "interval-dp"], askedFor: "Senior MTS", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ORACLE (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "oracle-sd-2",  company: "Oracle", type: "system-design", difficulty: "hard", question: "Design Oracle Cloud Object Storage.", tags: ["storage", "erasure-coding"], askedFor: "IC4–IC5", frequency: "medium" },
  { id: "oracle-sd-3",  company: "Oracle", type: "system-design", difficulty: "hard", question: "Design a multi-tenant database-as-a-service.", tags: ["multi-tenant", "db"], askedFor: "IC5", frequency: "medium" },
  { id: "oracle-lld-2", company: "Oracle", type: "lld", difficulty: "medium", question: "Design a connection pool.", tags: ["concurrency", "design"], askedFor: "IC4", frequency: "high" },
  { id: "oracle-lld-3", company: "Oracle", type: "lld", difficulty: "medium", question: "Design a generic retry library with jitter.", tags: ["concurrency", "retry"], askedFor: "IC4", frequency: "medium" },
  { id: "oracle-dsa-2", company: "Oracle", type: "dsa", difficulty: "medium", question: "Maximum Product of Word Lengths (bit mask).", tags: ["bit-manipulation"], askedFor: "IC4", frequency: "medium" },
  { id: "oracle-dsa-3", company: "Oracle", type: "dsa", difficulty: "medium", question: "Construct Binary Tree from Preorder and Inorder Traversal.", tags: ["tree", "recursion"], askedFor: "IC4", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // FLIPKART (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "flipkart-sd-4",  company: "Flipkart", type: "system-design", difficulty: "hard", question: "Design Flipkart supercoins / loyalty rewards engine.", tags: ["rewards", "ledger"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "flipkart-sd-5",  company: "Flipkart", type: "system-design", difficulty: "hard", question: "Design Flipkart seller analytics dashboard.", tags: ["analytics", "olap"], askedFor: "SDE-3", frequency: "medium" },
  { id: "flipkart-sd-6",  company: "Flipkart", type: "system-design", difficulty: "hard", question: "Design Ekart logistics tracking (real-time status updates).", tags: ["logistics", "real-time", "notifications"], askedFor: "SDE-2", frequency: "medium" },
  { id: "flipkart-lld-3", company: "Flipkart", type: "lld", difficulty: "medium", question: "Design Amazon/Flipkart-style search suggestions.", tags: ["trie", "oop"], askedFor: "SDE-2", frequency: "high" },
  { id: "flipkart-lld-4", company: "Flipkart", type: "lld", difficulty: "medium", question: "Design a Payment Retry engine.", tags: ["retry", "state-machine"], askedFor: "SDE-2", frequency: "medium" },
  { id: "flipkart-dsa-3", company: "Flipkart", type: "dsa", difficulty: "medium", question: "Longest Increasing Subsequence (DP).", tags: ["dp"], askedFor: "SDE-2", frequency: "high" },
  { id: "flipkart-dsa-4", company: "Flipkart", type: "dsa", difficulty: "hard",   question: "Jump Game IV (BFS on value groups).", tags: ["bfs", "graph"], askedFor: "SDE-3", frequency: "medium" },
  { id: "flipkart-dsa-5", company: "Flipkart", type: "dsa", difficulty: "medium", question: "Counting Bits (DP + bit trick).", tags: ["dp", "bit-manipulation"], askedFor: "SDE-1", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // RAZORPAY (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "razorpay-sd-3",  company: "Razorpay", type: "system-design", difficulty: "hard", question: "Design Razorpay X — banking + payroll for businesses.", tags: ["banking", "payroll", "ledger"], askedFor: "SDE-3", frequency: "medium" },
  { id: "razorpay-sd-4",  company: "Razorpay", type: "system-design", difficulty: "hard", question: "Design a fraud detection service for payment APIs.", tags: ["fraud", "ml", "stream"], askedFor: "SDE-2/3", frequency: "high" },
  { id: "razorpay-sd-5",  company: "Razorpay", type: "system-design", difficulty: "hard", question: "Design a subscription billing engine (recurring charges).", tags: ["billing", "cron", "idempotency"], askedFor: "SDE-3", frequency: "high" },
  { id: "razorpay-lld-3", company: "Razorpay", type: "lld", difficulty: "medium", question: "Design a Retry + Exponential Backoff queue.", tags: ["queue", "retry"], askedFor: "SDE-2", frequency: "medium" },
  { id: "razorpay-lld-4", company: "Razorpay", type: "lld", difficulty: "hard",   question: "Design a double-entry accounting ledger class hierarchy.", tags: ["oop", "ledger"], askedFor: "SDE-3", frequency: "high" },
  { id: "razorpay-dsa-2", company: "Razorpay", type: "dsa", difficulty: "medium", question: "Find the duplicate in O(n) time O(1) space (Floyd).", tags: ["array", "cycle-detection"], askedFor: "SDE-2", frequency: "high" },
  { id: "razorpay-dsa-3", company: "Razorpay", type: "dsa", difficulty: "medium", question: "Valid Anagram.", tags: ["hashmap", "string"], askedFor: "SDE-1", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SWIGGY (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "swiggy-sd-3",  company: "Swiggy", type: "system-design", difficulty: "hard", question: "Design Swiggy Instamart (10-minute grocery delivery).", tags: ["inventory", "geo", "matching"], askedFor: "SDE-3", frequency: "high" },
  { id: "swiggy-sd-4",  company: "Swiggy", type: "system-design", difficulty: "hard", question: "Design Swiggy POP (curated daily menu, limited slots).", tags: ["inventory", "scheduling"], askedFor: "SDE-2", frequency: "medium" },
  { id: "swiggy-sd-5",  company: "Swiggy", type: "system-design", difficulty: "hard", question: "Design a restaurant partner onboarding platform.", tags: ["workflow", "documents"], askedFor: "SDE-2", frequency: "low" },
  { id: "swiggy-lld-2", company: "Swiggy", type: "lld", difficulty: "medium", question: "Design an Order Tracking state machine (placed→assigned→picked→delivered).", tags: ["state-machine", "oop"], askedFor: "SDE-2", frequency: "high" },
  { id: "swiggy-lld-3", company: "Swiggy", type: "lld", difficulty: "medium", question: "Design a Menu service (categories, items, variants, modifiers).", tags: ["oop"], askedFor: "SDE-2", frequency: "medium" },
  { id: "swiggy-dsa-2", company: "Swiggy", type: "dsa", difficulty: "medium", question: "Minimum Cost to Reach Destination (BFS / Dijkstra on grid).", tags: ["graph", "bfs"], askedFor: "SDE-2", frequency: "medium" },
  { id: "swiggy-dsa-3", company: "Swiggy", type: "dsa", difficulty: "medium", question: "Maximum Units on a Truck (greedy sort).", tags: ["greedy"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ZOMATO (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "zomato-sd-2",  company: "Zomato", type: "system-design", difficulty: "hard", question: "Design Zomato Hyperpure (B2B supply chain for restaurants).", tags: ["logistics", "inventory"], askedFor: "SDE-3", frequency: "medium" },
  { id: "zomato-sd-3",  company: "Zomato", type: "system-design", difficulty: "hard", question: "Design Zomato Gold / Pro subscription platform.", tags: ["subscription", "billing"], askedFor: "SDE-2", frequency: "medium" },
  { id: "zomato-lld-2", company: "Zomato", type: "lld", difficulty: "medium", question: "Design a discount/coupon redemption service.", tags: ["oop", "strategy"], askedFor: "SDE-2", frequency: "high" },
  { id: "zomato-dsa-2", company: "Zomato", type: "dsa", difficulty: "medium", question: "Combination Sum (backtracking).", tags: ["backtracking"], askedFor: "SDE-2", frequency: "high" },
  { id: "zomato-dsa-3", company: "Zomato", type: "dsa", difficulty: "medium", question: "Validate Stack Sequences.", tags: ["stack"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // PHONEPE (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "phonepe-sd-3",  company: "PhonePe", type: "system-design", difficulty: "hard", question: "Design PhonePe Switch (app-in-app marketplace).", tags: ["marketplace", "auth"], askedFor: "SDE-3", frequency: "medium" },
  { id: "phonepe-sd-4",  company: "PhonePe", type: "system-design", difficulty: "hard", question: "Design a KYC (Know Your Customer) document verification pipeline.", tags: ["ml", "workflow", "storage"], askedFor: "SDE-3", frequency: "medium" },
  { id: "phonepe-lld-2", company: "PhonePe", type: "lld", difficulty: "medium", question: "Design a UPI transaction state machine.", tags: ["state-machine", "oop"], askedFor: "SDE-2", frequency: "high" },
  { id: "phonepe-dsa-2", company: "PhonePe", type: "dsa", difficulty: "medium", question: "Find All Duplicates in Array.", tags: ["array"], askedFor: "SDE-2", frequency: "medium" },
  { id: "phonepe-dsa-3", company: "PhonePe", type: "dsa", difficulty: "medium", question: "Best Time to Buy and Sell Stock (single transaction).", tags: ["array", "greedy"], askedFor: "SDE-1", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // PAYTM (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "paytm-sd-2",  company: "Paytm", type: "system-design", difficulty: "hard", question: "Design Paytm Payments Bank core banking system.", tags: ["banking", "ledger"], askedFor: "SDE-3", frequency: "medium" },
  { id: "paytm-sd-3",  company: "Paytm", type: "system-design", difficulty: "hard", question: "Design Paytm Mall e-commerce search.", tags: ["search", "elasticsearch"], askedFor: "SDE-3", frequency: "medium" },
  { id: "paytm-lld-2", company: "Paytm", type: "lld", difficulty: "medium", question: "Design a QR code payment flow.", tags: ["oop", "state-machine"], askedFor: "SDE-2", frequency: "medium" },
  { id: "paytm-dsa-2", company: "Paytm", type: "dsa", difficulty: "medium", question: "Coin Change (minimum coins DP).", tags: ["dp"], askedFor: "SDE-2", frequency: "high" },
  { id: "paytm-dsa-3", company: "Paytm", type: "dsa", difficulty: "medium", question: "Count number of ways to make change (DP).", tags: ["dp"], askedFor: "SDE-2", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // WALMART LABS (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "walmart-sd-3",  company: "Walmart Labs", type: "system-design", difficulty: "hard", question: "Design a supply-chain demand forecasting system.", tags: ["ml", "forecasting", "stream"], askedFor: "SDE-3", frequency: "medium" },
  { id: "walmart-sd-4",  company: "Walmart Labs", type: "system-design", difficulty: "hard", question: "Design a real-time price comparison engine.", tags: ["search", "cache"], askedFor: "SDE-3", frequency: "medium" },
  { id: "walmart-lld-2", company: "Walmart Labs", type: "lld", difficulty: "medium", question: "Design a Shopping Cart with coupon + tax calculation.", tags: ["oop", "strategy"], askedFor: "SDE-2", frequency: "high" },
  { id: "walmart-dsa-2", company: "Walmart Labs", type: "dsa", difficulty: "medium", question: "Find All Numbers Disappeared in Array.", tags: ["array"], askedFor: "SDE-1", frequency: "medium" },
  { id: "walmart-dsa-3", company: "Walmart Labs", type: "dsa", difficulty: "medium", question: "Implement Queue using Stacks.", tags: ["queue", "stack", "design"], askedFor: "SDE-2", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // COINBASE (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "coinbase-sd-3",  company: "Coinbase", type: "system-design", difficulty: "hard", question: "Design a crypto price alert service.", tags: ["alerts", "stream"], askedFor: "L4", frequency: "medium" },
  { id: "coinbase-sd-4",  company: "Coinbase", type: "system-design", difficulty: "hard", question: "Design a blockchain transaction indexer.", tags: ["blockchain", "indexing"], askedFor: "L4", frequency: "medium" },
  { id: "coinbase-lld-2", company: "Coinbase", type: "lld", difficulty: "medium", question: "Design a Portfolio tracker (real-time P&L per asset).", tags: ["oop", "real-time"], askedFor: "L4", frequency: "medium" },
  { id: "coinbase-dsa-1", company: "Coinbase", type: "dsa", difficulty: "medium", question: "Maximum Profit in Job Scheduling (interval DP + binary search).", tags: ["dp", "intervals", "binary-search"], askedFor: "L4", frequency: "high" },
  { id: "coinbase-dsa-2", company: "Coinbase", type: "dsa", difficulty: "medium", question: "Check if N and its double exist.", tags: ["hashmap"], askedFor: "L3", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // PAYPAL (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "paypal-sd-3",  company: "PayPal", type: "system-design", difficulty: "hard", question: "Design PayPal Checkout SDK integration service.", tags: ["sdk", "payments"], askedFor: "MTS", frequency: "medium" },
  { id: "paypal-sd-4",  company: "PayPal", type: "system-design", difficulty: "hard", question: "Design a currency exchange rate aggregation service.", tags: ["aggregation", "cache"], askedFor: "MTS", frequency: "medium" },
  { id: "paypal-lld-1", company: "PayPal", type: "lld", difficulty: "medium", question: "Design a transaction dispute resolution workflow.", tags: ["state-machine", "oop"], askedFor: "MTS", frequency: "medium" },
  { id: "paypal-dsa-2", company: "PayPal", type: "dsa", difficulty: "medium", question: "Next Greater Element I.", tags: ["stack", "monotonic-stack"], askedFor: "MTS", frequency: "medium" },
  { id: "paypal-dsa-3", company: "PayPal", type: "dsa", difficulty: "medium", question: "Reverse Integer (overflow handling).", tags: ["math"], askedFor: "MTS", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // SHOPIFY (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "shopify-sd-3",  company: "Shopify", type: "system-design", difficulty: "hard", question: "Design Shopify Payments (card acquiring + settlements).", tags: ["payments", "ledger"], askedFor: "Senior", frequency: "medium" },
  { id: "shopify-sd-4",  company: "Shopify", type: "system-design", difficulty: "hard", question: "Design Shopify Shipping — rate estimation + label generation.", tags: ["shipping", "api-integration"], askedFor: "Senior", frequency: "medium" },
  { id: "shopify-lld-1", company: "Shopify", type: "lld", difficulty: "medium", question: "Design a Discount engine (percentage, fixed, BOGO, tiered).", tags: ["oop", "strategy"], askedFor: "Senior", frequency: "high" },
  { id: "shopify-dsa-2", company: "Shopify", type: "dsa", difficulty: "medium", question: "Subarray Product Less Than K.", tags: ["sliding-window"], askedFor: "Senior", frequency: "medium" },
  { id: "shopify-dsa-3", company: "Shopify", type: "dsa", difficulty: "medium", question: "Maximum Width of Binary Tree.", tags: ["tree", "bfs"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SLACK (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "slack-sd-3",  company: "Slack", type: "system-design", difficulty: "hard", question: "Design Slack Huddles (quick audio/video calls in channel).", tags: ["webrtc", "sfu"], askedFor: "Senior", frequency: "medium" },
  { id: "slack-sd-4",  company: "Slack", type: "system-design", difficulty: "hard", question: "Design Slack's presence (online/away/do-not-disturb) system.", tags: ["presence", "websocket"], askedFor: "Senior", frequency: "medium" },
  { id: "slack-lld-1", company: "Slack", type: "lld", difficulty: "medium", question: "Design a Slack-style @ mention autocomplete.", tags: ["trie", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "slack-dsa-2", company: "Slack", type: "dsa", difficulty: "medium", question: "Simplify Path (stack).", tags: ["stack", "string"], askedFor: "Senior", frequency: "high" },
  { id: "slack-dsa-3", company: "Slack", type: "dsa", difficulty: "medium", question: "Design Bounded Blocking Queue.", tags: ["concurrency", "design"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ZOOM (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "zoom-sd-3",  company: "Zoom", type: "system-design", difficulty: "hard", question: "Design Zoom Rooms — hardware + software integration.", tags: ["hardware", "media", "scheduling"], askedFor: "Senior", frequency: "low" },
  { id: "zoom-sd-4",  company: "Zoom", type: "system-design", difficulty: "hard", question: "Design Zoom AI companion (meeting summary, action items).", tags: ["ml", "nlp", "transcription"], askedFor: "Senior", frequency: "medium" },
  { id: "zoom-lld-1", company: "Zoom", type: "lld", difficulty: "medium", question: "Design a Meeting Scheduler with recurring events.", tags: ["oop", "calendar"], askedFor: "Senior", frequency: "high" },
  { id: "zoom-dsa-1", company: "Zoom", type: "dsa", difficulty: "medium", question: "Meeting Rooms II — minimum rooms.", tags: ["intervals", "heap"], askedFor: "Senior", frequency: "high" },
  { id: "zoom-dsa-2", company: "Zoom", type: "dsa", difficulty: "medium", question: "My Calendar I (interval BST).", tags: ["intervals", "binary-search", "design"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // DOORDASH (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "doordash-sd-3",  company: "DoorDash", type: "system-design", difficulty: "hard", question: "Design DashPass subscription billing + benefits engine.", tags: ["subscription", "billing"], askedFor: "Senior", frequency: "medium" },
  { id: "doordash-sd-4",  company: "DoorDash", type: "system-design", difficulty: "hard", question: "Design DoorDash dispatch algorithm (batching orders).", tags: ["matching", "optimization"], askedFor: "Senior", frequency: "high" },
  { id: "doordash-lld-1", company: "DoorDash", type: "lld", difficulty: "medium", question: "Design a Delivery tracking state machine.", tags: ["state-machine", "oop"], askedFor: "Senior", frequency: "high" },
  { id: "doordash-dsa-2", company: "DoorDash", type: "dsa", difficulty: "medium", question: "Minimum Cost to Connect Sticks.", tags: ["heap", "greedy"], askedFor: "Senior", frequency: "medium" },
  { id: "doordash-dsa-3", company: "DoorDash", type: "dsa", difficulty: "medium", question: "Number of Students Unable to Eat Lunch (stack/queue).", tags: ["queue", "simulation"], askedFor: "Mid", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // CRED (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "cred-sd-2",  company: "CRED", type: "system-design", difficulty: "hard", question: "Design CRED Pay (UPI + credit card bill payments).", tags: ["payments", "upi"], askedFor: "Senior", frequency: "medium" },
  { id: "cred-sd-3",  company: "CRED", type: "system-design", difficulty: "hard", question: "Design CRED Store (flash sale for premium brands).", tags: ["inventory", "flash-sale"], askedFor: "Senior", frequency: "medium" },
  { id: "cred-lld-2", company: "CRED", type: "lld", difficulty: "medium", question: "Design a Credit Score evaluation engine.", tags: ["oop", "rules"], askedFor: "Senior", frequency: "medium" },
  { id: "cred-dsa-2", company: "CRED", type: "dsa", difficulty: "medium", question: "Distribute Coins in Binary Tree.", tags: ["tree", "dfs"], askedFor: "Senior", frequency: "medium" },
  { id: "cred-dsa-3", company: "CRED", type: "dsa", difficulty: "medium", question: "Unique Paths II (grid with obstacles).", tags: ["dp", "grid"], askedFor: "Mid", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // ZERODHA (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "zerodha-sd-2",  company: "Zerodha", type: "system-design", difficulty: "hard", question: "Design Kite (trading app) — real-time quotes + order placement.", tags: ["real-time", "trading", "websocket"], askedFor: "Senior", frequency: "high" },
  { id: "zerodha-sd-3",  company: "Zerodha", type: "system-design", difficulty: "hard", question: "Design Coin (mutual fund investment platform).", tags: ["fintech", "payments"], askedFor: "Senior", frequency: "medium" },
  { id: "zerodha-lld-2", company: "Zerodha", type: "lld", difficulty: "medium", question: "Design a Portfolio P&L calculator with FIFO/LIFO accounting.", tags: ["oop", "math"], askedFor: "Senior", frequency: "high" },
  { id: "zerodha-dsa-2", company: "Zerodha", type: "dsa", difficulty: "medium", question: "Design Stock Span Problem (monotonic stack).", tags: ["stack"], askedFor: "Mid", frequency: "high" },
  { id: "zerodha-dsa-3", company: "Zerodha", type: "dsa", difficulty: "medium", question: "Maximum profit with transaction fee.", tags: ["dp", "greedy"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // DREAM11 (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "dream11-sd-2",  company: "Dream11", type: "system-design", difficulty: "hard", question: "Design Dream11 contest entry + prize distribution.", tags: ["payments", "ledger", "scaling"], askedFor: "Senior", frequency: "medium" },
  { id: "dream11-sd-3",  company: "Dream11", type: "system-design", difficulty: "hard", question: "Design real-time match score ingestion + player stat update.", tags: ["stream", "real-time"], askedFor: "Senior", frequency: "high" },
  { id: "dream11-lld-2", company: "Dream11", type: "lld", difficulty: "medium", question: "Design a Fantasy Team validator (constraints, player limits).", tags: ["oop", "rules"], askedFor: "Senior", frequency: "medium" },
  { id: "dream11-dsa-2", company: "Dream11", type: "dsa", difficulty: "medium", question: "Rank Teams by Votes (custom comparator).", tags: ["sorting"], askedFor: "Mid", frequency: "medium" },
  { id: "dream11-dsa-3", company: "Dream11", type: "dsa", difficulty: "hard",   question: "Find Median from Data Stream.", tags: ["heap", "design"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // MEESHO (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "meesho-sd-2",  company: "Meesho", type: "system-design", difficulty: "hard", question: "Design a WhatsApp-first catalogue sharing + order flow.", tags: ["messaging", "catalog"], askedFor: "SDE-3", frequency: "medium" },
  { id: "meesho-sd-3",  company: "Meesho", type: "system-design", difficulty: "hard", question: "Design Meesho supplier onboarding + catalogue ingestion.", tags: ["workflow", "catalog"], askedFor: "SDE-3", frequency: "medium" },
  { id: "meesho-lld-2", company: "Meesho", type: "lld", difficulty: "medium", question: "Design a Reseller commission calculation engine.", tags: ["oop", "math"], askedFor: "SDE-2", frequency: "medium" },
  { id: "meesho-dsa-2", company: "Meesho", type: "dsa", difficulty: "medium", question: "Gas Station (greedy circular array).", tags: ["greedy"], askedFor: "SDE-2", frequency: "high" },
  { id: "meesho-dsa-3", company: "Meesho", type: "dsa", difficulty: "medium", question: "Single Number (XOR trick).", tags: ["bit-manipulation"], askedFor: "SDE-1", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // MYNTRA (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "myntra-sd-2",  company: "Myntra", type: "system-design", difficulty: "hard", question: "Design Myntra Style Feed (personalised fashion recommendations).", tags: ["recommendation", "ml", "feed"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "myntra-sd-3",  company: "Myntra", type: "system-design", difficulty: "hard", question: "Design Myntra's visual search (search by photo).", tags: ["ml", "search", "embedding"], askedFor: "SDE-3", frequency: "medium" },
  { id: "myntra-lld-2", company: "Myntra", type: "lld", difficulty: "medium", question: "Design a Size recommendation engine.", tags: ["oop", "ml"], askedFor: "SDE-2", frequency: "medium" },
  { id: "myntra-dsa-1", company: "Myntra", type: "dsa", difficulty: "medium", question: "Find if Array Can Be Partitioned into K Equal Subsets.", tags: ["dp", "backtracking"], askedFor: "SDE-2", frequency: "medium" },
  { id: "myntra-dsa-2", company: "Myntra", type: "dsa", difficulty: "medium", question: "Rotate Image (in-place).", tags: ["matrix"], askedFor: "SDE-2", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // INSTACART (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "instacart-sd-2",  company: "Instacart", type: "system-design", difficulty: "hard", question: "Design Instacart store pick + pack workflow.", tags: ["workflow", "geo"], askedFor: "Senior", frequency: "medium" },
  { id: "instacart-sd-3",  company: "Instacart", type: "system-design", difficulty: "hard", question: "Design a product substitution recommendation system.", tags: ["recommendation", "ml"], askedFor: "Senior", frequency: "medium" },
  { id: "instacart-lld-1", company: "Instacart", type: "lld", difficulty: "medium", question: "Design a grocery list sorting algorithm (store aisle order).", tags: ["oop", "sorting"], askedFor: "Senior", frequency: "medium" },
  { id: "instacart-dsa-2", company: "Instacart", type: "dsa", difficulty: "medium", question: "Hand of Straights (greedy grouping).", tags: ["greedy", "hashmap"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ROBINHOOD (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "robinhood-sd-2",  company: "Robinhood", type: "system-design", difficulty: "hard", question: "Design margin lending + interest accrual engine.", tags: ["fintech", "ledger"], askedFor: "Senior", frequency: "medium" },
  { id: "robinhood-sd-3",  company: "Robinhood", type: "system-design", difficulty: "hard", question: "Design options chain UI data service.", tags: ["real-time", "options"], askedFor: "Senior", frequency: "medium" },
  { id: "robinhood-lld-1", company: "Robinhood", type: "lld", difficulty: "medium", question: "Design a Watchlist (add/remove stock, sorted by % change).", tags: ["oop", "heap"], askedFor: "Senior", frequency: "medium" },
  { id: "robinhood-dsa-2", company: "Robinhood", type: "dsa", difficulty: "medium", question: "Daily Temperatures (monotonic stack).", tags: ["stack"], askedFor: "Senior", frequency: "high" },
  { id: "robinhood-dsa-3", company: "Robinhood", type: "dsa", difficulty: "medium", question: "Kth Largest Element in Array.", tags: ["heap", "quickselect"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // SNOWFLAKE (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "snowflake-sd-2",  company: "Snowflake", type: "system-design", difficulty: "hard", question: "Design Snowflake virtual warehouse (compute + storage separation).", tags: ["olap", "storage", "compute"], askedFor: "Senior", frequency: "medium" },
  { id: "snowflake-sd-3",  company: "Snowflake", type: "system-design", difficulty: "hard", question: "Design a cross-account data sharing mechanism.", tags: ["security", "sharing", "storage"], askedFor: "Senior", frequency: "medium" },
  { id: "snowflake-lld-1", company: "Snowflake", type: "lld", difficulty: "medium", question: "Design a SQL tokenizer / lexer.", tags: ["parser", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "snowflake-dsa-2", company: "Snowflake", type: "dsa", difficulty: "hard",   question: "Number of Ways to Stay in the Same Place After Some Steps (DP).", tags: ["dp"], askedFor: "Senior", frequency: "medium" },
  { id: "snowflake-dsa-3", company: "Snowflake", type: "dsa", difficulty: "medium", question: "Design an Iterator that skips elements matching a condition.", tags: ["iterator", "design"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // DATABRICKS (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "databricks-sd-3",  company: "Databricks", type: "system-design", difficulty: "hard", question: "Design Unity Catalog — data governance + lineage.", tags: ["governance", "lineage", "metadata"], askedFor: "Senior", frequency: "medium" },
  { id: "databricks-sd-4",  company: "Databricks", type: "system-design", difficulty: "hard", question: "Design MLflow experiment tracking at petabyte scale.", tags: ["ml", "metadata", "storage"], askedFor: "Senior", frequency: "medium" },
  { id: "databricks-lld-1", company: "Databricks", type: "lld", difficulty: "medium", question: "Design a DataFrame abstraction (lazy eval, plan tree).", tags: ["oop", "query-planner"], askedFor: "Senior", frequency: "medium" },
  { id: "databricks-dsa-2", company: "Databricks", type: "dsa", difficulty: "hard",   question: "Maximum Sum of Two Non-Overlapping Subarrays.", tags: ["dp", "sliding-window"], askedFor: "Senior", frequency: "medium" },
  { id: "databricks-dsa-3", company: "Databricks", type: "dsa", difficulty: "medium", question: "Sort an Almost-Sorted Array (stream, each element k away).", tags: ["heap", "sorting"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // CLOUDFLARE (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "cloudflare-sd-3",  company: "Cloudflare", type: "system-design", difficulty: "hard", question: "Design Cloudflare Workers (serverless edge compute).", tags: ["serverless", "edge", "v8"], askedFor: "Senior", frequency: "medium" },
  { id: "cloudflare-sd-4",  company: "Cloudflare", type: "system-design", difficulty: "hard", question: "Design R2 (object storage compatible with S3).", tags: ["storage", "s3-compatible"], askedFor: "Senior", frequency: "medium" },
  { id: "cloudflare-lld-1", company: "Cloudflare", type: "lld", difficulty: "medium", question: "Design a DNS record cache with TTL eviction.", tags: ["cache", "ttl", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "cloudflare-dsa-2", company: "Cloudflare", type: "dsa", difficulty: "medium", question: "IPO (greedily pick most profitable projects with capital).", tags: ["greedy", "heap"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // DROPBOX (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "dropbox-sd-3",  company: "Dropbox", type: "system-design", difficulty: "hard", question: "Design Paper (collaborative document editing).", tags: ["crdt", "ot", "websocket"], askedFor: "IC4", frequency: "medium" },
  { id: "dropbox-sd-4",  company: "Dropbox", type: "system-design", difficulty: "medium", question: "Design a file preview / thumbnail generation service.", tags: ["queue", "cdn", "storage"], askedFor: "IC3", frequency: "medium" },
  { id: "dropbox-lld-1", company: "Dropbox", type: "lld", difficulty: "medium", question: "Design a chunked file uploader with resumable uploads.", tags: ["oop", "state"], askedFor: "IC3", frequency: "high" },
  { id: "dropbox-dsa-2", company: "Dropbox", type: "dsa", difficulty: "medium", question: "Pow(x, n) — fast exponentiation.", tags: ["recursion", "math"], askedFor: "IC3", frequency: "high" },
  { id: "dropbox-dsa-3", company: "Dropbox", type: "dsa", difficulty: "medium", question: "Flatten 2D Vector (iterator).", tags: ["iterator", "design"], askedFor: "IC3", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // PINTEREST (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "pinterest-sd-2",  company: "Pinterest", type: "system-design", difficulty: "hard", question: "Design Pinterest Shopping (product tagging + checkout).", tags: ["commerce", "search", "tagging"], askedFor: "Senior", frequency: "medium" },
  { id: "pinterest-sd-3",  company: "Pinterest", type: "system-design", difficulty: "hard", question: "Design the Homefeed ranking algorithm.", tags: ["ranking", "ml", "feed"], askedFor: "Senior", frequency: "medium" },
  { id: "pinterest-lld-1", company: "Pinterest", type: "lld", difficulty: "medium", question: "Design a Pin board (create, repin, archive, search).", tags: ["oop"], askedFor: "Senior", frequency: "medium" },
  { id: "pinterest-dsa-2", company: "Pinterest", type: "dsa", difficulty: "medium", question: "Reconstruct Itinerary (Hierholzer's Eulerian path).", tags: ["graph", "dfs"], askedFor: "Senior", frequency: "high" },
  { id: "pinterest-dsa-3", company: "Pinterest", type: "dsa", difficulty: "medium", question: "Is Graph Bipartite? (BFS coloring).", tags: ["graph", "bfs"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // LYFT (expanded)
  // ────────────────────────────────────────────────────────────────────
  { id: "lyft-sd-2",  company: "Lyft", type: "system-design", difficulty: "hard", question: "Design Lyft surge pricing engine.", tags: ["pricing", "geo"], askedFor: "Senior", frequency: "medium" },
  { id: "lyft-sd-3",  company: "Lyft", type: "system-design", difficulty: "hard", question: "Design driver supply forecasting.", tags: ["ml", "forecasting"], askedFor: "Senior", frequency: "medium" },
  { id: "lyft-lld-1", company: "Lyft", type: "lld", difficulty: "medium", question: "Design a ride state machine (requesting→matching→active→completed).", tags: ["state-machine", "oop"], askedFor: "Senior", frequency: "high" },
  { id: "lyft-dsa-2", company: "Lyft", type: "dsa", difficulty: "medium", question: "Minimum Interval to Include Each Query.", tags: ["intervals", "heap", "binary-search"], askedFor: "Senior", frequency: "medium" },
  { id: "lyft-dsa-3", company: "Lyft", type: "dsa", difficulty: "medium", question: "Find Center of Star Graph.", tags: ["graph"], askedFor: "Mid", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // BLOOMBERG (more DSA)
  // ────────────────────────────────────────────────────────────────────
  { id: "bb-dsa-8",  company: "Bloomberg", type: "dsa", difficulty: "hard",   question: "Employee Free Time (intervals across employees, sorted merge).", tags: ["intervals", "heap"], askedFor: "Senior", frequency: "high" },
  { id: "bb-dsa-9",  company: "Bloomberg", type: "dsa", difficulty: "medium", question: "Stock Price Fluctuation — streaming, max/min queries.", tags: ["design", "heap", "hashmap"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ── NEW COMPANIES ──────────────────────────────────────────────────
  // ────────────────────────────────────────────────────────────────────

  // ── SPOTIFY ─────────────────────────────────────────────────────────
  { id: "spotify-sd-1", company: "Spotify", type: "system-design", difficulty: "hard", question: "Design Spotify music streaming — catalog, streaming, offline sync.", tags: ["cdn", "streaming", "sync"], askedFor: "Senior", frequency: "high" },
  { id: "spotify-sd-2", company: "Spotify", type: "system-design", difficulty: "hard", question: "Design Spotify Discover Weekly — personalized playlist generation.", tags: ["ml", "recommendation", "collab-filtering"], askedFor: "Senior", frequency: "high", note: "ML-driven collab filtering + content-based mixing is the core." },
  { id: "spotify-sd-3", company: "Spotify", type: "system-design", difficulty: "hard", question: "Design Spotify for Podcasters — upload, distribution, analytics.", tags: ["cdn", "analytics", "storage"], askedFor: "Senior", frequency: "medium" },
  { id: "spotify-sd-4", company: "Spotify", type: "system-design", difficulty: "hard", question: "Design Spotify Group Session (synchronized playback).", tags: ["real-time", "sync", "websocket"], askedFor: "Senior", frequency: "medium" },
  { id: "spotify-sd-5", company: "Spotify", type: "system-design", difficulty: "medium", question: "Design a Charts / Top 50 global ranking system.", tags: ["ranking", "stream", "top-k"], askedFor: "Senior", frequency: "medium" },
  { id: "spotify-lld-1", company: "Spotify", type: "lld", difficulty: "medium", question: "Design a Playlist (create, shuffle, repeat, add/remove tracks).", tags: ["oop", "design"], askedFor: "Senior", frequency: "high" },
  { id: "spotify-lld-2", company: "Spotify", type: "lld", difficulty: "medium", question: "Design a Music Library with genre/mood tagging.", tags: ["oop", "tagging"], askedFor: "Senior", frequency: "medium" },
  { id: "spotify-dsa-1", company: "Spotify", type: "dsa", difficulty: "medium", question: "Find the Most Common Songs (hashmap + heap).", tags: ["hashmap", "heap"], askedFor: "Senior", frequency: "medium" },
  { id: "spotify-dsa-2", company: "Spotify", type: "dsa", difficulty: "medium", question: "Reorder Data in Log Files.", tags: ["sorting", "string"], askedFor: "Mid–Senior", frequency: "medium" },
  { id: "spotify-dsa-3", company: "Spotify", type: "dsa", difficulty: "hard",   question: "Find Minimum in Rotated Sorted Array II (duplicates).", tags: ["binary-search"], askedFor: "Senior", frequency: "medium" },

  // ── GITHUB / GITLAB ─────────────────────────────────────────────────
  { id: "github-sd-1", company: "GitHub", type: "system-design", difficulty: "hard", question: "Design GitHub — repositories, branching, pull requests, code review.", tags: ["vcs", "git", "storage"], askedFor: "Senior", frequency: "high" },
  { id: "github-sd-2", company: "GitHub", type: "system-design", difficulty: "hard", question: "Design GitHub Actions — CI/CD pipeline orchestration.", tags: ["ci-cd", "queue", "containers"], askedFor: "Senior", frequency: "high" },
  { id: "github-sd-3", company: "GitHub", type: "system-design", difficulty: "hard", question: "Design GitHub Copilot backend (LLM serving, context retrieval).", tags: ["ml", "llm", "rag"], askedFor: "Senior", frequency: "medium" },
  { id: "github-sd-4", company: "GitHub", type: "system-design", difficulty: "hard", question: "Design GitHub's code search across all public repos.", tags: ["search", "indexing", "trigram"], askedFor: "Senior", frequency: "medium" },
  { id: "github-lld-1", company: "GitHub", type: "lld", difficulty: "medium", question: "Design a Git branch/merge model in code.", tags: ["graph", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "github-dsa-1", company: "GitHub", type: "dsa", difficulty: "medium", question: "Count islands after each addLand() — Union-Find.", tags: ["union-find", "grid"], askedFor: "Senior", frequency: "medium" },
  { id: "github-dsa-2", company: "GitHub", type: "dsa", difficulty: "medium", question: "Toeplitz Matrix.", tags: ["matrix"], askedFor: "Mid", frequency: "medium" },

  // ── OPENAI ──────────────────────────────────────────────────────────
  { id: "openai-sd-1", company: "OpenAI", type: "system-design", difficulty: "hard", question: "Design ChatGPT API — token streaming, rate limits, multi-model routing.", tags: ["llm", "streaming", "rate-limit"], askedFor: "Senior", frequency: "high" },
  { id: "openai-sd-2", company: "OpenAI", type: "system-design", difficulty: "hard", question: "Design a model training job scheduler (GPU cluster).", tags: ["scheduler", "gpu", "distributed-training"], askedFor: "Senior", frequency: "medium" },
  { id: "openai-sd-3", company: "OpenAI", type: "system-design", difficulty: "hard", question: "Design a RAG (Retrieval-Augmented Generation) pipeline.", tags: ["rag", "embedding", "vector-db"], askedFor: "Senior", frequency: "high" },
  { id: "openai-sd-4", company: "OpenAI", type: "system-design", difficulty: "hard", question: "Design a vector database for embedding search at scale.", tags: ["vector-db", "ann", "indexing"], askedFor: "Senior", frequency: "high" },
  { id: "openai-lld-1", company: "OpenAI", type: "lld", difficulty: "medium", question: "Design a token counter / billing meter for LLM API calls.", tags: ["oop", "billing"], askedFor: "Senior", frequency: "medium" },
  { id: "openai-dsa-1", company: "OpenAI", type: "dsa", difficulty: "medium", question: "Implement BPE (Byte Pair Encoding) tokenizer basics.", tags: ["string", "greedy"], askedFor: "Senior", frequency: "medium" },
  { id: "openai-dsa-2", company: "OpenAI", type: "dsa", difficulty: "hard",   question: "Find K Nearest Vectors (priority queue + cosine similarity).", tags: ["heap", "math"], askedFor: "Senior", frequency: "medium" },

  // ── PALANTIR ─────────────────────────────────────────────────────────
  { id: "palantir-sd-1", company: "Palantir", type: "system-design", difficulty: "hard", question: "Design Palantir Gotham — data fusion from heterogeneous sources.", tags: ["etl", "graph", "search"], askedFor: "SWE", frequency: "medium" },
  { id: "palantir-sd-2", company: "Palantir", type: "system-design", difficulty: "hard", question: "Design an access-control / RBAC system for sensitive data.", tags: ["rbac", "security", "multi-tenant"], askedFor: "SWE", frequency: "high" },
  { id: "palantir-sd-3", company: "Palantir", type: "system-design", difficulty: "hard", question: "Design a time-travel query engine (point-in-time reads).", tags: ["olap", "versioning", "snapshot"], askedFor: "Senior SWE", frequency: "medium" },
  { id: "palantir-lld-1", company: "Palantir", type: "lld", difficulty: "hard",   question: "Design a type-safe pipeline operator chain (generic functional).", tags: ["oop", "generics"], askedFor: "SWE", frequency: "medium" },
  { id: "palantir-lld-2", company: "Palantir", type: "lld", difficulty: "medium", question: "Design an alert rule evaluation engine.", tags: ["oop", "rules"], askedFor: "SWE", frequency: "medium" },
  { id: "palantir-dsa-1", company: "Palantir", type: "dsa", difficulty: "hard",   question: "Smallest Rectangle Enclosing Black Pixels (binary search on matrix).", tags: ["binary-search", "matrix"], askedFor: "SWE", frequency: "medium" },
  { id: "palantir-dsa-2", company: "Palantir", type: "dsa", difficulty: "medium", question: "Find the Missing Ranges.", tags: ["array"], askedFor: "SWE", frequency: "medium" },
  { id: "palantir-dsa-3", company: "Palantir", type: "dsa", difficulty: "hard",   question: "LFU Cache (O(1) all operations).", tags: ["cache", "design"], askedFor: "Senior", frequency: "high" },

  // ── GOLDMAN SACHS ─────────────────────────────────────────────────
  { id: "gs-sd-1",  company: "Goldman Sachs", type: "system-design", difficulty: "hard", question: "Design a high-frequency trading platform (sub-ms latency).", tags: ["trading", "low-latency", "kernel-bypass"], askedFor: "VP Engineer", frequency: "high" },
  { id: "gs-sd-2",  company: "Goldman Sachs", type: "system-design", difficulty: "hard", question: "Design a risk computation engine (real-time portfolio VaR).", tags: ["risk", "analytics", "real-time"], askedFor: "SWE Analyst", frequency: "medium" },
  { id: "gs-sd-3",  company: "Goldman Sachs", type: "system-design", difficulty: "hard", question: "Design a trade reconciliation + settlement system.", tags: ["reconciliation", "ledger"], askedFor: "SWE", frequency: "medium" },
  { id: "gs-lld-1",  company: "Goldman Sachs", type: "lld", difficulty: "medium", question: "Design an Order Management System (OMS).", tags: ["oop", "state-machine"], askedFor: "SWE", frequency: "high" },
  { id: "gs-lld-2",  company: "Goldman Sachs", type: "lld", difficulty: "hard",   question: "Design a financial instrument pricing model API.", tags: ["oop", "strategy"], askedFor: "SWE", frequency: "medium" },
  { id: "gs-dsa-1",  company: "Goldman Sachs", type: "dsa", difficulty: "medium", question: "Convert Binary Number in Linked List to Integer.", tags: ["linked-list", "math"], askedFor: "Analyst", frequency: "medium" },
  { id: "gs-dsa-2",  company: "Goldman Sachs", type: "dsa", difficulty: "hard",   question: "Maximum Sum of Subarrays of Size K in a Circular Array.", tags: ["dp", "sliding-window"], askedFor: "SWE", frequency: "medium" },
  { id: "gs-dsa-3",  company: "Goldman Sachs", type: "dsa", difficulty: "medium", question: "Flatten Binary Tree to Linked List.", tags: ["tree", "dfs"], askedFor: "Analyst", frequency: "high" },

  // ── TESLA ────────────────────────────────────────────────────────────
  { id: "tesla-sd-1", company: "Tesla", type: "system-design", difficulty: "hard", question: "Design Tesla's OTA (Over-the-Air) vehicle software update system.", tags: ["ota", "versioning", "cdn"], askedFor: "Senior SWE", frequency: "high" },
  { id: "tesla-sd-2", company: "Tesla", type: "system-design", difficulty: "hard", question: "Design a vehicle telemetry ingestion platform (millions of events/sec).", tags: ["stream", "iot", "kafka"], askedFor: "Senior SWE", frequency: "high" },
  { id: "tesla-sd-3", company: "Tesla", type: "system-design", difficulty: "hard", question: "Design a fleet management dashboard.", tags: ["real-time", "geo", "dashboard"], askedFor: "Senior SWE", frequency: "medium" },
  { id: "tesla-sd-4", company: "Tesla", type: "system-design", difficulty: "hard", question: "Design a charging station availability + reservation system.", tags: ["geo", "booking", "real-time"], askedFor: "Senior SWE", frequency: "medium" },
  { id: "tesla-lld-1", company: "Tesla", type: "lld", difficulty: "medium", question: "Design a Vehicle Diagnostics event model.", tags: ["oop", "design"], askedFor: "Senior SWE", frequency: "medium" },
  { id: "tesla-dsa-1", company: "Tesla", type: "dsa", difficulty: "medium", question: "Number of Cars That Can Fit in a Parking Lot.", tags: ["simulation", "geometry"], askedFor: "SWE", frequency: "medium" },
  { id: "tesla-dsa-2", company: "Tesla", type: "dsa", difficulty: "hard",   question: "Maximum Profit from Cutting Rods (DP).", tags: ["dp"], askedFor: "SWE", frequency: "medium" },

  // ── NVIDIA ────────────────────────────────────────────────────────────
  { id: "nvidia-sd-1", company: "NVIDIA", type: "system-design", difficulty: "hard", question: "Design a GPU cluster orchestration system.", tags: ["scheduler", "gpu", "kubernetes"], askedFor: "Senior SWE", frequency: "medium" },
  { id: "nvidia-sd-2", company: "NVIDIA", type: "system-design", difficulty: "hard", question: "Design a model inference serving platform (Triton-like).", tags: ["ml", "inference", "batching"], askedFor: "Senior SWE", frequency: "high" },
  { id: "nvidia-sd-3", company: "NVIDIA", type: "system-design", difficulty: "hard", question: "Design a distributed memory/storage system for large model training.", tags: ["distributed-training", "storage"], askedFor: "Senior SWE", frequency: "medium" },
  { id: "nvidia-lld-1", company: "NVIDIA", type: "lld", difficulty: "medium", question: "Design a GPU memory allocator (buddy system).", tags: ["oop", "allocator"], askedFor: "Senior SWE", frequency: "medium" },
  { id: "nvidia-dsa-1", company: "NVIDIA", type: "dsa", difficulty: "hard",   question: "Parallel Matrix Multiplication (design + complexity).", tags: ["parallel", "math", "matrix"], askedFor: "SWE", frequency: "medium" },
  { id: "nvidia-dsa-2", company: "NVIDIA", type: "dsa", difficulty: "medium", question: "Find the Kth Largest Element in a Stream.", tags: ["heap"], askedFor: "SWE", frequency: "high" },

  // ── BOOKING.COM ──────────────────────────────────────────────────────
  { id: "booking-sd-1", company: "Booking.com", type: "system-design", difficulty: "hard", question: "Design Booking.com hotel search — availability, pricing, ranking.", tags: ["search", "ranking", "availability"], askedFor: "Senior", frequency: "high" },
  { id: "booking-sd-2", company: "Booking.com", type: "system-design", difficulty: "hard", question: "Design a reservation system (no double-booking, cancellations).", tags: ["booking", "concurrency"], askedFor: "Senior", frequency: "high" },
  { id: "booking-sd-3", company: "Booking.com", type: "system-design", difficulty: "hard", question: "Design a dynamic pricing engine for hotel inventory.", tags: ["pricing", "ml", "real-time"], askedFor: "Senior", frequency: "medium" },
  { id: "booking-sd-4", company: "Booking.com", type: "system-design", difficulty: "medium", question: "Design Booking.com review system + ranking.", tags: ["reviews", "ranking"], askedFor: "Senior", frequency: "medium" },
  { id: "booking-lld-1", company: "Booking.com", type: "lld", difficulty: "medium", question: "Design a Room Availability Calendar.", tags: ["oop", "calendar", "intervals"], askedFor: "Senior", frequency: "high" },
  { id: "booking-dsa-1", company: "Booking.com", type: "dsa", difficulty: "medium", question: "Car Fleet — how many fleets reach destination.", tags: ["stack", "sorting"], askedFor: "Senior", frequency: "medium" },
  { id: "booking-dsa-2", company: "Booking.com", type: "dsa", difficulty: "medium", question: "Find the Duplicate Number (Floyd's tortoise).", tags: ["array", "cycle-detection"], askedFor: "Senior", frequency: "high" },

  // ── OLA ────────────────────────────────────────────────────────────
  { id: "ola-sd-1", company: "Ola", type: "system-design", difficulty: "hard", question: "Design Ola's driver-rider matching at city scale.", tags: ["geo", "matching", "real-time"], askedFor: "SDE-3", frequency: "high" },
  { id: "ola-sd-2", company: "Ola", type: "system-design", difficulty: "hard", question: "Design Ola Electric charging network.", tags: ["geo", "booking", "iot"], askedFor: "SDE-3", frequency: "medium" },
  { id: "ola-sd-3", company: "Ola", type: "system-design", difficulty: "hard", question: "Design a cab booking reliability service (retry, fallback).", tags: ["reliability", "retry"], askedFor: "SDE-3", frequency: "medium" },
  { id: "ola-lld-1", company: "Ola", type: "lld", difficulty: "medium", question: "Design Ola Cab entity model (driver, vehicle, trip, payment).", tags: ["oop"], askedFor: "SDE-2", frequency: "high" },
  { id: "ola-dsa-1", company: "Ola", type: "dsa", difficulty: "medium", question: "Find nearest cab in a 2D grid (BFS).", tags: ["bfs", "grid"], askedFor: "SDE-2", frequency: "high" },
  { id: "ola-dsa-2", company: "Ola", type: "dsa", difficulty: "medium", question: "Shortest Path between two nodes (Dijkstra).", tags: ["graph", "heap"], askedFor: "SDE-2", frequency: "high" },

  // ── HOTSTAR (JioStar) ────────────────────────────────────────────────
  { id: "hotstar-sd-1", company: "Hotstar", type: "system-design", difficulty: "hard", question: "Design Hotstar live cricket streaming for 50M concurrent viewers.", tags: ["streaming", "cdn", "hls", "scaling"], askedFor: "SDE-3", frequency: "high", note: "Famous for one of the highest concurrent live-stream records." },
  { id: "hotstar-sd-2", company: "Hotstar", type: "system-design", difficulty: "hard", question: "Design the Hotstar subscription + content gating system.", tags: ["subscription", "drm", "cdn"], askedFor: "SDE-2/3", frequency: "high" },
  { id: "hotstar-sd-3", company: "Hotstar", type: "system-design", difficulty: "hard", question: "Design real-time live score / commentary push to millions.", tags: ["pubsub", "websocket", "fan-out"], askedFor: "SDE-3", frequency: "high" },
  { id: "hotstar-sd-4", company: "Hotstar", type: "system-design", difficulty: "hard", question: "Design Hotstar Watch Party (synced playback + chat).", tags: ["real-time", "sync", "chat"], askedFor: "SDE-2", frequency: "medium" },
  { id: "hotstar-lld-1", company: "Hotstar", type: "lld", difficulty: "medium", question: "Design a Video Player with quality selection and buffering events.", tags: ["oop", "state"], askedFor: "SDE-2", frequency: "medium" },
  { id: "hotstar-dsa-1", company: "Hotstar", type: "dsa", difficulty: "medium", question: "Design a top-K viewers leaderboard (real-time stream).", tags: ["heap", "stream"], askedFor: "SDE-2", frequency: "medium" },
  { id: "hotstar-dsa-2", company: "Hotstar", type: "dsa", difficulty: "medium", question: "Sliding Window of Comments (bounded buffer).", tags: ["queue", "sliding-window"], askedFor: "SDE-2", frequency: "medium" },

  // ── MAKEMYTRIP ────────────────────────────────────────────────────────
  { id: "mmt-sd-1", company: "MakeMyTrip", type: "system-design", difficulty: "hard", question: "Design flight search — aggregating multiple airline APIs, caching, sorting.", tags: ["search", "aggregation", "cache"], askedFor: "SDE-3", frequency: "high" },
  { id: "mmt-sd-2", company: "MakeMyTrip", type: "system-design", difficulty: "hard", question: "Design hotel + flight booking with seat/room lock.", tags: ["booking", "concurrency"], askedFor: "SDE-2/3", frequency: "high" },
  { id: "mmt-sd-3", company: "MakeMyTrip", type: "system-design", difficulty: "hard", question: "Design a dynamic price alert system for flights.", tags: ["alerts", "cache", "pricing"], askedFor: "SDE-2", frequency: "medium" },
  { id: "mmt-lld-1", company: "MakeMyTrip", type: "lld", difficulty: "medium", question: "Design a Flight Booking engine (seats, classes, PNR).", tags: ["oop", "state-machine"], askedFor: "SDE-2", frequency: "high" },
  { id: "mmt-lld-2", company: "MakeMyTrip", type: "lld", difficulty: "medium", question: "Design a coupon/promo redemption engine.", tags: ["oop", "strategy"], askedFor: "SDE-2", frequency: "medium" },
  { id: "mmt-dsa-1", company: "MakeMyTrip", type: "dsa", difficulty: "medium", question: "Find Cheapest Flights within K Stops.", tags: ["dp", "graph"], askedFor: "SDE-2", frequency: "high" },
  { id: "mmt-dsa-2", company: "MakeMyTrip", type: "dsa", difficulty: "medium", question: "Course Schedule (can you finish all courses?).", tags: ["graph", "topo-sort"], askedFor: "SDE-2", frequency: "high" },

  // ── ZOHO ─────────────────────────────────────────────────────────────
  { id: "zoho-sd-1", company: "Zoho", type: "system-design", difficulty: "hard", question: "Design Zoho CRM — multi-tenant, workflow automation.", tags: ["multi-tenant", "workflow", "crm"], askedFor: "Senior", frequency: "high" },
  { id: "zoho-sd-2", company: "Zoho", type: "system-design", difficulty: "hard", question: "Design Zoho Mail — email server, storage, spam filter.", tags: ["email", "storage", "spam"], askedFor: "Senior", frequency: "medium" },
  { id: "zoho-lld-1", company: "Zoho", type: "lld", difficulty: "medium", question: "Design a spreadsheet formula engine.", tags: ["graph", "topo-sort", "oop"], askedFor: "Senior", frequency: "high" },
  { id: "zoho-lld-2", company: "Zoho", type: "lld", difficulty: "medium", question: "Design a CRM deal pipeline with drag-drop stages.", tags: ["state-machine", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "zoho-dsa-1", company: "Zoho", type: "dsa", difficulty: "medium", question: "Balanced Parentheses generation (backtracking).", tags: ["backtracking", "string"], askedFor: "Senior", frequency: "high" },
  { id: "zoho-dsa-2", company: "Zoho", type: "dsa", difficulty: "medium", question: "Matrix Diagonal Traverse.", tags: ["matrix"], askedFor: "Mid", frequency: "medium" },
  { id: "zoho-dsa-3", company: "Zoho", type: "dsa", difficulty: "medium", question: "Pascal's Triangle II.", tags: ["dp", "math"], askedFor: "Mid", frequency: "medium" },

  // ── FRESHWORKS ───────────────────────────────────────────────────────
  { id: "freshworks-sd-1", company: "Freshworks", type: "system-design", difficulty: "hard", question: "Design Freshdesk — multi-tenant customer support ticketing.", tags: ["multi-tenant", "workflow", "search"], askedFor: "Senior", frequency: "high" },
  { id: "freshworks-sd-2", company: "Freshworks", type: "system-design", difficulty: "hard", question: "Design Freshchat — live chat with agents + bots.", tags: ["chat", "websocket", "bot"], askedFor: "Senior", frequency: "medium" },
  { id: "freshworks-lld-1", company: "Freshworks", type: "lld", difficulty: "medium", question: "Design a Support Ticket lifecycle (open, assigned, resolved, closed).", tags: ["state-machine", "oop"], askedFor: "Senior", frequency: "high" },
  { id: "freshworks-lld-2", company: "Freshworks", type: "lld", difficulty: "medium", question: "Design SLA timer engine (breach alerts).", tags: ["scheduler", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "freshworks-dsa-1", company: "Freshworks", type: "dsa", difficulty: "medium", question: "Count Number of Texts (phone keypad combinations).", tags: ["dp", "string"], askedFor: "Senior", frequency: "medium" },
  { id: "freshworks-dsa-2", company: "Freshworks", type: "dsa", difficulty: "medium", question: "Find All Groups of Farmland (BFS).", tags: ["bfs", "grid"], askedFor: "Mid", frequency: "medium" },

  // ── SPRINKLR ─────────────────────────────────────────────────────────
  { id: "sprinklr-sd-1", company: "Sprinklr", type: "system-design", difficulty: "hard", question: "Design a social media listening + analytics platform.", tags: ["stream", "analytics", "ml"], askedFor: "Senior", frequency: "medium" },
  { id: "sprinklr-sd-2", company: "Sprinklr", type: "system-design", difficulty: "hard", question: "Design a unified content publishing calendar across 20+ networks.", tags: ["scheduling", "calendar", "api-integration"], askedFor: "Senior", frequency: "medium" },
  { id: "sprinklr-lld-1", company: "Sprinklr", type: "lld", difficulty: "medium", question: "Design a social post approval workflow (draft → review → publish).", tags: ["state-machine", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "sprinklr-dsa-1", company: "Sprinklr", type: "dsa", difficulty: "medium", question: "Text Segmentation / Word Break.", tags: ["dp", "trie"], askedFor: "Senior", frequency: "high" },

  // ── THOUGHTWORKS ─────────────────────────────────────────────────────
  { id: "tw-sd-1",  company: "ThoughtWorks", type: "system-design", difficulty: "hard", question: "Design an event-sourcing + CQRS order service.", tags: ["event-sourcing", "cqrs"], askedFor: "Senior", frequency: "medium" },
  { id: "tw-lld-1", company: "ThoughtWorks", type: "lld", difficulty: "medium", question: "Design a Bowling Game score calculator.", tags: ["oop", "simulation"], askedFor: "Senior", frequency: "high" },
  { id: "tw-lld-2", company: "ThoughtWorks", type: "lld", difficulty: "medium", question: "Design a Conway's Game of Life.", tags: ["oop", "simulation"], askedFor: "Senior", frequency: "medium" },
  { id: "tw-dsa-1",  company: "ThoughtWorks", type: "dsa", difficulty: "medium", question: "Roman to Integer.", tags: ["string", "hashmap"], askedFor: "Senior", frequency: "high" },
  { id: "tw-dsa-2",  company: "ThoughtWorks", type: "dsa", difficulty: "medium", question: "Design Parking System.", tags: ["design", "oop"], askedFor: "Senior", frequency: "high" },

  // ── NUTANIX ──────────────────────────────────────────────────────────
  { id: "nutanix-sd-1", company: "Nutanix", type: "system-design", difficulty: "hard", question: "Design a hyper-converged infrastructure manager.", tags: ["storage", "compute", "network"], askedFor: "Senior", frequency: "medium" },
  { id: "nutanix-sd-2", company: "Nutanix", type: "system-design", difficulty: "hard", question: "Design a distributed VM snapshot + backup service.", tags: ["snapshot", "storage", "replication"], askedFor: "Senior", frequency: "medium" },
  { id: "nutanix-lld-1", company: "Nutanix", type: "lld", difficulty: "medium", question: "Design a cluster health monitor (heartbeats, leader election).", tags: ["oop", "consensus"], askedFor: "Senior", frequency: "medium" },
  { id: "nutanix-dsa-1", company: "Nutanix", type: "dsa", difficulty: "medium", question: "Find a Pair with Target Sum in BST.", tags: ["tree", "hashmap"], askedFor: "Senior", frequency: "medium" },
  { id: "nutanix-dsa-2", company: "Nutanix", type: "dsa", difficulty: "hard",   question: "Detect cycle in a directed graph (DFS coloring).", tags: ["graph", "dfs"], askedFor: "Senior", frequency: "high" },

  // ── SAP LABS ─────────────────────────────────────────────────────────
  { id: "sap-sd-1",  company: "SAP Labs", type: "system-design", difficulty: "hard", question: "Design SAP S/4HANA multi-tenant ERP SaaS.", tags: ["multi-tenant", "erp"], askedFor: "Senior", frequency: "medium" },
  { id: "sap-lld-1", company: "SAP Labs", type: "lld", difficulty: "medium", question: "Design an inventory management module.", tags: ["oop"], askedFor: "Senior", frequency: "medium" },
  { id: "sap-dsa-1", company: "SAP Labs", type: "dsa", difficulty: "medium", question: "Design Skip List (probabilistic data structure).", tags: ["design", "data-structures"], askedFor: "Senior", frequency: "medium" },

  // ── TATA CONSULTANCY SERVICES (TCS) ──────────────────────────────────
  { id: "tcs-sd-1",  company: "TCS", type: "system-design", difficulty: "medium", question: "Design a multi-region banking transaction gateway.", tags: ["banking", "multi-region"], askedFor: "Senior", frequency: "medium" },
  { id: "tcs-lld-1", company: "TCS", type: "lld", difficulty: "easy",   question: "Design a Bank Account (deposit, withdraw, transfer).", tags: ["oop", "concurrency"], askedFor: "Mid", frequency: "high" },
  { id: "tcs-dsa-1", company: "TCS", type: "dsa", difficulty: "easy",   question: "Find second largest element in array.", tags: ["array"], askedFor: "Mid", frequency: "high" },
  { id: "tcs-dsa-2", company: "TCS", type: "dsa", difficulty: "medium", question: "Check if linked list is palindrome.", tags: ["linked-list"], askedFor: "Mid", frequency: "high" },

  // ── INFOSYS ──────────────────────────────────────────────────────────
  { id: "infosys-sd-1",  company: "Infosys", type: "system-design", difficulty: "medium", question: "Design a cloud-based EHR (Electronic Health Record) system.", tags: ["storage", "privacy", "hl7"], askedFor: "Senior", frequency: "medium" },
  { id: "infosys-lld-1", company: "Infosys", type: "lld", difficulty: "medium", question: "Design an ATM machine.", tags: ["state-machine", "oop"], askedFor: "Senior", frequency: "high" },
  { id: "infosys-dsa-1", company: "Infosys", type: "dsa", difficulty: "easy",   question: "Reverse a String.", tags: ["string"], askedFor: "Entry", frequency: "high" },
  { id: "infosys-dsa-2", company: "Infosys", type: "dsa", difficulty: "medium", question: "Find the majority element (Boyer-Moore).", tags: ["array"], askedFor: "Mid", frequency: "high" },

  // ── WIPRO ─────────────────────────────────────────────────────────────
  { id: "wipro-sd-1",  company: "Wipro", type: "system-design", difficulty: "medium", question: "Design a patient appointment scheduling system.", tags: ["scheduling", "calendar"], askedFor: "Senior", frequency: "medium" },
  { id: "wipro-lld-1", company: "Wipro", type: "lld", difficulty: "medium", question: "Design a library management system.", tags: ["oop"], askedFor: "Senior", frequency: "high" },
  { id: "wipro-dsa-1", company: "Wipro", type: "dsa", difficulty: "easy",   question: "Check if a number is prime.", tags: ["math"], askedFor: "Entry", frequency: "high" },
  { id: "wipro-dsa-2", company: "Wipro", type: "dsa", difficulty: "medium", question: "Find all pairs with a given sum in a sorted array.", tags: ["two-pointers"], askedFor: "Mid", frequency: "high" },

  // ── HCL ─────────────────────────────────────────────────────────────
  { id: "hcl-lld-1", company: "HCL", type: "lld", difficulty: "medium", question: "Design a Hotel Reservation system.", tags: ["oop"], askedFor: "Senior", frequency: "medium" },
  { id: "hcl-dsa-1", company: "HCL", type: "dsa", difficulty: "easy",   question: "Anagram check.", tags: ["hashmap", "string"], askedFor: "Entry", frequency: "high" },

  // ── INTUIT ───────────────────────────────────────────────────────────
  { id: "intuit-sd-1", company: "Intuit", type: "system-design", difficulty: "hard", question: "Design TurboTax — multi-user tax filing, calculations, audit trail.", tags: ["workflow", "audit", "privacy"], askedFor: "Senior", frequency: "high" },
  { id: "intuit-sd-2", company: "Intuit", type: "system-design", difficulty: "hard", question: "Design QuickBooks — double-entry accounting + reports.", tags: ["ledger", "accounting", "reporting"], askedFor: "Senior", frequency: "high" },
  { id: "intuit-lld-1", company: "Intuit", type: "lld", difficulty: "medium", question: "Design a personal budget tracker.", tags: ["oop"], askedFor: "Senior", frequency: "medium" },
  { id: "intuit-dsa-1", company: "Intuit", type: "dsa", difficulty: "medium", question: "Number of Islands.", tags: ["dfs", "grid"], askedFor: "Senior", frequency: "high" },
  { id: "intuit-dsa-2", company: "Intuit", type: "dsa", difficulty: "medium", question: "Partition Equal Subset Sum (0/1 knapsack DP).", tags: ["dp"], askedFor: "Senior", frequency: "medium" },

  // ── SQUARE / BLOCK ────────────────────────────────────────────────────
  { id: "square-sd-1", company: "Square / Block", type: "system-design", difficulty: "hard", question: "Design Square POS — card-present payment, offline mode.", tags: ["payments", "pos", "offline"], askedFor: "Senior", frequency: "high" },
  { id: "square-sd-2", company: "Square / Block", type: "system-design", difficulty: "hard", question: "Design Cash App P2P transfer + bank linking.", tags: ["payments", "ach", "kyc"], askedFor: "Senior", frequency: "high" },
  { id: "square-lld-1", company: "Square / Block", type: "lld", difficulty: "medium", question: "Design a POS receipt generator.", tags: ["oop"], askedFor: "Senior", frequency: "medium" },
  { id: "square-dsa-1", company: "Square / Block", type: "dsa", difficulty: "medium", question: "Roman Numeral Converter.", tags: ["math", "string"], askedFor: "Senior", frequency: "medium" },

  // ── WISE (TransferWise) ────────────────────────────────────────────────
  { id: "wise-sd-1", company: "Wise", type: "system-design", difficulty: "hard", question: "Design Wise's currency conversion + multi-currency account.", tags: ["payments", "fx", "ledger"], askedFor: "Senior", frequency: "high" },
  { id: "wise-sd-2", company: "Wise", type: "system-design", difficulty: "hard", question: "Design a real-time FX rate aggregation service.", tags: ["aggregation", "cache", "pricing"], askedFor: "Senior", frequency: "medium" },
  { id: "wise-lld-1", company: "Wise", type: "lld", difficulty: "medium", question: "Design a multi-currency wallet class.", tags: ["oop", "math"], askedFor: "Senior", frequency: "medium" },
  { id: "wise-dsa-1", company: "Wise", type: "dsa", difficulty: "medium", question: "Find currency path with minimum conversion cost (Bellman-Ford).", tags: ["graph", "dp"], askedFor: "Senior", frequency: "medium" },

  // ── TWILIO ────────────────────────────────────────────────────────────
  { id: "twilio-sd-1", company: "Twilio", type: "system-design", difficulty: "hard", question: "Design Twilio SMS/voice — carrier routing, delivery receipts.", tags: ["messaging", "carrier", "webhooks"], askedFor: "Senior", frequency: "high" },
  { id: "twilio-sd-2", company: "Twilio", type: "system-design", difficulty: "hard", question: "Design Twilio Verify — OTP generation, delivery, validation.", tags: ["otp", "sms", "rate-limit"], askedFor: "Senior", frequency: "high" },
  { id: "twilio-lld-1", company: "Twilio", type: "lld", difficulty: "medium", question: "Design an OTP generator with expiry + throttling.", tags: ["security", "rate-limit", "oop"], askedFor: "Senior", frequency: "high" },
  { id: "twilio-dsa-1", company: "Twilio", type: "dsa", difficulty: "medium", question: "Phone Directory (Trie + autocomplete).", tags: ["trie"], askedFor: "Senior", frequency: "medium" },

  // ── SENDGRID / MAILCHIMP ──────────────────────────────────────────────
  { id: "sendgrid-sd-1", company: "SendGrid", type: "system-design", difficulty: "hard", question: "Design an email delivery system — queuing, retries, bounce handling.", tags: ["email", "queue", "retry"], askedFor: "Senior", frequency: "high" },
  { id: "sendgrid-lld-1", company: "SendGrid", type: "lld", difficulty: "medium", question: "Design an email template engine (variable substitution).", tags: ["oop", "template"], askedFor: "Senior", frequency: "medium" },
  { id: "sendgrid-dsa-1", company: "SendGrid", type: "dsa", difficulty: "medium", question: "Count Unique Email Addresses.", tags: ["string", "hashmap"], askedFor: "Senior", frequency: "high" },

  // ── PAGERDUTY ────────────────────────────────────────────────────────
  { id: "pd-sd-1",  company: "PagerDuty", type: "system-design", difficulty: "hard", question: "Design an on-call incident management + alert routing system.", tags: ["alerts", "on-call", "notifications"], askedFor: "Senior", frequency: "high" },
  { id: "pd-sd-2",  company: "PagerDuty", type: "system-design", difficulty: "hard", question: "Design an event deduplication + suppression pipeline.", tags: ["dedup", "stream"], askedFor: "Senior", frequency: "medium" },
  { id: "pd-lld-1", company: "PagerDuty", type: "lld", difficulty: "medium", question: "Design an escalation policy engine.", tags: ["state-machine", "oop"], askedFor: "Senior", frequency: "high" },
  { id: "pd-dsa-1", company: "PagerDuty", type: "dsa", difficulty: "medium", question: "Shortest Path to All Nodes (BFS on bitmask states).", tags: ["bfs", "bitmask", "dp"], askedFor: "Senior", frequency: "medium" },

  // ── DATADOG ───────────────────────────────────────────────────────────
  { id: "datadog-sd-1", company: "Datadog", type: "system-design", difficulty: "hard", question: "Design a metrics ingestion + query system (Prometheus-like).", tags: ["time-series", "metrics", "tsdb"], askedFor: "Senior", frequency: "high" },
  { id: "datadog-sd-2", company: "Datadog", type: "system-design", difficulty: "hard", question: "Design a distributed log aggregation service (Loki-like).", tags: ["logging", "stream", "search"], askedFor: "Senior", frequency: "high" },
  { id: "datadog-sd-3", company: "Datadog", type: "system-design", difficulty: "hard", question: "Design an anomaly detection pipeline for time-series metrics.", tags: ["ml", "time-series", "alerting"], askedFor: "Senior", frequency: "medium" },
  { id: "datadog-lld-1", company: "Datadog", type: "lld", difficulty: "medium", question: "Design a time-series circular buffer.", tags: ["oop", "data-structures"], askedFor: "Senior", frequency: "medium" },
  { id: "datadog-dsa-1", company: "Datadog", type: "dsa", difficulty: "medium", question: "Design a moving average from data stream.", tags: ["queue", "design"], askedFor: "Senior", frequency: "high" },

  // ── ELASTIC ────────────────────────────────────────────────────────
  { id: "elastic-sd-1", company: "Elastic", type: "system-design", difficulty: "hard", question: "Design Elasticsearch — inverted index, sharding, replication.", tags: ["search", "inverted-index", "lucene"], askedFor: "Senior", frequency: "high" },
  { id: "elastic-sd-2", company: "Elastic", type: "system-design", difficulty: "hard", question: "Design Kibana dashboards at large-scale (aggregation caching).", tags: ["analytics", "cache"], askedFor: "Senior", frequency: "medium" },
  { id: "elastic-lld-1", company: "Elastic", type: "lld", difficulty: "medium", question: "Design an inverted index in memory.", tags: ["data-structures", "search", "oop"], askedFor: "Senior", frequency: "high" },
  { id: "elastic-dsa-1", company: "Elastic", type: "dsa", difficulty: "medium", question: "Design a Search Autocomplete System (trie + frequency rank).", tags: ["trie", "heap"], askedFor: "Senior", frequency: "high" },

  // ── CONFLUENT (Kafka) ────────────────────────────────────────────────
  { id: "confluent-sd-1", company: "Confluent", type: "system-design", difficulty: "hard", question: "Design Kafka — log-structured storage, consumer groups, compaction.", tags: ["kafka", "log", "replication"], askedFor: "Senior", frequency: "high" },
  { id: "confluent-sd-2", company: "Confluent", type: "system-design", difficulty: "hard", question: "Design a schema registry for Kafka topics.", tags: ["schema", "registry", "compatibility"], askedFor: "Senior", frequency: "medium" },
  { id: "confluent-lld-1", company: "Confluent", type: "lld", difficulty: "medium", question: "Design an in-memory pub/sub with topic partitioning.", tags: ["pubsub", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "confluent-dsa-1", company: "Confluent", type: "dsa", difficulty: "medium", question: "Number of Recent Calls (sliding window).", tags: ["queue", "sliding-window"], askedFor: "Senior", frequency: "high" },

  // ── REDIS LABS ────────────────────────────────────────────────────────
  { id: "redis-sd-1", company: "Redis Labs", type: "system-design", difficulty: "hard", question: "Design Redis — in-memory kv, persistence (AOF/RDB), replication.", tags: ["kv-store", "replication", "persistence"], askedFor: "Senior", frequency: "high" },
  { id: "redis-sd-2", company: "Redis Labs", type: "system-design", difficulty: "hard", question: "Design Redis Cluster — consistent hashing, hash slots, resharding.", tags: ["partitioning", "consistency", "cluster"], askedFor: "Senior", frequency: "medium" },
  { id: "redis-lld-1", company: "Redis Labs", type: "lld", difficulty: "hard",   question: "Design an in-memory sorted set (skip list).", tags: ["data-structures", "skip-list"], askedFor: "Senior", frequency: "medium" },
  { id: "redis-dsa-1", company: "Redis Labs", type: "dsa", difficulty: "medium", question: "Implement a Hash Map from scratch.", tags: ["design", "hashmap"], askedFor: "Senior", frequency: "high" },

  // ── MONGODB ────────────────────────────────────────────────────────
  { id: "mongodb-sd-1", company: "MongoDB", type: "system-design", difficulty: "hard", question: "Design MongoDB — document store, WiredTiger, replication, sharding.", tags: ["document-store", "replication", "sharding"], askedFor: "Senior", frequency: "medium" },
  { id: "mongodb-sd-2", company: "MongoDB", type: "system-design", difficulty: "hard", question: "Design Atlas Search (Lucene on top of Mongo).", tags: ["search", "lucene"], askedFor: "Senior", frequency: "medium" },
  { id: "mongodb-lld-1", company: "MongoDB", type: "lld", difficulty: "medium", question: "Design a document validator (schema + type check).", tags: ["oop", "validation"], askedFor: "Senior", frequency: "medium" },
  { id: "mongodb-dsa-1", company: "MongoDB", type: "dsa", difficulty: "medium", question: "Insert into a Sorted Circular Linked List.", tags: ["linked-list"], askedFor: "Senior", frequency: "medium" },

  // ── COCKROACHDB / PLANETSCALE ─────────────────────────────────────────
  { id: "cockroach-sd-1", company: "CockroachDB", type: "system-design", difficulty: "hard", question: "Design a globally distributed SQL database (Spanner-inspired).", tags: ["distributed-db", "paxos", "serializable"], askedFor: "Senior", frequency: "medium" },
  { id: "cockroach-dsa-1", company: "CockroachDB", type: "dsa", difficulty: "hard",   question: "Implement Raft consensus log replay.", tags: ["consensus", "design"], askedFor: "Senior", frequency: "medium" },

  // ── HASHICORP ─────────────────────────────────────────────────────────
  { id: "hashicorp-sd-1", company: "HashiCorp", type: "system-design", difficulty: "hard", question: "Design Vault — secrets management, dynamic credentials, lease renewal.", tags: ["secrets", "security", "leases"], askedFor: "Senior", frequency: "medium" },
  { id: "hashicorp-sd-2", company: "HashiCorp", type: "system-design", difficulty: "hard", question: "Design Consul — service discovery + health checking.", tags: ["service-discovery", "health-check", "kv-store"], askedFor: "Senior", frequency: "medium" },
  { id: "hashicorp-lld-1", company: "HashiCorp", type: "lld", difficulty: "medium", question: "Design a leader-election library (ZooKeeper-like).", tags: ["consensus", "oop"], askedFor: "Senior", frequency: "medium" },

  // ── TWITCH ───────────────────────────────────────────────────────────
  { id: "twitch-sd-1", company: "Twitch", type: "system-design", difficulty: "hard", question: "Design Twitch live streaming — ingest, transcode, distribution.", tags: ["streaming", "cdn", "hls"], askedFor: "Senior", frequency: "high" },
  { id: "twitch-sd-2", company: "Twitch", type: "system-design", difficulty: "hard", question: "Design Twitch chat — millions of concurrent chat rooms.", tags: ["chat", "pubsub", "scaling"], askedFor: "Senior", frequency: "high" },
  { id: "twitch-lld-1", company: "Twitch", type: "lld", difficulty: "medium", question: "Design a bits/donation leaderboard.", tags: ["heap", "design"], askedFor: "Senior", frequency: "medium" },
  { id: "twitch-dsa-1", company: "Twitch", type: "dsa", difficulty: "medium", question: "Minimum Difficulty of a Job Schedule (DP).", tags: ["dp"], askedFor: "Senior", frequency: "medium" },

  // ── REDDIT ────────────────────────────────────────────────────────────
  { id: "reddit-sd-1", company: "Reddit", type: "system-design", difficulty: "hard", question: "Design Reddit feed — subreddit posts, upvotes/downvotes, hot ranking.", tags: ["feed", "ranking", "voting"], askedFor: "Senior", frequency: "high" },
  { id: "reddit-sd-2", company: "Reddit", type: "system-design", difficulty: "hard", question: "Design Reddit's comment tree (nested, collapsed).", tags: ["tree", "graph", "ranking"], askedFor: "Senior", frequency: "medium" },
  { id: "reddit-lld-1", company: "Reddit", type: "lld", difficulty: "medium", question: "Design a voting system (up/down, with undo).", tags: ["oop", "design"], askedFor: "Senior", frequency: "medium" },
  { id: "reddit-dsa-1", company: "Reddit", type: "dsa", difficulty: "medium", question: "Random Pick Index (reservoir sampling).", tags: ["reservoir-sampling"], askedFor: "Senior", frequency: "medium" },

  // ── DISCORD ───────────────────────────────────────────────────────────
  { id: "discord-sd-1", company: "Discord", type: "system-design", difficulty: "hard", question: "Design Discord — servers, channels, real-time messaging, voice.", tags: ["chat", "websocket", "webrtc", "pubsub"], askedFor: "Senior", frequency: "high" },
  { id: "discord-sd-2", company: "Discord", type: "system-design", difficulty: "hard", question: "Design Discord's read-state tracking (which messages are unread).", tags: ["kv-store", "design"], askedFor: "Senior", frequency: "medium" },
  { id: "discord-lld-1", company: "Discord", type: "lld", difficulty: "medium", question: "Design permission/role model for Discord servers.", tags: ["rbac", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "discord-dsa-1", company: "Discord", type: "dsa", difficulty: "medium", question: "Find the Winner of an Array Game.", tags: ["simulation"], askedFor: "Senior", frequency: "medium" },

  // ── DOORDASH extra DSA ────────────────────────────────────────────────
  { id: "doordash-dsa-4", company: "DoorDash", type: "dsa", difficulty: "medium", question: "Kth Smallest Element in Sorted Matrix.", tags: ["heap", "binary-search", "matrix"], askedFor: "Senior", frequency: "medium" },

  // ── SNAPCHAT ──────────────────────────────────────────────────────────
  { id: "snapchat-sd-1", company: "Snapchat", type: "system-design", difficulty: "hard", question: "Design Snapchat — ephemeral media upload, view-once, streaks.", tags: ["storage", "ttl", "cdn"], askedFor: "Senior", frequency: "high" },
  { id: "snapchat-sd-2", company: "Snapchat", type: "system-design", difficulty: "hard", question: "Design Snap Map — real-time location sharing.", tags: ["geo", "real-time", "privacy"], askedFor: "Senior", frequency: "medium" },
  { id: "snapchat-lld-1", company: "Snapchat", type: "lld", difficulty: "medium", question: "Design a TTL-based media store.", tags: ["cache", "ttl", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "snapchat-dsa-1", company: "Snapchat", type: "dsa", difficulty: "medium", question: "Zigzag Level Order Traversal.", tags: ["tree", "bfs"], askedFor: "Senior", frequency: "medium" },

  // ── BYTEDANCE extra ────────────────────────────────────────────────────
  { id: "bytedance-dsa-6", company: "ByteDance / TikTok", type: "dsa", difficulty: "medium", question: "Partition Labels (greedy).", tags: ["greedy", "string"], askedFor: "Senior", frequency: "medium" },

  // ── FIGMA ─────────────────────────────────────────────────────────────
  { id: "figma-sd-1", company: "Figma", type: "system-design", difficulty: "hard", question: "Design Figma — real-time collaborative vector design (CRDT).", tags: ["crdt", "ot", "canvas", "collaboration"], askedFor: "Senior", frequency: "high" },
  { id: "figma-sd-2", company: "Figma", type: "system-design", difficulty: "hard", question: "Design Figma Dev Mode — design token sync, code export.", tags: ["sync", "api"], askedFor: "Senior", frequency: "medium" },
  { id: "figma-lld-1", company: "Figma", type: "lld", difficulty: "hard",   question: "Design a vector canvas scene graph (nodes, transforms, layers).", tags: ["oop", "tree", "canvas"], askedFor: "Senior", frequency: "medium" },
  { id: "figma-dsa-1", company: "Figma", type: "dsa", difficulty: "medium", question: "Merge Overlapping Rectangles.", tags: ["intervals", "geometry"], askedFor: "Senior", frequency: "medium" },

  // ── CANVA ─────────────────────────────────────────────────────────────
  { id: "canva-sd-1", company: "Canva", type: "system-design", difficulty: "hard", question: "Design Canva — design editor, template catalog, asset CDN.", tags: ["cdn", "storage", "editor"], askedFor: "Senior", frequency: "high" },
  { id: "canva-sd-2", company: "Canva", type: "system-design", difficulty: "hard", question: "Design collaborative Canva editing (multi-user, presence).", tags: ["crdt", "websocket", "presence"], askedFor: "Senior", frequency: "medium" },
  { id: "canva-lld-1", company: "Canva", type: "lld", difficulty: "medium", question: "Design a Design Template versioning system.", tags: ["oop", "versioning"], askedFor: "Senior", frequency: "medium" },
  { id: "canva-dsa-1", company: "Canva", type: "dsa", difficulty: "medium", question: "Maximum Number of Balloons (character frequency).", tags: ["hashmap", "string"], askedFor: "Senior", frequency: "medium" },

  // ── LOOM ─────────────────────────────────────────────────────────────
  { id: "loom-sd-1", company: "Loom", type: "system-design", difficulty: "hard", question: "Design Loom — async video recording, processing, sharing.", tags: ["video", "cdn", "storage"], askedFor: "Senior", frequency: "medium" },
  { id: "loom-dsa-1", company: "Loom", type: "dsa", difficulty: "medium", question: "Check if string has all unique characters.", tags: ["hashmap", "bit-manipulation"], askedFor: "Senior", frequency: "medium" },

  // ── LINEAR ────────────────────────────────────────────────────────────
  { id: "linear-sd-1", company: "Linear", type: "system-design", difficulty: "hard", question: "Design Linear — issue tracker with offline-first CRDT sync.", tags: ["crdt", "offline", "sync"], askedFor: "Senior", frequency: "medium" },
  { id: "linear-lld-1", company: "Linear", type: "lld", difficulty: "medium", question: "Design an issue priority queue with cycles (sprint planning).", tags: ["oop", "priority-queue"], askedFor: "Senior", frequency: "medium" },

  // ── NOTION ────────────────────────────────────────────────────────────
  { id: "notion-sd-1", company: "Notion", type: "system-design", difficulty: "hard", question: "Design Notion — block-based document editor, nested pages, databases.", tags: ["blocks", "collaboration", "storage"], askedFor: "Senior", frequency: "high" },
  { id: "notion-sd-2", company: "Notion", type: "system-design", difficulty: "hard", question: "Design Notion AI — in-context LLM, block completion, summarization.", tags: ["llm", "rag", "editor"], askedFor: "Senior", frequency: "medium" },
  { id: "notion-lld-1", company: "Notion", type: "lld", difficulty: "medium", question: "Design a block document model (paragraph, heading, list, DB row).", tags: ["oop", "composite"], askedFor: "Senior", frequency: "medium" },

  // ── VERCEL / NETLIFY ─────────────────────────────────────────────────
  { id: "vercel-sd-1", company: "Vercel", type: "system-design", difficulty: "hard", question: "Design Vercel — git-connected deployment, edge functions, CDN.", tags: ["ci-cd", "edge", "cdn"], askedFor: "Senior", frequency: "medium" },
  { id: "vercel-dsa-1", company: "Vercel", type: "dsa", difficulty: "medium", question: "Longest Common Prefix.", tags: ["string", "trie"], askedFor: "Senior", frequency: "medium" },

  // ── SENTRY ────────────────────────────────────────────────────────────
  { id: "sentry-sd-1", company: "Sentry", type: "system-design", difficulty: "hard", question: "Design Sentry error tracking — ingest, group, alert.", tags: ["logging", "alerting", "dedup"], askedFor: "Senior", frequency: "medium" },
  { id: "sentry-lld-1", company: "Sentry", type: "lld", difficulty: "medium", question: "Design error fingerprinting for deduplication.", tags: ["hashing", "oop"], askedFor: "Senior", frequency: "medium" },

  // ── SEGMENT ────────────────────────────────────────────────────────────
  { id: "segment-sd-1", company: "Segment", type: "system-design", difficulty: "hard", question: "Design Segment CDP — event collection, routing to 300+ destinations.", tags: ["etl", "fan-out", "stream"], askedFor: "Senior", frequency: "medium" },
  { id: "segment-dsa-1", company: "Segment", type: "dsa", difficulty: "medium", question: "Design a fan-out queue (1 producer → N consumers).", tags: ["queue", "design"], askedFor: "Senior", frequency: "medium" },

  // ── AMPLITUDE / MIXPANEL ─────────────────────────────────────────────
  { id: "amplitude-sd-1", company: "Amplitude", type: "system-design", difficulty: "hard", question: "Design a product analytics platform — event funnels, retention.", tags: ["analytics", "olap", "funnel"], askedFor: "Senior", frequency: "medium" },
  { id: "amplitude-lld-1", company: "Amplitude", type: "lld", difficulty: "medium", question: "Design a funnel analysis engine (multi-step event sequence).", tags: ["oop", "analytics"], askedFor: "Senior", frequency: "medium" },
  { id: "amplitude-dsa-1", company: "Amplitude", type: "dsa", difficulty: "medium", question: "Consecutive Characters (max repeat run).", tags: ["string", "sliding-window"], askedFor: "Senior", frequency: "medium" },

  // ── GRAB ─────────────────────────────────────────────────────────────
  { id: "grab-sd-1", company: "Grab", type: "system-design", difficulty: "hard", question: "Design GrabCar — driver-rider matching in SEA.", tags: ["geo", "matching", "real-time"], askedFor: "Senior", frequency: "high" },
  { id: "grab-sd-2", company: "Grab", type: "system-design", difficulty: "hard", question: "Design GrabFood — restaurant, order, delivery matching.", tags: ["matching", "geo"], askedFor: "Senior", frequency: "medium" },
  { id: "grab-lld-1", company: "Grab", type: "lld", difficulty: "medium", question: "Design GrabPay wallet.", tags: ["oop", "wallet"], askedFor: "Senior", frequency: "medium" },
  { id: "grab-dsa-1", company: "Grab", type: "dsa", difficulty: "medium", question: "Minimum Cost to Make at Least One Valid Path in a Grid.", tags: ["bfs", "deque", "grid"], askedFor: "Senior", frequency: "medium" },

  // ── GOJEK ─────────────────────────────────────────────────────────────
  { id: "gojek-sd-1", company: "Gojek", type: "system-design", difficulty: "hard", question: "Design Gojek — super-app: ride, food, payments at Indonesia scale.", tags: ["geo", "matching", "payments"], askedFor: "Senior", frequency: "high" },
  { id: "gojek-lld-1", company: "Gojek", type: "lld", difficulty: "medium", question: "Design GoPay wallet with top-up + transfer.", tags: ["oop", "wallet"], askedFor: "Senior", frequency: "medium" },
  { id: "gojek-dsa-1", company: "Gojek", type: "dsa", difficulty: "medium", question: "Rotting Oranges (multi-source BFS).", tags: ["bfs", "grid"], askedFor: "Senior", frequency: "high" },

  // ── SEA / SHOPEE ─────────────────────────────────────────────────────
  { id: "shopee-sd-1", company: "Shopee", type: "system-design", difficulty: "hard", question: "Design Shopee flash sale — million users competing for limited items.", tags: ["flash-sale", "queue", "inventory"], askedFor: "Senior", frequency: "high" },
  { id: "shopee-sd-2", company: "Shopee", type: "system-design", difficulty: "hard", question: "Design Shopee Live streaming commerce.", tags: ["streaming", "commerce"], askedFor: "Senior", frequency: "medium" },
  { id: "shopee-lld-1", company: "Shopee", type: "lld", difficulty: "medium", question: "Design a product recommendation carousel.", tags: ["oop", "recommendation"], askedFor: "Senior", frequency: "medium" },
  { id: "shopee-dsa-1", company: "Shopee", type: "dsa", difficulty: "medium", question: "Maximum Frequency Elements.", tags: ["hashmap", "sorting"], askedFor: "Senior", frequency: "medium" },

  // ── RAZORPAY extra ─────────────────────────────────────────────────────
  { id: "razorpay-sd-6",  company: "Razorpay", type: "system-design", difficulty: "hard", question: "Design Razorpay Turbo Checkout (1-click, saved cards).", tags: ["checkout", "payments", "ux"], askedFor: "SDE-3", frequency: "medium" },

  // ── NYKAA ─────────────────────────────────────────────────────────────
  { id: "nykaa-sd-1", company: "Nykaa", type: "system-design", difficulty: "hard", question: "Design Nykaa beauty product discovery + recommendation.", tags: ["recommendation", "search", "ml"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "nykaa-lld-1", company: "Nykaa", type: "lld", difficulty: "medium", question: "Design a beauty subscription box picker.", tags: ["oop", "strategy"], askedFor: "SDE-2", frequency: "medium" },
  { id: "nykaa-dsa-1", company: "Nykaa", type: "dsa", difficulty: "medium", question: "Find the Most Common Item in a Dataset.", tags: ["hashmap"], askedFor: "SDE-2", frequency: "medium" },

  // ── PUMA / SPORTS E-COMMERCE ─────────────────────────────────────────
  // (generic e-commerce questions mapped to companies that ask them)

  // ── MICROSOFT (more DSA) ─────────────────────────────────────────────
  { id: "microsoft-dsa-15", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Count Primes (Sieve of Eratosthenes).", tags: ["math"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-dsa-16", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Flatten Nested List Iterator.", tags: ["iterator", "design"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-dsa-17", company: "Microsoft", type: "dsa", difficulty: "hard",   question: "K Empty Slots (ordered set / sliding window).", tags: ["ordered-set", "sliding-window"], askedFor: "L63", frequency: "medium" },

  // ── AMAZON (more SD) ──────────────────────────────────────────────────
  { id: "amazon-sd-16", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Amazon Go (cashierless store) — computer vision + billing.", tags: ["cv", "iot", "payments"], askedFor: "SDE-3", frequency: "medium" },
  { id: "amazon-sd-17", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Amazon Kindle — e-book delivery, sync, DRM.", tags: ["cdn", "drm", "sync"], askedFor: "SDE-2", frequency: "medium" },

  // ── GOOGLE (more LLD) ─────────────────────────────────────────────────
  { id: "google-lld-7", company: "Google", type: "lld", difficulty: "medium", question: "Design a thread-safe event dispatcher.", tags: ["concurrency", "oop"], askedFor: "L5", frequency: "medium" },

  // ── META (more SD) ────────────────────────────────────────────────────
  { id: "meta-sd-16", company: "Meta", type: "system-design", difficulty: "hard", question: "Design Threads (Twitter-clone): post, reply, quote, re-thread.", tags: ["feed", "graph"], askedFor: "E5", frequency: "medium" },

  // ── GENERAL / COMMONLY ASKED AT MULTIPLE COMPANIES ───────────────────
  // (tag company as where most prominently associated)
  { id: "common-sd-1",  company: "Google", type: "system-design", difficulty: "hard", question: "Design a distributed task scheduler (cron-as-a-service).", tags: ["scheduler", "queue", "cron"], askedFor: "L5", frequency: "high" },
  { id: "common-sd-2",  company: "Amazon", type: "system-design", difficulty: "hard", question: "Design a circuit breaker + service mesh.", tags: ["reliability", "service-mesh"], askedFor: "SDE-3", frequency: "medium" },
  { id: "common-dsa-1", company: "Meta",   type: "dsa", difficulty: "medium", question: "Maximum Sum Circular Subarray.", tags: ["dp", "kadane"], askedFor: "E4", frequency: "medium" },
  { id: "common-dsa-2", company: "Google", type: "dsa", difficulty: "medium", question: "Container With Most Water (two pointers).", tags: ["two-pointers"], askedFor: "L4", frequency: "high" },
  { id: "common-dsa-3", company: "Amazon", type: "dsa", difficulty: "medium", question: "Climbing Stairs.", tags: ["dp"], askedFor: "SDE-1", frequency: "high" },
  { id: "common-dsa-4", company: "Google", type: "dsa", difficulty: "hard",   question: "Regular Expression Matching (DP).", tags: ["dp", "string"], askedFor: "L5", frequency: "high" },
  { id: "common-dsa-5", company: "Amazon", type: "dsa", difficulty: "medium", question: "Squares of a Sorted Array.", tags: ["two-pointers"], askedFor: "SDE-1", frequency: "medium" },
  { id: "common-dsa-6", company: "Meta",   type: "dsa", difficulty: "medium", question: "Minimum Depth of Binary Tree.", tags: ["tree", "bfs"], askedFor: "E4", frequency: "medium" },
  { id: "common-dsa-7", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Power of Two.", tags: ["bit-manipulation", "math"], askedFor: "L62", frequency: "medium" },
  { id: "common-dsa-8", company: "Google", type: "dsa", difficulty: "medium", question: "Surrounded Regions (flood fill from border).", tags: ["dfs", "grid"], askedFor: "L4", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // GOOGLE (additional DSA / LLD)
  // ────────────────────────────────────────────────────────────────────
  { id: "google-dsa-25", company: "Google", type: "dsa", difficulty: "hard",   question: "Substring with Concatenation of All Words.", tags: ["sliding-window", "hashmap"], askedFor: "L5", frequency: "medium" },
  { id: "google-dsa-26", company: "Google", type: "dsa", difficulty: "medium", question: "Rotate List (linked list, shift k places).", tags: ["linked-list"], askedFor: "L4", frequency: "medium" },
  { id: "google-dsa-27", company: "Google", type: "dsa", difficulty: "hard",   question: "Interleaving String (DP on 2 strings).", tags: ["dp", "string"], askedFor: "L5", frequency: "medium" },
  { id: "google-dsa-28", company: "Google", type: "dsa", difficulty: "medium", question: "Unique Binary Search Trees (Catalan number DP).", tags: ["dp", "math"], askedFor: "L4", frequency: "medium" },
  { id: "google-lld-8",  company: "Google", type: "lld", difficulty: "medium", question: "Design a circuit breaker library.", tags: ["reliability", "oop", "state-machine"], askedFor: "L5", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // META (additional DSA)
  // ────────────────────────────────────────────────────────────────────
  { id: "meta-dsa-24", company: "Meta", type: "dsa", difficulty: "medium", question: "Partition List (linked list, rearrange around x).", tags: ["linked-list"], askedFor: "E4", frequency: "medium" },
  { id: "meta-dsa-25", company: "Meta", type: "dsa", difficulty: "hard",   question: "Trapping Rain Water (stack variant).", tags: ["stack"], askedFor: "E5", frequency: "high" },
  { id: "meta-dsa-26", company: "Meta", type: "dsa", difficulty: "medium", question: "Merge Sorted Array (two pointer from back).", tags: ["array", "two-pointers"], askedFor: "E3", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // AMAZON (additional DSA / LLD)
  // ────────────────────────────────────────────────────────────────────
  { id: "amazon-dsa-23", company: "Amazon", type: "dsa", difficulty: "medium", question: "Find Minimum in Rotated Sorted Array.", tags: ["binary-search"], askedFor: "SDE-1", frequency: "high" },
  { id: "amazon-dsa-24", company: "Amazon", type: "dsa", difficulty: "medium", question: "Missing Number (XOR or sum formula).", tags: ["bit-manipulation", "math"], askedFor: "SDE-1", frequency: "high" },
  { id: "amazon-dsa-25", company: "Amazon", type: "dsa", difficulty: "medium", question: "House Robber (1-D DP).", tags: ["dp"], askedFor: "SDE-1", frequency: "high" },
  { id: "amazon-dsa-26", company: "Amazon", type: "dsa", difficulty: "medium", question: "Diameter of Binary Tree.", tags: ["tree", "dfs"], askedFor: "SDE-1", frequency: "high" },
  { id: "amazon-lld-8",  company: "Amazon", type: "lld", difficulty: "medium", question: "Design an Order State Machine (placed → shipped → delivered → returned).", tags: ["state-machine", "oop"], askedFor: "SDE-2", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // MICROSOFT (additional DSA)
  // ────────────────────────────────────────────────────────────────────
  { id: "microsoft-dsa-18", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Remove Duplicates from Sorted Array II.", tags: ["array", "two-pointers"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-dsa-19", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Palindrome Partitioning (backtracking).", tags: ["dp", "backtracking"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-dsa-20", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Symmetric Tree.", tags: ["tree", "dfs"], askedFor: "L62", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // APPLE (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "apple-dsa-10", company: "Apple", type: "dsa", difficulty: "medium", question: "Excel Sheet Column Number.", tags: ["math", "string"], askedFor: "ICT3", frequency: "medium" },
  { id: "apple-dsa-11", company: "Apple", type: "dsa", difficulty: "medium", question: "Reverse Vowels of a String.", tags: ["string", "two-pointers"], askedFor: "ICT3", frequency: "medium" },
  { id: "apple-sd-10",  company: "Apple", type: "system-design", difficulty: "hard", question: "Design Spotlight (device-side + server-side search).", tags: ["search", "on-device", "indexing"], askedFor: "ICT4", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // NETFLIX (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "netflix-dsa-7", company: "Netflix", type: "dsa", difficulty: "medium", question: "Spiral Order Matrix II (generation).", tags: ["matrix"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-sd-10", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design Netflix Profiles — per-profile watch history, parental controls.", tags: ["profile", "access-control"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // UBER (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "uber-dsa-12", company: "Uber", type: "dsa", difficulty: "medium", question: "Accounts Merge (Union-Find).", tags: ["union-find"], askedFor: "L4–L5", frequency: "medium" },
  { id: "uber-sd-16",  company: "Uber", type: "system-design", difficulty: "hard", question: "Design UberX Share (pooled rides, route merging).", tags: ["routing", "matching", "geo"], askedFor: "L5", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // LINKEDIN (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "linkedin-dsa-13", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Find the Town Judge (in-degree out-degree).", tags: ["graph"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-14", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Reverse Linked List II (reverse m to n).", tags: ["linked-list"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-14",  company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn Live (live video + chat during events).", tags: ["streaming", "chat"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // STRIPE (additional DSA)
  // ────────────────────────────────────────────────────────────────────
  { id: "stripe-dsa-6", company: "Stripe", type: "dsa", difficulty: "medium", question: "Maximum Swap (one swap to maximize).", tags: ["greedy", "string"], askedFor: "L3", frequency: "medium" },
  { id: "stripe-dsa-7", company: "Stripe", type: "dsa", difficulty: "medium", question: "Multiply Strings (big integer multiply).", tags: ["math", "string"], askedFor: "L3–L4", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ATLASSIAN (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "atlassian-dsa-6", company: "Atlassian", type: "dsa", difficulty: "medium", question: "Minimum Depth of Binary Tree.", tags: ["tree", "bfs"], askedFor: "P40", frequency: "medium" },
  { id: "atlassian-sd-7",  company: "Atlassian", type: "system-design", difficulty: "hard", question: "Design Atlassian Rovo (AI search across all tools).", tags: ["search", "rag", "ai"], askedFor: "P50+", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // BLOOMBERG (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "bb-dsa-10", company: "Bloomberg", type: "dsa", difficulty: "medium", question: "Peak Index in Mountain Array.", tags: ["binary-search"], askedFor: "Senior", frequency: "medium" },
  { id: "bb-dsa-11", company: "Bloomberg", type: "dsa", difficulty: "medium", question: "Find First and Last Position of Element (binary search).", tags: ["binary-search"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // OLA (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "ola-sd-4",  company: "Ola", type: "system-design", difficulty: "hard", question: "Design Ola Maps — routing, ETA, tile serving.", tags: ["geo", "routing", "tiles"], askedFor: "SDE-3", frequency: "medium" },
  { id: "ola-lld-2", company: "Ola", type: "lld", difficulty: "medium", question: "Design a Surge Pricing rule engine.", tags: ["oop", "rules"], askedFor: "SDE-2", frequency: "medium" },
  { id: "ola-dsa-3", company: "Ola", type: "dsa", difficulty: "medium", question: "Number of Ways to Split Array.", tags: ["prefix-sum"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // HOTSTAR (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "hotstar-sd-5",  company: "Hotstar", type: "system-design", difficulty: "hard", question: "Design Hotstar Ads — pre-roll, mid-roll insertion at scale.", tags: ["ads", "cdn", "real-time"], askedFor: "SDE-3", frequency: "medium" },
  { id: "hotstar-lld-2", company: "Hotstar", type: "lld", difficulty: "medium", question: "Design a content entitlement / access-control service.", tags: ["rbac", "oop"], askedFor: "SDE-2", frequency: "medium" },
  { id: "hotstar-dsa-3", company: "Hotstar", type: "dsa", difficulty: "medium", question: "Design a bounded buffer / producer-consumer.", tags: ["concurrency", "queue"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // MAKEMYTRIP (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "mmt-dsa-3",  company: "MakeMyTrip", type: "dsa", difficulty: "medium", question: "Minimum Number of Jumps (greedy).", tags: ["greedy"], askedFor: "SDE-2", frequency: "medium" },
  { id: "mmt-sd-4",   company: "MakeMyTrip", type: "system-design", difficulty: "hard", question: "Design an airline loyalty points engine.", tags: ["rewards", "ledger"], askedFor: "SDE-3", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SWIGGY (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "swiggy-sd-6",  company: "Swiggy", type: "system-design", difficulty: "hard", question: "Design Swiggy Money (in-app wallet).", tags: ["wallet", "payments"], askedFor: "SDE-3", frequency: "medium" },
  { id: "swiggy-dsa-4", company: "Swiggy", type: "dsa", difficulty: "medium", question: "Count Triplets that Form Geometric Progression.", tags: ["hashmap", "math"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ZOHO (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "zoho-dsa-4",  company: "Zoho", type: "dsa", difficulty: "medium", question: "Sort by Parity.", tags: ["array", "two-pointers"], askedFor: "Mid", frequency: "medium" },
  { id: "zoho-lld-3",  company: "Zoho", type: "lld", difficulty: "medium", question: "Design a Gantt chart model.", tags: ["oop", "intervals"], askedFor: "Senior", frequency: "medium" },
  { id: "zoho-sd-3",   company: "Zoho", type: "system-design", difficulty: "hard", question: "Design Zoho Meetings (video conferencing).", tags: ["webrtc", "media"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // FRESHWORKS (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "freshworks-sd-3",  company: "Freshworks", type: "system-design", difficulty: "hard", question: "Design FreshService — IT service management (ITSM).", tags: ["workflow", "multi-tenant"], askedFor: "Senior", frequency: "medium" },
  { id: "freshworks-dsa-3", company: "Freshworks", type: "dsa", difficulty: "medium", question: "Find Words Containing Character.", tags: ["string", "hashmap"], askedFor: "Mid", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // INTUIT (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "intuit-sd-3",  company: "Intuit", type: "system-design", difficulty: "hard", question: "Design Intuit Mint — bank account aggregation, categorization.", tags: ["aggregation", "ml"], askedFor: "Senior", frequency: "medium" },
  { id: "intuit-lld-2", company: "Intuit", type: "lld", difficulty: "medium", question: "Design a tax rule evaluation engine.", tags: ["rules", "oop"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // DATADOG (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "datadog-sd-4",  company: "Datadog", type: "system-design", difficulty: "hard", question: "Design a distributed alerting system with silence/mute windows.", tags: ["alerting", "time-based"], askedFor: "Senior", frequency: "medium" },
  { id: "datadog-dsa-2", company: "Datadog", type: "dsa", difficulty: "medium", question: "Find duplicate subtrees (tree hashing).", tags: ["tree", "hashmap"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SPOTIFY (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "spotify-sd-6",  company: "Spotify", type: "system-design", difficulty: "hard", question: "Design Spotify Live Events ticketing.", tags: ["ticketing", "booking"], askedFor: "Senior", frequency: "medium" },
  { id: "spotify-dsa-4", company: "Spotify", type: "dsa", difficulty: "medium", question: "Design a Skip Iterator.", tags: ["iterator", "design"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // DISCORD (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "discord-sd-3",  company: "Discord", type: "system-design", difficulty: "hard", question: "Design Discord Nitro — subscription + perks.", tags: ["subscription", "cdn"], askedFor: "Senior", frequency: "medium" },
  { id: "discord-dsa-2", company: "Discord", type: "dsa", difficulty: "medium", question: "Design Ordered Stream.", tags: ["design", "queue"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // TWITCH (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "twitch-sd-3",  company: "Twitch", type: "system-design", difficulty: "hard", question: "Design Twitch Drops (reward system for watching streams).", tags: ["rewards", "real-time"], askedFor: "Senior", frequency: "medium" },
  { id: "twitch-dsa-2", company: "Twitch", type: "dsa", difficulty: "medium", question: "Find All Good Strings (DP + KMP).", tags: ["dp", "kmp"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // GRAB (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "grab-sd-3",  company: "Grab", type: "system-design", difficulty: "hard", question: "Design GrabExpress (same-day package delivery).", tags: ["delivery", "matching", "geo"], askedFor: "Senior", frequency: "medium" },
  { id: "grab-dsa-2", company: "Grab", type: "dsa", difficulty: "medium", question: "Find Largest Value in Each Tree Row.", tags: ["tree", "bfs"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // GOLDMAN SACHS (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "gs-sd-4",  company: "Goldman Sachs", type: "system-design", difficulty: "hard", question: "Design a compliance / audit-trail logging system.", tags: ["audit", "immutability"], askedFor: "SWE", frequency: "medium" },
  { id: "gs-dsa-4", company: "Goldman Sachs", type: "dsa", difficulty: "medium", question: "Summary Ranges.", tags: ["array", "string"], askedFor: "Analyst", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // TESLA (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "tesla-sd-5",  company: "Tesla", type: "system-design", difficulty: "hard", question: "Design Tesla Autopilot data pipeline (sensor → model → feedback).", tags: ["ml", "pipeline", "iot"], askedFor: "Senior SWE", frequency: "medium" },
  { id: "tesla-dsa-3", company: "Tesla", type: "dsa", difficulty: "medium", question: "Find Peak Element in 2D Matrix.", tags: ["binary-search", "matrix"], askedFor: "SWE", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // NVIDIA (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "nvidia-sd-4",  company: "NVIDIA", type: "system-design", difficulty: "hard", question: "Design CUDA kernel scheduling system.", tags: ["gpu", "scheduler"], askedFor: "Senior SWE", frequency: "medium" },
  { id: "nvidia-dsa-3", company: "NVIDIA", type: "dsa", difficulty: "hard",   question: "Minimum Cost to Cut a Stick (interval DP).", tags: ["dp", "interval-dp"], askedFor: "SWE", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // COINBASE (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "coinbase-sd-5",  company: "Coinbase", type: "system-design", difficulty: "hard", question: "Design a DeFi protocol fee aggregation service.", tags: ["blockchain", "stream"], askedFor: "L4+", frequency: "low" },
  { id: "coinbase-dsa-3", company: "Coinbase", type: "dsa", difficulty: "medium", question: "Design a TimedMap (get value at given timestamp).", tags: ["binary-search", "design"], askedFor: "L4", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // BOOKING.COM (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "booking-sd-5",  company: "Booking.com", type: "system-design", difficulty: "hard", question: "Design Booking.com Genius loyalty tier system.", tags: ["rewards", "tiers"], askedFor: "Senior", frequency: "medium" },
  { id: "booking-dsa-3", company: "Booking.com", type: "dsa", difficulty: "medium", question: "Minimum Operations to Reduce X to Zero.", tags: ["sliding-window", "prefix-sum"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // REDDIT (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "reddit-sd-3",  company: "Reddit", type: "system-design", difficulty: "hard", question: "Design Reddit Awards / karma system.", tags: ["rewards", "gamification"], askedFor: "Senior", frequency: "medium" },
  { id: "reddit-dsa-2", company: "Reddit", type: "dsa", difficulty: "medium", question: "Score of Parentheses (stack).", tags: ["stack", "string"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SNAPCHAT (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "snapchat-sd-3",  company: "Snapchat", type: "system-design", difficulty: "hard", question: "Design Snapchat Bitmoji avatar generation + CDN.", tags: ["cdn", "ml", "assets"], askedFor: "Senior", frequency: "medium" },
  { id: "snapchat-dsa-2", company: "Snapchat", type: "dsa", difficulty: "medium", question: "Shortest Path in Binary Matrix (BFS).", tags: ["bfs", "grid"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // PALANTIR (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "palantir-dsa-4", company: "Palantir", type: "dsa", difficulty: "hard",   question: "Maximum Vacation Days (DP on graph).", tags: ["dp", "graph"], askedFor: "SWE", frequency: "medium" },
  { id: "palantir-sd-4",  company: "Palantir", type: "system-design", difficulty: "hard", question: "Design a data lineage graph for GDPR compliance.", tags: ["graph", "privacy", "lineage"], askedFor: "SWE", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // WISE (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "wise-sd-3",  company: "Wise", type: "system-design", difficulty: "hard", question: "Design Wise Business — batch payroll, bulk transfers.", tags: ["payments", "batch", "ach"], askedFor: "Senior", frequency: "medium" },
  { id: "wise-dsa-2", company: "Wise", type: "dsa", difficulty: "medium", question: "Count Valid Transactions (simulation).", tags: ["simulation", "hashmap"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // TWILIO (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "twilio-sd-3",  company: "Twilio", type: "system-design", difficulty: "hard", question: "Design Twilio Flex (cloud contact centre).", tags: ["telephony", "queue", "routing"], askedFor: "Senior", frequency: "medium" },
  { id: "twilio-dsa-2", company: "Twilio", type: "dsa", difficulty: "medium", question: "Group Strings by Shift Sequence.", tags: ["hashmap", "string"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // PAGERDUTY (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "pd-sd-3",  company: "PagerDuty", type: "system-design", difficulty: "hard", question: "Design a schedule override system for on-call rotations.", tags: ["scheduling", "calendar"], askedFor: "Senior", frequency: "medium" },
  { id: "pd-dsa-2", company: "PagerDuty", type: "dsa", difficulty: "medium", question: "Campus Bikes (greedy Manhattan distance).", tags: ["greedy", "geo"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ELASTIC (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "elastic-sd-3",  company: "Elastic", type: "system-design", difficulty: "hard", question: "Design Elastic APM — distributed tracing + performance monitoring.", tags: ["tracing", "observability", "apm"], askedFor: "Senior", frequency: "medium" },
  { id: "elastic-dsa-2", company: "Elastic", type: "dsa", difficulty: "medium", question: "Search Suggestions System (trie + top-3).", tags: ["trie", "heap"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // FIGMA (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "figma-sd-3",  company: "Figma", type: "system-design", difficulty: "hard", question: "Design Figma branching (version control for designs).", tags: ["versioning", "crdt"], askedFor: "Senior", frequency: "medium" },
  { id: "figma-dsa-2", company: "Figma", type: "dsa", difficulty: "medium", question: "Rectangle Overlap check.", tags: ["geometry", "math"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SHOPEE (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "shopee-sd-3",  company: "Shopee", type: "system-design", difficulty: "hard", question: "Design ShopeePay — digital wallet, QR code payments.", tags: ["wallet", "payments", "qr"], askedFor: "Senior", frequency: "medium" },
  { id: "shopee-dsa-2", company: "Shopee", type: "dsa", difficulty: "medium", question: "Maximum Number of Events Attended.", tags: ["greedy", "heap", "intervals"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // NOTION (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "notion-sd-3",  company: "Notion", type: "system-design", difficulty: "hard", question: "Design Notion API (public API for third-party integrations).", tags: ["api", "rate-limit", "auth"], askedFor: "Senior", frequency: "medium" },
  { id: "notion-dsa-1", company: "Notion", type: "dsa", difficulty: "medium", question: "Serialize/Deserialize a nested JSON structure.", tags: ["recursion", "tree"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // CANVA (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "canva-sd-3",  company: "Canva", type: "system-design", difficulty: "hard", question: "Design Canva Print — submit designs to printing factories.", tags: ["workflow", "printing"], askedFor: "Senior", frequency: "medium" },
  { id: "canva-dsa-2", company: "Canva", type: "dsa", difficulty: "medium", question: "Determine if Two Strings Are Close.", tags: ["hashmap", "string"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SENTRY (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "sentry-sd-2",  company: "Sentry", type: "system-design", difficulty: "hard", question: "Design Sentry Replays — record and replay browser sessions.", tags: ["recording", "cdn", "playback"], askedFor: "Senior", frequency: "medium" },
  { id: "sentry-dsa-1", company: "Sentry", type: "dsa", difficulty: "medium", question: "Find All Duplicates in Array.", tags: ["array", "hashmap"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // SAP LABS (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "sap-sd-2",  company: "SAP Labs", type: "system-design", difficulty: "hard", question: "Design a supply chain visibility platform.", tags: ["logistics", "graph", "stream"], askedFor: "Senior", frequency: "medium" },
  { id: "sap-lld-2", company: "SAP Labs", type: "lld", difficulty: "medium", question: "Design a Purchase Order approval workflow.", tags: ["state-machine", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "sap-dsa-2", company: "SAP Labs", type: "dsa", difficulty: "medium", question: "Minimum Spanning Tree (Kruskal).", tags: ["graph", "mst"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // MONGODB (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "mongodb-sd-3",  company: "MongoDB", type: "system-design", difficulty: "hard", question: "Design MongoDB Change Streams (real-time CDC).", tags: ["cdc", "stream", "replication"], askedFor: "Senior", frequency: "medium" },
  { id: "mongodb-dsa-2", company: "MongoDB", type: "dsa", difficulty: "medium", question: "Find Kth Ancestor of a Tree Node.", tags: ["tree", "binary-lifting"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // OPENAI (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "openai-sd-5",  company: "OpenAI", type: "system-design", difficulty: "hard", question: "Design a fine-tuning job management system for LLMs.", tags: ["ml", "job-scheduler", "gpu"], askedFor: "Senior", frequency: "medium" },
  { id: "openai-dsa-3", company: "OpenAI", type: "dsa", difficulty: "medium", question: "Count Good Triplets.", tags: ["dp", "sorted-list"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // REDIS LABS (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "redis-sd-3",  company: "Redis Labs", type: "system-design", difficulty: "hard", question: "Design RedisSearch — full-text search on top of Redis.", tags: ["search", "inverted-index", "redis"], askedFor: "Senior", frequency: "medium" },
  { id: "redis-dsa-2", company: "Redis Labs", type: "dsa", difficulty: "medium", question: "Implement Least Frequently Used (LFU) cache.", tags: ["cache", "design"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // CONFLUENT (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "confluent-sd-3",  company: "Confluent", type: "system-design", difficulty: "hard", question: "Design Kafka Connect — source/sink connector framework.", tags: ["kafka", "etl", "connectors"], askedFor: "Senior", frequency: "medium" },
  { id: "confluent-dsa-2", company: "Confluent", type: "dsa", difficulty: "medium", question: "Design a Queue using Two Stacks.", tags: ["queue", "stack", "design"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // DOORDASH + LYFT + extra closure
  // ────────────────────────────────────────────────────────────────────
  { id: "doordash-sd-5",  company: "DoorDash", type: "system-design", difficulty: "hard", question: "Design DoorDash Kitchens (ghost kitchens) order flow.", tags: ["kitchen", "workflow"], askedFor: "Senior", frequency: "medium" },
  { id: "lyft-sd-4",      company: "Lyft", type: "system-design", difficulty: "hard", question: "Design Lyft Business (corporate accounts, billing).", tags: ["billing", "corporate"], askedFor: "Senior", frequency: "medium" },
  { id: "lyft-dsa-4",     company: "Lyft", type: "dsa", difficulty: "medium", question: "All Nodes Distance K in Binary Tree.", tags: ["tree", "bfs"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // ZERODHA (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "zerodha-sd-4",  company: "Zerodha", type: "system-design", difficulty: "hard", question: "Design a real-time margin calculation engine.", tags: ["trading", "real-time", "math"], askedFor: "Senior", frequency: "medium" },
  { id: "zerodha-dsa-4", company: "Zerodha", type: "dsa", difficulty: "medium", question: "Best Time to Buy and Sell Stock III (at most 2 transactions).", tags: ["dp"], askedFor: "Senior", frequency: "high" },

  // ────────────────────────────────────────────────────────────────────
  // PHONEPE + PAYTM (additional)
  // ────────────────────────────────────────────────────────────────────
  { id: "phonepe-sd-5",  company: "PhonePe", type: "system-design", difficulty: "hard", question: "Design PhonePe insurance marketplace.", tags: ["marketplace", "workflow"], askedFor: "SDE-3", frequency: "low" },
  { id: "paytm-sd-4",    company: "Paytm", type: "system-design", difficulty: "hard", question: "Design Paytm Insider (events ticketing).", tags: ["ticketing", "booking", "inventory"], askedFor: "SDE-3", frequency: "medium" },
  { id: "paytm-dsa-4",   company: "Paytm", type: "dsa", difficulty: "medium", question: "Count Primes (Sieve, optimized).", tags: ["math", "sieve"], askedFor: "SDE-2", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // FINAL TOP-UP — reaching 1000+
  // ────────────────────────────────────────────────────────────────────
  { id: "google-sd-19",  company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Translate — batch + streaming NMT inference.", tags: ["ml", "nlp", "inference"], askedFor: "L5", frequency: "medium" },
  { id: "meta-sd-17",    company: "Meta", type: "system-design", difficulty: "hard", question: "Design Meta Quest / VR social space.", tags: ["vr", "real-time", "spatial"], askedFor: "E5", frequency: "low" },
  { id: "amazon-sd-18",  company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Amazon Rekognition — image classification at scale.", tags: ["ml", "cv", "inference"], askedFor: "SDE-3", frequency: "medium" },
  { id: "microsoft-sd-12",company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design Microsoft Loop (collaborative workspace).", tags: ["crdt", "collaboration"], askedFor: "L63", frequency: "medium" },
  { id: "apple-sd-11",   company: "Apple", type: "system-design", difficulty: "hard", question: "Design Find My — device location broadcast, privacy-preserving.", tags: ["ble", "privacy", "geo"], askedFor: "ICT4", frequency: "medium" },
  { id: "netflix-sd-11", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design Netflix Downloads (offline viewing, DRM).", tags: ["drm", "storage", "offline"], askedFor: "Senior", frequency: "medium" },
  { id: "uber-sd-17",    company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber's A/B testing platform for pricing experiments.", tags: ["experimentation", "metrics"], askedFor: "L5", frequency: "medium" },
  { id: "linkedin-sd-15",company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn Open to Work feature (signal to recruiters).", tags: ["privacy", "graph", "signal"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-sd-8",   company: "Airbnb", type: "system-design", difficulty: "hard", question: "Design Airbnb Luxe — high-end listing with concierge services.", tags: ["marketplace", "workflow"], askedFor: "Senior", frequency: "low" },
  { id: "stripe-sd-8",   company: "Stripe", type: "system-design", difficulty: "hard", question: "Design Stripe Terminal (in-person payments SDK).", tags: ["sdk", "pos", "payments"], askedFor: "L3–L4", frequency: "medium" },
  { id: "twitter-sd-8",  company: "Twitter / X", type: "system-design", difficulty: "hard", question: "Design X Premium subscriptions + paywalled content.", tags: ["subscription", "paywall"], askedFor: "Senior", frequency: "medium" },
  { id: "bytedance-sd-7",company: "ByteDance / TikTok", type: "system-design", difficulty: "hard", question: "Design TikTok Shop — in-app social commerce checkout.", tags: ["commerce", "checkout", "live"], askedFor: "Senior", frequency: "medium" },
  { id: "atlassian-sd-8",company: "Atlassian", type: "system-design", difficulty: "hard", question: "Design Atlassian Forge (serverless extensibility platform).", tags: ["serverless", "sandboxing"], askedFor: "P50+", frequency: "medium" },
  { id: "flipkart-sd-7", company: "Flipkart", type: "system-design", difficulty: "hard", question: "Design Flipkart Ads platform (seller-sponsored listings).", tags: ["ads", "ranking", "auction"], askedFor: "SDE-3", frequency: "medium" },
  { id: "swiggy-sd-7",   company: "Swiggy", type: "system-design", difficulty: "hard", question: "Design Swiggy Genie (instant courier delivery).", tags: ["geo", "matching", "real-time"], askedFor: "SDE-3", frequency: "medium" },
  { id: "zomato-sd-4",   company: "Zomato", type: "system-design", difficulty: "hard", question: "Design Zomato Feeding India (CSR food distribution).", tags: ["logistics", "routing"], askedFor: "SDE-3", frequency: "low" },
  { id: "razorpay-sd-7", company: "Razorpay", type: "system-design", difficulty: "hard", question: "Design Razorpay Capital (BNPL + business loans).", tags: ["fintech", "risk", "ledger"], askedFor: "SDE-3", frequency: "medium" },
  { id: "phonepe-sd-6",  company: "PhonePe", type: "system-design", difficulty: "hard", question: "Design PhonePe Business Recharge (bulk airtime top-ups).", tags: ["telecom", "batch", "payments"], askedFor: "SDE-3", frequency: "low" },
  // DSA top-up
  { id: "google-dsa-29",  company: "Google", type: "dsa", difficulty: "medium", question: "Determine if Two Events Have Conflict.", tags: ["intervals", "string"], askedFor: "L4", frequency: "medium" },
  { id: "meta-dsa-27",    company: "Meta", type: "dsa", difficulty: "medium", question: "Diameter of N-ary Tree.", tags: ["tree", "dfs"], askedFor: "E4", frequency: "medium" },
  { id: "amazon-dsa-27",  company: "Amazon", type: "dsa", difficulty: "medium", question: "Number of Good Pairs.", tags: ["hashmap"], askedFor: "SDE-1", frequency: "medium" },
  { id: "microsoft-dsa-21",company:"Microsoft", type: "dsa", difficulty: "medium", question: "Keyboard Row (filter words by keyboard row).", tags: ["string", "hashmap"], askedFor: "L62", frequency: "medium" },
  { id: "apple-dsa-12",   company: "Apple", type: "dsa", difficulty: "medium", question: "Design Add Bold Tag in String.", tags: ["string", "intervals"], askedFor: "ICT3", frequency: "medium" },
  { id: "netflix-dsa-8",  company: "Netflix", type: "dsa", difficulty: "medium", question: "Compress String with Run-Length Encoding.", tags: ["string"], askedFor: "Senior", frequency: "medium" },
  { id: "uber-dsa-13",    company: "Uber", type: "dsa", difficulty: "medium", question: "Diagonal Traverse.", tags: ["matrix"], askedFor: "L4", frequency: "medium" },
  { id: "linkedin-dsa-15",company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Biggest Single Number.", tags: ["hashmap"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-dsa-7",   company: "Airbnb", type: "dsa", difficulty: "medium", question: "Find K Pairs with Smallest Sums.", tags: ["heap"], askedFor: "Senior", frequency: "medium" },
  { id: "stripe-dsa-8",   company: "Stripe", type: "dsa", difficulty: "medium", question: "Minimum Time to Collect All Apples in a Tree.", tags: ["tree", "dfs"], askedFor: "L3", frequency: "medium" },
  { id: "atlassian-dsa-7",company: "Atlassian", type: "dsa", difficulty: "medium", question: "Count of Smaller Numbers After Self (BIT/merge-sort).", tags: ["bit", "merge-sort"], askedFor: "P50", frequency: "medium" },
  { id: "bloomberg-dsa-12",company:"Bloomberg", type: "dsa", difficulty: "medium", question: "Find N Unique Integers Sum up to Zero.", tags: ["array", "math"], askedFor: "Senior", frequency: "medium" },
  { id: "bytedance-dsa-7",company: "ByteDance / TikTok", type: "dsa", difficulty: "medium", question: "Maximum Product Subarray.", tags: ["dp"], askedFor: "Senior", frequency: "high" },
  { id: "spotify-dsa-5",  company: "Spotify", type: "dsa", difficulty: "medium", question: "Unique Morse Code Words.", tags: ["hashmap", "string"], askedFor: "Senior", frequency: "medium" },
  { id: "github-dsa-3",   company: "GitHub", type: "dsa", difficulty: "medium", question: "Number of Distinct Substrings (suffix array / rolling hash).", tags: ["string", "hashing"], askedFor: "Senior", frequency: "medium" },
  { id: "openai-dsa-4",   company: "OpenAI", type: "dsa", difficulty: "hard",   question: "K-th Nearest Neighbors in high-dimensional space (LSH).", tags: ["hashing", "ann", "math"], askedFor: "Senior", frequency: "medium" },
  { id: "tesla-dsa-4",    company: "Tesla", type: "dsa", difficulty: "medium", question: "Minimum Cost to Merge Stones.", tags: ["dp", "interval-dp"], askedFor: "SWE", frequency: "medium" },
  { id: "gs-dsa-5",       company: "Goldman Sachs", type: "dsa", difficulty: "medium", question: "Find All Possible Recipes (topological sort + hashmap).", tags: ["graph", "topo-sort"], askedFor: "Analyst", frequency: "medium" },
  { id: "twitch-dsa-3",   company: "Twitch", type: "dsa", difficulty: "medium", question: "Count Nice Pairs in Array.", tags: ["hashmap", "math"], askedFor: "Senior", frequency: "medium" },
  { id: "discord-dsa-3",  company: "Discord", type: "dsa", difficulty: "medium", question: "Find All People with Secret (BFS / Union-Find with time).", tags: ["graph", "union-find"], askedFor: "Senior", frequency: "medium" },
  { id: "grab-dsa-3",     company: "Grab", type: "dsa", difficulty: "medium", question: "Number of Provinces (Union-Find).", tags: ["union-find", "graph"], askedFor: "Senior", frequency: "high" },
  { id: "shopee-dsa-3",   company: "Shopee", type: "dsa", difficulty: "medium", question: "Minimum Cost of Hiring K Workers.", tags: ["heap", "greedy"], askedFor: "Senior", frequency: "medium" },

  // ────────────────────────────────────────────────────────────────────
  // ADDITIONAL QUESTIONS — May 2026 batch
  // ────────────────────────────────────────────────────────────────────

  // --- Uber (deep-dive) ---
  { id: "uber-sd-18",  company: "Uber", type: "system-design", difficulty: "hard",   question: "Design Uber Freight — connecting shippers with truck carriers.", tags: ["matching", "geo", "marketplace"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-19",  company: "Uber", type: "system-design", difficulty: "hard",   question: "Design Uber's real-time driver-location ingestion pipeline (millions of GPS pings/sec).", tags: ["stream", "geo", "kafka", "kv-store"], askedFor: "L5–L6", frequency: "high", note: "Core infra question. Focus on write fan-out, hotspot sharding, and geo-index freshness." },
  { id: "uber-sd-20",  company: "Uber", type: "system-design", difficulty: "hard",   question: "Design Uber's map-matching service (snap GPS trace to road network).", tags: ["geo", "graph", "hmm"], askedFor: "L5", frequency: "medium" },
  { id: "uber-lld-7",  company: "Uber", type: "lld", difficulty: "medium",            question: "Design a Trip state-machine (requested→accepted→started→completed/cancelled).", tags: ["state-machine", "oop"], askedFor: "L4", frequency: "high" },
  { id: "uber-lld-8",  company: "Uber", type: "lld", difficulty: "medium",            question: "Design Uber's dynamic pricing (surge multiplier) calculator class.", tags: ["strategy", "math"], askedFor: "L4", frequency: "medium" },
  { id: "uber-dsa-14", company: "Uber", type: "dsa", difficulty: "medium",            question: "Find All Anagrams in a String.", tags: ["sliding-window", "hashmap"], askedFor: "L4", frequency: "high" },
  { id: "uber-dsa-15", company: "Uber", type: "dsa", difficulty: "hard",              question: "Minimum Interval to Include Each Query (offline sweep + heap).", tags: ["intervals", "heap", "sorting"], askedFor: "L5", frequency: "medium" },
  { id: "uber-dsa-16", company: "Uber", type: "dsa", difficulty: "medium",            question: "Reorganize String (greedy + max-heap).", tags: ["greedy", "heap", "string"], askedFor: "L4", frequency: "high" },
  { id: "uber-dsa-17", company: "Uber", type: "dsa", difficulty: "medium",            question: "Design Underground System (check-in/check-out average travel time).", tags: ["hashmap", "design"], askedFor: "L4", frequency: "high" },

  // --- LinkedIn (deep-dive) ---
  { id: "linkedin-sd-16", company: "LinkedIn", type: "system-design", difficulty: "hard",   question: "Design LinkedIn Salary Insights — crowdsourced salary data with privacy.", tags: ["privacy", "aggregation", "dp"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-17", company: "LinkedIn", type: "system-design", difficulty: "hard",   question: "Design LinkedIn Learning — video course platform with progress tracking.", tags: ["video", "cdn", "progress"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-18", company: "LinkedIn", type: "system-design", difficulty: "hard",   question: "Design LinkedIn Job Recommendation engine.", tags: ["recommendation", "ml", "graph"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-sd-19", company: "LinkedIn", type: "system-design", difficulty: "hard",   question: "Design LinkedIn InMail delivery with read receipts and spam filtering.", tags: ["messaging", "spam", "ml"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-lld-5b", company: "LinkedIn", type: "lld", difficulty: "medium",            question: "Design a Connection Request workflow (send/accept/withdraw/ignore).", tags: ["oop", "state-machine"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-lld-6", company: "LinkedIn", type: "lld", difficulty: "medium",            question: "Design a Newsfeed ranking pipeline (multi-signal scoring).", tags: ["strategy", "ranking"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-16", company: "LinkedIn", type: "dsa", difficulty: "medium",           question: "Find the Celebrity (implicit graph).", tags: ["graph", "two-pointers"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-dsa-17", company: "LinkedIn", type: "dsa", difficulty: "medium",           question: "Nested List Weight Sum II (reverse level sum).", tags: ["dfs", "bfs"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-18", company: "LinkedIn", type: "dsa", difficulty: "hard",             question: "Paint House III — DP with neighborhood cost constraint.", tags: ["dp"], askedFor: "Senior", frequency: "medium" },

  // --- Google (more) ---
  { id: "google-sd-20",  company: "Google", type: "system-design", difficulty: "hard",  question: "Design Google Meet — large group video conferencing.", tags: ["webrtc", "sfu", "media"], askedFor: "L5", frequency: "medium" },
  { id: "google-sd-21",  company: "Google", type: "system-design", difficulty: "hard",  question: "Design Google Pay UPI backend.", tags: ["upi", "payments", "idempotency"], askedFor: "L5", frequency: "medium" },
  { id: "google-lld-8b",  company: "Google", type: "lld", difficulty: "medium",           question: "Design a thread-safe object pool.", tags: ["concurrency", "pool"], askedFor: "L5", frequency: "medium" },
  { id: "google-dsa-30", company: "Google", type: "dsa", difficulty: "hard",             question: "Smallest Range Covering Elements from K Lists.", tags: ["heap", "sliding-window"], askedFor: "L5", frequency: "medium" },
  { id: "google-dsa-31", company: "Google", type: "dsa", difficulty: "medium",           question: "Minimum Number of Arrows to Burst Balloons.", tags: ["greedy", "intervals"], askedFor: "L4", frequency: "medium" },
  { id: "google-dsa-32", company: "Google", type: "dsa", difficulty: "medium",           question: "Decode String (nested brackets).", tags: ["stack", "string"], askedFor: "L4", frequency: "high" },

  // --- Meta (more) ---
  { id: "meta-sd-18",  company: "Meta", type: "system-design", difficulty: "hard",   question: "Design WhatsApp Status (Stories clone, 24-hr TTL).", tags: ["ttl", "cdn", "fan-out"], askedFor: "E5", frequency: "medium" },
  { id: "meta-sd-19",  company: "Meta", type: "system-design", difficulty: "hard",   question: "Design Threads (text microblogging on ActivityPub).", tags: ["federation", "feed", "graph"], askedFor: "E5–E6", frequency: "medium" },
  { id: "meta-lld-7",  company: "Meta", type: "lld", difficulty: "medium",            question: "Design a DOM event system (addEventListener/dispatchEvent).", tags: ["observer", "oop"], askedFor: "E5", frequency: "medium" },
  { id: "meta-dsa-28", company: "Meta", type: "dsa", difficulty: "medium",            question: "Merge Intervals.", tags: ["intervals", "sorting"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-29", company: "Meta", type: "dsa", difficulty: "hard",              question: "Burst Balloons — interval DP.", tags: ["dp", "interval-dp"], askedFor: "E5", frequency: "medium" },

  // --- Amazon (more) ---
  { id: "amazon-sd-19", company: "Amazon", type: "system-design", difficulty: "hard",  question: "Design AWS Lambda — serverless function execution platform.", tags: ["serverless", "sandbox", "scaling"], askedFor: "SDE-3", frequency: "high" },
  { id: "amazon-sd-20", company: "Amazon", type: "system-design", difficulty: "hard",  question: "Design Amazon DynamoDB partitioning & replication.", tags: ["kv-store", "partitioning", "consistency"], askedFor: "SDE-3", frequency: "medium" },
  { id: "amazon-lld-7b", company: "Amazon", type: "lld", difficulty: "medium",           question: "Design Amazon Go (cashierless store) checkout system.", tags: ["oop", "sensors", "inventory"], askedFor: "SDE-2", frequency: "low" },
  { id: "amazon-dsa-28", company: "Amazon", type: "dsa", difficulty: "medium",          question: "Partition Labels.", tags: ["greedy", "two-pointers"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-dsa-29", company: "Amazon", type: "dsa", difficulty: "medium",          question: "Top K Frequent Words.", tags: ["heap", "hashmap"], askedFor: "SDE-1/2", frequency: "high" },

  // --- Microsoft (more) ---
  { id: "microsoft-sd-13", company: "Microsoft", type: "system-design", difficulty: "hard",  question: "Design GitHub Copilot inference service (LLM at scale).", tags: ["llm", "inference", "latency"], askedFor: "L64+", frequency: "medium" },
  { id: "microsoft-lld-7", company: "Microsoft", type: "lld", difficulty: "medium",           question: "Design a concurrent download manager.", tags: ["concurrency", "queue"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-dsa-22", company: "Microsoft", type: "dsa", difficulty: "medium",          question: "Max Consecutive Ones III (sliding window with flips).", tags: ["sliding-window"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-dsa-23", company: "Microsoft", type: "dsa", difficulty: "medium",          question: "All Nodes Distance K in Binary Tree.", tags: ["tree", "bfs"], askedFor: "L62", frequency: "medium" },

  // --- Apple (more) ---
  { id: "apple-sd-12", company: "Apple", type: "system-design", difficulty: "hard",   question: "Design App Store review & rating moderation at scale.", tags: ["moderation", "ml", "search"], askedFor: "ICT4", frequency: "medium" },
  { id: "apple-lld-7", company: "Apple", type: "lld", difficulty: "medium",            question: "Design iOS Notification Center (grouping, priority, do-not-disturb).", tags: ["oop", "priority", "state"], askedFor: "ICT3", frequency: "medium" },
  { id: "apple-dsa-13", company: "Apple", type: "dsa", difficulty: "medium",           question: "Verifying an Alien Dictionary (custom sort).", tags: ["string", "hashmap"], askedFor: "ICT3", frequency: "medium" },

  // --- Netflix (more) ---
  { id: "netflix-sd-12", company: "Netflix", type: "system-design", difficulty: "hard",  question: "Design Netflix's Chaos Engineering platform (Chaos Monkey).", tags: ["resiliency", "chaos", "orchestration"], askedFor: "Senior", frequency: "low" },
  { id: "netflix-lld-4", company: "Netflix", type: "lld", difficulty: "medium",           question: "Design a Circuit Breaker library.", tags: ["resilience", "state-machine"], askedFor: "Senior", frequency: "high" },
  { id: "netflix-dsa-9", company: "Netflix", type: "dsa", difficulty: "medium",           question: "Integer to English Words.", tags: ["math", "string"], askedFor: "Senior", frequency: "medium" },

  // --- Stripe (more) ---
  { id: "stripe-sd-9",  company: "Stripe", type: "system-design", difficulty: "hard",  question: "Design Stripe Radar (real-time fraud detection).", tags: ["fraud", "ml", "stream"], askedFor: "L3–L4", frequency: "high" },
  { id: "stripe-lld-5", company: "Stripe", type: "lld", difficulty: "medium",           question: "Design an SDK for accepting card payments (tokenisation).", tags: ["sdk", "security", "oop"], askedFor: "L3", frequency: "medium" },
  { id: "stripe-dsa-9", company: "Stripe", type: "dsa", difficulty: "medium",           question: "Minimum Penalty for a Shop (prefix sum of missed customers).", tags: ["prefix-sum", "greedy"], askedFor: "L3", frequency: "medium" },

  // --- Atlassian (more) ---
  { id: "atlassian-sd-9",  company: "Atlassian", type: "system-design", difficulty: "hard",  question: "Design Bitbucket CI/CD pipeline execution engine.", tags: ["ci-cd", "scheduler", "containers"], askedFor: "P50+", frequency: "medium" },
  { id: "atlassian-lld-6", company: "Atlassian", type: "lld", difficulty: "medium",           question: "Design Jira workflow engine (states, transitions, validators).", tags: ["state-machine", "workflow", "oop"], askedFor: "P50", frequency: "high" },
  { id: "atlassian-dsa-8", company: "Atlassian", type: "dsa", difficulty: "medium",           question: "Design Hit Counter (sliding window, precise to second).", tags: ["queue", "design"], askedFor: "P50", frequency: "high" },

  // --- Bloomberg (more) ---
  { id: "bloomberg-sd-5",  company: "Bloomberg", type: "system-design", difficulty: "hard",  question: "Design a market data entitlements service (who can see which tickers).", tags: ["rbac", "entitlements", "cache"], askedFor: "Senior", frequency: "medium" },
  { id: "bloomberg-lld-5", company: "Bloomberg", type: "lld", difficulty: "medium",           question: "Design a financial time-series store (OHLCV per symbol).", tags: ["data-structures", "time-series"], askedFor: "Senior", frequency: "medium" },
  { id: "bloomberg-dsa-13", company: "Bloomberg", type: "dsa", difficulty: "medium",          question: "Stock Price Fluctuation — min/max with removals.", tags: ["hashmap", "ordered-set"], askedFor: "Senior", frequency: "high" },

  // --- Flipkart (more) ---
  { id: "flipkart-sd-8",  company: "Flipkart", type: "system-design", difficulty: "hard",  question: "Design Flipkart SuperCoin rewards ledger.", tags: ["ledger", "rewards", "consistency"], askedFor: "SDE-3", frequency: "medium" },
  { id: "flipkart-lld-5", company: "Flipkart", type: "lld", difficulty: "medium",           question: "Design a Wishlist with share and price-drop notification.", tags: ["oop", "observer", "notifications"], askedFor: "SDE-2", frequency: "medium" },
  { id: "flipkart-dsa-6", company: "Flipkart", type: "dsa", difficulty: "medium",           question: "Product of Array Except Self.", tags: ["array", "prefix-sum"], askedFor: "SDE-2", frequency: "high" },

  // --- Razorpay (more) ---
  { id: "razorpay-sd-8",  company: "Razorpay", type: "system-design", difficulty: "hard",  question: "Design Razorpay Smart Collect (virtual accounts for bulk reconciliation).", tags: ["payments", "reconciliation", "batch"], askedFor: "SDE-3", frequency: "medium" },
  { id: "razorpay-lld-4b", company: "Razorpay", type: "lld", difficulty: "medium",           question: "Design a Payment Link expiry + one-time-use token system.", tags: ["tokens", "ttl", "oop"], askedFor: "SDE-2", frequency: "medium" },

  // --- Swiggy (more) ---
  { id: "swiggy-sd-8",  company: "Swiggy", type: "system-design", difficulty: "hard",  question: "Design Swiggy Instamart — 10-min grocery delivery slot allocation.", tags: ["inventory", "geo", "slot"], askedFor: "SDE-3", frequency: "high" },
  { id: "swiggy-lld-4", company: "Swiggy", type: "lld", difficulty: "medium",           question: "Design the Menu/Catalog versioning service for restaurants.", tags: ["versioning", "oop"], askedFor: "SDE-2", frequency: "medium" },

  // --- PhonePe (more) ---
  { id: "phonepe-sd-7",  company: "PhonePe", type: "system-design", difficulty: "hard",  question: "Design PhonePe Switch — mini-app platform.", tags: ["mini-apps", "sandbox", "platform"], askedFor: "SDE-3", frequency: "medium" },
  { id: "phonepe-lld-4", company: "PhonePe", type: "lld", difficulty: "medium",           question: "Design a QR code payment flow (merchant side).", tags: ["qr", "state-machine", "oop"], askedFor: "SDE-2", frequency: "medium" },

  // --- Paytm (more) ---
  { id: "paytm-sd-5",  company: "Paytm", type: "system-design", difficulty: "hard",  question: "Design Paytm Soundbox (real-time payment audio notification device).", tags: ["iot", "notifications", "real-time"], askedFor: "SDE-3", frequency: "medium" },
  { id: "paytm-lld-3", company: "Paytm", type: "lld", difficulty: "medium",           question: "Design a Cashback engine with tiered rules.", tags: ["strategy", "oop", "rules"], askedFor: "SDE-2", frequency: "medium" },

  // --- Zomato (more) ---
  { id: "zomato-sd-5",  company: "Zomato", type: "system-design", difficulty: "hard",  question: "Design Zomato Gold / Pro subscription engine.", tags: ["subscription", "entitlements"], askedFor: "SDE-3", frequency: "medium" },
  { id: "zomato-lld-3", company: "Zomato", type: "lld", difficulty: "medium",           question: "Design a Restaurant Menu + Item availability toggle.", tags: ["oop", "state"], askedFor: "SDE-2", frequency: "medium" },
  { id: "zomato-dsa-3b", company: "Zomato", type: "dsa", difficulty: "medium",           question: "Word Search in a 2D Board.", tags: ["backtracking", "dfs"], askedFor: "SDE-2", frequency: "high" },

  // --- Dream11 (more) ---
  { id: "dream11-sd-3b", company: "Dream11", type: "system-design", difficulty: "hard",  question: "Design Dream11 live score ingest + propagation pipeline.", tags: ["stream", "fan-out", "real-time"], askedFor: "Senior", frequency: "high" },
  { id: "dream11-lld-3", company: "Dream11", type: "lld", difficulty: "medium",          question: "Design a Fantasy Team builder with captain/vc multiplier rules.", tags: ["oop", "rules"], askedFor: "Senior", frequency: "medium" },

  // --- Walmart Labs (more) ---
  { id: "walmart-sd-3b", company: "Walmart Labs", type: "system-design", difficulty: "hard",  question: "Design a store-click-and-collect (BOPIS) fulfilment service.", tags: ["inventory", "geo", "workflow"], askedFor: "SDE-3", frequency: "medium" },
  { id: "walmart-lld-3", company: "Walmart Labs", type: "lld", difficulty: "medium",          question: "Design a Store Price-override system (manager discounts).", tags: ["oop", "rules", "strategy"], askedFor: "SDE-2", frequency: "medium" },

  // --- CRED (more) ---
  { id: "cred-sd-3b",  company: "CRED", type: "system-design", difficulty: "hard",   question: "Design CRED Store — curated product discovery + purchase flow.", tags: ["commerce", "recommendations"], askedFor: "Senior SDE", frequency: "medium" },
  { id: "cred-lld-3", company: "CRED", type: "lld", difficulty: "medium",            question: "Design a Scratch-card / Spin-the-wheel reward reveal engine.", tags: ["oop", "probability", "animation"], askedFor: "Senior SDE", frequency: "medium" },

  // --- Spotify (more) ---
  { id: "spotify-sd-5b",  company: "Spotify", type: "system-design", difficulty: "hard",  question: "Design Spotify Wrapped — annual stats pipeline.", tags: ["batch", "aggregation", "analytics"], askedFor: "Senior", frequency: "medium" },
  { id: "spotify-lld-4", company: "Spotify", type: "lld", difficulty: "medium",           question: "Design a Playlist collaborative editing (real-time, conflict-free).", tags: ["crdt", "collaboration", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- GitHub (more) ---
  { id: "github-sd-4b",  company: "GitHub", type: "system-design", difficulty: "hard",  question: "Design GitHub Actions runner pool (auto-scaling).", tags: ["ci-cd", "scheduler", "containers"], askedFor: "Senior", frequency: "medium" },
  { id: "github-lld-3", company: "GitHub", type: "lld", difficulty: "medium",           question: "Design a Git blame / annotate data structure.", tags: ["trees", "versioning", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Airbnb (more) ---
  { id: "airbnb-sd-9",  company: "Airbnb", type: "system-design", difficulty: "hard",  question: "Design Airbnb Pricing Engine (smart pricing suggestion for hosts).", tags: ["ml", "pricing", "time-series"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-lld-4", company: "Airbnb", type: "lld", difficulty: "medium",           question: "Design a check-in / check-out date-range selector with unavailable dates.", tags: ["intervals", "oop", "calendar"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-dsa-8", company: "Airbnb", type: "dsa", difficulty: "medium",           question: "Maximum Number of Non-overlapping Substrings.", tags: ["greedy", "string"], askedFor: "Senior", frequency: "medium" },

  // --- Twitter / X (more) ---
  { id: "twitter-sd-9",  company: "Twitter / X", type: "system-design", difficulty: "hard",  question: "Design Twitter Spaces (live audio rooms).", tags: ["audio", "webrtc", "real-time"], askedFor: "Senior", frequency: "medium" },
  { id: "twitter-lld-4", company: "Twitter / X", type: "lld", difficulty: "medium",           question: "Design a Tweet threading / reply chain data structure.", tags: ["trees", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Salesforce (more) ---
  { id: "sfdc-sd-5b",  company: "Salesforce", type: "system-design", difficulty: "hard",  question: "Design Salesforce Lightning — component framework on a multi-tenant platform.", tags: ["multi-tenant", "ui-framework", "caching"], askedFor: "MTS+", frequency: "medium" },
  { id: "sfdc-lld-3b", company: "Salesforce", type: "lld", difficulty: "medium",           question: "Design an Approval Process engine (multi-step, parallel paths).", tags: ["workflow", "state-machine", "oop"], askedFor: "MTS", frequency: "medium" },

  // --- Adobe (more) ---
  { id: "adobe-sd-4b",  company: "Adobe", type: "system-design", difficulty: "hard",  question: "Design Adobe Sign (e-signature) with audit trail.", tags: ["workflow", "audit", "compliance"], askedFor: "MTS", frequency: "medium" },
  { id: "adobe-lld-4", company: "Adobe", type: "lld", difficulty: "medium",           question: "Design Photoshop Layer/History (undo/redo stack with branching).", tags: ["command-pattern", "memento", "oop"], askedFor: "MTS", frequency: "medium" },
  { id: "adobe-dsa-5b", company: "Adobe", type: "dsa", difficulty: "medium",           question: "Non-overlapping Intervals — minimum removals.", tags: ["greedy", "intervals"], askedFor: "MTS", frequency: "high" },

  // --- Oracle (more) ---
  { id: "oracle-sd-3b",  company: "Oracle", type: "system-design", difficulty: "hard",  question: "Design Oracle Autonomous Database — auto-tuning + auto-scaling.", tags: ["db", "ml", "scaling"], askedFor: "IC5", frequency: "low" },
  { id: "oracle-lld-3b", company: "Oracle", type: "lld", difficulty: "medium",           question: "Design a Connection Pool library (max-size, timeout, validation).", tags: ["concurrency", "pool", "oop"], askedFor: "IC4", frequency: "medium" },

  // --- ByteDance (more) ---
  { id: "bytedance-sd-8",  company: "ByteDance / TikTok", type: "system-design", difficulty: "hard",  question: "Design CapCut's cloud render farm for video editing exports.", tags: ["video", "queue", "rendering"], askedFor: "Senior", frequency: "medium" },
  { id: "bytedance-lld-5", company: "ByteDance / TikTok", type: "lld", difficulty: "medium",           question: "Design a Duet / collaborative video recording session.", tags: ["real-time", "sync", "oop"], askedFor: "Senior", frequency: "low" },

  // --- Twilio (more) ---
  { id: "twilio-sd-4",  company: "Twilio", type: "system-design", difficulty: "hard",  question: "Design Twilio Verify (OTP delivery with channel fallback SMS→voice→email).", tags: ["otp", "fallback", "queue"], askedFor: "Senior", frequency: "medium" },
  { id: "twilio-lld-3", company: "Twilio", type: "lld", difficulty: "medium",           question: "Design a Call Routing engine (IVR tree).", tags: ["state-machine", "tree", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Coinbase (more) ---
  { id: "coinbase-sd-4b",  company: "Coinbase", type: "system-design", difficulty: "hard",  question: "Design Coinbase NFT marketplace.", tags: ["marketplace", "blockchain", "storage"], askedFor: "L4–L5", frequency: "medium" },
  { id: "coinbase-lld-3", company: "Coinbase", type: "lld", difficulty: "medium",           question: "Design a Portfolio tracker (real-time P&L, multiple assets).", tags: ["oop", "stream", "pricing"], askedFor: "L4", frequency: "medium" },

  // --- Grab (more) ---
  { id: "grab-sd-4",  company: "Grab", type: "system-design", difficulty: "hard",  question: "Design GrabFood menu + order management.", tags: ["commerce", "matching", "inventory"], askedFor: "Senior", frequency: "medium" },
  { id: "grab-lld-3", company: "Grab", type: "lld", difficulty: "medium",           question: "Design Grab's OTP verification module.", tags: ["security", "ttl", "oop"], askedFor: "Mid", frequency: "medium" },

  // --- Ola (more) ---
  { id: "ola-sd-4b",  company: "Ola", type: "system-design", difficulty: "hard",  question: "Design Ola Electric charging station finder and booking.", tags: ["geo", "ev", "booking"], askedFor: "SDE-3", frequency: "medium" },
  { id: "ola-lld-3", company: "Ola", type: "lld", difficulty: "medium",           question: "Design a Vehicle Inspection workflow (multi-stage checks).", tags: ["workflow", "state-machine", "oop"], askedFor: "SDE-2", frequency: "medium" },

  // --- Hotstar / JioCinema (more) ---
  { id: "hotstar-sd-4b",  company: "Hotstar / JioCinema", type: "system-design", difficulty: "hard",  question: "Design concurrent stream limit enforcement (max 2 devices per subscription).", tags: ["session", "quota", "redis"], askedFor: "SDE-3", frequency: "high" },
  { id: "hotstar-lld-3", company: "Hotstar / JioCinema", type: "lld", difficulty: "medium",           question: "Design a Content rating & parental-control filter.", tags: ["oop", "filter", "strategy"], askedFor: "SDE-2", frequency: "medium" },

  // --- MakeMyTrip (more) ---
  { id: "mmt-sd-4b",  company: "MakeMyTrip", type: "system-design", difficulty: "hard",  question: "Design dynamic flight pricing (fare cache + GDS integration).", tags: ["pricing", "cache", "gds"], askedFor: "SDE-3", frequency: "medium" },
  { id: "mmt-lld-3", company: "MakeMyTrip", type: "lld", difficulty: "medium",           question: "Design a Holiday Package builder (itinerary + pricing).", tags: ["builder-pattern", "oop"], askedFor: "SDE-2", frequency: "medium" },

  // --- Goldman Sachs (more) ---
  { id: "gs-sd-4b",  company: "Goldman Sachs", type: "system-design", difficulty: "hard",  question: "Design a trade booking and lifecycle management system.", tags: ["trading", "workflow", "ledger"], askedFor: "VP-level", frequency: "medium" },
  { id: "gs-lld-4", company: "Goldman Sachs", type: "lld", difficulty: "medium",           question: "Design a limit-order book with price-time priority.", tags: ["data-structures", "oop", "trading"], askedFor: "Analyst/Associate", frequency: "high" },
  { id: "gs-dsa-6", company: "Goldman Sachs", type: "dsa", difficulty: "medium",           question: "Max Profit with at most 2 transactions (DP).", tags: ["dp", "stocks"], askedFor: "Analyst", frequency: "high" },

  // --- Palantir (more) ---
  { id: "palantir-sd-4b",  company: "Palantir", type: "system-design", difficulty: "hard",  question: "Design a graph query engine over a knowledge graph.", tags: ["graph", "query", "index"], askedFor: "SWE", frequency: "medium" },
  { id: "palantir-lld-4", company: "Palantir", type: "lld", difficulty: "medium",           question: "Design a configurable data pipeline with pluggable transforms.", tags: ["pipeline", "strategy", "oop"], askedFor: "SWE", frequency: "medium" },

  // --- Booking.com (more) ---
  { id: "booking-sd-4b",  company: "Booking.com", type: "system-design", difficulty: "hard",  question: "Design a multi-currency pricing and conversion service.", tags: ["currency", "cache", "pricing"], askedFor: "Senior", frequency: "medium" },
  { id: "booking-lld-3", company: "Booking.com", type: "lld", difficulty: "medium",           question: "Design a Hotel room type recommendation widget.", tags: ["recommendation", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- OpenAI (more) ---
  { id: "openai-sd-4b",  company: "OpenAI", type: "system-design", difficulty: "hard",  question: "Design a token bucket rate-limiter for ChatGPT API (per-user + per-org).", tags: ["rate-limit", "redis", "billing"], askedFor: "Senior", frequency: "high" },
  { id: "openai-lld-3", company: "OpenAI", type: "lld", difficulty: "medium",           question: "Design a streaming response renderer (SSE token-by-token).", tags: ["sse", "streaming", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Tesla (more) ---
  { id: "tesla-sd-4b",  company: "Tesla", type: "system-design", difficulty: "hard",  question: "Design Tesla Autopilot OTA update delivery system.", tags: ["ota", "versioning", "rollout"], askedFor: "SWE", frequency: "medium" },
  { id: "tesla-lld-3", company: "Tesla", type: "lld", difficulty: "medium",           question: "Design a Supercharger slot reservation system.", tags: ["booking", "state-machine", "oop"], askedFor: "SWE", frequency: "medium" },

  // --- Datadog (more) ---
  { id: "datadog-sd-4b",  company: "Datadog", type: "system-design", difficulty: "hard",  question: "Design Datadog SLO tracking with error-budget burn alerts.", tags: ["observability", "slo", "alerting"], askedFor: "Senior", frequency: "medium" },
  { id: "datadog-lld-3", company: "Datadog", type: "lld", difficulty: "medium",           question: "Design a configurable alerting rule engine.", tags: ["rules", "strategy", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Figma (more) ---
  { id: "figma-sd-4",  company: "Figma", type: "system-design", difficulty: "hard",  question: "Design Figma Branching (non-destructive design version control).", tags: ["versioning", "crdt", "storage"], askedFor: "Senior", frequency: "medium" },
  { id: "figma-lld-3", company: "Figma", type: "lld", difficulty: "medium",           question: "Design a vector scene graph with transform inheritance.", tags: ["tree", "math", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Notion (more) ---
  { id: "notion-sd-3b",  company: "Notion", type: "system-design", difficulty: "hard",  question: "Design Notion AI — on-demand LLM block completions in docs.", tags: ["llm", "streaming", "latency"], askedFor: "Senior", frequency: "medium" },
  { id: "notion-lld-3", company: "Notion", type: "lld", difficulty: "medium",           question: "Design a Block-based document model (Notion-style nested blocks).", tags: ["tree", "crdt", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Canva (more) ---
  { id: "canva-sd-3b",  company: "Canva", type: "system-design", difficulty: "hard",  question: "Design Canva's asset library search (fonts, photos, elements).", tags: ["search", "cdn", "vector-db"], askedFor: "Senior", frequency: "medium" },
  { id: "canva-lld-3", company: "Canva", type: "lld", difficulty: "medium",           question: "Design a template element drag-resize-snap grid system.", tags: ["math", "grid", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Reddit (more) ---
  { id: "reddit-sd-4",  company: "Reddit", type: "system-design", difficulty: "hard",  question: "Design Reddit Awards / virtual-currency economy.", tags: ["currency", "ledger", "gamification"], askedFor: "Senior", frequency: "medium" },
  { id: "reddit-lld-3", company: "Reddit", type: "lld", difficulty: "medium",           question: "Design a Comment tree rendering with lazy-load.", tags: ["tree", "pagination", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Snapchat (more) ---
  { id: "snapchat-sd-4",  company: "Snapchat", type: "system-design", difficulty: "hard",  question: "Design Snapchat Spotlight (short-video feed with ML ranking).", tags: ["feed", "ml", "cdn"], askedFor: "Senior", frequency: "medium" },
  { id: "snapchat-lld-3", company: "Snapchat", type: "lld", difficulty: "medium",           question: "Design an AR Lens pipeline (client filter upload + approval).", tags: ["workflow", "oop", "media"], askedFor: "Senior", frequency: "low" },

  // --- Discord (more) ---
  { id: "discord-sd-4",  company: "Discord", type: "system-design", difficulty: "hard",  question: "Design Discord's message history read + search (10T+ messages).", tags: ["search", "cassandra", "indexing"], askedFor: "Senior", frequency: "high" },
  { id: "discord-lld-4", company: "Discord", type: "lld", difficulty: "medium",           question: "Design a Bot permissions system (roles, scopes, guild-level).", tags: ["rbac", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Twitch (more) ---
  { id: "twitch-sd-4",  company: "Twitch", type: "system-design", difficulty: "hard",  question: "Design Twitch Predictions (real-time audience bet resolution).", tags: ["real-time", "consistency", "ledger"], askedFor: "Senior", frequency: "medium" },
  { id: "twitch-lld-3", company: "Twitch", type: "lld", difficulty: "medium",           question: "Design a sub-only chat mode (entitlement check on message send).", tags: ["rbac", "oop", "chat"], askedFor: "Senior", frequency: "medium" },

  // --- Shopify (more) ---
  { id: "shopify-sd-4b",  company: "Shopify", type: "system-design", difficulty: "hard",  question: "Design Shopify Payments fraud scoring.", tags: ["fraud", "ml", "stream"], askedFor: "Senior", frequency: "medium" },
  { id: "shopify-lld-4", company: "Shopify", type: "lld", difficulty: "medium",           question: "Design a Discount stacking engine (order of application matters).", tags: ["strategy", "chain-of-responsibility", "oop"], askedFor: "Senior", frequency: "medium" },
  { id: "shopify-dsa-3b", company: "Shopify", type: "dsa", difficulty: "medium",           question: "Design a data structure for First Unique Character in a Stream.", tags: ["queue", "hashmap", "design"], askedFor: "Senior", frequency: "medium" },

  // --- Meesho (more) ---
  { id: "meesho-sd-3b",  company: "Meesho", type: "system-design", difficulty: "hard",  question: "Design Meesho supplier onboarding + quality-score pipeline.", tags: ["workflow", "ml", "quality"], askedFor: "SDE-3", frequency: "medium" },
  { id: "meesho-lld-3", company: "Meesho", type: "lld", difficulty: "medium",           question: "Design a WhatsApp-order integration (parse structured orders from text).", tags: ["parsing", "nlp", "oop"], askedFor: "SDE-2", frequency: "low" },

  // --- Zerodha (more) ---
  { id: "zerodha-sd-3b",  company: "Zerodha", type: "system-design", difficulty: "hard",  question: "Design Streak (automated trading strategy builder).", tags: ["trading", "strategy", "rules"], askedFor: "Senior", frequency: "medium" },
  { id: "zerodha-lld-3", company: "Zerodha", type: "lld", difficulty: "medium",           question: "Design GTT (Good-Till-Triggered) order management.", tags: ["state-machine", "oop", "trading"], askedFor: "Senior", frequency: "medium" },

  // --- Wise (TransferWise) (more) ---
  { id: "wise-sd-4",  company: "Wise", type: "system-design", difficulty: "hard",  question: "Design Wise multi-currency account with real-time FX.", tags: ["fx", "ledger", "consistency"], askedFor: "Senior", frequency: "medium" },
  { id: "wise-lld-3", company: "Wise", type: "lld", difficulty: "medium",           question: "Design a transfer fee calculator (tiered + fixed).", tags: ["strategy", "math", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Gojek (more) ---
  { id: "gojek-sd-4",  company: "Gojek", type: "system-design", difficulty: "hard",  question: "Design GoFood dark kitchen (virtual restaurant) operations.", tags: ["matching", "geo", "operations"], askedFor: "Senior", frequency: "medium" },
  { id: "gojek-lld-3", company: "Gojek", type: "lld", difficulty: "medium",           question: "Design a multi-service booking (ride + food + courier) in one flow.", tags: ["oop", "composite", "workflow"], askedFor: "Senior", frequency: "medium" },

  // --- Freshworks (more) ---
  { id: "freshworks-sd-3b",  company: "Freshworks", type: "system-design", difficulty: "hard",  question: "Design Freshdesk ticket routing (rule-based + ML skill-routing).", tags: ["routing", "ml", "rules"], askedFor: "SDE-3", frequency: "medium" },
  { id: "freshworks-lld-3", company: "Freshworks", type: "lld", difficulty: "medium",           question: "Design a SLA timer that pauses on weekends and business hours.", tags: ["time", "state-machine", "oop"], askedFor: "SDE-2", frequency: "medium" },

  // --- Zoho (more) ---
  { id: "zoho-sd-3b",  company: "Zoho", type: "system-design", difficulty: "hard",  question: "Design Zoho Analytics — scheduled report generation + delivery.", tags: ["batch", "scheduling", "email"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "zoho-lld-3b", company: "Zoho", type: "lld", difficulty: "medium",           question: "Design a spreadsheet formula evaluation engine (topological order).", tags: ["graph", "topo-sort", "oop"], askedFor: "SDE-2", frequency: "high" },

  // --- Intuit (more) ---
  { id: "intuit-sd-3b",  company: "Intuit", type: "system-design", difficulty: "hard",  question: "Design TurboTax auto-fill pipeline (IRS document ingestion + parsing).", tags: ["ocr", "pipeline", "batch"], askedFor: "Senior", frequency: "medium" },
  { id: "intuit-lld-3", company: "Intuit", type: "lld", difficulty: "medium",           question: "Design a tax deduction suggestion engine.", tags: ["rules", "strategy", "oop"], askedFor: "Senior", frequency: "medium" },

  // --- Nykaa ---
  { id: "nykaa-sd-1b",  company: "Nykaa", type: "system-design", difficulty: "hard",  question: "Design Nykaa beauty product catalog + recommendation system.", tags: ["catalog", "recommendation", "search"], askedFor: "SDE-3", frequency: "medium" },
  { id: "nykaa-lld-1b", company: "Nykaa", type: "lld", difficulty: "medium",           question: "Design a shade-finder (skin tone to product match).", tags: ["oop", "ml", "rules"], askedFor: "SDE-2", frequency: "low" },

  // --- Groww ---
  { id: "groww-sd-1",  company: "Groww", type: "system-design", difficulty: "hard",  question: "Design Groww mutual fund order + NAV settlement system.", tags: ["fintech", "batch", "ledger"], askedFor: "SDE-3", frequency: "high" },
  { id: "groww-lld-1", company: "Groww", type: "lld", difficulty: "medium",           question: "Design an investment portfolio dashboard (live returns).", tags: ["oop", "pricing", "stream"], askedFor: "SDE-2", frequency: "medium" },
  { id: "groww-dsa-1", company: "Groww", type: "dsa", difficulty: "medium",           question: "Best Time to Buy and Sell Stock III (at most 2 transactions).", tags: ["dp", "stocks"], askedFor: "SDE-2", frequency: "high" },

  // --- Dunzo ---
  { id: "dunzo-sd-1",  company: "Dunzo", type: "system-design", difficulty: "hard",  question: "Design Dunzo's multi-tasker (courier picks up from multiple stores en route).", tags: ["routing", "geo", "optimization"], askedFor: "SDE-3", frequency: "medium" },
  { id: "dunzo-lld-1", company: "Dunzo", type: "lld", difficulty: "medium",           question: "Design a Task handoff between delivery partners.", tags: ["state-machine", "oop"], askedFor: "SDE-2", frequency: "medium" },

  // --- ShareChat ---
  { id: "sharechat-sd-1",  company: "ShareChat", type: "system-design", difficulty: "hard",  question: "Design ShareChat regional-language short-video feed.", tags: ["feed", "cdn", "ml", "i18n"], askedFor: "SDE-3", frequency: "medium" },
  { id: "sharechat-lld-1", company: "ShareChat", type: "lld", difficulty: "medium",           question: "Design a content moderation pipeline (language-aware).", tags: ["ml", "workflow", "oop"], askedFor: "SDE-2", frequency: "medium" },

  // --- InMobi ---
  { id: "inmobi-sd-1",  company: "InMobi", type: "system-design", difficulty: "hard",  question: "Design a mobile DSP (Demand-Side Platform) for real-time bidding.", tags: ["rtb", "ads", "latency"], askedFor: "SDE-3", frequency: "high" },
  { id: "inmobi-lld-1", company: "InMobi", type: "lld", difficulty: "medium",           question: "Design an Ad Frequency Cap store.", tags: ["rate-limit", "redis", "oop"], askedFor: "SDE-2", frequency: "medium" },
  { id: "inmobi-dsa-1", company: "InMobi", type: "dsa", difficulty: "medium",           question: "Random Pick Index (reservoir sampling).", tags: ["probability", "design"], askedFor: "SDE-2", frequency: "medium" },
];

// ────────────────────────────────────────────────────────────────────
// Derived helpers
// ────────────────────────────────────────────────────────────────────

export const allCompanies: string[] = Array.from(
  new Set(interviewQuestions.map((q) => q.company))
).sort((a, b) => a.localeCompare(b));

export const allTypes: { value: QuestionType; label: string }[] = [
  { value: "system-design", label: "System Design" },
  { value: "lld", label: "Low-Level Design" },
  { value: "dsa", label: "DSA" },
];

export const allDifficulties: QuestionDifficulty[] = ["easy", "medium", "hard"];

export const allTags: string[] = Array.from(
  new Set(interviewQuestions.flatMap((q) => q.tags))
).sort();

export function getCompanyCount(): { company: string; count: number }[] {
  const map = new Map<string, number>();
  for (const q of interviewQuestions) {
    map.set(q.company, (map.get(q.company) ?? 0) + 1);
  }
  return Array.from(map.entries())
    .map(([company, count]) => ({ company, count }))
    .sort((a, b) => b.count - a.count);
}
