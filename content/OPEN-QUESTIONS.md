# Open questions for Rachel & Daisy

Everything below blocks or shapes a decision. Grouped by how urgent it is.
Nothing here stops us starting — but the 🔴 items must be answered before launch.

---

## 🔴 Blocking launch

1. **Who is Daisy?** She doesn't appear anywhere on the current site. Full name, Chinese name,
   role, bio, headshot — and does she replace or sit alongside Diana Zhao / Rachel Cai?
2. **China Daily results page has live placeholder text** — *"XXX obtained Third, Second and
   First places… XXXXX was awarded an opportunity to travel to XXX"*. We need the real numbers,
   student names (with parental consent to publish), mentor names, and which channel interviewed them.
3. **Domain & DNS** — who controls `mirrorartsedu.com`? Registrar login, or are we pointing
   nameservers? The current builder (`dlssyht.cn`) may hold the domain.
4. **The wig pages.** 19 live pages are a leftover e-commerce demo about wigs, and they're in
   the sitemap. Confirm we can delete them and 410/redirect at cutover.
5. **Photo consent** — are the students shown in the posters and gallery cleared for use on a
   new public site? Any that must come down? Answered - all photos are cleared to be usedAl
6. **"Australia's only CEFA children's language-performance examination centre"** — we want
   this in the homepage hero as your strongest credential. It's a factual claim about being
   the sole centre nationally, so we need you to confirm it's current and, ideally, something
   in writing from CEFA. Right now it's buried mid-paragraph inside the Bilingual Hosting
   course poster (`content/MIRROR-ARTS-EDUCATION.md` §4.3).

---

## 🟠 Shapes the build

6. ~~**English-first, Chinese-first, or true bilingual?**~~ ✅ **Decided 4 Aug 2026 (Kayden):**
   English at the root, full Chinese mirror at `/zh`, `hreflang` both ways. English leads
   because that's where the local search volume is in Surrey Hills and Glen Waverley.
7. **Pricing.** No prices anywhere on the current site. Do we publish course fees, or keep
   "enquire"? If publishing: fee per term for each of the 9 courses.
8. **Term dates & timetable.** Which courses run when, at which campus, what times, term dates
   for 2026? A real timetable is the single biggest upgrade over the current site.
9. **Enrolment flow.** Where does a parent actually sign up — form to email, WeChat, a booking
   system, online payment? This decides whether we need a backend.
10. **Venue hire.** The 场地租赁 page has literally no text. What's for hire, capacity, rates,
    photos, booking process?
11. **Do you want a news/blog?** Footer links to 新闻动态 exist but go nowhere.
12. **Which productions get full case-study pages** vs. a gallery tile? (Born to Fly, 笔画春秋,
    Jungle Book, the galas, the China Daily competition are the strongest candidates.)
13. 🔺 **Do you sell to organisations, not just parents?** Three things on the current site
    point at a second buyer, and the answer changes the site structure:
    - The **15 workshops** (lacquer fans, tie-dye, lion dance, shadow puppets, incense, eco
      paper) are structured exactly like school incursions — fixed duration, age bands,
      "materials provided", group delivery. Do schools book these? How many a year, at what
      price, and who signs off — a teacher, a curriculum coordinator, a principal?
    - **场地租赁 (venue hire)** is a live page with no text on it at all. Is this a real
      revenue line? What's for hire, capacity, rates, and who rents it?
    - **Event production** — you direct galas, produce MVs, and run competitions with China
      Daily, the Consulate and the Chinese Museum. Do councils, festivals or corporates hire
      you for this, or does it only happen through relationships?

    If any of these are real, they need their own page and their own enquiry path — an
    organisation books a term ahead by email with a quote and a compliance pack, which is
    nothing like how a parent buys. If they're occasional, they stay as credibility content
    and we keep one funnel. See `content/AUDIENCE.md` §4.
