"use client";

import { useEffect, useRef } from "react";
import { isTouchDevice } from "@/lib/utils";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
  id?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  as: Component = "button",
  href,
  id,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const content = contentRef.current;
    if (!button || !content || isTouchDevice()) return;

    const xTo = gsap.quickTo(content, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const yTo = gsap.quickTo(content, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = button.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.2); // max 4-6px movement based on button size
      yTo(y * 0.2);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener("mousemove", handleMouseMove as EventListener);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove as EventListener);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const content = (
    <div
      ref={contentRef}
      className="pointer-events-none relative flex items-center justify-center"
    >
      {children}
    </div>
  );

  if (Component === "a") {
    return (
      <a
        ref={buttonRef as React.Ref<HTMLAnchorElement>}
        className={className}
        onClick={onClick}
        id={id}
        href={href}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.Ref<HTMLButtonElement>}
      type="button"
      className={className}
      onClick={onClick}
      id={id}
    >
      {content}
    </button>
  );
}
