"use client";

import CampusTabs from "@/components/shared/campus-tabs";
import EnquiryForm from "@/components/shared/enquiry-form";
import RoomGrid from "@/components/shared/room-grid";
import { SITE } from "@/lib/content/site";

/* The campus map and the enquiry form both moved to components/shared, because
 * /contact needs the same two and a second copy of the form is a second place
 * for the course allow-list to drift out of step with the server action that
 * validates against it.
 *
 * The campuses now come from lib/content/site.ts rather than a literal
 * declared here. That literal had drifted: its Surrey Hills address read
 * "1f/244 Canterbury Rd" against the verbatim "1F/244".
 *
 * The room photographs arrived here on 8 September 2026, off the homepage's
 * purpose block, which the client asked to have removed. They belong in this
 * section anyway: they answer "what is it like there", which is the question
 * this section exists to answer and the one a map cannot.
 *
 * They ran full-bleed as a marquee until 9 September. They are a contained
 * grid now, inside .wrap and on the heading's left margin — the belt was a
 * band and wanted the edges, this is a gallery and wants the rule. See the
 * .rooms block in globals.css for how the rows get their height. */

export default function FindUs() {
  return (
    <section className="sect sect--alt find" id="find-us">
      <div className="wrap">
        <div className="sect__head">
          <p className="eyebrow">Visit</p>
          <h2 className="h2">
            Two campuses in Melbourne&apos;s east.
            <br />
            Come and <em>watch</em> a class
          </h2>
          <p className="sect__note">
            Trials are free and you are welcome to sit in. Tell us who the class
            is for and we will find a time.
          </p>
        </div>

        <RoomGrid />
      </div>

      <div className="wrap find__body">
        <div className="find__grid">
          <CampusTabs campuses={SITE.campuses} />
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
