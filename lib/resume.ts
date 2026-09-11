/**
 * Single source of truth for every piece of résumé content on the site.
 * The UI treats each role as a "span" in a distributed trace, so anything
 * time-related lives here as `YYYY-MM` and is turned into geometry by lib/trace.ts.
 */

export const profile = {
  name: "Luqman Haqeem",
  handle: "luqman-haqeem",
  role: "Backend-focused Full-Stack Developer",
  service: "luqman.service",
  region: "Malaysia",
  timezone: "Asia/Kuala_Lumpur",
  tzLabel: "UTC+8",
  email: "redacted@example.invalid",
  phone: "REDACTED",
  phoneHref: "REDACTED",
  github: "https://github.com/luqman-haqeem",
  githubLabel: "github.com/luqman-haqeem",
  linkedin: "https://linkedin.com/in/luqman-haqeem-7713991b8",
  linkedinLabel: "linkedin.com/in/luqman-haqeem",
  /** Career start — the root span's t0. */
  careerStart: "2020-12",
  status: "Open to backend / platform roles",
  summary:
    "Backend-focused full-stack developer with ~5 years building and scaling end-to-end products. Two years of TypeScript/Node.js (Jun 2024 to now) after three years of PHP (Apr 2021 to May 2024), now going deep on LLM-powered systems and AWS cloud architecture.",
  tagline: [
    "I build the parts you don't see:",
    "queues, workers, pipelines and APIs",
    "that keep working when traffic spikes.",
  ],
  runtimes: ["TypeScript / Node.js", "Python / FastAPI", "AWS"],
} as const;

export type AchievementKind = "arch" | "impact" | "build" | "lead" | "ops";

export const achievementMeta: Record<
  AchievementKind,
  { label: string; className: string; dot: string }
> = {
  arch: { label: "ARCH", className: "text-violet border-violet/25 bg-violet/8", dot: "bg-violet" },
  impact: { label: "IMPACT", className: "text-accent border-accent/25 bg-accent/8", dot: "bg-accent" },
  build: { label: "BUILD", className: "text-info border-info/25 bg-info/8", dot: "bg-info" },
  lead: { label: "LEAD", className: "text-teal border-teal/25 bg-teal/8", dot: "bg-teal" },
  ops: { label: "OPS", className: "text-lime border-lime/25 bg-lime/8", dot: "bg-lime" },
};

export type Achievement = {
  kind: AchievementKind;
  text: string;
  /** Short pull-quote metric rendered beside the log line. */
  metric?: string;
};

export type Role = {
  id: string;
  company: string;
  /** Trace-flavoured service name for the span row. */
  service: string;
  title: string;
  location: string;
  start: string;
  /** `null` means the span is still open. */
  end: string | null;
  employment?: string;
  summary: string;
  achievements: Achievement[];
  stack: string[];
  color: string;
};

