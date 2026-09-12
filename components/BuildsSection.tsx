import {
  buildNotes,
  lineages,
  profile,
  projects,
  type Project,
} from "@/lib/resume";
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

  /**
   * One grid, newest first, with closed-source products slotted in after the
   * repo named by their `pinAfter`. Keeping them in a separate group below
   * everything buried a live product under a 2020 student project.
   */
  const ordered: ({ kind: "repo"; repo: Repo } | { kind: "product"; project: Project })[] =
    [];
  for (const repo of repos) {
    ordered.push({ kind: "repo", repo });
    for (const project of closedSource) {
      if (project.pinAfter === repo.name) {
        ordered.push({ kind: "product", project });
      }
    }
  }
  for (const project of closedSource) {
    if (!project.pinAfter || !repos.some((r) => r.name === project.pinAfter)) {
      ordered.push({ kind: "product", project });
    }
  }

  const totalCommits = repos.reduce((sum, r) => sum + (r.commitCount ?? 0), 0);

  return (
    <Section id="builds">
      <SectionHeading
        index="03"
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
            {repos.length + closedSource.length} builds · newest first
          </span>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {ordered.map((entry, i) =>
          entry.kind === "repo" ? (
            <RepoCard
              key={entry.repo.name}
              repo={entry.repo}
              now={data.now}
              active={activeNames.has(entry.repo.name)}
              delay={i * 60}
            />
          ) : (
            <ProductCard
              key={entry.project.id}
              project={entry.project}
              delay={i * 60}
            />
          ),
        )}
      </div>

      {/* --------------------------- rebuild lineage --------------------------- */}
      <div className="mt-16 border-t border-line pt-12">
        {lineages.map((lineage, li) => (
          <div key={lineage.problem} className={li > 0 ? "mt-14" : ""}>
            <div className="mb-8" data-reveal>
              <p className="font-mono text-2xs text-accent">
                rewritten {lineage.generations.length} times
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-text">
                {lineage.problem}
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                {lineage.why}
              </p>
            </div>

            <div className="relative">
              {/* rail the generations sit on, desktop only */}
              <div
                className="absolute top-1.5 left-1 hidden h-px bg-line sm:block"
                style={{ right: "0.25rem" }}
                aria-hidden="true"
              />

              <ol className="grid gap-6 sm:grid-cols-3 sm:gap-5">
                {lineage.generations.map((gen, i) => (
                  <li
                    key={`${gen.repo}-${gen.label}`}
                    className="relative"
                    data-reveal
                    style={
                      { "--reveal-delay": `${i * 90}ms` } as React.CSSProperties
                    }
                  >
                    <span
                      className={`absolute top-0 left-0 size-3 rounded-full border-2 ${
                        gen.current
                          ? "border-ok bg-ok/30"
                          : "border-line-2 bg-bg"
                      }`}
                      aria-hidden="true"
                    />

                    <div className="pt-7 pl-0 sm:pt-8">
                      <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                        <span
                          className={`font-mono text-sm ${
                            gen.current ? "text-ok" : "text-muted"
                          }`}
                        >
                          {gen.label}
                        </span>
                        <span className="font-mono text-2xs text-dim">
                          {gen.period}
                        </span>
                        {gen.current ? (
                          <span className="rounded border border-ok/25 bg-ok/8 px-1.5 font-mono text-2xs text-ok">
                            current
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-2 font-mono text-xs leading-relaxed text-text">
                        {gen.stack}
                      </p>
                      {gen.host ? (
                        <p className="mt-0.5 font-mono text-2xs text-dim">
                          on {gen.host}
                        </p>
                      ) : null}

                      <p className="mt-3 text-sm leading-relaxed text-muted">
                        {gen.note}
                      </p>

                      <ExternalLink
                        href={`${profile.github}/${gen.repo}`}
                        logAs={`repo/${gen.repo}`}
                        className="mt-3 inline-flex items-center gap-1 font-mono text-2xs text-dim transition-colors hover:text-accent"
                      >
                        {gen.repo}
                        <ArrowIcon />
                      </ExternalLink>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ProductCard({
  project,
  delay,
}: {
  project: Project;
  delay: number;
}) {
  return (
    <article
      className="flex flex-col overflow-hidden rounded-xl border border-line bg-panel"
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      <div className="flex items-center gap-2 border-b border-line bg-panel-2/40 px-4 py-2.5">
        <StatusDot color="bg-ok" />
        <span className="truncate font-mono text-2xs text-muted">
          {project.slug}
        </span>
        <span className="ml-auto shrink-0 rounded border border-line-2 px-1.5 py-0.5 font-mono text-2xs text-dim">
          source not public
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
            <li key={h} className="flex gap-2 text-xs leading-relaxed text-text">
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
          <span className="shrink-0 rounded border border-ok/25 bg-ok/8 px-1.5 py-0.5 font-mono text-2xs text-ok">
            active
          </span>
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
