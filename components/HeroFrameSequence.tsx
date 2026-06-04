"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "./ui/MagneticButton";

const VIDEO_SOURCES = [
  "/videos/hero-part-1.mp4",
  "/videos/hero-part-2.mp4",
  "/videos/hero-part-3.mp4",
  "/videos/hero-part-4.mp4",
] as const;

const REVERSE_VIDEO_SOURCES = [
  "/videos/reverse/hero-part-1-reverse.mp4",
  "/videos/reverse/hero-part-2-reverse.mp4",
  "/videos/reverse/hero-part-3-reverse.mp4",
  "/videos/reverse/hero-part-4-reverse.mp4",
] as const;

type StageCopy = {
  eyebrow: string;
  title: string;
  body: string;
  alignment: string;
  tone: {
    eyebrow: string;
    title: string;
    body: string;
  };
  primaryCta?: string;
  primaryHref?: string;
};

const STAGE_DATA: readonly StageCopy[] = [
  {
    eyebrow: "ZavariHaus",
    title: "Private stays with a polished first impression.",
    body: "Warm, furnished apartments in Bahria Town Lahore.",
    alignment: "items-start text-left",
    tone: {
      eyebrow: "text-[var(--soft-white)]/88",
      title: "text-[var(--soft-white)]",
      body: "text-[var(--soft-white)]/76",
    },
    primaryCta: "Book Your Stay",
    primaryHref: "#book",
  },
  {
    eyebrow: "Arrival",
    title: "A calm entrance, already prepared for you.",
    body: "Simple check-in. Clean details. Nothing loud.",
    alignment: "items-start text-left",
    tone: {
      eyebrow: "text-[#f1dcc0]",
      title: "text-[#fff7ec]",
      body: "text-[#f7ead8]/78",
    },
  },
  {
    eyebrow: "Inside",
    title: "Soft light and quiet comfort for the evening.",
    body: "A stay that feels relaxed from lounge to bedroom.",
    alignment: "items-center text-center md:items-start md:text-left",
    tone: {
      eyebrow: "text-[#f5e6c8]",
      title: "text-[#fff8ef]",
      body: "text-[#f8eedf]/80",
    },
  },
  {
    eyebrow: "Bahria Town Lahore",
    title: "Stay close to the landmark, return to somewhere warm.",
    body: "Refined interiors, smooth booking, and a setting that stays easy to remember.",
    alignment: "items-start text-left",
    tone: {
      eyebrow: "text-[#f4e3ba]",
      title: "text-[#fff8ef]",
      body: "text-[#f8eedf]/82",
    },
    primaryCta: "Book on WhatsApp",
    primaryHref: "https://wa.me/9203058480987",
  },
];

const LAST_STAGE_INDEX = VIDEO_SOURCES.length - 1;

function isInteractiveTarget(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest("a, button, input, textarea, select, summary, [role='button']"))
  );
}

