// Green square + rotated uppercase label — the section eyebrow, shared by every
// page section that has one (Phase 07b, D-A).
//
// This is the atom, not the composition. The rotated content below is identical
// at all nine sites; the box around it is not (`h-[99px] w-[17px]` in most
// section headers, `h-[112px] w-[27px]` at desktop, absolutely positioned in the
// Home services gutter, `items-start` in the Our Story hero), so the box is the
// caller's `className` and nothing here presumes it. That box must be a real
// reserved box: rotating without one pushes the visual footprint outside the
// element's allocated space and an ancestor's `overflow-hidden` clips it away
// entirely (found the hard way — see `ServiceCard`'s header comment).
//
// `ServiceCard`'s numbered tag renders the same shape but rotates the opposite
// direction and is an index badge, not a section name — it stays inline (D-D).
//
// `gutterInset` exists for one caller, deliberately (D061). `HomeServices`'s
// mobile eyebrow carries a 25px inset on the row INSIDE the rotation. Expressed
// from outside as the equivalent `translate-y-[12.5px]` it lands in the same
// place vertically, but the rotated element's pre-rotation width changes parity
// and the green square snaps half a device pixel across. This phase's success
// criterion is that nothing moves, so the inset stays where it renders identically.
export type EyebrowTone = "dark" | "light";

const toneClassName: Record<EyebrowTone, string> = {
  dark: "text-(--color-basic-accent)",
  light: "text-(--color-basic-background)",
};

export default function Eyebrow({
  label,
  tone = "dark",
  className = "",
  gutterInset = false,
}: {
  label: string;
  tone?: EyebrowTone;
  className?: string;
  gutterInset?: boolean;
}) {
  return (
    <div className={className}>
      <div className="rotate-90">
        <div className={`flex items-center gap-[10px] ${gutterInset ? "pl-[25px]" : ""}`}>
          <div className="size-[7px] shrink-0 bg-(--color-brand-primary-green)" />
          <p
            className={`font-body text-label-m text-center whitespace-nowrap uppercase ${toneClassName[tone]}`}
          >
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
