import snapshot from "./github-snapshot.json";
import hiddenRepos from "./hidden-repos.json";

/**
 * GitHub is the source of truth for *facts* (what exists, when it was last
 * pushed, what the commits say). The curated commentary lives in resume.ts.
 *
 * Fetched with an explicit `next.revalidate` because this Next version does not
 * cache `fetch` by default — without it the page would turn dynamic. With it,
 * the page stays prerendered and refreshes every few hours. If GitHub is down
 * or rate-limited (60 req/hr unauthenticated), we fall back to the committed
 * snapshot so the build can never fail on a network hiccup.
 */

const USER = "luqman-haqeem";
const API = "https://api.github.com";
const REVALIDATE_SECONDS = 60 * 60 * 6;
const COMMIT_LOG_REPOS = 3;
/** The profile README repo — a bio, not a project, so it never counts as work. */
const PROFILE_REPO = "luqman-haqeem";

export type Repo = {
  name: string;
  description: string | null;
  url: string;
  homepage: string | null;
  language: string | null;
  languages: Record<string, number>;
  topics: string[];
  stars: number;
  fork: boolean;
  archived: boolean;
  createdAt: string;
  pushedAt: string;
  commitCount: number | null;
};

export type Commit = {
  sha: string;
  date: string;
  message: string;
  url: string;
};

export type Profile = {
  login: string;
  name: string | null;
  createdAt: string;
  publicRepos: number;
  followers: number;
};

export type GithubData = {
  /** True when the numbers came from the API rather than the snapshot. */
  live: boolean;
  syncedAt: string;
  /**
   * "Now" captured once when the data is fetched. Components must derive
   * relative times from this instead of calling Date.now() during render,
   * which would be impure and could drift between re-renders.
   */
  now: string;
  repos: Repo[];
  commits: Record<string, Commit[]>;
  profile: Profile;
};

/**
 * TypeScript infers a JSON import as a union of exact object literals, which
 * doesn't satisfy the open-ended `Record<string, number>` on `languages`. One
 * assertion at the boundary keeps the rest of the file properly typed.
 */
const cached = snapshot as unknown as Omit<GithubData, "live" | "now">;

/** Take-home assessments — see lib/hidden-repos.json for why. */
const hidden = new Set<string>(hiddenRepos.hidden);

export const isHidden = (name: string) => hidden.has(name);

function withoutHidden<T extends Omit<GithubData, "live" | "now">>(data: T): T {
  return {
    ...data,
    repos: data.repos.filter((r) => !hidden.has(r.name)),
    commits: Object.fromEntries(
      Object.entries(data.commits).filter(([name]) => !hidden.has(name)),
    ),
  };
}

const fallbackBase = { live: false as const, ...withoutHidden(cached) };

