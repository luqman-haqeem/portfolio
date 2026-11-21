/**
 * The gauge's small vocabulary. Kept deliberately short: a section head, a
 * reading, and the water line. Everything else is set inline where it is used.
 */

/** A measurement: date, count, level. Condensed, tabular, never prose. */
export function Reading({
  children,
  className = "",
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "dd" | "dt" | "td" | "th";
}) {
  return (
    <Tag className={`font-reading font-semibold tracking-[0.04em] tabular-nums uppercase ${className}`}>
      {children}
    </Tag>
  );
}

/**
 * Section head: a 2px gauge rule, the heading, and the section's reading on
 * the same baseline. The reading is a measurement of the section's contents,
 * not an eyebrow, so it sits beside the heading rather than above it.
 */
export function SectionHead({
  id,
  title,
  reading,
  children,
}: {
  id: string;
  title: string;
  reading?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-t-2 border-current pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h2
          id={`${id}-title`}
          className="stretch-semi max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.6rem)] leading-[0.98] font-extrabold tracking-[-0.015em] text-balance"
        >
          {title}
        </h2>
        {reading && <Reading className="text-lg opacity-80">{reading}</Reading>}
      </div>
      {children && <div className="mt-5 max-w-[62ch] text-[17px] leading-relaxed">{children}</div>}
    </header>
  );
}

/** The water's surface: the top edge of every water field. */
export function WaterLine({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 24"
      preserveAspectRatio="none"
      className={`block h-5 w-full sm:h-6 ${className}`}
      aria-hidden="true"
    >
      <path
        d="M0 14 C 100 3, 200 25, 300 14 S 500 3, 600 14 S 800 25, 900 14 S 1100 3, 1200 14 V24 H0 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Drawn arrow for outbound links. One stroke weight, matches the gauge rules. */
export function OutArrow({ className = "size-[0.7em]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" className={`inline-block shrink-0 ${className}`} aria-hidden="true">
      <path d="M3 9 9 3M4.5 3H9v4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}
