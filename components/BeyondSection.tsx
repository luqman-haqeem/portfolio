import { beyondCode, starThemes } from "@/lib/resume";
import type { GithubData } from "@/lib/github";
import ExternalLink from "./ExternalLink";
import { ArrowIcon, Section, SectionHeading } from "./ui";

export default function BeyondSection({ data }: { data: GithubData }) {
  const starsByName = new Map(data.starred.map((s) => [s.fullName, s]));
  const themed = new Set(starThemes.flatMap((t) => t.repos));
  const unthemed = data.starred.filter((s) => !themed.has(s.fullName));

  return (
    <Section id="beyond">
      <SectionHeading
        index="05"
        route="beyond"
        title="Beyond the code I get paid for"
        description={
          <>
            The stuff that doesn&apos;t fit on a résumé: why I build what I
            build, and what I&apos;ve been reading. My starred repos are public
            anyway — I&apos;d rather group them honestly than pretend they say
            something flattering.
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        {beyondCode.map((item, i) => (
          <div
            key={item.tag}
            className="rounded-xl border border-line bg-panel p-5"
            data-reveal
            style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
          >
            <span className="font-mono text-2xs" style={{ color: item.accent }}>
              {item.tag}
            </span>
            <h3 className="mt-2.5 text-base font-medium text-text">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1" data-reveal>
          <h3 className="text-xl font-semibold tracking-tight text-text">
            What I&apos;ve been reading
          </h3>
          <span className="font-mono text-2xs text-dim">
            {data.starred.length} starred repos, grouped
          </span>
        </div>

        <div className="space-y-3">
          {starThemes.map((theme, i) => {
            const repos = theme.repos
              .map((name) => starsByName.get(name))
              .filter((r): r is NonNullable<typeof r> => r !== undefined);
            if (repos.length === 0) return null;

            return (
              <div
                key={theme.label}
                className="rounded-xl border border-line bg-panel p-5"
                data-reveal
                style={{ "--reveal-delay": `${i * 55}ms` } as React.CSSProperties}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h4
                    className="font-mono text-sm"
                    style={{ color: theme.accent }}
                  >
                    {theme.label}
                  </h4>
                  <span className="font-mono text-2xs text-line-2">
                    {repos.length} repo{repos.length === 1 ? "" : "s"}
                  </span>
                </div>

                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                  {theme.note}
                </p>

                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {repos.map((repo) => (
                    <li key={repo.fullName}>
                      <ExternalLink
                        href={repo.url}
                        logAs={`star/${repo.fullName}`}
                        className="group inline-flex items-center gap-1.5 rounded-md border border-line-2 bg-panel-2 px-2 py-1 font-mono text-2xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                        {...{ title: repo.description ?? undefined }}
                      >
                        {repo.fullName.split("/")[1]}
                        {repo.language ? (
                          <span className="text-line-2 group-hover:text-accent/60">
                            {repo.language}
                          </span>
                        ) : null}
                        <ArrowIcon className="text-line-2" />
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {unthemed.length > 0 ? (
            <p className="pt-1 font-mono text-2xs text-dim" data-reveal>
              + {unthemed.length} more that don&apos;t fit a tidy category.
            </p>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
