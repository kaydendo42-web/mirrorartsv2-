// Usage: node scripts/seo-crawl.mjs https://www.mirrorartsedu.com.au
// Reads the sitemap, fetches every page, prints a Markdown audit table and
// a list of issues. Built-ins only, so it runs anywhere Node does. Exit 1
// when anything is wrong, so it can gate a release.
const base = process.argv[2]?.replace(/\/$/, "");
if (!base) {
  console.error("usage: node scripts/seo-crawl.mjs <baseUrl>");
  process.exit(2);
}

const attr = (html, re) => [...html.matchAll(re)].map((m) => m[1]);
const one = (html, re) => html.match(re)?.[1] ?? "";
const unescape = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const locs = attr(sitemap, /<loc>([^<]+)<\/loc>/g);
// The sitemap names the canonical host. When crawling a local build, fetch
// each path from the local server instead of from the host the loc names —
// otherwise a local crawl silently grades the live site.
const urls = locs.map((l) => base + (l.replace(/^https?:\/\/[^/]+/, "") || "/"));
if (urls.length === 0) {
  console.error("no <loc> in sitemap");
  process.exit(1);
}

const rows = [];
const issues = []; // fails the run
const notes = []; // worth a look, does not fail the run
const seenLinks = new Set();

/* Google draws roughly 60 characters of a title and 155–160 of a description
   on desktop, less on a phone, and rewrites both when it likes. Past those
   lengths the tail is cut with an ellipsis, which is a note; past 80 / 230
   the page is describing itself for a machine that will never show it,
   which is an issue. */
const TITLE_NOTE = 60, TITLE_FAIL = 80, DESC_NOTE = 165, DESC_FAIL = 230;

for (const url of urls) {
  // Follow redirects so a page can still be graded, but a sitemap URL that
  // redirects at all is an issue — the sitemap should name the final URL.
  const res = await fetch(url);
  const html = res.status === 200 ? await res.text() : "";
  const path = url.replace(base, "") || "/";
  // The canonical must name the sitemap's host, whatever host served it.
  const expectedCanonical = locs[urls.indexOf(url)].replace(/\/$/, "");
  const title = unescape(one(html, /<title>([^<]*)<\/title>/));
  const desc = unescape(one(html, /<meta name="description" content="([^"]*)"/));
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const canonical = one(html, /<link rel="canonical" href="([^"]+)"/);
  const ogImage = one(html, /<meta property="og:image" content="([^"]+)"/);
  const ld = attr(html, /<script type="application\/ld\+json">([^<]+)<\/script>/g);
  const types = [];
  for (const block of ld) {
    try {
      const parsed = JSON.parse(block);
      // /faculty emits an array of Person records in one block.
      for (const node of Array.isArray(parsed) ? parsed : [parsed]) types.push(node["@type"]);
    } catch {
      issues.push(`${path}: invalid JSON-LD`);
    }
  }
  const imgsNoAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/g) ?? []).length;
  for (const l of attr(html, /href="(\/[^"#?]*)/g)) if (!l.startsWith("/_next")) seenLinks.add(l);

  if (res.status !== 200) issues.push(`${path}: HTTP ${res.status}`);
  if (res.redirected) issues.push(`${path}: sitemap URL redirects to ${res.url}`);
  if (title.length > TITLE_FAIL) issues.push(`${path}: title ${title.length} chars`);
  else if (title.length > TITLE_NOTE) notes.push(`${path}: title ${title.length} chars`);
  if (!desc) issues.push(`${path}: no description`);
  else if (desc.length > DESC_FAIL) issues.push(`${path}: description ${desc.length} chars`);
  else if (desc.length > DESC_NOTE) notes.push(`${path}: description ${desc.length} chars`);
  if (h1s !== 1) issues.push(`${path}: ${h1s} h1`);
  if (canonical.replace(/\/$/, "") !== expectedCanonical) issues.push(`${path}: canonical "${canonical}"`);
  if (!ogImage) issues.push(`${path}: no og:image`);
  if (imgsNoAlt) issues.push(`${path}: ${imgsNoAlt} <img> without alt`);

  rows.push(
    `| ${path} | ${res.status} | ${title.length} | ${desc.length} | ${h1s} | ${canonical ? "✓" : "✗"} | ${ogImage ? "✓" : "✗"} | ${types.flat().join(", ")} |`,
  );
}

// On a live crawl, the sitemap's own URLs must not redirect — a loc that
// 3xxs is a sitemap naming the wrong host. Skipped locally, where the locs
// name the production host by design.
if (!/localhost|127\.0\.0\.1/.test(base)) {
  for (const loc of locs) {
    const r = await fetch(loc, { method: "HEAD", redirect: "manual" });
    if (r.status >= 300 && r.status < 400) issues.push(`sitemap loc ${loc}: redirects (${r.status}) to ${r.headers.get("location")}`);
  }
}

// Internal links: HEAD every distinct path once.
for (const l of seenLinks) {
  const r = await fetch(`${base}${l}`, { method: "HEAD", redirect: "manual" });
  // A hash-only or in-page anchor was filtered above; anything left is a route.
  if (r.status >= 400) issues.push(`link ${l}: HTTP ${r.status}`);
  if (r.status >= 300 && r.status < 400) issues.push(`link ${l}: redirects (${r.status})`);
}

const d = new Date();
const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
console.log(`Crawl of ${base} — ${urls.length} URLs, ${today}\n`);
console.log("| Path | HTTP | Title len | Desc len | H1 | Canon | OG img | JSON-LD |");
console.log("|---|---|---|---|---|---|---|---|");
console.log(rows.join("\n"));
console.log(`\n${issues.length} issue(s)`);
for (const i of issues) console.log(`- ${i}`);
console.log(`\n${notes.length} note(s)`);
for (const n of notes) console.log(`- ${n}`);
process.exit(issues.length ? 1 : 0);