async function gh<T>(path: string): Promise<T> {
  // Unauthenticated GitHub allows 60 requests/hour per IP, which is plenty for
  // one machine but not for shared CI runners. A token lifts it to 5,000 and is
  // entirely optional — without one we just fall back to the snapshot.
  const token = process.env.GITHUB_TOKEN;

  const res = await fetch(`${API}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": `${USER}-portfolio`,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  created_at: string;
  pushed_at: string;
};

type ApiCommit = {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { date: string } | null;
    committer: { date: string } | null;
  };
};

export async function getGithubData(): Promise<GithubData> {
  const now = new Date().toISOString();

  try {
    const apiRepos = await gh<ApiRepo[]>(
      `/users/${USER}/repos?per_page=100&sort=pushed`,
    );

    // Language byte counts and stars change rarely and would cost one request
    // per repo, so they come from the snapshot and are merged in by name.
    const snapshotByName = new Map(cached.repos.map((r) => [r.name, r]));

    const repos: Repo[] = apiRepos
      .filter((repo) => !hidden.has(repo.name))
      .map((repo) => {
      const cachedRepo = snapshotByName.get(repo.name);
      return {
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage || null,
        language: repo.language,
        languages:
          cachedRepo?.languages ??
          (repo.language ? { [repo.language]: 1 } : {}),
        topics: repo.topics ?? [],
        stars: repo.stargazers_count,
        fork: repo.fork,
        archived: repo.archived,
        createdAt: repo.created_at,
        pushedAt: repo.pushed_at,
        commitCount: cachedRepo?.commitCount ?? null,
      };
    });

    const targets = repos
      .filter((r) => !r.fork && r.name !== PROFILE_REPO)
      .slice(0, COMMIT_LOG_REPOS);
    const logs = await Promise.all(
      targets.map(async (repo) => {
        try {
          const list = await gh<ApiCommit[]>(
            `/repos/${USER}/${repo.name}/commits?per_page=8`,
          );
          return [
            repo.name,
            list.map((c) => ({
              sha: c.sha.slice(0, 7),
              date: c.commit.author?.date ?? c.commit.committer?.date ?? "",
              message: c.commit.message.split("\n")[0],
              url: c.html_url,
            })),
          ] as const;
        } catch {
          return [repo.name, fallbackBase.commits[repo.name] ?? []] as const;
        }
      }),
    );

    return {
      live: true,
      syncedAt: now,
      now,
      repos,
      commits: Object.fromEntries(logs),
      profile: fallbackBase.profile,
    };
  } catch {
    return { ...fallbackBase, now };
  }
}

/* ---------------------------------------------------------------- helpers */

export const ownRepos = (repos: Repo[]) => repos.filter((r) => !r.fork);

/**
 * Markup and styling aren't a statement about what someone writes, so they're
 * excluded from both the language chart and the per-repo chips.
 */
const INCIDENTAL_LANGUAGES = new Set([
  "CSS",
  "SCSS",
  "HTML",
  "Blade",
  "Hack",
  "Jinja",
]);

/** Languages of a repo, biggest first, minus the incidental ones. */
export function meaningfulLanguages(repo: Repo, limit = 4): string[] {
  return Object.entries(repo.languages)
    .filter(([name]) => !INCIDENTAL_LANGUAGES.has(name))
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name]) => name);
}

export function byRecency(repos: Repo[]) {
  return [...repos].sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));
}

export function findRepo(repos: Repo[], name: string) {
  return repos.find((r) => r.name === name);
}

/** "3 days ago" / "2 months ago" — coarse enough to stay true between builds. */
export function relativeTime(iso: string, reference: string): string {
  const then = new Date(iso).getTime();
  const days = Math.floor((new Date(reference).getTime() - then) / 86_400_000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30.44);
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(days / 365.25);
  const rest = Math.round((days - years * 365.25) / 30.44);
  return rest > 0
    ? `${years}y ${rest}mo ago`
    : `${years} year${years === 1 ? "" : "s"} ago`;
}

/**
 * Language totals grouped by the year each repo was started — this is what
 * shows the PHP-to-TypeScript/Python shift as evidence rather than a claim.
 */
export function languageEras(repos: Repo[]) {
  const buckets = new Map<string, Map<string, number>>();

  for (const repo of ownRepos(repos)) {
    const year = repo.createdAt.slice(0, 4);
    const bucket = buckets.get(year) ?? new Map<string, number>();
    for (const [lang, bytes] of Object.entries(repo.languages)) {
      if (INCIDENTAL_LANGUAGES.has(lang)) continue;
      bucket.set(lang, (bucket.get(lang) ?? 0) + bytes);
    }
    buckets.set(year, bucket);
  }

  return [...buckets.entries()]
    .filter(([, langs]) => langs.size > 0)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([year, langs]) => {
      const entries = [...langs.entries()].sort((a, b) => b[1] - a[1]);
      const total = entries.reduce((sum, [, bytes]) => sum + bytes, 0) || 1;
      return {
        year,
        total,
        languages: entries
          .map(([name, bytes]) => ({
            name,
            bytes,
            share: (bytes / total) * 100,
          }))
          .filter((l) => l.share >= 3),
      };
    });
}

/**
 * Close to GitHub's own language colours, except Python — its real shade is
 * nearly identical to TypeScript's and the two sit next to each other in the
 * 2026 bar, so it gets a distinguishable green instead.
 */
export const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#5ac8a8",
  PHP: "#8993be",
  Shell: "#89e051",
  Dockerfile: "#384d54",
  Vue: "#41b883",
  Go: "#00add8",
};

const ACTIVE_WINDOW_DAYS = 90;

/**
 * The repos I've actually pushed to lately. Shared by the "now" and "builds"
 * sections so they can't disagree about what counts as active.
 */
export function selectActive(data: GithubData, limit = 2) {
  const recent = byRecency(ownRepos(data.repos)).filter(
    (r) => r.name !== PROFILE_REPO,
  );
  const cutoff =
    new Date(data.now).getTime() - ACTIVE_WINDOW_DAYS * 86_400_000;
  const active = recent.filter(
    (r) => new Date(r.pushedAt).getTime() >= cutoff && !r.archived,
  );
  return {
    all: recent,
    featured: (active.length > 0 ? active : recent).slice(0, limit),
  };
}

export type FeedEntry = Commit & { repo: string };

/**
 * One chronological stream of recent commits across the repos we have logs for.
 *
 * Bounded by age as well as count: the section claims to show what I'm working
 * on *now*, so it must never pad itself out with two-year-old commits from an
 * archived repo just to fill the list. A short feed is the honest answer.
 *
 * Merge commits are dropped — they restate a branch name that the real commit
 * underneath already says better.
 */
export function commitFeed(
  data: GithubData,
  limit = 14,
  maxAgeDays = 120,
): FeedEntry[] {
  const oldest = new Date(data.now).getTime() - maxAgeDays * 86_400_000;

  return Object.entries(data.commits)
    .filter(([repo]) => repo !== PROFILE_REPO)
    .flatMap(([repo, commits]) => commits.map((c) => ({ ...c, repo })))
    .filter(
      (c) =>
        c.date &&
        new Date(c.date).getTime() >= oldest &&
        !/^Merge (pull request|branch|remote)/i.test(c.message),
    )
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}