export default function HeroFrameSequence() {
  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const reverseVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const loadedVideosRef = useRef<boolean[]>(Array(VIDEO_SOURCES.length).fill(false));
  const activeStageRef = useRef(0);
  const advanceRequestedRef = useRef(false);
  const transitionLockRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [preloaderComplete, setPreloaderComplete] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [heroReleased, setHeroReleased] = useState(false);
  const [readyCount, setReadyCount] = useState(0);

  const activeCopy = useMemo(() => STAGE_DATA[activeStage], [activeStage]);
  const lockHero = preloaderComplete && !heroReleased && activeStage < LAST_STAGE_INDEX;

  useEffect(() => {
    activeStageRef.current = activeStage;
  }, [activeStage]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("zavari:hero-progress", {
        detail: {
          loaded: readyCount,
          total: VIDEO_SOURCES.length,
          progress: readyCount / VIDEO_SOURCES.length,
        },
      })
    );
  }, [readyCount]);

  useEffect(() => {
    const handlePreloaderComplete = () => {
      setPreloaderComplete(true);
      setHeroReleased(false);
    };

    window.addEventListener("zavari:preloader-complete", handlePreloaderComplete);

    return () => {
      window.removeEventListener("zavari:preloader-complete", handlePreloaderComplete);
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent(lockHero ? "zavari:lock-scroll" : "zavari:unlock-scroll"));
    document.body.style.overflow = lockHero ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [lockHero]);

  useEffect(() => {
    return () => {
      reverseVideoRefs.current.forEach((video) => video?.pause());
    };
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      gsap.set(video, {
        opacity: index === 0 ? 1 : 0,
        zIndex: index === 0 ? 1 : 0,
      });
    });

    reverseVideoRefs.current.forEach((video) => {
      if (!video) return;
      gsap.set(video, {
        opacity: 0,
        zIndex: 0,
      });
    });
  }, []);

  useEffect(() => {
    if (!preloaderComplete) return;

    const brand = brandRef.current;
    if (brand) {
      gsap.fromTo(
        brand,
        { opacity: 0, y: -18, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, ease: "power3.out" }
      );
    }

    const firstVideo = videoRefs.current[0];
    if (!firstVideo) return;

    firstVideo.currentTime = 0;
    firstVideo.playbackRate = 1;

    const playPromise = firstVideo.play();
    if (playPromise) {
      playPromise.catch(() => undefined);
    }
  }, [preloaderComplete]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const textNodes = overlay.querySelectorAll("[data-hero-copy]");
    gsap.killTweensOf(textNodes);

    if (overlayVisible) {
      gsap.set(overlay, { pointerEvents: "auto" });
      gsap.fromTo(
        textNodes,
        { opacity: 0, y: 22, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.06,
          overwrite: true,
        }
      );
      return;
    }

    gsap.to(textNodes, {
      opacity: 0,
      y: -16,
      filter: "blur(10px)",
      duration: 0.72,
      ease: "power2.out",
      stagger: 0.04,
      overwrite: true,
      onComplete: () => {
        gsap.set(overlay, { pointerEvents: "none" });
      },
    });
  }, [activeStage, overlayVisible]);

  const markVideoReady = (index: number) => {
    if (loadedVideosRef.current[index]) return;
    loadedVideosRef.current[index] = true;
    setReadyCount((current) => Math.min(current + 1, VIDEO_SOURCES.length));
  };

  async function transitionToStage(nextStage: number) {
    if (
      transitionLockRef.current ||
      nextStage < 0 ||
      nextStage > LAST_STAGE_INDEX ||
      nextStage === activeStageRef.current
    ) {
      return;
    }

    const currentStage = activeStageRef.current;
    const currentVideo = videoRefs.current[currentStage];
    const nextVideo = videoRefs.current[nextStage];

    if (!currentVideo || !nextVideo) return;

    transitionLockRef.current = true;
    advanceRequestedRef.current = false;
    setHeroReleased(false);

    reverseVideoRefs.current.forEach((video) => {
      if (!video) return;
      video.pause();
      video.currentTime = 0;
      gsap.set(video, { opacity: 0, zIndex: 0 });
    });

    nextVideo.currentTime = 0;
    nextVideo.playbackRate = nextStage === LAST_STAGE_INDEX ? 1.35 : 1;
    nextVideo.style.zIndex = "2";
    currentVideo.style.zIndex = "1";

    const playPromise = nextVideo.play();
    if (playPromise) {
      await playPromise.catch(() => undefined);
    }

    setActiveStage(nextStage);
    setOverlayVisible(true);
    setHeroReleased(nextStage === LAST_STAGE_INDEX);

    await new Promise<void>((resolve) => {
      gsap.timeline({
        defaults: { duration: 0.78, ease: "power2.inOut" },
        onComplete: resolve,
      })
        .fromTo(nextVideo, { opacity: 0 }, { opacity: 1 }, 0)
        .to(currentVideo, { opacity: 0 }, 0);
    });

    currentVideo.pause();
    currentVideo.currentTime = 0;
    currentVideo.style.zIndex = "0";
    nextVideo.style.zIndex = "1";
    transitionLockRef.current = false;
  }

  async function reverseToStage(previousStage: number) {
    if (
      transitionLockRef.current ||
      previousStage < 0 ||
      previousStage >= activeStageRef.current
    ) {
      return;
    }

    const currentStage = activeStageRef.current;
    const currentVideo = videoRefs.current[currentStage];
    const previousVideo = videoRefs.current[previousStage];
    const reverseVideo = reverseVideoRefs.current[currentStage];

    if (!currentVideo || !previousVideo || !reverseVideo) return;

    transitionLockRef.current = true;
    advanceRequestedRef.current = false;
    setHeroReleased(false);
    setOverlayVisible(false);

    currentVideo.pause();
    reverseVideo.pause();
    reverseVideo.playbackRate = currentStage === LAST_STAGE_INDEX ? 1.35 : 1;
    reverseVideo.style.zIndex = "3";
    currentVideo.style.zIndex = "2";

    const currentDuration = currentVideo.duration || reverseVideo.duration || 0;
    const currentProgress = currentDuration > 0 ? currentVideo.currentTime / currentDuration : 1;
    const reverseDuration = reverseVideo.duration || currentDuration || 0;
    const reverseStartTime =
      reverseDuration > 0 ? Math.min(reverseDuration - currentProgress * reverseDuration, reverseDuration - 0.01) : 0;

    reverseVideo.currentTime = Math.max(reverseStartTime, 0);
    gsap.set(reverseVideo, { opacity: 1 });

    const reversePlayPromise = reverseVideo.play();
    if (reversePlayPromise) {
      await reversePlayPromise.catch(() => undefined);
    }

    await new Promise<void>((resolve) => {
      const handleReverseEnd = () => resolve();
      reverseVideo.addEventListener("ended", handleReverseEnd, { once: true });
    });

    previousVideo.pause();
    previousVideo.playbackRate = previousStage === LAST_STAGE_INDEX ? 1.35 : 1;
    previousVideo.currentTime = Math.max(previousVideo.duration - 0.06, 0);
    previousVideo.style.zIndex = "2";
    currentVideo.style.zIndex = "1";

    await new Promise<void>((resolve) => {
      gsap.timeline({
        defaults: { duration: 0.28, ease: "power2.out" },
        onComplete: resolve,
      })
        .to(reverseVideo, { opacity: 0 }, 0)
        .fromTo(previousVideo, { opacity: 0.82 }, { opacity: 1 }, 0);
    });

    setActiveStage(previousStage);
    setOverlayVisible(true);

    reverseVideo.pause();
    reverseVideo.currentTime = 0;
    reverseVideo.style.zIndex = "0";
    currentVideo.currentTime = 0;
    currentVideo.style.zIndex = "0";
    previousVideo.style.zIndex = "1";
    transitionLockRef.current = false;
  }

  useEffect(() => {
    const handleDownIntent = () => {
      if (transitionLockRef.current) return;

      if (activeStageRef.current < LAST_STAGE_INDEX) {
        if (overlayVisible) {
          setOverlayVisible(false);
        }

        advanceRequestedRef.current = true;
        const currentVideo = videoRefs.current[activeStageRef.current];
        if (!currentVideo) return;

        const isAtSceneEnd =
          currentVideo.ended ||
          (currentVideo.duration > 0 && currentVideo.currentTime >= currentVideo.duration - 0.08);

        if (isAtSceneEnd) {
          void transitionToStage(activeStageRef.current + 1);
        }
        return;
      }

      setHeroReleased(true);
    };

    const handleUpIntent = () => {
      if (transitionLockRef.current || activeStageRef.current <= 0) return;

      setHeroReleased(false);
      void reverseToStage(activeStageRef.current - 1);
    };

    const handleWheel = (event: WheelEvent) => {
      const heroVisible = window.scrollY <= 4 && preloaderComplete;
      if (!heroVisible) return;

      if (activeStageRef.current < LAST_STAGE_INDEX || (!heroReleased && activeStageRef.current !== LAST_STAGE_INDEX)) {
        event.preventDefault();
      }

      if (event.deltaY > 18) {
        handleDownIntent();
      } else if (event.deltaY < -18) {
        event.preventDefault();
        handleUpIntent();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!preloaderComplete || window.scrollY > 4) return;

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        handleDownIntent();
      }

      if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        handleUpIntent();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!preloaderComplete || window.scrollY > 4 || touchStartYRef.current === null) return;

      const currentY = event.touches[0]?.clientY;
      if (typeof currentY !== "number") return;

      const deltaY = touchStartYRef.current - currentY;
      if (Math.abs(deltaY) < 28) return;

      event.preventDefault();

      if (deltaY > 0) {
        handleDownIntent();
      } else {
        handleUpIntent();
      }

      touchStartYRef.current = currentY;
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [heroReleased, overlayVisible, preloaderComplete]);

  const handleVideoEnded = (index: number) => {
    if (index !== activeStageRef.current) return;

    if (advanceRequestedRef.current) {
      void transitionToStage(index + 1);
    }
  };

  const handleHeroClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!preloaderComplete || isInteractiveTarget(event.target)) return;

    if (activeStage < LAST_STAGE_INDEX) {
      void transitionToStage(activeStage + 1);
      return;
    }

    setHeroReleased(true);
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onClick={handleHeroClick}
      className="relative h-screen bg-[var(--background)]"
    >
      <div className="absolute inset-0 overflow-hidden">
        {VIDEO_SOURCES.map((src, index) => (
          <video
            key={src}
            ref={(node) => {
              videoRefs.current[index] = node;
            }}
            className="absolute inset-0 h-full w-full object-cover opacity-0"
            src={src}
            muted
            playsInline
            preload="auto"
            onLoadedData={() => markVideoReady(index)}
            onCanPlay={() => markVideoReady(index)}
            onError={() => markVideoReady(index)}
            onEnded={() => handleVideoEnded(index)}
          />
        ))}

        {REVERSE_VIDEO_SOURCES.map((src, index) => (
          <video
            key={src}
            ref={(node) => {
              reverseVideoRefs.current[index] = node;
            }}
            className="absolute inset-0 h-full w-full object-cover opacity-0"
            src={src}
            muted
            playsInline
            preload="auto"
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,0.22)_0%,rgba(12,10,8,0.06)_34%,rgba(12,10,8,0.34)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,248,239,0.18),transparent_34%)]" />
      </div>

      <div
        ref={brandRef}
        className="pointer-events-none absolute left-5 top-5 z-20 flex items-end gap-1.5 opacity-0 sm:left-8 sm:top-7"
      >
        <span className="font-[var(--font-editorial)] text-[1.9rem] italic leading-none text-[var(--soft-white)] drop-shadow-[0_10px_24px_rgba(0,0,0,0.18)] sm:text-[2.4rem]">
          Zavari
        </span>
        <span className="pb-1 text-[0.68rem] font-medium uppercase tracking-[0.34em] text-[var(--soft-white)]/84 sm:text-[0.76rem]">
          Haus
        </span>
      </div>

      <div className="section-shell relative z-10 flex h-full items-end pb-14 pt-28 sm:pb-16 sm:pt-32 md:pb-20">
        <div
          ref={overlayRef}
          className={`flex w-full max-w-[min(42rem,100%)] flex-col ${activeCopy.alignment}`}
        >
          <span
            data-hero-copy
            className={`mb-3 block font-[var(--font-editorial)] text-[1rem] italic tracking-[0.08em] sm:text-[1.08rem] ${activeCopy.tone.eyebrow}`}
          >
            {activeCopy.eyebrow}
          </span>
          <h1
            data-hero-copy
            className={`max-w-4xl text-[clamp(2.2rem,5.7vw,5.8rem)] font-semibold leading-[0.94] drop-shadow-[0_18px_40px_rgba(0,0,0,0.2)] [text-wrap:balance] ${activeCopy.tone.title}`}
          >
            {activeCopy.title}
          </h1>
          <p
            data-hero-copy
            className={`mt-4 max-w-2xl text-[clamp(0.98rem,1.7vw,1.14rem)] leading-7 sm:leading-8 ${activeCopy.tone.body}`}
          >
            {activeCopy.body}
          </p>

          {activeCopy.primaryCta ? (
            <div data-hero-copy className="mt-7">
              <MagneticButton
                as="a"
                href={activeCopy.primaryHref}
                className="btn-secondary !border-white/26 !bg-white/8 !px-7 !py-3 !text-[var(--soft-white)] backdrop-blur-md hover:!border-white/72 hover:!bg-white/12"
              >
                {activeCopy.primaryCta}
              </MagneticButton>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
