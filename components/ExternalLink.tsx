"use client";

import type { ReactNode } from "react";
import { log } from "@/lib/telemetry";

export default function ExternalLink({
  href,
  children,
  className = "",
  logAs,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  logAs?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() =>
        log("OPEN", logAs ?? href, { level: "info", meta: "new tab" })
      }
    >
      {children}
    </a>
  );
}
