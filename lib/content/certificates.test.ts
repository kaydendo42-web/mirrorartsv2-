import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";

import { ACHIEVEMENTS } from "./achievements.ts";
import {
  AMEB_DOCUMENTS,
  CEFA_CERTIFICATES,
  CEREMONY_PHOTOS,
  COMPETITIONS,
  allCertificateAssets,
} from "./certificates.ts";

/* The client's "Achievements final" folder, 18 September 2026: every scan
   and photograph she sent is wired up, once, with alt text that describes
   the document and not the child holding it. */

test("every certificate and ceremony photograph exists on disk with real alt text", () => {
  const seen = new Set<string>();
  for (const a of allCertificateAssets()) {
    assert.ok(existsSync(`public${a.src}`), `missing ${a.src}`);
    assert.ok(a.alt.length > 20, `${a.src} needs real alt text`);
    assert.ok(a.width > 0 && a.height > 0, `${a.src} needs dimensions`);
    assert.ok(!seen.has(a.src), `${a.src} is wired up twice`);
    seen.add(a.src);
  }
});

test("the counts match what the client sent, after the one duplicate scan", () => {
  // AMEB: seven reports (one of the eight scans was a duplicate) and one
  // framed certificate, plus the report that arrived as a PDF.
  assert.equal(AMEB_DOCUMENTS.length, 8);
  assert.equal(CEFA_CERTIFICATES.length, 8);
  assert.equal(COMPETITIONS.reduce((n, c) => n + c.certificates.length, 0), 14);
  assert.equal(CEREMONY_PHOTOS.length, 23);
});

test("every processed image under public/assets/achievements is referenced", () => {
  const wired = new Set(allCertificateAssets().map((a) => a.src));
  for (const group of readdirSync("public/assets/achievements")) {
    for (const file of readdirSync(`public/assets/achievements/${group}`)) {
      if (file.startsWith(".")) continue;
      const src = `/assets/achievements/${group}/${file}`;
      assert.ok(wired.has(src), `${src} is on disk but nothing renders it`);
    }
  }
});

test("every processed image carries provenance in the manifest", () => {
  const manifest = JSON.parse(
    readFileSync("docs/achievement-image-sources.json", "utf8"),
  ) as Record<string, { source: string; sha256: string }>;
  for (const a of allCertificateAssets()) {
    const key = a.src.replace("/assets/achievements/", "");
    assert.ok(manifest[key], `${key} has no manifest entry`);
    assert.match(manifest[key].sha256, /^[a-f0-9]{64}$/);
  }
});

test("competitions carry a title, years and at least one certificate each", () => {
  const slugs = new Set<string>();
  for (const c of COMPETITIONS) {
    assert.ok(c.title.length > 3);
    assert.match(c.years, /^\d{4}(\s?[–-]\s?\d{4})?$/, `${c.slug} years: ${c.years}`);
    assert.ok(c.certificates.length >= 1, `${c.slug} has no certificates`);
    assert.ok(!slugs.has(c.slug), `duplicate competition slug ${c.slug}`);
    slugs.add(c.slug);
  }
});

test("alt text names no student", () => {
  /* The two named minors from the AMEB results table, plus the consent gate's
     spirit: certificates carry children's names in their pixels because the
     client supplied them for publication, but nothing we write repeats one. */
  const gated = ACHIEVEMENTS.flatMap((a) => a.results ?? []).map((r) => r.student);
  const blob = allCertificateAssets().map((a) => a.alt).join("\n");
  for (const student of gated) {
    assert.ok(!blob.includes(student), `${student} is named in certificate alt text`);
  }
  for (const [first, last] of gated.map((s) => s.split(" "))) {
    assert.ok(!blob.includes(first) || !blob.includes(last), `${first} ${last} leaks into alt text`);
  }
});
