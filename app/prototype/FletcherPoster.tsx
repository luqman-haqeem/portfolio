// PROTOTYPE — throwaway. Variant C: Fletcher Wit Poster — each section opens with one cut-paper pun.
import type { Shaped } from "./data";

const COBALT = "#1f47c4";
const LEAF = "#3d9a3f";
const POPPY = "#e2402d";
const INK = "#151515";
const marker = "var(--p-marker), cursive";

/** Torn-paper edge and crayon grain, applied as SVG filters. */
function Filters() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <filter id="torn">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="3" />
        <feDisplacementMap in="SourceGraphic" scale="9" />
      </filter>
      <filter id="crayon">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 1.25" result="m" />
        <feComposite in="SourceGraphic" in2="m" operator="in" />
      </filter>
    </svg>
  );
}

/** Hero pun: the slow query is a snail whose shell is a database cylinder; a cobalt lens finds it. */
function SnailPun() {
  return (
    <svg viewBox="0 0 520 380" className="h-auto w-full" role="img" aria-label="A cut-paper snail whose shell is a stacked database, caught under a magnifying glass">
      <g filter="url(#torn)">
        {/* body */}
        <path d="M40 300 C 120 300, 200 296, 330 300 C 360 300, 380 270, 380 250 L 410 205 L 420 210 L 398 258 C 400 292, 380 320, 340 322 L 40 322 Z" fill={LEAF} />
        {/* db shell */}
        <rect x="120" y="150" width="190" height="150" fill={POPPY} />
        <ellipse cx="215" cy="150" rx="95" ry="28" fill="#f28a7a" />
        <ellipse cx="215" cy="300" rx="95" ry="26" fill={POPPY} />
        {/* lens */}
        <circle cx="300" cy="120" r="88" fill="none" stroke={COBALT} strokeWidth="22" />
        <rect x="350" y="185" width="140" height="30" fill={COBALT} transform="rotate(42 360 190)" />
      </g>
      <g filter="url(#crayon)" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round">
        <path d="M130 200 C 170 214, 260 214, 300 200" />
        <path d="M130 250 C 170 264, 260 264, 300 250" />
        <path d="M410 205 l -6 -26 M420 210 l 14 -22" />
      </g>
      <g filter="url(#crayon)" stroke={COBALT} strokeWidth="6" strokeLinecap="round">
        <path d="M20 345 C 160 330, 330 352, 500 338" />
        <path d="M30 360 C 170 350, 320 368, 490 356" />
      </g>
    </svg>
  );
}

function Ladder({ rungs }: { rungs: { label: string; sub: string }[] }) {
  return (
    <ol className="relative mx-auto max-w-[720px] py-6" aria-label="Roles, most recent at the top">
      <div className="absolute inset-y-0 left-6 w-5 bg-[#c99a5b] [filter:url(#torn)] sm:left-10" aria-hidden="true" />
      <div className="absolute inset-y-0 right-6 w-5 bg-[#c99a5b] [filter:url(#torn)] sm:right-10" aria-hidden="true" />
      {rungs.map((r, i) => (
        <li key={r.label} className="relative my-5 px-14 sm:px-20">
          <div
            className="px-5 py-4 text-white [filter:url(#torn)]"
            style={{ background: [COBALT, POPPY, LEAF, INK, COBALT][i % 5], transform: `rotate(${(i % 2 ? 1 : -1) * 0.8}deg)` }}
          >
            <p className="text-2xl leading-tight" style={{ fontFamily: marker }}>{r.label}</p>
          </div>
          <p className="mt-1 px-2 text-[15px]">{r.sub}</p>
        </li>
      ))}
    </ol>
  );
}

function Pun({ children, kicker }: { children: React.ReactNode; kicker: string }) {
  return (
    <div className="text-center">
      <p className="text-[13px] font-semibold tracking-[0.2em] uppercase">{kicker}</p>
      <h2 className="mx-auto mt-3 max-w-[16ch] text-[clamp(2.4rem,6vw,4.8rem)] leading-[1] text-balance" style={{ fontFamily: marker }}>
        {children}
      </h2>
    </div>
  );
}

