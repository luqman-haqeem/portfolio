"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  achievementMeta,
  certifications,
  education,
  profile,
  roles,
  type Role,
} from "@/lib/resume";
import {
  buildTimeline,
  concurrentWith,
  formatDuration,
  formatPeriod,
  monthIndex,
  monthSpan,
  type TraceSpan,
} from "@/lib/trace";
import { log } from "@/lib/telemetry";
import ExternalLink from "./ExternalLink";
import {
  ArrowIcon,
  ChevronIcon,
  CornerArrow,
  DataLabel,
  Marginalia,
  SectionHeading,
  Section,
} from "./ui";

const latestRole = roles.reduce((a, b) => (a.start > b.start ? a : b));

export default function TraceSection() {
  const timeline = useMemo(() => buildTimeline(roles), []);
  // Newest first by default — the current role is what anyone reads first.
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [view, setView] = useState<"trace" | "plain">("trace");
  const [open, setOpen] = useState<string[]>([latestRole.id]);

  const isOpen = useCallback((id: string) => open.includes(id), [open]);

  const toggle = useCallback(
    (role: Role) => {
      setOpen((prev) => {
        const next = prev.includes(role.id)
          ? prev.filter((id) => id !== role.id)
          : [...prev, role.id];
        log("SPAN", role.service, {
          level: "debug",
          meta: next.includes(role.id) ? "expand" : "collapse",
        });
        return next;
      });
    },
    [],
  );

  // Deep links from the stack topology land here.
  useEffect(() => {
    const sync = () => {
      const match = window.location.hash.match(/^#role-(.+)$/);
      if (!match) return;
      const id = match[1];
      if (!roles.some((r) => r.id === id)) return;
      setView("trace");
      setOpen((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const ordered = useMemo(
    () => (order === "asc" ? timeline.spans : [...timeline.spans].reverse()),
    [order, timeline.spans],
  );

  const totalProjects = useMemo(
    () => roles.reduce((sum, role) => sum + role.projects.length, 0),
    [],
  );

  const datedProjects = useMemo(
    () =>
      roles.reduce(
        (sum, role) =>
          sum + role.projects.filter((pr) => pr.start && pr.end).length,
        0,
      ),
    [],
  );

  return (
    // The waterfall needs every pixel of width it can get — the span bars are
    // proportional to real durations, and squeezing them makes short roles
    // vanish. This is the section that earns going wide, and the extra vertical
    // room around it marks it as the spine of the page.
    <Section id="trace" width="wide" pace="loose">
      <SectionHeading
        title="Career trace"
        description={
          <>
            {timeline.spans.length} companies as parent spans,{" "}
            {totalProjects} systems as their children,{" "}
            {timeline.totalDuration} of wall-clock time. Bars sit at real dates,
            so you can see where work overlapped. Open a company and you get the
            job context and the things I actually built, kept separate —
            because &quot;led four developers&quot; and &quot;shipped a
            warehouse system&quot; are not the same kind of fact.
          </>
        }
        aside={
          <Marginalia as="span" className="hidden sm:inline">
            trace_id: career.{profile.careerStart}
          </Marginalia>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-2" data-reveal>
        <Segmented
          value={view}
          onChange={(v) => {
            setView(v);
            log("VIEW", v === "trace" ? "waterfall" : "plain text", {
              level: "debug",
              meta: "render mode",
            });
          }}
          options={[
            { value: "trace" as const, label: "waterfall" },
            { value: "plain" as const, label: "plain text" },
          ]}
        />

        {view === "trace" ? (
          <Segmented
            value={order}
            onChange={setOrder}
            options={[
              { value: "asc" as const, label: "oldest first" },
              { value: "desc" as const, label: "newest first" },
            ]}
          />
        ) : null}

        <div className="ml-auto flex items-center gap-3 text-2xs text-dim">
          <button
            type="button"
            onClick={() => setOpen(roles.map((r) => r.id))}
            className="transition-colors hover:text-muted"
          >
            expand all
          </button>
          <span className="text-line-2">|</span>
          <button
            type="button"
            onClick={() => setOpen([])}
            className="transition-colors hover:text-muted"
          >
            collapse all
          </button>
        </div>
      </div>

      {/* ---------------- waterfall ---------------- */}
      <div className={view === "trace" ? "" : "hidden"}>
        <div className="overflow-hidden rounded-xl border border-line bg-panel">
          {/* time axis */}
          <div className="border-b border-line bg-panel-2/60 px-3 py-2 sm:px-4">
            <div className="flex items-center justify-between font-mono text-2xs text-dim sm:pl-64 sm:pr-20">
              <span>{timeline.startLabel}</span>
              <span className="hidden sm:inline">
                {timeline.totalMonths} months
              </span>
              <span className="text-accent">{timeline.endLabel}</span>
            </div>
          </div>

          <div className="relative px-3 py-2 sm:px-4">
            {/* year guides, aligned to the track column */}
            <div
              className="pointer-events-none absolute inset-y-0 left-3 right-3 sm:left-68 sm:right-24"
              aria-hidden="true"
            >
              <div className="relative h-full">
                {timeline.ticks.map((tick) => (
                  <div
                    key={tick.label}
                    className="absolute inset-y-0 border-l border-dashed border-line"
                    style={{ left: `${tick.offsetPct}%` }}
                  >
                    <span className="absolute -top-0.5 left-1 font-mono text-2xs text-line-2">
                      {tick.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* root span */}
            <div className="relative flex flex-col gap-2 py-2.5 sm:grid sm:grid-cols-[16rem_1fr_5rem] sm:items-center sm:gap-0">
              <div className="flex items-center gap-2 pr-4 font-mono text-xs">
                <ChevronIcon className="rotate-90 text-dim" />
                <span className="text-text">career</span>
                <span className="rounded border border-line-2 px-1 text-2xs text-dim">
                  root
                </span>
              </div>
              <div className="relative h-6">
                <div className="absolute inset-x-0 inset-y-1.5 rounded-[3px] border-l-2 border-muted bg-muted/10" />
              </div>
              <div className="hidden text-right font-mono text-2xs text-muted tabular sm:block">
                {timeline.totalDuration}
              </div>
            </div>

            {ordered.map((span, i) => (
              <SpanRow
                key={span.role.id}
                span={span}
                index={i}
                open={isOpen(span.role.id)}
                onToggle={() => toggle(span.role)}
                concurrent={concurrentWith(timeline.spans, span)}
              />
            ))}
          </div>
        </div>

        <Marginalia className="mt-3 flex items-start gap-1.5">
          <CornerArrow className="mt-0.5 shrink-0" />
          <span>
            Bar length = duration, bar position = when. The short red span in
            late 2023 ran in parallel with a full-time role. Child spans only get
            a bar where I have the real dates — {datedProjects} of{" "}
            {totalProjects} so far. The rest stay bare rather than being given an
            invented range, because one fabricated bar would make the other
            twenty-odd worthless.
          </span>
        </Marginalia>
      </div>

      {/* Where the career started. Small, because it matters least — but it
          belongs on the timeline rather than nowhere.

          Ruled, not raised: two cells of dates and issuers is metadata, and a
          card around it claimed the same weight as the waterfall above. The
          waterfall stays raised because it is an instrument; this is a footnote
          to it. */}
      <div
        className="mt-10 grid gap-x-10 gap-y-8 border-t border-line pt-7 sm:grid-cols-2"
        data-reveal
      >
        <div>
          <p className="text-sm text-dim">before all of it</p>
          <h3 className="mt-2.5 text-base font-medium text-text">
            {education.school}
          </h3>
          <p className="mt-1 text-sm text-muted">{education.qualification}</p>
          <Marginalia className="mt-1 text-line-2">
            {education.period}
          </Marginalia>
        </div>

        <div>
          <p className="text-sm text-dim">certifications</p>
          {certifications.map((cert) => (
            <div key={cert.name} className="mt-2.5">
              <h3 className="text-base font-medium text-text">{cert.name}</h3>
              <p className="mt-1 text-sm text-muted">
                {cert.issuer}
                <span className="text-2xs text-line-2"> · {cert.year}</span>
              </p>
              {cert.verifyUrl ? (
                <ExternalLink
                  href={cert.verifyUrl}
                  logAs={`verify/${cert.name}`}
                  className="mt-2 inline-flex items-center gap-1 text-2xs text-dim transition-colors hover:text-accent"
                >
                  verify on Credly
                  <ArrowIcon />
                </ExternalLink>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- plain text, for people who just want the résumé ---------------- */}
      <div className={view === "plain" ? "" : "hidden"}>
        <div className="print-panel space-y-8 p-5 sm:p-7">
          {[...timeline.spans].reverse().map((span) => (
            <article key={span.role.id} className="border-line">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-text">
                  {span.role.company}
                </h3>
                <DataLabel className="text-muted tabular">
                  {span.period} · {span.duration}
                </DataLabel>
              </div>
              <p className="mt-0.5 text-sm text-accent">
                {span.role.title}
                <span className="text-dim"> · {span.role.location}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {span.role.summary}
              </p>
              {span.role.context.length > 0 ? (
                <ul className="mt-2 space-y-1">
                  {span.role.context.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-line-2" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <ul className="mt-3 space-y-2.5">
                {span.role.projects.map((project) => (
                  <li key={project.slug} className="flex gap-2.5">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-dim" />
                    <div className="min-w-0">
                      <p className="text-sm leading-relaxed text-text">
                        <span className="font-medium">{project.name}</span>
                        {project.outcome ? (
                          <span className="text-accent"> — {project.outcome}</span>
                        ) : null}
                      </p>
                      <p className="text-sm leading-relaxed text-muted">
                        {project.what}
                      </p>
                      <Marginalia className="mt-0.5">
                        {project.stack.join(" · ")}
                      </Marginalia>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}

function SpanRow({
  span,
  index,
  open,
  onToggle,
  concurrent,
}: {
  span: TraceSpan;
  index: number;
  open: boolean;
  onToggle: () => void;
  concurrent: TraceSpan[];
}) {
  const { role, offsetPct, widthPct, duration, period, months } = span;
  const wide = widthPct > 16;
  const panelId = `span-detail-${role.id}`;
  // Tint the child-span rail with the company colour — at full strength it
  // competes with the text, at line-2 grey it disappears entirely.
  const rail = `color-mix(in oklab, ${role.color} 45%, transparent)`;

  return (
    <div
      id={`role-${role.id}`}
      className="relative scroll-mt-28 border-t border-line/70 first:border-t-0"
      data-reveal
      style={
        {
          "--reveal-delay": `${Math.min(index * 60, 320)}ms`,
          "--bar-delay": `${Math.min(index * 60, 320) + 120}ms`,
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full flex-col gap-1.5 py-3 text-left sm:grid sm:grid-cols-[16rem_1fr_5rem] sm:items-center sm:gap-0"
      >
        <span className="flex min-w-0 items-center gap-2 pr-4">
          <ChevronIcon
            className={`shrink-0 text-dim transition-transform group-hover:text-muted ${
              open ? "rotate-90" : ""
            }`}
          />
          <span className="min-w-0">
            <span
              className="block truncate font-mono text-xs"
              style={{ color: role.color }}
            >
              {role.service}
            </span>
            {/* wraps on phones, truncates from sm up where the column is fixed */}
            <span className="mt-0.5 block text-2xs text-dim sm:truncate">
              {role.title}
              <span className="sm:hidden">
                {" "}
                · {duration} · {role.projects.length} systems
              </span>
            </span>
          </span>
          {span.open ? (
            <span className="ml-auto shrink-0 rounded border border-ok/25 bg-ok/8 px-1 text-2xs text-ok">
              active
            </span>
          ) : null}
        </span>

        <span className="relative block h-7">
          <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line/70" />
          <span
            className="span-bar absolute inset-y-1 flex items-center rounded-[3px] transition-[filter] group-hover:brightness-125"
            title={`${role.company} · ${period} · ${duration}`}
            style={{
              left: `${offsetPct}%`,
              width: `${widthPct}%`,
              minWidth: "0.75rem",
              background: `color-mix(in oklab, ${role.color} 20%, transparent)`,
              borderLeft: `2px solid ${role.color}`,
            }}
          >
            {wide ? (
              <span className="truncate px-2 font-mono text-2xs text-muted">
                {duration}
              </span>
            ) : null}
            {span.open ? (
              <span
                className="absolute inset-y-0 -right-0.5 w-6 rounded-r-[3px]"
                style={{
                  background: `linear-gradient(90deg, transparent, color-mix(in oklab, ${role.color} 34%, transparent))`,
                }}
              />
            ) : null}
          </span>
          {!wide ? (
            <span
              className="absolute top-1/2 -translate-y-1/2 pl-1.5 font-mono text-2xs text-dim"
              style={{ left: `calc(${offsetPct}% + ${widthPct}%)` }}
            >
              {duration}
            </span>
          ) : null}
        </span>

        <span className="hidden text-right font-mono text-2xs sm:block">
          <span className="block text-muted tabular">{months}mo</span>
          <span className="block text-line-2 tabular">
            {role.projects.length} sys
          </span>
        </span>
      </button>

      <div className="collapsible" data-open={open} id={panelId}>
        <div>
          <div className="mb-4 grid gap-4 rounded-lg border border-line bg-panel-2/50 p-4 lg:grid-cols-12">
            <dl className="min-w-0 space-y-2 font-mono text-2xs lg:col-span-4">
              <p className="pb-1 text-dim">span attributes</p>
              <Attr label="company" value={role.company} />
              <Attr label="role" value={role.title} />
              <Attr label="period" value={period} />
              <Attr label="duration" value={`${duration} (${months}mo)`} />
              <Attr label="location" value={role.location} />
              {role.employment ? (
                <Attr label="type" value={role.employment} />
              ) : null}
              <Attr
                label="status"
                value={span.open ? "active" : "closed"}
                valueClass={span.open ? "text-ok" : "text-muted"}
              />
              {concurrent.length ? (
                <div className="flex gap-2">
                  <dt className="w-20 shrink-0 text-dim">parallel</dt>
                  <dd className="min-w-0 flex-1 space-y-0.5">
                    {concurrent.map((c) => (
                      <a
                        key={c.role.id}
                        href={`#role-${c.role.id}`}
                        className="block truncate underline decoration-line-2 underline-offset-2 hover:decoration-current"
                        style={{ color: c.role.color }}
                      >
                        {c.role.service}
                      </a>
                    ))}
                  </dd>
                </div>
              ) : null}
            </dl>

            <div className="min-w-0 lg:col-span-8">
              <p className="mb-3 text-sm leading-relaxed text-muted">
                {role.summary}
              </p>

              {role.context.length > 0 ? (
                <ul className="mb-5 space-y-1.5 border-t border-line/60 pt-3">
                  {role.context.map((line) => (
                    <li
                      key={line}
                      className="flex gap-2 text-xs leading-relaxed text-muted"
                    >
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-line-2" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <Marginalia className="border-t border-line/60 pt-3">
                child spans ({role.projects.length}) — what I actually built
              </Marginalia>

              <ol className="mt-3">
                {role.projects.map((project, i) => {
                  const meta = achievementMeta[project.kind];
                  const last = i === role.projects.length - 1;
                  // Only projects with confirmed dates get a bar, positioned
                  // inside the parent company's window.
                  const dated =
                    project.start && project.end
                      ? (() => {
                          const from = monthIndex(role.start);
                          const to =
                            monthIndex(role.end ?? project.end!) + 1;
                          const total = Math.max(1, to - from);
                          const pStart = monthIndex(project.start!);
                          const months = monthSpan(project.start!, project.end!);
                          return {
                            offsetPct: ((pStart - from) / total) * 100,
                            widthPct: (months / total) * 100,
                            label: formatPeriod(project.start!, project.end!),
                            duration: formatDuration(months),
                          };
                        })()
                      : null;
                  return (
                    <li key={project.slug} className="flex gap-3">
                      {/* tree rail */}
                      <span
                        className="relative flex w-3 shrink-0 flex-col items-center"
                        aria-hidden="true"
                      >
                        <span
                          className="h-3.5 w-px"
                          style={{ background: rail }}
                        />
                        <span
                          className="size-1.5 shrink-0 rounded-full"
                          style={{ background: role.color }}
                        />
                        {!last ? (
                          <span
                            className="w-px flex-1"
                            style={{ background: rail }}
                          />
                        ) : null}
                      </span>

                      <div className={last ? "min-w-0 pb-0" : "min-w-0 pb-5"}>
                        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                          <span className="font-mono text-2xs text-line-2 tabular">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="font-mono text-xs text-text">
                            {project.slug}
                          </span>
                          <span
                            className={`inline-flex shrink-0 items-center rounded border px-1.5 text-2xs ${meta.className}`}
                          >
                            {meta.label}
                          </span>
                          {project.outcome ? (
                            <span className="ml-auto shrink-0 rounded bg-panel px-1.5 py-0.5 text-2xs text-accent">
                              {project.outcome}
                            </span>
                          ) : null}
                        </div>

                        {dated ? (
                          <div className="mt-1.5">
                            <div className="flex items-baseline justify-between gap-3 font-mono text-2xs text-dim">
                              <span>{dated.label}</span>
                              <span className="text-line-2 tabular">
                                {dated.duration}
                              </span>
                            </div>
                            <div className="relative mt-1 h-1 rounded-full bg-line/70">
                              <div
                                className="absolute inset-y-0 rounded-full"
                                style={{
                                  left: `${dated.offsetPct}%`,
                                  width: `${dated.widthPct}%`,
                                  minWidth: "3px",
                                  background: role.color,
                                }}
                              />
                            </div>
                          </div>
                        ) : null}

                        <p className="mt-1 text-sm font-medium text-text">
                          {project.name}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {project.what}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="rounded border border-line bg-panel px-1.5 py-0.5 text-2xs text-dim"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Attr({
  label,
  value,
  valueClass = "text-muted",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="flex gap-2">
      <dt className="w-20 shrink-0 text-dim">{label}</dt>
      <dd className={`min-w-0 flex-1 break-words ${valueClass}`}>{value}</dd>
    </div>
  );
}

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div className="inline-flex rounded-lg border border-line bg-panel p-0.5">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={`rounded-md px-2.5 py-1.5 text-2xs transition-colors ${
            value === option.value
              ? "bg-panel-2 text-accent"
              : "text-dim hover:text-muted"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
