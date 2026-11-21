// PROTOTYPE — throwaway. Self-hosted at build time by next/font (no runtime third-party request).
import {
  Archivo,
  Barlow_Condensed,
  Kalam,
  Atkinson_Hyperlegible,
  Permanent_Marker,
  Work_Sans,
} from "next/font/google";

export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--p-archivo", display: "swap" });
export const barlowCond = Barlow_Condensed({ subsets: ["latin"], weight: ["500", "700"], variable: "--p-barlow", display: "swap" });
export const kalam = Kalam({ subsets: ["latin"], weight: ["300", "400", "700"], variable: "--p-kalam", display: "swap" });
export const atkinson = Atkinson_Hyperlegible({ subsets: ["latin"], weight: ["400", "700"], variable: "--p-atkinson", display: "swap" });
export const marker = Permanent_Marker({ subsets: ["latin"], weight: "400", variable: "--p-marker", display: "swap" });
export const workSans = Work_Sans({ subsets: ["latin"], variable: "--p-work", display: "swap" });

export const allFontVars = [archivo, barlowCond, kalam, atkinson, marker, workSans]
  .map((f) => f.variable)
  .join(" ");
