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

  // ════════════════════════════════════════════════════════════════════
  // EXPANSION BATCH 2 — deeper coverage + new companies
  // ════════════════════════════════════════════════════════════════════

  // ── UBER (deeper) ──────────────────────────────────────────────────
  { id: "uber-sd-6", company: "Uber", type: "system-design", difficulty: "hard", question: "Design a global driver location tracking + heatmap service.", tags: ["geo", "stream", "kafka"], askedFor: "L5", frequency: "high" },
  { id: "uber-sd-7", company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber's trip-state machine across regions (request→matched→completed).", tags: ["state-machine", "workflow", "consistency"], askedFor: "L5", frequency: "high" },
  { id: "uber-sd-8", company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber Pool — share rides among multiple riders along similar routes.", tags: ["matching", "geo", "routing"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-9", company: "Uber", type: "system-design", difficulty: "hard", question: "Design a fraud-detection pipeline for fake rides + payment fraud.", tags: ["stream", "ml", "fraud"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-10", company: "Uber", type: "system-design", difficulty: "hard", question: "Design a notification service for trip lifecycle events.", tags: ["push", "fan-out", "queue"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-11", company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber Freight — load/truck matching, ETA, contracts.", tags: ["matching", "geo"], askedFor: "L5", frequency: "low" },
  { id: "uber-sd-12", company: "Uber", type: "system-design", difficulty: "medium", question: "Design a coupon / promo-code engine (limits, fraud, A/B).", tags: ["promotions", "rules"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-13", company: "Uber", type: "system-design", difficulty: "hard", question: "Design Uber's payments + payouts platform with multi-currency.", tags: ["payments", "ledger", "fx"], askedFor: "L5", frequency: "medium" },
  { id: "uber-sd-14", company: "Uber", type: "system-design", difficulty: "hard", question: "Design real-time analytics dashboard for ops (live rides, ETAs).", tags: ["stream", "olap"], askedFor: "L5", frequency: "medium" },
  { id: "uber-lld-3", company: "Uber", type: "lld", difficulty: "medium", question: "Design a Driver/Rider rating system (entities + aggregation).", tags: ["oop"], askedFor: "L5", frequency: "high" },
  { id: "uber-lld-4", company: "Uber", type: "lld", difficulty: "medium", question: "Design a fare-calculation strategy (base + surge + tolls + discounts).", tags: ["strategy", "oop"], askedFor: "L5", frequency: "high" },
  { id: "uber-lld-5", company: "Uber", type: "lld", difficulty: "medium", question: "Design an in-memory Geo-Hash store for nearby-driver lookup.", tags: ["geohash", "design"], askedFor: "L5", frequency: "medium" },
  { id: "uber-lld-6", company: "Uber", type: "lld", difficulty: "medium", question: "Design a payment retry + reconciliation service.", tags: ["retry", "ledger"], askedFor: "L5", frequency: "medium" },
  { id: "uber-dsa-4", company: "Uber", type: "dsa", difficulty: "medium", question: "Maximum Average Subarray of size K.", tags: ["sliding-window"], askedFor: "L4", frequency: "high" },
  { id: "uber-dsa-5", company: "Uber", type: "dsa", difficulty: "medium", question: "Find Closest Restaurants — heap + geohash variant.", tags: ["heap", "geo"], askedFor: "L4", frequency: "high" },
  { id: "uber-dsa-6", company: "Uber", type: "dsa", difficulty: "medium", question: "Insert Delete GetRandom O(1).", tags: ["design", "hashmap"], askedFor: "L4", frequency: "high" },
  { id: "uber-dsa-7", company: "Uber", type: "dsa", difficulty: "hard", question: "Cheapest Flights Within K Stops — Bellman-Ford / modified Dijkstra.", tags: ["graph", "dijkstra"], askedFor: "L5", frequency: "high" },
  { id: "uber-dsa-8", company: "Uber", type: "dsa", difficulty: "medium", question: "Course Schedule (cycle detection, topo).", tags: ["graph", "topo-sort"], askedFor: "L4", frequency: "medium" },
  { id: "uber-dsa-9", company: "Uber", type: "dsa", difficulty: "hard", question: "Word Search II (Trie + DFS).", tags: ["trie", "dfs"], askedFor: "L5", frequency: "medium" },
  { id: "uber-dsa-10", company: "Uber", type: "dsa", difficulty: "medium", question: "Random Pick with Blacklist.", tags: ["hashmap", "design"], askedFor: "L4", frequency: "medium" },

  // ── LINKEDIN (deeper) ─────────────────────────────────────────────
  { id: "linkedin-sd-4", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn job-search ranking + retrieval (recruiter + jobseeker views).", tags: ["search", "ranking", "ml"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-sd-5", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn Learning — video catalog + progress tracking.", tags: ["video", "tracking"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-6", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design a notification fan-out for connection requests + post engagement.", tags: ["notifications", "fan-out"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-sd-7", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn Endorsements + Skills graph.", tags: ["graph", "ranking"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-8", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design profile visibility + privacy controls (who-viewed-my-profile).", tags: ["privacy", "auth", "tracking"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-sd-9", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design LinkedIn InMail messaging with quotas + delivery guarantees.", tags: ["messaging", "quota"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-10", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design a recruiter-search service over hundreds of millions of profiles.", tags: ["search", "elasticsearch", "facets"], askedFor: "Senior+", frequency: "high" },
  { id: "linkedin-sd-11", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design a distributed event-tracking pipeline (Kafka-based).", tags: ["kafka", "stream"], askedFor: "Senior", frequency: "high", note: "LinkedIn invented Kafka — they love this prompt." },
  { id: "linkedin-sd-12", company: "LinkedIn", type: "system-design", difficulty: "medium", question: "Design Slideshare-style document hosting + viewer.", tags: ["storage", "cdn"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-sd-13", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design a real-time analytics service for member activity (Pinot-style OLAP).", tags: ["olap", "stream"], askedFor: "Senior+", frequency: "medium" },
  { id: "linkedin-sd-14", company: "LinkedIn", type: "system-design", difficulty: "hard", question: "Design a graph-storage service for the connection graph.", tags: ["graph-db", "storage"], askedFor: "Senior+", frequency: "medium" },
  { id: "linkedin-lld-2", company: "LinkedIn", type: "lld", difficulty: "medium", question: "Design a Notification Center (multi-channel: in-app, email, push).", tags: ["strategy", "oop"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-lld-3", company: "LinkedIn", type: "lld", difficulty: "medium", question: "Design a connection-graph engine (1st/2nd/3rd-degree lookups).", tags: ["graph", "design"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-lld-4", company: "LinkedIn", type: "lld", difficulty: "medium", question: "Design a Resume Parser with pluggable parser strategies.", tags: ["parser", "strategy"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-lld-5", company: "LinkedIn", type: "lld", difficulty: "medium", question: "Design a Feed Ranker — pluggable scoring strategies.", tags: ["strategy", "ranking"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-4", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Find K Closest Elements (binary search + window).", tags: ["binary-search"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-dsa-5", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Reverse Words in a String II (in-place).", tags: ["string", "two-pointers"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-dsa-6", company: "LinkedIn", type: "dsa", difficulty: "hard", question: "Shortest Word Distance III (with same-word case).", tags: ["string", "two-pointers"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-7", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Repeated DNA Sequences — rolling hash / hashmap.", tags: ["hashmap", "rolling-hash"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-8", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Number of Connected Components in an Undirected Graph.", tags: ["graph", "union-find"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-dsa-9", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Maximum Subarray (Kadane's).", tags: ["dp"], askedFor: "Mid", frequency: "high" },
  { id: "linkedin-dsa-10", company: "LinkedIn", type: "dsa", difficulty: "hard", question: "Closest Binary Search Tree Value II (k closest values).", tags: ["bst", "heap"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-11", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Nested List Weight Sum (DFS).", tags: ["dfs", "design"], askedFor: "Senior", frequency: "high" },
  { id: "linkedin-dsa-12", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Paint House II — DP, k colors with no two adjacent equal.", tags: ["dp"], askedFor: "Senior", frequency: "medium" },
  { id: "linkedin-dsa-13", company: "LinkedIn", type: "dsa", difficulty: "hard", question: "Maximum Subarray Sum after one swap.", tags: ["dp", "array"], askedFor: "Senior", frequency: "low" },
  { id: "linkedin-dsa-14", company: "LinkedIn", type: "dsa", difficulty: "medium", question: "Can Place Flowers (greedy).", tags: ["greedy", "array"], askedFor: "Mid", frequency: "medium" },

  // ── GOOGLE (deeper) ────────────────────────────────────────────────
  { id: "google-sd-9", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Photos — backup, dedup, search by face/object.", tags: ["storage", "dedup", "ml"], askedFor: "L5", frequency: "high" },
  { id: "google-sd-10", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Docs — real-time collaborative editing (CRDT/OT).", tags: ["crdt", "collaboration"], askedFor: "L5–L6", frequency: "high" },
  { id: "google-sd-11", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Calendar — recurring events, time zones, invites.", tags: ["calendar", "scheduling"], askedFor: "L5", frequency: "medium" },
  { id: "google-sd-12", company: "Google", type: "system-design", difficulty: "hard", question: "Design Spanner-like globally-consistent SQL database.", tags: ["db", "consensus", "globally-distributed"], askedFor: "L6+", frequency: "medium" },
  { id: "google-sd-13", company: "Google", type: "system-design", difficulty: "hard", question: "Design BigTable — wide-column store on top of GFS.", tags: ["db", "lsm", "storage"], askedFor: "L5–L6", frequency: "medium" },
  { id: "google-sd-14", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Pub/Sub — at-least-once delivery, ordering.", tags: ["pubsub", "queue"], askedFor: "L5", frequency: "medium" },
  { id: "google-sd-15", company: "Google", type: "system-design", difficulty: "hard", question: "Design AdSense ad-serving with real-time bidding.", tags: ["auction", "low-latency"], askedFor: "L5+", frequency: "medium" },
  { id: "google-sd-16", company: "Google", type: "system-design", difficulty: "hard", question: "Design a distributed cron / job scheduler at Google scale.", tags: ["scheduler", "leader-election"], askedFor: "L5", frequency: "medium" },
  { id: "google-sd-17", company: "Google", type: "system-design", difficulty: "hard", question: "Design Chrome Sync — settings/bookmarks/history across devices.", tags: ["sync", "merge"], askedFor: "L5", frequency: "medium" },
  { id: "google-sd-18", company: "Google", type: "system-design", difficulty: "hard", question: "Design Google Pay — UPI + card payments at India scale.", tags: ["payments", "upi"], askedFor: "L5", frequency: "medium" },
  { id: "google-lld-4", company: "Google", type: "lld", difficulty: "medium", question: "Design a thread-safe in-memory Pub/Sub.", tags: ["concurrency", "pubsub"], askedFor: "L4–L5", frequency: "medium" },
  { id: "google-lld-5", company: "Google", type: "lld", difficulty: "medium", question: "Design an autocomplete Trie service with frequency ranking.", tags: ["trie", "ranking"], askedFor: "L4–L5", frequency: "high" },
  { id: "google-dsa-9", company: "Google", type: "dsa", difficulty: "hard", question: "Robot Bounded In Circle / Robot Room Cleaner (DFS with state).", tags: ["dfs", "simulation"], askedFor: "L4–L5", frequency: "high" },
  { id: "google-dsa-10", company: "Google", type: "dsa", difficulty: "hard", question: "Text Justification.", tags: ["string", "greedy"], askedFor: "L4–L5", frequency: "high" },
  { id: "google-dsa-11", company: "Google", type: "dsa", difficulty: "medium", question: "Logger Rate Limiter.", tags: ["design"], askedFor: "L4", frequency: "high" },
  { id: "google-dsa-12", company: "Google", type: "dsa", difficulty: "hard", question: "Expression Add Operators (backtracking).", tags: ["backtracking", "string"], askedFor: "L4–L5", frequency: "medium" },
  { id: "google-dsa-13", company: "Google", type: "dsa", difficulty: "hard", question: "Race Car (BFS on state).", tags: ["bfs", "dp"], askedFor: "L5", frequency: "medium" },
  { id: "google-dsa-14", company: "Google", type: "dsa", difficulty: "medium", question: "My Calendar I/II/III (interval booking).", tags: ["intervals", "design"], askedFor: "L4", frequency: "medium" },

  // ── META (deeper) ─────────────────────────────────────────────────
  { id: "meta-sd-8", company: "Meta", type: "system-design", difficulty: "hard", question: "Design Facebook Search — typeahead + entity ranking.", tags: ["search", "ranking"], askedFor: "E5", frequency: "high" },
  { id: "meta-sd-9", company: "Meta", type: "system-design", difficulty: "hard", question: "Design WhatsApp end-to-end-encrypted multi-device sync.", tags: ["e2ee", "sync", "chat"], askedFor: "E5", frequency: "high" },
  { id: "meta-sd-10", company: "Meta", type: "system-design", difficulty: "hard", question: "Design Instagram explore-page recommendation.", tags: ["ranking", "ml", "feed"], askedFor: "E5", frequency: "medium" },
  { id: "meta-sd-11", company: "Meta", type: "system-design", difficulty: "hard", question: "Design Marketplace listings with geo + categories.", tags: ["search", "geo"], askedFor: "E5", frequency: "medium" },
  { id: "meta-sd-12", company: "Meta", type: "system-design", difficulty: "hard", question: "Design Reels short-video infrastructure.", tags: ["video", "feed", "cdn"], askedFor: "E5", frequency: "high" },
  { id: "meta-sd-13", company: "Meta", type: "system-design", difficulty: "hard", question: "Design ad-targeting + delivery with budget pacing.", tags: ["ads", "pacing", "auction"], askedFor: "E5+", frequency: "medium" },
  { id: "meta-sd-14", company: "Meta", type: "system-design", difficulty: "hard", question: "Design comment-moderation pipeline at FB scale.", tags: ["moderation", "ml", "stream"], askedFor: "E5", frequency: "medium" },
  { id: "meta-lld-3", company: "Meta", type: "lld", difficulty: "medium", question: "Design a Comment thread (nested replies, pagination).", tags: ["oop", "tree"], askedFor: "E5", frequency: "high" },
  { id: "meta-lld-4", company: "Meta", type: "lld", difficulty: "medium", question: "Design a Reaction service (pluggable reaction types).", tags: ["oop", "strategy"], askedFor: "E5", frequency: "medium" },
  { id: "meta-dsa-10", company: "Meta", type: "dsa", difficulty: "medium", question: "Diameter of Binary Tree.", tags: ["tree", "dfs"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-11", company: "Meta", type: "dsa", difficulty: "medium", question: "Add Strings / Multiply Strings (no built-ins).", tags: ["string", "math"], askedFor: "E4", frequency: "high" },
  { id: "meta-dsa-12", company: "Meta", type: "dsa", difficulty: "hard", question: "Read N Characters Given Read4 (call multiple times).", tags: ["string", "design"], askedFor: "E4–E5", frequency: "high" },
  { id: "meta-dsa-13", company: "Meta", type: "dsa", difficulty: "medium", question: "Continuous Subarray Sum divisible by K.", tags: ["prefix-sum", "hashmap"], askedFor: "E4", frequency: "medium" },
  { id: "meta-dsa-14", company: "Meta", type: "dsa", difficulty: "hard", question: "Buildings With an Ocean View (monotonic stack).", tags: ["stack"], askedFor: "E4–E5", frequency: "medium" },
  { id: "meta-dsa-15", company: "Meta", type: "dsa", difficulty: "medium", question: "Convert Binary Search Tree to Sorted Doubly Linked List.", tags: ["bst", "linked-list"], askedFor: "E4–E5", frequency: "high" },

  // ── AMAZON (deeper) ───────────────────────────────────────────────
  { id: "amazon-sd-8", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design DynamoDB — partition strategy, replication, consistency knobs.", tags: ["db", "kv-store", "replication"], askedFor: "SDE-3", frequency: "high" },
  { id: "amazon-sd-9", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Alexa skill-routing and conversation state.", tags: ["voice", "state-machine"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "amazon-sd-10", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Amazon S3 — eventual + strong-consistency object store.", tags: ["storage", "s3"], askedFor: "SDE-3", frequency: "high" },
  { id: "amazon-sd-11", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Amazon Kinesis / SQS at scale.", tags: ["queue", "kafka"], askedFor: "SDE-3", frequency: "medium" },
  { id: "amazon-sd-12", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design Last-mile delivery routing / fleet assignment.", tags: ["routing", "geo"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "amazon-sd-13", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design a return-management workflow (RMA).", tags: ["workflow"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-sd-14", company: "Amazon", type: "system-design", difficulty: "hard", question: "Design a price-history / dynamic-pricing service.", tags: ["pricing", "analytics"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "amazon-lld-5", company: "Amazon", type: "lld", difficulty: "medium", question: "Design Amazon's Order entity + state machine.", tags: ["oop", "state-machine"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-lld-6", company: "Amazon", type: "lld", difficulty: "medium", question: "Design a Logger with rate limit + log levels.", tags: ["oop", "rate-limit"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-lld-7", company: "Amazon", type: "lld", difficulty: "medium", question: "Design a Coupon / Promotion engine for cart.", tags: ["oop", "rules"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-dsa-10", company: "Amazon", type: "dsa", difficulty: "medium", question: "Reorder Log Files.", tags: ["string", "sorting"], askedFor: "SDE-1/2", frequency: "high", note: "Iconic Amazon OA question." },
  { id: "amazon-dsa-11", company: "Amazon", type: "dsa", difficulty: "medium", question: "Critical Connections in a Network (Tarjan's).", tags: ["graph", "tarjan"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "amazon-dsa-12", company: "Amazon", type: "dsa", difficulty: "medium", question: "Concatenated Words.", tags: ["trie", "dp"], askedFor: "SDE-2", frequency: "medium" },
  { id: "amazon-dsa-13", company: "Amazon", type: "dsa", difficulty: "medium", question: "Top K Frequent Words.", tags: ["heap", "string"], askedFor: "SDE-2", frequency: "high" },
  { id: "amazon-dsa-14", company: "Amazon", type: "dsa", difficulty: "medium", question: "Min Cost to Connect All Points (MST).", tags: ["graph", "mst"], askedFor: "SDE-2/3", frequency: "medium" },

  // ── MICROSOFT, APPLE, NETFLIX (deeper) ────────────────────────────
  { id: "microsoft-sd-6", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design Cosmos DB — multi-model, multi-region.", tags: ["db", "globally-distributed"], askedFor: "L63+", frequency: "medium" },
  { id: "microsoft-sd-7", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design GitHub Codespaces — cloud dev environments.", tags: ["compute", "containers"], askedFor: "L63+", frequency: "medium" },
  { id: "microsoft-sd-8", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design Microsoft Outlook calendar scheduling.", tags: ["calendar", "scheduling"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-sd-9", company: "Microsoft", type: "system-design", difficulty: "hard", question: "Design Xbox Live matchmaking + telemetry.", tags: ["matchmaking", "telemetry"], askedFor: "L63", frequency: "low" },
  { id: "microsoft-lld-3", company: "Microsoft", type: "lld", difficulty: "medium", question: "Design Tic-Tac-Toe / N-in-a-Row with extensible rules.", tags: ["oop", "strategy"], askedFor: "L62", frequency: "medium" },
  { id: "microsoft-lld-4", company: "Microsoft", type: "lld", difficulty: "medium", question: "Design Deck of Cards + Blackjack rules.", tags: ["oop"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-dsa-6", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Letter Combinations of a Phone Number.", tags: ["backtracking"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-dsa-7", company: "Microsoft", type: "dsa", difficulty: "medium", question: "Pair Sum in a Sorted Array (two pointers).", tags: ["two-pointers"], askedFor: "L62", frequency: "high" },
  { id: "microsoft-dsa-8", company: "Microsoft", type: "dsa", difficulty: "hard", question: "Edit Distance.", tags: ["dp"], askedFor: "L63", frequency: "medium" },

  { id: "apple-sd-5", company: "Apple", type: "system-design", difficulty: "hard", question: "Design Find My (offline device finding via crowdsourced relays).", tags: ["bluetooth", "privacy", "geo"], askedFor: "ICT4", frequency: "medium" },
  { id: "apple-sd-6", company: "Apple", type: "system-design", difficulty: "hard", question: "Design App Store search + ranking + downloads at scale.", tags: ["search", "cdn"], askedFor: "ICT4", frequency: "medium" },
  { id: "apple-lld-3", company: "Apple", type: "lld", difficulty: "medium", question: "Design an event-bus / observer framework.", tags: ["observer", "oop"], askedFor: "ICT3", frequency: "medium" },
  { id: "apple-dsa-5", company: "Apple", type: "dsa", difficulty: "medium", question: "Add and Search Word — WordDictionary (Trie).", tags: ["trie"], askedFor: "ICT3", frequency: "high" },
  { id: "apple-dsa-6", company: "Apple", type: "dsa", difficulty: "hard", question: "Largest Rectangle in Histogram.", tags: ["stack"], askedFor: "ICT4", frequency: "medium" },

  { id: "netflix-sd-5", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design Netflix's chaos-engineering / circuit-breaker layer.", tags: ["resilience", "chaos"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-sd-6", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design a personalized homepage (rows + ML row-ranking).", tags: ["ranking", "ml"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-sd-7", company: "Netflix", type: "system-design", difficulty: "hard", question: "Design a download-for-offline pipeline with DRM.", tags: ["drm", "storage"], askedFor: "Senior", frequency: "medium" },
  { id: "netflix-dsa-4", company: "Netflix", type: "dsa", difficulty: "medium", question: "First Unique Character in a String.", tags: ["hashmap"], askedFor: "Senior", frequency: "high" },
  { id: "netflix-dsa-5", company: "Netflix", type: "dsa", difficulty: "medium", question: "Design Logger Rate Limiter.", tags: ["design"], askedFor: "Senior", frequency: "medium" },

  // ── AIRBNB / TWITTER / STRIPE / ATLASSIAN (deeper) ───────────────
  { id: "airbnb-sd-4", company: "Airbnb", type: "system-design", difficulty: "hard", question: "Design Airbnb messaging between guests + hosts.", tags: ["chat", "messaging"], askedFor: "Senior", frequency: "high" },
  { id: "airbnb-sd-5", company: "Airbnb", type: "system-design", difficulty: "hard", question: "Design Airbnb pricing recommendation for hosts.", tags: ["pricing", "ml"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-sd-6", company: "Airbnb", type: "system-design", difficulty: "hard", question: "Design payments + payouts in 100+ currencies.", tags: ["payments", "fx"], askedFor: "Senior", frequency: "medium" },
  { id: "airbnb-lld-2", company: "Airbnb", type: "lld", difficulty: "medium", question: "Design a Reservation entity with overlap-free booking.", tags: ["oop", "concurrency"], askedFor: "Senior", frequency: "high" },
  { id: "airbnb-dsa-4", company: "Airbnb", type: "dsa", difficulty: "hard", question: "Alien Dictionary.", tags: ["graph", "topo-sort"], askedFor: "Senior", frequency: "high" },
  { id: "airbnb-dsa-5", company: "Airbnb", type: "dsa", difficulty: "medium", question: "Design In-Memory File System.", tags: ["trie", "design"], askedFor: "Senior", frequency: "medium" },

  { id: "twitter-sd-4", company: "Twitter / X", type: "system-design", difficulty: "hard", question: "Design Direct Messages (Twitter DMs) — fan-out + delivery.", tags: ["chat"], askedFor: "Senior", frequency: "medium" },
  { id: "twitter-sd-5", company: "Twitter / X", type: "system-design", difficulty: "hard", question: "Design tweet image/video upload + transcoding.", tags: ["media", "transcoding"], askedFor: "Senior", frequency: "medium" },
  { id: "twitter-sd-6", company: "Twitter / X", type: "system-design", difficulty: "hard", question: "Design Twitter Spaces — live audio rooms.", tags: ["audio", "webrtc"], askedFor: "Senior", frequency: "low" },
  { id: "twitter-dsa-3", company: "Twitter / X", type: "dsa", difficulty: "medium", question: "Top K Frequent Words.", tags: ["heap"], askedFor: "Senior", frequency: "high" },
  { id: "twitter-dsa-4", company: "Twitter / X", type: "dsa", difficulty: "medium", question: "Hashtag trending — count-min sketch + heap.", tags: ["count-min", "heap"], askedFor: "Senior", frequency: "medium" },

  { id: "stripe-sd-5", company: "Stripe", type: "system-design", difficulty: "hard", question: "Design Stripe Connect — marketplace payouts to many sellers.", tags: ["payouts", "kyc"], askedFor: "L3+", frequency: "high" },
  { id: "stripe-sd-6", company: "Stripe", type: "system-design", difficulty: "hard", question: "Design subscription billing engine (proration, dunning).", tags: ["billing", "subscriptions"], askedFor: "L3+", frequency: "high" },
  { id: "stripe-sd-7", company: "Stripe", type: "system-design", difficulty: "hard", question: "Design Radar — real-time fraud-detection scoring.", tags: ["fraud", "ml"], askedFor: "L3+", frequency: "medium" },
  { id: "stripe-lld-3", company: "Stripe", type: "lld", difficulty: "medium", question: "Design a key-value store with snapshot + transactions API.", tags: ["transactions", "design"], askedFor: "L3", frequency: "medium" },
  { id: "stripe-dsa-3", company: "Stripe", type: "dsa", difficulty: "medium", question: "Card-validation algorithm (Luhn).", tags: ["math", "string"], askedFor: "L3", frequency: "medium" },
  { id: "stripe-dsa-4", company: "Stripe", type: "dsa", difficulty: "medium", question: "Flatten a deeply-nested JSON-like structure.", tags: ["recursion", "design"], askedFor: "L3", frequency: "high" },

  { id: "atlassian-sd-4", company: "Atlassian", type: "system-design", difficulty: "hard", question: "Design Bitbucket — repo hosting + PR workflow.", tags: ["git", "storage"], askedFor: "P50+", frequency: "medium" },
  { id: "atlassian-sd-5", company: "Atlassian", type: "system-design", difficulty: "hard", question: "Design Trello — boards, lists, cards with realtime sync.", tags: ["realtime", "collaboration"], askedFor: "P50", frequency: "medium" },
  { id: "atlassian-lld-3", company: "Atlassian", type: "lld", difficulty: "medium", question: "Design a permission/role-based access control system.", tags: ["rbac", "oop"], askedFor: "P50", frequency: "high" },
  { id: "atlassian-dsa-3", company: "Atlassian", type: "dsa", difficulty: "medium", question: "LRU Cache.", tags: ["lru"], askedFor: "P50", frequency: "high" },
  { id: "atlassian-dsa-4", company: "Atlassian", type: "dsa", difficulty: "hard", question: "Word Search II.", tags: ["trie", "dfs"], askedFor: "P50", frequency: "medium" },

  // ── BLOOMBERG / SALESFORCE / ADOBE / BYTEDANCE ────────────────────
  { id: "bb-sd-3", company: "Bloomberg", type: "system-design", difficulty: "hard", question: "Design Bloomberg Terminal real-time data fan-out to subscribers.", tags: ["pubsub", "low-latency"], askedFor: "Senior", frequency: "high" },
  { id: "bb-sd-4", company: "Bloomberg", type: "system-design", difficulty: "hard", question: "Design a market-data normalization pipeline across exchanges.", tags: ["stream", "normalization"], askedFor: "Senior", frequency: "medium" },
  { id: "bb-lld-2", company: "Bloomberg", type: "lld", difficulty: "medium", question: "Design a thread-safe Snapshot LRU cache.", tags: ["concurrency", "cache"], askedFor: "Senior", frequency: "high" },
  { id: "bb-dsa-4", company: "Bloomberg", type: "dsa", difficulty: "medium", question: "Sliding Window Maximum.", tags: ["deque"], askedFor: "Senior", frequency: "high" },
  { id: "bb-dsa-5", company: "Bloomberg", type: "dsa", difficulty: "medium", question: "Insert Interval / Merge Intervals.", tags: ["intervals"], askedFor: "Senior", frequency: "high" },

  { id: "sfdc-sd-3", company: "Salesforce", type: "system-design", difficulty: "hard", question: "Design Einstein analytics dashboard pipeline.", tags: ["analytics", "olap"], askedFor: "MTS+", frequency: "low" },
  { id: "sfdc-lld-2", company: "Salesforce", type: "lld", difficulty: "medium", question: "Design a Workflow Approval system (multi-step, conditional).", tags: ["workflow", "oop"], askedFor: "MTS", frequency: "high" },
  { id: "sfdc-dsa-3", company: "Salesforce", type: "dsa", difficulty: "medium", question: "Top K Frequent Elements.", tags: ["heap"], askedFor: "MTS", frequency: "high" },

  { id: "adobe-sd-3", company: "Adobe", type: "system-design", difficulty: "hard", question: "Design Adobe Sign — e-sign workflow with audit trail.", tags: ["workflow", "audit"], askedFor: "MTS", frequency: "medium" },
  { id: "adobe-lld-2", company: "Adobe", type: "lld", difficulty: "medium", question: "Design Photoshop Layer system (composite + blending).", tags: ["composite", "oop"], askedFor: "MTS", frequency: "low" },
  { id: "adobe-dsa-3", company: "Adobe", type: "dsa", difficulty: "medium", question: "Reverse Linked List in K-groups.", tags: ["linked-list"], askedFor: "MTS", frequency: "high" },

  { id: "bytedance-sd-3", company: "ByteDance / TikTok", type: "system-design", difficulty: "hard", question: "Design TikTok comment system with deeply-nested replies.", tags: ["comments", "tree"], askedFor: "Senior", frequency: "medium" },
  { id: "bytedance-lld-1", company: "ByteDance / TikTok", type: "lld", difficulty: "medium", question: "Design a hashtag service (trending + search).", tags: ["oop", "ranking"], askedFor: "Senior", frequency: "medium" },
  { id: "bytedance-dsa-3", company: "ByteDance / TikTok", type: "dsa", difficulty: "hard", question: "Trapping Rain Water II (BFS + heap).", tags: ["heap", "bfs", "grid"], askedFor: "Senior", frequency: "medium" },

  // ── INDIAN COMPANIES (deeper) ─────────────────────────────────────
  { id: "flipkart-sd-4", company: "Flipkart", type: "system-design", difficulty: "hard", question: "Design Flipkart's seller-onboarding + KYC pipeline.", tags: ["workflow", "kyc"], askedFor: "SDE-3", frequency: "medium" },
  { id: "flipkart-sd-5", company: "Flipkart", type: "system-design", difficulty: "hard", question: "Design Flipkart Plus loyalty + rewards engine.", tags: ["rewards", "ledger"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "flipkart-lld-3", company: "Flipkart", type: "lld", difficulty: "medium", question: "Design BookMyShow with seat-locking + payment timeout.", tags: ["concurrency", "oop"], askedFor: "SDE-2", frequency: "high" },
  { id: "flipkart-dsa-3", company: "Flipkart", type: "dsa", difficulty: "medium", question: "Inversion Count using merge sort.", tags: ["divide-conquer", "merge-sort"], askedFor: "SDE-2", frequency: "medium" },
  { id: "flipkart-dsa-4", company: "Flipkart", type: "dsa", difficulty: "medium", question: "Allocate minimum number of pages (binary search on answer).", tags: ["binary-search"], askedFor: "SDE-2", frequency: "high" },

  { id: "razorpay-sd-3", company: "Razorpay", type: "system-design", difficulty: "hard", question: "Design Razorpay X — neo-banking + payouts.", tags: ["payouts", "banking"], askedFor: "SDE-3", frequency: "medium" },
  { id: "razorpay-lld-3", company: "Razorpay", type: "lld", difficulty: "medium", question: "Design Webhook Subscriber + signature verification SDK.", tags: ["oop", "security"], askedFor: "SDE-2", frequency: "high" },
  { id: "razorpay-dsa-2", company: "Razorpay", type: "dsa", difficulty: "medium", question: "Validate IFSC / UPI ID parser.", tags: ["string", "parser"], askedFor: "SDE-2", frequency: "medium" },

  { id: "swiggy-sd-3", company: "Swiggy", type: "system-design", difficulty: "hard", question: "Design Swiggy Instamart — grocery delivery in 10 min.", tags: ["geo", "inventory"], askedFor: "SDE-3", frequency: "medium" },
  { id: "swiggy-lld-2", company: "Swiggy", type: "lld", difficulty: "medium", question: "Design a Restaurant Menu + Cart system.", tags: ["oop"], askedFor: "SDE-2", frequency: "high" },
  { id: "swiggy-dsa-2", company: "Swiggy", type: "dsa", difficulty: "medium", question: "Optimal task assignment (Hungarian-light) for delivery partners.", tags: ["greedy", "matching"], askedFor: "SDE-2", frequency: "medium" },

  { id: "phonepe-sd-3", company: "PhonePe", type: "system-design", difficulty: "hard", question: "Design real-time UPI fraud detection.", tags: ["fraud", "stream", "ml"], askedFor: "SDE-3", frequency: "medium" },
  { id: "phonepe-lld-2", company: "PhonePe", type: "lld", difficulty: "medium", question: "Design a transaction history + statement service.", tags: ["oop", "ledger"], askedFor: "SDE-2", frequency: "medium" },

  { id: "zomato-sd-2", company: "Zomato", type: "system-design", difficulty: "hard", question: "Design Zomato Gold subscription + per-restaurant offers.", tags: ["subscriptions", "rules"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "paytm-sd-2", company: "Paytm", type: "system-design", difficulty: "hard", question: "Design Paytm bill-payment platform across utility billers.", tags: ["billing", "integration"], askedFor: "SDE-2/3", frequency: "medium" },

  { id: "cred-sd-2", company: "CRED", type: "system-design", difficulty: "hard", question: "Design CRED Pay (UPI checkout flow).", tags: ["payments", "upi"], askedFor: "Senior SDE", frequency: "medium" },
  { id: "zerodha-sd-2", company: "Zerodha", type: "system-design", difficulty: "hard", question: "Design Kite charts — high-throughput tick data ingestion.", tags: ["stream", "low-latency"], askedFor: "Senior", frequency: "medium" },
  { id: "dream11-sd-2", company: "Dream11", type: "system-design", difficulty: "hard", question: "Design contest-creation + entry system at IPL-finals scale.", tags: ["scaling", "queue"], askedFor: "Senior", frequency: "high" },
  { id: "walmart-sd-3", company: "Walmart Labs", type: "system-design", difficulty: "hard", question: "Design Walmart's omnichannel inventory across stores + fulfillment centers.", tags: ["inventory", "consistency"], askedFor: "SDE-3", frequency: "high" },

  // ════════════════════════════════════════════════════════════════════
  // NEW COMPANIES
  // ════════════════════════════════════════════════════════════════════

  // ── SPOTIFY ───────────────────────────────────────────────────────
  { id: "spotify-sd-1", company: "Spotify", type: "system-design", difficulty: "hard", question: "Design Spotify — music streaming with adaptive bitrate.", tags: ["streaming", "cdn"], askedFor: "Senior", frequency: "high" },
  { id: "spotify-sd-2", company: "Spotify", type: "system-design", difficulty: "hard", question: "Design Discover Weekly recommendation pipeline.", tags: ["ml", "ranking"], askedFor: "Senior", frequency: "medium" },
  { id: "spotify-sd-3", company: "Spotify", type: "system-design", difficulty: "hard", question: "Design Spotify Wrapped — yearly aggregation over billions of plays.", tags: ["batch", "spark"], askedFor: "Senior", frequency: "medium" },
  { id: "spotify-lld-1", company: "Spotify", type: "lld", difficulty: "medium", question: "Design a Music Player (queue, shuffle, repeat, crossfade).", tags: ["oop", "state-machine"], askedFor: "Senior", frequency: "high" },
  { id: "spotify-dsa-1", company: "Spotify", type: "dsa", difficulty: "medium", question: "Insert/Delete/GetRandom (for shuffle).", tags: ["design"], askedFor: "Senior", frequency: "high" },

  // ── TESLA ─────────────────────────────────────────────────────────
  { id: "tesla-sd-1", company: "Tesla", type: "system-design", difficulty: "hard", question: "Design Supercharger network availability + reservation.", tags: ["geo", "scheduling"], askedFor: "Senior", frequency: "medium" },
  { id: "tesla-sd-2", company: "Tesla", type: "system-design", difficulty: "hard", question: "Design over-the-air firmware update across the fleet.", tags: ["ota", "rollout"], askedFor: "Senior", frequency: "medium" },
  { id: "tesla-sd-3", company: "Tesla", type: "system-design", difficulty: "hard", question: "Design car-telemetry ingestion for driving-data analytics.", tags: ["stream", "kafka"], askedFor: "Senior", frequency: "medium" },
  { id: "tesla-lld-1", company: "Tesla", type: "lld", difficulty: "medium", question: "Design a CAN-bus event dispatcher.", tags: ["oop", "observer"], askedFor: "Senior", frequency: "low" },
  { id: "tesla-dsa-1", company: "Tesla", type: "dsa", difficulty: "medium", question: "Shortest Path in Binary Matrix (BFS).", tags: ["bfs"], askedFor: "Mid", frequency: "high" },

  // ── NVIDIA ────────────────────────────────────────────────────────
  { id: "nvidia-sd-1", company: "NVIDIA", type: "system-design", difficulty: "hard", question: "Design a GPU job scheduler for shared cluster.", tags: ["scheduler", "gpu"], askedFor: "Senior", frequency: "medium" },
  { id: "nvidia-sd-2", company: "NVIDIA", type: "system-design", difficulty: "hard", question: "Design model-serving platform (Triton-style inference).", tags: ["ml-inference", "serving"], askedFor: "Senior", frequency: "medium" },
  { id: "nvidia-dsa-1", company: "NVIDIA", type: "dsa", difficulty: "medium", question: "Matrix Block Sum / 2D prefix sum.", tags: ["prefix-sum", "matrix"], askedFor: "Mid", frequency: "medium" },
  { id: "nvidia-dsa-2", company: "NVIDIA", type: "dsa", difficulty: "hard", question: "Sparse Matrix Multiplication.", tags: ["matrix", "hashmap"], askedFor: "Senior", frequency: "medium" },

  // ── GITHUB ────────────────────────────────────────────────────────
  { id: "github-sd-1", company: "GitHub", type: "system-design", difficulty: "hard", question: "Design GitHub — repo storage, PRs, CI integrations.", tags: ["git", "workflow"], askedFor: "Senior", frequency: "high" },
  { id: "github-sd-2", company: "GitHub", type: "system-design", difficulty: "hard", question: "Design GitHub Actions — runner orchestration + workflow YAML.", tags: ["ci-cd", "scheduler"], askedFor: "Senior", frequency: "medium" },
  { id: "github-sd-3", company: "GitHub", type: "system-design", difficulty: "hard", question: "Design GitHub Search across repos + code.", tags: ["search", "indexing"], askedFor: "Senior", frequency: "medium" },
  { id: "github-lld-1", company: "GitHub", type: "lld", difficulty: "medium", question: "Design a Git-style content-addressable object store.", tags: ["storage", "design"], askedFor: "Senior", frequency: "medium" },
  { id: "github-dsa-1", company: "GitHub", type: "dsa", difficulty: "medium", question: "LCA in a DAG / commit graph.", tags: ["graph"], askedFor: "Senior", frequency: "medium" },

  // ── OPENAI / ANTHROPIC ───────────────────────────────────────────
  { id: "openai-sd-1", company: "OpenAI", type: "system-design", difficulty: "hard", question: "Design an LLM inference-serving platform (batching, KV cache).", tags: ["ml-inference", "gpu", "batching"], askedFor: "Senior", frequency: "high" },
  { id: "openai-sd-2", company: "OpenAI", type: "system-design", difficulty: "hard", question: "Design a token-based rate-limiter for an LLM API.", tags: ["rate-limit"], askedFor: "Senior", frequency: "high" },
  { id: "openai-sd-3", company: "OpenAI", type: "system-design", difficulty: "hard", question: "Design a vector-search service backing a RAG system.", tags: ["vector-db", "ann"], askedFor: "Senior", frequency: "high" },
  { id: "openai-dsa-1", company: "OpenAI", type: "dsa", difficulty: "medium", question: "Design a streaming token aggregator.", tags: ["design", "stream"], askedFor: "Senior", frequency: "medium" },

  { id: "anthropic-sd-1", company: "Anthropic", type: "system-design", difficulty: "hard", question: "Design an LLM safety/eval pipeline at scale.", tags: ["ml", "safety"], askedFor: "Senior", frequency: "medium" },
  { id: "anthropic-sd-2", company: "Anthropic", type: "system-design", difficulty: "hard", question: "Design a multi-region inference router with regional failover.", tags: ["routing", "failover"], askedFor: "Senior", frequency: "medium" },

  // ── PALANTIR ──────────────────────────────────────────────────────
  { id: "palantir-sd-1", company: "Palantir", type: "system-design", difficulty: "hard", question: "Design an ontology-driven data-platform schema layer.", tags: ["schema", "metadata"], askedFor: "Senior", frequency: "medium" },
  { id: "palantir-sd-2", company: "Palantir", type: "system-design", difficulty: "hard", question: "Design a pipeline DAG executor with lineage tracking.", tags: ["dag", "lineage"], askedFor: "Senior", frequency: "medium" },
  { id: "palantir-dsa-1", company: "Palantir", type: "dsa", difficulty: "medium", question: "Min Cost to Connect All Points (MST).", tags: ["mst", "graph"], askedFor: "Mid", frequency: "medium" },

  // ── GOLDMAN SACHS / JPMORGAN / TWO SIGMA / CITADEL ─────────────────
  { id: "goldman-sd-1", company: "Goldman Sachs", type: "system-design", difficulty: "hard", question: "Design a trade-confirmation + settlement system.", tags: ["trading", "settlement"], askedFor: "VP", frequency: "high" },
  { id: "goldman-sd-2", company: "Goldman Sachs", type: "system-design", difficulty: "hard", question: "Design a real-time risk-calculation engine.", tags: ["risk", "stream"], askedFor: "VP", frequency: "medium" },
  { id: "goldman-lld-1", company: "Goldman Sachs", type: "lld", difficulty: "medium", question: "Design a thread-safe Order Cache with snapshot reads.", tags: ["concurrency", "cache"], askedFor: "Associate", frequency: "high" },
  { id: "goldman-dsa-1", company: "Goldman Sachs", type: "dsa", difficulty: "medium", question: "Min Stack with O(1) getMin.", tags: ["stack"], askedFor: "Associate", frequency: "high" },

  { id: "jpm-sd-1", company: "JPMorgan Chase", type: "system-design", difficulty: "hard", question: "Design a payments hub aggregating multiple rails (ACH, wire, RTP).", tags: ["payments", "integration"], askedFor: "VP", frequency: "medium" },
  { id: "jpm-dsa-1", company: "JPMorgan Chase", type: "dsa", difficulty: "medium", question: "Word Break (DP).", tags: ["dp"], askedFor: "Associate", frequency: "high" },

  { id: "twosigma-sd-1", company: "Two Sigma", type: "system-design", difficulty: "hard", question: "Design a backtesting engine for trading strategies.", tags: ["backtest", "stream"], askedFor: "Quant SWE", frequency: "medium" },
  { id: "twosigma-dsa-1", company: "Two Sigma", type: "dsa", difficulty: "hard", question: "Maximum Profit in Job Scheduling.", tags: ["dp", "binary-search"], askedFor: "Quant SWE", frequency: "medium" },

  { id: "citadel-sd-1", company: "Citadel", type: "system-design", difficulty: "hard", question: "Design a low-latency tick-to-trade pipeline.", tags: ["low-latency", "trading"], askedFor: "SWE", frequency: "high" },
  { id: "citadel-dsa-1", company: "Citadel", type: "dsa", difficulty: "hard", question: "Sliding Window Median.", tags: ["sliding-window", "ordered-set"], askedFor: "SWE", frequency: "medium" },

  // ── BOOKING.COM / EXPEDIA ─────────────────────────────────────────
  { id: "booking-sd-1", company: "Booking.com", type: "system-design", difficulty: "hard", question: "Design hotel-search + availability across millions of properties.", tags: ["search", "availability"], askedFor: "Senior", frequency: "high" },
  { id: "booking-sd-2", company: "Booking.com", type: "system-design", difficulty: "hard", question: "Design dynamic pricing + cache invalidation for room rates.", tags: ["pricing", "cache"], askedFor: "Senior", frequency: "high" },
  { id: "booking-sd-3", company: "Booking.com", type: "system-design", difficulty: "hard", question: "Design booking concurrency with overbooking-safe inventory.", tags: ["inventory", "concurrency"], askedFor: "Senior", frequency: "high" },
  { id: "booking-dsa-1", company: "Booking.com", type: "dsa", difficulty: "medium", question: "Meeting Rooms II.", tags: ["intervals", "heap"], askedFor: "Senior", frequency: "high" },

  { id: "expedia-sd-1", company: "Expedia", type: "system-design", difficulty: "hard", question: "Design a multi-supplier flight-search aggregator.", tags: ["search", "aggregation"], askedFor: "Senior", frequency: "medium" },
  { id: "expedia-dsa-1", company: "Expedia", type: "dsa", difficulty: "medium", question: "Cheapest Flights Within K Stops.", tags: ["graph", "dijkstra"], askedFor: "Senior", frequency: "high" },

  // ── REDDIT / TWITCH / ROBLOX / DISNEY ─────────────────────────────
  { id: "reddit-sd-1", company: "Reddit", type: "system-design", difficulty: "hard", question: "Design Reddit feed + comment ranking (hot/best).", tags: ["feed", "ranking"], askedFor: "Senior", frequency: "high" },
  { id: "reddit-sd-2", company: "Reddit", type: "system-design", difficulty: "hard", question: "Design upvote/downvote system at scale.", tags: ["counter", "stream"], askedFor: "Senior", frequency: "high" },
  { id: "reddit-dsa-1", company: "Reddit", type: "dsa", difficulty: "medium", question: "Top K Frequent Items in a stream.", tags: ["heap", "stream"], askedFor: "Senior", frequency: "high" },

  { id: "twitch-sd-1", company: "Twitch", type: "system-design", difficulty: "hard", question: "Design Twitch low-latency live-streaming chat.", tags: ["chat", "websocket"], askedFor: "Senior", frequency: "high" },
  { id: "twitch-sd-2", company: "Twitch", type: "system-design", difficulty: "hard", question: "Design clip-creation from a live stream.", tags: ["streaming", "video"], askedFor: "Senior", frequency: "medium" },

  { id: "roblox-sd-1", company: "Roblox", type: "system-design", difficulty: "hard", question: "Design the Roblox game-instance matchmaker.", tags: ["matchmaking", "game"], askedFor: "Senior", frequency: "medium" },
  { id: "roblox-dsa-1", company: "Roblox", type: "dsa", difficulty: "medium", question: "Design a unique-username generator.", tags: ["design", "hashmap"], askedFor: "Mid", frequency: "medium" },

  { id: "disney-sd-1", company: "Disney+", type: "system-design", difficulty: "hard", question: "Design Disney+ video catalog + parental controls.", tags: ["streaming", "rbac"], askedFor: "Senior", frequency: "medium" },

  // ── INDIAN: OLA / HOTSTAR / MAKEMYTRIP / GROWW / FRESHWORKS / ZOHO ─
  { id: "ola-sd-1", company: "Ola", type: "system-design", difficulty: "hard", question: "Design Ola — driver/rider matching + ETA in Indian metros.", tags: ["geo", "matching"], askedFor: "SDE-3", frequency: "high" },
  { id: "ola-sd-2", company: "Ola", type: "system-design", difficulty: "hard", question: "Design Ola Electric — charging-station availability + booking.", tags: ["geo", "scheduling"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "ola-lld-1", company: "Ola", type: "lld", difficulty: "medium", question: "Design Cab booking entities + state machine.", tags: ["oop", "state-machine"], askedFor: "SDE-2", frequency: "high" },
  { id: "ola-dsa-1", company: "Ola", type: "dsa", difficulty: "medium", question: "Find K nearest cabs (heap + geohash).", tags: ["heap", "geo"], askedFor: "SDE-2", frequency: "high" },

  { id: "hotstar-sd-1", company: "Hotstar", type: "system-design", difficulty: "hard", question: "Design Hotstar live IPL streaming for 25M concurrent viewers.", tags: ["streaming", "cdn", "scaling"], askedFor: "SDE-3", frequency: "high", note: "Famous prompt — Hotstar's own engineering blog covers this." },
  { id: "hotstar-sd-2", company: "Hotstar", type: "system-design", difficulty: "hard", question: "Design real-time live-comments / reactions during a match.", tags: ["websocket", "fan-out"], askedFor: "SDE-3", frequency: "high" },
  { id: "hotstar-sd-3", company: "Hotstar", type: "system-design", difficulty: "hard", question: "Design a content-recommendation pipeline.", tags: ["ml", "ranking"], askedFor: "SDE-2/3", frequency: "medium" },
  { id: "hotstar-lld-1", company: "Hotstar", type: "lld", difficulty: "medium", question: "Design a Subscription + entitlement check service.", tags: ["oop", "rbac"], askedFor: "SDE-2", frequency: "high" },

  { id: "mmt-sd-1", company: "MakeMyTrip", type: "system-design", difficulty: "hard", question: "Design a flight + hotel booking aggregator across GDS providers.", tags: ["aggregation", "booking"], askedFor: "SDE-3", frequency: "high" },
  { id: "mmt-sd-2", company: "MakeMyTrip", type: "system-design", difficulty: "hard", question: "Design fare-rules engine + cancellation policy evaluator.", tags: ["rules", "oop"], askedFor: "SDE-2/3", frequency: "high" },
  { id: "mmt-lld-1", company: "MakeMyTrip", type: "lld", difficulty: "medium", question: "Design a Search Result + Filter component.", tags: ["oop", "filter"], askedFor: "SDE-2", frequency: "high" },
  { id: "mmt-dsa-1", company: "MakeMyTrip", type: "dsa", difficulty: "medium", question: "Cheapest Flights Within K Stops.", tags: ["graph", "dijkstra"], askedFor: "SDE-2", frequency: "high" },

  { id: "groww-sd-1", company: "Groww", type: "system-design", difficulty: "hard", question: "Design a mutual-fund + stock-investing platform.", tags: ["trading", "ledger"], askedFor: "SDE-3", frequency: "medium" },
  { id: "groww-dsa-1", company: "Groww", type: "dsa", difficulty: "medium", question: "Stock buy-sell with at most K transactions.", tags: ["dp"], askedFor: "SDE-2", frequency: "medium" },

  { id: "freshworks-sd-1", company: "Freshworks", type: "system-design", difficulty: "hard", question: "Design Freshdesk — multi-tenant ticketing system.", tags: ["multi-tenant", "workflow"], askedFor: "Senior SDE", frequency: "medium" },
  { id: "freshworks-lld-1", company: "Freshworks", type: "lld", difficulty: "medium", question: "Design a Ticket Routing engine (round-robin / load-aware).", tags: ["oop", "strategy"], askedFor: "SDE-2", frequency: "medium" },

  { id: "zoho-sd-1", company: "Zoho", type: "system-design", difficulty: "hard", question: "Design Zoho Mail — IMAP/SMTP + storage at scale.", tags: ["email", "storage"], askedFor: "Senior SDE", frequency: "medium" },
  { id: "zoho-dsa-1", company: "Zoho", type: "dsa", difficulty: "medium", question: "Pattern matching: find all anagrams in a string.", tags: ["sliding-window"], askedFor: "Mid", frequency: "high" },

  { id: "postman-sd-1", company: "Postman", type: "system-design", difficulty: "hard", question: "Design API request/response history + sync across devices.", tags: ["sync", "storage"], askedFor: "Senior", frequency: "medium" },
  { id: "postman-lld-1", company: "Postman", type: "lld", difficulty: "medium", question: "Design a Mock-server matching engine for request patterns.", tags: ["oop", "matcher"], askedFor: "Senior", frequency: "medium" },

  { id: "browserstack-sd-1", company: "BrowserStack", type: "system-design", difficulty: "hard", question: "Design a browser/device farm with session orchestration.", tags: ["orchestration", "queue"], askedFor: "Senior", frequency: "medium" },
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
