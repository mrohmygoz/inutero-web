## 1. Baseline before touching anything

- [x] 1.1 Confirm `npm run lint` and `npx tsc --noEmit` pass on the untouched tree.
- [x] 1.2 Capture the menu open at **393×852** in both locales. This is the pixel-identity reference — at full height this phase must change nothing.
- [x] 1.3 Re-measure the baseline in the running app and confirm `design.md` → Measured baseline still holds (EN 838 / ZH 773). If the numbers have moved, correct that table before sizing anything against it.
- [x] 1.4 Measure the longest link label at **375px** in both locales — EN `Contact Us`, ZH `子皿超音波` / `關於子皿` — and confirm whether any wraps at today's font size. A wrap doubles a link box and invalidates the budget (Risks).

## 2. Pick the media-query threshold

- [x] 2.1 Build the device list this has to satisfy: at minimum iPhone SE 2/3 (375×667), iPhone 8 (375×667), iPhone 13 mini (375×812), iPhone 14/15 (393×852), and a common Android (~360×800). Record device height, not usable height — the query sees the layout viewport (D-A).
- [x] 2.2 Choose the `max-height` threshold that drops the logo block on the small phones and leaves 393×852 untouched. Write the chosen number and the list behind it into `design.md` → D-C. Do not guess it during implementation.

## 3. Container and scroll behaviour

- [x] 3.1 Move the overlay from `fixed inset-0` to a `dvh`-based height so it tracks the visible viewport (D-A), matching what `d6d2ab3` did for the heroes.
- [x] 3.2 Keep `overflow-y-auto` on the container as the below-floor safety net (D-D). It must remain — it is the accepted degradation, not dead code.
- [x] 3.3 Add a body scroll lock while `menuOpen`, released on close. Restore the previous scroll position rather than resetting to top.
- [x] 3.4 Verify the lock releases on every exit path — the close button, the Escape handler, and following a nav link.

## 4. The two knobs

- [x] 4.1 Group `LogoMark`, its `mt-[10.19px]`, and the nav's `mt-[56px]` into one collapsible unit so all 181px leave together (D-C). The nav's top spacing must come from that unit, not from a separate margin that survives the collapse.
- [x] 4.2 Hide the logo block below the threshold from task 2.2. Binary — full size or absent, never an intermediate size (D-C).
- [x] 4.3 Clamp the link box: vertical padding and font size, maximum = today's values so 393×852 is unchanged, minimum landing at the 553px floor (~52.8px per link box, D-D).
- [x] 4.4 Give EN's Home link its own bound. It is 81px italic against the other six at 78px, and that emphasis is deliberate — a shared clamp flattens it into the list (Measured baseline).
- [x] 4.5 Leave the close row, social row and locale bar **completely untouched** at every height (D-B). If the budget seems to need them, the budget is wrong — re-check task 1.3 rather than shrinking a 29px target to 19px.
- [x] 4.6 Comment the clamp bounds with what they are and where they came from. They are measurements, not Figma tokens — no variable exists behind them (D-D).

## 5. Documentation

- [x] 5.1 Append to `openspec/DECISIONS.md`: dropping the logo at short heights is **Derived** (D005) with no design behind it; the 553px floor and why it is the clamp minimum rather than a separate number; the two-knob scope and why the small tap targets are exempt (D-B); why a uniform scale was rejected (D-E); and the media-query-vs-`dvh` split from D-A, which is the non-obvious one a later phase will otherwise get wrong.
- [x] 5.2 Update `openspec/reference/roadmap.md` — add the 7c row, tick it, and note anything deferred.
- [x] 5.3 `app/_components/INVENTORY.md` only needs touching if a shared component is added or changed. `Nav` already has an entry; update it if its responsive behaviour is described there.

## 6. Verify

- [x] 6.1 **393×852, both locales** — screenshot-diff against task 1.2. Pixel-identical, logo present. Any difference at full height is a bug in this phase.
- [x] 6.2 **375×553 and 393×553, both locales** — everything visible, no scroll, logo absent, no link wrapped.
- [x] 6.3 **393×740, both locales** — the in-between case. Nothing clipped, nothing overlapping.
- [x] 6.4 **375×480, both locales** — below the floor. Confirm it scrolls cleanly rather than clipping, and that the locale bar is reachable.
- [x] 6.5 Confirm the logo does not pop in or out while scrolling the page behind the menu at any size — that is the failure a `dvh`-driven collapse would have caused (D-C).
- [ ] 6.6 **Verify on a real device.** — **NOT DONE.** Cannot be done from this session; handed to the user and recorded in `roadmap.md` → deferred work.
  Original task: `h-dvh` and browser-chrome behaviour cannot be reproduced in headless Chrome; the arithmetic can be checked there, the chrome behaviour cannot.
- [x] 6.7 Check `next-devtools-mcp` for framework errors or warnings.
- [x] 6.8 Run `npm run lint` and `npx tsc --noEmit`.
- [x] 6.9 Run `npx openspec validate phase-07c-mobile-menu-viewport-fit`.
- [x] 6.10 Report plainly: the chosen media-query threshold and the device list behind it, the measured per-link size at the floor, whether any label wrapped at 375px, and whether real-device verification actually happened or was skipped.
