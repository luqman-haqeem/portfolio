import About from "@/components/About";
import BeyondSection from "@/components/BeyondSection";
import BuildsSection from "@/components/BuildsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MetricsStrip from "@/components/MetricsStrip";
import NowSection from "@/components/NowSection";
import PrintResume from "@/components/PrintResume";
import RevealObserver from "@/components/RevealObserver";
import Shell from "@/components/Shell";
import StackSection from "@/components/StackSection";
import TraceSection from "@/components/TraceSection";
import { Divider } from "@/components/ui";
import { getGithubData } from "@/lib/github";

/**
 * Prerendered, then refreshed in the background every six hours so the "now"
 * section keeps up with what I've actually pushed.
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
        <MetricsStrip />
        <NowSection data={github} />
        <Divider />
        <TraceSection />
        <Divider />
        <StackSection data={github} />
        <Divider />
        <BuildsSection data={github} />
        <Divider />
        <BeyondSection data={github} />
        <Divider />
        <About />
        <Divider />
        <ContactSection />
        <Footer syncedAt={github.syncedAt} live={github.live} />
      </main>

      <PrintResume />
    </>
  );
}