export const roles: Role[] = [
  {
    id: "apmt",
    company: "APMT (Am Pro Movers Transportation)",
    service: "apmt/fleet-tracking",
    title: "Web Developer Intern",
    location: "Malaysia",
    start: "2020-12",
    end: "2021-02",
    employment: "Internship",
    summary: "Logistics tracking, reservations and content tooling for a movers company.",
    achievements: [
      {
        kind: "build",
        text: "Built a real-time lorry location tracking system in PHP and Laravel, improving logistics transparency for dispatchers.",
      },
      {
        kind: "build",
        text: "Designed and built an online reservation management feature for customer bookings.",
      },
      {
        kind: "build",
        text: "Developed a blog post management system for content publishing.",
      },
    ],
    stack: ["PHP", "Laravel", "MySQL"],
    color: "var(--color-slate)",
  },
  {
    id: "cloone-php",
    company: "Cloone Corporation",
    service: "cloone/legacy-modernisation",
    title: "PHP Developer",
    location: "Malaysia",
    start: "2021-04",
    end: "2022-12",
    summary:
      "Web-based admin and business modules, legacy migrations and client-facing retail features.",
    achievements: [
      {
        kind: "impact",
        text: "Migrated legacy PHP 5 systems to CodeIgniter, improving performance by ~20%.",
        metric: "+20% perf",
      },
      {
        kind: "build",
        text: "Built RESTful APIs for an HR eLetter module serving ~20,000 employees, streamlining request and approval workflows.",
        metric: "20k employees",
      },
      {
        kind: "build",
        text: "Developed a voucher management module integrated with Qube POS, mobile apps and web platforms.",
      },
      {
        kind: "build",
        text: "Built a quiz module with OneSignal push notifications for a training platform used by ~100 trainers — shipped in ~2 weeks.",
        metric: "shipped in 2 weeks",
      },
      {
        kind: "build",
        text: "Built a fresh-item markdown, disposal and reorder system rolled out across 12 retail stores.",
        metric: "12 stores",
      },
    ],
    stack: ["PHP", "CodeIgniter 4", "MySQL", "REST APIs", "OneSignal"],
    color: "var(--color-teal)",
  },
  {
    id: "cloone-senior",
    company: "Cloone Corporation",
    service: "cloone/wms-platform",
    title: "Senior Software Engineer",
    location: "Malaysia",
    start: "2023-01",
    end: "2024-05",
    summary:
      "Led a team of 3 engineers, owned system architecture and delivered multiple client-facing systems.",
    achievements: [
      {
        kind: "lead",
        text: "Led 3 engineers to design and deliver a warehouse management system covering 6 core modules: receiving, put away, relocation, picking, audit and status inquiry.",
        metric: "6 modules",
      },
      {
        kind: "impact",
        text: "Sped up item receiving by 20% and onboarding by 30% through the WMS; integrated SBClient POS for purchase-order workflows.",
        metric: "+20% / +30%",
      },
      {
        kind: "lead",
        text: "Led the web team building APIs and the web portal for a client super app, coordinating across 3 cross-functional teams including one based in India.",
        metric: "3 teams",
      },
      {
        kind: "lead",
        text: "Mentored junior developers on system architecture, code quality and implementation best practices.",
      },
    ],
    stack: ["PHP", "REST APIs", "MySQL", "System design", "Team leadership"],
    color: "var(--color-violet)",
  },
  {
    id: "devwiz",
    company: "DevWiz",
    service: "devwiz/booking-calendar",
    title: "Part-time Software Developer",
    location: "Malaysia",
    start: "2023-09",
    end: "2023-10",
    employment: "Part-time · concurrent",
    summary: "Short engagement on booking calendar performance and checkout UX.",
    achievements: [
      {
        kind: "impact",
        text: "Optimised SQL queries behind a booking calendar system, cutting data-retrieval time by 50%.",
        metric: "-50% query time",
      },
      {
        kind: "build",
        text: "Enhanced checkout with a View Receipt feature for instant receipt access after payment.",
      },
    ],
    stack: ["SQL", "Query optimisation", "PHP"],
    color: "var(--color-rose)",
  },
  {
    id: "cheil",
    company: "Cheil Malaysia",
    service: "cheil/streaming-api",
    title: "Backend Developer",
    location: "Malaysia",
    start: "2024-06",
    end: "2025-04",
    summary:
      "Backend and full-stack work on an in-house music streaming platform and high-traffic Samsung campaigns.",
    achievements: [
      {
        kind: "build",
        text: "Designed and built scalable RESTful APIs with Express.js for the in-house music streaming platform.",
      },
      {
        kind: "ops",
        text: "Cached chart data in Redis and served S3-hosted images via CloudFront, improving response times and image load speed.",
      },
      {
        kind: "ops",
        text: "Instrumented production services with New Relic for observability and monitoring.",
      },
      {
        kind: "ops",
        text: "Deployed and maintained applications on AWS EC2, and built serverless APIs with Lambda and API Gateway.",
      },
      {
        kind: "impact",
        text: "Shipped full-stack Next.js apps for high-traffic Samsung marketing campaigns, including a lucky draw handling ~10,000 daily visitors.",
        metric: "10k daily visitors",
      },
      {
        kind: "ops",
        text: "Built CI/CD pipelines with GitHub Actions for automated testing and deployment of backend services.",
      },
    ],
    stack: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "Next.js",
      "Redis",
      "AWS EC2",
      "AWS Lambda",
      "CloudFront",
      "New Relic",
      "GitHub Actions",
    ],
    color: "var(--color-info)",
  },
  {
    id: "inmagine",
    company: "Inmagine",
    service: "inmagine/ai-review-pipelines",
    title: "Web Application Developer",
    location: "Malaysia",
    start: "2025-04",
    end: null,
    summary:
      "AI-powered review pipelines and a marketing automation platform for 123RF.",
    achievements: [
      {
        kind: "build",
        text: "Built 3 LLM-powered review pipelines for 123RF with Python, FastAPI and AWS Bedrock — covering submission review, contributor registration review and release workflow review.",
        metric: "3 pipelines",
      },
      {
        kind: "arch",
        text: "Architected a distributed, event-driven system on AWS SQS with auto-scaling ECS workers, cutting the review backlog from over a week to under 24 hours.",
        metric: "7d -> <24h",
      },
      {
        kind: "impact",
        text: "Achieved ~30% more daily processing and ~3× cost reduction through model migration, prompt optimisation and batching.",
        metric: "~3× cheaper",
      },
      {
        kind: "build",
        text: "Built an AI platform in TypeScript, Node.js and Next.js for marketing planning, asset generation and automated publishing across 6 social media platforms.",
        metric: "6 platforms",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "AWS Bedrock",
      "AWS SQS",
      "AWS ECS",
      "TypeScript",
      "Node.js",
      "Next.js",
      "Docker",
    ],
    color: "var(--color-accent)",
  },
];

