import { profile, roles } from "@/lib/resume";
import { relativeTime, selectActive, type GithubData } from "@/lib/github";
import { formatMonth } from "@/lib/trace";
import { Reading, WaterLine } from "./ui";

/**
 * The first viewport. One statement at full scale, and the water band at its
 * foot carrying the current reading: what I do now, where, and when I last
 * pushed code — the one figure on the page that changes on its own.
 */
export default function ReadingSection({ github }: { github: GithubData }) {
  const active = roles.find((r) => r.end === null) ?? roles[roles.length - 1];
  const latest = selectActive(github, 1).all[0];

  const readings: [string, string, string][] = [
    ["Now", `${active.title}, ${active.company}`, `since ${formatMonth(active.start)}`],
    ["Based", profile.basedIn, `${profile.region} · ${profile.tzLabel}`],
    latest
      ? [
          "Last push",
          latest.name,
          `${relativeTime(latest.pushedAt, github.now)}${github.live ? "" : " · from snapshot"}`,
        ]
      : ["Last push", "Unavailable", "GitHub could not be reached"],
  ];

  return (
    <section id="top" aria-labelledby="top-title" className="flex min-h-[calc(100svh-3.25rem)] flex-col lg:min-h-svh">
      <div className="flex flex-1 flex-col px-5 pt-8 pb-14 sm:px-10 lg:pt-6 lg:pr-16 xl:pr-24">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-3">
          <p className="text-[17px] font-bold">
            {profile.name}
            <span className="font-medium opacity-70"> · {profile.role}</span>
          </p>
          <Reading className="text-[15px] opacity-75">
            {profile.basedIn} · {profile.tzLabel}
          </Reading>
        </div>

        <div className="flex flex-1 flex-col justify-center pt-12 sm:pt-16">
          <h1
            id="top-title"
            className="stretch-wide max-w-[13ch] text-[clamp(2.9rem,7.6vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.025em] text-balance"
          >
            {profile.tagline[0]}
          </h1>
          <p className="mt-7 max-w-[32ch] text-[clamp(1.3rem,2.3vw,2rem)] leading-[1.2] font-medium sm:mt-9">
            {profile.tagline.slice(1).join(" ")}
          </p>
        </div>
      </div>

      <div className="on-dark text-water">
        <WaterLine />
        <dl className="grid gap-x-8 gap-y-5 bg-water px-5 pt-3 pb-8 text-white sm:grid-cols-3 sm:px-10 lg:pr-16 xl:pr-24">
          {readings.map(([label, value, detail]) => (
            <div key={label} className="border-t border-on-water/50 pt-3">
              <Reading as="dt" className="text-[14px] text-on-water">{label}</Reading>
              <dd className="mt-1 text-[17px] leading-snug font-semibold">{value}</dd>
              <Reading as="dd" className="text-[15px] font-medium text-on-water normal-case">
                {detail}
              </Reading>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
