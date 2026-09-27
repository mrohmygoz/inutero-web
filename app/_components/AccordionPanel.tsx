import type { ReactNode } from "react";

// The animating disclosure panel, shared by every accordion on the site.
// Promoted out of HomeServices in Phase 9 when the Services FAQ became the
// second consumer (D041 set that as the bar). Mechanics only — the two
// accordions share no visual design, so icons, borders, type and the
// openIndex state all stay with the consumer.
//
// `grid-template-rows: 0fr -> 1fr` reproduces Figma's SMART_ANIMATE: it
// animates to the content's natural height without hardcoding one, and the
// rows below slide as the panel grows. The panel stays mounted (there must be
// something to animate) and is `inert` while closed, which keeps its copy out
// of the a11y tree and out of tab order. The inner element must clip.
export default function AccordionPanel({
  id,
  labelledBy,
  open,
  children,
}: {
  id: string;
  labelledBy: string;
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      inert={!open}
      className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}
