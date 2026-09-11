/**
 * A tiny external store of session events. The console panel renders real
 * things the visitor did — nothing here is simulated, and nothing is sent
 * anywhere. Shaped for `useSyncExternalStore`, so the snapshot reference is
 * stable between writes.
 */

export type LogLevel = "info" | "ok" | "warn" | "debug";

export type LogEntry = {
  id: number;
  at: Date;
  level: LogLevel;
  method: string;
  msg: string;
  meta?: string;
};

const MAX = 60;
const EMPTY: readonly LogEntry[] = [];

let seq = 0;
let current: readonly LogEntry[] = EMPTY;
const listeners = new Set<() => void>();

export function log(
  method: string,
  msg: string,
  opts: { level?: LogLevel; meta?: string } = {},
) {
  const entry: LogEntry = {
    id: (seq += 1),
    at: new Date(),
    level: opts.level ?? "info",
    method,
    msg,
    meta: opts.meta,
  };

  const next = [...current, entry];
  current = next.length > MAX ? next.slice(next.length - MAX) : next;
  listeners.forEach((fn) => fn());
  return entry;
}

export function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

export function snapshot(): readonly LogEntry[] {
  return current;
}

export function serverSnapshot(): readonly LogEntry[] {
  return EMPTY;
}

export const levelColor: Record<LogLevel, string> = {
  info: "text-info",
  ok: "text-ok",
  warn: "text-accent",
  debug: "text-dim",
};