/** Headline numbers, each traceable back to a real span. */
export const metrics: {
  value: string;
  unit?: string;
  label: string;
  source: string;
  roleId: string;
}[] = [
  {
    value: "7d",
    unit: " -> <24h",
    label: "Review backlog cut",
    source: "Event-driven SQS + ECS pipeline",
    roleId: "inmagine",
  },
  {
    value: "3",
    unit: "×",
    label: "Inference cost reduction",
    source: "Model migration + prompt tuning",
    roleId: "inmagine",
  },
  {
    value: "10",
    unit: "k/day",
    label: "Peak campaign visitors",
    source: "Samsung lucky draw campaign",
    roleId: "cheil",
  },
  {
    value: "20",
    unit: "k",
    label: "Employees served by HR APIs",
    source: "HR eLetter module",
    roleId: "cloone-php",
  },
  {
    value: "50",
    unit: "%",
    label: "Faster data retrieval",
    source: "Booking calendar SQL tuning",
    roleId: "devwiz",
  },
  {
    value: "3",
    unit: " eng",
    label: "Team led as senior",
    source: "Warehouse management system",
    roleId: "cloone-senior",
  },
];

export type SkillNode = {
  name: string;
  /** IDs of roles/projects where this was actually used. */
  usedIn: string[];
  note?: string;
};

export type SkillLayer = {
  id: string;
  label: string;
  hint: string;
  accent: string;
  nodes: SkillNode[];
};

