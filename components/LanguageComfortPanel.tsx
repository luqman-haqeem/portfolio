import { comfortMeta, languageComfort, profile } from "@/lib/resume";
import { languageColors, languageEras, type GithubData } from "@/lib/github";
import ExternalLink from "./ExternalLink";

export default function LanguageComfortPanel({ data }: { data: GithubData }) {
  const eras = languageEras(data.repos);

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <div className="min-w-0 lg:col-span-7">
        <p className="font-mono text-2xs text-dim">
          what I reach for, honestly ranked
        </p>

        <ul className="mt-3 space-y-2.5">
          {languageComfort.map((lang, i) => {
            const meta = comfortMeta[lang.level];
            return (
              <li
                key={lang.name}
                className="rounded-xl border border-line bg-panel p-4"
                data-reveal
                style={{ "--reveal-delay": `${i * 50}ms` } as React.CSSProperties}
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="font-mono text-sm text-text">
                    {lang.name}
                  </span>
                  <span
                    className={`rounded border px-1.5 py-0.5 font-mono text-2xs ${meta.className}`}
                  >
                    {meta.label}
                  </span>
                  <span className="ml-auto font-mono text-2xs text-dim">
                    {lang.period}
                  </span>
                </div>

                <div
                  className="mt-2.5 h-1 overflow-hidden rounded-full bg-line"
                  role="presentation"
                >
                  <div
                    className="span-bar h-full rounded-full"
                    style={{
                      width: `${meta.weight}%`,
                      background: meta.bar,
                      "--bar-delay": `${i * 50 + 120}ms`,
                    } as React.CSSProperties}
                  />
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {lang.note}
                </p>

                {lang.evidence.length > 0 ? (
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-2xs text-line-2">
                      proof:
                    </span>
                    {lang.evidence.map((repo) => (
                      <ExternalLink
                        key={repo}
                        href={`${profile.github}/${repo}`}
                        logAs={`repo/${repo}`}
                        className="rounded-md border border-line-2 bg-panel-2 px-2 py-0.5 font-mono text-2xs text-muted transition-colors hover:border-accent/40 hover:text-accent"
                      >
                        {repo}
                      </ExternalLink>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="min-w-0 lg:col-span-5">
        <div
          className="lg:sticky lg:top-20"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <div className="rounded-xl border border-line bg-panel">
            <div className="border-b border-line px-4 py-2.5">
              <p className="font-mono text-2xs text-muted">
                and what my repos actually say
              </p>
            </div>

            <div className="space-y-3.5 p-4">
              <p className="text-xs leading-relaxed text-muted">
                Language bytes in the repos I started each year, straight from
                the GitHub API. I claim my stack moved from PHP to
                TypeScript and Python — this is the receipt.
              </p>

              {eras.map((era) => (
                <div key={era.year}>
                  <div className="flex items-baseline justify-between font-mono text-2xs">
                    <span className="text-dim">{era.year}</span>
                    <span className="text-line-2">
                      mostly {era.languages[0]?.name}
                    </span>
                  </div>
                  <div className="mt-1 flex h-2 gap-px overflow-hidden rounded-full bg-line">
                    {era.languages.map((lang) => (
                      <div
                        key={lang.name}
                        title={`${lang.name} ${lang.share.toFixed(0)}%`}
                        style={{
                          width: `${lang.share}%`,
                          background:
                            languageColors[lang.name] ?? "var(--color-dim)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-x-3 gap-y-1.5 border-t border-line pt-3">
                {[...new Set(eras.flatMap((e) => e.languages.map((l) => l.name)))].map(
                  (name) => (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1.5 font-mono text-2xs text-dim"
                    >
                      <span
                        className="size-2 rounded-sm"
                        style={{
                          background:
                            languageColors[name] ?? "var(--color-dim)",
                        }}
                      />
                      {name}
                    </span>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