14. **Do local English-speaking families currently enrol at all?** Even a rough number, and how
    they found you. This is the single biggest assumption in `content/AUDIENCE.md` — the whole
    English-first strategy rests on that market being reachable.

---

## 🟡 Assets we need from you

13. **Vector logo** (AI/SVG/EPS). We only have a 400px PNG.
14. **Brand fonts** — the poster headline face and the serif used on teacher cards. Names or files.
15. **Brand guidelines**, if any exist.
16. **High-res photography** — performance shots, classroom shots, campus exteriors/interiors.
    Everything we have was pulled off a Chinese CDN at web resolution.
17. ~~**Video** — the actual MV files or their YouTube/Vimeo/Bilibili links.~~ ✅ **Resolved
    6 Aug 2026.** All six were already on the live site, streaming from a Tencent VOD CDN, and
    are now downloaded to `media/` (5.1 GB of masters — see `media/MANIFEST.md`). Still worth
    asking whether Rachel holds higher-quality originals locally, and whether the CDN account
    is hers or the old builder's.
18. **Partner logos** — we have a 23-logo sheet as one image. Need individual files + correct
    names, and confirmation each partner allows their logo on the site.
19. **Teacher headshots** at higher resolution, plus any faculty not yet on the site.
20. **Google Business Profile access** — you mentioned it. We'll want it for NAP consistency,
    reviews embedding, and local SEO. Confirm which listing(s): Surrey Hills, Glen Waverley, or both.

---

## 🟢 Nice to resolve

21. **Timeline gap** — the 发展历程 section groups 2022 and 2023 loosely. What exactly happened in 2023?
22. **Hero typo** on the live site: 展和传播 should be 展示和传播. Confirm we fix.
23. **Social links** — Xiaohongshu ID 789947009 is watermarked on the posters but never linked.
    Do you have Instagram, Facebook, YouTube, RED, Douyin? We should link them all.
24. **Testimonials** — any parent quotes we can publish?
25. **Awards/certifications** to display as trust badges: CEFA sole-centre status, AMEB, Trinity,
    ACIC. Any certificates we can show?
26. **Email hosting** — is `info@mirrorartsedu.com` on the same provider as the site? Moving the
    site must not break email.

---

## 🔵 From the 4 Sep 2026 revision

Everything in `Revision - Daisy and Rachel/` is built. These are the things it raised that we
could not settle ourselves.

27. ~~**Two logo files.**~~ **Answered 8 Sep 2026** by `Partner.docx`, which sent six marks:
    AYACA, the Melbourne Chinese Museum, Salesian College Chadstone, AMEB, CEFA and Trinity
    College London. All six are cut out and now sit beside the partner names on
    `/about#partners`. **One thing is still open: what is Salesian College Chadstone's
    relationship to Mirror?** Every other partner on that list has a sentence saying what the
    organisation does for students — which board sets the syllabus, which programme runs
    where. Salesian arrived as a name and a logo only, so its row currently carries no
    sentence. Give us one line and we will put it in; we are not writing one for you, because
    a partnership claim has to be yours.

    Two smaller notes while we are here. **CEFA's mark is very pale** — it is a light blue on
    white, and once the white is gone it is the faintest thing on the page. That is the logo
    as CEFA use it, not a mistake in our cut-out, but if you have a darker or single-colour
    version it would read better. And the marks all came in as pictures pasted into Word, two
    of them re-saved as JPEG; **if you can get SVG or PNG originals from any of these six**,
    they will stay sharp on large screens where ours will not.
28. **The CEFA wording changed and we did not chase it through.** Your new line reads
    "Mirror Arts Education is CEFA's authorised examination centre in Australia" — no
    "only". The sole-centre claim is still in `/stage#achievements` (twice) and inside the
    bilingual hosting course. Do you want "only" out of those as well, or is it still the
    claim you want to make?
