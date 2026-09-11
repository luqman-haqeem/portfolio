import { metrics, roles } from "@/lib/resume";
import { CornerArrow } from "./ui";

export default function MetricsStrip() {
  return (
    <div className="border-b border-line bg-panel/40">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div
          className="flex items-center gap-3 font-mono text-2xs text-dim"
          data-reveal
        >
          <span className="text-accent">00</span>
          <span className="text-line-2">/</span>
          <span className="text-muted">outcomes</span>
          <span className="h-px flex-1 bg-line" />
          <span className="hidden sm:inline">
            every number below traces back to a span
          </span>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
          {metrics.map((metric, i) => {
            const role = roles.find((r) => r.id === metric.roleId);
            return (
              <div
                key={metric.label}
                className="group min-w-0 bg-panel p-4 transition-colors hover:bg-panel-2 sm:p-5"
                data-reveal
                style={{ "--reveal-delay": `${i * 55}ms` } as React.CSSProperties}
              >
                <dd className="flex items-baseline gap-0.5 font-mono text-2xl font-semibold tracking-tight text-text tabular sm:text-3xl">
                  {metric.value}
                  <span className="text-base font-normal text-accent sm:text-lg">
                    {metric.unit}
                  </span>
                </dd>
                <dt className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                  {metric.label}
                </dt>
                <p className="mt-2.5 font-mono text-2xs leading-snug text-dim">
                  {metric.source}
                </p>
                {role ? (
                  <a
                    href={`#role-${role.id}`}
                    className="mt-1.5 flex max-w-full min-w-0 items-center gap-1 font-mono text-2xs text-dim transition-colors group-hover:text-accent"
                  >
                    <CornerArrow className="shrink-0" />
                    <span className="truncate">{role.service}</span>
                  </a>
                ) : null}
              </div>
            );
          })}
        </dl>
      </div>
    </div>
  );
}
