/* What an enquiry looks like as an email, kept apart from the sending so it
 * can be tested without a mail provider in the loop.
 *
 * Plain text, not HTML. The reader is the school office replying from a
 * phone, and a six-line note they can copy a number out of beats a template.
 * Every field the parent typed is stripped of line breaks before it goes
 * near a header or a labelled line, so nothing typed into "Student's name"
 * can pose as a second header or a second field. */

export type Enquiry = {
  student: string;
  parent: string;
  wechat: string;
  phone: string;
  email: string;
  course: string;
};

/* Where enquiries go. Set on 20 September 2026 at Kayden's instruction from
   the client — the workshop mailbox, not info@, which is what the site
   prints as the public contact address. Change here and the test beside it
   together. */
export const ENQUIRY_TO = "workshop@mirrorartsedu.com";

/* The From address has to be on a domain Resend has verified, or nothing
   sends. mirrorartsedu.com.au is the website's own domain and the one whose
   DNS the studio can reach; the mailbox itself is on .com and stays where
   it is. The display name says what the message is, because the office
   inbox will show that before it shows the subject. */
export const ENQUIRY_FROM = "Mirror Arts website <enquiries@mirrorartsedu.com.au>";

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export function formatEnquiry(e: Enquiry, now: Date) {
  const student = oneLine(e.student);
  const parent = oneLine(e.parent);
  const wechat = oneLine(e.wechat);
  const phone = oneLine(e.phone);
  const email = oneLine(e.email);
  const course = oneLine(e.course);

  const subject = course
    ? `Trial class enquiry: ${student} — ${course}`
    : `Trial class enquiry: ${student}`;

  const when = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    dateStyle: "long",
    timeStyle: "short",
  }).format(now);

  const text = [
    `New trial class enquiry from the website.`,
    ``,
    `Student:  ${student}`,
    `Parent:   ${parent}`,
    `Course:   ${course || "not chosen"}`,
    ``,
    `Phone:    ${phone || "—"}`,
    `Email:    ${email || "—"}`,
    `WeChat:   ${wechat || "—"}`,
    ``,
    `Sent ${when}, Melbourne time.`,
    email
      ? `Reply to this email to answer the parent directly.`
      : `No email was given — reach the parent by phone or WeChat.`,
  ].join("\n");

  return { subject, text, replyTo: email || undefined };
}
