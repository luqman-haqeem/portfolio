"use client";

import { useEffect } from "react";

/**
 * Mounted once. Watches every `[data-reveal]` element in the document and flips
 * `data-visible` when it scrolls into view, so the rest of the tree can stay
 * as server components with zero per-element JS.
 */
export default function RevealObserver() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]")
        .forEach((el) => el.setAttribute("data-visible", "true"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "true");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    const scan = () => {
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])")
        .forEach((el) => observer.observe(el));
    };

    scan();
    const mutation = new MutationObserver(scan);
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutation.disconnect();
    };
  }, []);

  return null;
}
