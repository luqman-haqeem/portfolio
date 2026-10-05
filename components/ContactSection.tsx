import type { ReactNode } from "react";
import { profile } from "@/lib/resume";
import ExternalLink from "./ExternalLink";
import {
  ArrowIcon,
  Marginalia,
  Section,
  SectionHeading,
  StatusDot,
} from "./ui";

export default function ContactSection() {
  return (
    // Prose width, one column. This section used to run the same 7/5
    // `lg:grid-cols-12` split as the hero, with a bordered panel on each side —
    // so the page opened and closed on an identical shape, and the last thing a
    // reader saw was the layout they had already seen first. It is four short
    // statements and a way to get in touch; it reads better as a column than as
    // two competing cards.
    <Section id="contact" width="prose" pace="loose">
      <SectionHeading
        title="Let's talk"
        description="Backend, platform or AI-systems work — permanent or contract, Malaysia or remote. I reply to everything that isn't a template."
      />

      {/* This used to be a hand-coloured `POST /hire HTTP/1.1` block inside a
          mock editor window, title bar and all. It was syntax highlighting on a
          request nobody can send — a picture of code standing in for the four
          facts it encoded. Those facts are worth stating plainly, so now they
          are a description list. */}
      <dl className="divide-y divide-line border-t border-line" data-reveal>
        <Term label="What I'm looking for">
          Backend or platform engineering, with room to own the design rather
          than implement someone else&apos;s.
        </Term>
        <Term label="What I bring">
          {profile.runtimes.join(" · ")} — five years across PHP, then
          TypeScript, now Python and LLM pipelines at 10M+ records.
        </Term>
        <Term label="Where">
          {profile.region} or remote. {profile.tzLabel}, so a European morning
          and an Asian afternoon overlap fine.
        </Term>
        <Term label="Shape">
          Permanent or contract. Happy to talk before either of us decides
          it&apos;s a fit.
        </Term>
      </dl>

      <div
        className="mt-10"
        data-reveal
        style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
      >
        <ExternalLink
          href={profile.linkedin}
          logAs="linkedin profile"
          className="inline-flex items-center gap-2.5 rounded-lg bg-accent px-5 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent/85"
        >
          Message me on LinkedIn
          <ArrowIcon />
        </ExternalLink>

        <p className="mt-4 flex items-baseline gap-2 text-sm leading-relaxed text-muted">
          <StatusDot color="bg-ok" className="translate-y-1" />
          <span>
            I reply to everything that isn&apos;t a template, usually within a
            day.
          </span>
        </p>

        <p className="mt-4 max-w-prose text-sm leading-relaxed text-muted">
          No email address or phone number on this site — not an oversight.
          Anything published here gets scraped, so reach me through a profile I
          control instead.
        </p>
      </div>

      <div
        className="mt-10 border-t border-line"
        data-reveal
        style={{ "--reveal-delay": "140ms" } as React.CSSProperties}
      >
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

      <Marginalia
        className="mt-8"
        data-reveal
        style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
      >
        If you&apos;re hiring: the plain-text toggle in the career trace gives
        you a copy-pasteable résumé, and the page prints to a clean one-pager.
        Message me and I&apos;ll send direct contact details.
      </Marginalia>
    </Section>
  );
}

/**
 * Label above value rather than beside it. A two-column term list looks tidier
 * at desktop width, but the label column has to be wide enough for the longest
 * label, which leaves the short ones stranded — and at 320px it collapses to two
 * words per line anyway.
 */
function Term({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="py-3.5 first:pt-0 last:pb-0">
      <dt className="font-mono text-2xs text-dim">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-text">{children}</dd>
    </div>
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
    // No fill and no radius now that these rows sit on the page rather than
    // inside a bordered panel. A hairline between rows is enough to group them.
    <div className="flex items-baseline justify-between gap-3 border-b border-line py-2.5 font-mono text-2xs">
      <span className="shrink-0 text-dim">{label}</span>
      <span className="min-w-0 truncate text-right">{children}</span>
    </div>
  );
}
