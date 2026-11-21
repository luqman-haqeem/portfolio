// PROTOTYPE — throwaway. Shared, read-only data shaping for the direction variants.
import { profile, roles, projects, languageComfort } from "@/lib/resume";
import { formatPeriod, monthSpan, formatDuration } from "@/lib/trace";
import {
  languageEras,
  selectActive,
  relativeTime,
  type GithubData,
} from "@/lib/github";

/**
 * Which of each role's own `context` lines carry the candid voice. Indexes into
 * lib/resume.ts, so the words are his, verbatim — nothing is paraphrased here.
 */
const VOICE: Record<string, number[]> = {
  inmagine: [1, 2],
  cheil: [1, 3],
  devwiz: [0],
  cloone: [2],
  apmt: [0],
};

export function shape(github: GithubData) {
  const ordered = [...roles].sort((a, b) => b.start.localeCompare(a.start));
  const active = roles.find((r) => r.end === null) ?? ordered[0];
  const { all } = selectActive(github, 4);
  const latest = all[0];
  return {
    profile,
    active,
    roles: ordered.map((r) => ({
      ...r,
      period: formatPeriod(r.start, r.end),
      duration: formatDuration(monthSpan(r.start, r.end)),
      voice: (VOICE[r.id] ?? []).map((i) => r.context[i]).filter(Boolean),
    })),
    systemCount: roles.reduce((n, r) => n + r.projects.length, 0),
    projects,
    comfort: languageComfort,
    eras: languageEras(github.repos),
    repos: all.slice(0, 6).map((r) => ({
      name: r.name,
      description: r.description,
      url: r.url,
      language: r.language,
      commits: r.commitCount,
      pushed: relativeTime(r.pushedAt, github.now),
    })),
    lastPush: latest ? { repo: latest.name, when: relativeTime(latest.pushedAt, github.now) } : null,
    live: github.live,
    syncedAt: github.syncedAt,
  };
}

export type Shaped = ReturnType<typeof shape>;