export const skillLayers: SkillLayer[] = [
  {
    id: "edge",
    label: "Edge & delivery",
    hint: "What the client hits first",
    accent: "var(--color-info)",
    nodes: [
      { name: "CloudFront", usedIn: ["cheil"] },
      { name: "Cloudflare", usedIn: ["simpanresit"] },
      { name: "API Gateway", usedIn: ["cheil"] },
      { name: "Netlify", usedIn: ["riverlevel", "simpanresit"] },
    ],
  },
  {
    id: "frontend",
    label: "Interface",
    hint: "Full-stack surface area",
    accent: "var(--color-teal)",
    nodes: [
      { name: "Next.js", usedIn: ["inmagine", "cheil", "riverlevel", "simpanresit"] },
      { name: "React", usedIn: ["inmagine", "cheil", "riverlevel", "simpanresit"] },
      { name: "TypeScript", usedIn: ["inmagine", "cheil", "riverlevel", "simpanresit"] },
      { name: "Tailwind CSS", usedIn: ["riverlevel", "simpanresit"] },
      { name: "Shadcn/ui", usedIn: ["riverlevel", "simpanresit"] },
      { name: "Nuxt.js", usedIn: [], note: "Vue-side equivalent of the Next.js work" },
      { name: "Bootstrap", usedIn: [], note: "Earlier PHP-era UI work" },
    ],
  },
  {
    id: "services",
    label: "Application services",
    hint: "Where most of my time goes",
    accent: "var(--color-accent)",
    nodes: [
      { name: "Node.js", usedIn: ["inmagine", "cheil"] },
      { name: "Express.js", usedIn: ["cheil"] },
      { name: "Python", usedIn: ["inmagine"] },
      { name: "FastAPI", usedIn: ["inmagine"] },
      { name: "Hono", usedIn: [], note: "Lightweight edge-runtime API framework" },
      { name: "PHP", usedIn: ["cloone-senior", "cloone-php", "devwiz", "apmt"] },
      { name: "Laravel", usedIn: ["apmt"] },
      { name: "CodeIgniter 4", usedIn: ["cloone-php"] },
      { name: "REST API design", usedIn: ["inmagine", "cheil", "cloone-senior", "cloone-php"] },
    ],
  },
  {
    id: "async",
    label: "Async & compute",
    hint: "Queues, workers, containers",
    accent: "var(--color-violet)",
    nodes: [
      { name: "AWS SQS", usedIn: ["inmagine"] },
      { name: "AWS ECS", usedIn: ["inmagine"] },
      { name: "AWS Lambda", usedIn: ["cheil"] },
      { name: "AWS EC2", usedIn: ["cheil"] },
      { name: "Docker", usedIn: ["inmagine"] },
      { name: "AWS SES", usedIn: [], note: "Transactional email delivery" },
    ],
  },
  {
    id: "ai",
    label: "AI & LLM",
    hint: "Newest layer of the stack",
    accent: "var(--color-rose)",
    nodes: [
      { name: "AWS Bedrock", usedIn: ["inmagine"] },
      { name: "OpenRouter", usedIn: ["simpanresit"] },
      { name: "LLM integration", usedIn: ["inmagine", "simpanresit"] },
      { name: "Prompt optimisation", usedIn: ["inmagine"] },
    ],
  },
  {
    id: "data",
    label: "Data & storage",
    hint: "State, cache and objects",
    accent: "var(--color-lime)",
    nodes: [
      { name: "MySQL", usedIn: ["cloone-senior", "cloone-php", "apmt"] },
      { name: "PostgreSQL", usedIn: ["simpanresit"] },
      { name: "Redis", usedIn: ["cheil"] },
      { name: "AWS S3", usedIn: ["cheil"] },
      { name: "AWS RDS", usedIn: [], note: "Managed relational hosting" },
      { name: "Supabase", usedIn: ["simpanresit"] },
      { name: "Convex", usedIn: ["riverlevel"] },
    ],
  },
  {
    id: "observability",
    label: "Observability & CI",
    hint: "Knowing it works, keeping it shipping",
    accent: "var(--color-ok)",
    nodes: [
      { name: "New Relic", usedIn: ["cheil"] },
      { name: "GitHub Actions", usedIn: ["cheil"] },
      { name: "CI/CD", usedIn: ["inmagine", "cheil"] },
      { name: "pytest", usedIn: ["inmagine"] },
    ],
  },
];

export type Project = {
  id: string;
  name: string;
  slug: string;
  url: string;
  /** GitHub repo name, when the source is public. */
  repo?: string;
  status: "live" | "wip";
  tagline: string;
  detail: string;
  highlights: string[];
  stack: string[];
  accent: string;
};

