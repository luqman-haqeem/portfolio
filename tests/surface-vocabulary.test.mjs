/**
 * The redesign's acceptance criteria, as assertions.
 *
 * Issues #2, #3, #4 and #6 all state their targets as counts you can grep for,
 * so they are checkable without a browser or a production build — the two
 * things this machine cannot do. These tests read source text; they say nothing
 * about how any of it renders. Issues #9 and #10 cover that, and stay open.
 *
 * The counts are ceilings, not equalities. Going further is a pass.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFileSync(join(root, p), "utf8");
const count = (text, needle) => text.split(needle).length - 1;

/**
 * The mono label — `font-mono text-2xs` — is the middle of three label
 * volumes. It earns its place on tabular data, where a fixed advance makes
 * columns line up and digits comparable. On prose it is just noise wearing a
 * uniform, and 66 of them site-wide is what issue #11 calls the tell.
 *
 * Counted in both spellings. `DataLabel` in components/ui.tsx *is* the class,
 * wrapped — so grepping only the literal string would let a refactor pass by
 * renaming its way out, dropping the count while the page looks identical. The
 * issues state their counts from the literal grep and so undercount by 13
 * site-wide; the ceilings below are theirs, applied to the real number, which
 * makes them slightly stricter than filed rather than looser.
 */
const MONO_LABELS = ["font-mono text-2xs", "<DataLabel"];

const budgets = [
  // #2 — the trace is the worst offender: 23 labels on one page.
  ["components/TraceSection.tsx", 10],
  // #3 — 16 across two card types and their surrounding strips.
  ["components/BuildsSection.tsx", 7],
  // #4 — 8, of which only the inspector reads real tabular state.
  ["components/StackTopology.tsx", 4],
];

for (const [file, ceiling] of budgets) {
  test(`${file} keeps mono labels within budget`, () => {
    const text = read(file);
    const found = MONO_LABELS.reduce((n, needle) => n + count(text, needle), 0);
    assert.ok(
      found <= ceiling,
      `${file}: ${found} mono labels, budget is ${ceiling}`,
    );
  });
}

/**
 * #5 — the raised surface survives on five instances, each argued for in a
 * comment beside it: two builds card types, the topology inspector, the trace
 * waterfall, and the floating console.
 *
 * The sixth was TraceSection's print panel. Issue #5 justified dropping it on
 * the grounds that it "only appears in the print path, where bg-panel and a
 * radius do nothing" — which is not true. `.print-panel`'s flattening
 * overrides live inside `@media print` in app/globals.css, and on screen that
 * div is the "plain text" view, reachable from the segmented control. Dropping
 * it is a visible change. It is still the right one, on the reasoning in
 * ui.tsx: that view is prose, and prose is bare.
 */
test("the raised surface is spent on five instances, not six", () => {
  const RAISED = "rounded-xl border border-line bg-panel";
  const files = [
    "components/BuildsSection.tsx",
    "components/StackTopology.tsx",
    "components/TraceSection.tsx",
    "components/LanguageComfortPanel.tsx",
    "components/ui.tsx",
  ];

  let instances = 0;
  for (const file of files) {
    for (const line of read(file).split("\n")) {
      if (!line.includes(RAISED)) continue;
      // ui.tsx defines the token and LanguageComfortPanel's docblock quotes it
      // while explaining why both its halves stopped using it. Neither is a
      // panel on the page.
      const isProse = /^\s*(\*|\/\/|\/\*)/.test(line);
      const isToken = line.includes("raised:");
      if (!isProse && !isToken) instances += 1;
    }
  }

  assert.equal(
    instances,
    4,
    `expected 4 literal raised panels (the console builds its own), found ${instances}`,
  );
});

/**
 * #6 — `.flow-line` and its `@keyframes dash-flow` animated the connectors in
 * a topology diagram that no longer draws them. Neither rule carries an
 * explanatory comment, so both go whole; the append-only convention and every
 * comment around them hold.
 */
test("the dead flow-line animation is gone", () => {
  const css = read("app/globals.css");
  assert.equal(count(css, ".flow-line"), 0, ".flow-line still present");
  assert.equal(count(css, "dash-flow"), 0, "dash-flow still present");
});

/**
 * The constraints from #11 that this PR could plausibly break. The rest of that
 * list — no analytics, country-only JSON-LD, no fabricated metrics — is not
 * something a label refactor can violate, so it is not asserted here.
 */
test("globals.css stays append-only from line 1", () => {
  const [first] = read("app/globals.css").split("\n");
  assert.equal(first.trim(), '@import "tailwindcss";');
});

test("every explanatory comment in globals.css survives", () => {
  // The redesign's reasoning lives in these comments; a refactor that quietly
  // sheds them loses the argument for its own decisions.
  // 14 as of the redesign. Deleting the two dead rules in #6 removes no
  // comment, so this number must not move.
  const comments = count(read("app/globals.css"), "/*");
  assert.ok(comments >= 14, `only ${comments} comment blocks left in globals.css`);
});

test("no email or phone number anywhere in source", () => {
  const files = [
    "lib/resume.ts",
    "components/ContactSection.tsx",
    "components/Footer.tsx",
    "app/layout.tsx",
    "app/page.tsx",
  ];
  for (const file of files) {
    const text = read(file);
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
