"use client";

import { useEffect, useState } from "react";
import { log } from "@/lib/telemetry";

export default function CopyButton({
  value,
  label,
  copiedLabel = "copied",
  className = "",
}: {
  value: string;
  label: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      log("COPY", value, { level: "ok", meta: "clipboard" });
    } catch {
      log("COPY", "clipboard unavailable", { level: "warn", meta: "falling back to mailto" });
      window.location.href = `mailto:${value}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-2 font-mono text-2xs transition-colors ${
        copied ? "text-ok" : "text-dim hover:text-muted"
      } ${className}`}
    >
      {copied ? (
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
          <path
            d="M3.5 8.5l3 3 6-6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden="true">
          <rect
            x="5.75"
            y="5.75"
            width="7.5"
            height="7.5"
            rx="1.75"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M10.25 3.75a1.5 1.5 0 00-1.5-1.5h-4.5a2.5 2.5 0 00-2.5 2.5v4.5a1.5 1.5 0 001.5 1.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      )}
      {copied ? copiedLabel : label}
    </button>
  );
}
