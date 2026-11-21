/**
 * The product constraints from PRODUCT.md that a source edit can break, as
 * assertions. These read source text; they say nothing about how it renders.
 *
 * The label budgets this file used to hold belonged to the trace/dashboard
 * design and the components they counted no longer exist.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const sourceFiles = [
  ...readdirSync(join(root, "components")).map((f) => `components/${f}`),
  "lib/resume.ts",
  "app/layout.tsx",
  "app/page.tsx",
  "app/opengraph-image.tsx",
];

test("no email or phone number anywhere in source", () => {
  for (const file of sourceFiles) {
    // SVG geometry is long runs of digits and spaces; it is drawing, not data.
    const text = read(file).replace(/\b(d|viewBox)="[^"]*"/g, "");
    assert.equal(
      /[\w.+-]+@[\w-]+\.[\w.]+/.test(text),
      false,
      `${file} contains something shaped like an email address`,
    );
    assert.equal(
      /\+?\d[\d\s()-]{8,}\d/.test(text),
      false,
      `${file} contains something shaped like a phone number`,
    );
  }
});

test("no third-party scripts, fonts or analytics are requested", () => {
  const banned = [
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "googletagmanager",
    "google-analytics",
    "plausible.io",
    "<Script",
  ];
  for (const file of [...sourceFiles, "app/globals.css"]) {
    const text = read(file);
    for (const needle of banned) {
      assert.equal(text.includes(needle), false, `${file} references ${needle}`);
    }
  }
});

test("structured data stays country-only", () => {
  const layout = read("app/layout.tsx");
  assert.ok(layout.includes('addressCountry: "MY"'));
  assert.equal(/addressLocality|addressRegion|streetAddress/.test(layout), false);
});

test("globals.css starts with the Tailwind import", () => {
  const [first] = read("app/globals.css").split("\n");
  assert.equal(first.trim(), '@import "tailwindcss";');
});
