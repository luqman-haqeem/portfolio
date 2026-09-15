"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/resume";
import { pad, preciseUptime } from "@/lib/trace";
import { StatRow } from "./ui";

/**
 * The two rows that genuinely tick. Rendered as static placeholders on the
 * server, then filled in after mount so there is no hydration mismatch.
 */
export default function LiveStats({ fallbackUptime }: { fallbackUptime: string }) {
  const [uptime, setUptime] = useState<string | null>(null);
  const [clock, setClock] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const u = preciseUptime(now);
      setUptime(
        `${u.years}y ${u.days}d ${pad(u.hours)}:${pad(u.minutes)}:${pad(u.seconds)}`,
      );
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: profile.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now),
      );
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      {/* `uptime` before, in green, as though this were a service health metric.
          It is the elapsed time since the first line of professional code — real,
          worth showing, and not an availability figure. Renamed, and no longer
          coloured `ok`, since it isn't reporting a healthy state. */}
      <StatRow label="writing code for" first>
        <span className="tabular text-text">{uptime ?? fallbackUptime}</span>
        <span className="ml-1.5 hidden text-dim sm:inline">
          since {profile.careerStart.replace("-", ".")}
        </span>
      </StatRow>
      <StatRow label="local time">
        <span className="tabular text-text">{clock ?? "--:--:--"}</span>
        <span className="ml-1.5 text-dim">{profile.tzLabel}</span>
        {clock === null ? null : (
          <span className="caret ml-0.5 text-accent">_</span>
        )}
      </StatRow>
    </>
  );
}
