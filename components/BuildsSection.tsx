import { buildNotes, lineages, projects, type Shot } from "@/lib/resume";
import {
  findRepo,
  meaningfulLanguages,
  relativeTime,
  selectActive,
  type GithubData,
  type Repo,
} from "@/lib/github";
import { OutArrow, Reading, SectionHead } from "./ui";

/** Only the last three years are showcased; older repos get one quiet line. */
const WINDOW_MS = 3 * 365.25 * 24 * 60 * 60 * 1000;

function Screenshot({ shot, href }: { shot: Shot; href?: string }) {
  // Pre-sized WebP, served as-is rather than through an optimiser.
  // eslint-disable-next-line @next/next/no-img-element
  const img = <img src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} loading="lazy" className="block h-auto w-full" />;
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block border-2 border-ink bg-plate hover:border-water">
      {img}
    </a>
  ) : (
    <div className="border-2 border-ink bg-plate">{img}</div>
  );
}

function RepoReading({ repo, now }: { repo: Repo; now: string }) {
  const langs = meaningfulLanguages(repo, 3);
  return (
    <Reading as="p" className="text-[15px] font-medium opacity-75 normal-case">
      {[repo.commitCount != null ? `${repo.commitCount} commits` : null, `pushed ${relativeTime(repo.pushedAt, now)}`, langs.join(" · ") || null]
        .filter(Boolean)
        .join(" · ")}
    </Reading>
  );
}

function OutLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold underline decoration-2 hover:text-water">
      {children}
      <OutArrow />
    </a>
  );
}

