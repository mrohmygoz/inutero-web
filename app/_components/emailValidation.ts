// Pragmatic format check, not full RFC 5322 and not the browser's native `type="email"`
// constraint validation (its bubble can't be restyled to the brand's error color — D-116).
const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_FORMAT.test(value.trim());
}
