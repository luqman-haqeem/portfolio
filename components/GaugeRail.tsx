"use client";

import { useEffect, useState } from "react";

/**
 * The staff gauge. Each section is one metre on the plate; the water level is
 * where you are reading, interpolated between section tops, so the water
 * reaches a section's mark as you arrive at it. The labels are the navigation.
 *
 * Desktop: a sticky vertical plate down the left edge.
 * Narrow screens: the same gauge laid flat as a sticky strip under the top edge.
 */

export const LEVELS = [
  { id: "top", label: "Reading" },
  { id: "work", label: "Work" },
  { id: "calibration", label: "Languages" },
  { id: "builds", label: "Builds" },
  { id: "reach", label: "Reach" },
] as const;

const MAX = LEVELS.length;
/**
 * The plate face, drawn the way JPS paints one: alternating "E" blocks, each a
 * spine with three arms, swapping side block by block, and the metres painted
 * alternately black and red. One E per 10 cm, so five metres stay legible at
 * rail height (a real plate's 5 cm E's would be under 2px here).
 */
function GaugeFace() {
  const blocks = MAX * 10;
  const H = blocks * 10;
  return (
    <svg
      viewBox={`0 0 12 ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {Array.from({ length: blocks }, (_, b) => {
        const paint = Math.floor(b / 10) % 2 === 0 ? "var(--color-ink)" : "var(--color-level-danger)";
        const right = b % 2 === 1;
        const top = H - (b + 1) * 10;
        const armX = right ? 5.5 : 0.6;
        const spineX = right ? 10.2 : 0.6;
        return (
          <g key={b} fill={paint}>
            <rect x={spineX} y={top} width={1.2} height={10} />
            <rect x={armX} y={top} width={5.9} height={2} />
            <rect x={armX} y={top + 4} width={5.9} height={2} />
            <rect x={armX} y={top + 8} width={5.9} height={2} />
          </g>
        );
      })}
    </svg>
  );
}

function useLevel() {
  const [level, setLevel] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const probe = window.scrollY + window.innerHeight * 0.35;
      const tops = LEVELS.map((l) => {
        const el = document.getElementById(l.id);
        return el ? el.getBoundingClientRect().top + window.scrollY : 0;
      });
      const docEnd = document.documentElement.scrollHeight;
      let next = 0;
      for (let i = 0; i < tops.length; i++) {
        const start = tops[i];
        const end = tops[i + 1] ?? docEnd;
        if (probe >= start) next = i + Math.min(1, (probe - start) / Math.max(1, end - start));
      }
      // At the very bottom of the page the last section can be shorter than
      // the probe offset; let the water reach the top of the plate anyway.
      if (window.scrollY + window.innerHeight >= docEnd - 2) next = MAX;
      setLevel(next);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return level;
}

export default function GaugeRail() {
  const level = useLevel();
  const active = Math.min(MAX - 1, Math.floor(level));
  const pct = (level / MAX) * 100;

  return (
    <>
      {/* ---------------- desktop: the plate ---------------- */}
      <nav
        aria-label="Sections"
        className="sticky top-0 hidden h-svh py-6 pl-6 lg:block"
        data-print="hide"
      >
        <div className="flex h-full">
          <div className="relative h-full w-16 shrink-0 overflow-hidden border-2 border-ink bg-plate">
            <GaugeFace />
            {Array.from({ length: MAX }, (_, m) => (
              <span
                key={m}
                className="absolute left-1/2 -translate-x-1/2 bg-plate px-0.5 font-reading text-[15px] leading-none font-bold text-danger-ink"
                style={{ bottom: `calc(${(m / MAX) * 100}% + 3px)` }}
                aria-hidden="true"
              >
                {m}
              </span>
            ))}
            <div
              className="absolute inset-x-0 bottom-0 bg-water/80 mix-blend-multiply transition-[height] duration-300 ease-(--ease-water)"
              style={{ height: `${pct}%` }}
              aria-hidden="true"
            />
          </div>

          <ol className="relative ml-3 h-full w-24 shrink-0">
            {LEVELS.map((l, i) => (
              <li
                key={l.id}
                className="absolute left-0 translate-y-1/2"
                style={{ bottom: `${((i + 0.5) / MAX) * 100}%` }}
              >
                <a
                  href={`#${l.id}`}
                  aria-current={active === i ? "location" : undefined}
                  className="group flex items-center gap-1.5 font-reading text-[14px] font-bold tracking-[0.06em] whitespace-nowrap uppercase hover:text-water aria-[current]:text-ink"
                >
                  <span className="h-0.5 w-2.5 bg-ink group-aria-[current]:w-5" aria-hidden="true" />
                  <span className="opacity-60 group-hover:opacity-100 group-aria-[current]:opacity-100">
                    {l.label}
                  </span>
                </a>
              </li>
            ))}
            <li
              className="absolute left-0 translate-y-1/2 bg-ink px-1 font-reading text-[13px] font-bold text-enamel tabular-nums transition-[bottom] duration-300 ease-(--ease-water)"
              style={{ bottom: `${pct}%` }}
              aria-hidden="true"
            >
              {level.toFixed(2)} m
            </li>
          </ol>
        </div>
      </nav>

      {/* ---------------- narrow: the gauge laid flat ---------------- */}
      <nav
        aria-label="Sections"
        className="sticky top-0 z-40 border-b-2 border-ink bg-enamel lg:hidden"
        data-print="hide"
      >
        <ol className="flex items-stretch justify-between overflow-x-auto px-4 [scrollbar-width:none] sm:px-8">
          {LEVELS.slice(1).map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={active === i + 1 ? "location" : undefined}
                className="block border-b-[3px] border-transparent py-3 font-reading text-[15px] font-bold tracking-[0.06em] whitespace-nowrap uppercase opacity-65 aria-[current]:border-ink aria-[current]:opacity-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ol>
        <div
          className="relative h-2.5 border-t-2 border-ink bg-plate"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--color-ink) 0 2px, transparent 2px 10px)",
          }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-y-0 left-0 bg-water/85 mix-blend-multiply transition-[width] duration-300 ease-(--ease-water)"
            style={{ width: `${pct}%` }}
          />
        </div>
      </nav>
    </>
  );
}