29. **The rename year.** Your sentence says Mirror Drama Studio became Mirror Arts Education
    **in 2024**. Our record (`content/MIRROR-ARTS-EDUCATION.md` §7) has it at **2025**. We
    have used your year and taken the 2025 milestone off the About page entirely so the page
    does not contradict itself, but the record still says 2025. Which is right?
30. **Two of Diana Zhao's hosting clients had no English name** — 白马商会 and 澳洲茅台. We
    have written them as "the Baima Chamber of Commerce" and "Moutai Australia". Confirm, or
    give us the names they use in English.
31. **Chinese is baked into two images.** The *Born to Fly* video still has 大大的舞台 burned
    into the frame, and the Spring Festival Gala photograph carries a Chinese watermark in
    the corner. We can only fix those with clean files.
32. ~~**The homepage now lists nine disciplines.**~~ **Answered 8 Sep 2026** by
    `Revision Part 2`, which added Debating, Instrument, MV and Dance as courses. All nine
    of the disciplines named under the welcome now have a course page behind them.
33. **Glen Waverley has no photographs.** The seven rooms you sent are all Surrey Hills. The
    eighth file was a contact sheet of the large hall — three photographs composited into one
    image, which we cannot use. Send the three originals and any Glen Waverley rooms.
34. **The Chinese name in the site's structured data.** Every page still declares
    墨尔本魔镜艺术教育 as an alternate name for the business in its machine-readable markup.
    Nobody sees it; Google uses it to match Chinese-language searches to you. We have left it
    in. Say if you want it out too.


---

## 🟣 From the 8 Sep 2026 revision (Revision Part 2 + WeChat)

`Revision Part 2/Courses/Courese.pdf` is built — all 38 items — along with the four things
asked for over WeChat the same evening. These are what that pass raised.

35. **The class photographs and video.** Five items (8, 13, 19, 26 and 32) ask for a
    photo/video section under Drama, Musical Theatre, Speech, Dubbing and Vocal, showing
    "real classroom footage and photos".

    **Item 8 is done, differently.** Rather than a strip under Drama alone, everything we
    hold is now a single contact sheet across the top of the Courses page: sixteen frames —
    your ten course photographs and the six production films — sitting directly under the
    headline, before the first course is named. Five of the frames play when you hover or
    tap them. It is the first thing a parent sees on that page, and it says what the school
    looks like at work before it says what it teaches.

    **Items 13, 19, 26 and 32 are waiting on you.** Those sections stay off until you tell
    us which photographs belong to which course. The ten you sent are each already the main
    picture of the course they were sent for, and the eight in the `Classroom` folder are
    the same seven room photographs from 4 September that are already on the homepage — so
    there is nothing left over to fill them with.

    **What to send:** four or five photographs per course, or a short clip. Children in the
    room working, not the empty room. Tell us the course each one belongs to and they go up
    with no further work.
36. ~~**Four courses still have no teacher named.**~~ **Half-answered 9 Sep 2026** by the
    faculty cards. Dance now has Rachel Cai, whose card reads DANCE & POSTURE. **Debating,
    Instrument (AMEB) and MV (Production) still have nobody** — no card claims any of the
    three — so those three pages still carry no "Who runs the room". Who teaches each? A
    name and one line of credentials is enough. See §49 below.
37. **Debating has no photograph**, so its page opens on type alone. Anything from a class,
    a mock debate or a competition would do.
38. **Three numbers we could not find.** Debating's minimum age; how many sessions a term
    Dance and Instrument run; and whether MV Production is a five-day camp like Dubbing or
    some other length. The pages simply omit what you did not state rather than guessing.
39. **Your headline said "Four disciplines. Nine courses."** — there are thirteen now, and a
    fifth section (Adult Program) beside the four disciplines. We have kept your sentence and
    corrected the count, and it is generated from the catalogue so it cannot go stale again:
    "Four disciplines. Thirteen courses. One stage to grow into." Say if you would rather it
    read differently.
