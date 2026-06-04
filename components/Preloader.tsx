"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleProgress = (e: Event) => {
      const customEvent = e as CustomEvent<{ loaded: number; total: number; progress: number }>;
      setProgress(customEvent.detail.progress);
    };

    window.addEventListener("zavari:hero-progress", handleProgress);

    return () => {
      window.removeEventListener("zavari:hero-progress", handleProgress);
    };
  }, []);

  useEffect(() => {
    if (progress >= 1) {
      const timeout = setTimeout(() => setVisible(false), 450);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 8000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        window.dispatchEvent(new CustomEvent("zavari:preloader-complete"));
      }}
    >
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, transition: { duration: 0.9, ease: "easeInOut" } }}
          className="fixed inset-0 z-[var(--z-preloader)] flex flex-col items-center justify-center bg-[var(--cream)]"
        >
          <div className="flex flex-col items-center gap-6 w-full max-w-xs">
            <h1 className="text-2xl font-semibold tracking-wide text-[var(--ink)] uppercase text-center">
              Zavari Haus
            </h1>
            <p className="text-[var(--muted)] text-sm">Preparing your stay...</p>
            
            <div className="w-full h-[2px] bg-[var(--line)] relative overflow-hidden rounded-full mt-4">
              <motion.div
                className="absolute inset-y-0 left-0 bg-[var(--champagne)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <p className="text-xs font-medium text-[var(--muted)] mt-1">
              {Math.floor(progress * 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
