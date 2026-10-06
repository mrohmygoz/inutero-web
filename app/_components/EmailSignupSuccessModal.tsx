"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "../_lib/i18n";
import { getDictionary } from "../_lib/i18n";

// First modal in the codebase (D115) — no portal needed, no other overlapping overlay
// exists on any page, so a fixed-position overlay within the existing DOM tree suffices.
// Shared by NewsletterSignup and Footer: the confirmation copy/behavior is identical
// regardless of which field triggered it.
export default function EmailSignupSuccessModal({
  locale,
  open,
  onClose,
}: {
  locale: Locale;
  open: boolean;
  onClose: () => void;
}) {
  const t = getDictionary(locale).emailSignupSuccess;
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--opacity-neutral-darkest-60) px-5"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="email-signup-success-heading"
        aria-describedby="email-signup-success-body"
        className="relative w-full max-w-[420px] bg-(--color-basic-background) p-8 text-center"
        onClick={(event) => event.stopPropagation()}
      >
        <h2
          id="email-signup-success-heading"
          className="font-display text-display-h5 text-(--color-basic-accent) uppercase"
        >
          {t.heading}
        </h2>
        <p
          id="email-signup-success-body"
          className="font-body text-body-m mt-4 text-(--color-basic-text-secondary)"
        >
          {t.body}
        </p>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="font-body text-label-m mx-auto mt-6 inline-flex cursor-pointer items-center justify-center bg-(--color-basic-accent) px-5 py-[9px] text-(--color-basic-background) uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-brand-primary-green)"
        >
          {t.closeLabel}
        </button>
      </div>
    </div>
  );
}