40. **Adult Jazz Dance is listed twice in your document** — once in the Dance & Posture blurb
    and once as an adult program. We have left it in the Adult Program section only, since
    that is where an adult would look for it. Confirm.
41. **The Dance course is one page, not three.** Hip Hop, K-pop and Chinese Dance are on it
    as three named styles with your descriptions. Three separate pages would each have carried
    a single sentence. The homepage card lists all four class names the way you wrote them,
    so a parent scanning for K-pop sees the word; all three lead to the one Dance page. If you
    want a page per style, send us a paragraph or two for each.
42. **The choir photograph carries a photographer's credit** burned into the bottom edge
    ("2025 Melbourne Children's Spring Festival Gala, vispennphoto.com"). It is now the main
    picture on both the homepage's Music card and the Choir page. We have not cropped it out —
    that is the photographer's credit, not a watermark to remove. If you have the licence to
    publish it uncredited, send a clean file.
43. **A student's full name is printed on the speech photograph** you chose for English Speech
    and for the Language & Expression card — it is on the screen behind him, two metres high.
    That photograph is now on two pages. Confirm the family is happy for it to be published
    on the school's website; this is the same consent question as §5, but for a named minor.
44. **The Adult Program has no photograph.** Your document shows a mat-pilates frame we were
    not sent. The section reads as a list without it.
45. ~~**Are the Chinese Consulate-General in Melbourne and China Daily still partners?**~~
    **Answered 8 Sep 2026** — "No, this is government institution. Please remove them." Both
    are off the partners list. What they actually did is still recorded where it is a fact
    rather than a claim: the two music videos still say where they were broadcast and
    screened. The Belt & Road entry itself came off `/stage` on 20 Sep 2026 (§62), so China
    Daily is now named nowhere on the site.
46. **The homepage no longer has an About section.** Removing the "Teaching a child to be
    understood" block and moving the room photographs into Two campuses left a heading and a
    link, so the section came out entirely. `/about` is still in the top navigation and in the
    footer, but nothing on the homepage now leads to your story. Worth a sentence somewhere —
    tell us where you want it.
47. **A course page now ends with no way to enrol.** You asked for both the "Where it leads"
    band and the "Start a conversation" enquiry form to come off every course page, and they
    are off. A parent who has just read the Drama page and decided now has to find their own
    way out: the "Book a trial class" button in the top bar, or the footer. Nothing at the
    bottom of the page asks them.

    Two smaller effects worth knowing. The form used to arrive with the course already
    selected — a Drama enquiry said "Drama (Production)" without the parent choosing it — so
    enquiries from now on will more often not say which class they are about. And the exam
    pathway link ("Exams and achievements", "The Jungle Book", "Born to Fly") is gone from the
    course pages, though the same courses are still listed on `/stage#achievements`.

    Both are reversible in minutes. Say the word if you want a single line and a button at the
    foot of each course page instead of the whole form.

---

## 🟤 From the 9 Sep 2026 faculty cards

`Revision - Daisy and Rachel/Faculty/` — ten teacher cards as a PDF, and the same ten as
JPEGs filed under four discipline folders. All ten are built: `/faculty` now runs ten
teachers instead of six, grouped by the folders you filed them in, and the course pages
pick up their new teachers automatically. These are what that pass raised.

48. **Is Shanshan the name to print, or Angela?** Her card prints **SHANSHAN** and
    **姜雨姗**; the file you sent it in is `Angela.jpg`. We have used Shanshan, because that
    is what is on the card itself, and given her no family name in English. Tell us which
    she goes by and how she spells her surname in English — Jiang, or something else — and
    whether the page should read "Shanshan Jiang".
49. **Three courses still have no teacher: Debating, Instrument (AMEB) and MV (Production).**
    None of the ten cards names them. This is the same question as §36 and it is now the
    largest gap on the site: three of the thirteen course pages have no face on them at all.
