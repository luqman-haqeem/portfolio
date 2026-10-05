import type { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Three surface tiers, because one was being asked to do every job.
 *
 * The page previously had fifteen instances of `rounded-xl border border-line
 * bg-panel` — hero stats, both contact halves, both language panels, three
 * topology panels, three trace panels, two card types, the console. When every
 * region is a card the container stops carrying meaning and becomes wallpaper,
 * and a uniform card grid is what a generated dashboard looks like regardless of
 * how specific the writing inside it is.
 *
 * So the tier now says something:
 *
 *   bare   — no border, no fill. Prose and argument. The default, and most of
 *            what used to be boxed belongs here.
 *   ruled  — a hairline top rule, no radius, no fill. Tabular data. A rule is
 *            enough to say "these rows belong together".
 *   raised — the old treatment, kept only for genuinely discrete objects: the
 *            two builds card types and the console.
 */
export type Surface = "bare" | "ruled" | "raised";

const surfaces: Record<Surface, string> = {
  bare: "",
  ruled: "border-t border-line",
  raised: "rounded-xl border border-line bg-panel",
};

export function Panel({
  children,
  className = "",
  surface = "raised",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  surface?: Surface;
  as?: "div" | "article" | "aside" | "li";
}) {
  return (
    <Tag className={`${surfaces[surface]} ${className}`}>{children}</Tag>
  );
}

export function StatusDot({
  color = "bg-ok",
  pulse = true,
  className = "",
}: {
  color?: string;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span className={`relative inline-flex size-2 ${className}`} aria-hidden="true">
      <span
        className={`relative inline-flex size-2 rounded-full ${color} ${
          pulse ? "pulse-ring" : ""
        }`}
      />
    </span>
  );
}

export function Chip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md border border-line-2 bg-panel-2 px-2 py-0.5 font-mono text-2xs text-muted ${className}`}
    >
      {children}
    </span>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded border border-line-2 bg-panel-2 px-1.5 py-0.5 font-mono text-2xs text-muted">
      {children}
    </kbd>
  );
}

/**
 * Three label volumes, replacing a single one.
 *
 * There were 82 uses of `font-mono text-2xs` across this page — the same 11px
 * dim mono treatment on section labels, data keys, contact rows, disclosures and
 * timestamps alike. A hierarchy with one level is not a hierarchy; it flattens
 * into a uniform grey murmur where nothing can be scanned because nothing is
 * louder than anything else.
 *
 * `DataLabel` is the surviving mono key, and it should only appear where the
 * content really is tabular. `Marginalia` is for asides that must be legible but
 * must not compete: sync state, disclosures, timestamps.
 */
export function DataLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-mono text-2xs text-dim ${className}`}>
      {children}
    </span>
  );
}

export function Marginalia({
  children,
  className = "",
  as: Tag = "p",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
} & Omit<ComponentPropsWithoutRef<"p">, "className" | "children">) {
  return (
    <Tag className={`text-2xs leading-relaxed text-dim ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

export function StatRow({
  label,
  children,
  first = false,
}: {
  label: string;
  children: ReactNode;
  first?: boolean;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 px-4 py-2.5 font-mono text-xs ${
        first ? "" : "border-t border-line"
      }`}
    >
      <span className="shrink-0 text-dim">{label}</span>
      <span className="min-w-0 truncate text-right">{children}</span>
    </div>
  );
}

/**
 * Section head. The heading carries the section; a hairline rule runs out from
 * it to the right margin, and `aside` sits at the end of that rule.
 *
 * There is deliberately no `01 / route` eyebrow. Numbering four sections that
 * are not read in order tells the reader nothing they can act on, and a
 * mono-caps counter above every heading is the single most recognisable tell of
 * a generated page. The rule does the same structural job without pretending to
 * be content.
 */
export function SectionHeading({
  title,
  description,
  aside,
}: {
  title: string;
  description: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="section-head mb-10" data-reveal>
      {/* Single column below sm so the aside never squeezes the heading into a
          two-word-per-line column (gate 52). */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-4">
        {/* Display serif, roman, weight 400. No `font-semibold`: Instrument
            Serif ships one weight, so asking for bold gets a synthesised one
            that smears the thin strokes. No italic either — italic display is
            its own tell. */}
        <h2 className="font-display text-3xl leading-tight text-text sm:text-4xl">
          {title}
        </h2>
        <span className="hidden flex-1 sm:block">
          <span className="section-head-rule block" />
        </span>
        {/* shrink-0: the rule above is the only thing that should give up width,
            otherwise a long aside gets compressed into two lines. */}
        {aside ? <span className="shrink-0">{aside}</span> : null}
      </div>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}

/**
 * Section width. Every section used to be `max-w-6xl` with `py-12 sm:py-16` —
 * one width, one padding, one vertical beat, five times. An editorial spine with
 * no variation in the spine is a template with good content in it.
 *
 *   prose — a reading measure for sections that are mostly argument
 *   wide  — the old 6xl, for the trace waterfall and the topology
 *   bleed — full width, for the one section that earns going edge to edge
 */
export type SectionWidth = "prose" | "wide" | "bleed";

const widths: Record<SectionWidth, string> = {
  prose: "mx-auto w-full max-w-3xl px-5 sm:px-8",
  wide: "mx-auto w-full max-w-6xl px-5 sm:px-8",
  bleed: "w-full px-5 sm:px-8",
};

/** Vertical rhythm varies with the weight of what follows, rather than py-16 flat. */
export type SectionPace = "tight" | "normal" | "loose";

const paces: Record<SectionPace, string> = {
  tight: "py-10 sm:py-12",
  normal: "py-12 sm:py-16",
  loose: "py-16 sm:py-24",
};

export function Section({
  id,
  children,
  className = "",
  width = "wide",
  pace = "normal",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  width?: SectionWidth;
  pace?: SectionPace;
}) {
  return (
    <section
      id={id}
      className={`${widths[width]} ${paces[pace]} scroll-mt-24 ${className}`}
    >
      {children}
    </section>
  );
}

export function Divider() {
  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8" aria-hidden="true">
      {/* via-line-2 rather than via-line: at 1px, fading to transparent at both
          ends, #1c2027 on a #08090b background is imperceptible — so the space
          around it read as a void instead of a section break. */}
      <div className="h-px bg-gradient-to-r from-transparent via-line-2 to-transparent" />
    </div>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`size-3.5 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M4 12L12 4M12 4H6M12 4V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Stands in for "↳", which isn't in the webfont subset. */
export function CornerArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`size-3 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M4 2.5v6a2 2 0 002 2h6m0 0l-2.5-2.5M12 10.5L9.5 13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`size-3 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M4 4l8 8M12 4l-8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ChevronIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={`size-3.5 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
