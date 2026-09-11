"use client";

import { useMemo, useRef, useState } from "react";
import {
  entityLabels,
  projects,
  skillLayers,
  type SkillLayer,
  type SkillNode,
} from "@/lib/resume";
import { log } from "@/lib/telemetry";
import { CornerArrow, Section, SectionHeading } from "./ui";

const allNodes = skillLayers.flatMap((layer) =>
  layer.nodes.map((node) => ({ node, layer })),
);

const projectIds = new Set(projects.map((p) => p.id));

function hrefFor(entityId: string) {
  return projectIds.has(entityId) ? "#deployments" : `#role-${entityId}`;
}

export default function StackSection() {
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
    <Section id="stack">
      <SectionHeading
        index="02"
        route="stack"
        title="The stack, by layer"
        description={
          <>
            Not an alphabetical badge dump. This is roughly how a request moves
            through the systems I build — and{" "}
            <span className="text-text">every node is clickable</span>, so you
            can check where I actually used it rather than taking my word for it.
          </>
        }
        aside={
          <span className="hidden font-mono text-2xs text-dim sm:inline">
            {evidenced}/{allNodes.length} nodes linked to a span
          </span>
        }
      />

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-7">
          {skillLayers.map((layer, i) => (
            <div key={layer.id}>
              <div
                className="rounded-xl border border-line bg-panel p-3.5 sm:p-4"
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
                  <span className="font-mono text-2xs text-dim">
                    {layer.hint}
                  </span>
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
                        className={`rounded-md border px-2.5 py-1.5 font-mono text-2xs transition-all duration-200 ${
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
                          <span
                            className={
                              isSelected ? "ml-1.5 opacity-70" : "ml-1.5 text-dim"
                            }
                          >
                            {node.usedIn.length}
                          </span>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              {i < skillLayers.length - 1 ? (
                <div className="flex justify-center py-1.5" aria-hidden="true">
                  <svg width="10" height="20" viewBox="0 0 10 20" fill="none">
                    <path
                      d="M5 0 V20"
                      stroke="var(--color-line-2)"
                      strokeWidth="1.5"
                      className="flow-line"
                    />
                  </svg>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="min-w-0 lg:col-span-5">
          <div
            ref={inspectorRef}
            className="lg:sticky lg:top-20"
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          >
            <div className="rounded-xl border border-line bg-panel">
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <span className="font-mono text-2xs text-dim">inspector</span>
                {selected ? (
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="ml-auto font-mono text-2xs text-dim transition-colors hover:text-muted"
                  >
                    clear
                  </button>
                ) : (
                  <span className="ml-auto font-mono text-2xs text-line-2">
                    idle
                  </span>
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
                  <p className="mt-1 font-mono text-2xs text-dim">
                    layer: {selected.layer.label.toLowerCase()}
                  </p>

                  {selected.node.usedIn.length > 0 ? (
                    <>
                      <p className="mt-5 font-mono text-2xs text-muted">
                        shipped in ({selected.node.usedIn.length})
                      </p>
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
                      <p className="mt-5 font-mono text-2xs text-muted">
                        appears alongside ({related.size})
                      </p>
                      <p className="mt-2 font-mono text-2xs leading-relaxed text-dim">
                        {[...related].join(" · ")}
                      </p>
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
    </Section>
  );
}
