import { admissionsRecord } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { CaliforniaMap } from "@/components/primitives/CaliforniaMap";
import { Reveal } from "@/components/primitives/Reveal";
import { Scene } from "@/components/Scene";

export function AdmissionsRecord() {
  return (
    <Scene
      id="campuses"
      tone="frost"
      variant="openDocument"
      ariaLabelledby="campuses-heading"
      contentClassName="mx-auto max-w-[1180px]"
    >
      <SectionHeading
        eyebrow={admissionsRecord.eyebrow}
        heading={admissionsRecord.heading}
        intro={admissionsRecord.intro}
        align="center"
        headingId="campuses-heading"
      />
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-14 items-start">
        <Reveal direction="left" className="hidden lg:block lg:pt-10">
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-faint mb-4">
            Campus index
          </div>
          <ul className="flex flex-col gap-3 border-l border-rule pl-4 list-none m-0 p-0">
            {admissionsRecord.campuses.map((c) => (
              <li key={c.code} className="text-[12.5px] leading-snug">
                <span className="font-mono text-brass mr-2">{c.code}</span>
                <span className="text-ink-muted">{c.city.replace(", California", "")}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal direction="right">
          <CaliforniaMap campuses={admissionsRecord.campuses} hint={admissionsRecord.mapHint} />
        </Reveal>
      </div>
    </Scene>
  );
}
