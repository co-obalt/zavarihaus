"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn, prefersReducedMotion } from "@/lib/utils";

interface SplitTextRevealProps {
  children: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function SplitTextReveal({
  children,
  className,
  as: Component = "p",
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray(".split-word") as HTMLElement[];
      gsap.fromTo(
        words,
        { y: "100%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = children.split(" ");

  return (
    <Component className={cn(className)}>
      <span ref={containerRef} className="contents">
        {prefersReducedMotion()
          ? children
          : words.map((word, i) => (
              <span key={i} className="mr-[0.1em] inline-block overflow-hidden pb-1 pr-1">
                <span className="split-word inline-block translate-y-full opacity-0">
                  {word}
                </span>
              </span>
            ))}
      </span>
    </Component>
  );
}
