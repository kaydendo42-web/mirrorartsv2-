"use client";

import { useState } from "react";
import Link from "next/link";

import { SITE, campusAddress, campusMapUrl, campusPath, type Campus } from "@/lib/content/site";

/* Two campuses, one map. Tabs rather than two embeds side by side: a parent is
 * choosing between them, not comparing them, and two maps at half width are
 * two maps nobody can read.
 *
 * Google's no-key embed, and it loads only when the reader presses "Show
 * map". Google sets cookies the moment its frame loads, and that was the one
 * third-party cookie this site set without anyone asking for it. Behind a
 * press, /privacy can say truthfully that nothing third-party touches the
 * reader's device unless they choose it — which is a shorter, stronger
 * sentence than any consent banner, and Australian law asks for neither.
 * One press covers both campuses for the rest of the visit; the tab switch
 * does not re-ask. Nothing is persisted: a reload is a fresh choice.
 *
 * The URL matters: the obvious
 * `maps.google.com/maps?q=…&output=embed` 301s to this form, and that redirect
 * response carries `X-Frame-Options: SAMEORIGIN`, so the browser refuses the
 * frame and you get a grey box. The working URL is built once per campus in
 * lib/content/site.ts and read from there — the formula that builds it is
 * documented beside it.
 *
 * The tablist is hand-rolled rather than shadcn's Tabs. It already carries
 * roving tabindex, both arrow-key axes, aria-selected and aria-controls, and
 * it works; swapping in Radix here would be a behaviour change inside a
 * refactor, which is how a refactor stops being one. New tab UIs should use
 * the primitive.
 *
 * Since 22 September 2026 the address block also links to the campus's
 * own page (/surrey-hills, /glen-waverley), and a single-campus mount —
 * which is how those pages use it — renders no tablist at all.
 */
export default function CampusTabs({
  campuses,
  linkToPage = true,
}: {
  campuses: readonly Campus[];
  /* The address block links to the campus's own page — except on that
     page, where the link would point at itself. */
  linkToPage?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [mapOn, setMapOn] = useState(false);
  const here = campuses[index];
  const address = campusAddress(here);

  return (
    <div className="find__map">
      {/* One campus is not a choice. The campus pages mount this with a
          single entry for the gated map and the address block, and a
          tablist of one tab is noise for a screen reader. */}
      {campuses.length > 1 && (
        <div className="find__tabs" role="tablist" aria-label="Choose a campus">
          {campuses.map((c, i) => (
            <button
              key={c.id}
              role="tab"
              type="button"
              id={`campus-${c.id}`}
              aria-selected={i === index}
              aria-controls="campus-panel"
              tabIndex={i === index ? 0 : -1}
              className={`find__tab${i === index ? " is-on" : ""}`}
              onClick={() => setIndex(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                  e.preventDefault();
                  setIndex((v) => (v + 1) % campuses.length);
                }
                if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                  e.preventDefault();
                  setIndex((v) => (v - 1 + campuses.length) % campuses.length);
                }
              }}
            >
              <span className="find__tab-name">{c.suburb}</span>
            </button>
          ))}
        </div>
      )}

      <div
        className="find__frame"
        id="campus-panel"
        role="tabpanel"
        {...(campuses.length > 1
          ? { "aria-labelledby": `campus-${here.id}` }
          : { "aria-label": `Map of the ${here.suburb} campus` })}
      >
        {mapOn ? (
          <iframe
            key={here.id}
            title={`Map of the ${here.suburb} campus`}
            src={here.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <div className="find__gate">
            <p className="find__gate-place">
              <span className="find__gate-suburb">{here.suburb}</span>
              <span>{address}</span>
            </p>
            <button
              type="button"
              className="pill"
              onClick={() => setMapOn(true)}
            >
              Show map
            </button>
            <p className="find__gate-fine">
              Loads Google Maps, which may set its own cookies.{" "}
              <Link href="/privacy#cookies">How this site handles cookies</Link>
            </p>
          </div>
        )}
      </div>

      <address className="find__address">
        <span className="find__address-label">{here.name}</span>
        <a
          href={campusMapUrl(here)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {address}
        </a>
        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
        {linkToPage && (
          <Link href={campusPath(here)} className="find__more">
            About the {here.suburb} campus
          </Link>
        )}
      </address>
    </div>
  );
}
