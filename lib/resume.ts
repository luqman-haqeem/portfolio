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
  // Country-level only. No street, district, phone or email anywhere in this
  // repo — reachable via the public profiles below instead.
  region: "Malaysia",
  timezone: "Asia/Kuala_Lumpur",
  tzLabel: "UTC+8",
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

export type RoleProject = {
  /** Short identifier, rendered as a child span name in the trace. */
  slug: string;
  name: string;
  what: string;
  stack: string[];
  /** The number this shipped, when there is one worth pulling out. */
  outcome?: string;
  kind: AchievementKind;
};

export type Role = {
  id: string;
  company: string;
  /** Trace-flavoured service name for the parent span row. */
  service: string;
  title: string;
  location: string;
  start: string;
  /** `null` means the span is still open. */
  end: string | null;
  employment?: string;
  summary: string;
  /**
   * Facts about the job rather than the work — team size, who I led, how the
   * role was shaped. Kept separate from `projects` so the two don't blur into
   * one résumé bullet list.
   */
  context: string[];
  /** The actual systems built, as child spans. */
  projects: RoleProject[];
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
    summary:
      "Three months at a movers company, and the first time code I wrote was used by people whose job depended on it.",
    context: [
      "First professional codebase. No team — I shipped straight to the tools dispatchers used that day.",
    ],
    projects: [
      {
        slug: "lorry-tracking",
        name: "Real-time lorry tracking",
        what: "Live location for the fleet, so dispatchers could answer \"where is my delivery\" without phoning the driver.",
        stack: ["PHP", "Laravel", "MySQL"],
        outcome: "real-time",
        kind: "build",
      },
      {
        slug: "reservations",
        name: "Online reservation management",
        what: "Customer-facing booking flow with an admin side behind it for confirming and rescheduling.",
        stack: ["PHP", "Laravel"],
        kind: "build",
      },
      {
        slug: "blog-cms",
        name: "Blog publishing tool",
        what: "A small CMS so marketing could publish without a developer in the loop.",
        stack: ["PHP", "Laravel"],
        kind: "build",
      },
    ],
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
      "Nearly two years of internal business systems: migrating what existed, then building the modules the business kept asking for.",
    context: [
      "Individual contributor across five separate systems, each with its own stakeholders inside the business.",
    ],
    projects: [
      {
        slug: "php5-migration",
        name: "PHP 5 to CodeIgniter migration",
        what: "Moved legacy systems off PHP 5 onto CodeIgniter — the unglamorous work that made everything after it possible.",
        stack: ["PHP", "CodeIgniter 4", "MySQL"],
        outcome: "+20% perf",
        kind: "arch",
      },
      {
        slug: "hr-eletter",
        name: "HR eLetter APIs",
        what: "REST APIs behind an HR letter request and approval workflow, replacing a paper trail for the whole company.",
        stack: ["PHP", "REST APIs", "MySQL"],
        outcome: "20k employees",
        kind: "build",
      },
      {
        slug: "voucher-module",
        name: "Voucher management",
        what: "Issue and redeem vouchers consistently across three surfaces — Qube POS in-store, the mobile app, and web.",
        stack: ["PHP", "Qube POS", "REST APIs"],
        outcome: "3 channels",
        kind: "build",
      },
      {
        slug: "training-quiz",
        name: "Training platform quiz module",
        what: "Quizzes with push notifications for a trainer platform. Tight deadline, and it held.",
        stack: ["PHP", "OneSignal"],
        outcome: "shipped in 2 weeks",
        kind: "build",
      },
      {
        slug: "fresh-item-markdown",
        name: "Fresh-item markdown & reorder",
        what: "Markdown, disposal and reorder flows for perishable stock, rolled out across the retail estate.",
        stack: ["PHP", "MySQL"],
        outcome: "12 stores",
        kind: "impact",
      },
    ],
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
      "Promoted into owning architecture and a team. Two large client-facing systems, and the first time the design decisions were mine to defend.",
    context: [
      "Led a team of 3 engineers and owned the system architecture.",
      "Coordinated across 3 cross-functional teams, including one based in India.",
      "Mentored juniors on system design, code quality and implementation practice.",
    ],
    projects: [
      {
        slug: "wms",
        name: "Warehouse management system",
        what: "Six modules covering the full floor workflow — receiving, put away, relocation, picking, audit and status inquiry — integrated with SBClient POS for purchase orders.",
        stack: ["PHP", "MySQL", "REST APIs", "SBClient POS"],
        outcome: "+20% receiving · +30% onboarding",
        kind: "arch",
      },
      {
        slug: "super-app-portal",
        name: "Client super app — APIs & portal",
        what: "Led the web team building the APIs and admin portal for a client's super app, with the work split across three teams in two countries.",
        stack: ["PHP", "REST APIs", "MySQL"],
        outcome: "3 teams",
        kind: "lead",
      },
    ],
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
    summary:
      "A two-month side engagement, run in parallel with the Cloone role. Small scope, measurable brief.",
    context: [
      "Ran alongside a full-time job — deliberately scoped to two clear problems rather than open-ended work.",
    ],
    projects: [
      {
        slug: "calendar-queries",
        name: "Booking calendar query tuning",
        what: "Profiled and rewrote the queries behind a booking calendar. An index and a reshaped join, not a rewrite.",
        stack: ["SQL", "PHP"],
        outcome: "-50% retrieval time",
        kind: "impact",
      },
      {
        slug: "view-receipt",
        name: "Checkout receipt access",
        what: "Added a View Receipt step so customers got proof of payment immediately instead of waiting on an email.",
        stack: ["PHP"],
        kind: "build",
      },
    ],
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
      "The switch to TypeScript and AWS. An in-house streaming product on one side, high-traffic Samsung campaigns on the other.",
    context: [
      "Backend-leaning full-stack, split between one long-lived product and short-fuse client campaigns.",
      "Where I stopped treating infrastructure as someone else's job.",
    ],
    projects: [
      {
        slug: "streaming-api",
        name: "Music streaming platform APIs",
        what: "REST APIs for the in-house streaming product, with Redis holding chart data and CloudFront fronting S3 artwork so the app felt instant.",
        stack: ["Node.js", "Express.js", "Redis", "AWS S3", "CloudFront"],
        outcome: "faster responses",
        kind: "build",
      },
      {
        slug: "samsung-campaigns",
        name: "Samsung campaign sites",
        what: "Full-stack Next.js builds for marketing pushes, including a lucky draw that had to survive a national ad campaign pointing at it.",
        stack: ["Next.js", "TypeScript", "React"],
        outcome: "10k visitors/day",
        kind: "impact",
      },
      {
        slug: "platform-observability",
        name: "Deployment & observability",
        what: "EC2 deploys, serverless APIs on Lambda and API Gateway, New Relic on production, and GitHub Actions doing the testing and shipping.",
        stack: ["AWS EC2", "AWS Lambda", "API Gateway", "New Relic", "GitHub Actions"],
        outcome: "CI/CD",
        kind: "ops",
      },
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
      "Current role. Replacing human review queues at 123RF with LLM pipelines, and making them cheap enough to leave running.",
    context: [
      "Working on 123RF, where the review queue was the bottleneck for every contributor.",
      "The first role where the interesting problems are cost-per-request and throughput, not features.",
    ],
    projects: [
      {
        slug: "review-pipelines",
        name: "LLM review pipelines",
        what: "Three pipelines that read a submission and decide: submission review, contributor registration review, and release workflow review.",
        stack: ["Python", "FastAPI", "AWS Bedrock"],
        outcome: "3 pipelines",
        kind: "build",
      },
      {
        slug: "event-driven-workers",
        name: "Event-driven review infrastructure",
        what: "SQS queues feeding ECS workers that scale on queue depth, so a spike in submissions costs time rather than a backlog.",
        stack: ["AWS SQS", "AWS ECS", "Docker"],
        outcome: "7d -> <24h",
        kind: "arch",
      },
      {
        slug: "inference-cost",
        name: "Inference cost reduction",
        what: "Migrated models, rewrote prompts and batched requests. No new architecture — just reading the numbers and acting on them.",
        stack: ["AWS Bedrock", "Prompt optimisation"],
        outcome: "~3× cheaper · +30% throughput",
        kind: "impact",
      },
      {
        slug: "ai-marketing-platform",
        name: "AI marketing platform",
        what: "Campaign planning, asset generation and automated publishing out to six social platforms from one place.",
        stack: ["TypeScript", "Node.js", "Next.js"],
        outcome: "6 platforms",
        kind: "build",
      },
    ],
    color: "var(--color-accent)",
  },
];

/** Distinct technologies across a role's projects — derived, never duplicated. */
export function roleStack(role: Role): string[] {
  return [...new Set(role.projects.flatMap((p) => p.stack))];
}

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
  { id: "trace", label: "Career" },
  { id: "stack", label: "Stack" },
  { id: "builds", label: "Builds" },
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
  portfolio: {
    title: "This site",
    blurb:
      "The page you're reading. My career renders as a distributed trace because that's the work — companies as parent spans, the systems I built as their children, positioned by real dates.",
    highlights: [
      "Repo list, commit counts and language-per-year pulled live from the GitHub API, so it goes stale on its own if I stop shipping",
      "Prerendered on Cloudflare Workers with an R2 incremental cache and a Durable Object running revalidation in the background",
      "No analytics, no cookies, no third-party requests — and no email or phone number anywhere in the source",
    ],
    accent: "var(--color-lime)",
    caveat:
      "Listing it here is not modesty-proofing: if I claim to care about honest data, the site making that claim should be readable end to end.",
  },
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
