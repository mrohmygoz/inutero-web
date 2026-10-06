"use client";

import { useState } from "react";
import Cta from "./Cta";
import EmailSignupSuccessModal from "./EmailSignupSuccessModal";
import { isValidEmail } from "./emailValidation";
import { getDictionary, type Locale } from "../_lib/i18n";

// Source: desktop NewsletterSignup 12612:8163; mobile symbol 12212:6048 ("Section",
// 393x425, News), instanced on News Details (12212:6049) and TC News Details (12389:6080).
//
// This is NOT the newsletter block inside Footer.tsx. The survey (design.md → Survey
// Findings) established they are genuinely different designs: the Footer block has a small
// green Label/M heading plus a disclaimer line and sits as one of three columns on a light
// surface; this is a standalone full-width dark section with a Display/H3 heading and no
// disclaimer. Footer.tsx keeps its own.
//
// Phase 16d (D116): no newsletter endpoint exists or is planned, so there is no `action`
// to submit to — the field instead gets real client-side validation and a success
// confirmation modal (D114/D115), which is why this is now a client component.

export default function NewsletterSignup({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).newsletter;
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleSubmit() {
    if (!isValidEmail(email)) {
      setInvalid(true);
      return;
    }
    setInvalid(false);
    setSuccess(true);
  }

  function handleDismiss() {
    setSuccess(false);
    setEmail("");
  }

  return (
    <section className="w-full border-y border-(--opacity-white-10) bg-(--color-basic-accent) lg:border-y-0">
      <div className="mx-auto w-full max-w-[576px] px-5 py-[26px] lg:max-w-none lg:px-8 lg:py-16">
        <div className="lg:flex lg:flex-col lg:items-end lg:gap-16">
          <div className="w-full">
            <h2 className="font-display text-display-h3 font-bold text-(--color-basic-foreground) uppercase">
              {t.heading}
            </h2>
            <p className="font-body text-body-m mt-4 text-(--opacity-white-50) lg:mt-6">
              {t.description}
            </p>
          </div>

          <div className="mt-[30px] flex w-full flex-col gap-[29px] lg:mt-0 lg:max-w-[750px] lg:flex-row lg:items-start lg:gap-7">
            <label
              className={`flex w-full flex-1 items-center border-b py-3 ${
                invalid
                  ? "border-(--color-brand-accent-orange)"
                  : "border-(--color-basic-foreground)"
              }`}
            >
              <span className="sr-only">{t.placeholder}</span>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setInvalid(false);
                }}
                placeholder={t.placeholder}
                className={`font-body text-body-s w-full bg-transparent text-center outline-none lg:text-left ${
                  invalid ? "text-(--color-brand-accent-orange) placeholder:text-(--color-brand-accent-orange)" : "text-(--opacity-white-50)"
                }`}
              />
            </label>
            <Cta tone="green" onClick={handleSubmit}>
              {t.button}
            </Cta>
          </div>
        </div>
      </div>

      <EmailSignupSuccessModal locale={locale} open={success} onClose={handleDismiss} />
    </section>
  );
}
