# Who this site is for

> Derived from the old site's own copy, not invented. Where a claim rests on evidence,
> the source is cited to `MIRROR-ARTS-EDUCATION.md`. Where it rests on an assumption,
> it says so and carries a ⚠️.
>
> Confirmed with Kayden 2026-08-06: enrolment today is **almost entirely Chinese-speaking
> families**. The `.com.au` rebuild is a growth play into local English-speaking families.
> Parents are the primary buyer.

---

## 1. The tension this site has to hold

The old site was written for one person and one person only. Every word of body copy is in
Chinese. The only two social channels are WeChat and 小红书 (§2). The campuses sit in Surrey
Hills and Glen Waverley. Nothing on it was built to be found by an English-speaking parent,
and nothing on it tries.

The new site has to keep that parent — they are the entire current business — while opening a
door to a second one who has never heard of Mirror and can't read a word of the existing site.

Those two parents buy for different reasons. That is the central design problem, and most of
the structural decisions downstream fall out of it.

**They are not equal in weight.** One is evidenced by a business that has run since 2017.
The other is a hypothesis. The site should be built so the hypothesis can be tested cheaply
without risking the base.

---

## 2. Primary avatar A — the Chinese-Australian parent

**This is the paying customer today. Every current enrolment is essentially this person.**

### Who

A first-generation Chinese migrant parent in Melbourne's eastern suburbs — Surrey Hills, Box
Hill, Glen Waverley, Doncaster, Balwyn. Their child is 6–14. They speak Mandarin at home and
functional-to-fluent English at work. They arrived as a skilled migrant or a former
international student who stayed. Household income supports private school fees or is aiming
to. They are on WeChat constantly and browse 小红书 for recommendations.

### What they are actually buying

Not drama lessons. The old site says the quiet part out loud, in a place no search engine
could ever read it — buried inside a course poster PNG (§4.2):

> 通过考级获得不同等级的考证书也会对孩子们**申请奖学金及热门私校的学位**提供很大的助推作用
> *Certificates from the exams give a real push toward scholarships and places at sought-after private schools.*

> 使孩子可以用优秀的演讲技巧在学校同龄孩子中**脱颖而出，更好的融入到西方社会中**
> *So the child can stand out among peers at school, and integrate better into Western society.*

That is the purchase. Two anxieties, one product:

1. **Competitive advantage.** Selective and private school entry. Scholarships. A credential
   that converts — AMEB grades, CEFA certificates, competition placings.
2. **Belonging without loss.** A child who can hold a room in English *and* still knows where
   they came from. The hero copy names this outright: 团结新一代澳洲华人，共同传承和发扬中华
   文化 — unite the next generation of Chinese Australians, carry the culture forward (§3).

The second one is why a Chinese cultural-arts school beats a generic drama school for this
parent. A local speech-and-drama studio solves anxiety 1. Only Mirror solves both at once.

### What convinces them

Ranked by how much weight this specific parent puts on it:

| Rank | Proof | Where it already exists |
|---|---|---|
| 1 | **Credentials that convert** — AMEB, CEFA, Trinity, LAMDA, VCE Drama | §4.2, §4.3, faculty table §5 |
| 2 | **"全澳唯一"** — the only CEFA children's language-performance examination centre in Australia | §4.3 — currently buried mid-paragraph in a poster image |
| 3 | **Teacher pedigree, stated formally** — Central Academy of Drama, Shanghai Theatre Academy, Xi'an Conservatory, Monash, Melbourne, Manchester | §5 |
| 4 | **Institutional endorsement** — Beijing Winter Olympics organising committee, Chinese Consulate-General, China Daily, Melbourne Chinese Museum | §7, §8 |
| 5 | **Named results** — competition wins, exam passes, named students | §8 — *currently unusable, see below* |
| 6 | **Real stages** — galas, annual productions, MV recordings their child could appear in | §8 |

Founder credibility matters more here than in most Australian education marketing. Rachel Fu
and Koven Song are Central Academy of Drama graduates with real screen and stage credits
(§5). To this parent that is a legible, high-status signal. To avatar B it means very little.
It should be prominent in `/zh` and present but not leading in English.

### What stops them

