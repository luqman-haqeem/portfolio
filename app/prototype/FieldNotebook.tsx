// PROTOTYPE — throwaway. Variant B: Engineer's Field Notebook.
import type { Shaped } from "./data";

const INK = "#1f3fbf";
const PENCIL = "#34373b";
const RED = "#c8402e";
const hand = "var(--p-kalam), cursive";

const tally = { daily: 4, fluent: 3, working: 2, learning: 1 } as const;

function Margin({ children, tone = PENCIL }: { children: React.ReactNode; tone?: string }) {
  return (
    <p className="text-[19px] leading-snug lg:text-right" style={{ fontFamily: hand, color: tone, fontWeight: 300 }}>
      {children}
    </p>
  );
}

function Entry({
  n,
  date,
  title,
  margin,
  children,
  id,
}: {
  n: string;
  date: string;
  title: string;
  margin?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="grid gap-x-10 pt-20 lg:grid-cols-[220px_1fr]">
      <div className="order-2 mt-4 space-y-4 lg:order-1 lg:mt-12">{margin}</div>
      <div className="order-1 lg:order-2">
        <p className="text-[18px]" style={{ fontFamily: hand, color: PENCIL }}>
          Entry {n} · {date}
        </p>
        <h2 className="mt-1 text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-bold" style={{ fontFamily: hand, color: INK }}>
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

export default function FieldNotebook({ d }: { d: Shaped }) {
  const { profile } = d;
  return (
    <div
      className="min-h-screen text-[#22252a]"
      style={{
        fontFamily: "var(--p-atkinson), system-ui, sans-serif",
        backgroundColor: "#fbfcfa",
        backgroundImage:
          "linear-gradient(#cfe0dd 1px, transparent 1px), linear-gradient(90deg, #cfe0dd 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      <div className="relative mx-auto max-w-[1180px] px-6 pb-40 sm:px-10">
        {/* red margin rule */}
        <div className="pointer-events-none absolute inset-y-0 left-[268px] hidden w-[2px] bg-[#c8402e]/60 lg:block" aria-hidden="true" />

        <header className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-[#1f3fbf]/70 pt-10 pb-3" style={{ fontFamily: hand, color: INK }}>
          <span className="text-2xl font-bold">{profile.name}</span>
          <nav className="flex gap-6 text-xl">
            <a href="#nb-work" className="hover:underline">work</a>
            <a href="#nb-lang" className="hover:underline">languages</a>
            <a href="#nb-builds" className="hover:underline">builds</a>
            <a href="#nb-reach" className="hover:underline">reach</a>
          </nav>
        </header>

        {/* opening entry */}
        <section className="grid gap-x-10 pt-16 lg:grid-cols-[220px_1fr]">
          <div className="order-2 mt-6 space-y-6 lg:order-1 lg:mt-24">
            <Margin>{profile.role}. ~5 yrs, since Dec 2020.</Margin>
            <Margin tone={RED}>strongest here →</Margin>
            <Margin>{profile.basedIn} · {profile.tzLabel}</Margin>
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-[19px]" style={{ fontFamily: hand, color: PENCIL }}>Entry 000 · who I am</p>
            <h1 className="mt-2 text-[clamp(2.8rem,6.5vw,5.6rem)] leading-[0.98] font-bold" style={{ fontFamily: hand, color: INK }}>
              {profile.tagline[0]}
            </h1>
            <p className="mt-6 max-w-[30ch] text-[clamp(1.4rem,2.4vw,2rem)] leading-snug">
              Backend is where I&apos;m strongest —{" "}
              <span className="relative inline-block">
                finding the slow query
                <svg viewBox="0 0 300 14" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full" aria-hidden="true">
                  <path d="M2 9 C 60 3, 140 13, 298 5" stroke={RED} strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>
              , handling millions of records, staying up under load.
            </p>
            <p className="mt-8 max-w-[62ch] text-[17px] leading-relaxed text-[#22252a]/85">{profile.summary}</p>
          </div>
        </section>

        <Entry
          id="nb-work"
          n="001"
          date={`${d.roles.at(-1)!.start.slice(0, 4)} → now`}
          title="Where I've worked, and what I built there"
          margin={<Margin>5 roles. The DevWiz one overlapped Cloone — it was part-time.</Margin>}
        >
          <ol className="space-y-12">
            {d.roles.map((r) => (
              <li key={r.id}>
                <div className="flex flex-wrap items-baseline gap-x-4">
                  <h3 className="text-2xl font-bold">{r.company}</h3>
                  <span className="text-[19px]" style={{ fontFamily: hand, color: PENCIL }}>{r.period} ({r.duration})</span>
                </div>
                <p className="font-bold text-[#22252a]/70">{r.title}</p>
                <p className="mt-3 max-w-[64ch] text-[17px] leading-relaxed">{r.summary}</p>
                <ul className="mt-4 space-y-1.5">
                  {r.projects.map((p) => (
                    <li key={p.slug} className="flex flex-wrap gap-x-2 text-[16px]">
                      <span style={{ color: INK }}>□</span>
                      <span className="font-bold">{p.name}</span>
                      {p.outcome && <span style={{ fontFamily: hand, color: RED }}>→ {p.outcome}</span>}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Entry>

        <Entry
          id="nb-lang"
          n="002"
          date="honest rankings"
          title="What I reach for (and what I don't any more)"
          margin={<Margin tone={RED}>tally = how sure. 4 = default, 1 = learning</Margin>}
        >
          <ul className="space-y-6">
            {d.comfort.map((c) => (
              <li key={c.name} className="grid gap-x-6 sm:grid-cols-[5rem_1fr]">
                <span className="text-3xl tracking-[0.15em]" style={{ fontFamily: hand, color: INK }} aria-label={`${tally[c.level]} of 4`}>
                  {"|".repeat(tally[c.level])}
                </span>
                <div>
                  <p className="text-lg font-bold">{c.name} <span className="font-normal" style={{ fontFamily: hand, color: PENCIL }}>{c.period}</span></p>
                  <p className="mt-1 max-w-[62ch] text-[16px] leading-relaxed">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 max-w-[640px]">
            <p className="text-[19px]" style={{ fontFamily: hand, color: PENCIL }}>by year started (GitHub bytes{d.live ? "" : ", snapshot"}):</p>
            <div className="mt-3 space-y-2">
              {d.eras.map((e) => (
                <div key={e.year} className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
                  <span style={{ fontFamily: hand, color: INK }} className="text-xl font-bold">{e.year}</span>
                  <p className="text-[15px]">
                    {e.languages.map((l) => `${l.name} ${l.share.toFixed(0)}%`).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Entry>

        <Entry
          id="nb-builds"
          n="003"
          date="side projects"
          title="Things I built because I wanted them to exist"
          margin={<Margin>both live. screenshots taped in.</Margin>}
        >
          <div className="grid gap-14 md:grid-cols-2">
            {d.projects.map((p, i) => (
              <article key={p.id}>
                {p.shot && (
                  <a href={p.url} className="relative block bg-white p-2 shadow-[0_1px_0_#0001,0_6px_16px_-8px_#0004]" style={{ transform: `rotate(${i ? 1.2 : -1.4}deg)` }}>
                    <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-[#f1e6a8]/80" aria-hidden="true" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.shot.src} alt={p.shot.alt} width={p.shot.width} height={p.shot.height} className="block h-auto w-full" />
                  </a>
                )}
                <h3 className="mt-6 text-2xl font-bold">{p.name}</h3>
                <p style={{ fontFamily: hand, color: INK }} className="text-lg">{p.tagline}</p>
                <p className="mt-2 text-[16px] leading-relaxed">{p.detail}</p>
              </article>
            ))}
          </div>
          <ul className="mt-12 space-y-2">
            {d.repos.map((r) => (
              <li key={r.name} className="flex flex-wrap items-baseline gap-x-3 text-[16px]">
                <a href={r.url} className="font-bold underline decoration-[#1f3fbf] decoration-2 underline-offset-4">{r.name}</a>
                <span className="text-[#22252a]/75">{r.description}</span>
                <span style={{ fontFamily: hand, color: PENCIL }}>{r.commits ?? "?"} commits · {r.pushed}</span>
              </li>
            ))}
          </ul>
        </Entry>

        <Entry id="nb-reach" n="004" date="contact" title="Easiest way to reach me">
          <div className="flex flex-col gap-3 text-2xl sm:flex-row sm:gap-10" style={{ fontFamily: hand, color: INK }}>
            <a href={profile.github} className="underline decoration-2 underline-offset-4">{profile.githubLabel}</a>
            <a href={profile.linkedin} className="underline decoration-2 underline-offset-4">{profile.linkedinLabel}</a>
          </div>
        </Entry>
      </div>
    </div>
  );
}
