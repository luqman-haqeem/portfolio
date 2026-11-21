# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A broad audience: peers, potential collaborators or clients, recruiters, and anyone who comes across Luqman Haqeem's name or GitHub. Hiring is one possible outcome, but it isn't the main job of the site. Visitors want to work out who Luqman is, what he has actually built, and how deep his backend work goes. Some only skim. Engineers tend to open the detail.

## Product Purpose

The personal site of Luqman Haqeem, a backend-focused full-stack developer based in Hulu Langat, Selangor, Malaysia, with about 5 years of experience (career start 2020-12). It shows his career, the systems he built in each role, his stack and his public GitHub work. Success means a visitor leaves with an accurate, well-evidenced picture of him and a clear way to reach him through his public profiles.

## Positioning

The claims on this site can be checked. Career dates drive every period, duration and overlap shown, and each role names the systems built in it. Language history and the builds list come from the live GitHub API, with a committed fallback snapshot. The site states what it doesn't know (undated projects, a stale snapshot) instead of filling the gap. A template portfolio can't honestly copy this, because its evidence isn't wired to anything.

## Operating Context

- Visitors usually arrive from a shared link, his GitHub or his LinkedIn. They read on desktop and mobile, and it must work down to 320px.
- Content is edited in one typed file, `lib/resume.ts`. Components hardcode no résumé content.
- `npm run sync:github` refreshes `lib/github-snapshot.json`. The live fetch revalidates every 6 hours.
- Deployed to Cloudflare Workers through OpenNext.
- The dev machine can't run `next build` or a dev server reliably (OOM). Verification uses `npx tsc --noEmit`, `npx eslint .` and `npm test`, and anything unverified in a browser is reported as such.

## Capabilities and Constraints

- Current features (since the River Gauge redesign, Nov 2026): a sticky staff-gauge navigation; every role with real dates, durations, overlap flags and expandable named systems; language comfort beside GitHub language eras; the river-monitor rewrite record, side projects and every public repo from the last three years (live from GitHub); and a print-to-résumé path. The session console, the skills map with skill→usage links, and the plain-text toggle were removed at the user's direction.
- Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. No runtime dependencies beyond the framework. The page is server-rendered; the only client components are the gauge and the print button.
- **No invented data.** No fabricated dates, metrics, bars, testimonials, customers or outcomes. Missing data is shown as missing.
- **No third-party requests.** No analytics, CDN fonts, trackers or embeds. Fonts are self-hosted, and nothing leaves the visitor's tab.
- **Privacy floor.** Location at district level at most ("Hulu Langat, Selangor"). No street, phone number or email anywhere in the repo. Contact goes through the public GitHub and LinkedIn profiles. Structured data names the country only.
- The observability/trace concept (spans, topology, `luqman.service`) is how the site currently looks, **not a binding identity**. A future redesign may keep it or drop it.
- The print/ATS résumé is an existing feature but not a mandatory commitment.
- `tests/site-constraints.test.mjs` enforces the privacy and no-third-party constraints in source.

## Brand Commitments

- Name: Luqman Haqeem. GitHub handle `luqman-haqeem`.
- Voice: first person, plain and candid about where he's strongest and where he isn't (for example, the honest language-comfort rankings and per-repo write-ups about what he'd change). Facts come from data and the voice is hand-written.

## Evidence on Hand

- Five roles with real dates, context and named systems: APMT (intern), Cloone Corporation (PHP Developer → Senior Software Engineer), DevWiz (part-time, overlapping Cloone), Cheil Malaysia (Backend Developer) and Inmagine (Web Application Developer). All in `lib/resume.ts` `roles`.
- Skill layers with `usedIn` cross-references, side projects, education, certifications and practices (`lib/resume.ts`).
- Write-ups for individual builds (`buildNotes`) and the rewrite history of a long-running project (`lineages`).
- Live and snapshot GitHub data (`lib/github.ts`, `lib/github-snapshot.json`), with a hidden-repo list in `lib/hidden-repos.json`.
- Screenshots: `public/shots/riverlevel.webp`, `public/shots/simpanresit.webp`.
- Missing, and not to be fabricated: testimonials, client logos, press, and traffic or usage metrics for side projects.

## Product Principles

1. Every claim traces back to data or a named system, and gaps are stated.
2. Respect the visitor: no tracking, no third-party calls, nothing that runs unless it's needed.
3. Serve both readers: the skimmer gets the whole picture quickly, and the engineer can dig into the detail.
4. Content lives in data, not layout. Adding a role or a repo should never need a design change.
5. Personal details stay at the privacy floor and are never pushed past it for effect.
