"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, profile } from "@/lib/resume";
import { log } from "@/lib/telemetry";
import { StatusDot } from "./ui";

export default function StatusBar({
  onToggleConsole,
  consoleOpen,
}: {
  onToggleConsole: () => void;
  consoleOpen: boolean;
}) {
  const [active, setActive] = useState<string>("top");
  const [progress, setProgress] = useState(0);
  const seen = useRef(new Set<string>());

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;

        const id = visible.target.id;
        setActive(id);

        if (!seen.current.has(id)) {
          seen.current.add(id);
          const label = navItems.find((n) => n.id === id)?.label ?? id;
          log("GET", `/${id}`, { level: "ok", meta: `200 · ${label}` });
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.05, 0.3, 0.6] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.body.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl"
      data-print="hide"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-5 sm:px-8">
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2 font-mono text-xs"
        >
          <StatusDot color="bg-ok" />
          <span className="font-medium text-text">{profile.service}</span>
          <span className="hidden text-dim lg:inline">
            · {profile.tzLabel}
          </span>
        </a>

        <nav
          aria-label="Sections"
          className="no-scrollbar flex flex-1 items-center gap-1 overflow-x-auto"
        >
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={`shrink-0 rounded-md px-2.5 py-1.5 font-mono text-2xs transition-colors ${
                  isActive
                    ? "bg-panel-2 text-accent"
                    : "text-dim hover:bg-panel-2 hover:text-muted"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onToggleConsole}
          aria-pressed={consoleOpen}
          className={`hidden shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 font-mono text-2xs transition-colors md:inline-flex ${
            consoleOpen
              ? "border-accent/40 bg-accent/10 text-accent"
              : "border-line-2 text-dim hover:border-line-2 hover:text-muted"
          }`}
          title="Toggle the live request console"
        >
          <span
            className={`size-1.5 rounded-full ${
              consoleOpen ? "bg-accent" : "bg-dim"
            }`}
          />
          console
        </button>
      </div>

      <div
        className="h-px origin-left bg-accent/70 transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
    </header>
  );
}
