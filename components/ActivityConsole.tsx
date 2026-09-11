"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  levelColor,
  serverSnapshot,
  snapshot,
  subscribe,
} from "@/lib/telemetry";
import { pad } from "@/lib/trace";
import { CloseIcon } from "./ui";

function stamp(date: Date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}.${pad(date.getMilliseconds(), 3)}`;
}

export default function ActivityConsole({ onClose }: { onClose: () => void }) {
  const entries = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [entries]);

  return (
    <div
      className="fixed bottom-4 right-4 z-40 hidden w-[27rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-line-2 bg-bg/95 shadow-2xl shadow-black/60 backdrop-blur-xl md:flex"
      data-print="hide"
      role="log"
      aria-live="polite"
      aria-label="Session activity console"
    >
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
        <span className="font-mono text-2xs text-muted">session console</span>
        <span className="font-mono text-2xs text-line-2">
          {entries.length} events
        </span>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto rounded p-1 text-dim transition-colors hover:text-muted"
          aria-label="Close console"
        >
          <CloseIcon />
        </button>
      </div>

      <div
        ref={bodyRef}
        className="thin-scroll max-h-56 min-h-24 overflow-y-auto px-3 py-2 font-mono text-2xs leading-relaxed"
      >
        {entries.length === 0 ? (
          <p className="text-dim">waiting for events…</p>
        ) : (
          <ul className="space-y-0.5">
            {entries.map((entry) => (
              <li key={entry.id} className="flex gap-2">
                <span className="shrink-0 text-line-2 tabular">
                  {stamp(entry.at)}
                </span>
                <span
                  className={`w-11 shrink-0 ${levelColor[entry.level]}`}
                >
                  {entry.method}
                </span>
                <span className="min-w-0 flex-1 truncate text-muted">
                  {entry.msg}
                </span>
                {entry.meta ? (
                  <span className="shrink-0 text-dim">{entry.meta}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-line px-3 py-1.5 font-mono text-2xs text-line-2">
        real events from your session · never sent anywhere
      </div>
    </div>
  );
}
