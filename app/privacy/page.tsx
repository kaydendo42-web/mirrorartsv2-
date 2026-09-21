import type { Metadata } from "next";
import Link from "next/link";

import PageHero from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { SITE, campusAddress } from "@/lib/content/site";

/* The privacy policy, written against the Australian Privacy Principles.
 *
 * It describes what the site actually does, not what a template imagines a
 * site might do. The site has one form, one email provider, one host and
 * one embedded map, and sets no cookies of its own — so the policy says
 * exactly that, and the cookies section is a section here rather than a
 * page of its own, because four paragraphs is not a page. The footer's
 * "Cookies" link lands on #cookies.
 *
 * Every named fact — entity, ABN, addresses, email, phone, the last-updated
 * date — is read from lib/content/site.ts. Nothing here is retyped, so the
 * policy cannot drift from the footer or the contact page.
 *
 * Two things this deliberately does not promise: a retention period in
 * months, because the school has not set one and a number written here
 * would be an invention; and a cookie consent banner, because Australian
 * law does not require one and the site has nothing to consent to until a
 * reader chooses to load the map. If analytics ever arrives, the cookies
 * section and policyUpdated both change on the same day.
 *
 * This was written by the studio, not a lawyer. It is structured correctly
 * and it is truthful; the client should still have it read. */

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
  description: `How Mirror Arts Education collects, uses and protects the details you send us — the enquiry form, server logs, the campus map, and what this site does and does not store on your device.`,
};

/* Anchors for the contents list and the footer. The footer's "Cookies" link
   depends on #cookies; a test in content.test.ts does not cover it, so if
   the id changes, change the footer. */
const CONTENTS = [
  { id: "who", label: "Who we are" },
  { id: "collect", label: "What we collect" },
  { id: "why", label: "Why we collect it" },
  { id: "children", label: "Children" },
  { id: "share", label: "Who receives it" },
  { id: "cookies", label: "Cookies and your device" },
  { id: "keep", label: "Storage and security" },
  { id: "rights", label: "Access, correction and complaints" },
  { id: "changes", label: "Changes to this policy" },
] as const;

function longDate(iso: string) {
  return new Date(`${iso}T00:00:00+10:00`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Melbourne",
  });
}

