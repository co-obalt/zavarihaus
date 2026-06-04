"use client";

import { useEffect, useRef } from "react";
import { isTouchDevice, prefersReducedMotion } from "@/lib/utils";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouchDevice() || prefersReducedMotion()) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half the width/height to center the cursor
      xTo(e.clientX - 10);
      yTo(e.clientY - 10);
    };

    const handleMouseHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a") || target.closest("button") || target.closest("input");
      
      if (isInteractive) {
        gsap.to(cursor, { scale: 1.5, opacity: 0.8, duration: 0.2 });
      } else {
        gsap.to(cursor, { scale: 1, opacity: 0.6, duration: 0.2 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseHover);
    };
  }, []);

  if (isTouchDevice() || prefersReducedMotion()) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[20px] h-[20px] rounded-full border-[1.5px] border-[var(--champagne)] pointer-events-none z-[var(--z-cursor)] opacity-60 mix-blend-normal"
    />
  );
}
