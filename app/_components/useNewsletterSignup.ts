import { useState } from "react";
import { isValidEmail } from "./emailValidation";

export function useNewsletterSignup() {
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleEmailChange(value: string) {
    setEmail(value);
    setInvalid(false);
  }

  async function handleSubmit() {
    if (!isValidEmail(email)) {
      setInvalid(true);
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        setInvalid(true);
        return;
      }

      setInvalid(false);
      setSuccess(true);
    } catch {
      setInvalid(true);
    } finally {
      setSubmitting(false);
    }
  }

  function handleDismiss() {
    setSuccess(false);
    setEmail("");
  }

  return {
    email,
    invalid,
    success,
    submitting,
    setEmail: handleEmailChange,
    handleSubmit,
    handleDismiss,
  };
}