export default function BuildsSection({ github }: { github: GithubData }) {
  const { all } = selectActive(github, 2);
  const cutoff = new Date(github.now).getTime() - WINDOW_MS;
  const recent = all.filter((r) => new Date(r.pushedAt).getTime() >= cutoff);
  const older = all.filter((r) => new Date(r.pushedAt).getTime() < cutoff);
  const commits = recent.reduce((n, r) => n + (r.commitCount ?? 0), 0);
  // A repo whose count GitHub didn't return is a gap, not a zero.
  const uncounted = recent.filter((r) => r.commitCount == null).length;

  const lineage = lineages[0];
  const lineageRepos = new Set(lineage?.generations.map((g) => g.repo) ?? []);
  const lineageProject = projects.find((p) => p.repo && lineageRepos.has(p.repo));
  const lineageNote = lineageProject?.repo ? buildNotes[lineageProject.repo] : undefined;

  const closedSource = projects.filter((p) => !p.repo || !findRepo(github.repos, p.repo));
  const others = recent.filter((r) => !lineageRepos.has(r.name));

  return (
    <section id="builds" aria-labelledby="builds-title" className="px-5 py-24 sm:px-10 sm:py-32 lg:pr-16 xl:pr-24">
      <SectionHead
        id="builds"
        title="Things I built outside work"
        reading={`${recent.length} public repos · ${commits.toLocaleString("en")}${uncounted ? "+" : ""} commits · last 3 yrs`}
      >
        Repo counts and dates come live from GitHub{github.live ? "" : " (currently the committed snapshot)"}
        {uncounted ? `; ${uncounted} repo${uncounted === 1 ? "" : "s"} had no commit count, so the total is a floor` : ""}. The
        write-ups are mine.
      </SectionHead>

      {/* --- the long-running one: three rewrites read as levels on one gauge --- */}
      {lineage && (
        <article className="mt-14 grid gap-x-14 gap-y-10 xl:grid-cols-[1fr_1.05fr]" aria-labelledby="lineage-title">
          <div>
            <h3 id="lineage-title" className="stretch-semi text-[clamp(1.8rem,3vw,2.5rem)] leading-[1.05] font-extrabold text-balance">
              {lineage.problem}
            </h3>
            <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed">{lineage.why}</p>
            {lineageNote?.shot && (
              <div className="mt-8">
                <Screenshot shot={lineageNote.shot} href={lineageNote.liveUrl} />
              </div>
            )}
            {lineageNote?.liveUrl && (
              <p className="mt-4 text-[16px]">
                <OutLink href={lineageNote.liveUrl}>{lineageNote.liveLabel ?? "Open it"}</OutLink>
              </p>
            )}
          </div>

          <ol className="border-l-2 border-ink" aria-label="Rewrites, newest first">
            {[...lineage.generations].reverse().map((g) => {
              const repo = findRepo(github.repos, g.repo);
              return (
                <li key={g.label} className="relative pb-10 pl-7 last:pb-0">
                  <span
                    className={`absolute top-3 -left-0.5 h-[3px] ${g.current ? "w-6 bg-level-ok" : "w-4 bg-ink"}`}
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap items-baseline gap-x-4">
                    <Reading className="text-[28px] leading-none font-bold">{g.label}</Reading>
                    <Reading className="text-[17px] font-semibold">{g.period}</Reading>
                    {g.current && <Reading className="text-[15px] font-bold">current</Reading>}
                  </div>
                  <p className="mt-2 font-semibold">
                    {g.stack}
                    {g.host ? <span className="font-normal opacity-75"> on {g.host}</span> : null}
                  </p>
                  <p className="mt-2 max-w-[60ch] text-[16px] leading-relaxed">{g.note}</p>
                  {repo && (
                    <p className="mt-2">
                      <a href={repo.url} target="_blank" rel="noopener noreferrer" className="font-reading text-[15px] font-semibold tracking-[0.04em] underline decoration-2 hover:text-water">
                        {repo.name}
                      </a>
                    </p>
                  )}
                </li>
              );
            })}
          </ol>
        </article>
      )}

      {lineageNote?.highlights && (
        <ul className="mt-12 grid gap-x-10 gap-y-3 border-t-2 border-ink pt-6 md:grid-cols-2">
          {lineageNote.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-[16px] leading-relaxed">
              <span className="mt-[0.7em] h-[3px] w-4 shrink-0 bg-ink" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
      )}

      {/* --- everything else, newest first, as a ruled record --- */}
      <ol className="mt-24">
        {closedSource.map((p) => (
          <li key={p.id} className="grid gap-x-12 gap-y-6 border-t-2 border-ink py-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <h3 className="stretch-semi text-[clamp(1.6rem,2.6vw,2rem)] leading-tight font-bold">{p.name}</h3>
              <Reading as="p" className="mt-1 text-[16px] font-semibold text-water">
                {p.status} · closed source
              </Reading>
              <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed">{p.detail}</p>
              <ul className="mt-5 space-y-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[16px] leading-relaxed">
                    <span className="mt-[0.7em] h-[3px] w-4 shrink-0 bg-ink" aria-hidden="true" />
                    {h}
                  </li>
                ))}
              </ul>
              <Reading as="p" className="mt-5 text-[15px] font-medium opacity-75 normal-case">
                {p.stack.join(" · ")}
              </Reading>
              <p className="mt-4 text-[16px]">
                <OutLink href={p.url}>{p.slug}</OutLink>
              </p>
            </div>
            {p.shot && <Screenshot shot={p.shot} href={p.url} />}
          </li>
        ))}

        {others.map((repo) => {
          const note = buildNotes[repo.name];
          return (
            <li key={repo.name} className="grid gap-x-12 gap-y-4 border-t-2 border-ink py-10 lg:grid-cols-[1fr_1fr]">
              <div>
                <h3 className="stretch-semi text-[clamp(1.6rem,2.6vw,2rem)] leading-tight font-bold">{note?.title ?? repo.name}</h3>
                <RepoReading repo={repo} now={github.now} />
                <p className="mt-4 max-w-[60ch] text-[17px] leading-relaxed">
                  {note?.blurb ?? repo.description ?? "No description on GitHub yet."}
                </p>
                <p className="mt-4 text-[16px]">
                  <OutLink href={repo.url}>{repo.name} on GitHub</OutLink>
                </p>
              </div>
              <div>
                {note?.highlights && (
                  <ul className="space-y-2">
                    {note.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-[16px] leading-relaxed">
                        <span className="mt-[0.7em] h-[3px] w-4 shrink-0 bg-ink" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                {note?.caveat && (
                  <p className="mt-6 max-w-[60ch] border-t border-ink/25 pt-4 text-[16px] leading-relaxed">
                    <Reading className="mr-2 font-bold text-danger-ink">Note</Reading>
                    {note.caveat}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {older.length > 0 && (
        <div className="border-t-2 border-ink pt-6">
          <Reading as="p" className="text-[15px] font-bold opacity-75">Older than three years</Reading>
          <ul className="mt-3 space-y-3">
            {older.map((repo) => (
              <li key={repo.name} className="max-w-[80ch] text-[16px] leading-relaxed">
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-2 hover:text-water">
                  {buildNotes[repo.name]?.title ?? repo.name}
                </a>{" "}
                <Reading className="text-[15px] font-medium opacity-75 normal-case">
                  ({repo.createdAt.slice(0, 4)}{repo.commitCount != null ? ` · ${repo.commitCount} commits` : ""})
                </Reading>
                {buildNotes[repo.name]?.blurb ? ` ${buildNotes[repo.name].blurb}` : repo.description ? ` ${repo.description}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
