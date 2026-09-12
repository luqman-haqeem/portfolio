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
    "Backend-focused full-stack developer with ~5 years building and scaling end-to-end products. Two years of TypeScript/Node.js (Jun 2024 to now) after three years of PHP (Apr 2021 to May 2024). Currently building LLM review pipelines on AWS across datasets of 10M+ records.",
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
  /**
   * Short identifier, rendered as a child span name in the trace.
   *
   * Clients are described by sector rather than named. Naming an employer's
   * clients alongside the internals built for them is more disclosure than
   * agency confidentiality clauses tend to allow, and the technical substance
   * reads the same without it. Third-party products (Kong, MiniOrange, the POS
   * systems) are kept — those are technologies, not client identities.
   */
  slug: string;
  name: string;
  what: string;
  /**
   * `YYYY-MM`, and only where the real dates are known. Undated projects render
   * without a bar rather than being given an invented range — a fabricated bar
   * would make the dated ones worthless.
   */
  start?: string;
  end?: string;
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
    company: "Cloone Corporation Sdn Bhd",
    service: "cloone/legacy-modernisation",
    title: "PHP Developer",
    location: "Malaysia",
    start: "2021-04",
    end: "2022-12",
    summary:
      "Nearly two years as the developer on Cloone's retail, HR and training clients. Nine systems, most of them things a business ran on daily rather than features on a roadmap.",
    context: [
      "Individual contributor across nine systems for retail, HR and training clients, each with its own stakeholders.",
      "Most of the work was inherited: reading someone else's CodeIgniter before touching it, then extending it without breaking a live business.",
    ],
    projects: [
      {
        slug: "php5-migration",
        name: "PHP 5.4 to CodeIgniter 3 migration",
        what: "Moved legacy systems off PHP 5.4 onto CodeIgniter 3 — the unglamorous work that made everything after it possible.",
        stack: ["PHP", "CodeIgniter 3", "MySQL"],
        outcome: "+20% perf",
        kind: "arch",
      },
      {
        slug: "retail-wms",
        name: "Grocery retail warehouse management system",
        what: "My first WMS. APIs for picking, putaway and relocation, an admin portal on top, and user access control so a floor operator and a manager saw different systems.",
        stack: ["PHP", "CodeIgniter 3", "MySQL", "jQuery", "Bootstrap"],
        outcome: "4 core modules",
        kind: "build",
      },
      {
        slug: "outlet-reporting",
        name: "Outlet sales, fraud and master reporting",
        what: "Sales performance per retail store, member registration figures, fraud-detection reports and live product stock — the screens the business actually made decisions from.",
        stack: ["PHP", "CodeIgniter 4", "MySQL", "jQuery", "Bootstrap"],
        outcome: "per-store visibility",
        kind: "build",
      },
      {
        slug: "hr-eletter",
        name: "eLetter generator",
        start: "2021-05",
        end: "2021-05",
        what: "Automated the HR letter application process end to end: APIs for the mobile app, request-management screens, and PDF generation that filled each letter type with the right employee data.",
        stack: ["PHP", "CodeIgniter", "REST APIs", "MySQL"],
        outcome: "20k employees",
        kind: "build",
      },
      {
        slug: "voucher-module",
        name: "Voucher issuing and redemption",
        start: "2021-07",
        end: "2021-07",
        what: "Admins create vouchers, members redeem them against accumulated points, and the whole thing reconciles with Qube POS so it works at a physical till too.",
        stack: ["PHP", "CodeIgniter", "Qube POS", "REST APIs"],
        outcome: "POS + app + web",
        kind: "build",
      },
      {
        slug: "markdown-app",
        name: "Markdown, disposal and reorder app",
        start: "2021-08",
        end: "2021-09",
        what: "Staff mark perishable stock down, write it off or reorder it from a phone on the shop floor, with a web dashboard behind it for reporting and user administration.",
        stack: ["PHP", "CodeIgniter", "REST APIs", "MySQL"],
        outcome: "12 stores",
        kind: "impact",
      },
      {
        slug: "pop-quiz",
        name: "Pop quiz module",
        what: "Live quizzes fired mid-session during online training to test whether anyone was still paying attention, with a dashboard showing trainers who understood the material and who didn't.",
        stack: ["PHP", "CodeIgniter", "OneSignal"],
        outcome: "shipped in 2 weeks",
        kind: "build",
      },
      {
        slug: "portal-sso",
        name: "Single sign-on between a legacy portal and WordPress",
        what: "A training provider's portal was CodeIgniter and their new site was WordPress. Built the OAuth server APIs behind a MiniOrange SSO bridge so one set of credentials opened both instead of asking people to hold two.",
        stack: ["WordPress", "CodeIgniter 3", "MiniOrange", "OAuth"],
        outcome: "one login, two portals",
        kind: "arch",
      },
      {
        slug: "member-registration",
        name: "Event member registration",
        what: "A landing page for signing up members at live events, with OTP verification so a queue of walk-ins couldn't be used to inject junk records.",
        stack: ["PHP", "CodeIgniter", "OTP", "Bootstrap"],
        kind: "build",
      },
    ],
    color: "var(--color-teal)",
  },
  {
    id: "cloone-senior",
    company: "Cloone Corporation Sdn Bhd",
    service: "cloone/wms-platform",
    title: "Senior Software Engineer",
    location: "Malaysia",
    start: "2023-01",
    end: "2024-05",
    summary:
      "Promoted into owning architecture and a team. Two large client systems — a logistics warehouse platform and a consumer super app portal — and the first time the design decisions were mine to defend.",
    context: [
      "Led project teams of four to six developers, and owned the system architecture.",
      "Coordinated across 3 cross-functional teams, including one based in India.",
      "Mentored juniors on system design, code quality and implementation practice.",
      "Owned the database schema, standardised the REST API structure across services, and architected the GitHub Actions CI/CD that replaced manual releases.",
      "Ran structured code reviews — the point being fewer production defects, not gatekeeping.",
    ],
    projects: [
      {
        slug: "logistics-wms",
        name: "Third-party logistics warehouse management system",
        start: "2024-01",
        end: "2024-05",
        what: "Led four developers on the full floor workflow: receiving, put away, relocation, picking, audit and status inquiry, with real-time inventory so a manager could see stock instead of guessing, and SBClient POS wired in for purchase orders. I designed the schema and the API structure, put Kong API Gateway in front as a single entry point, and built the GitHub Actions pipeline that deployed it.",
        stack: [
          "PHP",
          "CodeIgniter 4",
          "Nuxt.js",
          "MySQL",
          "Kong API Gateway",
          "GitHub Actions",
          "SBClient POS",
        ],
        outcome: "+20% receiving · +30% onboarding",
        kind: "arch",
      },
      {
        slug: "superapp-portal",
        name: "Consumer super app — APIs and management portal",
        start: "2023-04",
        end: "2023-08",
        what: "Led six developers building the backend APIs and admin portal behind a consumer super app: banner management, vouchers, pop-ups, user settings and access control. The part I'm most pleased with is the merchant API — third parties could register and plug their own services in, which turned a product into a platform. I wrote the integration docs for it too, because an undocumented API is a private one.",
        stack: [
          "PHP",
          "CodeIgniter 4",
          "REST APIs",
          "MySQL",
          "OneSignal",
          "Bootstrap 4",
        ],
        outcome: "3 teams · 2 countries",
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
    end: "2025-03",
    employment: "Contract",
    summary:
      "The switch to TypeScript and AWS. One long-lived in-house product, and Samsung work that had to hold up in a retail store on the day.",
    context: [
      "Backend-leaning full-stack, split between one product and short-fuse client campaigns.",
      "Campaign work meant brainstorming edge cases before launch rather than after. A store promotion gets one attempt — you cannot ship a fix to a queue of customers already standing there.",
      "Went into the Samsung store to implement and test on the actual devices and network. Field conditions surface problems a staging environment never will.",
      "Where I stopped treating infrastructure as someone else's job.",
    ],
    projects: [
      {
        slug: "streaming-api",
        name: "In-house music streaming platform",
        what: "REST APIs for the streaming product plus the AWS underneath it — serverless endpoints on Lambda and API Gateway, Redis holding chart data, CloudFront fronting S3 artwork, New Relic watching production, and a GitHub Actions pipeline doing the testing and shipping.",
        stack: [
          "Node.js",
          "Express.js",
          "TypeScript",
          "Redis",
          "AWS Lambda",
          "API Gateway",
          "AWS S3",
          "CloudFront",
          "New Relic",
          "GitHub Actions",
        ],
        outcome: "faster responses",
        kind: "build",
      },
      {
        slug: "s26-lucky-draw",
        name: "In-store lucky draw for the S26 Ultra pre-order",
        what: "A play-to-win campaign built for a Malaysian audience, played on a device inside Samsung stores while customers pre-ordered, with a dashboard behind it for pulling participants and winners back out. Retail campaigns get one shot — there is no patching it with a queue of customers waiting.",
        stack: ["Next.js", "TypeScript", "React"],
        outcome: "10k visitors/day",
        kind: "impact",
      },
      {
        slug: "dealer-convention-rsvp",
        name: "e-RSVP and door check-in for a dealer convention",
        what: "Two systems for Samsung's dealer convention at Sunway Pyramid. First, registration that issues each attendee an emailed QR — queued through SQS, rendered by Lambda, delivered via SES, so a burst of sign-ups never blocks the form. Second, the door: scanning that QR checks the attendee in on the day. Next.js front end on Vercel, Express running serverless on Lambda behind API Gateway.",
        stack: [
          "Next.js",
          "Express.js",
          "AWS Lambda",
          "API Gateway",
          "AWS SQS",
          "AWS SES",
          "Vercel",
        ],
        outcome: "QR issued, QR scanned",
        kind: "arch",
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
      "Current role. Three LLM review pipelines at 123RF, replacing human queues that contributors were waiting behind — and making them cheap enough to leave running.",
    context: [
      "Working on 123RF, where the review queue was the bottleneck for every contributor.",
      "Volume is consistently in the millions, so every design conversation starts with load rather than ending there.",
      "Each pipeline gets prompt evaluation and a deliberate pass through the edge cases before it goes near production. A false accept on a copyright check is a legal problem, not a bug report.",
      "The first role where the interesting problems are cost-per-request and throughput, not features.",
      "Working across datasets exceeding 10 million records, on internal platforms used by thousands of people.",
      "Mentoring juniors, and on a leadership development track for a future technical leadership role.",
    ],
    projects: [
      {
        slug: "submission-review",
        name: "Contributor submission review",
        what: "Reviews vectors as contributors submit them: content moderation, plus a filter that catches files which are really rasterised images or auto-traced conversions dressed up as true vectors. That check exists because low-quality auto-vectorised uploads are the easiest way to pollute a stock library.",
        stack: ["Python", "FastAPI", "AWS Bedrock"],
        outcome: "blocks auto-traced fakes",
        kind: "build",
      },
      {
        slug: "contributor-review",
        name: "New contributor review",
        what: "Applications from new contributors used to sit in a human queue for over a week. Now one that meets every requirement clears in under a day — the difference between someone joining the platform and giving up on it.",
        stack: ["Python", "FastAPI", "AWS Bedrock"],
        outcome: "7d -> <24h",
        kind: "impact",
      },
      {
        slug: "model-release-review",
        name: "Model release validation",
        what: "Checks that images containing identifiable people carry a valid model release, at submission time. The alternative is finding out the release was never valid from a lawsuit, which is an expensive way to learn it.",
        stack: ["Python", "FastAPI", "AWS Bedrock"],
        outcome: "caught before publication",
        kind: "impact",
      },
      {
        slug: "high-load-pipeline",
        name: "Event-driven review infrastructure",
        what: "SQS queues feeding ECS workers that scale on queue depth, across datasets exceeding 10 million records. The design question was never whether it works on one file — it was what happens on the worst day.",
        stack: ["AWS SQS", "AWS ECS", "Docker", "Python"],
        outcome: "10M+ records",
        kind: "arch",
      },
      {
        slug: "inference-cost",
        name: "Inference cost reduction",
        what: "Led the model migration, rewrote prompts and batched requests. No new architecture — just reading the numbers and acting on them, which is what made leaving three pipelines running affordable.",
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
      { name: "Kong API Gateway", usedIn: ["cloone-senior"] },
      { name: "Netlify", usedIn: ["riverlevel", "simpanresit"] },
      { name: "Vercel", usedIn: ["cheil"] },
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
      { name: "Nuxt.js", usedIn: ["cloone-senior"] },
      { name: "Bootstrap", usedIn: ["cloone-php"] },
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
      { name: "AWS SQS", usedIn: ["inmagine", "cheil"] },
      { name: "AWS ECS", usedIn: ["inmagine"] },
      { name: "AWS Lambda", usedIn: ["cheil"] },
      { name: "AWS EC2", usedIn: ["cheil"] },
      { name: "Docker", usedIn: ["inmagine"] },
      { name: "AWS SES", usedIn: ["cheil"] },
      { name: "OneSignal", usedIn: ["cloone-php", "riverlevel"] },
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
  shot?: Shot;
  /**
   * Slot this build into the grid immediately after the named repo.
   *
   * A private repo emits no push date, so it cannot be ranked by activity like
   * the public ones. Rather than invent a date to fake a sort, the position is
   * stated outright as the editorial choice it is.
   */
  pinAfter?: string;
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
    pinAfter: "water-level",
    shot: {
      src: "/shots/simpanresit.webp",
      alt: "The Simpan Resit landing page, headlined Smart Tax Relief Made Simple, beside a phone mockup showing tracked tax relief totals by category against their LHDN limits.",
      width: 1200,
      height: 750,
    },
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
    /** Verifiable — an unverifiable certification is decoration. */
    verifyUrl:
      "https://www.credly.com/badges/42404e0f-f91e-4fec-b9bf-621783f7b79a/public_url",
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
];

/**
 * Curated commentary keyed by GitHub repo name. Repos without an entry still
 * render from their API description, so a new repo shows up on its own.
 */
/**
 * A screenshot of the thing actually running. Pre-sized to 1200x750 and
 * compressed to WebP, so it is served as-is rather than through an optimiser.
 */
export type Shot = { src: string; alt: string; width: number; height: number };

export type BuildNote = {
  title: string;
  shot?: Shot;
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
    shot: {
      src: "/shots/riverlevel.webp",
      alt: "The River Level dashboard listing Selangor monitoring stations, each showing its current water level in metres, its district, how long ago it reported, and a warning, alert or danger badge.",
      width: 1200,
      height: 750,
    },
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
  // Below the three-year display window in /builds, so these two do not
  // currently render. Kept because the window is rolling and the write-ups are
  // still accurate if it ever widens.
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
    why: "Four years, three stacks, one question. Every rewrite happened because the previous version hit a wall I could name — not because a new framework got popular.",
    generations: [
      {
        repo: "WaterLevel",
        label: "v1",
        period: "Dec 2022",
        stack: "Laravel · jQuery · MySQL",
        host: "Render free tier",
        note: "Scraped the JPS portal on a schedule, with Google SSO to keep sign-up painless and OneSignal alerting people when their station hit a danger level. Then the free tier started sleeping after 15 minutes idle — and the moment you need a flood dashboard is the moment nobody has visited it.",
      },
      {
        repo: "water-level",
        label: "v2",
        period: "Aug 2024",
        stack: "Next.js · React",
        host: "Vercel",
        note: "Always awake and much faster. But I was polling for data I wanted to be live, which meant fighting the framework instead of using it.",
      },
      {
        repo: "water-level",
        label: "v3",
        period: "Aug 2026",
        stack: "Vite · TanStack Router · Convex",
        host: "Netlify",
        note: "A reactive backend, so station readings push instead of being polled. Added offline support, danger-level alerts and an actual test suite.",
        current: true,
      },
    ],
  },
];
