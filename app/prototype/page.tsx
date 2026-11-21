// PROTOTYPE — throwaway. Four visual directions for the portfolio redesign,
// switchable via ?variant=A–F on /prototype. Sub-shape B (own route) because
// each variant replaces the whole home page, and `/` is prerendered — reading
// searchParams there would make it dynamic. Delete after a direction is chosen.
import type { Metadata } from "next";
import { Suspense } from "react";
import { getGithubData } from "@/lib/github";
import { shape } from "./data";
import { allFontVars } from "./fonts";
import PrototypeSwitcher from "./PrototypeSwitcher";
import RiverGauge from "./RiverGauge";
import FieldNotebook from "./FieldNotebook";
import FletcherPoster from "./FletcherPoster";
import CategoryStandard from "./CategoryStandard";
import PreciseNotebook from "./PreciseNotebook";

export const metadata: Metadata = { title: "Prototype — directions", robots: { index: false } };

const VARIANTS = [
  { key: "A", name: "River Gauge Board" },
  { key: "B", name: "Engineer's Field Notebook" },
  { key: "C", name: "Fletcher Wit Poster" },
  { key: "D", name: "Category standard" },
  { key: "E", name: "Gauge + notebook voice" },
  { key: "F", name: "Notebook + gauge precision" },
];

export default async function PrototypePage({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const { variant = "A" } = await searchParams;
  const data = shape(await getGithubData());

  return (
    <div className={allFontVars}>
      {variant === "A" && <RiverGauge d={data} />}
      {variant === "B" && <FieldNotebook d={data} />}
      {variant === "C" && <FletcherPoster d={data} />}
      {variant === "D" && <CategoryStandard d={data} />}
      {variant === "E" && <RiverGauge d={data} voice />}
      {variant === "F" && <PreciseNotebook d={data} />}
      <Suspense>
        <PrototypeSwitcher variants={VARIANTS} />
      </Suspense>
    </div>
  );
}
