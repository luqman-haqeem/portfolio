"use client";

import { useMemo, useRef, useState } from "react";
import {
  entityLabels,
  practices,
  projects,
  skillLayers,
  type SkillLayer,
  type SkillNode,
} from "@/lib/resume";
import { log } from "@/lib/telemetry";
import { CornerArrow, DataLabel, Marginalia } from "./ui";

const allNodes = skillLayers.flatMap((layer) =>
  layer.nodes.map((node) => ({ node, layer })),
);

const projectIds = new Set(projects.map((p) => p.id));

function hrefFor(entityId: string) {
  return projectIds.has(entityId) ? "#builds" : `#role-${entityId}`;
}

export default function StackTopology() {
  const [selected, setSelected] = useState<{
    node: SkillNode;
    layer: SkillLayer;
  } | null>(null);
  const inspectorRef = useRef<HTMLDivElement>(null);

  const evidenced = useMemo(
    () => allNodes.filter(({ node }) => node.usedIn.length > 0).length,
    [],
  );

  /** Nodes that shipped alongside the selected one, derived from shared usage. */
  const related = useMemo(() => {
    if (!selected || selected.node.usedIn.length === 0) return new Set<string>();
    const usage = new Set(selected.node.usedIn);
    return new Set(
      allNodes
        .filter(
          ({ node }) =>
            node.name !== selected.node.name &&
            node.usedIn.some((id) => usage.has(id)),
        )
        .map(({ node }) => node.name),
    );
  }, [selected]);

  const pick = (node: SkillNode, layer: SkillLayer) => {
    const next = selected?.node.name === node.name ? null : { node, layer };
    setSelected(next);
    if (next) {
      log("QUERY", `stack.${node.name}`, {
        level: "info",
        meta: node.usedIn.length
          ? `${node.usedIn.length} usage${node.usedIn.length > 1 ? "s" : ""}`
          : "no linked span",
      });
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        inspectorRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  return (
      <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          {/* Strata, not boxes wired together.
              Each layer used to be its own `rounded-xl border bg-panel` card with
              a little SVG line plumbed between them — six cards and five wires to
              say "these sit on top of each other", which is what stacked rules
              already say. The rules also make the column read as one object
              instead of six, so the inspector beside it has something to be
              distinct from. */}
          {skillLayers.map((layer, i) => (
            <div key={layer.id}>
              <div
                className="border-t border-line py-4"
                data-reveal
                style={{ "--reveal-delay": `${i * 45}ms` } as React.CSSProperties}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <span
                    className="font-mono text-xs"
                    style={{ color: layer.accent }}
                  >
                    {layer.label}
                  </span>
                  <Marginalia>{layer.hint}</Marginalia>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {layer.nodes.map((node) => {
                    const isSelected = selected?.node.name === node.name;
                    const isRelated = related.has(node.name);
                    const dimmed = selected !== null && !isSelected && !isRelated;

                    return (
                      <button
                        key={node.name}
                        type="button"
                        onClick={() => pick(node, layer)}
                        aria-pressed={isSelected}
                        className={`rounded-md border px-2.5 py-1.5 text-xs transition-all duration-200 ${
                          isSelected
                            ? "text-bg"
                            : isRelated
                              ? "border-line-2 bg-panel-2 text-text"
                              : "border-line bg-panel-2/60 text-muted hover:border-line-2 hover:text-text"
                        } ${dimmed ? "opacity-30" : ""}`}
                        style={
                          isSelected
                            ? {
                                backgroundColor: layer.accent,
                                borderColor: layer.accent,
                              }
                            : isRelated
                              ? { borderColor: `color-mix(in oklab, ${layer.accent} 45%, transparent)` }
                              : undefined
                        }
                      >
                        {node.name}
                        {node.usedIn.length > 0 ? (
                          /* Boxed, not just spaced: names that end in a digit
                             ("CodeIgniter 4") ran straight into the count and
                             read as "CodeIgniter 4 1". */
                          <span
                            className={`ml-1.5 rounded-sm px-1 py-px text-[10px] leading-none tabular ${
                              isSelected
                                ? "bg-bg/25 text-bg"
                                : "bg-line text-dim"
                            }`}
                            aria-label={`used in ${node.usedIn.length} ${
                              node.usedIn.length === 1 ? "place" : "places"
                            }`}
                          >
                            {node.usedIn.length}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          ))}

          {/* Sits in the layers column, matching their width. Full-width under
              both columns made it look like it belonged to neither. */}
          <div className="mt-2 border-t border-line py-4" data-reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <span className="font-mono text-xs text-muted">
                ways of working
              </span>
              <Marginalia>process and tooling, not languages</Marginalia>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {practices.map((practice) => (
                <span
                  key={practice}
                  className="rounded-md border border-line bg-panel-2/60 px-2.5 py-1.5 text-xs text-muted"
                >
                  {practice}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <div
            ref={inspectorRef}
            className="lg:sticky lg:top-20"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            {/* One of the few surfaces that stays raised. The left column is now
                stacked rules, so the inspector needs to read as a separate
                instrument rather than more of the same list — and unlike the card
                header strips this pass removed, this strip holds a real control
                and a real state, so it is a toolbar, not chrome. */}
            <div className="rounded-xl border border-line bg-panel">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <DataLabel>inspector</DataLabel>
                {selected ? (
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="ml-auto font-mono text-2xs text-dim transition-colors hover:text-muted"
                  >
                    clear
                  </button>
                ) : (
                  <DataLabel className="ml-auto text-line-2">idle</DataLabel>
                )}
              </div>

              {selected ? (
                <div className="p-4">
                  <p
                    className="font-mono text-lg"
                    style={{ color: selected.layer.accent }}
                  >
                    {selected.node.name}
                  </p>
                  <Marginalia className="mt-1">
                    layer: {selected.layer.label.toLowerCase()}
                  </Marginalia>

                  {selected.node.usedIn.length > 0 ? (
                    <>
                      <Marginalia className="mt-5 text-muted">
                        shipped in ({selected.node.usedIn.length})
                      </Marginalia>
                      <ul className="mt-2 space-y-1">
                        {selected.node.usedIn.map((id) => (
                          <li key={id}>
                            <a
                              href={hrefFor(id)}
                              className="flex items-start gap-2 rounded-md px-2 py-1.5 text-xs text-text transition-colors hover:bg-panel-2"
                            >
                              <CornerArrow className="mt-0.5 shrink-0 text-dim" />
                              <span>{entityLabels[id] ?? id}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="mt-5 rounded-lg border border-line bg-panel-2/60 p-3 text-xs leading-relaxed text-muted">
                      No production span linked to this one yet —{" "}
                      {selected.node.note
                        ? selected.node.note.toLowerCase()
                        : "part of the general toolkit"}
                      . I&apos;d rather label that honestly than pad the list.
                    </p>
                  )}

                  {related.size > 0 ? (
                    <>
                      <Marginalia className="mt-5 text-muted">
                        appears alongside ({related.size})
                      </Marginalia>
                      <Marginalia className="mt-2">
                        {[...related].join(" · ")}
                      </Marginalia>
                    </>
                  ) : null}
                </div>
              ) : (
                <div className="p-4">
                  <p className="text-sm leading-relaxed text-muted">
                    Pick any node on the left. I&apos;ll show you which jobs and
                    projects it shipped in, and what it usually sits next to in
                    my work.
                  </p>
                  <div className="mt-4 space-y-2 border-t border-line pt-4 font-mono text-2xs">
                    <div className="flex justify-between">
                      <span className="text-dim">layers</span>
                      <span className="text-muted">{skillLayers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dim">nodes</span>
                      <span className="text-muted">{allNodes.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dim">linked to a span</span>
                      <span className="text-ok">{evidenced}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dim">deepest strength</span>
                      <span className="text-accent">application services</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
