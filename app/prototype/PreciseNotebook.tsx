// PROTOTYPE — throwaway. Variant F: the Field Notebook, tightened with the gauge's precision.
// Handwriting only in the margins; every margin note pinned to an exact date or count.
import type { Shaped } from "./data";

const INK = "#1f3fbf";
const PENCIL = "#3b3e43";
const RED = "#c8402e";
const hand = "var(--p-kalam), cursive";
const cond = "var(--p-barlow), sans-serif";

function Reading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[15px] font-bold tracking-[0.08em] uppercase tabular-nums" style={{ fontFamily: cond, color: INK }}>
      {children}
    </p>
  );
}

function Scrawl({ children, tone = PENCIL }: { children: React.ReactNode; tone?: string }) {
  return (
    <p className="text-[18px] leading-[1.3]" style={{ fontFamily: hand, color: tone, fontWeight: 300 }}>
      {children}
    </p>
  );
}

/** One row of the page: margin (readings + scrawl) | body. */
function Row({ margin, children, id, className = "" }: { margin: React.ReactNode; children: React.ReactNode; id?: string; className?: string }) {
  return (
    <div id={id} className={`grid gap-x-12 gap-y-3 lg:grid-cols-[230px_1fr] ${className}`}>
      <div className="space-y-2 lg:pt-1 lg:text-right">{margin}</div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

function EntryHead({ n, reading, title, id }: { n: string; reading: string; title: string; id: string }) {
  return (
    <Row id={id} className="mt-28 border-t-2 border-[#1f3fbf]/60 pt-4" margin={<Reading>Entry {n}</Reading>}>
      <Reading>{reading}</Reading>
      <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.08] font-bold" style={{ color: INK }}>{title}</h2>
    </Row>
  );
}

export default function PreciseNotebook({ d }: { d: Shaped }) {
  const { profile } = d;
  const first = d.roles.at(-1)!;
  return (
    <div
      className="min-h-screen text-[#202328]"
      style={{
        fontFamily: "var(--p-atkinson), system-ui, sans-serif",
        backgroundColor: "#fbfcfa",
        backgroundImage:
          "linear-gradient(#d6e4e1 1px, transparent 1px), linear-gradient(90deg, #d6e4e1 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="relative mx-auto max-w-[1200px] px-6 pb-40 sm:px-10">
        <div className="pointer-events-none absolute inset-y-0 left-[283px] hidden w-[2px] bg-[#c8402e]/55 lg:block" aria-hidden="true" />

        <header className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-[#1f3fbf]/60 pt-8 pb-3">
          <span className="text-xl font-bold" style={{ color: INK }}>{profile.name}</span>
          <nav className="flex gap-6 text-[15px] font-bold tracking-[0.08em] uppercase" style={{ fontFamily: cond, color: INK }}>
            <a href="#pn-work" className="hover:underline">001 Work</a>
            <a href="#pn-lang" className="hover:underline">002 Languages</a>
            <a href="#pn-builds" className="hover:underline">003 Builds</a>
            <a href="#pn-reach" className="hover:underline">004 Reach</a>
          </nav>
        </header>

        {/* opening */}
        <Row
          className="pt-20"
          margin={
            <>
              <Reading>Since {first.period.split(" — ")[0]}</Reading>
              <Reading>{d.roles.length} roles · {d.systemCount} named systems</Reading>
              <Reading>{profile.basedIn}</Reading>
              <div className="pt-3"><Scrawl tone={RED}>strongest here →</Scrawl></div>
            </>
          }
        >
          <Reading>Entry 000 · who I am</Reading>
          <h1 className="mt-3 text-[clamp(2.8rem,6.4vw,5.4rem)] leading-[0.98] font-bold tracking-[-0.015em]" style={{ color: INK }}>
            {profile.tagline[0]}
          </h1>
          <p className="mt-6 max-w-[30ch] text-[clamp(1.35rem,2.3vw,1.9rem)] leading-snug">
            Backend is where I&apos;m strongest —{" "}
            <span className="relative inline-block">
              finding the slow query
              <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full" aria-hidden="true">
                <path d="M2 9 C 60 3, 140 13, 298 5" stroke={RED} strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            , handling millions of records, staying up under load.
          </p>
          <p className="mt-8 max-w-[62ch] text-[17px] leading-relaxed text-[#202328]/85">{profile.summary}</p>
        </Row>

        {/* WORK — margin per role */}
        <EntryHead id="pn-work" n="001" reading={`${first.period.split(" — ")[0]} → now · ${d.roles.length} roles`} title="Where I've worked, and what I built there" />
        <div className="mt-10 space-y-16">
          {d.roles.map((r) => (
            <Row
              key={r.id}
              margin={
                <>
                  <Reading>{r.period}</Reading>
                  <Reading>{r.duration} · {r.projects.length} systems</Reading>
                  {r.voice.map((v) => (
                    <div key={v} className="pt-2"><Scrawl>{v}</Scrawl></div>
                  ))}
                </>
              }
            >
              <h3 className="text-2xl leading-tight font-bold">{r.company}</h3>
              <p className="font-bold text-[#202328]/65">{r.title}</p>
              <p className="mt-3 max-w-[64ch] text-[17px] leading-relaxed">{r.summary}</p>
              <ul className="mt-5 grid gap-x-8 gap-y-2 border-t border-[#1f3fbf]/25 pt-4 sm:grid-cols-2">
                {r.projects.map((p) => (
                  <li key={p.slug} className="flex items-baseline gap-2 text-[16px]">
                    <span style={{ color: INK }} aria-hidden="true">□</span>
                    <span className="font-bold">{p.name}</span>
                    {p.outcome && (
                      <span className="ml-auto shrink-0 text-[14px] font-bold uppercase" style={{ fontFamily: cond, color: RED }}>{p.outcome}</span>
                    )}
                  </li>
                ))}
              </ul>
            </Row>
          ))}
        </div>

        {/* LANGUAGES */}
        <EntryHead id="pn-lang" n="002" reading="honest rankings · GitHub bytes by year" title="What I reach for, and what I don't any more" />
        <div className="mt-10 space-y-10">
          {d.comfort.map((c) => (
            <Row
              key={c.name}
              margin={
                <>
                  <Reading>{c.level}</Reading>
                  <Reading>{c.period}</Reading>
                </>
              }
            >
              <p className="text-xl font-bold">{c.name}</p>
              <p className="mt-1 max-w-[62ch] text-[16.5px] leading-relaxed">{c.note}</p>
            </Row>
          ))}
          <Row margin={<Scrawl tone={RED}>the PHP → TS/Python shift, in bytes{d.live ? "" : " (snapshot)"}</Scrawl>}>
            <table className="w-full max-w-[720px] text-left">
              <tbody>
                {d.eras.map((e) => (
                  <tr key={e.year} className="border-b border-[#1f3fbf]/25 align-baseline">
                    <th className="py-2 pr-6 text-lg font-bold tabular-nums" style={{ fontFamily: cond, color: INK }}>{e.year}</th>
                    <td className="py-2 text-[15.5px]">
                      {e.languages.map((l) => (
                        <span key={l.name} className="mr-4 inline-block">
                          {l.name} <span className="font-bold tabular-nums" style={{ fontFamily: cond }}>{l.share.toFixed(0)}%</span>
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Row>
        </div>

        {/* BUILDS */}
        <EntryHead id="pn-builds" n="003" reading={`${d.projects.length} live side projects · ${d.repos.length} recent repos`} title="Things I built because I wanted them to exist" />
        <div className="mt-10 grid gap-14 md:grid-cols-2 lg:pl-[278px]">
          {d.projects.map((p, i) => (
            <article key={p.id}>
              {p.shot && (
                <a href={p.url} className="relative block bg-white p-2 shadow-[0_1px_0_#0001,0_6px_16px_-8px_#0004]" style={{ transform: `rotate(${i ? 0.8 : -0.9}deg)` }}>
                  <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-[#f1e6a8]/80" aria-hidden="true" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.shot.src} alt={p.shot.alt} width={p.shot.width} height={p.shot.height} className="block h-auto w-full" />
                </a>
              )}
              <div className="mt-6"><Reading>{p.status} · {p.slug}</Reading></div>
              <h3 className="mt-1 text-2xl font-bold">{p.name}</h3>
              <p className="mt-2 text-[16px] leading-relaxed">{p.detail}</p>
            </article>
          ))}
        </div>
        <Row className="mt-14" margin={<Scrawl>from GitHub{d.live ? ", live" : ", snapshot"}</Scrawl>}>
          <table className="w-full text-left">
            <tbody>
              {d.repos.map((r) => (
                <tr key={r.name} className="border-b border-[#1f3fbf]/25">
                  <td className="py-2.5 pr-4"><a href={r.url} className="font-bold underline decoration-[#1f3fbf] decoration-2 underline-offset-4">{r.name}</a></td>
                  <td className="hidden py-2.5 pr-4 text-[15px] text-[#202328]/75 md:table-cell">{r.description}</td>
                  <td className="py-2.5 pr-4 text-right text-[15px] font-bold tabular-nums" style={{ fontFamily: cond }}>{r.commits ?? "—"} commits</td>
                  <td className="py-2.5 text-right text-[15px] font-bold tabular-nums" style={{ fontFamily: cond }}>{r.pushed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Row>

        {/* REACH */}
        <EntryHead id="pn-reach" n="004" reading="contact" title="Easiest way to reach me" />
        <Row className="mt-8" margin={<Scrawl>no email on the site, on purpose</Scrawl>}>
          <div className="flex flex-col gap-3 text-2xl font-bold sm:flex-row sm:gap-10" style={{ color: INK }}>
            <a href={profile.github} className="underline decoration-2 underline-offset-4">{profile.githubLabel}</a>
            <a href={profile.linkedin} className="underline decoration-2 underline-offset-4">{profile.linkedinLabel}</a>
          </div>
        </Row>
      </div>
    </div>
  );
}
