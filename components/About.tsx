import { certifications, education, practices, profile } from "@/lib/resume";
import { Section, SectionHeading } from "./ui";

const principles = [
  {
    tag: "measure first",
    title: "The big wins were measurements, not rewrites",
    body: "The ~3× inference cost drop and ~30% throughput gain on the 123RF review pipelines didn't come from rebuilding anything. It came from reading the numbers, then changing the model, the prompt and the batch size.",
  },
  {
    tag: "queues > waiting",
    title: "If a job takes minutes, nobody should watch a spinner",
    body: "A review backlog sitting at over a week became under 24 hours once the work moved onto SQS with ECS workers that scale on queue depth. Same logic, different shape.",
  },
  {
    tag: "traffic is a design input",
    title: "Cache and CDN decisions are cheaper than firefighting",
    body: "Redis for chart data, CloudFront in front of S3 images, New Relic watching it all. A Samsung lucky draw pulling ~10,000 visitors a day is only calm if you planned for it.",
  },
  {
    tag: "team of three",
    title: "I've been the one answering the architecture questions",
    body: "As senior engineer I led 3 engineers through a 6-module warehouse system and coordinated across 3 cross-functional teams, including one in India. Mentoring is part of the job, not a side quest.",
  },
];

export default function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="04"
        route="about"
        title="How I actually work"
        description="Four things that show up in most of my work. Each one maps to something in the trace above."
      />

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 space-y-4 lg:col-span-7">
          {principles.map((principle, i) => (
            <div
              key={principle.tag}
              className="rounded-xl border border-line bg-panel p-5"
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
            >
              <span className="font-mono text-2xs text-accent">
                {principle.tag}
              </span>
              <h3 className="mt-2.5 text-base font-medium text-text">
                {principle.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {principle.body}
              </p>
            </div>
          ))}
        </div>

        <div className="min-w-0 space-y-5 lg:col-span-5">
          <div
            className="rounded-xl border border-line bg-panel p-5"
            data-reveal
          >
            <p className="font-mono text-2xs text-dim">education</p>
            <h3 className="mt-2.5 text-base font-medium text-text">
              {education.school}
            </h3>
            <p className="mt-1 text-sm text-muted">{education.qualification}</p>
            <p className="mt-1 font-mono text-2xs text-dim">
              {education.period}
            </p>
          </div>

          <div
            className="rounded-xl border border-line bg-panel p-5"
            data-reveal
            style={{ "--reveal-delay": "70ms" } as React.CSSProperties}
          >
            <p className="font-mono text-2xs text-dim">certifications</p>
            {certifications.map((cert) => (
              <div key={cert.name} className="mt-2.5">
                <h3 className="text-base font-medium text-text">{cert.name}</h3>
                <p className="mt-1 text-sm text-muted">
                  {cert.issuer}
                  <span className="font-mono text-2xs text-dim">
                    {" "}
                    · {cert.year}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-xl border border-line bg-panel p-5"
            data-reveal
            style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
          >
            <p className="font-mono text-2xs text-dim">ways of working</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {practices.map((practice) => (
                <span
                  key={practice}
                  className="rounded-md border border-line-2 bg-panel-2 px-2 py-0.5 font-mono text-2xs text-muted"
                >
                  {practice}
                </span>
              ))}
            </div>
          </div>

          <div
            className="rounded-xl border border-accent/20 bg-accent/5 p-5"
            data-reveal
            style={{ "--reveal-delay": "210ms" } as React.CSSProperties}
          >
            <p className="font-mono text-2xs text-accent">currently</p>
            <p className="mt-2.5 text-sm leading-relaxed text-text">
              Going deeper on AWS architecture and LLM-powered systems at
              Inmagine — distributed workers, cost per request, and the boring
              reliability work that makes AI features usable in production.
            </p>
            <p className="mt-3 font-mono text-2xs text-dim">
              based in {profile.region} · {profile.tzLabel}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
