import type { GithubData } from "@/lib/github";
import { practices } from "@/lib/resume";
import LanguageComfortPanel from "./LanguageComfortPanel";
import StackTopology from "./StackTopology";
import { Section, SectionHeading } from "./ui";

export default function StackSection({ data }: { data: GithubData }) {
  return (
    <Section id="stack">
      <SectionHeading
        index="02"
        route="stack"
        title="What I'm actually comfortable in"
        description={
          <>
            Job ads want a list. Lists lie — they flatten &quot;I shipped this
            for three years&quot; and &quot;I read a tutorial&quot; into the same
            bullet. So here it is ranked by what I&apos;d genuinely pick up
            today, with the repos that back each one.
          </>
        }
      />

      <LanguageComfortPanel data={data} />

      <div className="mt-16 border-t border-line pt-12">
        <div className="mb-8" data-reveal>
          <h3 className="text-xl font-semibold tracking-tight text-text">
            The whole stack, by layer
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Roughly how a request moves through the systems I build.{" "}
            <span className="text-text">Every node is clickable</span> — it will
            show you which jobs and projects it shipped in, so you can check
            rather than take my word for it.
          </p>
        </div>

        <StackTopology />

        <div
          className="mt-8 rounded-xl border border-line bg-panel p-5"
          data-reveal
        >
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="font-mono text-xs text-muted">ways of working</p>
            <p className="font-mono text-2xs text-dim">
              process and tooling, not languages
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {practices.map((practice) => (
              <span
                key={practice}
                className="rounded-md border border-line-2 bg-panel-2 px-2 py-1 font-mono text-2xs text-muted"
              >
                {practice}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
