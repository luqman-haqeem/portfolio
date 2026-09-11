import { profile, roles } from "@/lib/resume";
import { coarseUptime, formatMonth } from "@/lib/trace";
import LiveStats from "./LiveStats";
import PrintButton from "./PrintButton";
import { ArrowIcon, StatRow, StatusDot } from "./ui";

export default function Hero() {
  const active = roles.find((r) => r.end === null) ?? roles[roles.length - 1];

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[46rem] -translate-x-1/2 rounded-full bg-accent/6 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-3 py-1.5 font-mono text-2xs text-muted backdrop-blur"
            data-reveal
          >
            <StatusDot color="bg-ok" />
            <span className="text-ok">healthy</span>
            <span className="text-line-2">·</span>
            <span>{profile.status.toLowerCase()}</span>
          </div>

          <h1
            className="mt-7 text-4xl font-semibold tracking-tight text-balance sm:text-6xl"
            data-reveal
            style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
          >
            {profile.name}
          </h1>

          <p
            className="mt-3 font-mono text-sm text-accent sm:text-base"
            data-reveal
            style={{ "--reveal-delay": "110ms" } as React.CSSProperties}
          >
            {profile.role}
          </p>

          <div
            className="mt-8 max-w-xl space-y-1.5 text-lg leading-snug text-text sm:text-xl"
            data-reveal
            style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
          >
            {profile.tagline.map((line, i) => (
              <p key={line} className={i === 0 ? "text-muted" : ""}>
                {line}
              </p>
            ))}
          </div>

          <p
            className="mt-6 max-w-xl text-sm leading-relaxed text-muted"
            data-reveal
            style={{ "--reveal-delay": "210ms" } as React.CSSProperties}
          >
            {profile.summary}
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3"
            data-reveal
            style={{ "--reveal-delay": "260ms" } as React.CSSProperties}
          >
            <a
              href="#trace"
              className="group inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent/85"
            >
              Read the career trace
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className="size-3.5 transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              >
                <path
                  d="M8 3v10M8 13l-4-4M8 13l4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#builds"
              className="inline-flex items-center gap-2 rounded-lg border border-line-2 bg-panel px-4 py-2.5 text-sm text-text transition-colors hover:border-accent/40 hover:bg-panel-2"
            >
              What I&apos;ve built
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line-2 bg-panel px-4 py-2.5 text-sm text-text transition-colors hover:border-accent/40 hover:bg-panel-2"
            >
              GitHub
              <ArrowIcon className="text-dim" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line-2 bg-panel px-4 py-2.5 text-sm text-text transition-colors hover:border-accent/40 hover:bg-panel-2"
            >
              LinkedIn
              <ArrowIcon className="text-dim" />
            </a>
            <PrintButton className="inline-flex items-center gap-1.5 px-1 font-mono text-2xs text-dim underline decoration-line-2 underline-offset-4 transition-colors hover:text-muted">
              or print as résumé
            </PrintButton>
          </div>
        </div>

        <div
          className="min-w-0 lg:col-span-5"
          data-reveal
          style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
        >
          <div className="rounded-xl border border-line bg-panel/90 shadow-2xl shadow-black/40 backdrop-blur">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2 rounded-full bg-line-2" />
                <span className="size-2 rounded-full bg-line-2" />
                <span className="size-2 rounded-full bg-line-2" />
              </span>
              <span className="ml-1 font-mono text-2xs text-muted">
                {profile.service}
              </span>
              <span className="ml-auto rounded border border-ok/25 bg-ok/8 px-1.5 py-0.5 font-mono text-2xs text-ok">
                prod
              </span>
            </div>

            <StatRow label="status" first>
              <span className="inline-flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-ok" />
                <span className="text-ok">healthy</span>
              </span>
            </StatRow>

            <LiveStats fallbackUptime={coarseUptime()} />

            <StatRow label="region">
              <span className="text-text">{profile.region}</span>
            </StatRow>

            <StatRow label="active span">
              <a
                href={`#role-${active.id}`}
                className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
              >
                {active.service}
              </a>
            </StatRow>

            <StatRow label="since">
              <span className="text-muted">{formatMonth(active.start)}</span>
            </StatRow>

            <div className="border-t border-line px-4 py-3">
              <p className="font-mono text-2xs text-dim">primary runtimes</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.runtimes.map((r) => (
                  <span
                    key={r}
                    className="rounded-md border border-line-2 bg-panel-2 px-2 py-1 font-mono text-2xs text-muted"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
