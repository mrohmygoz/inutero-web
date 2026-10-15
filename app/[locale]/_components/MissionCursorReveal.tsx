"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

// Desktop-only cursor-follow photo reveal for the Home Mission/Intro section.
// No canonical Figma reaction exists for this — ported from the Figma Make
// reference (fileKey myqsxGwnrcNHEdsE2SFZXk, src/app/App.tsx's `missionRef`/
// `updateMissionImg`), same gap category and pattern as `HeroCursorTrail.tsx`
// (D122). See design.md / DECISIONS.md for the full rationale.
//
// `sectionRef` is the Mission section's own bounding box (not the viewport),
// so the photo never renders outside the white section into the dark Hero or
// Services sections above/below it.
const IMG_W = 243;
const IMG_H = 193;

export default function MissionCursorReveal({
  sectionRef,
}: {
  sectionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [photo, setPhoto] = useState({ x: 0, y: 0, visible: false });
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);

  const updatePhoto = useCallback((clientX: number, clientY: number) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const inside =
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom;
    if (!inside) {
      setPhoto((prev) => (prev.visible ? { ...prev, visible: false } : prev));
      return;
    }

    const x = Math.min(Math.max(clientX - rect.left - IMG_W / 2, 0), rect.width - IMG_W);
    const y = Math.min(Math.max(clientY - rect.top - IMG_H / 2, 0), rect.height - IMG_H);
    setPhoto({ x, y, visible: true });
  }, [sectionRef]);

  useEffect(() => {
    const handlePointer = (clientX: number, clientY: number) => {
      lastPointerRef.current = { x: clientX, y: clientY };
      updatePhoto(clientX, clientY);
    };

    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const onScroll = () => {
      const pointer = lastPointerRef.current;
      if (pointer) updatePhoto(pointer.x, pointer.y);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [updatePhoto]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute overflow-hidden mix-blend-difference transition-[left,top,opacity] duration-150 ease-out motion-reduce:transition-none"
      style={{
        left: photo.x,
        top: photo.y,
        width: IMG_W,
        height: IMG_H,
        opacity: photo.visible ? 1 : 0,
      }}
    >
      <Image src="/images/home/intro.jpg" alt="" fill sizes={`${IMG_W}px`} className="object-cover" />
      <div className="absolute inset-0 bg-white mix-blend-difference" />
    </div>
  );
}