export default function FletcherPoster({ d }: { d: Shaped }) {
  const { profile } = d;
  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#151515]" style={{ fontFamily: "var(--p-work), system-ui, sans-serif" }}>
      <Filters />

      {/* HERO POSTER */}
      <section className="mx-auto grid min-h-[100svh] max-w-[1280px] items-center gap-8 px-6 py-14 sm:px-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <h1 className="text-[clamp(3.2rem,8vw,7.4rem)] leading-[0.92]" style={{ fontFamily: marker }}>
            Finding the slow query.
          </h1>
          <p className="mt-6 max-w-[34ch] text-[clamp(1.2rem,1.9vw,1.6rem)] leading-snug">
            {profile.tagline[0]} {profile.tagline.slice(1).join(" ")}
          </p>
          <div className="mt-10 border-t-2 border-[#151515] pt-3 text-[14px] leading-relaxed tracking-wide uppercase">
            <p className="font-semibold">{profile.name}</p>
            <p>{profile.role}</p>
            <p>{profile.basedIn} · since {profile.careerStart.slice(0, 4)}</p>
          </div>
        </div>
        <SnailPun />
      </section>

      {/* WORK */}
      <section className="border-t-2 border-[#151515] px-6 py-24 sm:px-10">
        <Pun kicker="Five roles, one ladder">Climbing the stack.</Pun>
        <Ladder rungs={d.roles.map((r) => ({ label: `${r.service} — ${r.title}`, sub: `${r.period} · ${r.projects.length} systems · ${r.summary.split(". ")[0]}.` }))} />
      </section>

      {/* LANGUAGES */}
      <section className="border-t-2 border-[#151515] bg-white px-6 py-24 sm:px-10">
        <Pun kicker="From GitHub, by year started">My stack moved.</Pun>
        <div className="mx-auto mt-14 flex max-w-[900px] items-end justify-center gap-6 sm:gap-10">
          {d.eras.map((e) => (
            <div key={e.year} className="flex w-28 flex-col items-stretch">
              <div className="flex h-[300px] flex-col-reverse">
                {e.languages.map((l, i) => (
                  <div
                    key={l.name}
                    className="flex items-center justify-center overflow-hidden text-[13px] font-semibold text-white [filter:url(#torn)]"
                    style={{ height: `${l.share}%`, background: [COBALT, POPPY, LEAF, INK][i % 4], transform: `rotate(${(i % 2 ? 1 : -1) * 1.5}deg)` }}
                    title={`${l.name} ${l.share.toFixed(0)}%`}
                  >
                    {l.share > 14 ? l.name : ""}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-2xl" style={{ fontFamily: marker }}>{e.year}</p>
            </div>
          ))}
        </div>
        <ul className="mx-auto mt-16 grid max-w-[1000px] gap-6 md:grid-cols-2">
          {d.comfort.map((c) => (
            <li key={c.name}>
              <p className="text-xl" style={{ fontFamily: marker, color: c.level === "daily" ? POPPY : COBALT }}>{c.name}</p>
              <p className="text-[15px] leading-relaxed">{c.note}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* BUILDS */}
      <section className="border-t-2 border-[#151515] px-6 py-24 sm:px-10">
        <Pun kicker="Side projects, both live">Receipts kept. Rivers watched.</Pun>
        <div className="mx-auto mt-14 grid max-w-[1150px] gap-14 md:grid-cols-2">
          {d.projects.map((p, i) => (
            <article key={p.id}>
              {p.shot && (
                <a href={p.url} className="block border-[6px] [filter:url(#torn)]" style={{ borderColor: i ? COBALT : POPPY }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.shot.src} alt={p.shot.alt} width={p.shot.width} height={p.shot.height} className="block h-auto w-full" />
                </a>
              )}
              <h3 className="mt-5 text-3xl" style={{ fontFamily: marker }}>{p.name}</h3>
              <p className="mt-2 text-[16px] leading-relaxed">{p.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* REACH */}
      <section className="border-t-2 border-[#151515] px-6 py-24 text-center sm:px-10">
        <Pun kicker="Reach">Say hello.</Pun>
        <div className="mt-10 flex flex-col items-center gap-4 text-xl font-semibold sm:flex-row sm:justify-center sm:gap-10">
          <a href={profile.github} className="bg-[#1f47c4] px-6 py-3 text-white [filter:url(#torn)]">{profile.githubLabel}</a>
          <a href={profile.linkedin} className="border-[3px] border-[#1f47c4] px-6 py-3 text-[#1f47c4] [filter:url(#torn)]">{profile.linkedinLabel}</a>
        </div>
      </section>
    </div>
  );
}
