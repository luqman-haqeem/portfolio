import { languageComfort, type ComfortLevel } from "@/lib/resume";
import { languageEras, type GithubData } from "@/lib/github";
import { Reading, SectionHead } from "./ui";

/**
 * How sure I am of each language, drawn the way a gauge draws confidence:
 * as the weight of the graduations, not as a badge or a percentage bar.
 */
const MARK: Record<ComfortLevel, { weight: number; label: string }> = {
  daily: { weight: 7, label: "reach for by default" },
  fluent: { weight: 4.5, label: "fluent, not my first pick now" },
  working: { weight: 2.5, label: "productive, supporting cast" },
  learning: { weight: 1.25, label: "actively learning" },
};

/** Era fills: ink and water, then their lighter steps. No alert colours. */
const FILLS = [
  { bg: "var(--color-ink)", fg: "#fff" },
  { bg: "var(--color-water)", fg: "#fff" },
  { bg: "var(--color-water-pale)", fg: "var(--color-ink)" },
  { bg: "var(--color-plate)", fg: "var(--color-ink)" },
];

export default function CalibrationSection({ github }: { github: GithubData }) {
  const eras = languageEras(github.repos);
  // One colour per language across every year, so PHP is the same fill in
  // 2020 as in 2022 and the shift reads across rows. Ranked newest year first,
  // so what I write now gets the heaviest fill rather than whatever came first.
  const order = [
    ...new Set(
      [...eras]
        .reverse()
        .flatMap((e) => [...e.languages].sort((a, b) => b.share - a.share).map((l) => l.name)),
    ),
  ];
  const fillFor = (name: string) => FILLS[order.indexOf(name) % FILLS.length];

  return (
    <section
      id="calibration"
      aria-labelledby="calibration-title"
      className="border-y-2 border-ink bg-plate px-5 py-24 sm:px-10 sm:py-32 lg:pr-16 xl:pr-24"
    >
      <SectionHead id="calibration" title="How sure I am, drawn as mark weight" reading={`${languageComfort.length} languages`}>
        Heavier marks are what I reach for first. The rankings are mine; the
        bytes on the right are GitHub&apos;s.
      </SectionHead>

      <div className="mt-14 grid gap-16 xl:grid-cols-[1.1fr_1fr]">
        <ul className="space-y-10">
          {languageComfort.map((c) => (
            <li key={c.name} className="grid gap-x-6 gap-y-3 sm:grid-cols-[7.5rem_1fr]">
              <div className="flex h-11 items-end gap-[5px]" role="img" aria-label={MARK[c.level].label}>
                {Array.from({ length: 10 }, (_, i) => (
                  <span
                    key={i}
                    className="bg-ink"
                    style={{ width: MARK[c.level].weight, height: i % 5 === 0 ? 44 : 26 }}
                  />
                ))}
              </div>
              <div>
                <p className="text-xl leading-tight font-bold">{c.name}</p>
                <Reading as="p" className="mt-0.5 text-[15px] font-medium opacity-75">
                  {MARK[c.level].label} · {c.period}
                </Reading>
                <p className="mt-3 max-w-[60ch] text-[16.5px] leading-relaxed">{c.note}</p>
              </div>
            </li>
          ))}
        </ul>

        <figure>
          <figcaption>
            <p className="text-lg font-bold">What I actually wrote, by the year each repo started</p>
            <p className="mt-1 text-[15.5px] opacity-75">
              Language bytes across my public repos{github.live ? "" : ", from the committed snapshot"}.
              Languages under 3% of a year are left out.
            </p>
          </figcaption>
          <div className="mt-8 space-y-4">
            {eras.map((era) => (
              <div key={era.year} className="grid grid-cols-[3.5rem_1fr] items-center gap-3">
                <Reading className="text-[22px] font-bold">{era.year}</Reading>
                <div className="flex h-10 border-2 border-ink">
                  {era.languages.map((l) => {
                    const fill = fillFor(l.name);
                    return (
                      <div
                        key={l.name}
                        className="flex items-center overflow-hidden border-r border-ink px-1.5 font-reading text-[13px] font-bold tracking-[0.04em] whitespace-nowrap uppercase last:border-r-0"
                        style={{ width: `${l.share}%`, background: fill.bg, color: fill.fg }}
                        title={`${l.name} ${l.share.toFixed(0)}%`}
                      >
                        {l.share >= 14 ? l.name : ""}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[15px]" aria-hidden="true">
            {order.map((name) => (
              <li key={name} className="inline-flex items-center gap-1.5">
                <span className="inline-block size-3 border border-ink" style={{ background: fillFor(name).bg }} />
                {name}
              </li>
            ))}
          </ul>
          <table className="sr-only">
            <caption className="sr-only">Language share by year</caption>
            <tbody>
              {eras.map((era) => (
                <tr key={era.year} className="border-b border-ink/20 align-baseline">
                  <th scope="row" className="py-2 pr-4">
                    <Reading className="font-bold">{era.year}</Reading>
                  </th>
                  <td className="py-2">
                    {era.languages.map((l) => (
                      <span key={l.name} className="mr-4 inline-flex items-baseline gap-1.5 whitespace-nowrap">
                        <span
                          className="inline-block size-2.5 translate-y-px border border-ink"
                          style={{ background: fillFor(l.name).bg }}
                          aria-hidden="true"
                        />
                        {l.name} <Reading className="font-bold">{l.share.toFixed(0)}%</Reading>
                      </span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </div>
    </section>
  );
}
