// PROTOTYPE — throwaway. Variant A: River Gauge Board.
import type { Shaped } from "./data";
import GaugeRail from "./GaugeRail";

const INK = "#141816";
const comfortWeight = { daily: 7, fluent: 4.5, working: 2.5, learning: 1.2 } as const;
const comfortLabel = {
  daily: "reach for by default",
  fluent: "fluent, not my first pick now",
  working: "productive, supporting cast",
  learning: "actively learning",
} as const;

function Wave({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 1200 24" preserveAspectRatio="none" className="block h-6 w-full" aria-hidden="true">
      <path d="M0 14 C 100 2, 200 26, 300 14 S 500 2, 600 14 S 800 26, 900 14 S 1100 2, 1200 14 V24 H0 Z" fill={fill} />
    </svg>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-[family-name:var(--p-barlow)] text-[15px] font-bold tracking-[0.12em] text-[#141816] uppercase">
      {children}
    </p>
  );
}

/** E only: a note in his own words, pinned to an exact reading. */
function Note({ at, children }: { at: string; children: React.ReactNode }) {
  return (
    <aside className="relative border-l-[3px] border-[#d7322a] pl-4">
      <p className="font-[family-name:var(--p-barlow)] text-[14px] font-bold tracking-[0.1em] text-[#d7322a] uppercase tabular-nums">
        Note · {at}
      </p>
      <p className="mt-1 text-[15.5px] leading-[1.5] text-[#141816]/85">{children}</p>
    </aside>
  );
}

export default function RiverGauge({ d, voice = false }: { d: Shaped; voice?: boolean }) {
  const { profile, active } = d;
  return (
    <div
      className="min-h-screen bg-[#f6f7f4] text-[#141816] lg:grid lg:grid-cols-[150px_1fr]"
      style={{ fontFamily: "var(--p-archivo), system-ui, sans-serif" }}
    >
      <GaugeRail />

      <main>
        {/* READING */}
        <section id="g-top" className="flex min-h-[100svh] flex-col">
          <div className="flex flex-1 flex-col justify-center px-6 pt-10 pb-12 sm:px-12 lg:pr-20">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-[#141816] pb-3">
              <Kicker>{profile.name} · {profile.role}</Kicker>
              <Kicker>{profile.basedIn} · {profile.tzLabel}</Kicker>
            </div>
            <h1
              className="mt-10 max-w-[14ch] text-[clamp(3rem,8vw,8.25rem)] leading-[0.9] font-extrabold tracking-[-0.02em] text-balance"
              style={{ fontStretch: "118%" }}
            >
              {profile.tagline[0]}
            </h1>
            <div className={voice ? "mt-8 grid items-end gap-8 xl:grid-cols-[1fr_20rem]" : ""}>
              <p className={`${voice ? "" : "mt-8 "}max-w-[34ch] text-[clamp(1.35rem,2.4vw,2.1rem)] leading-[1.18] font-medium`}>
                {profile.tagline.slice(1).join(" ")}
              </p>
              {voice && (
                <Note at={`${profile.careerStart.replace("-", "·")} → now`}>
                  {profile.summary.split(". ").at(-1)}
                </Note>
              )}
            </div>
          </div>

          {/* water band: the current reading */}
          <div className="text-white">
            <Wave fill="#3d6e6a" />
            <dl className="grid gap-6 bg-[#3d6e6a] px-6 pt-4 pb-8 sm:grid-cols-3 sm:px-12 lg:pr-20">
              {[
                ["Now", `${active.title}, ${active.company}`, `since ${active.start.replace("-", "·")}`],
                ["Based", profile.basedIn, `${profile.region} · ${profile.tzLabel}`],
                d.lastPush
                  ? ["Last push", d.lastPush.repo, `${d.lastPush.when}${d.live ? "" : " · snapshot"}`]
                  : ["Last push", "—", "GitHub unreachable"],
              ].map(([k, v, s]) => (
                <div key={k} className="border-t border-white/50 pt-3">
                  <dt className="font-[family-name:var(--p-barlow)] text-sm font-bold tracking-[0.12em] uppercase opacity-80">{k}</dt>
                  <dd className="mt-1 text-lg leading-snug font-semibold">{v}</dd>
                  <dd className="font-[family-name:var(--p-barlow)] text-base tabular-nums opacity-80">{s}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* WORK */}
        <section id="g-work" className="px-6 py-24 sm:px-12 lg:pr-20">
          <Kicker>Readings · {d.roles.at(-1)!.start.slice(0, 4)} → now</Kicker>
          <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.75rem)] leading-none font-extrabold" style={{ fontStretch: "112%" }}>
            Where the work happened
          </h2>

          <ol className="mt-14">
            {d.roles.map((r) => {
              const php = r.id === "cloone";
              return (
                <li key={r.id} className={`relative grid gap-x-10 gap-y-3 border-t-2 border-[#141816] py-10 md:grid-cols-[13rem_1fr] ${voice ? "xl:grid-cols-[11rem_1fr_19rem]" : ""}`}>
                  {r.end === null && <span className="absolute -top-[2px] left-0 h-[6px] w-28 bg-[#2f8f4e]" aria-hidden="true" />}
                  <div className="font-[family-name:var(--p-barlow)] leading-tight">
                    <p className="text-2xl font-bold tabular-nums uppercase">{r.period}</p>
                    <p className="text-lg text-[#141816]/70">{r.duration}</p>
                  </div>
                  <div>
                    <h3 className="text-3xl leading-tight font-bold" style={{ fontStretch: "108%" }}>{r.company}</h3>
                    <p className="mt-1 text-lg font-medium text-[#141816]/75">{r.title}</p>
                    <p className="mt-4 max-w-[62ch] text-[17px] leading-relaxed">{r.summary}</p>
                    <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {r.projects.map((p) => (
                        <li key={p.slug} className="flex items-baseline gap-3 border-b border-[#141816]/20 pb-2">
                          <span className="mt-[2px] h-[3px] w-4 shrink-0 bg-[#141816]" aria-hidden="true" />
                          <span className="font-semibold">{p.name}</span>
                          {p.outcome && (
                            <span className="ml-auto shrink-0 font-[family-name:var(--p-barlow)] text-[15px] font-bold text-[#3d6e6a] uppercase">
                              {p.outcome}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {php && (
                      <div className="mt-8 flex items-center gap-3" aria-label="High-water mark">
                        <span className="h-[3px] flex-1 bg-[#d7322a]" />
                        <span className="font-[family-name:var(--p-barlow)] text-[15px] font-bold tracking-[0.1em] text-[#d7322a] uppercase">
                          High-water mark · the PHP era, 2021–2024
                        </span>
                      </div>
                    )}
                  </div>
                  {voice && r.voice.length > 0 && (
                    <div className="space-y-6 md:col-start-2 xl:col-start-3 xl:row-start-1 xl:pt-1">
                      {r.voice.map((v) => (
                        <Note key={v} at={r.period.split(" — ")[0]}>{v}</Note>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        {/* LANGUAGES */}
        <section id="g-lang" className="border-y-2 border-[#141816] bg-white px-6 py-24 sm:px-12 lg:pr-20">
          <Kicker>Calibration</Kicker>
          <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.75rem)] leading-none font-extrabold" style={{ fontStretch: "112%" }}>
            How sure I am, drawn as mark weight
          </h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            <ul className="space-y-8">
              {d.comfort.map((c) => (
                <li key={c.name}>
                  <div className="flex items-end gap-4">
                    <div className="flex h-10 items-end gap-[5px]" aria-hidden="true">
                      {Array.from({ length: 10 }, (_, i) => (
                        <span key={i} className="bg-[#141816]" style={{ width: comfortWeight[c.level], height: i % 5 === 0 ? 40 : 24 }} />
                      ))}
                    </div>
                    <div>
                      <p className="text-xl leading-tight font-bold">{c.name}</p>
                      <p className="font-[family-name:var(--p-barlow)] text-base font-medium text-[#141816]/70 uppercase">
                        {comfortLabel[c.level]} · {c.period}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 max-w-[60ch] text-[16px] leading-relaxed">{c.note}</p>
                </li>
              ))}
            </ul>
            <div>
              <p className="text-lg font-bold">What I actually wrote, by year started</p>
              <p className="text-[15px] text-[#141816]/70">Language bytes in my public repos, from GitHub{d.live ? "" : " (snapshot)"}.</p>
              <div className="mt-6 space-y-5">
                {d.eras.map((e) => (
                  <div key={e.year} className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
                    <span className="font-[family-name:var(--p-barlow)] text-xl font-bold tabular-nums">{e.year}</span>
                    <div className="flex h-9 border-2 border-[#141816]">
                      {e.languages.map((l, i) => (
                        <div
                          key={l.name}
                          className="flex items-center overflow-hidden px-1.5 font-[family-name:var(--p-barlow)] text-[13px] font-bold whitespace-nowrap uppercase"
                          style={{
                            width: `${l.share}%`,
                            background: ["#141816", "#3d6e6a", "#f6f7f4", "#f2b318"][i % 4],
                            color: i % 4 === 0 || i % 4 === 1 ? "#fff" : INK,
                          }}
                          title={`${l.name} ${l.share.toFixed(0)}%`}
                        >
                          {l.share > 12 ? l.name : ""}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BUILDS */}
        <section id="g-builds" className="px-6 py-24 sm:px-12 lg:pr-20">
          <Kicker>Built outside work</Kicker>
          <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.75rem)] leading-none font-extrabold" style={{ fontStretch: "112%" }}>
            Things that run
          </h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-2">
            {d.projects.map((p) => (
              <article key={p.id}>
                {p.shot && (
                  <a href={p.url} className="block border-2 border-[#141816]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.shot.src} alt={p.shot.alt} width={p.shot.width} height={p.shot.height} className="block h-auto w-full" />
                  </a>
                )}
                <h3 className="mt-5 text-2xl font-bold">{p.name}</h3>
                <p className="font-[family-name:var(--p-barlow)] text-base font-bold text-[#3d6e6a] uppercase">{p.status} · {p.slug}</p>
                <p className="mt-3 max-w-[58ch] text-[16px] leading-relaxed">{p.detail}</p>
              </article>
            ))}
          </div>
          <table className="mt-16 w-full border-t-2 border-[#141816] text-left">
            <caption className="sr-only">Recent public repositories</caption>
            <tbody>
              {d.repos.map((r) => (
                <tr key={r.name} className="border-b border-[#141816]/25">
                  <td className="py-3 pr-4 font-semibold"><a href={r.url} className="underline decoration-2 underline-offset-4 hover:text-[#3d6e6a]">{r.name}</a></td>
                  <td className="hidden py-3 pr-4 text-[15px] text-[#141816]/75 md:table-cell">{r.description}</td>
                  <td className="py-3 pr-4 font-[family-name:var(--p-barlow)] text-base tabular-nums">{r.commits ?? "—"} commits</td>
                  <td className="py-3 text-right font-[family-name:var(--p-barlow)] text-base tabular-nums">{r.pushed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* REACH */}
        <section id="g-reach" className="bg-[#141816] px-6 py-24 text-white sm:px-12 lg:pr-20">
          <p className="font-[family-name:var(--p-barlow)] text-[15px] font-bold tracking-[0.12em] uppercase opacity-70">Reach</p>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(2.2rem,5vw,4.5rem)] leading-[0.95] font-extrabold" style={{ fontStretch: "115%" }}>
            Easiest through GitHub or LinkedIn.
          </h2>
          <div className="mt-10 flex flex-col gap-4 text-2xl font-semibold sm:flex-row sm:gap-12">
            <a href={profile.github} className="underline decoration-[#f2b318] decoration-4 underline-offset-8 hover:text-[#f2b318]">{profile.githubLabel}</a>
            <a href={profile.linkedin} className="underline decoration-[#f2b318] decoration-4 underline-offset-8 hover:text-[#f2b318]">{profile.linkedinLabel}</a>
          </div>
        </section>
      </main>
    </div>
  );
}
