import { test } from "node:test";
import assert from "node:assert/strict";

import { ENQUIRY_TO, formatEnquiry, type Enquiry } from "./enquiry-mail.ts";

const full: Enquiry = {
  student: "Mia Chen",
  parent: "Li Chen",
  wechat: "lichen_88",
  phone: "0412 345 678",
  email: "li@example.com",
  course: "English Speech (AMEB)",
};

test("the enquiry lands in the client's workshop inbox", () => {
  assert.equal(ENQUIRY_TO, "workshop@mirrorartsedu.com");
});

test("the subject names the student and the course, and nothing else", () => {
  const m = formatEnquiry(full, new Date("2026-09-20T03:15:00Z"));
  assert.equal(m.subject, "Trial class enquiry: Mia Chen — English Speech (AMEB)");
  const none = formatEnquiry({ ...full, course: "" }, new Date());
  assert.equal(none.subject, "Trial class enquiry: Mia Chen");
});

test("the body carries every field the parent filled in and marks the ones they left", () => {
  const m = formatEnquiry(full, new Date("2026-09-20T03:15:00Z"));
  for (const v of ["Mia Chen", "Li Chen", "lichen_88", "0412 345 678", "li@example.com", "English Speech (AMEB)"]) {
    assert.ok(m.text.includes(v), `missing ${v}`);
  }
  // Melbourne time, so the office reads it as their own clock.
  assert.match(m.text, /20 Sep(tember)? 2026/);
  assert.match(m.text, /1:15 ?pm/i);

  const sparse = formatEnquiry({ ...full, wechat: "", phone: "", email: "", course: "" }, new Date());
  assert.match(sparse.text, /WeChat:\s+—/);
  assert.match(sparse.text, /Phone:\s+—/);
  assert.match(sparse.text, /Email:\s+—/);
  assert.match(sparse.text, /Course:\s+not chosen/i);
});

test("reply-to is the parent's email when given, otherwise absent", () => {
  assert.equal(formatEnquiry(full, new Date()).replyTo, "li@example.com");
  assert.equal(formatEnquiry({ ...full, email: "" }, new Date()).replyTo, undefined);
});

test("nothing the parent typed can break out of the plain-text body", () => {
  const m = formatEnquiry({ ...full, student: "x\r\nBcc: evil@example.com" }, new Date());
  assert.ok(!/\r|\n\s*Bcc:/.test(m.subject));
  assert.ok(!m.text.includes("\r"));
});
