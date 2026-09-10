import type { Metadata } from "next";
import ImageFrame from "@/components/shared/image-frame";

import PageHero from "@/components/site/page-hero";
import PageNav from "@/components/site/page-nav";
import { Section, SectionHead } from "@/components/site/section";
import { SITE, campusAddress } from "@/lib/content/site";
import {
  HIRE_SPACES,
  VENUE_RATES_AS_AT,
  VENUE_RATE_UNIT,
  VENUE_TERMS,
} from "@/lib/content/venue";

/* The find of this whole rebuild.
 *
 * The old site's 场地租赁 page had literally no text on it — the entire offer
 * was a background image nobody rendered, so five spaces, their sizes, their
 * peak and off-peak rates, two extras and two conditions were invisible to
 * every search engine and every screen reader that ever visited.
 *
 * A venue buyer compares on price and will not assemble a comparison from
 * five cards, so the rate table exists as well as the cards. Rates are
 * published with the date they were current, because publishing a price with
 * no date is how a price becomes a complaint.
 *
 * No Lightbox on the photographs, and that is a deviation from the plan's
 * interface list. The eight room photographs were sliced out of the poster
 * and are 377 to 674 pixels wide — opening one in a dialog shows the same
 * pixels larger and softer. If the client supplies originals, this is where
 * the lightbox goes. */

export const metadata: Metadata = {
  title: "Studio hire",
  description: `Five spaces for hire at Mirror Arts Education, ${campusAddress(SITE.campuses[0])} — a 150 m² function room with stage lighting and an LED screen, three studios and an 80 m² workshop space. Rates as at ${VENUE_RATES_AS_AT}.`,
};

const CHEAPEST = Math.min(...HIRE_SPACES.map((s) => s.offPeakRate));
const LARGEST = Math.max(...HIRE_SPACES.map((s) => s.squareMetres));

export default function VenuePage() {
  return (
    <>
      <PageHero
        eyebrow="Studio hire"
        title={
          <>
            Five rooms, <em>by the hour</em>
          </>
        }
        standfirst={`All five are at the main campus, ${campusAddress(SITE.campuses[0])}. Rehearsals, classes, showcases, meetings and parties.`}
        trail={[
          { label: "Workshops", href: "/workshops" },
          { label: "Studio hire" },
        ]}
        density="deep"
        meta={[
          { label: "Spaces", value: String(HIRE_SPACES.length) },
          { label: "Largest", value: `${LARGEST} m²` },
          { label: "From", value: `$${CHEAPEST} an ${VENUE_RATE_UNIT}` },
          { label: "Rates as at", value: VENUE_RATES_AS_AT },
        ]}
      />

      <Section>
        <SectionHead
          eyebrow="The spaces"
          title="What each room is"
          note="Off-peak is weekdays before 5pm. Everything else — evenings and weekends — is the peak rate."
        />
        <div className="spaces">
          {HIRE_SPACES.map((s) => (
            <article className="space" key={s.slug} id={s.slug}>
              {s.photos.length > 0 && (
                <ul className="space__photos">
                  {s.photos.map((ph) => (
                    <li key={ph.src}>
                      <ImageFrame asset={ph} sizes="(min-width: 900px) 420px, 90vw" />
                    </li>
                  ))}
                </ul>
              )}

              <div className="space__body">
                <h3 className="space__name">
                  {s.name}
                  <span className="space__size">{s.squareMetres} m²</span>
                </h3>

                <dl className="space__rates">
                  <div>
                    <dt>Peak</dt>
                    <dd>
                      ${s.peakRate}
                      <span> / {VENUE_RATE_UNIT}</span>
                    </dd>
                  </div>
                  <div>
                    <dt>Weekdays before 5</dt>
                    <dd>
                      ${s.offPeakRate}
                      <span> / {VENUE_RATE_UNIT}</span>
                    </dd>
                  </div>
                </dl>

                {(s.inclusions.length > 0 || s.extras.length > 0) && (
                  <ul className="space__extras">
                    {s.inclusions.map((inc) => (
                      <li key={inc}>{inc}, included</li>
                    ))}
                    {s.extras.map((e) => (
                      <li key={e.label}>
                        {e.label}, ${e.rate} / {VENUE_RATE_UNIT}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="alt">
        <SectionHead
          eyebrow="Compare"
          title="All five, side by side"
          note="The same five spaces on one line, so you can compare on price without reading five cards."
        />
        {/* Five rows and four columns is where a table breaks at 375px, so it
            scrolls inside its own container rather than pushing the page
            sideways. The wrapper is focusable and labelled, because a region
            that scrolls has to be reachable by keyboard too. */}
        <div
          className="tablewrap"
          tabIndex={0}
          role="region"
          aria-label="Hire rates for all five spaces"
        >
          <table className="rates">
            <caption className="sr-only">
              Hire rates by space, in Australian dollars per {VENUE_RATE_UNIT},
              as at {VENUE_RATES_AS_AT}
            </caption>
            <thead>
              <tr>
                <th scope="col">Space</th>
                <th scope="col">Size</th>
                <th scope="col">Peak</th>
                <th scope="col">Weekdays before 5</th>
              </tr>
            </thead>
            <tbody>
              {HIRE_SPACES.map((s) => (
                <tr key={s.slug}>
                  <th scope="row">{s.name}</th>
                  <td>{s.squareMetres} m²</td>
                  <td>${s.peakRate}</td>
                  <td>${s.offPeakRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="sect__note">
          Australian dollars per {VENUE_RATE_UNIT}. Rates current as at{" "}
          {VENUE_RATES_AS_AT}, and confirmed on booking.
        </p>
      </Section>

      <Section>
        <SectionHead
          eyebrow="Conditions"
          title="Two things to know before you book"
          note="Both are printed on the school's own rate card. They are conditions an organisation needs before it enquires, not fine print."
        />
        <ul className="terms">
          {VENUE_TERMS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Section>

      <Section tone="band">
        <SectionHead
          eyebrow="Enquire"
          title={
            <>
              Tell us the date and <em>what it is for</em>
            </>
          }
          note="Venue hire is a conversation, not a form. Availability comes back the same way you send it."
        />
        <ul className="channels">
          <li>
            <span className="channels__label">Email</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>
            <span className="channels__label">Phone</span>
            <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
          </li>
          <li>
            <span className="channels__label">WhatsApp</span>
            <span>{SITE.whatsapp}</span>
          </li>
        </ul>
      </Section>

      <PageNav
        prev={{
          label: "For schools and organisations",
          href: "/workshops#schools",
        }}
        next={{ label: "Contact", href: "/contact" }}
      />
    </>
  );
}
