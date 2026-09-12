import type { ReactNode } from "react";

export function Panel({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "aside" | "li";
}) {
  return (
    <Tag
      className={`rounded-xl border border-line bg-panel ${className}`}
    >
      {children}
    </Tag>
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

export function SectionHeading({
  index,
  route,
  title,
  description,
  aside,
}: {
  index: string;
  route: string;
  title: string;
  description: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <div className="mb-10" data-reveal>
      <div className="flex items-center gap-3 font-mono text-2xs text-dim">
        <span className="text-accent">{index}</span>
        <span className="text-line-2">/</span>
        <span className="text-muted">{route}</span>
        <span className="h-px flex-1 bg-line" />
        {aside}
      </div>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        {description}
      </p>
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-12 sm:px-8 sm:py-16 ${className}`}
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
