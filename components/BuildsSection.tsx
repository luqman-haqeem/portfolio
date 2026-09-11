import { buildNotes, lineages, profile, projects } from "@/lib/resume";
import {
  findRepo,
  meaningfulLanguages,
  relativeTime,
  selectActive,
  type GithubData,
  type Repo,
} from "@/lib/github";
import ExternalLink from "./ExternalLink";
import {
  ArrowIcon,
  CornerArrow,
  Section,
  SectionHeading,
  StatusDot,
} from "./ui";

export default function BuildsSection({ data }: { data: GithubData }) {
  // Same active-repo selection the "now" section uses, so the two agree.
  const { all: repos, featured } = selectActive(data, 2);
  const activeNames = new Set(featured.map((r) => r.name));

  /** Shipped products whose source isn't public — they'd be invisible otherwise. */
  const closedSource = projects.filter(
    (p) => !p.repo || !findRepo(data.repos, p.repo),
  );

  const totalCommits = repos.reduce((sum, r) => sum + (r.commitCount ?? 0), 0);

  return (
    <Section id="builds">
      <SectionHeading
        index="04"
        route="builds"
        title="Everything I've built in the open"
        description={
          <>
            Not just the two projects polished enough for a résumé — the learning
            builds and the abandoned first attempts too. {repos.length} public
            repos, {totalCommits.toLocaleString()} commits, going back to my
            diploma final-year project in 2020.
          </>
        }
        aside={
          <span className="hidden font-mono text-2xs text-dim sm:inline">
            {repos.length + closedSource.length} builds
          </span>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {repos.map((repo, i) => (
          <RepoCard
            key={repo.name}
            repo={repo}
            now={data.now}
            active={activeNames.has(repo.name)}
            delay={i * 60}
          />
        ))}

        {closedSource.map((project, i) => (
          <article
            key={project.id}
            className="flex flex-col overflow-hidden rounded-xl border border-line bg-panel"
            data-reveal
            style={
              {
                "--reveal-delay": `${(repos.length + i) * 60}ms`,
              } as React.CSSProperties
            }
          >
            <div className="flex items-center gap-2 border-b border-line bg-panel-2/40 px-4 py-2.5">
              <StatusDot color="bg-ok" />
              <span className="truncate font-mono text-2xs text-muted">
                {project.slug}
              </span>
              <span className="ml-auto shrink-0 rounded border border-line-2 px-1.5 py-0.5 font-mono text-2xs text-dim">
                private repo
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold tracking-tight text-text">
                {project.name}
              </h3>
              <p className="mt-1.5 text-sm" style={{ color: project.accent }}>
                {project.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.detail}
              </p>

              <ul className="mt-4 space-y-1.5">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex gap-2 text-xs leading-relaxed text-text"
                  >
                    <CornerArrow className="mt-0.5 shrink-0 text-dim" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-line-2 bg-panel-2 px-2 py-0.5 font-mono text-2xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ExternalLink
                href={project.url}
                logAs={project.slug}
                className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 font-mono text-2xs text-ok transition-colors hover:text-accent"
              >
                open {project.slug}
                <ArrowIcon />
              </ExternalLink>
            </div>
          </article>
        ))}
      </div>

      {/* --------------------------- rebuild lineage --------------------------- */}
      <div className="mt-16 border-t border-line pt-12">
        <div className="mb-8" data-reveal>
          <h3 className="text-xl font-semibold tracking-tight text-text">
            The things I keep rebuilding
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Two problems I&apos;ve now solved more than once. I think this says
            more about how I work than any single project does — I don&apos;t
            move on when something works, I come back when I know better.
          </p>
        </div>

        <div className="space-y-5">
          {lineages.map((lineage, li) => (
            <div
              key={lineage.problem}
              className="rounded-xl border border-line bg-panel p-5"
              data-reveal
              style={{ "--reveal-delay": `${li * 90}ms` } as React.CSSProperties}
            >
              <h4 className="font-mono text-sm text-accent">
                {lineage.problem}
              </h4>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                {lineage.why}
              </p>

              <ol className="mt-5 space-y-0">
                {lineage.generations.map((gen, i) => {
                  const last = i === lineage.generations.length - 1;
                  return (
                    <li key={`${gen.repo}-${gen.label}`} className="flex gap-4">
                      {/* rail */}
                      <div className="flex flex-col items-center">
                        <span
                          className={`mt-1 size-2.5 shrink-0 rounded-full border-2 ${
                            gen.current
                              ? "border-ok bg-ok/30"
                              : "border-line-2 bg-panel"
                          }`}
                        />
                        {!last ? (
                          <span className="my-1 w-px flex-1 bg-line" />
                        ) : null}
                      </div>

                      <div className={last ? "pb-0" : "pb-6"}>
                        <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                          <span className="font-mono text-2xs text-dim">
                            {gen.label}
                          </span>
                          <ExternalLink
                            href={`${profile.github}/${gen.repo}`}
                            logAs={`repo/${gen.repo}`}
                            className="font-mono text-xs text-text transition-colors hover:text-accent"
                          >
                            {gen.repo}
                          </ExternalLink>
                          <span className="font-mono text-2xs text-line-2">
                            {gen.period}
                          </span>
                          {gen.current ? (
                            <span className="rounded border border-ok/25 bg-ok/8 px-1.5 font-mono text-2xs text-ok">
                              current
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 font-mono text-2xs text-muted">
                          {gen.stack}
                          {gen.host ? (
                            <span className="text-dim"> · {gen.host}</span>
                          ) : null}
                        </p>
                        <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted">
                          {gen.note}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function RepoCard({
  repo,
  now,
  active,
  delay,
}: {
  repo: Repo;
  now: string;
  active: boolean;
  delay: number;
}) {
  const note = buildNotes[repo.name];
  const languages = meaningfulLanguages(repo);
  const stale =
    new Date(now).getTime() - new Date(repo.pushedAt).getTime() >
    365 * 86_400_000;

  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-line bg-panel"
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <div className="flex items-center gap-2 border-b border-line bg-panel-2/40 px-4 py-2.5">
        <StatusDot
          color={repo.archived || stale ? "bg-dim" : "bg-ok"}
          pulse={!repo.archived && !stale}
        />
        <span className="truncate font-mono text-2xs text-muted">
          {repo.name}
        </span>
        {active ? (
          <a
            href="#now"
            className="shrink-0 rounded border border-ok/25 bg-ok/8 px-1.5 py-0.5 font-mono text-2xs text-ok transition-colors hover:bg-ok/15"
            title="Currently pushing to this — see What I'm building"
          >
            active now
          </a>
        ) : null}
        <span className="ml-auto shrink-0 font-mono text-2xs text-dim">
          {repo.archived ? "archived" : relativeTime(repo.pushedAt, now)}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="text-lg font-semibold tracking-tight text-text">
            {note?.title ?? repo.name}
          </h3>
          {repo.commitCount ? (
            <span className="font-mono text-2xs text-dim">
              {repo.commitCount} commits
            </span>
          ) : null}
        </div>

        <p className="mt-3 text-sm leading-relaxed text-muted">
          {note?.blurb ?? repo.description ?? "No description yet."}
        </p>

        {note?.highlights?.length ? (
          <ul className="mt-4 space-y-1.5">
            {note.highlights.map((h) => (
              <li
                key={h}
                className="flex gap-2 text-xs leading-relaxed text-text"
              >
                <CornerArrow className="mt-0.5 shrink-0 text-dim" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {note?.caveat ? (
          <p className="mt-4 rounded-lg border border-line bg-panel-2/50 p-3 text-xs leading-relaxed text-muted">
            <span className="font-mono text-2xs text-accent">note — </span>
            {note.caveat}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {languages.map((lang) => (
            <span
              key={lang}
              className="rounded-md border border-line-2 bg-panel-2 px-2 py-0.5 font-mono text-2xs text-muted"
            >
              {lang}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
          <ExternalLink
            href={repo.url}
            logAs={`repo/${repo.name}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line-2 bg-panel-2 px-3 py-1.5 font-mono text-2xs text-text transition-colors hover:border-accent/40 hover:text-accent"
          >
            source
            <ArrowIcon />
          </ExternalLink>
          {note?.liveUrl ?? repo.homepage ? (
            <ExternalLink
              href={note?.liveUrl ?? repo.homepage!}
              logAs={note?.liveLabel ?? repo.homepage!}
              className="inline-flex items-center gap-1.5 rounded-lg border border-ok/25 bg-ok/8 px-3 py-1.5 font-mono text-2xs text-ok transition-colors hover:bg-ok/15"
            >
              live
              <ArrowIcon />
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
