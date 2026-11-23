import { roles } from "@/lib/resume";
import { formatPeriod } from "@/lib/trace";
import { Reading, SectionHead } from "./ui";

/**
 * Experience, one line per role. The work done inside each company stays off
 * the page on purpose: the showcase is the side projects below.
 */
export default function WorkSection() {
  const ordered = [...roles].sort((a, b) => b.start.localeCompare(a.start));
  const first = ordered[ordered.length - 1];

  return (
    <section id="work" aria-labelledby="work-title" className="px-5 py-24 sm:px-10 sm:py-32 lg:pr-16 xl:pr-24">
      <SectionHead id="work" title="Experience" reading={`${first.start.slice(0, 4)} → now`} />

      <ol className="mt-10">
        {ordered.map((role) => (
          <li
            key={role.id}
            className="relative grid gap-x-10 gap-y-1 border-t-2 border-ink py-5 last:border-b-2 md:grid-cols-[12.5rem_1fr] md:items-baseline"
          >
            {role.end === null && (
              <span className="absolute -top-0.5 left-0 h-1.5 w-28 bg-level-ok" aria-hidden="true" />
            )}
            <Reading as="p" className="text-[17px] font-bold">
              {formatPeriod(role.start, role.end)}
            </Reading>
            <p className="text-lg leading-snug">
              <span className="font-bold">{role.company}</span>
              <span className="opacity-75">
                {" · "}
                {role.title}
                {role.employment ? ` (${role.employment.toLowerCase()})` : ""}
              </span>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
