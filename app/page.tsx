import BuildsSection from "@/components/BuildsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import PrintResume from "@/components/PrintResume";
import RevealObserver from "@/components/RevealObserver";
import Shell from "@/components/Shell";
import StackSection from "@/components/StackSection";
import TraceSection from "@/components/TraceSection";
import { Divider } from "@/components/ui";
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
      <Shell />
      <RevealObserver />

      <main className="flex-1" data-print="hide">
        <Hero />
        <TraceSection />
        <StackSection data={github} />
        <BuildsSection data={github} />
        {/* One divider, not one per seam. An identical hairline between every
            section stops marking anything — trace, stack and builds are all
            evidence and read as one run. The break that earns a rule is the one
            here, where the page stops showing work and starts asking for a
            reply. */}
        <Divider />
        <ContactSection />
        <Footer syncedAt={github.syncedAt} live={github.live} />
      </main>

      <PrintResume />
    </>
  );
}
