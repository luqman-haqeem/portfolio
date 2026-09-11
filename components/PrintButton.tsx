"use client";

import { log } from "@/lib/telemetry";

export default function PrintButton({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        log("GET", "/resume.pdf", { level: "info", meta: "render to print dialog" });
        window.print();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
