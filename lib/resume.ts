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
    status: "live",
    tagline: "Live water levels for Selangor rivers, refreshed every 15 minutes",
    detail:
      "A real-time dashboard showing live water levels across Selangor river stations, so people near flood-prone areas can see conditions at a glance.",
    highlights: [
      "Ingests external JPS Selangor station data on a 15-minute cycle",
      "Dynamic station UI with live camera feeds",
      "Reactive data layer on Convex",
    ],
    stack: ["Next.js", "Convex", "Tailwind CSS", "Shadcn/ui", "Netlify"],
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
  { id: "trace", label: "Career trace" },
  { id: "stack", label: "Stack" },
  { id: "deployments", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];
