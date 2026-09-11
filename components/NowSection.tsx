import { buildNotes, nowFocus } from "@/lib/resume";
import {
  commitFeed,
  relativeTime,
  selectActive,
  type GithubData,
} from "@/lib/github";
import ExternalLink from "./ExternalLink";
import { ArrowIcon, Section, SectionHeading, StatusDot } from "./ui";

export default function NowSection({ data }: { data: GithubData }) {
  const { featured } = selectActive(data, 2);
  const feed = commitFeed(data, 14);

  return (
    <Section id="now">
      <SectionHeading
        index="01"
        route="now"
        title="What I'm building this month"
        description={
          <>
            The part a résumé can&apos;t tell you. Below is my real commit
            history from the GitHub API, newest first — which means this section
            goes stale the moment I stop working, and there&apos;s nowhere for me
            to hide that.
          </>
        }
        aside={
          <span className="hidden items-center gap-1.5 font-mono text-2xs text-dim sm:inline-flex">
            <StatusDot color={data.live ? "bg-ok" : "bg-accent"} pulse={false} />
            {data.live ? "live from github" : "cached snapshot"}
          </span>
        }
      />

      <div className="grid gap-5 lg:grid-cols-12">
        {/* ------------------------------ focus ------------------------------ */}
        <div className="min-w-0 lg:col-span-5">
          <div
            className="flex h-full flex-col rounded-xl border border-line bg-panel p-5"
            data-reveal
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="font-mono text-2xs text-accent">in focus</p>
              <p className="font-mono text-2xs text-dim">{nowFocus.updated}</p>
            </div>

            <p className="mt-3 text-sm leading-relaxed text-text">
              {nowFocus.body}
            </p>

            <div className="mt-4 border-t border-line pt-3">
              <p className="font-mono text-2xs text-dim">currently learning</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {nowFocus.learning}
              </p>
            </div>

            <div className="mt-5 space-y-2 border-t border-line pt-4">
              <p className="font-mono text-2xs text-dim">repos I&apos;m in</p>
              {featured.map((repo) => {
                const note = buildNotes[repo.name];
                return (
                  <div
                    key={repo.name}
                    className="flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-lg border border-line bg-panel-2/40 px-3 py-2"
                  >
                    <ExternalLink
                      href={repo.url}
                      logAs={`repo/${repo.name}`}
                      className="font-mono text-2xs text-text transition-colors hover:text-accent"
                    >
                      {repo.name}
                    </ExternalLink>
                    {repo.language ? (
                      <span
                        className="font-mono text-2xs"
                        style={{ color: note?.accent ?? "var(--color-muted)" }}
                      >
                        {repo.language}
                      </span>
                    ) : null}
                    {repo.commitCount ? (
                      <span className="font-mono text-2xs text-dim">
                        {repo.commitCount} commits
                      </span>
                    ) : null}
                    <span className="ml-auto font-mono text-2xs text-line-2">
                      {relativeTime(repo.pushedAt, data.now)}
                    </span>
                  </div>
                );
              })}
              <p className="pt-1 font-mono text-2xs text-line-2">
                full write-ups in{" "}
                <a
                  href="#builds"
                  className="text-dim underline decoration-line-2 underline-offset-2 transition-colors hover:text-accent"
                >
                  builds
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* --------------------------- commit feed --------------------------- */}
        <div className="min-w-0 lg:col-span-7">
          <div
            className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-panel"
            data-reveal
            style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
          >
            <div className="flex items-center gap-2 border-b border-line bg-panel-2/40 px-4 py-2.5">
              <span className="font-mono text-2xs text-muted">
                git log --all
              </span>
              <span className="ml-auto font-mono text-2xs text-line-2">
                last {feed.length} · 120d window
              </span>
            </div>

            {feed.length === 0 ? (
              <p className="p-5 text-sm leading-relaxed text-muted">
                Nothing pushed in the last few months — I&apos;m either heads-down
                at work or taking a break. The archive is in{" "}
                <a
                  href="#builds"
                  className="text-accent underline decoration-accent/30 underline-offset-4"
                >
                  builds
                </a>
                .
              </p>
            ) : null}

            <ul className="divide-y divide-line/60">
              {feed.map((entry) => (
                <li key={`${entry.repo}-${entry.sha}`}>
                  <ExternalLink
                    href={entry.url}
                    logAs={`commit/${entry.repo}@${entry.sha}`}
                    className="group flex flex-col gap-1 px-4 py-2.5 transition-colors hover:bg-panel-2/60 sm:flex-row sm:items-baseline sm:gap-3"
                  >
                    <span className="flex shrink-0 items-center gap-2.5 font-mono text-2xs">
                      <span className="text-line-2 tabular">
                        {entry.date.slice(0, 10)}
                      </span>
                      <span className="w-24 truncate text-dim sm:w-28">
                        {entry.repo}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1 text-xs leading-snug text-muted transition-colors group-hover:text-text">
                      {entry.message}
                    </span>
                    <span className="hidden shrink-0 font-mono text-2xs text-line-2 group-hover:text-accent sm:inline">
                      {entry.sha}
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>

            <div className="mt-auto border-t border-line px-4 py-2.5">
              <ExternalLink
                href="https://github.com/luqman-haqeem?tab=repositories"
                logAs="github repositories"
                className="inline-flex items-center gap-1.5 font-mono text-2xs text-dim transition-colors hover:text-accent"
              >
                all repositories on github
                <ArrowIcon />
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
