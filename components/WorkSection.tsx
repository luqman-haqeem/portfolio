import { certifications, education, roles, type Role } from "@/lib/resume";
import { formatDuration, formatPeriod, monthIndex, currentMonthIndex, monthSpan } from "@/lib/trace";
import { OutArrow, Reading, SectionHead } from "./ui";

function overlapping(role: Role): Role[] {
  const a0 = monthIndex(role.start);
  const a1 = role.end ? monthIndex(role.end) : currentMonthIndex();
  return roles.filter((other) => {
    if (other.id === role.id) return false;
    const b0 = monthIndex(other.start);
    const b1 = other.end ? monthIndex(other.end) : currentMonthIndex();
    // Only flag the shorter role as running "alongside" the longer one.
    return a0 <= b1 && b0 <= a1 && a1 - a0 < b1 - b0;
  });
}

export default function WorkSection() {
  const ordered = [...roles].sort((a, b) => b.start.localeCompare(a.start));
  const first = ordered[ordered.length - 1];
  const systems = roles.reduce((n, r) => n + r.projects.length, 0);

  return (
    <section id="work" aria-labelledby="work-title" className="px-5 py-24 sm:px-10 sm:py-32 lg:pr-16 xl:pr-24">
      <SectionHead
        id="work"
        title="Where the work happened"
        reading={`${first.start.slice(0, 4)} → now · ${roles.length} roles · ${systems} systems`}
      />

      <ol className="mt-12">
        {ordered.map((role) => {
          const alongside = overlapping(role);
          return (
            <li
              key={role.id}
              className="relative grid gap-x-10 gap-y-4 border-t-2 border-ink py-10 md:grid-cols-[12.5rem_1fr]"
            >
              {role.end === null && (
                <span className="absolute -top-0.5 left-0 h-1.5 w-28 bg-level-ok" aria-hidden="true" />
              )}
              <div className="leading-tight">
                <Reading as="p" className="text-[22px] font-bold">
                  {formatPeriod(role.start, role.end)}
                </Reading>
                <Reading as="p" className="mt-1 text-[17px] font-medium opacity-70">
                  {formatDuration(monthSpan(role.start, role.end))}
                  {role.end === null ? " · current" : ""}
                </Reading>
                {alongside.map((o) => (
                  <Reading as="p" key={o.id} className="mt-1 text-[17px] font-medium opacity-70">
                    alongside {o.service}
                  </Reading>
                ))}
              </div>

              <div className="min-w-0">
                <h3 className="stretch-semi text-[clamp(1.6rem,2.6vw,2rem)] leading-tight font-bold">{role.company}</h3>
                <p className="mt-1 text-lg font-medium opacity-75">
                  {role.title}
                  {role.employment ? ` · ${role.employment}` : ""}
                </p>
                <p className="mt-4 max-w-[64ch] text-[17px] leading-relaxed">{role.summary}</p>

                <ul className="mt-7 grid gap-x-8 sm:grid-cols-2">
                  {role.projects.map((p) => (
                    <li key={p.slug} className="border-b border-ink/20">
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-baseline gap-3 py-2.5 [&::-webkit-details-marker]:hidden">
                          <svg viewBox="0 0 12 12" className="size-3 shrink-0 translate-y-[0.05em]" aria-hidden="true">
                            <path d="M0 6h12" stroke="currentColor" strokeWidth="2.5" />
                            <path d="M6 0v12" stroke="currentColor" strokeWidth="2.5" className="group-open:hidden" />
                          </svg>
                          <span className="font-semibold group-hover:underline">{p.name}</span>
                          {p.outcome && (
                            <Reading className="ml-auto shrink-0 pl-2 text-right text-[15px] font-bold text-water">
                              {p.outcome}
                            </Reading>
                          )}
                        </summary>
                        <div className="pb-4 pl-6">
                          <p className="text-[15.5px] leading-relaxed">{p.what}</p>
                          <Reading as="p" className="mt-2 text-[14px] font-medium opacity-70 normal-case">
                            {p.stack.join(" · ")}
                          </Reading>
                        </div>
                      </details>
                    </li>
                  ))}
                </ul>

                {/* An era kept on the record rather than deleted. Years come from
                    the role's own dates. */}
                {role.highWater && (
                  <p className="mt-9 flex items-center gap-3">
                    <span className="h-[3px] flex-1 bg-level-danger" aria-hidden="true" />
                    <Reading className="text-[15px] font-bold text-danger-ink">
                      High-water mark · {role.highWater}, {role.start.slice(0, 4)}–{role.end ? role.end.slice(0, 4) : "now"}
                    </Reading>
                  </p>
                )}
              </div>
            </li>
          );
        })}

        <li className="grid gap-x-10 gap-y-3 border-t-2 border-ink py-10 md:grid-cols-[12.5rem_1fr]">
          <Reading as="p" className="text-[22px] font-bold">{education.period}</Reading>
          <div>
            <h3 className="text-xl font-bold">{education.qualification}</h3>
            <p className="mt-1 text-lg opacity-75">{education.school}</p>
            {certifications.map((c) => (
              <p key={c.name} className="mt-4 text-[16px]">
                <span className="font-semibold">{c.name}</span>, {c.issuer}, {c.year} ·{" "}
                <a href={c.verifyUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline decoration-2 hover:text-water">
                  verify <OutArrow />
                </a>
              </p>
            ))}
          </div>
        </li>
      </ol>
    </section>
  );
}
