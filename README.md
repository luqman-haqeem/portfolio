# luqman.service

Personal portfolio for **Luqman Haqeem**, backend-focused full-stack developer.

Instead of the usual hero-image-and-card-grid, the site is built as an **observability dashboard**, because that's the work:

- **Career trace** — companies are parent spans in a distributed-trace waterfall; the systems built inside them are child spans. Bar length is duration, bar position is when, so overlapping work (the DevWiz engagement inside the Cloone senior role) is visible rather than hidden. Expanding a company separates the *job context* ("led a team of 3") from the *work* (19 named systems, each with its own stack and outcome) — because those are different kinds of fact. Child spans deliberately have no bars: there are no reliable per-system dates, and inventing them would devalue the parent timeline.
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

- **Language eras** — real language byte counts in the repos I started each year, which is the evidence behind "my stack moved from PHP to TypeScript and Python".
- **`/builds`** — every public repo, its commit count and last push. A new repo appears on its own; no code change needed.

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
| Jobs, their context, and the systems built in each | `roles` (`context` + `projects`) |
| Headline numbers on the outcomes strip | `metrics` |
| Skill layers and their `usedIn` cross-references | `skillLayers` |
| Side projects | `projects` |
| Education, certifications, tools | `education`, `certifications`, `practices` |
| Honest language rankings + the repos that prove them | `languageComfort` |
| Per-repo write-ups, keyed by GitHub repo name | `buildNotes` |
| Projects I've rebuilt more than once | `lineages` |

Dates drive the waterfall geometry automatically — `lib/trace.ts` turns `YYYY-MM` strings into bar offsets, durations, year ticks and overlap detection. Adding a role is enough; no layout changes needed.

The `usedIn` arrays are what make the stack inspector work. Each entry is a `roles[].id` or `projects[].id`, and `metrics[].roleId` is what makes each number link back to the span it came from.

## Deploy (Cloudflare Workers)

Deployed to Cloudflare Workers through the [OpenNext adapter](https://opennext.js.org/cloudflare), which runs the real `next build` output. Cloudflare's newer `vinext` was considered and rejected: it is beta, its own README says the code is largely AI-written and unreviewed, and it loads Google Fonts from a CDN — which would quietly break this site's claim of no third-party requests.

### Option A — Cloudflare dashboard (no CLI)

Cloudflare builds and deploys on every push. Nothing to install, and the API token is generated for you.

1. **Create the cache bucket.** Dashboard → **R2** → *Create bucket* → name it exactly `portfolio-cache`.
2. **Connect the repo.** Dashboard → **Workers & Pages** → *Create* → **Import a repository** → pick `portfolio`.
3. **Set the two commands.** The defaults are wrong for OpenNext — the deploy default is `npx wrangler deploy`, which skips OpenNext entirely and never seeds the incremental cache:

   | Field | Value |
   | --- | --- |
   | Build command | `npx opennextjs-cloudflare build` |
   | Deploy command | `npx opennextjs-cloudflare deploy` |
   | Non-production branch command | `npx opennextjs-cloudflare upload` |

4. **Add one build variable** under *Settings → Build → **Build variables and secrets***:

   ```
   NEXT_PUBLIC_SITE_URL = https://portfolio.<your-subdomain>.workers.dev
   ```

   ⚠️ It must go under **Build** variables, not the runtime *Variables and Secrets* page. `NEXT_PUBLIC_*` values are inlined by the compiler, so a runtime value arrives too late and is silently ignored. If it's missing the production build prints a warning telling you so.

   `<your-subdomain>` is your **account-level** `workers.dev` subdomain — one per Cloudflare account, chosen the first time you create a Worker. Find it in **Workers & Pages**, or on the Worker's **Domains** tab. The `portfolio` part is the `name` in `wrangler.jsonc`.

   Don't know it yet? Deploy once without the variable, read the URL Cloudflare prints, then set it and redeploy. Or skip env vars entirely and hardcode `FALLBACK` in `lib/site.ts`.

Leave the build and deploy commands separate rather than pointing both at `npm run deploy`, or the app builds twice per deployment.

**About the token:** Cloudflare creates one automatically on first build, scoped to Account Settings (read), Workers Scripts (edit), Workers KV Storage (edit), Workers R2 Storage (edit), Workers Routes (edit) and user details. That already covers R2, so there is nothing to configure by hand.

If you use this path, leave the GitHub `SITE_URL` variable **unset** — that keeps the GitHub Actions workflow as a types/lint gate only, so Cloudflare and Actions never race to deploy the same commit.

### Option B — CLI

```bash
npx wrangler login
npx wrangler r2 bucket create portfolio-cache
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run deploy
```

### Option C — GitHub Actions

Set the `SITE_URL` variable and the two Cloudflare secrets (see [CI](#ci)) and every push to `main` deploys. Create the token at **My Profile → API Tokens → Create Custom Token** with:

| Scope | Permission |
| --- | --- |
| Account | Workers Scripts — Edit |
| Account | Workers R2 Storage — Edit |
| Account | Account Settings — Read |
| User | User Details — Read |
| Zone | Workers Routes — Edit *(only for a custom domain)* |

Use only one of A or C, not both.

The R2 bucket is the only resource you create by hand in any path. The Durable Object that runs revalidation is created automatically by the migration in `wrangler.jsonc`.

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

`.github/workflows/ci.yml` type-checks and lints on every push to `main`. It contains an **optional** deploy job.

The deploy job skips itself unless the `SITE_URL` repository variable is set. So:

- **Deploying via the Cloudflare dashboard (Option A)?** Leave `SITE_URL` unset. This workflow stays a pure quality gate and Cloudflare owns deployment — nothing races.
- **Want Actions to deploy (Option C)?** Set `SITE_URL` plus the two secrets. A missing secret then fails fast with a named error instead of a wrangler stack trace.

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

Note the deploy step runs `npm run deploy`, not `opennextjs-cloudflare deploy` — the latter skips the build and fails with *"Could not find compiled Open Next config"*. In Workers Builds the two are separate fields, which is why the build and deploy commands there are set individually.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · zero runtime dependencies beyond the framework.

Most of the page is server-rendered. Client components are limited to the parts that genuinely need interactivity: the trace waterfall, the stack inspector, the status bar, the session console, and the live uptime clock.

## Accessibility notes

- Expandable spans are real `<button>`s with `aria-expanded` / `aria-controls`.
- `prefers-reduced-motion` disables reveal, pulse and flow animations.
- Skip link, visible focus rings, and a keyboard-reachable console toggle.
- No horizontal overflow down to 320px wide.
