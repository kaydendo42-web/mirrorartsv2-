import type { Metadata } from "next";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SchoolsWorkshopsDetail from "@/components/sections/schools-workshops-detail";
import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";
import {
  WORKSHOPS,
  WORKSHOP_FAMILIES,
  workshopsByFamily,
} from "@/lib/content/workshops";

/* Fifteen workshops in the client's own three families.
 *
 * The old site's homepage carried a chip cloud that named none of them, and
 * the workshops themselves sat on four pages nobody linked. What an
 * organisation actually books against is here: the age bands, whether
 * materials come with it, and whether the child takes the thing home.
 *
 * The count in the standfirst is WORKSHOPS.length, matching what the homepage
 * section already does — a hand-typed fifteen goes stale the first time a
 * workshop is added.
 *
 * No durations. The type has no duration field because §6 states none, and a
 * plausible-looking "45 minutes" is exactly the kind of fact an organisation
 * would plan a day around.
 *
 * Only positive facts are printed. materialsProvided is false on the four
 * performance workshops because they need no materials, not because a family
 * has to bring some — rendering the negative would invent an instruction. */

export const metadata: Metadata = {
  title: "Cultural workshops",
  description: `${WORKSHOPS.length} traditional Chinese arts, craft and media workshops from Mirror Arts Education — lacquer fans, tie-dye, shadow puppets, dragon and lion dance, broadcasting and voice-over, for schools, community groups and parties in Melbourne.`,
};

export default function WorkshopsPage() {
  return (
    <>
      <PageHero
        eyebrow="Workshops"
        title={
          <>
            Chinese culture, <em>made with your hands</em>
          </>
        }
        standfirst={`${WORKSHOPS.length} workshops in three families: performance, craft and media. Run for schools, community groups, councils and parties, in English and Mandarin.`}
        trail={[{ label: "Workshops" }]}
        density="shallow"
      />

      <SchoolsWorkshopsDetail />

      {WORKSHOP_FAMILIES.map((f, i) => {
        const members = workshopsByFamily(f.id);
        return (
          <Section
            key={f.id}
            id={i === 0 ? "workshops" : f.id}
            tone={i % 2 ? "alt" : "base"}
          >
            <SectionHead
              eyebrow={f.title}
              title={f.title}
              note={`${members.length} workshops.`}
            />
            {/* type="multiple" rather than "single": a person choosing between
                two craft workshops wants both open to compare, and closing one
                to read the next is the behaviour that makes an accordion worse
                than a list. */}
            <Accordion type="multiple" className="wlist">
              {members.map((w) => (
                <AccordionItem key={w.slug} value={w.slug}>
                  <AccordionTrigger>
                    <span className="wlist__name">
                      {w.title}
                    </span>
                    {/* The age band sits on the trigger, not inside the panel.
                        It is the constraint an organisation books against and
                        the first thing that has to be true — a 12+ workshop
                        found after opening it is found too late. */}
                    {w.minAge && (
                      <span className="wlist__age">Ages {w.minAge}+</span>
                    )}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="wlist__body">{w.body}</p>
                    <ul className="wfacts">
                      {w.minAge && <li>Ages {w.minAge} and up</li>}
                      {w.materialsProvided && <li>Materials provided</li>}
                      {w.keepsWork && <li>Takes their work home</li>}
                      {w.supervision && <li>{w.supervision}</li>}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Section>
        );
      })}

      <PageNav
        prev={{ label: "Exams and achievements", href: "/stage#achievements" }}
        next={{ label: "Studio hire", href: "/workshops/venue" }}
      />
    </>
  );
}
