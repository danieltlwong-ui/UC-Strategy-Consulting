import { Nav } from "@/components/Nav";
import { IntroSequence } from "@/components/IntroSequence";
import { Dossier } from "@/components/Dossier";
import { WhyUs } from "@/components/WhyUs";
import { Approach } from "@/components/Approach";
import { AdmissionsRecord } from "@/components/AdmissionsRecord";
import { Fit } from "@/components/Fit";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { RequestForReview } from "@/components/RequestForReview";
import { Footer } from "@/components/Footer";
import { SCROLLER_ID } from "@/lib/motion";

export default function Home() {
  return (
    <>
      <a
        href={`#${SCROLLER_ID}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-gold focus:text-ground focus:px-4 focus:py-2 font-mono text-[12px] uppercase"
      >
        Skip to main content
      </a>
      <Nav />
      <main id={SCROLLER_ID}>
        <IntroSequence />
        <Dossier />
        <WhyUs />
        <Approach />
        <AdmissionsRecord />
        <Fit />
        <Process />
        <Pricing />
        <FAQ />
        <RequestForReview />
        <Footer />
      </main>
    </>
  );
}
