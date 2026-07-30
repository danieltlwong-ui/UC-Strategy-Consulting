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
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-[100] focus-visible:bg-gold focus-visible:text-ground focus-visible:px-4 focus-visible:py-2 font-mono text-[12px] uppercase"
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
