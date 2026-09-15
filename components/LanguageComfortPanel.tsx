import { comfortMeta, languageComfort, profile } from "@/lib/resume";
import { languageColors, languageEras, type GithubData } from "@/lib/github";
import ExternalLink from "./ExternalLink";
import { DataLabel, Marginalia } from "./ui";

/**
 * Two claims side by side: what I say I reach for, and what the repos say.
 *
 * Both halves used to be `rounded-xl border border-line bg-panel` — six boxed
 * list items on the left and a box-with-a-header-strip on the right. A ranked
 * list is tabular, so it gets rules; the counter-evidence is an aside, so it
 * gets a single top rule and no fill. Neither is a discrete object worth a card.
 *
 * The grid is 5-column 3/2 rather than the 12-column 7/5 used in StackTopology.
 * Two panels in the same section resolving into the same proportions is what
 * made this page read as one repeated template.
 */
export default function LanguageComfortPanel({ data }: { data: GithubData }) {
  const eras = languageEras(data.repos);

  return (
    <div className="grid gap-x-10 gap-y-12 lg:grid-cols-5 lg:gap-x-12">
      <div className="min-w-0 lg:col-span-3">
        <h4 className="text-sm text-muted">what I reach for, honestly ranked</h4>

        <ul className="mt-4">
          {languageComfort.map((lang, i) => {
            const meta = comfortMeta[lang.level];
            return (
              <li
                key={lang.name}
                className="border-t border-line py-5"
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
                  <DataLabel className="ml-auto">{lang.period}</DataLabel>
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
                    <DataLabel className="text-line-2">proof:</DataLabel>
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

      <div className="min-w-0 lg:col-span-2">
        <div
          className="border-t border-line pt-5 lg:sticky lg:top-20"
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
        >
          <h4 className="text-sm text-muted">
            and what my repos actually say
          </h4>

          <p className="mt-3 text-xs leading-relaxed text-muted">
            Language bytes in the repos I started each year, straight from the
            GitHub API. I claim my stack moved from PHP to TypeScript and
            Python — this is the receipt.
          </p>

          <div className="mt-5 space-y-3.5">
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
          </div>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-line pt-3">
            {[...new Set(eras.flatMap((e) => e.languages.map((l) => l.name)))].map(
              (name) => (
                <Marginalia
                  key={name}
                  as="span"
                  className="inline-flex items-center gap-1.5 font-mono"
                >
                  <span
                    className="size-2 rounded-sm"
                    style={{
                      background: languageColors[name] ?? "var(--color-dim)",
                    }}
                  />
                  {name}
                </Marginalia>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
