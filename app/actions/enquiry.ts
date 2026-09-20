"use server";

/* The enquiry form's server side.
 *
 * Validates, then emails the enquiry to the school through Resend — the
 * Vercel Marketplace integration provisioned on 20 September 2026, which
 * supplies RESEND_API_KEY. Where it lands and how it reads are settled in
 * lib/enquiry-mail.ts, which is tested; this file only runs the send.
 *
 * Three things the send does on purpose:
 *
 * The parent's own email is the Reply-To, so the office answers by hitting
 * reply. Without one, the note says to phone or WeChat instead.
 *
 * A failure is reported as a failure. If Resend is down, the key is missing
 * or the sending domain is not verified yet, the parent is told the message
 * did not go and given the phone number — never a "thanks" over a lost
 * enquiry. The cause is logged for us; the parent does not see it.
 *
 * A honeypot. The form carries a field no person can see; anything that
 * fills it is a script, and a script gets a cheerful "thanks" and no email.
 */

import { Resend } from "resend";

import { COURSES } from "@/lib/courses";
import { ENQUIRY_FROM, ENQUIRY_TO, formatEnquiry } from "@/lib/enquiry-mail";

export type EnquiryState = {
  status: "idle" | "ok" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  // The honeypot. Named to look worth filling in; hidden from people by
  // the form. See EnquiryForm for the other half.
  if (get("website")) {
    return { status: "ok", message: "Thanks — we have your details." };
  }

  const enquiry = {
    student: get("student"),
    parent: get("parent"),
    wechat: get("wechat"),
    phone: get("phone"),
    email: get("email"),
    course: get("course"),
  };

  const errors: Record<string, string> = {};

  if (!enquiry.student) errors.student = "Tell us who the class is for.";
  if (!enquiry.parent) errors.parent = "We need a name to reply to.";

  // One of the two is enough — plenty of these parents live on WeChat and
  // never check email, and demanding both loses enquiries.
  if (!enquiry.email && !enquiry.phone && !enquiry.wechat) {
    errors.email = "Leave a phone number, an email or a WeChat ID.";
  }
  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    errors.email = "That email address doesn't look right.";
  }
  if (enquiry.course && !(COURSES as readonly string[]).includes(enquiry.course)) {
    errors.course = "Pick a course from the list.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Have another look at the form.", errors };
  }

  const failed = {
    status: "error" as const,
    message:
      "Sorry — the message didn't send. Please call +61 498 183 332 or email info@mirrorartsedu.com and we'll book you in.",
  };

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[enquiry] RESEND_API_KEY is not set; enquiry not sent");
    return failed;
  }

  const mail = formatEnquiry(enquiry, new Date());
  const { error } = await new Resend(key).emails.send({
    from: ENQUIRY_FROM,
    to: [ENQUIRY_TO],
    replyTo: mail.replyTo,
    subject: mail.subject,
    text: mail.text,
  });

  if (error) {
    // The provider's reason, for the log; the names and numbers stay out of it.
    console.error("[enquiry] send failed", { name: error.name, message: error.message });
    return failed;
  }

  return {
    status: "ok",
    message: enquiry.email
      ? "Thanks — we have your details and will reply by email, usually within a day."
      : "Thanks — we have your details and will be in touch, usually within a day.",
  };
}
