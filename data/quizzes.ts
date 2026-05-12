export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number; // 0-indexed
  explanation: string;
}

export interface Quiz {
  questions: QuizQuestion[];
}

const quizzes: Record<string, Quiz> = {
  "design-ad-serving-system": {
    questions: [
      {
        q: "What is the typical latency budget for selecting and returning a winning ad in a real-time bidding (RTB) system?",
        options: ["500 ms", "100 ms", "1 second", "10 ms"],
        answer: 1,
        explanation: "RTB systems must complete the entire auction, including calling external DSPs, ranking, and serving, within ~100 ms to fit inside the publisher's ad slot loading window.",
      },
      {
        q: "Which data structure is most suitable for implementing frequency capping (limiting how often a user sees the same ad)?",
        options: ["B-Tree index", "Bloom filter + Redis counter", "SQL table with row lock", "Linked list"],
        answer: 1,
        explanation: "A Bloom filter quickly checks if a user has seen an ad, and a Redis counter atomically tracks the exact count, giving you fast, low-memory frequency cap enforcement.",
      },
      {
        q: "In a second-price auction (Vickrey auction), the winner pays:",
        options: ["Their own bid", "The second-highest bid plus $0.01", "The average of all bids", "A fixed CPM floor"],
        answer: 1,
        explanation: "In a second-price auction the winner pays the second-highest bid (plus a cent in practice), which incentivises bidders to bid their true value.",
      },
      {
        q: "Attribution events (clicks, conversions) need to be recorded at billions per day. Which approach handles this at scale?",
        options: ["Synchronous DB writes on every click", "Kafka → batch consumer → data warehouse", "In-memory counters only", "Polling the ad server every minute"],
        answer: 1,
        explanation: "Kafka absorbs the click/conversion event flood and decouples ingestion from storage. Batch consumers write to a data warehouse for reporting without blocking the critical ad-serving path.",
      },
      {
        q: "What is 'viewability' in ad serving, and why does it matter for billing?",
        options: [
          "Whether the ad loaded in under 50 ms",
          "Whether at least 50% of the ad was visible for ≥1 second",
          "Whether the user clicked the ad",
          "Whether the ad passed malware scanning",
        ],
        answer: 1,
        explanation: "The MRC standard defines a viewable impression as ≥50% of the ad in-view for ≥1 continuous second. Advertisers increasingly pay only for viewable impressions, so tracking this is critical for accurate billing.",
      },
    ],
  },

  "design-cdn": {
    questions: [
      {
        q: "What routing technique do CDNs use to direct users to the nearest edge node without changing the URL?",
        options: ["Round-robin DNS", "Anycast routing", "HTTP 301 redirect", "Client-side geolocation"],
        answer: 1,
        explanation: "Anycast assigns the same IP address to multiple edge PoPs. BGP routing automatically directs each user's packets to the topologically nearest PoP without any application-layer logic.",
      },
      {
        q: "Which HTTP header controls how long an object is cached at the CDN edge?",
        options: ["X-Cache-TTL", "Cache-Control: max-age", "ETag", "Vary"],
        answer: 1,
        explanation: "Cache-Control: max-age=<seconds> instructs both browsers and CDN edge nodes how long to cache the response before revalidating with the origin.",
      },
      {
        q: "What is 'origin shielding' in a CDN architecture?",
        options: [
          "Encrypting content before it reaches the edge",
          "A mid-tier PoP that absorbs cache misses so the origin only sees one upstream",
          "A WAF rule that blocks malicious requests",
          "Prefetching content before users request it",
        ],
        answer: 1,
        explanation: "Origin shielding places a parent PoP between edge nodes and the origin. Edge misses hit the shield first; only shield misses go to the origin, dramatically reducing origin load.",
      },
      {
        q: "When a file is updated and needs to be removed from all CDN edges immediately, which mechanism is used?",
        options: ["TTL expiry (wait)", "Cache purge / invalidation API", "Changing the origin IP", "Vary: * header"],
        answer: 1,
        explanation: "A purge API call propagates a delete command to all edge PoPs, removing stale objects immediately rather than waiting for TTL expiry, essential for breaking news or urgent content updates.",
      },
      {
        q: "Why does a CDN terminate TLS at the edge rather than passing encrypted traffic to the origin?",
        options: [
          "TLS cannot be forwarded over TCP",
          "To decrypt once near the user, enabling caching and reducing origin CPU",
          "Because origin servers do not support HTTPS",
          "To inject ads into the response",
        ],
        answer: 1,
        explanation: "Edge TLS termination lets the CDN decrypt and cache content. Re-encrypting for the origin leg is optional but short. This removes TLS overhead from the origin and enables content inspection for caching decisions.",
      },
    ],
  },

  "design-distributed-cache": {
    questions: [
      {
        q: "Which hashing strategy minimises cache key reshuffling when nodes are added or removed?",
        options: ["Modulo hashing", "Consistent hashing with virtual nodes", "Random placement", "Rendezvous hashing without vnodes"],
        answer: 1,
        explanation: "Consistent hashing places keys and nodes on a ring. Adding/removing a node only remaps keys in one arc of the ring, typically 1/N of keys, rather than rehashing everything.",
      },
      {
        q: "What is a 'cache stampede' (thundering herd) and how is it mitigated?",
        options: [
          "A DDoS attack on the cache cluster",
          "Many requests simultaneously miss a cold key and hammer the DB; mitigated by probabilistic early expiry or a mutex lock",
          "A cache node running out of memory",
          "A network partition between cache replicas",
        ],
        answer: 1,
        explanation: "When a hot key expires, concurrent requests all miss and go to the DB at once. Probabilistic early recomputation (jittered TTL) or a distributed mutex ensures only one request rebuilds the value.",
      },
      {
        q: "Which eviction policy is most appropriate for a cache that serves time-series data where older entries are never re-requested?",
        options: ["LRU (Least Recently Used)", "LFU (Least Frequently Used)", "FIFO (First In First Out)", "Random"],
        answer: 2,
        explanation: "FIFO is ideal when data has a natural time ordering and old data becomes worthless. LRU would keep old hot data longer than necessary; FIFO evicts by insertion order, matching the access pattern.",
      },
      {
        q: "What is a 'hot key' problem in a distributed cache and what is the primary solution?",
        options: [
          "A key with a very short TTL",
          "A single key receiving disproportionate traffic; solved by key sharding / local replica caching",
          "A key stored on the wrong node due to a hash collision",
          "A key that is never evicted",
        ],
        answer: 1,
        explanation: "A viral post ID or trending product may receive millions of requests/second to one node. Solutions include appending a shard suffix (hot-key-0, hot-key-1) and routing randomly, or caching the value in each app server's local memory.",
      },
      {
        q: "In a write-through cache strategy, when is data written to the backing store?",
        options: [
          "Only when the cached copy is evicted",
          "Synchronously on every write, before acknowledging the client",
          "Asynchronously in a background job",
          "Only on cache misses",
        ],
        answer: 1,
        explanation: "Write-through writes to both cache and DB synchronously before returning to the client. This guarantees consistency at the cost of higher write latency compared to write-behind (async) strategies.",
      },
    ],
  },

  "design-distributed-counter": {
    questions: [
      {
        q: "Why does a single-row SQL counter break at high write throughput (e.g. 1M increments/sec)?",
        options: [
          "SQL doesn't support integer columns",
          "Each UPDATE acquires a row lock, serialising all increments and creating a bottleneck",
          "SQL databases don't support concurrent connections",
          "The integer type overflows at 1M",
        ],
        answer: 1,
        explanation: "A single-row counter requires a row-level lock for each increment. All writers queue behind that lock, making throughput proportional to a single node's lock-release rate, nowhere near 1M/sec.",
      },
      {
        q: "What is a 'sharded counter' and how does it increase throughput?",
        options: [
          "A counter stored across multiple data centres",
          "N independent counter shards; each write targets a random shard, and the total is the sum of all shards",
          "A counter that is partitioned by user ID",
          "A counter backed by a bloom filter",
        ],
        answer: 1,
        explanation: "Splitting the counter into N shards (e.g., 64) and routing each increment to a random shard distributes the lock contention across N rows. Reads sum all shards. Throughput scales linearly with N.",
      },
      {
        q: "What is a CRDT (Conflict-free Replicated Data Type) G-Counter and what problem does it solve?",
        options: [
          "A counter that auto-resets to zero on conflict",
          "A counter that can be incremented on any replica without coordination, merging by taking the max per-node value",
          "A counter protected by a two-phase commit",
          "A counter that only allows decrements",
        ],
        answer: 1,
        explanation: "A G-Counter assigns each replica its own slot. Merge = take max of each slot. The total = sum of all slots. No coordination required, making it ideal for eventually-consistent geo-distributed counters.",
      },
      {
        q: "For a 'likes' counter that needs approximate accuracy, which approach offers the best throughput vs accuracy trade-off?",
        options: [
          "Synchronous DB increment on every like",
          "In-memory aggregation with periodic flush to DB (batched writes)",
          "Storing every like event as a separate row",
          "Using a distributed lock on a single counter",
        ],
        answer: 1,
        explanation: "Buffer increments in Redis or in-memory for a short window and flush in batches to the DB. Approximate count is visible immediately, DB load is reduced by orders of magnitude, and consistency lag is acceptable for social counts.",
      },
      {
        q: "What consistency model do most social media 'like counts' use, and why?",
        options: [
          "Strong consistency, every read sees the exact current count",
          "Eventual consistency, replicas converge to the correct count after propagation delay",
          "Linearisability, all increments are globally ordered",
          "Read-your-writes, only the liker sees the updated count",
        ],
        answer: 1,
        explanation: "Exact like counts are not critical for correctness. Eventual consistency allows counters to be sharded and replicated freely, with all replicas converging to the same value after propagation, acceptable for social metrics.",
      },
    ],
  },

  "design-distributed-job-scheduler": {
    questions: [
      {
        q: "How does a distributed job scheduler use 'time-bucketed indexing' to efficiently find due jobs?",
        options: [
          "It sorts all jobs in a global priority queue",
          "Jobs are stored in buckets keyed by their scheduled minute/second, enabling O(1) lookup of what is due now",
          "It polls every job record every second",
          "It uses a cron daemon on each worker",
        ],
        answer: 1,
        explanation: "Bucketing by scheduled time means the scheduler only scans the current-time bucket each tick, rather than sorting or scanning all jobs. This gives near-constant-time discovery regardless of total job count.",
      },
      {
        q: "What is a 'fencing token' and why is it needed for exactly-once job execution?",
        options: [
          "A JWT token that authenticates the worker",
          "A monotonically increasing number sent with each lease; the DB rejects writes with a lower token, preventing stale workers from committing",
          "A rate-limiting token for job submission",
          "A cryptographic signature on the job payload",
        ],
        answer: 1,
        explanation: "A slow worker might hold a lease that appears expired. When it tries to commit, the fencing token (incremented on each lease renewal) is checked, a stale token is rejected, guaranteeing only one worker commits the result.",
      },
      {
        q: "A job has been running for 10 minutes but its lease is 5 minutes. What should happen?",
        options: [
          "The job is marked failed immediately",
          "Another worker picks it up (duplicate execution) unless the lease is renewed or TTL extended",
          "The scheduler waits indefinitely",
          "The job is paused until the original worker reconnects",
        ],
        answer: 1,
        explanation: "Without lease renewal, the scheduler considers the job abandoned after TTL and reassigns it. Long-running jobs must heartbeat/extend their lease to retain ownership and prevent duplicate execution.",
      },
      {
        q: "What data structure is most efficient for a job scheduler's priority queue where high-priority jobs must run first?",
        options: ["Doubly linked list", "Min-heap (or Redis sorted set with score = next_run_at)", "Hash map", "Circular buffer"],
        answer: 1,
        explanation: "A min-heap gives O(log N) insert and O(1) peek at the next-due job. Redis sorted sets (ZRANGEBYSCORE) serve the same role for distributed schedulers, allowing multiple scheduler instances to safely pop due jobs.",
      },
      {
        q: "How are DAG job dependencies (Job B can only start after Job A) typically handled?",
        options: [
          "Job B polls Job A's status every second",
          "Job A's completion event decrements a dependency counter on Job B; when it reaches 0, Job B becomes eligible",
          "Job B is submitted with a hard-coded sleep delay",
          "A human operator manually triggers Job B",
        ],
        answer: 1,
        explanation: "Each job tracks a pending-dependency count. On completion, a job publishes an event that triggers decrement on all downstream dependents. When a job's counter reaches 0 it is enqueued for execution, clean and scalable.",
      },
    ],
  },

  "design-distributed-locking-service": {
    questions: [
      {
        q: "Why is 'SET key value NX EX ttl' (Redis SETNX) insufficient for production distributed locking?",
        options: [
          "Redis doesn't support NX flags",
          "A single Redis node is a SPOF; on failover a new primary may grant the same lock to another client before the original TTL expires",
          "The TTL cannot be set atomically",
          "SETNX requires a Lua script",
        ],
        answer: 1,
        explanation: "With a single Redis node, after failover the new primary has no knowledge of in-memory locks from the old primary. Another client can acquire the same lock simultaneously, violating mutual exclusion.",
      },
      {
        q: "What is a 'fencing token' in the context of distributed locks?",
        options: [
          "A password required to acquire the lock",
          "A monotonically increasing number attached to the lock; the protected resource rejects writes with stale tokens",
          "A hash of the lock holder's identity",
          "The TTL value of the lock",
        ],
        answer: 1,
        explanation: "Even with a valid lock, a GC pause or network delay might cause a client to act after its lock expired. A fencing token lets the resource itself reject stale writes, providing safety even under adverse conditions.",
      },
      {
        q: "Zookeeper and etcd use consensus protocols (Raft/ZAB) for distributed locking. What key property does this provide?",
        options: [
          "Higher throughput than Redis",
          "Linearisability, all lock operations appear atomic and globally ordered",
          "Lock-free concurrency",
          "Automatic lock renewal",
        ],
        answer: 1,
        explanation: "Consensus protocols ensure every lock acquisition/release goes through a quorum. This gives linearisable semantics, no two clients can hold the same lock simultaneously, even across network partitions.",
      },
      {
        q: "What is 'lease-based locking' and why is it safer than indefinite locks?",
        options: [
          "Locks that can only be held by authenticated clients",
          "Locks with a TTL; they automatically expire if the holder crashes, preventing permanent deadlock",
          "Locks that transfer ownership on timeout",
          "Locks limited to read operations",
        ],
        answer: 1,
        explanation: "A lease (TTL-based lock) self-destructs if the holder crashes or freezes. Without leases, a dead client would hold the lock forever, blocking all other waiters, a classic distributed deadlock scenario.",
      },
      {
        q: "In Redlock (Redis distributed lock across N nodes), what is the minimum number of nodes required for safety, and why?",
        options: [
          "1 node, single master is sufficient",
          "Majority (N/2 + 1), ensures no two clients can acquire locks on a majority simultaneously",
          "All N nodes, requires unanimous agreement",
          "2 nodes, one primary, one backup",
        ],
        answer: 1,
        explanation: "Redlock requires acquiring the lock on a majority of N independent Redis nodes. Since two disjoint majorities cannot exist simultaneously, mutual exclusion is guaranteed even if minority nodes fail.",
      },
    ],
  },

  "design-distributed-queue": {
    questions: [
      {
        q: "What is a Kafka 'partition' and how does it enable parallelism?",
        options: [
          "A backup copy of a topic on a different broker",
          "An ordered, append-only log shard of a topic; each partition is consumed independently by one consumer in a group",
          "A compression scheme for messages",
          "A time-window of messages, analogous to a database shard by date",
        ],
        answer: 1,
        explanation: "A topic is split into N partitions, each consumed by exactly one consumer in a consumer group. This allows N consumers to process a topic in parallel, with throughput scaling linearly with partition count.",
      },
      {
        q: "How does Kafka achieve 'exactly-once' delivery semantics?",
        options: [
          "By deleting messages after they are consumed",
          "Via idempotent producers (sequence numbers) + transactional APIs that atomically write to multiple partitions",
          "By using a two-phase commit with ZooKeeper",
          "By limiting each message to a single consumer",
        ],
        answer: 1,
        explanation: "Kafka's idempotent producer assigns each message a sequence number; the broker deduplicates retries. Transactions let a producer write to multiple partitions atomically, enabling exactly-once end-to-end with consumer offset commits.",
      },
      {
        q: "A consumer group has 3 consumers and a topic has 5 partitions. How are partitions assigned?",
        options: [
          "Each consumer reads all 5 partitions",
          "Partitions are distributed as evenly as possible: e.g., consumers get [2, 2, 1] partitions",
          "Only one consumer is active at a time",
          "Kafka randomly assigns a partition per message",
        ],
        answer: 1,
        explanation: "Kafka's group coordinator assigns partitions to consumers round-robin (or by strategy). With 5 partitions and 3 consumers, two consumers get 2 partitions each and one gets 1, no partition is read by more than one consumer.",
      },
      {
        q: "What is the role of the consumer 'offset' in Kafka?",
        options: [
          "The byte position of the message in the broker's disk file",
          "A per-partition pointer tracking how far a consumer has processed; committing it enables resume after restart",
          "A message priority number",
          "The number of replicas for a partition",
        ],
        answer: 1,
        explanation: "The offset is a sequential ID for each message in a partition. Consumers commit their current offset to track progress. On restart they resume from the last committed offset, enabling at-least-once or exactly-once reprocessing.",
      },
      {
        q: "Why is Kafka's log-structured storage (append-only segments) much faster than traditional message brokers?",
        options: [
          "It keeps all messages in RAM",
          "Sequential disk writes are orders of magnitude faster than random writes; the OS page cache makes reads nearly as fast as RAM",
          "It compresses every message with LZ4",
          "It uses RDMA network cards",
        ],
        answer: 1,
        explanation: "Kafka appends messages sequentially to segment files. Sequential I/O saturates disk bandwidth. The OS page cache serves recent messages from RAM. This design sustains millions of messages/sec on commodity hardware.",
      },
    ],
  },

  "design-distributed-tracing-system": {
    questions: [
      {
        q: "What is a 'trace' vs a 'span' in distributed tracing?",
        options: [
          "A trace is a single DB query; a span is a full request",
          "A trace is the end-to-end journey of a request across services; a span is one unit of work within that trace",
          "A trace is a log line; a span is a metric data point",
          "They are synonyms for the same concept",
        ],
        answer: 1,
        explanation: "A trace represents the complete lifecycle of one request (e.g., an API call touching 10 microservices). Each hop or operation within that trace is a span, with parent-child relationships forming a tree (DAG).",
      },
      {
        q: "What is 'head-based sampling' and what is its main drawback?",
        options: [
          "Sampling only the first request from each user",
          "The decision to sample is made at the entry point before the full trace is known; slow/error traces may be dropped",
          "Sampling based on response size",
          "Collecting all spans but storing only the first 100 per minute",
        ],
        answer: 1,
        explanation: "Head-based sampling decides upfront (at the first span) whether to record a trace. This is computationally cheap but may discard exactly the interesting slow or failing requests you most want to keep.",
      },
      {
        q: "How does 'tail-based sampling' solve the problem of head-based sampling?",
        options: [
          "It samples the last request of each hour",
          "It buffers all spans for a trace and makes the sampling decision after the trace completes, keeping slow/error traces",
          "It samples randomly with a fixed percentage",
          "It only samples traces longer than 1 second",
        ],
        answer: 1,
        explanation: "Tail-based sampling collects all spans, then evaluates complete traces against rules (high latency, errors, etc.). This ensures interesting traces are never accidentally dropped, at the cost of buffering overhead.",
      },
      {
        q: "A trace ID must be propagated across service boundaries. What is the standard mechanism for HTTP services?",
        options: [
          "Storing the trace ID in a database shared by all services",
          "Injecting the trace ID into HTTP headers (e.g., traceparent in W3C Trace Context or X-B3-TraceId)",
          "Passing the trace ID as a query parameter",
          "Using a service mesh sidecar that rewrites the body",
        ],
        answer: 1,
        explanation: "Trace context is propagated via HTTP headers. W3C Trace Context (traceparent / tracestate) is the modern standard. Each downstream service reads, uses, and forwards the header, maintaining trace continuity.",
      },
      {
        q: "At millions of spans per second, what storage design makes trace queries fast?",
        options: [
          "Storing all spans in a single relational table indexed by timestamp",
          "Columnar storage or inverted indexes keyed by trace ID and service name, with TTL-based expiry",
          "Storing each span as a separate file on disk",
          "Keeping all spans in Redis with no expiry",
        ],
        answer: 1,
        explanation: "Jaeger and Tempo write spans to columnar stores (Cassandra, Parquet) partitioned by trace ID for O(1) trace assembly. Service/tag indexes enable filtered search. TTL drops old data automatically to bound storage costs.",
      },
    ],
  },

  "design-dropbox-google-drive": {
    questions: [
      {
        q: "Why do file sync systems use 'chunking' (splitting files into fixed-size blocks)?",
        options: [
          "To reduce network packet size",
          "To enable delta sync, only changed chunks are uploaded/downloaded on modification",
          "Because object storage has a 4 MB file size limit",
          "To simplify file encryption",
        ],
        answer: 1,
        explanation: "Chunking enables delta sync: when a file changes, only the modified chunks (not the whole file) are transferred. For a 1 GB file with a 1 KB edit, only ~1 chunk is uploaded instead of 1 GB.",
      },
      {
        q: "What enables Dropbox to avoid uploading a file that another user has already uploaded (global deduplication)?",
        options: [
          "Content-addressable storage using SHA-256 of each chunk as the storage key",
          "A distributed lock on the upload path",
          "Filename-based deduplication",
          "Storing files in a shared NFS volume",
        ],
        answer: 0,
        explanation: "Each chunk is hashed (SHA-256). If the hash already exists in the block store, the upload is skipped, the new file just references the existing block. This is content-addressed storage (CAS), the basis of Dropbox's deduplication.",
      },
      {
        q: "How are file metadata and file content stored differently in a system like Dropbox?",
        options: [
          "Both are stored in the same relational DB",
          "Metadata (name, path, version, chunk list) in a relational/NoSQL DB; content (chunks) in object storage (S3/GCS)",
          "Metadata in object storage; content in a relational DB",
          "Everything is stored in a distributed file system like HDFS",
        ],
        answer: 1,
        explanation: "Separating metadata from content is fundamental. Metadata is small, structured, and queried often (fast DB). Content is large, immutable, and rarely updated (cheap object storage). This split optimises both cost and performance.",
      },
      {
        q: "Two users edit the same file simultaneously while offline. How does Dropbox handle the conflict on sync?",
        options: [
          "Last-writer-wins, the later sync silently overwrites",
          "Both versions are preserved; one is renamed to 'conflicted copy' for the user to resolve",
          "The first upload wins; the second is rejected",
          "A three-way merge is always performed automatically",
        ],
        answer: 1,
        explanation: "Dropbox detects conflicts using version vectors. Rather than silently losing data, it preserves both versions, creating a 'conflicted copy' that users can inspect and merge manually.",
      },
      {
        q: "Which protocol does Dropbox use to notify connected clients of changes in near real-time?",
        options: [
          "Client polling every 30 seconds",
          "Long polling or WebSockets, server holds the connection open and pushes change notifications",
          "Email notifications to trigger re-sync",
          "UDP multicast to all clients",
        ],
        answer: 1,
        explanation: "Long polling or WebSockets let the server push delta notifications instantly when a file changes. Clients receive the notification, fetch only the changed metadata, and download only the changed chunks.",
      },
    ],
  },

  "design-google-maps": {
    questions: [
      {
        q: "How does Google Maps serve map tiles efficiently at different zoom levels?",
        options: [
          "It renders every tile on the fly from raw geo data",
          "Pre-rendered tile pyramids stored in CDN, each zoom level has 4× more tiles than the one above",
          "It streams vector data and renders entirely client-side at all zoom levels",
          "It uses a single high-resolution image that the client crops",
        ],
        answer: 1,
        explanation: "Map tiles are pre-rendered at each of 21+ zoom levels and cached on CDN edges. Each zoom level quadruples the tile count (4^zoom). Pre-rendering moves computation offline; CDN delivers tiles in milliseconds.",
      },
      {
        q: "What preprocessing makes A* routing sub-second for continent-scale road graphs?",
        options: [
          "Running Dijkstra on the full graph every query",
          "ALT (A* + Landmarks + Triangle inequality) or contraction hierarchies pre-compute shortcuts offline",
          "Limiting routes to a 50 km radius",
          "Using a k-d tree for nearest-neighbour lookup",
        ],
        answer: 1,
        explanation: "Contraction hierarchies or ALT pre-process the graph offline, creating shortcut edges and landmark-based heuristics. At query time, routing only explores a tiny fraction of the full graph, enabling sub-100 ms routes across continents.",
      },
      {
        q: "Where does real-time traffic data in Google Maps primarily come from?",
        options: [
          "Traffic cameras with computer vision",
          "Anonymised probe data from smartphones, GPS speed/location reported by millions of active users",
          "Sensors embedded in road surfaces",
          "Manual reports from drivers",
        ],
        answer: 1,
        explanation: "Crowdsourced probe data from Android devices and Google Maps apps is the primary source. Aggregating anonymised speed and position across millions of active users gives near-real-time traffic conditions across the entire road network.",
      },
      {
        q: "What data structure efficiently answers 'which restaurants are within 5 km of me?'",
        options: [
          "Full table scan on a lat/lng table",
          "Geohash index or PostGIS spatial index (R-tree), both enable proximity queries in O(log N)",
          "A sorted list of all lat values",
          "A Bloom filter of restaurant IDs",
        ],
        answer: 1,
        explanation: "Geohashes encode 2D coordinates into a 1D string with proximity-preserving properties. A geohash index (or R-tree) enables fast bounding-box and radius queries, critical for POI search and nearby-place results.",
      },
      {
        q: "What is the 'geocoding' pipeline responsible for?",
        options: [
          "Compressing map tile images",
          "Converting human-readable addresses into lat/lng coordinates (and vice versa for reverse geocoding)",
          "Routing between two coordinates",
          "Detecting traffic jams from probe data",
        ],
        answer: 1,
        explanation: "Geocoding transforms text addresses ('1600 Amphitheatre Pkwy, Mountain View') into geographic coordinates. Reverse geocoding does the inverse. Both require large structured databases of address ranges, postal codes, and place names.",
      },
    ],
  },

  "design-google-search": {
    questions: [
      {
        q: "What data structure is at the heart of a search engine's ability to find documents containing a given word?",
        options: ["B-Tree", "Inverted index (posting list)", "Hash map of document IDs", "Trie"],
        answer: 1,
        explanation: "An inverted index maps each term to the list of document IDs (posting list) that contain it. A query for 'distributed systems' intersects the posting lists of both terms, making full-text search fast regardless of corpus size.",
      },
      {
        q: "Why is the web crawl graph sharded, and what is the primary sharding key?",
        options: [
          "Sharded by document length",
          "Sharded by domain or URL hash so all pages of a site land on the same shard, respecting politeness and enabling link analysis",
          "Sharded alphabetically by first letter of URL",
          "Sharded by crawl date",
        ],
        answer: 1,
        explanation: "Sharding by domain keeps a site's pages co-located, enabling the crawler to respect robots.txt and crawl-delay per domain. It also enables PageRank-like link analysis within a shard before cross-shard aggregation.",
      },
      {
        q: "How does Google Search serve 100K QPS with median latency under 300 ms?",
        options: [
          "One very powerful server with a large in-memory index",
          "The index is sharded across thousands of servers; a query fans out to all shards in parallel, results merge in a top-level aggregator",
          "Results are fully pre-computed for all possible queries",
          "Queries are queued and processed in batches every 300 ms",
        ],
        answer: 1,
        explanation: "The inverted index is horizontally sharded. A query is broadcast to all index shards simultaneously (scatter-gather). Each shard returns its top-K results; an aggregator merges and re-ranks. Parallelism keeps latency bounded regardless of index size.",
      },
      {
        q: "What is PageRank measuring?",
        options: [
          "How many times a page has been visited",
          "The probability that a random web surfer following links ends up on a given page, a measure of authoritative link popularity",
          "The keyword density of a page",
          "The load time of a page",
        ],
        answer: 1,
        explanation: "PageRank models a random surfer clicking links. A page linked to by many high-rank pages gets a high rank. It captures link-based authority, a page cited by Wikipedia is more authoritative than one cited by a spam blog.",
      },
      {
        q: "Why does a search engine maintain multiple index replicas instead of writing every crawl result to one master index?",
        options: [
          "Regulatory requirements mandate data redundancy",
          "Read replicas serve high query load in parallel; a single master index would be a throughput and availability bottleneck",
          "The master index is used only for writes; replicas for reads is a cost-saving measure",
          "Multiple replicas store different languages",
        ],
        answer: 1,
        explanation: "With 100K+ QPS, no single server can handle all reads. Read replicas distribute query load horizontally. Replicas also provide fault tolerance, if a shard replica fails, another serves queries, keeping the index available.",
      },
    ],
  },

  "design-instagram": {
    questions: [
      {
        q: "What is the 'asymmetric follow' model in Instagram, and how does it differ from a bidirectional friendship model?",
        options: [
          "Follows require mutual approval; friendships do not",
          "A user can follow someone without a reciprocal follow-back; follower and following counts are independent",
          "Only verified accounts can use asymmetric follows",
          "It means the feed is personalised differently for each direction",
        ],
        answer: 1,
        explanation: "Instagram's follow is one-directional (like Twitter). User A can follow User B without B following A. This requires separate follower/following lists and complicates feed fan-out, a user with 50M followers creates 50M fan-out writes on post.",
      },
      {
        q: "How does Instagram's feed generation handle 'celebrity' accounts with millions of followers?",
        options: [
          "Celebrity posts are excluded from feeds",
          "Hybrid model: fan-out on write for normal accounts, fan-out on read (pull) for celebrity accounts merged at feed request time",
          "Celebrity posts are limited to 10,000 recipients",
          "A dedicated CDN serves celebrity posts directly",
        ],
        answer: 1,
        explanation: "Fanning out a post to 50M followers on every upload is prohibitively slow. Instead, celebrity accounts use pull-based fan-out: when a follower requests their feed, the system merges the celebrity's recent posts with pre-computed feed rows from other accounts.",
      },
      {
        q: "Instagram Stories disappear after 24 hours. What storage/infrastructure decision does this lifecycle drive?",
        options: [
          "Stories are stored in RAM only",
          "Stories use a TTL-based expiry in object storage and the metadata DB; expired media is garbage collected",
          "Stories are never actually deleted, they become private after 24 hours",
          "Stories are served from a separate CDN with no caching",
        ],
        answer: 1,
        explanation: "A TTL is attached to story metadata rows and the object storage entry. After 24 hours, stories are marked expired (soft delete) and a background job purges the media, freeing storage without requiring complex deletion logic.",
      },
      {
        q: "How are uploaded photos stored and served to support multiple device resolutions?",
        options: [
          "The original full-resolution image is always served; the client resizes it",
          "On upload, multiple resolutions (thumbnail, medium, full) are generated async and stored in object storage / CDN",
          "Photos are stored in a relational DB as BLOBs",
          "Instagram stores only a single resolution and uses CSS to resize",
        ],
        answer: 1,
        explanation: "After upload, an async transcoding pipeline generates multiple resolutions (e.g., 150px thumbnail, 640px standard, 1080px HD). All variants are stored in object storage and fronted by a CDN, matching delivery to the client's screen size and bandwidth.",
      },
      {
        q: "What data store is most appropriate for Instagram's follower/following relationship graph?",
        options: [
          "A relational DB with a single 'follows' table (user_id, followed_id) with indexes",
          "A graph database for all follow relationships to enable complex traversals",
          "A key-value store where key=userId and value=serialized list of all followers",
          "A document store with one document per user containing all follow data",
        ],
        answer: 0,
        explanation: "A relational table (user_id, followed_id) with composite indexes handles follower/following lookups efficiently at Instagram's scale. Graph DBs introduce operational complexity not needed for simple follow/unfollow and list queries.",
      },
    ],
  },

  "design-netflix": {
    questions: [
      {
        q: "What is 'Adaptive Bitrate (ABR) streaming' and why does Netflix use it?",
        options: [
          "Streaming at the highest possible bitrate regardless of network conditions",
          "Dynamically switching between quality levels based on available bandwidth so playback never stalls",
          "Compressing video differently for each country",
          "Using multiple CDN providers simultaneously for redundancy",
        ],
        answer: 1,
        explanation: "ABR encodes each video at multiple bitrates (e.g. 240p to 4K). The client player monitors download speed and buffer health, switching to a higher or lower quality segment seamlessly, preventing buffering on slow connections.",
      },
      {
        q: "Where does Netflix pre-position video files to minimise latency for viewers?",
        options: [
          "A single data centre in each continent",
          "Open Connect Appliances (OCAs), Netflix's own CDN hardware inside ISP networks worldwide",
          "AWS S3 buckets in each AWS region",
          "User devices via P2P distribution",
        ],
        answer: 1,
        explanation: "Netflix's Open Connect CDN places purpose-built appliances directly inside ISPs and IXPs. Popular content is pre-loaded during off-peak hours. Viewers stream from equipment potentially in the same building as their ISP, minimising hops and latency.",
      },
      {
        q: "What makes Netflix's homepage a unique technical challenge compared to a static page?",
        options: [
          "It requires Flash player support",
          "Each user's homepage is a unique real-time render based on personalised ranking of thousands of titles",
          "It loads a different language per region",
          "It must show live sports scores",
        ],
        answer: 1,
        explanation: "Netflix's homepage is computed per user: the recommendation model scores thousands of titles, personalised rows are selected, images A/B tested, and the page assembled, all in real-time. No two users see the same homepage.",
      },
      {
        q: "Netflix encodes each video into hundreds of chunks. What container format do these segments use for HLS/DASH streaming?",
        options: ["MP4 with progressive download", "MPEG-2 TS or fMP4 segments aligned to keyframes for seamless bitrate switching", "AVI files", "Raw H.264 NAL units"],
        answer: 1,
        explanation: "HLS uses MPEG-2 TS or fragmented MP4 (fMP4) segments, each starting on a keyframe. This alignment allows the player to switch quality between segments without decoding artefacts or buffering.",
      },
      {
        q: "How does Netflix A/B test different thumbnail images for the same title?",
        options: [
          "Manual selection by the content team",
          "Multiple artwork variants are assigned to user cohorts; engagement metrics (click-through rate) determine the winner",
          "The same thumbnail is used globally with localisation only for language",
          "Thumbnails are chosen by the video encoding algorithm",
        ],
        answer: 1,
        explanation: "Netflix runs artwork experimentation at scale: different cohorts see different thumbnail variants. Click-through rate and play rate are measured. The winning image is promoted globally, even the same title may show different artwork to different users.",
      },
    ],
  },

  "design-news-feed-twitter": {
    questions: [
      {
        q: "What is 'fan-out on write' for a social news feed?",
        options: [
          "Reading posts from all followees at request time and merging them",
          "When a user posts, immediately writing the post ID into each follower's feed cache",
          "Sending a push notification to all followers",
          "Writing the post to a CDN for fast delivery",
        ],
        answer: 1,
        explanation: "Fan-out on write pre-computes feeds: when Alice posts, the system writes the post ID to each of Alice's N followers' feed lists immediately. Feed reads are O(1), just fetch the pre-built list. The trade-off is write amplification for large follower counts.",
      },
      {
        q: "What is 'fan-out on read' and in what scenario is it preferred?",
        options: [
          "Pre-computing feeds at write time",
          "Pulling posts from all followees at read time and merging; preferred for inactive users or accounts with millions of followers",
          "Caching the feed in the browser",
          "Using a CDN to serve pre-built feed pages",
        ],
        answer: 1,
        explanation: "Fan-out on read avoids write amplification, a celebrity's post isn't duplicated to 50M feeds. Instead, at read time the system fetches the celebrity's recent posts and merges with the pre-built fan-out feed. This is the 'hybrid' strategy real Twitter uses.",
      },
      {
        q: "What is the 'celebrity problem' (thundering herd on write)?",
        options: [
          "A celebrity account getting DDoS attacked",
          "A user with millions of followers causes massive write amplification when posting, fan-out to 50M feeds in real-time is infeasible",
          "Celebrity accounts requiring special content moderation",
          "A fan base flooding the trending topics",
        ],
        answer: 1,
        explanation: "Fanning out a post to 50M followers synchronously would take too long and overload the write path. Twitter solves this by skipping fan-out for celebrity accounts and merging their posts at read time instead.",
      },
      {
        q: "How does Twitter determine the order of posts shown in a feed?",
        options: [
          "Strictly reverse chronological order",
          "A ranking model that scores posts by predicted engagement (likes, replies) combined with recency",
          "Alphabetical by tweet content",
          "Random shuffling to increase diversity",
        ],
        answer: 1,
        explanation: "Modern Twitter (X) uses a ML ranking model that considers predicted engagement, recency, relationship strength, and content signals to order the feed, rather than pure chronological ordering used in early Twitter.",
      },
      {
        q: "What storage system efficiently serves a user's pre-computed feed list with low latency?",
        options: [
          "A relational DB with a feed table per user",
          "Redis sorted sets or lists, in-memory, O(1) LPUSH and LRANGE for ordered feed access",
          "A document store with the full feed as a JSON array",
          "HDFS for durable feed storage",
        ],
        answer: 1,
        explanation: "Redis sorted sets score each post by timestamp. ZREVRANGE returns the top-N most recent posts in O(log N). In-memory access gives sub-millisecond feed reads at scale, critical for a product where every millisecond of load time affects engagement.",
      },
    ],
  },

  "design-notification-system": {
    questions: [
      {
        q: "What is 'idempotency' in notification delivery and why does it matter?",
        options: [
          "Notifications are compressed to reduce data usage",
          "A notification can be delivered multiple times without the user seeing duplicates, achieved via a deduplication key",
          "Notifications are encrypted end-to-end",
          "The same template is used for all users",
        ],
        answer: 1,
        explanation: "At-least-once delivery retries on failure. Without idempotency, retries cause duplicate notifications (spam). A deduplication key (e.g., notification_id) lets the provider or client discard already-delivered messages.",
      },
      {
        q: "How does a multi-channel notification system handle provider failure (e.g., SendGrid is down for email)?",
        options: [
          "Drop the notification permanently",
          "Provider failover, retry with an alternative provider (e.g., Mailgun) using the same notification payload",
          "Store the notification and try again in 24 hours",
          "Switch the delivery channel (e.g., send an SMS instead of email)",
        ],
        answer: 1,
        explanation: "A circuit breaker pattern monitors provider health. On failure, the system fails over to a backup provider with the same payload, ensuring high delivery rates without manual intervention.",
      },
      {
        q: "A user has set 'Do Not Disturb' from 10 PM to 8 AM. Where should this check happen?",
        options: [
          "At the push notification provider (APNs/FCM)",
          "In the notification service before enqueuing, using the user's preference store and timezone",
          "In the mobile app after receiving the notification",
          "In the database trigger when the notification row is inserted",
        ],
        answer: 1,
        explanation: "The notification service should check user preferences (DND windows, quiet hours, per-channel opt-outs) before even enqueuing the notification. This avoids wasting downstream resources and respects user intent at the earliest point.",
      },
      {
        q: "What is a 'notification template' system and why is it important at scale?",
        options: [
          "A way to format push notification payloads for APNs vs FCM",
          "Centralised management of message copy and localisation, enabling non-engineers to update notification text without code deploys",
          "A caching layer for frequently sent notifications",
          "A deduplication mechanism based on message content",
        ],
        answer: 1,
        explanation: "Template systems separate message content from delivery logic. Marketing/product teams update copy and localizations in a template store. The notification service renders the final message at send time, decoupling content from engineering deployments.",
      },
      {
        q: "Why must a notification queue be durable (persisted to disk) rather than purely in-memory?",
        options: [
          "In-memory queues are slower than disk queues",
          "If the service restarts, in-memory notifications are lost; durable queues (Kafka, SQS) survive crashes and guarantee delivery",
          "Regulations require all notifications to be logged to disk",
          "Disk queues support higher throughput than in-memory queues",
        ],
        answer: 1,
        explanation: "A notification that is lost before delivery means a user misses a critical event (password reset, payment confirmation). Durable queues persist messages to disk with replication, ensuring delivery even after service failures.",
      },
    ],
  },

  "design-payment-system": {
    questions: [
      {
        q: "What is an 'idempotency key' in a payment API and why is it critical?",
        options: [
          "A key that encrypts the payment amount",
          "A client-generated unique ID per request; the server uses it to deduplicate retries, ensuring a payment is charged exactly once",
          "The merchant's API authentication token",
          "A hash of the cardholder's details for PCI compliance",
        ],
        answer: 1,
        explanation: "Networks are unreliable. A client may retry a timed-out payment request. The idempotency key (UUID) lets the server recognise a retry and return the original response instead of charging twice, preventing double billing.",
      },
      {
        q: "What is 'double-entry bookkeeping' in a payment ledger and why does it matter?",
        options: [
          "Storing every transaction twice in different databases for redundancy",
          "Every debit has a corresponding credit; the sum of all entries always equals zero, ensuring the ledger is internally consistent",
          "Requiring two-factor authentication for every transaction",
          "Logging payments in both the payment system and the accounting system",
        ],
        answer: 1,
        explanation: "Double-entry bookkeeping (debits = credits) is the foundation of financial ledgers. It makes it mathematically impossible to 'lose' money in the system, any discrepancy (assets ≠ liabilities + equity) immediately signals a bug.",
      },
      {
        q: "A payment saga involves charging a card, updating inventory, and notifying shipping. If the inventory update fails, what must happen?",
        options: [
          "Accept the inconsistency and reconcile later",
          "Execute a compensating transaction, refund the card charge to undo the first step",
          "Retry the inventory update indefinitely",
          "Cancel the shipping notification only",
        ],
        answer: 1,
        explanation: "A saga coordinates distributed transactions without 2PC. Each step has a compensating transaction. If step 2 fails, the saga executes compensating transactions for all completed steps in reverse order, rolling back to a consistent state.",
      },
      {
        q: "Why does Stripe recommend clients always store and display amounts in the smallest currency unit (e.g., cents)?",
        options: [
          "To simplify regex validation of amounts",
          "Floating-point arithmetic on dollars introduces rounding errors; integer cents are exact",
          "Payment networks only accept integer amounts",
          "It is a legal requirement in the US",
        ],
        answer: 1,
        explanation: "0.1 + 0.2 ≠ 0.3 in IEEE 754 floating point. Financial calculations in floating-point dollars accumulate rounding errors. Integers (cents) are exact and avoid this class of bug entirely, a well-known cause of financial discrepancies.",
      },
      {
        q: "What is a 'webhook' in payment systems and what reliability challenge does it introduce?",
        options: [
          "A real-time dashboard for monitoring payments",
          "An HTTP callback the payment processor sends to the merchant on events; requires idempotency handling because retries may duplicate events",
          "An authentication token for PCI-DSS compliance",
          "A real-time payment method alternative to card networks",
        ],
        answer: 1,
        explanation: "Webhooks (e.g., Stripe's payment_intent.succeeded) notify the merchant server of payment events. They are delivered at-least-once, a delivery failure causes retries. Merchants must handle duplicate webhook deliveries idempotently.",
      },
    ],
  },

  "design-rate-limiter": {
    questions: [
      {
        q: "What is the key advantage of the 'sliding window log' algorithm over the 'fixed window counter'?",
        options: [
          "It uses less memory",
          "It prevents burst traffic at window boundaries, no 2× burst is possible at the end of one window and start of the next",
          "It is faster to compute",
          "It supports distributed deployments without a shared store",
        ],
        answer: 1,
        explanation: "A fixed window allows 2× the limit if requests are timed at the boundary (last second of window N + first second of window N+1). Sliding window log tracks exact timestamps and enforces the limit over any rolling window, eliminating this edge case.",
      },
      {
        q: "In the 'token bucket' algorithm, what does the 'bucket capacity' control?",
        options: [
          "The average request rate",
          "The maximum burst size, requests above the refill rate are allowed until the bucket empties",
          "The number of users sharing the bucket",
          "The TTL of the rate limit entry in Redis",
        ],
        answer: 1,
        explanation: "Tokens refill at a steady rate (average allowed rate). The bucket size is the maximum burst: a user can burn through a full bucket of tokens instantly, absorbing spikes above the average rate before throttling kicks in.",
      },
      {
        q: "A distributed rate limiter across 10 servers uses local in-memory counters. What problem arises?",
        options: [
          "Memory usage is too high",
          "Each server enforces the limit independently, allowing up to 10× the intended rate if requests are distributed across servers",
          "Local counters are slower than a central Redis counter",
          "The counters lose accuracy due to clock drift",
        ],
        answer: 1,
        explanation: "With 10 servers each allowing 100 req/s, a user can potentially make 1000 req/s if load-balanced evenly. Centralised rate limiting (Redis/Memcached) aggregates counts globally, enforcing the limit correctly across the fleet.",
      },
      {
        q: "What HTTP status code should a rate limiter return when a client exceeds its limit?",
        options: ["400 Bad Request", "429 Too Many Requests", "503 Service Unavailable", "403 Forbidden"],
        answer: 1,
        explanation: "RFC 6585 defines 429 Too Many Requests for rate limiting. It should include Retry-After and X-RateLimit-* headers to tell clients when they can resume and what their remaining quota is.",
      },
      {
        q: "Which Redis command is commonly used for atomic sliding window rate limiting?",
        options: [
          "INCR with a fixed TTL",
          "ZADD + ZREMRANGEBYSCORE + ZCARD, add current timestamp, remove old entries, count remaining",
          "LPUSH + LLEN, append to list and check length",
          "SETNX + EXPIRE, set if not exists with expiry",
        ],
        answer: 1,
        explanation: "A Redis sorted set stores request timestamps as scores. ZADD adds the current request, ZREMRANGEBYSCORE prunes entries outside the window, ZCARD counts current requests. A Lua script makes this atomic, the standard sliding window log implementation.",
      },
    ],
  },

  "design-top-k-trending": {
    questions: [
      {
        q: "Why is exact top-K counting over a sliding window infeasible at large scale?",
        options: [
          "There is no sorting algorithm fast enough",
          "Tracking exact counts requires O(N) memory for N unique items, and a sliding window requires storing every event timestamp, prohibitive at billions/day",
          "SQL databases don't support COUNT(*) over time windows",
          "Network latency prevents collecting all counts centrally",
        ],
        answer: 1,
        explanation: "Exact sliding-window counts need to remember when each individual event occurred to expire it correctly. At billions of events/day across millions of unique items, this storage is infeasible. Approximate structures trade a small error bound for dramatically lower memory.",
      },
      {
        q: "What does a Count-Min Sketch provide, and what is its error guarantee?",
        options: [
          "An exact count for the top-K items with no error",
          "An approximate count for any item, always overestimating by at most ε·N with probability ≥ 1-δ (configurable)",
          "An exact count only for items seen more than 1000 times",
          "A random sample of item frequencies",
        ],
        answer: 1,
        explanation: "Count-Min Sketch uses a 2D array of counters with multiple hash functions. It never undercounts but may overcount by ε·N. With a small fixed-size sketch (e.g., 1KB per shard), you get approximate counts for any item in O(1) time and space.",
      },
      {
        q: "In a two-tier trending system, what does the local (shard) tier do vs the global tier?",
        options: [
          "Local tier stores raw events; global tier counts them",
          "Local shards maintain per-shard approximate counts and periodically push local top-K to the global aggregator, which merges and re-ranks",
          "Local tier handles reads; global tier handles writes",
          "Local tier stores the last 5 minutes; global tier stores the last 24 hours",
        ],
        answer: 1,
        explanation: "Each shard independently tracks its local approximate top-K (low latency, no cross-shard coordination). Every N seconds, shards emit their local top-K to a global aggregator that merges them, accurate enough while avoiding the bottleneck of a single global counter.",
      },
      {
        q: "What is the 'Heavy Hitters' problem and which algorithm solves it with a single pass?",
        options: [
          "Finding the maximum value in a stream; solved by keeping a running max",
          "Finding items that appear more than N/k times in a stream; solved by Misra-Gries (frequent elements) algorithm",
          "Sorting a stream in real-time; solved by merge sort",
          "Finding duplicate items; solved by a Bloom filter",
        ],
        answer: 1,
        explanation: "Misra-Gries maintains a table of at most k-1 candidates. For each new item, increment its count or decrement all counts by 1 if the table is full (and remove zeros). After one pass, all items appearing >N/k times are guaranteed to be in the table.",
      },
      {
        q: "Why is 'trending' different from 'most popular'? What signal does trending capture?",
        options: [
          "Trending shows items from the last 24 hours; popular shows all-time counts",
          "Trending measures velocity, a rapid increase in frequency over a short window, regardless of absolute count",
          "Trending is based on user ratings; popular is based on view counts",
          "They are the same concept with different names",
        ],
        answer: 1,
        explanation: "A topic that always gets 1M mentions/hour is popular but not trending. Trending detects acceleration, topics whose mention rate spikes relative to their baseline. This is typically measured as (current_count - baseline) / baseline over a short window.",
      },
    ],
  },

  "design-twitch-live-streaming": {
    questions: [
      {
        q: "What protocol do streamers use to send live video from their encoder to ingest servers?",
        options: ["HLS (HTTP Live Streaming)", "RTMP (Real-Time Messaging Protocol)", "WebRTC", "DASH (Dynamic Adaptive Streaming over HTTP)"],
        answer: 1,
        explanation: "RTMP is the standard protocol for ingest, streaming software (OBS, XSplit) pushes live video to ingest servers via RTMP. The server then transcodes and re-packages into HLS/DASH for viewer delivery.",
      },
      {
        q: "What is the latency trade-off between standard HLS and Low-Latency HLS (LL-HLS)?",
        options: [
          "Standard HLS has 0.5s latency; LL-HLS has 5s latency",
          "Standard HLS segments are 6–10 seconds giving 15–30s latency; LL-HLS uses ~200ms partial segments giving 2–3s latency",
          "They have identical latency; LL-HLS just uses smaller file sizes",
          "LL-HLS requires WebRTC; standard HLS works over CDN",
        ],
        answer: 1,
        explanation: "Standard HLS buffers 3 full segments (2–10s each) before playback starts, resulting in 15–45s latency. LL-HLS introduces partial segments and HTTP/2 push, reducing glass-to-glass latency to ~2–3s, much closer to the live experience.",
      },
      {
        q: "Why does a live stream require transcoding into multiple bitrates/resolutions before distribution?",
        options: [
          "Legal requirements mandate multiple resolution options",
          "Viewers have varying network speeds; ABR players select the best quality their connection can sustain without buffering",
          "The ingest format (RTMP) is incompatible with CDN delivery",
          "Copyright protection requires re-encoding",
        ],
        answer: 1,
        explanation: "A mobile viewer on 4G needs 360p; a fibre user wants 1080p60. ABR transcoding produces 240p to 1080p variants. The player dynamically switches quality based on available bandwidth, preventing buffering without sacrificing quality for capable connections.",
      },
      {
        q: "Twitch has a chat system serving millions of concurrent viewers for one channel. What architecture handles this?",
        options: [
          "All viewers connect to one chat server for a channel",
          "Chat is sharded by channel; each shard fans out messages via pub/sub to all viewer connections on multiple servers",
          "Chat is implemented as a database polling loop",
          "WebRTC peer-to-peer between viewers",
        ],
        answer: 1,
        explanation: "One server can't hold millions of WebSocket connections. Chat messages are published to a channel-specific pub/sub topic (Redis Pub/Sub, Kafka). Multiple chat gateway servers subscribe and forward messages to their connected viewers, distributing the fan-out load.",
      },
      {
        q: "What is the key difference between a broadcaster's latency requirements and a viewer's?",
        options: [
          "Broadcasters need sub-second latency; viewers are fine with 5+ minutes",
          "Broadcasters need very low ingest latency to maintain encoding sync; viewers accept 10–30s latency for buffering stability",
          "There is no difference, both need the same latency",
          "Viewers need lower latency than broadcasters to react to chat",
        ],
        answer: 1,
        explanation: "The broadcaster's encoder must synchronise audio/video in real-time, requiring low-latency RTMP ingest. Viewers tolerate higher latency (10–30s for standard HLS) because a larger buffer provides smooth, stable playback even with network jitter.",
      },
    ],
  },

  "design-typeahead-autocomplete": {
    questions: [
      {
        q: "What data structure is classically used to store and traverse autocomplete prefixes efficiently?",
        options: ["Hash map", "Trie (prefix tree)", "Binary search tree", "Inverted index"],
        answer: 1,
        explanation: "A trie stores strings character by character. A prefix lookup traverses from root to the last character of the prefix in O(L) time (L = prefix length), then retrieves all completions in the subtree, O(L + K) for the top-K results.",
      },
      {
        q: "Why is a raw trie impractical at Google Search scale (billions of unique queries)?",
        options: [
          "Tries only work for alphabetical characters",
          "Memory usage is prohibitive; each node may have up to 26 children and the trie could have billions of nodes",
          "Tries don't support ranking by query frequency",
          "Tries can't be distributed across servers",
        ],
        answer: 1,
        explanation: "A full trie for billions of queries would require terabytes of RAM. Practical systems shard the trie by prefix, store only top-K results per prefix node (pre-pruned), or use compressed tries (DAWG), trading completeness for feasibility.",
      },
      {
        q: "How is the autocomplete trie updated with new trending queries (e.g., a breaking news topic)?",
        options: [
          "The trie is rebuilt from scratch every minute",
          "A separate real-time stream updates prefix top-K rankings incrementally; full rebuilds happen periodically (daily/weekly)",
          "New queries are only added manually by editors",
          "The trie is never updated after initial build",
        ],
        answer: 1,
        explanation: "Full trie rebuilds are expensive. A hybrid approach: offline jobs rebuild the trie periodically from query logs; a real-time component captures trend signals (last hour) and blends them with the static trie, keeping suggestions fresh without constant rebuilds.",
      },
      {
        q: "What caching layer is critical for serving autocomplete at sub-100ms latency?",
        options: [
          "Browser-side caching of all possible completions",
          "An in-memory cache (Redis/Memcached) storing top-K results per popular prefix, a small set covers the vast majority of requests",
          "A CDN that caches HTML suggestion dropdowns",
          "Database query result caching via prepared statements",
        ],
        answer: 1,
        explanation: "The Zipf distribution means a tiny fraction of prefixes (top 1000) handles >90% of traffic. Caching the top-K results for popular prefixes in Redis makes the common case a single sub-millisecond memory read, bypassing the trie entirely for most requests.",
      },
      {
        q: "How does personalisation work in search autocomplete?",
        options: [
          "All users see the same completions, personalisation only applies to results, not suggestions",
          "A user's recent queries and click history are blended with global top-K to boost personally relevant completions",
          "Personalisation replaces the global trie entirely with a per-user trie",
          "Personalisation is only applied for premium users",
        ],
        answer: 1,
        explanation: "The server blends global popularity scores with the user's query history and location. A user who frequently searches 'machine learning' sees ML-related completions ranked higher than the global average, implemented as a re-ranking step after the trie lookup.",
      },
    ],
  },

  "design-uber-eats-doordash": {
    questions: [
      {
        q: "What is the 'three-sided marketplace' in food delivery, and what makes it harder to design than a two-sided marketplace?",
        options: [
          "It refers to three pricing tiers (standard, express, premium)",
          "Customer, restaurant, and courier must all be coordinated, each with separate state machines, ETAs, and incentives that must be balanced simultaneously",
          "It means the app runs on iOS, Android, and web simultaneously",
          "Three geographic zones with different pricing",
        ],
        answer: 1,
        explanation: "Two-sided marketplaces match buyers and sellers. Food delivery adds a third party (courier) with its own real-time location, capacity, and SLA. All three must be coordinated: customer's order state, restaurant's prep state, and courier's pickup/delivery state.",
      },
      {
        q: "How does the platform estimate a restaurant's food preparation time accurately?",
        options: [
          "Fixed 20 minutes for all orders",
          "ML model trained on historical prep times per restaurant, item complexity, current kitchen queue depth, and time of day",
          "The restaurant manually inputs prep time for each order",
          "Courier pickup time minus order placement time, averaged",
        ],
        answer: 1,
        explanation: "Accurate ETA depends on prep time prediction. An ML model combines historical averages per dish, current kitchen load (queue depth, concurrent orders), time-of-day patterns, and weather, giving dynamic estimates that improve courier dispatch timing.",
      },
      {
        q: "What is 'batched delivery' and what optimisation problem does it solve?",
        options: [
          "Delivering all orders from one restaurant in one trip",
          "A courier picks up multiple orders from nearby restaurants and delivers them to customers on an optimised multi-stop route, a variant of the Vehicle Routing Problem",
          "Batching payment settlements for multiple orders",
          "Grouping orders placed within the same minute",
        ],
        answer: 1,
        explanation: "Batching maximises courier utilisation by combining multiple deliveries in one trip. The system must solve a VRP variant in real-time, finding the optimal pickup + delivery sequence that minimises total lateness while staying within per-order ETA SLAs.",
      },
      {
        q: "How is menu catalog freshness maintained when a restaurant runs out of an item?",
        options: [
          "Menus are updated nightly in a batch job",
          "Restaurant tablets push item availability updates in real-time via WebSocket or polling; the catalog service propagates changes within seconds",
          "Customers are refunded after ordering an unavailable item",
          "Menus are static and updated only by the platform operations team",
        ],
        answer: 1,
        explanation: "Restaurant tablets or POS integrations emit item-availability events when stock changes. The catalog service processes these events and updates the customer-facing menu within seconds, preventing orders for unavailable items and costly cancellations.",
      },
      {
        q: "A customer's order transitions through multiple states. Which pattern cleanly models this lifecycle?",
        options: [
          "A series of boolean flags in the order row",
          "A state machine (placed → confirmed → preparing → ready → picked_up → delivered) with explicit transitions and side effects",
          "A linked list of event timestamps",
          "A hierarchy of microservices each owning one status",
        ],
        answer: 1,
        explanation: "Order lifecycle is a textbook state machine: each state transition triggers side effects (notify customer, dispatch courier, start billing timer). A state machine makes invalid transitions impossible and audit logging trivial, critical for a financial and logistics system.",
      },
    ],
  },

  "design-uber-ride-sharing": {
    questions: [
      {
        q: "What spatial indexing technique does Uber use to efficiently find nearby drivers?",
        options: [
          "Linear scan of all driver GPS coordinates",
          "Geohash or S2 cells, 2D coordinates encoded as a 1D string, enabling range queries with a prefix search",
          "K-D tree rebuilt every second",
          "A relational DB with ST_Distance queries",
        ],
        answer: 1,
        explanation: "Geohashing encodes lat/lng into a fixed-length string where nearby locations share a prefix. A driver location update changes the geohash; a rider query does a prefix lookup + neighbour-cell search, finding nearby drivers in O(1) without scanning all drivers.",
      },
      {
        q: "How frequently do drivers send location updates, and why is this frequency chosen?",
        options: [
          "Once per second, to maintain sub-second accuracy",
          "Every 4–5 seconds, frequent enough for smooth map updates while avoiding excessive battery drain and server load",
          "Only when the driver moves more than 100 metres",
          "Every 30 seconds, matching the ride ETA update frequency",
        ],
        answer: 1,
        explanation: "4–5 second intervals balance accuracy (GPS position doesn't change radically in 4s at city speeds) with battery life (GPS polling is expensive) and server load (millions of drivers × frequent updates = enormous write throughput).",
      },
      {
        q: "How does surge pricing work at a system design level?",
        options: [
          "A human operator manually raises prices in congested areas",
          "A near-real-time model computes supply/demand ratio per geohash cell; if demand exceeds supply by a threshold, a multiplier is applied",
          "Prices are fixed and only vary by distance",
          "Surge pricing is triggered by weather API events",
        ],
        answer: 1,
        explanation: "Surge pricing is a real-time market mechanism. The system aggregates active ride requests and available drivers per geohash cell. When the ratio exceeds a threshold, a pricing multiplier is applied, incentivising more drivers to go online and reducing demand.",
      },
      {
        q: "What is the 'trip state machine' and why is it important for reliability?",
        options: [
          "A flowchart used by customer support",
          "An explicit model of trip lifecycle states (requested → accepted → en_route → arrived → in_trip → completed) ensuring only valid transitions occur and enabling reliable event-driven side effects",
          "The GPS route calculation algorithm",
          "A machine learning model predicting trip duration",
        ],
        answer: 1,
        explanation: "The state machine enforces valid transitions. You can't go from 'requested' to 'completed' without passing through intermediate states. Each transition triggers side effects (charge card, send receipt, update driver rating), making the system auditable and bug-resistant.",
      },
      {
        q: "A rider's request must be matched to a driver within seconds. What matching strategy does Uber use?",
        options: [
          "Assign to the first driver who accepts a broadcast",
          "The supply/demand engine ranks nearby drivers by ETA to pickup and offers the trip to the best match; parallel offers with timeout fallback",
          "The rider selects their own driver from a list",
          "Random assignment among available drivers within 5 km",
        ],
        answer: 1,
        explanation: "Uber's dispatch system ranks available drivers by predicted ETA to pickup location using real-time traffic. The top candidate is offered the trip; if they decline or don't respond in a few seconds, the next candidate is offered, balancing optimality with response time.",
      },
    ],
  },

  "design-url-shortener": {
    questions: [
      {
        q: "What is the core data model of a URL shortener?",
        options: [
          "A graph of short-to-long URL mappings with edge weights",
          "A key-value mapping: short_code → {original_url, created_at, expiry, click_count}",
          "A relational table with foreign keys to user profiles",
          "A distributed hash table with consistent hashing",
        ],
        answer: 1,
        explanation: "The core is a simple lookup: short code → original URL. Everything else (analytics, expiry, custom slugs) is built on top of this mapping, making it an ideal key-value workload where reads vastly outnumber writes.",
      },
      {
        q: "How do you generate a short code that is globally unique without a central sequence generator?",
        options: [
          "Use a counter in a Redis INCR, only works on one node",
          "Assign ID ranges to worker nodes (Twitter Snowflake pattern) or use base62-encoded UUIDs with collision checking",
          "Take a SHA-256 hash of the URL and use the full 64 characters",
          "Ask the user to provide a unique code",
        ],
        answer: 1,
        explanation: "Snowflake-style ID generation assigns non-overlapping ID ranges to nodes (e.g., node 1 gets 1–1M, node 2 gets 1M–2M). Alternatively, generate a random 7-char base62 string and retry on collision. Both avoid a central bottleneck.",
      },
      {
        q: "A URL shortener handles billions of redirects/day. What is the most important infrastructure component for redirect performance?",
        options: [
          "A powerful relational DB with many indexes",
          "An in-memory cache (Redis) in front of the DB, the mapping rarely changes and fits in RAM for popular short codes",
          "A CDN serving the redirect HTML",
          "Async queue for processing click events",
        ],
        answer: 1,
        explanation: "Redirect is the hot path: every click is a lookup. With a cache hit ratio of 99%+ for popular URLs, the DB barely sees traffic. A Redis cache with a simple GET turns a multi-millisecond DB lookup into a sub-millisecond memory read.",
      },
      {
        q: "Which HTTP redirect status code should a URL shortener use for permanent redirects, and why does it matter for SEO?",
        options: [
          "302 Found, always use temporary redirects",
          "301 Moved Permanently, browsers cache it, reducing future server load; search engines transfer PageRank to the destination",
          "307 Temporary Redirect, preserves HTTP method",
          "200 OK with a meta refresh tag",
        ],
        answer: 1,
        explanation: "301 is permanent: browsers cache it so repeat visitors skip the shortener entirely. Search engines pass 'link juice' (PageRank) through 301 redirects to the destination URL. 302 would treat every redirect as temporary, losing both caching and SEO benefits.",
      },
      {
        q: "How would you implement URL expiry (short links that stop working after 30 days)?",
        options: [
          "A cron job that scans and deletes all expired rows every midnight",
          "Store expiry_at timestamp; check on redirect (return 410 Gone if expired); a background job periodically purges old rows and evicts cache entries",
          "Use a Redis key with TTL set to 30 days, the mapping automatically disappears",
          "Ask users to manually delete their expired links",
        ],
        answer: 1,
        explanation: "Checking expiry on redirect is fast and correct. A background janitor job purges DB rows and cache entries for expired links, freeing storage. Redis TTL alone would work for cache eviction but the DB row (analytics, audit) also needs managed expiry.",
      },
    ],
  },

  "design-web-crawler": {
    questions: [
      {
        q: "What is a 'URL frontier' in a web crawler and what data structure is it typically implemented with?",
        options: [
          "A list of already-crawled URLs stored in a DB",
          "A priority queue of URLs to be crawled, ordered by priority and grouped by domain to enforce politeness",
          "A Bloom filter of visited pages",
          "The sitemap.xml file of the target website",
        ],
        answer: 1,
        explanation: "The URL frontier is the to-crawl queue. A priority queue assigns crawl priority (PageRank estimate, freshness). Grouping by domain enforces politeness, the crawler waits N seconds between requests to the same domain to avoid overloading servers.",
      },
      {
        q: "How does a crawler detect duplicate content across billions of pages?",
        options: [
          "MD5 hash of the full page HTML stored in a set",
          "SimHash (locality-sensitive hash), near-duplicate pages produce similar hashes, enabling deduplication with Hamming distance comparison",
          "Comparing page titles only",
          "A Bloom filter of exact URL matches",
        ],
        answer: 1,
        explanation: "Exact hashing misses near-duplicates (same content, different headers/timestamps). SimHash produces a fingerprint where similar documents have similar hashes. Documents with Hamming distance < threshold are considered duplicates, effective for boilerplate and scraped content.",
      },
      {
        q: "What does 'robots.txt' specify and what must a well-behaved crawler do with it?",
        options: [
          "A list of links the crawler should prioritise",
          "Crawl rules per user-agent specifying disallowed paths and crawl-delay; the crawler must respect these before fetching any page on the domain",
          "Authentication credentials for private pages",
          "The sitemap location only",
        ],
        answer: 1,
        explanation: "robots.txt is a contract between websites and crawlers. A compliant crawler fetches and caches robots.txt for each domain, respects Disallow directives, and honours Crawl-delay. Ignoring it is considered hostile and may result in IP bans.",
      },
      {
        q: "Why is DNS resolution a hidden performance bottleneck in web crawlers?",
        options: [
          "DNS queries are encrypted and slow",
          "Each new domain requires a DNS lookup; without caching, millions of unique domains create millions of DNS queries, saturating resolvers",
          "DNS only resolves IPv4, not IPv6",
          "DNS TTLs cause crawlers to revisit pages too frequently",
        ],
        answer: 1,
        explanation: "A crawler hitting millions of unique domains makes millions of DNS queries. Public resolvers throttle high-volume clients. The solution: maintain an in-process DNS cache, use async resolution libraries, and run dedicated internal resolvers to handle the query volume.",
      },
      {
        q: "What is a 'spider trap' and how can a crawler detect and escape it?",
        options: [
          "A website that blocks crawler IP addresses",
          "Infinite URL spaces (e.g., calendars generating URLs for every day into the future) that can crawl indefinitely; detected by URL depth limits and canonicalisation",
          "A honeypot page designed to identify scrapers",
          "A CAPTCHA system that halts crawling",
        ],
        answer: 1,
        explanation: "Spider traps generate endless unique URLs (session IDs, date parameters). A crawler can set a max depth per domain, canonicalise URLs (strip session params), and detect when a domain is generating more URLs than it has real content, then throttle or blacklist it.",
      },
    ],
  },

  "design-whatsapp-chat": {
    questions: [
      {
        q: "What transport mechanism does WhatsApp use to maintain persistent connections for real-time messaging?",
        options: [
          "HTTP polling every 5 seconds",
          "Long-lived TCP/WebSocket connections with a custom XMPP-derived protocol",
          "SMS fallback for all messages",
          "UDP with manual reliability layer",
        ],
        answer: 1,
        explanation: "WhatsApp maintains long-lived TCP connections (originally XMPP, now a custom protocol) per client. The server pushes messages over this open connection, sub-second delivery. Clients reconnect automatically with exponential back-off when connections drop.",
      },
      {
        q: "How does WhatsApp ensure message ordering within a 1:1 chat?",
        options: [
          "Messages are ordered by server receipt timestamp only",
          "Each message has a sender-assigned sequence number; the client buffers and re-orders on gaps before displaying",
          "WhatsApp uses a global logical clock across all chats",
          "Message ordering is not guaranteed, it is best-effort",
        ],
        answer: 1,
        explanation: "A per-chat sequence counter ensures local ordering. If message 5 arrives before message 4 (reordering), the client buffers 5 and waits for 4 before displaying both in order. This gives the user a correct conversation view despite network reordering.",
      },
      {
        q: "A user sends a message while the recipient is offline. How is it delivered when they come back online?",
        options: [
          "The message is discarded after 24 hours",
          "The message is stored on the server; when the recipient reconnects, the server pushes all queued messages and the client acknowledges receipt",
          "The sender must manually resend when the recipient is back online",
          "The message is delivered via SMS fallback",
        ],
        answer: 1,
        explanation: "Offline messages are stored in a message store (HBase/Cassandra at WhatsApp's scale). On reconnect, the server delivers queued messages. After the client ACKs delivery, messages are deleted from the server store, minimising storage for delivered messages.",
      },
      {
        q: "How does WhatsApp implement end-to-end encryption (E2EE)?",
        options: [
          "Messages are encrypted by the server before storage",
          "The Signal Protocol: each device pair shares a unique session key; only sender and recipient devices can decrypt, the server sees only ciphertext",
          "TLS between client and server is considered E2EE",
          "Messages are encrypted with the user's password",
        ],
        answer: 1,
        explanation: "WhatsApp uses the Signal Protocol (Double Ratchet + X3DH key exchange). Keys are generated and stored only on devices. The server routes encrypted blobs it cannot read. Even WhatsApp employees cannot decrypt user messages.",
      },
      {
        q: "WhatsApp group messages are sent to N members. How is fan-out handled differently from 1:1 messages?",
        options: [
          "The sender's device sends N separate encrypted messages to the server",
          "The server stores one copy and fans out delivery to N recipient queues; for large groups, a pub/sub mechanism distributes to connected members",
          "Group messages use SMS multicast at the carrier level",
          "Group messages are always delivered via a CDN",
        ],
        answer: 1,
        explanation: "For groups, the server fans out one message to N member queues. For large groups (256+ members), a pub/sub layer distributes to connected clients instantly. Offline members receive queued messages on reconnect, a standard store-and-forward pattern.",
      },
    ],
  },

  "design-youtube": {
    questions: [
      {
        q: "Why are large video uploads split into chunks rather than uploaded as a single request?",
        options: [
          "HTTP has a 4 MB payload limit",
          "Chunked uploads allow resumability, if a connection drops, only the failed chunk is retried instead of the entire file",
          "Chunks enable parallel transcoding to start before upload completes",
          "Both B and C are correct",
        ],
        answer: 3,
        explanation: "Chunking enables two key benefits: (1) Resumability, dropped connections don't require re-uploading the full file; only the failed chunk is retried. (2) Pipelining, transcoding can start on early chunks while later chunks are still uploading, reducing time-to-playback.",
      },
      {
        q: "What happens to a video file immediately after it is uploaded to YouTube?",
        options: [
          "It is immediately available for playback in original format",
          "An async transcoding pipeline encodes it into multiple resolutions (360p, 720p, 1080p, 4K) and formats (H.264, VP9, AV1)",
          "It is manually reviewed by the content team before transcoding",
          "It is replicated to all CDN edge nodes globally",
        ],
        answer: 1,
        explanation: "Uploaded video goes through an async transcoding pipeline. Multiple resolution and codec variants are produced (H.264 for compatibility, VP9/AV1 for efficiency). Each variant is then distributed to CDN edges, enabling ABR playback for diverse viewers.",
      },
      {
        q: "How does YouTube ensure a popular video (going viral) can handle millions of concurrent viewers?",
        options: [
          "By pre-loading the video on every viewer's device",
          "By distributing video segments across a global CDN with hundreds of PoPs, viewers stream from the nearest edge node",
          "By running thousands of dedicated origin servers per viral video",
          "By compressing the video more aggressively as view count rises",
        ],
        answer: 1,
        explanation: "YouTube's CDN (partly Google's own infrastructure) caches popular video segments at edge PoPs globally. A viral video's segments are served from local edges, the origin (YouTube's storage) sees only cache-miss traffic, not the full viral load.",
      },
      {
        q: "What metadata does YouTube store separately from the video content, and what database type serves it?",
        options: [
          "Video thumbnails in object storage; no separate metadata",
          "Video metadata (title, description, tags, view count, like count, channel ID) in a relational or distributed SQL DB; content in object storage",
          "All metadata and content are stored together in a document DB",
          "Metadata is embedded in the video file headers",
        ],
        answer: 1,
        explanation: "YouTube separates metadata (structured, frequently queried) from content (large, infrequently changed). Metadata lives in Spanner/Bigtable variants; content (video bytes, thumbnails) in Google's object storage (Colossus/GCS). This split optimises query and storage cost independently.",
      },
      {
        q: "How are YouTube's video recommendations generated?",
        options: [
          "Based solely on the video's tag keywords",
          "A two-stage ML pipeline: candidate generation (recall) retrieves hundreds of candidates, then a ranking model scores and re-orders them by predicted engagement",
          "Chronological list of videos from subscribed channels only",
          "Human curators select recommendations for each user",
        ],
        answer: 1,
        explanation: "YouTube's recommendation system uses a two-tower neural network for candidate generation (fast, broad recall from millions of videos to hundreds) followed by a ranking model (slower, uses rich features) to select the final 10–20 recommendations, balancing coverage with precision.",
      },
    ],
  },
};

export default quizzes;
