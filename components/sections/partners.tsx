"use client";

import Link from "next/link";

import LogoBelt from "@/components/shared/logo-belt";
import { SUPPORT_LOGOS } from "@/lib/content/partners";

/* One logo ticker, full-bleed. The blueprint puts its alumni destinations
 * here; ours carries who stands behind the school.
 *
 * There were two belts. The media belt — eleven outlets, most of them
 * Melbourne's Chinese-language press — is out at the client's request (§7 of
 * Revision - Daisy and Rachel, About Page.pdf), here and on /about#partners.
 * MEDIA_LOGOS is still in the content layer with the files still on disk.
 *
 * SUPPORT_LOGOS is imported as its own binding rather than through PARTNERS
 * on purpose; the reason is written where it is declared.
 */

export default function Partners() {
  return (
    <section className="sect" id="partners">
      <div className="wrap">
        <div className="sect__head sect__head--center">
          <p className="eyebrow">Partners</p>
          <h2 className="h2">Who stands behind the work</h2>
        </div>
      </div>

      <LogoBelt
        logos={SUPPORT_LOGOS}
        direction="left"
        label="Supporting organisations"
      />

      <div className="wrap">
        <Link className="ghost" href="/about#partners">
          Our official partners
        </Link>
      </div>
    </section>
  );
}
