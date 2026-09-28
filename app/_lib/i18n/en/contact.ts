// Contact (Phase 15). Desktop 12612:8829, mobile 12212:5283.
//
// Copy is content-matrix.md -> Contact (both tables), not the Figma sample
// text — PR & Marketing's address is the matrix's corrected
// `bonnie@inuteromusic.com` (Figma's own frame shows the stale
// `ray@inuteromusic.com`).
//
// No form and no NewsletterSignup band: the fetched frame (all four
// breakpoint/locale combinations, verified via full metadata dump, not a
// sparse response) contains only the header, these four department rows,
// and "Follow us" — then the global Footer instance, which already carries
// its own newsletter block. `design-inventory.md`'s "the design shows the
// form" note was stale; corrected in the same phase (DECISIONS.md).
const contact = {
  header: {
    eyebrow: "Get in touch",
    heading: "Contact us",
    body: "We work with artists, partners, and press. Tell us who you are and what you're looking for.",
  },
  departments: [
    { label: "Business Inquiries", email: "may@inuteromusic.com" },
    { label: "Artist Management", email: "jung@inuteromusic.com" },
    { label: "PR & Marketing", email: "bonnie@inuteromusic.com" },
    { label: "General Inquiries", email: "contact@inuteromusic.com" },
  ],
  followUs: "Follow us",
};

export default contact;