- **No prices anywhere** (OPEN-QUESTIONS #7). Tolerable in a WeChat-referral business,
  friction on a public site.
- **No timetable** (OPEN-QUESTIONS #8). Which course, which campus, which day. This parent is
  scheduling around three other activities and needs to know before enquiring.
- **Placeholder text on the results page** — literally *"XXX obtained Third, Second and First
  places"* (§8). Live right now. For a parent buying credibility, this is the single most
  damaging thing on the site.
- **Ambiguity about who teaches.** They want to know whether their child gets the
  native-English teacher or the Chinese-trained one. Both are selling points; hiding the
  answer helps nobody.

### Language

`/zh` must be a genuine equal, not a courtesy translation. This is the revenue base. If the
Chinese site feels like an afterthought, the business goes backwards.

---

## 3. Primary avatar B — the local Australian parent

⚠️ **Target, not evidence.** No current content addresses this person and no enrolment data
was available. Everything here is a hypothesis to be tested, and should be reviewed with
Rachel before it drives expensive decisions.

### Who

An English-speaking parent in the same catchment, child 6–14. Possibly Anglo-Australian,
possibly second-generation Chinese-Australian who doesn't read Chinese, possibly another
migrant background entirely. They found Mirror by searching *"drama classes Surrey Hills"* or
*"kids public speaking Glen Waverley"*, or through a school.

### What they are buying

Something quite different, and softer:

- **Confidence.** The shy kid who won't speak up. This is the dominant search intent in the
  category and it is a feeling, not a credential.
- **A creative outlet** that isn't another screen or another sport.
- **Speech and drama as a school-adjacent skill** — presentations, debating, English.
- AMEB matters to them too, but as reassurance that it's a serious school, not as the reason
  they came.

### What convinces them

Almost the inverse of avatar A's ranking:

| Rank | Proof | State |
|---|---|---|
| 1 | **Who teaches my kid, and are they safe and qualified** — Delyse Weisz (award-winning, 100+ children's productions, Eisteddfod convenor, founder of DramaWise) and Callum Dibbert (BA Hons Manchester) are *exactly* the right proof | §5 — exists, badly buried |
| 2 | **Where, when, how much, how do I start** | Does not exist |
| 3 | **Warmth** — photos of actual kids visibly enjoying it | Assets exist, unusable at web resolution |
| 4 | **Reviews and Google presence** | Google Business Profile mentioned, unverified |
| 5 | **Working With Children compliance** | Not stated anywhere ⚠️ |

Delyse Weisz and Callum Dibbert are the bridge to this audience. Their credentials are
entirely Australian and British, entirely legible, and currently locked inside PNG posters
written in Chinese. Freeing that copy is most of the work.

### What stops them

- **Landing on a Chinese-language site and bouncing in two seconds.** The current failure mode.
- **"Is this for us?"** A school whose every photo is a Lunar New Year gala may read as
  not-for-me. The productions are a genuine asset and should stay prominent — but the English
  site needs at least one clear entry point that leads with drama, speech and confidence, and
  meets the cultural programme second.
- **No pricing.** Higher friction here than for avatar A, who will WeChat and ask. This parent
  usually won't; they'll go to the studio that published a price.

### Language

English at the root. Their first impression cannot be a translation of Chinese marketing copy
— the register is different. Avatar A's copy is credential-forward and formal; this parent
responds to plain, warm, specific writing. **Same facts, separately written. Not translated.**

---

## 4. Secondary buyer — institutions ⚠️ unconfirmed

Three things on the old site imply a buyer who is not a parent at all:

1. **Fifteen workshops** (§6) — lacquer fans, tie-dye, lion dance, shadow puppets, incense,
   eco paper. These are priced and structured like school incursions: fixed duration, age
   bands, "materials provided", group delivery. A parent does not book a tie-dye workshop.
   A curriculum coordinator does.
2. **Venue hire** (场地租赁) — a live page containing zero text (§11).
3. **Event production** — Rachel and Koven direct galas, produce MVs, run competitions with
   China Daily, the Consulate and Melbourne Chinese Museum (§7, §8).

If those are real revenue lines they need their own page, their own CTA and their own
language — a school books a term ahead, by email, with a quote and a compliance pack. If they
are occasional and relationship-driven, they stay as credibility content and get no funnel.

**This is a question for Rachel, drafted in `OPEN-QUESTIONS.md`.** Until answered, the build
assumes parents-only and keeps the workshops as a single page that can grow into a funnel
later without restructuring.

---

## 5. What this means for the build

Decisions that follow directly from the above, carried into the IA and design spec.

1. **English at the root, Chinese at `/zh`, both first-class.** Confirmed. English leads
   because it's the growth market and the local search volume. `/zh` is not a translation
   layer — it is the site the current business runs on.

2. **The English and Chinese sites do not share copy.** Same facts, same structure,
   independently written. Translating avatar A's credential-forward register into English
   produces something that reads as stiff and slightly boastful to avatar B.

3. **Free every word from the PNGs.** Nine course descriptions, six faculty bios. This is the
   single highest-value task in the project and it serves both avatars — it is simultaneously
   the SEO fix, the accessibility fix, and the only way avatar B ever meets Delyse Weisz.

4. **Lead the English site with faculty and confidence. Lead the Chinese site with
   credentials and 全澳唯一.** Same pages, different emphasis and ordering.

5. **Surface the CEFA claim properly** — pending the client confirming it in writing
   (OPEN-QUESTIONS #6). "Australia's only" is the strongest single line the business owns and
   it is currently mid-paragraph inside an image.

6. **Publish a timetable and a price, or a clear reason there isn't one.** The biggest
   functional upgrade over the current site for both avatars, and the thing most likely to be
   blocked by the client.

7. **Fix the placeholder text before anything ships.** Non-negotiable.

8. **One CTA, repeated: book a trial class.** Both avatars convert on the same action. Where
   they differ is what they need to read first to get there.

---

## 6. Open assumptions

Flagged so they don't harden into fact:

| # | Assumption | How to test |
|---|---|---|
| 1 | Local English-speaking families are a reachable market for Mirror | Ask Rachel whether *any* currently enrol, and how they found the school |
| 2 | Confidence-building is avatar B's dominant motivation | Keyword research on the Surrey Hills / Glen Waverley catchment |
| 3 | The catchment is affluent enough for private-school-adjacent positioning | Verifiable from ABS data for the two suburbs |
| 4 | Workshops are an institutional product | Ask Rachel — see §4 |
| 5 | Founder pedigree carries less weight with avatar B | Reasonable inference, untested |