export const projects: Project[] = [
  {
    id: "simpanresit",
    name: "Simpan Resit",
    slug: "simpanresit.com",
    url: "https://simpanresit.com/",
    status: "live",
    tagline: "AI receipt scanning for Malaysian income tax claims",
    detail:
      "A web app for storing tax receipts and supporting personal income tax claims, with AI-powered receipt scanning that reads a photo and suggests the right relief category.",
    highlights: [
      "LLM receipt scanning + tax relief category suggestions via OpenRouter",
      "Supabase Edge Functions with row-level security for per-user data isolation",
      "Netlify hosting fronted by Cloudflare DNS",
    ],
    stack: ["Next.js", "Supabase", "OpenRouter", "Shadcn/ui", "Netlify", "Cloudflare"],
    accent: "var(--color-accent)",
  },
  {
    id: "riverlevel",
    name: "River Level Monitoring",
    slug: "riverlevel.netlify.app",
    url: "https://riverlevel.netlify.app/stations",
    repo: "water-level",
    status: "live",
    tagline: "Live water levels for Selangor rivers, refreshed every 15 minutes",
    detail:
      "A real-time dashboard showing live water levels across Selangor river stations, so people near flood-prone areas can see conditions at a glance.",
    highlights: [
      "Ingests external JPS Selangor station data on a 15-minute cycle",
      "Dynamic station UI with live camera feeds and danger-level push alerts",
      "Reactive data layer on Convex, PWA with offline support",
    ],
    // Migrated off Next.js to Vite + TanStack Router in Aug 2026.
    stack: [
      "Vite",
      "TanStack Router",
      "Convex",
      "Tailwind CSS",
      "Shadcn/ui",
      "Vitest",
      "Netlify",
    ],
    accent: "var(--color-info)",
  },
];

export const education = {
  school: "Selangor Islamic University",
  qualification: "Diploma in Computer Science",
  period: "2018 – 2020",
};

export const certifications = [
  {
    name: "Professional Scrum Master I (PSM I)",
    issuer: "Scrum.org",
    year: "2024",
  },
];

export const practices = [
  "Git",
  "Jira",
  "ClickUp",
  "Agile",
  "Scrum",
  "GitHub Copilot",
  "Claude Code",
];

/** Human-readable label for anything referenced by `usedIn`. */
export const entityLabels: Record<string, string> = {
  ...Object.fromEntries(roles.map((r) => [r.id, `${r.company} · ${r.title}`])),
  ...Object.fromEntries(projects.map((p) => [p.id, `${p.name} · side project`])),
};

export const navItems = [
  { id: "now", label: "Now" },
  { id: "trace", label: "Career" },
  { id: "stack", label: "Stack" },
  { id: "builds", label: "Builds" },
  { id: "beyond", label: "Beyond code" },
  { id: "about", label: "How I work" },
  { id: "contact", label: "Contact" },
];


/* ==========================================================================
 * Everything below is the part a résumé can't tell you: what I'm writing this
 * month, what I actually reach for, what I keep rebuilding, and what I read.
 * Facts (dates, commits, repos) come live from the GitHub API — see lib/github.ts.
 * ======================================================================== */

export type ComfortLevel = "daily" | "fluent" | "working" | "learning";

export const comfortMeta: Record<
  ComfortLevel,
  { label: string; className: string; bar: string; weight: number }
> = {
  daily: {
    label: "reach for by default",
    className: "text-accent border-accent/30 bg-accent/8",
    bar: "var(--color-accent)",
    weight: 100,
  },
  fluent: {
    label: "fluent, not my first pick now",
    className: "text-teal border-teal/25 bg-teal/8",
    bar: "var(--color-teal)",
    weight: 72,
  },
  working: {
    label: "productive, supporting cast",
    className: "text-info border-info/25 bg-info/8",
    bar: "var(--color-info)",
    weight: 55,
  },
  learning: {
    label: "actively learning",
    className: "text-violet border-violet/25 bg-violet/8",
    bar: "var(--color-violet)",
    weight: 34,
  },
};

