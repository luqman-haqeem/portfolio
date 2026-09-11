"use client";

import { useEffect, useState } from "react";
import { log } from "@/lib/telemetry";
import ActivityConsole from "./ActivityConsole";
import StatusBar from "./StatusBar";

export default function Shell() {
  const [consoleOpen, setConsoleOpen] = useState(false);

  // Seed the console with facts about the real session — nothing invented.
  useEffect(() => {
    const nav = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;

    log("GET", "/", {
      level: "ok",
      meta: nav ? `200 · ${Math.round(nav.duration)}ms` : "200",
    });
    log("ENV", `viewport ${window.innerWidth}×${window.innerHeight}`, {
      level: "debug",
      meta: `dpr ${window.devicePixelRatio}`,
    });
    log("ENV", Intl.DateTimeFormat().resolvedOptions().timeZone, {
      level: "debug",
      meta: "your timezone",
    });
    log("INFO", "press ` to toggle this console", { level: "warn" });
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "`" || event.metaKey || event.ctrlKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      ) {
        return;
      }
      event.preventDefault();
      setConsoleOpen((open) => !open);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <StatusBar
        consoleOpen={consoleOpen}
        onToggleConsole={() => setConsoleOpen((open) => !open)}
      />
      {consoleOpen ? (
        <ActivityConsole onClose={() => setConsoleOpen(false)} />
      ) : null}
    </>
  );
}
