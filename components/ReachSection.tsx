import { profile } from "@/lib/resume";
import PrintButton from "./PrintButton";
import { OutArrow, Reading } from "./ui";

/**
 * The close. Ink field, the two public profiles at full size, and the facts
 * about the page itself — no email or phone anywhere, by design.
 */
export default function ReachSection({ syncedAt, live }: { syncedAt: string; live: boolean }) {
  const synced = new Date(syncedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: profile.timezone,
  });

  return (
    <section id="reach" aria-labelledby="reach-title" className="on-dark bg-ink px-5 pt-24 pb-10 text-enamel sm:px-10 sm:pt-32 lg:pr-16 xl:pr-24">
      <h2 id="reach-title" className="stretch-wide max-w-[16ch] text-[clamp(2.4rem,5.4vw,4.6rem)] leading-[0.95] font-extrabold tracking-[-0.02em] text-balance">
        Easiest to reach me through GitHub or LinkedIn.
      </h2>

      <p className="mt-6 text-[clamp(1.1rem,1.6vw,1.35rem)] text-enamel/85">
        Currently: {profile.status.charAt(0).toLowerCase() + profile.status.slice(1)}.
      </p>

      <ul className="mt-10 flex flex-col gap-5 text-[clamp(1.3rem,2.2vw,1.75rem)] font-semibold sm:flex-row sm:flex-wrap sm:gap-x-14">
        {[
          [profile.github, profile.githubLabel],
          [profile.linkedin, profile.linkedinLabel],
        ].map(([href, label]) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 underline decoration-level-alert decoration-4 underline-offset-8 hover:text-level-alert"
            >
              {label}
              <OutArrow className="size-[0.6em]" />
            </a>
          </li>
        ))}
      </ul>

      <footer className="mt-28 flex flex-col gap-4 border-t-2 border-enamel/30 pt-6 text-[15px] text-enamel/75 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="max-w-[60ch] leading-relaxed">
          No analytics, no cookies, no third-party requests. GitHub figures{" "}
          {live ? "synced" : "from the snapshot taken"}{" "}
          <Reading className="font-bold text-enamel">{synced}</Reading>.
        </p>
        <PrintButton className="self-start font-semibold text-enamel underline decoration-2 underline-offset-4 hover:text-level-alert sm:self-auto">
          Print as a résumé
        </PrintButton>
      </footer>
    </section>
  );
}
