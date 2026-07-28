import type { Metadata } from "next";
import Link from "next/link";
import { brand, contacts, finalCta, paymentPage, pricing } from "@/data/content";
import { Reveal } from "@/components/primitives/Reveal";
import { Magnetic } from "@/components/primitives/Magnetic";
import { ZelleQr } from "@/components/ZelleQr";

export const metadata: Metadata = {
  title: `Next steps — ${brand.name}`,
};

function findSelection(slug: string | undefined) {
  if (!slug) return null;
  const plan = pricing.plans.find((p) => p.slug === slug);
  if (plan) return { name: plan.name, price: plan.price, billing: plan.billing };
  const essay = pricing.perEssay.find((p) => p.slug === slug);
  if (essay) return { name: essay.name, price: essay.price, billing: essay.unit };
  return null;
}

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string | string[] }>;
}) {
  const resolvedSearchParams = await searchParams;
  const planParam =
    typeof resolvedSearchParams.plan === "string" ? resolvedSearchParams.plan : undefined;
  const selection = findSelection(planParam);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-ground/90 border-b border-rule">
        <div className="mx-auto max-w-[860px] px-5 md:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 no-underline">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden />
            <span className="font-mono text-[12px] tracking-[0.1em] uppercase text-ink">
              {brand.name}
            </span>
          </Link>
          <a
            href="/#pricing"
            className="font-mono text-[11px] tracking-[0.08em] uppercase text-ink-muted hover:text-steel transition-colors duration-200"
          >
            ← Back to pricing
          </a>
        </div>
      </header>

      <main className="px-5 md:px-8 py-20 md:py-28">
        <Reveal className="mx-auto max-w-[640px]">
          <div className="font-mono text-[11px] tracking-[0.14em] uppercase text-brass mb-4 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 border border-brass rotate-45" aria-hidden />
            {paymentPage.fileNo} — {paymentPage.eyebrow}
          </div>
          <h1 className="font-serif italic font-semibold text-[clamp(30px,4.5vw,48px)] leading-[1.1] text-ink text-balance mb-5">
            {paymentPage.heading}
          </h1>
          <p className="text-[15.5px] leading-[1.8] text-ink-muted max-w-[56ch] mb-10">
            {paymentPage.intro}
          </p>

          {selection ? (
            <div className="border border-rule p-6 mb-12 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint mb-1">
                  Selected
                </div>
                <div className="text-[16px] font-semibold text-ink">{selection.name}</div>
              </div>
              <div className="font-serif text-[28px] text-ink [font-variant-numeric:tabular-nums]">
                {selection.price}
                <span className="font-sans text-[12px] text-ink-faint ml-1.5">{selection.billing}</span>
              </div>
            </div>
          ) : (
            <div className="border border-rule p-6 mb-12">
              <div className="text-[15px] font-semibold text-ink">{paymentPage.fallbackHeading}</div>
              <p className="text-[13.5px] text-ink-muted mt-1.5">
                No plan selected yet — that's fine, we'll figure out the right fit on your call.
              </p>
            </div>
          )}

          <ol className="list-none p-0 m-0 border-t border-rule mb-14">
            {paymentPage.steps.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[40px_1fr] gap-5 py-6 border-b border-rule">
                <span className="font-mono text-[13px] text-brass pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-[15px] font-semibold text-ink mb-1.5">{step.title}</h2>
                  <p className="text-[13.5px] leading-[1.75] text-ink-muted max-w-[54ch]">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <ZelleQr />

          <div className="text-center border border-rule p-8 md:p-10">
            <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-faint mb-5">
              {finalCta.scheduleLabel}
            </div>
            <Magnetic className="block mb-9">
              <a
                href={finalCta.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-[13px] tracking-[0.08em] uppercase text-ground bg-gold px-9 py-4 border border-gold hover:bg-transparent hover:text-gold transition-colors duration-200"
              >
                {finalCta.bookNowLabel} →
              </a>
            </Magnetic>
            <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-faint mb-3">
              {finalCta.questionsLabel}
            </div>
            <div className="flex flex-col items-center gap-1.5">
              {contacts.map((c) => (
                <a
                  key={c.email}
                  href={`mailto:${c.email}`}
                  className="text-[13.5px] text-steel underline underline-offset-2"
                >
                  {c.email}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </main>

      <footer role="contentinfo" className="border-t border-rule py-10 px-5 md:px-8">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-mono text-[10.5px] text-ink-faint">
            © {brand.copyrightYear} {brand.name} · {brand.disclaimer}
          </p>
        </div>
      </footer>
    </>
  );
}