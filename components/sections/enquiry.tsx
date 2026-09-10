import { SITE } from "@/lib/content/site";

/* The closing beat. It used to carry the only call to action on the page, but
   the find-us section now holds a real form, so this stops competing with it
   and points there instead.

   The two addresses come from the content layer. Typed out here they had
   drifted to a lowercase "1f/244". */
export default function Enquiry() {
  return (
    <section className="band band--cta" id="enquire">
      <div className="wrap wrap--narrow band__in">
        <span className="arch-rule" aria-hidden="true" />
        <h2 className="band__lead band__lead--h">
          Come and try a class. <em>Bring your child</em> and meet the teacher.
        </h2>
        <a className="pill pill--lg pill--on-dark" href="#find-us">
          Book a trial class
        </a>
        <p className="band__note">
          {SITE.campuses.map((c, i) => (
            <span key={c.id}>
              {i > 0 && <>&nbsp;·&nbsp;</>}
              {c.suburb} · {c.address}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
