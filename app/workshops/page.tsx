import type { Metadata } from "next";
import ImageFrame from "@/components/shared/image-frame";
import ArtsComposition from "@/components/shared/arts-composition";
import "./workshops.css";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BusFront, PartyPopper } from "lucide-react";

import SchoolsWorkshopsDetail, { WorkshopActivityList } from "@/components/sections/schools-workshops-detail";
import Faq from "@/components/shared/faq";
import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";
import { WORKSHOPS_FAQ } from "@/lib/content/faq";
import { EXCURSION_EXPERIENCES, PARTY_OPTIONS, WORKSHOP_FEATURES } from "@/lib/content/workshops";
import { SITE } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Cultural workshops, incursions & parties",
  alternates: { canonical: "/workshops" },
  description: "Incursions, excursions and customised cultural experiences for schools, companies and private celebrations in Melbourne. Discover performance, craft and creative parties with Mirror Arts Education.",
};

export default function WorkshopsPage() {
  return (
    <div className="workshops-page">
      <PageHero
        eyebrow="Workshops"
        title={<>Bringing culture<br />to every <em>community</em></>}
        standfirst="Incursions, excursions and customised cultural experiences for schools, companies and private celebrations."
        trail={[{ label: "Workshops" }]}
        density="shallow"
      />
      <nav className="workshop-jump wrap" aria-label="Explore workshop formats">
        <a href="#schools"><span>Incursions<small>We come to you</small></span><ArrowDown aria-hidden="true" /></a>
        <a href="#excursions"><span>Excursions<small>Come to us</small></span><ArrowDown aria-hidden="true" /></a>
        <a href="#parties"><span>Customised parties<small>Your special occasion</small></span><ArrowDown aria-hidden="true" /></a>
      </nav>

      {/* Preserve the schools anchor for existing navigation and redirects. */}
      <Section id="schools" tone="band" className="sect--composition sect--workshop">
        <SectionHead
          eyebrow="Incursions"
          title={<>We bring it <em>to you</em></>}
          note="Cultural experiences for schools and companies, delivered at your venue."
        />
        <div className="prose prose--on-band">
          <p>Our educators and artists bring all materials and equipment to your venue, for one class or a whole-day program.</p>
          <p>Choose from performance experiences and hands-on craft workshops to shape a day around your group.</p>
          <a className="workshop-text-link" href="#incursion-activities">Explore the activities <ArrowDown size={18} aria-hidden="true" /></a>
        </div>
        <ArtsComposition variant="workshop" />
      </Section>
      <Section id="incursion-activities" tone="band" className="workshop-catalogue">
        <SchoolsWorkshopsDetail />
      </Section>

      <Section id="excursions" tone="alt">
        <div className="workshop-excursion">
          <div>
            <div className="workshop-format-heading">
              <BusFront aria-hidden="true" />
              <div><h2 className="h2">Excursions</h2><p>Come to us</p></div>
            </div>
            <p className="workshop-copy">For schools and company team-building programs. Visit our venue for an immersive cultural experience with professional facilities and a wide range of hands-on activities.</p>
            <dl className="workshop-excursion-options">
              {EXCURSION_EXPERIENCES.map((experience) => (
                <div key={experience.title}><dt>{experience.title}</dt><dd>{experience.detail}</dd></div>
              ))}
            </dl>
            <Link className="workshop-text-link" href="/contact">Find our campuses <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
          <figure className="workshop-venue">
            <ImageFrame asset={{ src: "/assets/campus/classroom-tables.jpg", alt: "Tables and chairs ready for group activities at Mirror Arts Education.", width: 1448, height: 1086 }} sizes="(min-width: 900px) 45vw, 100vw" />
            <figcaption>A place to learn, create and connect.</figcaption>
          </figure>
        </div>
      </Section>

      <Section id="parties">
        <div className="workshop-format-heading">
          <PartyPopper aria-hidden="true" />
          <div><h2 className="h2">Customised parties</h2><p>Your special occasion</p></div>
        </div>
        <p className="workshop-copy">Private cultural experiences designed for your celebration. Fun, creative and memorable. We can host at our venue or come to your preferred location.</p>
        <div className="workshop-parties">
          {PARTY_OPTIONS.map((party) => (
            <article key={party.id} id={party.id}>
              <h3>{party.title}</h3>
              <p>{party.description}</p>
              <WorkshopActivityList activities={party.activities} />
              <ul className="workshop-party-notes">{party.notes.map((note) => <li key={note}>{note}</li>)}</ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Keep the catalogue anchor used by course links and the footer. */}
      <Section id="workshops" tone="alt">
        <SectionHead title={<>Learn. Create. <em>Celebrate.</em></>} note="A closer look at the experiences, from a first moment on stage to something handmade to take home." />
        <div className="workshop-features">
          {WORKSHOP_FEATURES.map((feature) => (
            <article className="workshop-feature" key={feature.id} id={feature.id}>
              <ImageFrame asset={feature.image} sizes="(min-width: 900px) 46vw, 100vw" enlargeTitle={feature.title} />
              <div className="workshop-feature-copy">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul>{feature.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Faq items={WORKSHOPS_FAQ} tone="base" />
      <Section id="workshop-enquiry" tone="band">
        <div className="workshop-enquiry">
          <div>
            <h2 className="h2">Let’s plan <em>your experience</em></h2>
            <p>Tell us the occasion, your group size and ages, your preferred date, and whether you’d like to visit us or have us come to you.</p>
          </div>
          <a className="pill pill--on-dark" href={`mailto:${SITE.email}?subject=${encodeURIComponent("Cultural workshop enquiry")}`}>Enquire about a workshop <ArrowUpRight size={18} aria-hidden="true" /></a>
        </div>
      </Section>
      <PageNav prev={{ label: "Exams and achievements", href: "/stage#achievements" }} next={{ label: "Studio hire", href: "/workshops/venue" }} />
    </div>
  );
}
