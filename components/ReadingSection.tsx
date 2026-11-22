import { profile, roles } from "@/lib/resume";
import { formatMonth } from "@/lib/trace";
import { Reading, WaterLine } from "./ui";

/**
 * The first viewport. One statement at full scale, and the water band at its
 * foot carrying the current reading: what I do now and what I'm open to.
 */
export default function ReadingSection() {
  const active = roles.find((r) => r.end === null) ?? roles[roles.length - 1];

  const readings: [string, string, string][] = [
    ["Now", `${active.title}, ${active.company}`, `since ${formatMonth(active.start)}`],
    ["Open to", "Software development & DevOps roles", "message me on LinkedIn"],
  ];

  return (
    <section id="top" aria-labelledby="top-title" className="flex min-h-[calc(100svh-3.25rem)] flex-col lg:min-h-svh">
      <div className="flex flex-1 flex-col px-5 pt-8 pb-14 sm:px-10 lg:pt-6 lg:pr-16 xl:pr-24">
        <div className="flex flex-1 flex-col justify-center pt-8 sm:pt-12">
          <h1
            id="top-title"
            className="stretch-wide max-w-[13ch] text-[clamp(2.9rem,7.6vw,6rem)] leading-[0.92] font-extrabold tracking-[-0.025em] text-balance"
          >
            {profile.name}
          </h1>
          <p className="mt-7 max-w-[34ch] text-[clamp(1.3rem,2.3vw,2rem)] leading-[1.3] font-medium sm:mt-9">
            Backend-focused full-stack developer in Selangor, {profile.region}.
            <span className="mt-2 block opacity-70">{profile.tagline[0]}</span>
          </p>
        </div>
      </div>

      <div className="on-dark text-water">
        <WaterLine />
        <dl className="grid gap-x-8 gap-y-5 bg-water px-5 pt-3 pb-8 text-white sm:grid-cols-2 sm:px-10 lg:pr-16 xl:pr-24">
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
