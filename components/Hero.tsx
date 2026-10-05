import { profile, roles } from "@/lib/resume";
import { coarseUptime, formatMonth } from "@/lib/trace";
import LiveStats from "./LiveStats";
import PrintButton from "./PrintButton";
import { ArrowIcon, DataLabel, Marginalia, StatRow, StatusDot } from "./ui";

export default function Hero() {
  const active = roles.find((r) => r.end === null) ?? roles[roles.length - 1];

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line"
    >
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-70" />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pt-28 pb-16 sm:px-8 sm:pt-36 sm:pb-24 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-7">
          {/* `healthy` used to lead this pill. A person is not a service with a
              health check, and the previous pass removed the hand-drawn traffic
              lights for exactly that reason — claiming to be software. This says
              the one thing a visitor actually wants from a status line. */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-3 py-1.5 font-mono text-2xs text-muted backdrop-blur"
            data-reveal
          >
            <StatusDot color="bg-ok" />
            <span>{profile.status.toLowerCase()}</span>
          </div>

          <h1
            className="mt-7 font-display text-5xl leading-[0.95] text-balance sm:text-7xl"
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
          </div>

          {/* GitHub, LinkedIn and print used to sit here as three more buttons.
              Five equal-weight buttons is not five options, it is no
              recommendation — and all three are reachable from the footer and
              the contact section anyway. Demoted to one text line so the two
              buttons above actually read as the two things to do. */}
          <div
            className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-2xs text-dim"
            data-reveal
            style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-muted"
            >
              {profile.githubLabel}
              <ArrowIcon className="size-3" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-muted"
            >
              {profile.linkedinLabel}
              <ArrowIcon className="size-3" />
            </a>
            <PrintButton className="inline-flex items-center gap-1.5 transition-colors hover:text-muted">
              print as résumé
            </PrintButton>
          </div>
        </div>

        <div
          className="min-w-0 lg:col-span-5"
          data-reveal
          style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
        >
          {/* A record, not a window — and now not a service either.
              This panel used to open with a `luqman.service` name and a green
              `prod` badge, then report `status: healthy`, `uptime` and `region`.
              A previous pass removed the fake macOS traffic lights from this
              same header for claiming to be software; `prod` and `healthy` make
              that identical claim in words instead of pixels. A portfolio has no
              uptime and is not deployed to a region.

              Every value below is the same value as before, relabelled to what
              it actually is. The trace section keeps the span vocabulary in
              full, because there it describes real nested durations. */}
          <div className="border-t border-line-2 pt-5">
            <DataLabel>currently</DataLabel>
            <p className="mt-2 font-display text-2xl leading-snug text-text">
              <a
                href={`#role-${active.id}`}
                className="underline decoration-accent/40 underline-offset-[6px] transition-colors hover:decoration-accent"
              >
                {active.service}
              </a>
            </p>
            <Marginalia className="mt-2">
              since {formatMonth(active.start)}
            </Marginalia>

            <div className="mt-6">
              <LiveStats fallbackUptime={coarseUptime()} />
              <StatRow label="based in">
                <span className="text-text">{profile.region}</span>
              </StatRow>
            </div>

            <div className="mt-6">
              <DataLabel>primary runtimes</DataLabel>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
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
