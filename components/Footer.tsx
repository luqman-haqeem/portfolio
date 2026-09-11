import { profile } from "@/lib/resume";
import ExternalLink from "./ExternalLink";
import PrintButton from "./PrintButton";
import { ArrowIcon } from "./ui";

export default function Footer({
  syncedAt,
  live,
}: {
  syncedAt: string;
  live: boolean;
}) {
  return (
    <footer className="border-t border-line bg-panel/40" data-print="hide">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-8 font-mono text-2xs text-dim sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1.5">
            <p className="text-muted">
              {profile.service} — {profile.name}
            </p>
            <p>
              Next.js · Tailwind CSS · no analytics, no cookies, no third-party
              scripts.
            </p>
            <p className="text-line-2">
              The console only writes to your own browser memory. Nothing leaves
              this tab.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ExternalLink
              href={profile.github}
              logAs="github profile"
              className="inline-flex items-center gap-1 transition-colors hover:text-muted"
            >
              github
              <ArrowIcon />
            </ExternalLink>
            <ExternalLink
              href={profile.linkedin}
              logAs="linkedin profile"
              className="inline-flex items-center gap-1 transition-colors hover:text-muted"
            >
              linkedin
              <ArrowIcon />
            </ExternalLink>
            <PrintButton className="transition-colors hover:text-muted">
              print résumé
            </PrintButton>
            <a
              href="#top"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-muted"
            >
              top
              <ArrowIcon className="-rotate-45" />
            </a>
          </div>
        </div>

        <p className="border-t border-line pt-4 text-line-2">
          Repo data and commit counts on this page are pulled from the GitHub
          API
          {live ? "" : " (serving a cached snapshot right now)"} — last synced{" "}
          {new Date(syncedAt).toISOString().slice(0, 16).replace("T", " ")} UTC.
          If a section looks stale, it&apos;s because I haven&apos;t pushed
          anything.
        </p>
      </div>
    </footer>
  );
}
