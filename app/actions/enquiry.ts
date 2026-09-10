"use server";

/* The enquiry form's server side.
 *
 * Validation and the shape of the payload are settled here; actually
 * delivering it is not — there is no mail provider wired up yet, and picking
 * one is a decision for the client (it determines where parent contact details
 * end up living). Until then this validates, logs, and tells the truth to the
 * person who submitted it rather than pretending to have sent something.
 *
 * To finish it: install an email integration, then replace the marked block.
 */

import { COURSES } from "@/lib/courses";

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

  // ---- delivery — NOT WIRED UP YET -------------------------------------
  // Replace with the chosen provider. Everything above is finished.
  console.info("[enquiry] validated, no delivery configured", {
    ...enquiry,
    email: enquiry.email ? "[redacted]" : "",
    phone: enquiry.phone ? "[redacted]" : "",
    wechat: enquiry.wechat ? "[redacted]" : "",
  });
  // ----------------------------------------------------------------------

  return {
    status: "ok",
    message:
      "Thanks — we have your details. Sending isn't connected yet on this preview, so for anything urgent call +61 498 183 332 or email info@mirrorartsedu.com.",
  };
}