export type LanguageComfort = {
  name: string;
  level: ComfortLevel;
  period: string;
  note: string;
  /** Repo names on GitHub that back this up. */
  evidence: string[];
};

export const languageComfort: LanguageComfort[] = [
  {
    name: "TypeScript / Node.js",
    level: "daily",
    period: "2024 — now",
    note: "What I start new things in. The river dashboard is 94% TypeScript across 284 commits, and I'd rather spend the extra minute on types than debug a shape mismatch at 2am.",
    evidence: ["water-level"],
  },
  {
    name: "Python",
    level: "daily",
    period: "2025 — now",
    note: "Where all my AI work lives — FastAPI review pipelines at Inmagine, and a Telegram bot at home that I've written 80+ commits of tests for.",
    evidence: ["career-agent"],
  },
  {
    name: "SQL",
    level: "daily",
    period: "2021 — now",
    note: "MySQL and Postgres. The 50% speedup on that booking calendar was an index and a rewritten join, not a new framework.",
    evidence: ["voting-system", "laravel-evoting"],
  },
  {
    name: "PHP / Laravel / CodeIgniter",
    level: "fluent",
    period: "2021 — 2024",
    note: "Three years and a few hundred commits. I could be productive in it tomorrow, I just don't reach for it when starting something new. Nothing against it — my stack moved.",
    evidence: ["laravel-evoting", "voting-system", "WaterLevel"],
  },
  {
    name: "Docker / Bash",
    level: "working",
    period: "2023 — now",
    note: "The Telegram bot ships as a container with a compose file, and the review pipelines at work run as ECS tasks. \"Works on my machine\" is not a deployment strategy.",
    evidence: ["career-agent"],
  },
  {
    name: "Go",
    level: "learning",
    period: "2026",
    note: "Reading more of it than writing it so far — mostly because the self-hosted tools I like keep turning out to be single Go binaries.",
    evidence: [],
  },
];

/**
 * Curated commentary keyed by GitHub repo name. Repos without an entry still
 * render from their API description, so a new repo shows up on its own.
 */
export type BuildNote = {
  title: string;
  blurb: string;
  highlights?: string[];
  accent: string;
  liveUrl?: string;
  liveLabel?: string;
  /** Shown as a small honesty note where it matters. */
  caveat?: string;
};

export const buildNotes: Record<string, BuildNote> = {
  "water-level": {
    title: "River Level Monitoring",
    blurb:
      "Live water levels for every JPS station in Selangor, with camera feeds, danger-level push alerts and offline support. I built it because I live in Selangor and \"is the river rising?\" is a question with a real answer that nobody had made easy to check.",
    highlights: [
      "284 commits across three rewrites — Laravel, then Next.js, now Vite + TanStack Router on a reactive Convex backend",
      "PWA with offline caching, error boundaries, and OneSignal alerts when a station crosses its danger threshold",
      "Spent a week in September auditing my own code: closed 9 public write endpoints, fixed an SSRF in the image proxy and OG spoofing",
      "Vitest + Testing Library + MSW, with a CI step that dry-runs the Convex schema before merge",
    ],
    accent: "var(--color-info)",
    liveUrl: "https://riverlevel.netlify.app/stations",
    liveLabel: "riverlevel.netlify.app",
  },
  "career-agent": {
    title: "Career Agent",
    blurb:
      "A private Telegram bot that remembers my career, turns real experiences into structured CV points, rates how well a job actually fits, and writes tailored résumés — with a hard rule that it never invents experience I don't have.",
    highlights: [
      "Metrics carry provenance — verified, self-reported or estimate — so nothing silently inflates",
      "A corrections log means any fact I've fixed stays fixed, and gaps get flagged instead of faked",
      "Learns from my Apply / Skip decisions to rank future matches, but only ever learns preferences",
      "Pulls JobStreet listings through its search API rather than scraping, and runs two job threads at a time",
      "83 commits, 12+ test files, pytest, Docker, LaTeX résumé templates via Jinja2",
    ],
    caveat:
      "Auto-apply is deliberately left out. A bot spraying applications is not a feature, it's a way to waste other people's time.",
    accent: "var(--color-accent)",
  },
  "voting-system": {
    title: "KUIS E-Voting",
    blurb:
      "My diploma final-year project — an online voting system modelled on how my college actually ran its elections. 185 commits, and I kept coming back to fix bugs long after it was graded.",
    accent: "var(--color-lime)",
  },
  "laravel-evoting": {
    title: "E-Voting, take two",
    blurb:
      "The same voting problem, rebuilt in Laravel a year later once I'd learned what a framework buys you. First time I felt the difference between writing PHP and architecting it.",
    accent: "var(--color-teal)",
  },
  WaterLevel: {
    title: "River monitoring, v1",
    blurb:
      "The Laravel original. Archived, and honest about why in its own README: Render's free tier put the server to sleep after 15 minutes, which is useless for something people check during a flood.",
    accent: "var(--color-slate)",
  },
};

