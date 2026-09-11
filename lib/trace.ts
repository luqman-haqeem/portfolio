import { profile, type Role } from "./resume";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** `YYYY-MM` → absolute month index, so all date math is integer math. */
export function monthIndex(value: string): number {
  const [year, month] = value.split("-").map(Number);
  return year * 12 + (month - 1);
}

export function fromMonthIndex(index: number): { year: number; month: number } {
  return { year: Math.floor(index / 12), month: index % 12 };
}

/**
 * Month-granularity "now". Deliberately coarse so the server and client render
 * identical markup — no hydration mismatch from a ticking clock.
 */
export function currentMonthIndex(now: Date = new Date()): number {
  return now.getFullYear() * 12 + now.getMonth();
}

export function formatMonth(value: string): string {
  const { year, month } = fromMonthIndex(monthIndex(value));
  return `${MONTHS[month]} ${year}`;
}

export function formatPeriod(start: string, end: string | null): string {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : "Present"}`;
}

/** Inclusive month count: Dec 2020 → Feb 2021 reads as 3 months. */
export function monthSpan(start: string, end: string | null): number {
  const from = monthIndex(start);
  const to = end ? monthIndex(end) : currentMonthIndex();
  return Math.max(1, to - from + 1);
}

export function formatDuration(months: number): string {
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest} mo`;
  if (rest === 0) return `${years} yr`;
  return `${years} yr ${rest} mo`;
}

export type TraceSpan = {
  role: Role;
  /** Percentage offsets along the root span, ready to drop into styles. */
  offsetPct: number;
  widthPct: number;
  months: number;
  duration: string;
  period: string;
  open: boolean;
};

export type Timeline = {
  spans: TraceSpan[];
  ticks: { label: string; offsetPct: number }[];
  totalMonths: number;
  totalDuration: string;
  startLabel: string;
  endLabel: string;
};

export function buildTimeline(roles: Role[]): Timeline {
  const t0 = monthIndex(profile.careerStart);
  const t1 = Math.max(
    currentMonthIndex(),
    ...roles.map((r) => (r.end ? monthIndex(r.end) : currentMonthIndex())),
  );
  const total = t1 - t0 + 1;

  const spans: TraceSpan[] = roles.map((role) => {
    const from = monthIndex(role.start);
    const months = monthSpan(role.start, role.end);
    return {
      role,
      offsetPct: ((from - t0) / total) * 100,
      widthPct: (months / total) * 100,
      months,
      duration: formatDuration(months),
      period: formatPeriod(role.start, role.end),
      open: role.end === null,
    };
  });

  const ticks: { label: string; offsetPct: number }[] = [];
  const firstYear = fromMonthIndex(t0).year + 1;
  const lastYear = fromMonthIndex(t1).year;
  for (let year = firstYear; year <= lastYear; year += 1) {
    const offsetPct = ((year * 12 - t0) / total) * 100;
    if (offsetPct >= 0 && offsetPct <= 100) {
      ticks.push({ label: String(year), offsetPct });
    }
  }

  return {
    spans,
    ticks,
    totalMonths: total,
    totalDuration: formatDuration(total),
    startLabel: formatMonth(profile.careerStart),
    endLabel: "now",
  };
}

/** Deterministic, non-ticking uptime for the server-rendered first paint. */
export function coarseUptime(): string {
  return formatDuration(
    currentMonthIndex() - monthIndex(profile.careerStart) + 1,
  );
}

export type Uptime = {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** Live uptime since the first line of professional code. Client-only. */
export function preciseUptime(now: Date = new Date()): Uptime {
  const { year, month } = fromMonthIndex(monthIndex(profile.careerStart));
  const start = new Date(year, month, 1, 9, 0, 0);
  let elapsed = Math.max(0, now.getTime() - start.getTime());

  const yearMs = 365.25 * 24 * 60 * 60 * 1000;
  const years = Math.floor(elapsed / yearMs);
  elapsed -= years * yearMs;

  const dayMs = 24 * 60 * 60 * 1000;
  const days = Math.floor(elapsed / dayMs);
  elapsed -= days * dayMs;

  const hours = Math.floor(elapsed / (60 * 60 * 1000));
  elapsed -= hours * 60 * 60 * 1000;

  const minutes = Math.floor(elapsed / (60 * 1000));
  elapsed -= minutes * 60 * 1000;

  const seconds = Math.floor(elapsed / 1000);

  return { years, days, hours, minutes, seconds };
}

export const pad = (n: number, width = 2) => String(n).padStart(width, "0");


/**
 * Spans that genuinely ran in parallel. A single shared month is a job
 * transition, not concurrent work, so require at least two months of overlap.
 */
export function concurrentWith(
  spans: TraceSpan[],
  target: TraceSpan,
  minOverlap = 2,
): TraceSpan[] {
  const bounds = (s: TraceSpan) => ({
    from: monthIndex(s.role.start),
    to: s.role.end ? monthIndex(s.role.end) : currentMonthIndex(),
  });
  const a = bounds(target);

  return spans.filter((span) => {
    if (span.role.id === target.role.id) return false;
    const b = bounds(span);
    const overlap = Math.min(a.to, b.to) - Math.max(a.from, b.from) + 1;
    return overlap >= minOverlap;
  });
}
