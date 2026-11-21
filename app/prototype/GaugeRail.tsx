"use client";
// PROTOTYPE — throwaway. The staff gauge: water rises with scroll, section levels are the nav.
import { useEffect, useState } from "react";

const LEVELS = [
  { id: "g-top", label: "Reading", m: 0 },
  { id: "g-work", label: "Work", m: 1 },
  { id: "g-lang", label: "Languages", m: 2 },
  { id: "g-builds", label: "Builds", m: 3 },
  { id: "g-reach", label: "Reach", m: 4 },
];
const MAX = 5;

export default function GaugeRail() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const level = (p * (MAX - 0.6) + 0.3).toFixed(2);

  return (
    <nav aria-label="Sections" className="sticky top-0 hidden h-screen py-6 pl-5 lg:block">
      <div className="relative flex h-full">
        {/* plate */}
        <div className="relative h-full w-[64px] overflow-hidden border-2 border-[#141816] bg-white">
          {Array.from({ length: MAX * 10 }, (_, i) => {
            const fromBottom = (i / (MAX * 10)) * 100;
            const isMetre = i % 10 === 0;
            const isE = i % 2 === 0;
            const right = Math.floor(i / 10) % 2 === 1;
            return (
              <div
                key={i}
                className="absolute bg-[#141816]"
                style={{
                  bottom: `${fromBottom}%`,
                  height: `${100 / (MAX * 10) / 2}%`,
                  width: isMetre ? "100%" : isE ? "58%" : "30%",
                  [right ? "right" : "left"]: 0,
                }}
              />
            );
          })}
          {Array.from({ length: MAX }, (_, m) => (
            <span
              key={m}
              className="absolute right-1 bg-white px-0.5 font-[family-name:var(--p-barlow)] text-[15px] leading-none font-bold text-[#d7322a]"
              style={{ bottom: `calc(${(m / MAX) * 100}% + 4px)` }}
            >
              {m}
            </span>
          ))}
          {/* water */}
          <div
            className="absolute inset-x-0 bottom-0 bg-[#3d6e6a]/80 mix-blend-multiply transition-[height] duration-300 ease-out"
            style={{ height: `${(Number(level) / MAX) * 100}%` }}
          />
        </div>
        {/* alert bands */}
        <div className="flex h-full w-[10px] flex-col-reverse border-y-2 border-r-2 border-[#141816]">
          <div className="h-[50%] bg-[#2f8f4e]" />
          <div className="h-[25%] bg-[#f2b318]" />
          <div className="h-[25%] bg-[#d7322a]" />
        </div>
        {/* level labels = nav */}
        <div className="relative ml-2 h-full w-[60px]">
          {LEVELS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="absolute left-0 -translate-y-1/2 font-[family-name:var(--p-barlow)] text-[13px] font-bold tracking-wide whitespace-nowrap text-[#141816] uppercase hover:text-[#d7322a]"
              style={{ bottom: `${((l.m + 0.3) / MAX) * 100}%` }}
            >
              — {l.label}
            </a>
          ))}
          <div
            className="absolute left-0 translate-y-1/2 bg-[#141816] px-1 font-[family-name:var(--p-barlow)] text-[13px] font-bold text-white tabular-nums transition-[bottom] duration-300 ease-out"
            style={{ bottom: `${(Number(level) / MAX) * 100}%` }}
            aria-hidden="true"
          >
            {level}m
          </div>
        </div>
      </div>
    </nav>
  );
}
