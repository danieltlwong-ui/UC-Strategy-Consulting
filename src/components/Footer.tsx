import { brand, contacts, footer } from "@/data/content";

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-rule py-12 px-5 md:px-8 bg-ground">
      <div className="mx-auto max-w-[1180px] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-ink-faint">
          {brand.name}
        </span>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-6">
          {footer.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] tracking-[0.06em] uppercase text-ink-faint hover:text-steel transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto max-w-[1180px] mt-8 pt-6 border-t border-rule text-center md:text-left">
        <p className="font-mono text-[10.5px] text-ink-faint mb-2">{footer.disclaimerLine}</p>
        <p className="font-mono text-[10.5px] text-ink-faint flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start">
          <span>Contact:</span>
          {contacts.map((c) => (
            <a
              key={c.email}
              href={`mailto:${c.email}`}
              className="hover:text-steel transition-colors duration-200"
            >
              {c.email}
            </a>
          ))}
        </p>
      </div>
    </footer>
  );
}
