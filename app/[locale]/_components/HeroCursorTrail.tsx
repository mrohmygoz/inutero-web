"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

// Desktop-only cursor image trail for the Home Hero collage. No canonical
// Figma reaction exists for this — ported from a Figma Make reference
// (fileKey myqsxGwnrcNHEdsE2SFZXk, src/app/HomeHero.tsx). See design.md (D122)
// for the full rationale and the codepen pattern this supersedes.
const PHOTOS = [
  "/images/home/hero-1.jpg",
  "/images/home/hero-2.jpg",
  "/images/home/hero-3.jpg",
  "/images/home/hero-4.jpg",
  "/images/home/hero-5.jpg",
];

const SPAWN_THRESHOLD_PX = 85;
const FADE_IN_MS = 220;
const FADE_OUT_MS = 650;
const GHOST_WIDTH = 240;
const GHOST_HEIGHT = 360;

type Ghost = {
  id: number;
  x: number;
  y: number;
  src: string;
  rotation: number;
  show: boolean;
};

export default function HeroCursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ghostsRef = useRef<Ghost[]>([]);
  const [ghosts, setGhosts] = useState<Ghost[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number } | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const photoIndexRef = useRef(0);
  const nextIdRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const render = useCallback(() => setGhosts([...ghostsRef.current]), []);

  const hideGhost = useCallback(
    (id: number) => {
      ghostsRef.current = ghostsRef.current.map((g) =>
        g.id === id ? { ...g, show: false } : g,
      );
      render();
      setTimeout(() => {
        ghostsRef.current = ghostsRef.current.filter((g) => g.id !== id);
        render();
      }, FADE_OUT_MS + 50);
    },
    [render],
  );

  const spawnGhost = useCallback(
    (x: number, y: number) => {
      if (reducedMotionRef.current) return;

      const last = lastSpawnRef.current;
      if (last && Math.hypot(x - last.x, y - last.y) < SPAWN_THRESHOLD_PX) {
        return;
      }
      lastSpawnRef.current = { x, y };

      // Only one ghost is ever visible at a time — fade out whichever is
      // currently showing before mounting the new one.
      ghostsRef.current
        .filter((g) => g.show)
        .forEach((g) => hideGhost(g.id));

      const id = nextIdRef.current++;
      const src = PHOTOS[photoIndexRef.current % PHOTOS.length];
      photoIndexRef.current += 1;
      const rotation = (Math.random() - 0.5) * 10;

      ghostsRef.current = [
        ...ghostsRef.current,
        { id, x, y, src, rotation, show: false },
      ].slice(-6);
      render();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ghostsRef.current = ghostsRef.current.map((g) =>
            g.id === id ? { ...g, show: true } : g,
          );
          render();
        });
      });
    },
    [hideGhost, render],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedMotionRef.current = media.matches;
    };
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const handlePointer = (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return;
      }
      lastPointerRef.current = { x: clientX, y: clientY };
      spawnGhost(clientX - rect.left, clientY - rect.top);
    };

    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX, e.clientY);
    const onScroll = () => {
      const pointer = lastPointerRef.current;
      if (pointer) handlePointer(pointer.x, pointer.y);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [spawnGhost]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {ghosts.map((ghost) => (
        <div
          key={ghost.id}
          className="absolute"
          style={{
            left: ghost.x - GHOST_WIDTH / 2,
            top: ghost.y - GHOST_HEIGHT / 2,
            width: GHOST_WIDTH,
            height: GHOST_HEIGHT,
            opacity: ghost.show ? 0.88 : 0,
            transform: `scale(${ghost.show ? 1 : 0.94}) rotate(${ghost.rotation}deg)`,
            transition: ghost.show
              ? `opacity ${FADE_IN_MS}ms ease-out, transform ${FADE_IN_MS}ms ease-out`
              : `opacity ${FADE_OUT_MS}ms ease-in, transform ${FADE_OUT_MS}ms ease-in`,
          }}
        >
          <Image
            src={ghost.src}
            alt=""
            fill
            sizes={`${GHOST_WIDTH}px`}
            className="pointer-events-none object-cover"
          />
        </div>
      ))}
    </div>
  );
}
