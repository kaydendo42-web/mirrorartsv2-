/* Wraps the Han runs inside a mixed-language string in <span lang="zh-Hans">.
 *
 * NOTHING IMPORTS THIS as of 4 September 2026. The client asked for every
 * Chinese gloss off the English site, so the mixed-language strings this was
 * written for are now English-only and the three call sites are gone. It is
 * kept, unimported, for /zh — that site is the mirror image of this problem,
 * and the ranges below were worked out once and are worth not working out
 * again. Delete it if /zh is ever abandoned.
 *
 * Every piece of Chinese on this site carries the attribute, and it matters
 * for one concrete reason: without it a screen reader reads Han characters
 * with an English voice and produces nothing a listener can use. Most content
 * fields keep the two languages in separate properties — title and cn, role
 * and roleCn — and those get the attribute at the call site. This is for the
 * fields that cannot: a credit reading `Lead "Keke" 可可, TV film Romance of
 * the Desert《大漠之恋》` is one sentence in two languages, and splitting it
 * into two fields would be splitting a sentence.
 *
 * Written as a render-time split so the data stays a plain string — content
 * modules are read by tests and by Node, and markup inside them would make
 * both harder.
 *
 * The ranges cover Han including extension A (U+3400–U+9FFF), the
 * compatibility block (U+F900–U+FAFF), CJK punctuation (U+3000–U+303F) and
 * the fullwidth forms (U+FF01–U+FF60). The last two are here because 《》、
 * and ，are what separate and enclose the titles: leaving them outside the
 * span splits《大漠之恋》into three fragments and hands the brackets to the
 * English voice on their own. Escapes rather than literal characters, because
 * a range written as literal glyphs is unreadable and unverifiable in a diff. */

const HAN = /([\u3000-\u303F\u3400-\u9FFF\uF900-\uFAFF\uFF01-\uFF60]+)/;

export function withHanSpans(text: string) {
  return text.split(HAN).map((part, i) =>
    HAN.test(part) ? (
      <span key={i} lang="zh-Hans">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
