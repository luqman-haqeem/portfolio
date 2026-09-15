import type { GithubData } from "@/lib/github";
import LanguageComfortPanel from "./LanguageComfortPanel";
import StackTopology from "./StackTopology";
import { Section, SectionHeading } from "./ui";

export default function StackSection({ data }: { data: GithubData }) {
  return (
    <Section id="stack" width="wide" pace="normal">
      <SectionHeading
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
      </div>
    </Section>
  );
}
