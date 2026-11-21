"use client";
// PROTOTYPE — throwaway. Floating variant switcher; never rendered in production.
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function PrototypeSwitcher({
  variants,
}: {
  variants: { key: string; name: string }[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("variant") ?? variants[0].key;
  const idx = Math.max(0, variants.findIndex((v) => v.key === current));

  const go = useCallback(
    (delta: number) => {
      const next = variants[(idx + delta + variants.length) % variants.length];
      router.replace(`?variant=${next.key}`, { scroll: false });
    },
    [idx, router, variants],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
      className="fixed bottom-4 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-1 rounded-full bg-[#ff2bd6] p-1 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(0,0,0,.35)] ring-2 ring-white"
    >
      <button onClick={() => go(-1)} className="rounded-full px-3 py-1.5 hover:bg-white/20" aria-label="Previous variant">←</button>
      <span className="min-w-[14rem] px-2 text-center">
        PROTOTYPE · {variants[idx].key} ({variants[idx].name})
      </span>
      <button onClick={() => go(1)} className="rounded-full px-3 py-1.5 hover:bg-white/20" aria-label="Next variant">→</button>
    </div>
  );
}
