import Link from "next/link";

import CourseIcon from "@/components/shared/course-icon";
import { courseFactLine, type Course } from "@/lib/content/courses";

/* The catalogue row, as /courses draws it, so a campus page lists courses
   with the same row rather than a second, drifting copy. Lifted out of
   app/courses/page.tsx on 22 September 2026 when the campus pages needed it.
 *
 * A drawing, not a photograph: there are thirteen courses and nine usable
 * photographs between them, so four rows would show the same picture as
 * the row beside them — see the note at the top of course-icon.tsx. The
 * photographs still lead each course's own page, where they are large
 * enough to be worth looking at. */
export default function CourseList({ courses }: { courses: Course[] }) {
  return (
    <ul className="courselist">
      {courses.map((c) => (
        <li
          key={c.slug}
          className="courselist__row"
          style={{ ["--accent" as string]: c.accent }}
        >
          <Link href={`/courses/${c.slug}`} className="courselist__link">
            <span className="courselist__icon" aria-hidden="true">
              <CourseIcon slug={c.slug} />
            </span>
            <span className="courselist__body">
              <span className="courselist__title">{c.title}</span>
              <span className="courselist__strap">{c.summary ?? c.strapline}</span>
              <span className="courselist__meta">{courseFactLine(c)}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
