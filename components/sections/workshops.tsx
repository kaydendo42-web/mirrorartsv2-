/* The chip cloud this replaces said "fifteen things" without saying what any
 * of them were, and a school booking an incursion needs to read a list. So
 * this is a list — but the honest structure of one, in the three families the
 * business actually sells, on charcoal.
 *
 * The dark ground does real work: every other section is off-white, and this
 * is the only part of the page addressed to schools and councils rather than
 * to parents. A different audience gets a different room.
 */

const FAMILIES = [
  {
    title: "Performance",
    note: "A room, a demonstration, then everyone has a go.",
    items: [
      "Traditional Chinese music",
      "Chinese martial arts",
      "Dragon and lion dance",
      "Traditional Chinese dance",
    ],
  },
  {
    title: "Craft",
    note: "Materials supplied. Students keep what they make.",
    items: [
      "Lacquer fan making",
      "Tie-dye",
      "Chinese lacquer beads",
      "Sachet making",
      "Eco-friendly paper",
      "Chinese incense",
      "Traditional soap",
    ],
  },
  {
    title: "Studio",
    note: "A working broadcast set and real recording equipment.",
    items: [
      "Chinese singing",
      "Shadow puppetry",
      "Presenter and broadcasting",
      "Voice-over and acting",
    ],
  },
];

export default function Workshops() {
  // The number in the headline has to be the number on the page.
  const total = FAMILIES.reduce((n, f) => n + f.items.length, 0);

  return (
    <section className="sect workshops" id="workshops">
      <div className="wrap">
        <div className="sect__head workshops__head">
          <p className="eyebrow eyebrow--light">Workshops</p>
          <h2 className="h2">
            We bring {total} cultural workshops
            <br />
            to your <em>school</em>
          </h2>
          <p className="workshops__note">
            Booked by schools and councils, not families. One class or a whole
            year level, at your site, and we bring the materials.
          </p>
        </div>

        <ol className="families">
          {FAMILIES.map((f) => (
            <li className="family" key={f.title}>
              <div className="family__head">
                <h3 className="family__title">{f.title}</h3>
                <p className="family__note">{f.note}</p>
              </div>
              <ul className="family__list">
                {f.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <a className="pill pill--on-dark workshops__cta" href="/workshops">
          Browse the workshops
        </a>
      </div>
    </section>
  );
}
