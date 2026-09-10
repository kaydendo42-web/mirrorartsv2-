"use client";

import { useState } from "react";

import { SITE, campusAddress, type Campus } from "@/lib/content/site";

/* Two campuses, one map. Tabs rather than two embeds side by side: a parent is
 * choosing between them, not comparing them, and two maps at half width are
 * two maps nobody can read.
 *
 * Google's no-key embed, loaded lazily so it costs nothing on a visit that
 * never scrolls this far. The URL matters: the obvious
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
 */
export default function CampusTabs({ campuses }: { campuses: readonly Campus[] }) {
  const [index, setIndex] = useState(0);
  const here = campuses[index];
  const address = campusAddress(here);

  return (
    <div className="find__map">
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

      <div
        className="find__frame"
        id="campus-panel"
        role="tabpanel"
        aria-labelledby={`campus-${here.id}`}
      >
        <iframe
          key={here.id}
          title={`Map of the ${here.suburb} campus`}
          src={here.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <address className="find__address">
        <span className="find__address-label">{here.name}</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {address}
        </a>
        <a href={`tel:${SITE.phone.replace(/\s/g, "")}`}>{SITE.phone}</a>
      </address>
    </div>
  );
}