/** Repos I keep coming back to with better tools. */
export type Lineage = {
  problem: string;
  why: string;
  generations: {
    repo: string;
    label: string;
    period: string;
    stack: string;
    host?: string;
    note: string;
    current?: boolean;
  }[];
};

export const lineages: Lineage[] = [
  {
    problem: "Are the rivers in Selangor rising?",
    why: "Four years, three stacks, one question. Each rewrite happened because the last one hit a real wall, not because a new framework got popular.",
    generations: [
      {
        repo: "WaterLevel",
        label: "v1",
        period: "Dec 2022",
        stack: "Laravel · jQuery · MySQL",
        host: "Render free tier",
        note: "Worked, until the free tier slept after 15 minutes of inactivity — the exact moment you need it is the moment nobody has visited it.",
      },
      {
        repo: "water-level",
        label: "v2",
        period: "Aug 2024",
        stack: "Next.js · React",
        host: "Vercel",
        note: "Faster and always awake. But polling for data I wanted to be live meant fighting the framework.",
      },
      {
        repo: "water-level",
        label: "v3",
        period: "Aug 2026",
        stack: "Vite · TanStack Router · Convex",
        host: "Netlify",
        note: "Reactive backend, so station updates push instead of poll. Added PWA offline support, danger-level alerts, and a real test suite.",
        current: true,
      },
    ],
  },
  {
    problem: "Can a college run its elections online?",
    why: "My final-year project, then the same thing again once I understood frameworks. The second attempt taught me more than the first.",
    generations: [
      {
        repo: "voting-system",
        label: "v1",
        period: "Aug 2020",
        stack: "Vanilla PHP · MySQL",
        note: "Built for how KUIS actually voted. 185 commits, and I was still fixing bugs in it two years after submitting it.",
      },
      {
        repo: "laravel-evoting",
        label: "v2",
        period: "Feb 2022",
        stack: "Laravel · Blade",
        note: "Same domain, rebuilt properly. This is where the difference between writing code and structuring it finally landed.",
        current: true,
      },
    ],
  },
];

/** What my starred repos say about where my attention goes. */
export type StarTheme = {
  label: string;
  note: string;
  accent: string;
  repos: string[];
};

