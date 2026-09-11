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

## Deploy (Cloudflare Workers)

Deployed to Cloudflare Workers through the [OpenNext adapter](https://opennext.js.org/cloudflare), which runs the real `next build` output. Cloudflare's newer `vinext` was considered and rejected: it is beta, its own README says the code is largely AI-written and unreviewed, and it loads Google Fonts from a CDN — which would quietly break this site's claim of no third-party requests.

### One-time setup

```bash
npx wrangler login                              # authenticate
npx wrangler r2 bucket create portfolio-cache   # incremental cache for ISR
npm run deploy                                  # build + deploy
```

The R2 bucket is the only resource you create by hand. The Durable Object that runs revalidation is created automatically by the migration in `wrangler.jsonc`.

Set the canonical origin so the sitemap and OG image resolve to absolute URLs:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run deploy
```

### How caching is wired

Three components exist in OpenNext; this app needs two:

| Component | Used | Why |
| --- | --- | --- |
| Incremental cache (R2) | yes | Holds the prerendered page between revalidations. |
| Queue (Durable Object) | yes | Runs the 6-hourly revalidation in the background, so no visitor waits on the GitHub API. |
| Tag cache (D1) | **no** | Only needed for `revalidateTag` / `revalidatePath`. This app uses time-based revalidation only, which saves a database and a migration. |

### Local development

```bash
npm run dev        # normal Next.js dev server
npm run preview    # build, then run the real Worker locally via workerd
```

`npm run preview` is worth using before any deploy — it runs the actual Workers runtime with R2 and the Durable Object emulated locally, which catches anything that works in Node but not on the edge.

### CI

`.github/workflows/deploy.yml` type-checks and lints on every push to `main`, then deploys.

The deploy job **skips itself** until the `SITE_URL` repository variable is set, so pushes stay green while Cloudflare is still unconfigured. Once `SITE_URL` exists, a missing secret fails fast with a named error instead of a wrangler stack trace.

| Secret / variable | Purpose |
| --- | --- |
| `SITE_URL` (variable) | Canonical origin — also the switch that enables deploys |
| `CLOUDFLARE_API_TOKEN` (secret) | Workers deploy permission |
| `CLOUDFLARE_ACCOUNT_ID` (secret) | Target account |

```bash
gh variable set SITE_URL --body "https://your-domain.com"
gh secret set CLOUDFLARE_API_TOKEN
gh secret set CLOUDFLARE_ACCOUNT_ID
```

Note the deploy step runs `npm run deploy`, not `opennextjs-cloudflare deploy` — the latter skips the build and fails with *"Could not find compiled Open Next config"*.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · zero runtime dependencies beyond the framework.

Most of the page is server-rendered. Client components are limited to the parts that genuinely need interactivity: the trace waterfall, the stack inspector, the status bar, the session console, and the live uptime clock.

## Accessibility notes

- Expandable spans are real `<button>`s with `aria-expanded` / `aria-controls`.
- `prefers-reduced-motion` disables reveal, pulse and flow animations.
- Skip link, visible focus rings, and a keyboard-reachable console toggle.
- No horizontal overflow down to 320px wide.
