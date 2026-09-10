import type { Institution } from "@/lib/content/partners";

/* The named partner organisations: mark, name, and the one sentence saying
 * what the relationship actually is.
 *
 * This was a list of statements with no marks on it until the client sent
 * Partner.docx on 8 September 2026 with six logos in it and asked for them
 * beside the names. Beside, not instead of — a wall of marks says "we know
 * these people" where a sentence says which board sets the syllabus and
 * which consulate broadcast the music videos. So the mark joins the row; it
 * does not take it over, and it is the only loud thing on an otherwise
 * hairline-ruled list.
 *
 * Two of the eight have never supplied a mark and one has not supplied a
 * sentence. Both gaps are rendered as gaps rather than papered over with an
 * invented monogram or an invented relationship, which is also why neither
 * field is required by the type.
 *
 * No "use client" here and none wanted. Nothing on this list moves, so it
 * stays on the server and the eight relationship paragraphs never ship to
 * the browser.
 */
export default function InstitutionRoll({
  institutions,
}: {
  institutions: readonly Institution[];
}) {
  return (
    <ul className="institutions">
      {institutions.map((institution) => (
        <li className="institutions__item" key={institution.slug}>
          <div
            className={`institutions__mark${institution.logo ? "" : " institutions__mark--none"}`}
          >
            {institution.logo && (
              /* alt="" on purpose. The organisation's name is the very next
                 element in the row, so a described mark would make a screen
                 reader say it twice. The alt text the content layer carries
                 is not wasted — it is what any other surface rendering these
                 files without an adjacent name would use. */
              /* Intrinsic sizes vary per mark and the CSS sets the display
                 box, so a plain img is the honest tool here — same call as
                 components/shared/logo-belt.tsx. */
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={institution.logo.src}
                alt=""
                width={institution.logo.width}
                height={institution.logo.height}
                loading="lazy"
              />
            )}
          </div>
          <div className="institutions__body">
            <h3 className="institutions__name">{institution.name}</h3>
            {institution.relationship && (
              <p className="institutions__rel">{institution.relationship}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