50. **Becky Li came off Musical Theatre and Choir.** Her old entry, from the year-old faculty
    table, had her teaching Vocal, Musical Theatre and Choir. Her new card reads **VOCAL
    TEACHER** and nothing else, so she is on Vocal only. Musical Theatre is Anthony Pontonio,
    Zoe Sun and Toni Cao now; Choir is Joyce Wu. This is the one place the new cards take
    something away rather than adding it — confirm it is right.
51. **We read each card's subject line as its courses.** That is how every teacher got their
    "Teaches" line, and it is the only inference in this pass:
    Delyse Weisz → Drama, English Speech · Anthony Pontonio → Musical Theatre, Dubbing ·
    Zoe Sun → Musical Theatre, Drama · Diana Zhao → Bilingual Hosting, Dubbing ·
    Becky Li, Shanshan → Vocal · Joyce Wu → Vocal, Choir · Toni Cao → Vocal, Musical Theatre ·
    Joshua Dai → Music Composition · Rachel Cai → Dance, Posture Training.
    Read that list and tell us where it is wrong. Anthony on Dubbing and Zoe on Drama are the
    two we are least sure of.
52. **Callum Dibbert has no card in the new set, so he is off the site.** Lindy Zhang, who
    had a card on the old site and never had an entry, stays off too. Confirm both have
    actually left rather than simply missing from the folder — Callum was one of the two
    native-English teachers, and `content/AUDIENCE.md` §3 has that pair as the whole bridge
    to English-speaking families.
53. **Rachel Cai's Chinese name changed.** Her card says **蔡心翼**; we had **蔡馨熠** from
    the old faculty table. We have used the card's, on both her faculty entry and her
    Marketing Director entry. Which is right?
54. **《笔画春秋》 has two English titles on the site now.** Joshua Dai's new card calls it
    *Brushstrokes of Spring and Autumn*; the site has carried *Brushstrokes of History* since
    August, on Joshua's credentials, on Rachel Fu's, on Koven Song's and as the title of a
    production page at `/stage/brushstrokes-of-history`. We have left *Brushstrokes of
    History* everywhere rather than change a URL on a guess. Which do you want?
55. **Two romanisations on Toni Cao's card are ours.** Her Chinese reads 师从《天仙配》词曲
    作者陆洪菲及时白林老师; we have written that as "Studied under Lu Hongfei and Shi Bailin,
    the writers of *The Fairy Couple*《天仙配》". Confirm both spellings and that we have read
    the credit the right way round. Same question as §30 was for Diana's two clients.
56. **Two small things on Zoe Sun's card.** Her English says the Monash production is *The
    Seagull Flies Southeat* — we have printed *Southeast*, assuming a typo. And her Chinese
    says she is a 开心麻花 signed artist, which her English gives only as "multiple Mahua
    FunAge productions"; we used the English. Say if the signing should be stated outright.
57. **The portraits are cut out of the cards.** You sent the cards, not the photographs, so
    each portrait on `/faculty` is a crop from its card — the dark backdrop with the Mirror
    wordmark, which is why they sit together as a set. They are good crops at this size, but
    **if the photographer's original headshots exist, send them.** Two would improve
    immediately: Joshua Dai's backdrop still carries the old *Mirror Drama Studio* wordmark,
    and his card prints a gold vertical label across the photograph that forces his crop
    tighter than everyone else's.
58. **Nobody teaches the Adult Program.** Five adult programs, no teacher named on any of
    them, and no card mentions adults. If the adult classes are taught by the same ten, say
    which; if they are someone else, we need that person the same way.

---

## ⚫ From the 9 Sep 2026 stage pass

`/stage` lost two sections at Kayden's direction, on the same reasoning as §47.

