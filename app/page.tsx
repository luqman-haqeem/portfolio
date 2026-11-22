import BuildsSection from "@/components/BuildsSection";
import GaugeRail from "@/components/GaugeRail";
import PrintResume from "@/components/PrintResume";
import ReachSection from "@/components/ReachSection";
import ReadingSection from "@/components/ReadingSection";
import WorkSection from "@/components/WorkSection";
import { getGithubData } from "@/lib/github";

/**
 * Prerendered, then refreshed in the background every six hours so the repo
 * data keeps up with what I've actually pushed.
 */
export const revalidate = 21600;

export default async function Home() {
  const github = await getGithubData();

  return (
    <>
      <div className="lg:grid lg:grid-cols-[12.5rem_1fr]" data-print="hide">
        <GaugeRail />
        <main id="main" className="min-w-0">
          <ReadingSection />
          <WorkSection />
          <BuildsSection github={github} />
          <ReachSection syncedAt={github.syncedAt} live={github.live} />
        </main>
      </div>

      <PrintResume />
    </>
  );
}
