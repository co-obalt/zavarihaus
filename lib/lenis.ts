import Lenis from "lenis";
import { prefersReducedMotion } from "./utils";

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (prefersReducedMotion()) return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.15,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  return lenisInstance;
}

export function destroyLenis(): void {
  if (!lenisInstance) return;
  lenisInstance.destroy();
  lenisInstance = null;
}