export const starThemes: StarTheme[] = [
  {
    label: "AI agents and the tooling around them",
    note: "Where most of my curiosity goes right now. Not the chatbot layer — the harness: memory, loops, evaluation, letting an agent do real work without lying about it.",
    accent: "var(--color-accent)",
    repos: [
      "career-ops-hq/career-ops",
      "bmad-code-org/BMAD-METHOD",
      "snarktank/ralph",
      "affaan-m/ECC",
      "Agenta-AI/agenta",
      "tirth8205/code-review-graph",
      "Kiyoraka/Project-AI-MemoryCore",
      "midday-ai/packrun",
      "cursor/community-plugins",
    ],
  },
  {
    label: "System design, done deliberately",
    note: "I came up through PHP shops where architecture was something you inherited. These are me filling that in on purpose.",
    accent: "var(--color-violet)",
    repos: [
      "karanpratapsingh/system-design",
      "ashishps1/awesome-system-design-resources",
      "AdminTurnedDevOps/DevOps-The-Hard-Way-AWS",
    ],
  },
  {
    label: "Malaysian dev community",
    note: "Local problems need local tooling — IC validation, a Git handbook in Bahasa Malaysia, production projects from Malaysian devs. I build for where I live.",
    accent: "var(--color-teal)",
    repos: [
      "wmthor/mykad",
      "kidino/buku-git",
      "sdil/open-production-web-projects",
    ],
  },
  {
    label: "Infrastructure you can host yourself",
    note: "A soft spot for tools that are one binary or one container and don't need a vendor. Probably a side effect of shipping side projects on free tiers.",
    accent: "var(--color-ok)",
    repos: [
      "pocketbase/pocketbase",
      "useplunk/plunk",
      "reactive-resume/app",
      "robinebers/openusage",
      "supermemoryai/cloudflare-saas-stack",
    ],
  },
  {
    label: "Cameras and media in the browser",
    note: "Direct research for the river dashboard's camera feeds — getting a live stream out of a mobile browser is fussier than it sounds.",
    accent: "var(--color-info)",
    repos: [
      "pixochi/native-camera-in-mobile-browsers",
      "sadn1ck/bg-removal-bodypix",
      "muxinc/media-elements",
    ],
  },
  {
    label: "The PHP years",
    note: "CodeIgniter queues, Laravel best practices, a MySQLi wrapper. I haven't opened these in a long time, and I'm leaving them here rather than curating my history.",
    accent: "var(--color-slate)",
    repos: [
      "codeigniter4/queue",
      "chriskacerguis/codeigniter-restserver",
      "alexeymezenin/laravel-best-practices",
      "LaravelDaily/laravel-tips",
      "ThingEngineer/PHP-MySQLi-Database-Class",
      "vlucas/valitron",
      "vicenteguerra/git-deploy",
    ],
  },
];

/** The non-work side. Grounded in things I've actually done or written. */
export type BeyondItem = {
  tag: string;
  title: string;
  body: string;
  accent: string;
};

export const beyondCode: BeyondItem[] = [
  {
    tag: "where I live",
    title: "I build for Selangor first",
    body: "The river dashboard exists because Selangor floods and I wanted my own answer to \"is it rising?\" without digging through a government portal on a phone. The most useful thing I've built has an audience of my neighbours.",
    accent: "var(--color-info)",
  },
  {
    tag: "long games",
    title: "I don't abandon projects, I re-do them",
    body: "My diploma final-year project has 185 commits, most of them after it was graded — my own README says I put it on GitHub \"so that I can keep maintain it and fix bug that i found\". Four years later I'm still rewriting the river app.",
    accent: "var(--color-teal)",
  },
  {
    tag: "in the open",
    title: "I build things nobody asked for",
    body: "The river dashboard and the résumé bot aren't work projects and weren't set by anyone. I learn by building the smallest real version of a thing, putting it in front of actual users, then writing down what I'd change before it goes near production.",
    accent: "var(--color-accent)",
  },
];


/** Hand-written, and meant to be rewritten whenever it stops being true. */
export const nowFocus = {
  updated: "September 2026",
  body: "Two things have my evenings right now. I spent September hardening the river dashboard — auditing my own code and closing nine public write endpoints I'd left open, plus an SSRF in the image proxy. The rest goes into career-agent, a Telegram bot that writes résumés from my real experience and is architecturally incapable of inventing any. At work it's LLM review pipelines on AWS Bedrock.",
  learning:
    "Reading a lot about agent harnesses — memory, evaluation, and how to let a model do real work without letting it lie.",
};
