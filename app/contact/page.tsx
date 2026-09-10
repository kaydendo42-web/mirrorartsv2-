import type { Metadata } from "next";
import Image from "next/image";

import CampusTabs from "@/components/shared/campus-tabs";
import EnquiryForm from "@/components/shared/enquiry-form";
import Lightbox from "@/components/shared/lightbox";
import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";
import { SITE, campusAddress } from "@/lib/content/site";

/* Every way to reach the school, in one place, for the first time.
 *
 * The live site links none of these. The Facebook page, the Instagram
 * account, the YouTube channel, the WeChat ID and the Xiaohongshu number all
 * exist and appear nowhere on it — the WeChat QR was published as part of a
 * poster image, which is to say it was published as pixels.
 *
 * #trial is load-bearing. The masthead's filled pill, the most prominent call
 * to action on every page of the site, points at /contact#trial. If that id
 * moves or disappears, the site's primary CTA goes nowhere. #wechat and
 * #xiaohongshu are the same deal for the footer's social row. */

export const metadata: Metadata = {
  title: "Contact",
  description: `Book a trial class at Mirror Arts Education. Two campuses — ${campusAddress(SITE.campuses[0])} and ${campusAddress(SITE.campuses[1])}. Phone, WhatsApp, email, WeChat and Xiaohongshu.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Come and <em>try a class</em>
          </>
        }
        standfirst="Tell us the child's age and what they are already doing, and we will say plainly which course fits and whether there is room in it this term."
        trail={[{ label: "Contact" }]}
        density="bare"
      />

      <Section id="trial">
        <SectionHead
          eyebrow="Book a trial"
          title="Start here"
          note="There is no online booking and no payment page. A person reads this and answers it."
        />
        <EnquiryForm />
      </Section>

      <Section tone="alt">
        <SectionHead
          eyebrow="Campuses"
          title="Both rooms, on a map"
          note="Classes run at both. Studio hire and the workshop space are at Surrey Hills."
        />
        {/* CampusTabs was built for the homepage, where it sits in a
            two-column grid at about half width and its 4:3 frame lands around
            480px tall. Alone in a section at the full 1300px measure, the same
            ratio draws a 975px map — taller than the window, which is a map
            you scroll past rather than read. */}
        <div className="contactmap">
          <CampusTabs campuses={SITE.campuses} />
        </div>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Every channel"
          title="However you prefer to write"
          note="Phone, message or email. A person reads all of them."
        />

        <ul className="channels channels--stacked">
          <li>
            <span className="channels__label">Phone</span>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
          </li>
          <li>
            <span className="channels__label">WhatsApp</span>
            <span>{SITE.whatsapp}</span>
          </li>
          <li>
            <span className="channels__label">Email</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li id="wechat">
            <span className="channels__label">
              WeChat
            </span>
            <span>{SITE.wechat}</span>
          </li>
          <li id="xiaohongshu">
            <span className="channels__label">
              Xiaohongshu
            </span>
            <span>{SITE.xiaohongshu}</span>
          </li>
        </ul>

        <div className="qr">
          {/* The QR is a scan target, so it opens full size rather than being
              printed large on the page — a phone camera needs about 200px of
              code, and the poster it came out of gives exactly 206. */}
          <Lightbox
            title="WeChat QR code"
            description={`Scan to add Mirror Arts Education on WeChat, or search the ID ${SITE.wechat}.`}
            trigger={
              <button type="button" className="qr__thumb">
                <Image
                  src="/assets/contact/wechat-qr.png"
                  alt="WeChat QR code for Mirror Arts Education"
                  width={206}
                  height={206}
                  sizes="206px"
                />
                <span className="qr__hint">Scan on WeChat</span>
              </button>
            }
          >
            <Image
              className="lightbox__img"
              src="/assets/contact/wechat-qr.png"
              alt="WeChat QR code for Mirror Arts Education"
              width={206}
              height={206}
              sizes="(min-width: 600px) 320px, 70vw"
            />
          </Lightbox>

          <ul className="socials">
            {SITE.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} rel="noopener">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <PageNav prev={{ label: "Studio hire", href: "/workshops/venue" }} />
    </>
  );
}