export default function PrivacyPage() {
  const { legal, email, phone, campuses } = SITE;

  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title={
          <>
            What we do with <em>your details</em>
          </>
        }
        standfirst="This site asks you for very little, and this page says plainly what happens to it."
        trail={[{ label: "Privacy" }]}
        density="bare"
      />

      <Section>
        <article className="legal">
          <p className="legal__updated">
            Last updated {longDate(legal.policyUpdated)}
          </p>

          <nav className="legal__contents" aria-label="On this page">
            <ol>
              {CONTENTS.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`}>{c.label}</a>
                </li>
              ))}
            </ol>
          </nav>

          <h2 id="who">Who we are</h2>
          <p>
            Mirror Arts Education is the trading name of {legal.entity} (ABN{" "}
            {legal.abn}). We teach performing arts to children and adults
            at two campuses in Melbourne&apos;s east:
          </p>
          <ul>
            {campuses.map((c) => (
              <li key={c.id}>{campusAddress(c)}</li>
            ))}
          </ul>
          <p>
            We are bound by the Australian Privacy Principles in the Privacy
            Act 1988 (Cth). Questions about this policy go to{" "}
            <a href={`mailto:${email}`}>{email}</a> or{" "}
            <a href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>.
          </p>

          <h2 id="collect">What we collect</h2>
          <p>
            <strong>What you type into the enquiry form.</strong> The form
            asks for the student&apos;s name, a parent&apos;s name, a way to
            reach you — phone, email or WeChat ID, whichever you prefer — and
            the course you are asking about. We collect only what you put in
            it.
          </p>
          <p>
            <strong>What every website receives.</strong> When you open a
            page, our hosting provider records the usual server details: your
            IP address, the type of browser and device, the pages you
            requested and when. These logs exist to keep the site running and
            secure. We do not use them to work out who you are.
          </p>
          <p>
            <strong>What we do not collect.</strong> This site has no
            accounts, no online booking and no payment page. It runs no
            analytics and no advertising trackers, and it does not follow
            you to other sites.
          </p>

          <h2 id="why">Why we collect it</h2>
          <p>
            We use the details from the enquiry form to answer your enquiry,
            to suggest a class that fits, and to book a trial. If you go on to
            enrol, those details become the start of the student&apos;s
            enrolment record, which we keep in the school&apos;s own systems
            rather than on this website.
          </p>
          <p>
            We do not add you to a marketing list because you enquired, and we
            do not sell or rent contact details to anyone.
          </p>

          <h2 id="children">Children</h2>
          <p>
            Our youngest students are four, so the form asks for the
            student&apos;s name — we need to know who the class is for. We ask
            that a parent or guardian completes the form, and the form is
            written to them. We do not knowingly collect personal information
            directly from a child through this site. If you believe a child
            has sent us something without a parent&apos;s knowledge, email us
            and we will delete it.
          </p>

          <h2 id="share">Who receives it</h2>
          <p>
            Three companies handle data on our behalf so that this site can
            work. None of them may use your details for their own purposes.
          </p>
          <ul>
            <li>
              <strong>Resend</strong> delivers the enquiry form to our inbox
              as an email. It handles your message in transit and holds a
              copy in its delivery logs for a limited time.
            </li>
            <li>
              <strong>Vercel</strong> hosts this website and stores the
              performance videos. It holds the server logs described above.
            </li>
            <li>
              <strong>Google</strong> provides the campus map. It loads only
              when you press &ldquo;Show map&rdquo;, and until then nothing
              is sent to Google. When it does load, Google&apos;s own privacy
              policy governs what it records.
            </li>
          </ul>
          <p>
            Resend and Vercel are United States companies and may store data
            on servers outside Australia. By sending the enquiry form you
            agree to your details travelling that way. We do not otherwise
            disclose personal information overseas.
          </p>
          <p>
            This site links to our Facebook, Instagram and YouTube pages.
            Those services have their own policies, and this one stops at
            the link.
          </p>

          <h2 id="cookies">Cookies and your device</h2>
          <p>
            <strong>This site sets no cookies of its own.</strong> There are
            no analytics cookies, no advertising cookies and no cookie
            banner, because there is nothing to ask your permission for.
          </p>
          <p>Two things can be stored on your device, and here they are:</p>
          <table className="legal__table">
            <thead>
              <tr>
                <th scope="col">What</th>
                <th scope="col">Set by</th>
                <th scope="col">Why</th>
                <th scope="col">Lasts</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>mirror.intro</code>
                </td>
                <td>This site (session storage, not a cookie)</td>
                <td>
                  Remembers that the opening animation has played, so it
                  plays once per visit rather than on every page.
                </td>
                <td>Until you close the tab</td>
              </tr>
              <tr>
                <td>Google Maps cookies</td>
                <td>Google, only after you press &ldquo;Show map&rdquo;</td>
                <td>
                  Google&apos;s own preferences and security cookies for the
                  embedded map.
                </td>
                <td>Set by Google; see its policy</td>
              </tr>
            </tbody>
          </table>
          <p>
            If you never press &ldquo;Show map&rdquo;, no third party stores
            anything on your device through this site. If we ever add
            analytics, this section and the date at the top of the page
            change on the same day.
          </p>

          <h2 id="keep">Storage and security</h2>
          <p>
            An enquiry arrives as an email in the school&apos;s inbox and is
            read by the staff who handle enquiries. We keep it for as long as
            we need it to answer you and follow up. If you do not enrol, you
            can ask us to delete it at any time, and we will.
          </p>
          <p>
            The site is served over HTTPS, so what you type in the form is
            encrypted on its way to us. Our providers publish their own
            security practices; we rely on them for the systems we do not run
            ourselves.
          </p>

          <h2 id="rights">Access, correction and complaints</h2>
          <p>
            You can ask us what personal information we hold about you or
            your child, ask us to correct it, or ask us to delete it. Email{" "}
            <a href={`mailto:${email}`}>{email}</a> and we will respond
            within thirty days. There is no charge.
          </p>
          <p>
            If you think we have mishandled your information, tell us first
            and we will try to put it right. If you are not satisfied with
            our answer, you can complain to the Office of the Australian
            Information Commissioner at{" "}
            <a href="https://www.oaic.gov.au" rel="noopener">
              oaic.gov.au
            </a>{" "}
            or on 1300 363 992.
          </p>
          <p>
            This policy is written in English. If it would help to talk it
            through in Mandarin, message us on WeChat at {SITE.wechat} or
            call — see the <Link href="/contact">contact page</Link>.
          </p>

          <h2 id="changes">Changes to this policy</h2>
          <p>
            When this policy changes, the date at the top changes with it.
            The current version is always the one at this address.
          </p>
        </article>
      </Section>
    </>
  );
}
