import About from "@/components/About";
import ContactSection from "@/components/ContactSection";
import Deployments from "@/components/Deployments";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MetricsStrip from "@/components/MetricsStrip";
import PrintResume from "@/components/PrintResume";
import RevealObserver from "@/components/RevealObserver";
import Shell from "@/components/Shell";
import StackSection from "@/components/StackSection";
import TraceSection from "@/components/TraceSection";
import { Divider } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Shell />
      <RevealObserver />

      <main className="flex-1" data-print="hide">
        <Hero />
        <MetricsStrip />
        <TraceSection />
        <Divider />
        <StackSection />
        <Divider />
        <Deployments />
        <Divider />
        <About />
        <Divider />
        <ContactSection />
        <Footer />
      </main>

      <PrintResume />
    </>
  );
}
