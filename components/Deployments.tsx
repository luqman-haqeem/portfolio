import { projects } from "@/lib/resume";
import ExternalLink from "./ExternalLink";
import {
  ArrowIcon,
  CornerArrow,
  Section,
  SectionHeading,
  StatusDot,
} from "./ui";

export default function Deployments() {
  return (
    <Section id="deployments">
      <SectionHeading
        index="03"
        route="deployments"
        title="Things I shipped on my own time"
        description={
          <>
            Two side projects, both in production with real users — one solves a
            tax-season chore, the other watches rivers that flood. Not demos,
            not tutorials.
          </>
        }
        aside={
          <span className="hidden font-mono text-2xs text-dim sm:inline">
            {projects.length} live
          </span>
        }
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project, i) => (
          <article
            key={project.id}
            className="group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition-colors hover:border-line-2"
            data-reveal
            style={{ "--reveal-delay": `${i * 90}ms` } as React.CSSProperties}
          >
            <div className="flex items-center gap-2 border-b border-line bg-panel-2/40 px-4 py-2.5">
              <StatusDot color="bg-ok" />
              <span className="truncate font-mono text-2xs text-muted">
                {project.slug}
              </span>
              <span className="ml-auto shrink-0 rounded border border-ok/25 bg-ok/8 px-1.5 py-0.5 font-mono text-2xs text-ok">
                live
              </span>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-xl font-semibold tracking-tight text-text">
                {project.name}
              </h3>
              <p
                className="mt-1.5 text-sm"
                style={{ color: project.accent }}
              >
                {project.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {project.detail}
              </p>

              <ul className="mt-5 space-y-2 border-t border-line pt-4">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2.5 text-xs leading-relaxed text-text"
                  >
                    <CornerArrow className="mt-0.5 shrink-0 text-dim" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-line-2 bg-panel-2 px-2 py-0.5 font-mono text-2xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <ExternalLink
                href={project.url}
                logAs={project.slug}
                className="mt-6 inline-flex items-center gap-1.5 self-start rounded-lg border border-line-2 bg-panel-2 px-3.5 py-2 font-mono text-2xs text-text transition-colors group-hover:border-accent/40 group-hover:text-accent"
              >
                open deployment
                <ArrowIcon />
              </ExternalLink>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
