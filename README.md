# luqman.service

Personal portfolio for **Luqman Haqeem**, backend-focused full-stack developer.

Instead of the usual hero-image-and-card-grid, the site is built as an **observability dashboard**, because that's the work:

- **Career trace** — roles render as spans in a distributed-trace waterfall. Bar length is duration, bar position is when, so overlapping work (the DevWiz engagement inside the Cloone senior role) is visible rather than hidden. Expanding a span shows its attributes and its "logs" (achievements, tagged `ARCH` / `IMPACT` / `BUILD` / `LEAD` / `OPS`).
- **Stack topology** — skills grouped by request path instead of alphabetically. Every node is clickable and links to the jobs and projects where it was actually used; nodes with no production usage say so instead of padding the list.
- **Session console** — press `` ` `` or click `console`. It logs real events from your own visit (page load, viewport, sections viewed, spans expanded). Nothing is simulated and nothing leaves the tab — there is no analytics on this site.
- **Two ways to read it** — a `plain text` toggle in the career trace renders a normal résumé for anyone who just wants the facts, and the page prints to a clean, ATS-friendly document.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Live GitHub data

This is not just an online résumé, so the parts that go stale fastest are pulled from the GitHub API rather than typed by hand:

- **`/now`** — a merged commit feed across my active repos, newest first, with merge commits filtered out. If I stop pushing, this section visibly stops moving.
- **Language eras** — real language byte counts in the repos I started each year, which is the evidence behind "my stack moved from PHP to TypeScript and Python".
- **`/builds`** — every public repo, its commit count and last push. A new repo appears on its own; no code change needed.
- **`/beyond`** — starred repos, grouped into themes by hand in `starThemes`.

Facts come from the API; the voice (why a project exists, what I'd change) stays hand-written in `lib/resume.ts`.

```bash
npm run sync:github    # refresh lib/github-snapshot.json
```

`lib/github-snapshot.json` is the committed fallback. The live fetch uses an explicit `next: { revalidate }`, because this Next version does not cache `fetch` by default — without it the page would become dynamic. With it, `/` stays prerendered and refreshes every 6 hours. If GitHub is unreachable or rate-limited (60 req/hr unauthenticated), the snapshot renders instead and the footer says so, so the build can never fail on a network hiccup.

Set `GITHUB_TOKEN` before `npm run sync:github` if you hit the rate limit.

## Editing content

All résumé content lives in one typed file: **`lib/resume.ts`**. Nothing is hardcoded in components.

| What | Where |
| --- | --- |
| Name, contact, summary, tagline | `profile` |
| Jobs (dates as `YYYY-MM`, `end: null` = current) | `roles` |
| Headline numbers on the outcomes strip | `metrics` |
| Skill layers and their `usedIn` cross-references | `skillLayers` |
| Side projects | `projects` |
| Education, certifications, tools | `education`, `certifications`, `practices` |
| What I'm focused on this month (rewrite freely) | `nowFocus` |
| Honest language rankings + the repos that prove them | `languageComfort` |
| Per-repo write-ups, keyed by GitHub repo name | `buildNotes` |
| Projects I've rebuilt more than once | `lineages` |
| Themed grouping of starred repos | `starThemes` |
| Non-work personality cards | `beyondCode` |

Dates drive the waterfall geometry automatically — `lib/trace.ts` turns `YYYY-MM` strings into bar offsets, durations, year ticks and overlap detection. Adding a role is enough; no layout changes needed.

The `usedIn` arrays are what make the stack inspector work. Each entry is a `roles[].id` or `projects[].id`, and `metrics[].roleId` is what makes each number link back to the span it came from.

## Deploy

Static output, so any host works. Set `NEXT_PUBLIC_SITE_URL` to the final domain so the Open Graph card resolves to an absolute URL (Netlify's `URL` and Vercel's `VERCEL_URL` are picked up automatically).

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
```

The share image at `/opengraph-image` is generated at build time from the same `lib/resume.ts` data as the page, so it can't drift out of sync.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · zero runtime dependencies beyond the framework.

Most of the page is server-rendered. Client components are limited to the parts that genuinely need interactivity: the trace waterfall, the stack inspector, the status bar, the session console, and the live uptime clock.

## Accessibility notes

- Expandable spans are real `<button>`s with `aria-expanded` / `aria-controls`.
- `prefers-reduced-motion` disables reveal, pulse and flow animations.
- Skip link, visible focus rings, and a keyboard-reachable console toggle.
- No horizontal overflow down to 320px wide.
