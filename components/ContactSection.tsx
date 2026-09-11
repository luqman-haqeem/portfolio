import { profile } from "@/lib/resume";
import CopyButton from "./CopyButton";
import ExternalLink from "./ExternalLink";
import { ArrowIcon, Section, SectionHeading, StatusDot } from "./ui";

export default function ContactSection() {
  return (
    <Section id="contact">
      <SectionHeading
        index="07"
        route="contact"
        title="Let's talk"
        description="Backend, platform or AI-systems work — permanent or contract, Malaysia or remote. I reply to everything that isn't a template."
      />

      <div className="grid gap-5 lg:grid-cols-12">
        {/* min-w-0: without it the grid item stretches to the <pre>'s
            min-content width and pushes the whole page sideways. */}
        <div className="min-w-0 lg:col-span-7" data-reveal>
          <div className="h-full overflow-hidden rounded-xl border border-line bg-panel">
            <div className="flex items-center gap-2 border-b border-line bg-panel-2/40 px-4 py-2.5">
              <span className="font-mono text-2xs text-dim">
                request preview
              </span>
              <span className="ml-auto font-mono text-2xs text-line-2">
                application/json
              </span>
            </div>
            <pre className="thin-scroll overflow-x-auto p-5 font-mono text-xs leading-relaxed sm:text-[13px]">
              <code>
                <span className="text-accent">POST</span>{" "}
                <span className="text-text">/hire</span>{" "}
                <span className="text-dim">HTTP/1.1</span>
                {"\n"}
                <span className="text-muted">Host</span>
                <span className="text-dim">: </span>
                <span className="text-text">{profile.service}</span>
                {"\n"}
                <span className="text-muted">Content-Type</span>
                <span className="text-dim">: </span>
                <span className="text-text">application/json</span>
                {"\n\n"}
                <span className="text-dim">{"{"}</span>
                {"\n  "}
                <span className="text-info">&quot;role&quot;</span>
                <span className="text-dim">: </span>
                <span className="text-ok">
                  &quot;backend / platform engineer&quot;
                </span>
                <span className="text-dim">,</span>
                {"\n  "}
                <span className="text-info">&quot;stack&quot;</span>
                <span className="text-dim">: [</span>
                <span className="text-ok">&quot;typescript&quot;</span>
                <span className="text-dim">, </span>
                <span className="text-ok">&quot;python&quot;</span>
                <span className="text-dim">, </span>
                <span className="text-ok">&quot;aws&quot;</span>
                <span className="text-dim">],</span>
                {"\n  "}
                <span className="text-info">&quot;location&quot;</span>
                <span className="text-dim">: </span>
                <span className="text-ok">&quot;malaysia or remote&quot;</span>
                <span className="text-dim">,</span>
                {"\n  "}
                <span className="text-info">&quot;notice&quot;</span>
                <span className="text-dim">: </span>
                <span className="text-ok">&quot;happy to chat first&quot;</span>
                {"\n"}
                <span className="text-dim">{"}"}</span>
              </code>
            </pre>
            <div className="flex items-center gap-2 border-t border-line px-5 py-3 font-mono text-2xs">
              <StatusDot color="bg-ok" />
              <span className="text-ok">202 Accepted</span>
              <span className="text-dim">— usually within a day</span>
            </div>
          </div>
        </div>

        <div
          className="min-w-0 lg:col-span-5"
          data-reveal
          style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
        >
          <div className="flex h-full flex-col rounded-xl border border-line bg-panel p-5">
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent(
                "Backend role — let's talk",
              )}`}
              className="flex items-center justify-between gap-3 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent/85"
            >
              Send an email
              <ArrowIcon />
            </a>

            <div className="mt-3 flex items-center justify-between gap-2 rounded-lg border border-line bg-panel-2/50 px-3 py-2.5">
              <span className="truncate font-mono text-2xs text-muted">
                {profile.email}
              </span>
              <CopyButton value={profile.email} label="copy" />
            </div>

            <div className="mt-5 space-y-px overflow-hidden rounded-lg border border-line">
              <ContactRow label="phone">
                <a
                  href={`tel:${profile.phoneHref}`}
                  className="text-text transition-colors hover:text-accent"
                >
                  {profile.phone}
                </a>
              </ContactRow>
              <ContactRow label="github">
                <ExternalLink
                  href={profile.github}
                  logAs="github profile"
                  className="inline-flex items-center gap-1 text-text transition-colors hover:text-accent"
                >
                  {profile.githubLabel}
                  <ArrowIcon className="text-dim" />
                </ExternalLink>
              </ContactRow>
              <ContactRow label="linkedin">
                <ExternalLink
                  href={profile.linkedin}
                  logAs="linkedin profile"
                  className="inline-flex items-center gap-1 text-text transition-colors hover:text-accent"
                >
                  {profile.linkedinLabel}
                  <ArrowIcon className="text-dim" />
                </ExternalLink>
              </ContactRow>
              <ContactRow label="based in">
                <span className="text-muted">{profile.region}</span>
              </ContactRow>
              <ContactRow label="timezone">
                <span className="text-muted">
                  {profile.tzLabel} · Asia/Kuala_Lumpur
                </span>
              </ContactRow>
            </div>

            <p className="mt-auto pt-5 text-xs leading-relaxed text-dim">
              If you&apos;re hiring: the plain-text toggle in the career trace
              gives you a copy-pasteable résumé, and the page prints to a clean
              one-pager.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3 bg-panel-2/40 px-3 py-2.5 font-mono text-2xs">
      <span className="shrink-0 text-dim">{label}</span>
      <span className="min-w-0 truncate text-right">{children}</span>
    </div>
  );
}