59. **`/stage` no longer asks anyone to enrol either.** The "What a grade is actually for"
    prose and the "Ask about entering" enquiry form are both off the bottom of that page,
    because the "Book a trial class" button in the top bar is meant to be the one enrolment
    path on the site and a second form competed with it. The list of examination bodies we
    prepare students for moved up into the top of that section rather than leaving with the
    prose it happened to sit inside.

    The effect is the same as §47, and now it is the pattern rather than the exception: the
    enquiry form appears in exactly two places on the whole site, the homepage and `/contact`.
    Nothing at the foot of a course page or of `/stage` asks a parent who has just finished
    reading. Say if you want a single line and a button there instead.

---

## ⚫ From the 9 Sep 2026 homepage pass

60. **The homepage no longer summarises Achievements, Stage or Workshops.** All three
    sections came off `/` at Kayden's direction. The pages are untouched and all three are
    still reachable from the nav and the footer, but a parent who only scrolls the homepage
    now sees no competition results, no production video, and no sign the cultural workshops
    exist — the page runs hero, courses, campuses, partners, enquiry.

    That is a deliberate trade: a short homepage that asks for a trial class sooner, against
    a long one that proves more before it asks. It is worth putting to Rachel and Daisy
    directly, because the productions and the AMEB results are the two things they have most
    often led with. If either should come back, the sections still exist in the codebase and
    it is a one-line change. Say which, if so.

---

## ⚫ From the 9 Sep 2026 about pass

61. **`/about` no longer says where the school is.** The "Two campuses, both in the east"
    section came off that page at Kayden's direction. The addresses are not lost — `/contact`
    carries both with maps, phone, WhatsApp, email, WeChat and Xiaohongshu, and it is one
    click from every page — but a parent reading the story page now reaches the end of it
    without being told the school has two sites in Melbourne's east.

    Worth a word to Rachel and Daisy, because "two campuses" is a size signal as much as a
    location one. If they want it back, one line on `/about` naming both suburbs and linking
    to `/contact` would do the same work the section did.

## ⚫ From the 20 Sep 2026 competition video

62. **Belt & Road is off `/stage`, replaced by the 2026 Australia International Youth Drama,
    Speech & Debate Competition.** Daisy's 18 Sep message: "remove the Belt and Road Speech
    Competition video and replace it with the new speech competition video." The film in
    the Drive `Production page` folder is the 2026 grand final at Glen Eira Town Hall. Its
    card loop and poster are cut from the opening montage — the only ten seconds of the
    film without burned-in captions — so the card shows the venue, not a competitor.
    `/stage/belt-and-road-2025` redirects to the new entry.

    Two things the entry says that came from the film and the certificates rather than
    from you, worth a glance: that AYACA presents the competition with Victorian State
    Government support (the pull-up banner), and that Delyse Weisz addressed the awards
    ceremony (she is at the lectern under the "Award Ceremony" slide). The result line —
    first and second prize, junior group — is exactly what the two certificates say.

63. **Every production page now plays the full film with sound.** The six full-length
    renders are on Vercel Blob (`mirrorarts-productions`, Sydney). The Blob plan is the
    Hobby tier's: 1 GB stored, 10 GB served a month. The six films are about 400 MB; a
    full viewing streams 40–80 MB, so the monthly allowance is roughly 150 full plays.
    A school site will not touch that in most months, but a viral week would, and the
    films would stop playing (the ten-second loops, served from the site itself, would
    not). Say if you would rather host them on YouTube or Vimeo instead.

64. **The `Production page` folder also holds "MV 2026 Term 2 《Childhood》".** You did not
    ask for it and it is not on the site. If it is meant to join the productions, send a
    line about it — what it is, who made it, which course it came from — and it goes in as
    a seventh work.

65. **Enquiries land in `workshop@mirrorartsedu.com`, and it is now the site's printed
    address too.** Every "Book a trial class" submission is emailed there from
    `enquiries@mirrorartsedu.com.au`, Reply-To the parent. Kayden switched the footer,
    `/contact`, the venue page, the workshops page and the JSON-LD from `info@` to
    `workshop@` the same day so one inbox holds everything the site produces. If `info@` is
    still read and should appear anywhere, say where.
