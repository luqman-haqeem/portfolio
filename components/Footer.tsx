import { profile } from "@/lib/resume";
import PrintButton from "./PrintButton";
import { ArrowIcon } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-panel/40" data-print="hide">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-8 font-mono text-2xs text-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
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
          <PrintButton className="transition-colors hover:text-muted">
            print résumé
          </PrintButton>
          <span className="text-line-2">|</span>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-muted"
          >
            back to top
            <ArrowIcon className="-rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  );
}
