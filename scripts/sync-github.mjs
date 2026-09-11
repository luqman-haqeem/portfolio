/**
 * Regenerates lib/github-snapshot.json — the offline fallback used when the
 * GitHub API is unreachable or rate-limited at build time.
 *
 *   npm run sync:github
 *
 * The live site fetches the same endpoints at build/revalidate time, so this
 * file only matters when that fetch fails. Committing it means the site can
 * always render, even with no network.
 */

import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const USER = "luqman-haqeem";
const API = "https://api.github.com";
const COMMIT_REPO_COUNT = 5;
const COMMITS_PER_REPO = 8;

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": `${USER}-portfolio-sync`,
  ...(process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
    : {}),
};

async function api(path) {
  const res = await fetch(`${API}${path}`, { headers });
  if (!res.ok) {
    throw new Error(`GitHub ${res.status} ${res.statusText} for ${path}`);
  }
  return res.json();
}

/**
 * GitHub has no commit-count field. Asking for one commit per page and reading
 * the `rel="last"` page number from the Link header gives the total in a single
 * request.
 */
async function commitCount(repo) {
  const res = await fetch(`${API}/repos/${USER}/${repo}/commits?per_page=1`, {
    headers,
  });
  if (!res.ok) return null;
  const link = res.headers.get("link");
  const last = link?.match(/[?&]page=(\d+)>;\s*rel="last"/);
  if (last) return Number(last[1]);
  const body = await res.json();
  return Array.isArray(body) ? body.length : null;
}

const profile = await api(`/users/${USER}`);
const rawRepos = await api(`/users/${USER}/repos?per_page=100&sort=pushed`);
const rawStars = await api(`/users/${USER}/starred?per_page=100`);

const repos = [];
for (const repo of rawRepos) {
  let languages = {};
  try {
    languages = await api(`/repos/${USER}/${repo.name}/languages`);
  } catch {
    languages = repo.language ? { [repo.language]: 1 } : {};
  }
  repos.push({
    name: repo.name,
    description: repo.description,
    url: repo.html_url,
    homepage: repo.homepage || null,
    language: repo.language,
    languages,
    topics: repo.topics ?? [],
    stars: repo.stargazers_count,
    fork: repo.fork,
    archived: repo.archived,
    createdAt: repo.created_at,
    pushedAt: repo.pushed_at,
    commitCount: repo.fork ? null : await commitCount(repo.name),
  });
}

const commits = {};
const active = repos.filter((r) => !r.fork).slice(0, COMMIT_REPO_COUNT);
for (const repo of active) {
  try {
    const list = await api(
      `/repos/${USER}/${repo.name}/commits?per_page=${COMMITS_PER_REPO}`,
    );
    commits[repo.name] = list.map((c) => ({
      sha: c.sha.slice(0, 7),
      date: c.commit.author?.date ?? c.commit.committer?.date,
      message: c.commit.message.split("\n")[0],
      url: c.html_url,
    }));
  } catch {
    commits[repo.name] = [];
  }
}

const snapshot = {
  syncedAt: new Date().toISOString(),
  profile: {
    login: profile.login,
    name: profile.name,
    location: profile.location,
    createdAt: profile.created_at,
    publicRepos: profile.public_repos,
    followers: profile.followers,
  },
  repos,
  commits,
  starred: rawStars.map((r) => ({
    fullName: r.full_name,
    description: r.description,
    language: r.language,
    stars: r.stargazers_count,
    url: r.html_url,
  })),
};

const out = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "lib",
  "github-snapshot.json",
);
await writeFile(out, `${JSON.stringify(snapshot, null, 2)}\n`);

console.log(
  `Wrote ${out}\n  ${snapshot.repos.length} repos, ${
    Object.keys(snapshot.commits).length
  } commit logs, ${snapshot.starred.length} starred`,
);
