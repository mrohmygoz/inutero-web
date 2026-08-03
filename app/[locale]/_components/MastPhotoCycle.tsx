"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// The mobile hero's photo cycle. Source: the `Mast` variant set 10275:3101 —
// Default 10275:3093 plus Variant2..5 (10275:3102 / 3109 / 3115 / 3121), all
// 393x665 with an identical headline lockup, differing only in the photograph.
//
// This motion is DESIGNED, not derived. Every variant carries the same prototype
// reaction, read off the nodes via the Plugin API:
//
//   trigger    AFTER_TIMEOUT, timeout 0.8s
//   action     CHANGE_TO the next variant, wrapping Variant5 -> Default
//   transition DISSOLVE, easing LINEAR, duration 0.2s
//
// So 0.8s hold + 0.2s cross-dissolve = 1.0s per photo, a 5s loop. The TC instance
// 12368:2414 carries the identical reaction, so both locales share the timing.
//
// `get_motion_context` reports timeline keyframes and returns EMPTY for this node —
// prototype reactions are a separate channel. Anything asking "does this animate?"
// must read `node.reactions`, not just get_motion_context.
//
// Variants 2 and 4 reuse photographs already shipped for the desktop collage
// (hero-2 / hero-3), confirmed by md5 — hence the non-sequential file order below.
const PHOTOS = [
  "/images/home/hero-1.jpg", // Default
  "/images/home/hero-2.jpg", // Variant2
  "/images/home/hero-4.jpg", // Variant3
  "/images/home/hero-3.jpg", // Variant4
  "/images/home/hero-5.jpg", // Variant5
];

const HOLD_MS = 800;
const FADE_MS = 200;

export default function MastPhotoCycle() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setInterval> | undefined;

    // The one part of this feature the design does not cover: a 5Hz full-viewport
    // dissolve is exactly what this preference exists to suppress, so under it the
    // hero holds on the first photograph.
    const sync = () => {
      clearInterval(timer);
      if (media.matches) {
        setIndex(0);
        return;
      }
      timer = setInterval(
        () => setIndex((i) => (i + 1) % PHOTOS.length),
        HOLD_MS + FADE_MS,
      );
    };

    sync();
    media.addEventListener("change", sync);
    return () => {
      clearInterval(timer);
      media.removeEventListener("change", sync);
    };
  }, []);

  return (
    <>
      {PHOTOS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          // Only the first photo is on the critical path; the rest have at least
          // 0.8s of lead time, and four more `priority` images would compete with
          // the LCP this hero exists to win.
          priority={i === 0}
          sizes="(min-width: 1024px) 0px, 100vw"
          className="object-cover transition-opacity ease-linear"
          style={{
            transitionDuration: `${FADE_MS}ms`,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}
    </>
  );
}
