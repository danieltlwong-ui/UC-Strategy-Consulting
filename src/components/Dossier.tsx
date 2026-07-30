"use client";

import { motion } from "framer-motion";
import { team } from "@/data/content";
import { SectionHeading } from "@/components/SectionHeading";
import { Portrait } from "@/components/primitives/Portrait";
import { Tag } from "@/components/primitives/Tag";
import { Rule } from "@/components/primitives/Rule";
import { Reveal } from "@/components/primitives/Reveal";
import { Tilt } from "@/components/primitives/Tilt";
import { Scene } from "@/components/Scene";

const NOTE_ROTATIONS = [-2, 1.5, -1, 2, -1.5, 1];

export function Dossier() {
  return (
    <Scene
      id="dossier"
      tone="paper"
      variant="pageTurn"
      ariaLabelledby="dossier-heading"
      contentClassName="mx-auto max-w-[1180px]"
    >
      <SectionHeading
        eyebrow="The team"
        heading="Meet your consultants"
        intro="We've been through this process ourselves, earning admission to every UC campus. Now we help applicants navigate the same PIQs, activities, and campus decisions."
        headingId="dossier-heading"
      />

      <div className="flex items-center gap-3 mb-10">
        <span className="font-mono text-[10.5px] tracking-[0.18em] uppercase text-ink-faint">
          Consultant Record
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </div>

      <div>
        {team.map((member, i) => (
          <div key={member.id}>
            {i > 0 && <Rule className="my-14" />}
            <div className="flex items-center gap-4 mb-5 font-mono text-[10px] tracking-[0.1em] uppercase text-ink-faint">
              <span className="text-brass">File {String(i + 1).padStart(3, "0")}</span>
              <span aria-hidden>·</span>
              <span>
                Consultant ID <span className="text-ink">UC-{String(i + 1).padStart(3, "0")}</span>
              </span>
            </div>
            <Reveal className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 md:gap-14 items-start">
              <div className="w-full max-w-[240px]">
                <Tilt>
                  <Portrait
                    initials={member.initials}
                    name={member.name}
                    portraitFile={member.portraitFile}
                  />
                </Tilt>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Tag variant="brass">{member.schoolCode}</Tag>
                  <span className="text-[12.5px] text-ink-faint">{member.school}</span>
                </div>

                <motion.div
                  className="overflow-hidden whitespace-nowrap mb-1"
                  initial={{ width: 0 }}
                  whileInView={{ width: "auto" }}
                  viewport={{ once: false, amount: 0.7 }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
                >
                  <h3 className="font-serif italic font-semibold text-[26px] md:text-[30px] text-ink whitespace-nowrap">
                    {member.name}{" "}
                    <span
                      aria-hidden
                      className="cursor-blink inline-block w-[1.5px] h-[1.15em] bg-ink align-text-bottom"
                    />
                  </h3>
                </motion.div>

                <p className="font-mono text-[11.5px] tracking-[0.05em] uppercase text-ink-faint mb-5">
                  {member.major}
                </p>
                <p className="text-[14.5px] leading-[1.8] text-ink-muted max-w-[62ch] mb-6">
                  {member.bio}
                </p>

                <div className="font-mono text-[10.5px] tracking-[0.1em] uppercase text-ink-faint mb-3">
                  Areas of expertise
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2.5 mb-6 list-none p-0 border-l border-rule pl-4">
                  {member.expertise.map((e, ei) => (
                    <li
                      key={e}
                      className="text-[12.5px] text-steel font-medium"
                      style={{ transform: `rotate(${NOTE_ROTATIONS[ei % NOTE_ROTATIONS.length]}deg)` }}
                    >
                      <span className="text-ink-faint mr-1">»</span>
                      {e}
                    </li>
                  ))}
                </ul>

                <div className="border-l-2 border-steel pl-4 py-1 max-w-[56ch]">
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-steel block mb-1">
                    Marginalia
                  </span>
                  <p className="text-[13px] leading-[1.7] text-ink-muted">{member.funFact}</p>
                </div>
              </div>
            </Reveal>
          </div>
        ))}
      </div>
    </Scene>
  );
}
