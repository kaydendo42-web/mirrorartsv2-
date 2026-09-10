"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { submitEnquiry, type EnquiryState } from "@/app/actions/enquiry";
import { COURSES } from "@/lib/courses";

/* The one conversion path on the site. There is no booking system and no
 * online payment, so this form is it, and it appears on the homepage, on
 * /contact and under every course page.
 *
 * It is extracted rather than copied because the course <select> reads an
 * allow-list that the server action validates against. A second copy of the
 * form is a second place for that list to drift out of step with the one the
 * action checks, which turns a typo into a rejected enquiry.
 *
 * The form validates and then tells the truth: sending is not wired up,
 * because choosing a mail provider decides where parent contact details end
 * up living and that is the client's call. Saying so is deliberate. Faking a
 * success message would lose real enquiries silently, which is the one
 * failure mode a business cannot detect.
 */

const INITIAL: EnquiryState = { status: "idle" };

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="pill pill--lg form__submit" type="submit" disabled={pending}>
      {pending ? "Sending…" : "Book a trial class"}
    </button>
  );
}

/* Field ids are namespaced enq-*. They used to be the bare field name, which
   put id="wechat", id="email" and id="course" into whatever page embedded the
   form — and /contact carries a WeChat entry of its own that the footer links
   to as #wechat. Two elements answered to that id, so the anchor landed on
   the form input instead. A form dropped into an arbitrary page cannot claim
   generic ids. */
export default function EnquiryForm({
  defaultCourse,
  compact,
}: {
  /* A course title from lib/courses.ts, so /courses/<slug> can preselect the
     course the reader has just finished reading about. Anything not in the
     list falls through to "Choose a course" rather than silently selecting
     the wrong one — the server action validates against the same list. */
  defaultCourse?: string;
  compact?: boolean;
}) {
  const [state, action] = useActionState(submitEnquiry, INITIAL);

  const preset =
    defaultCourse && (COURSES as readonly string[]).includes(defaultCourse)
      ? defaultCourse
      : "";

  return (
    <form
      className={`form${compact ? " form--compact" : ""}`}
      action={action}
      noValidate
    >
      <p className="form__lead">
        Enquire about a class
      </p>

      <div className="form__row">
        <Field
          name="student"
          label="Student's name"
          required
          error={state.errors?.student}
        />
        <Field
          name="parent"
          label="Parent's name"
          required
          error={state.errors?.parent}
        />
      </div>

      <div className="form__row">
        <Field name="wechat" label="WeChat ID" />
        <Field
          name="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
        />
      </div>

      <div className="form__row">
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          error={state.errors?.email}
        />
        <p className="field">
          <label className="field__label" htmlFor="enq-course">
            Course
          </label>
          <select
            className="field__input"
            id="enq-course"
            name="course"
            defaultValue={preset}
            aria-describedby={
              state.errors?.course ? "enq-course-error" : undefined
            }
            aria-invalid={state.errors?.course ? true : undefined}
          >
            <option value="">Choose a course</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {state.errors?.course && (
            <span className="field__error" id="enq-course-error">
              {state.errors.course}
            </span>
          )}
        </p>
      </div>

      <p className="form__fine">
        A phone number, an email or a WeChat ID — whichever suits you.
      </p>

      <Submit />

      {state.status !== "idle" && state.message && (
        <p className={`form__status form__status--${state.status}`} role="status">
          {state.message}
        </p>
      )}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <p className="field">
      <label className="field__label" htmlFor={`enq-${name}`}>
        {label}
      </label>
      <input
        className="field__input"
        id={`enq-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={error ? `enq-${name}-error` : undefined}
        aria-invalid={error ? true : undefined}
      />
      {error && (
        <span className="field__error" id={`enq-${name}-error`}>
          {error}
        </span>
      )}
    </p>
  );
}
