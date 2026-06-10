import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '../hooks/useLenis';
import logo from '../../logo.png';

gsap.registerPlugin(ScrollTrigger);

const HERO_FORWARD_VIDEOS = [
  new URL('../../videos/hero-part-1.mp4', import.meta.url).href,
  new URL('../../videos/hero-part-2.mp4', import.meta.url).href,
  new URL('../../videos/hero-part-3.mp4', import.meta.url).href,
  new URL('../../videos/hero-part-4.mp4', import.meta.url).href,
];

const HERO_REVERSE_VIDEOS = [
  new URL('../../videos/reverse/hero-part-1-reverse.mp4', import.meta.url).href,
  new URL('../../videos/reverse/hero-part-2-reverse.mp4', import.meta.url).href,
  new URL('../../videos/reverse/hero-part-3-reverse.mp4', import.meta.url).href,
  new URL('../../videos/reverse/hero-part-4-reverse.mp4', import.meta.url).href,
];

type ScrollDirection = 'forward' | 'reverse';
type ActiveVideoKey = `${ScrollDirection}-${number}`;
type HeroPoint = 0 | 1 | 2 | 3 | 4;

const TEXT_SEGMENTS = [
  {
    headline: 'Where Silence Becomes Luxury.',
    subline: 'Step inside. The noise of the world fades away.',
  },
  {
    headline: 'Designed For Sacred Stillness.',
    subline: 'Interiors crafted around deepest human calm.',
  },
  {
    headline: 'Touch. Light. Sacred Space.',
    subline: 'Private sanctuaries that belong only to you.',
  },
  {
    headline: 'Welcome To Zavari Haus.',
    subline: 'Defining the pinnacle of luxury stays in Pakistan.',
  },
];

interface TypewriterProps {
  text: string;
  active: boolean;
  speed?: number;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterProps> = ({ text, active, speed = 25, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayedText('');
      setIsDone(false);
      return;
    }

    let isMounted = true;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const startTyping = () => {
      let index = 0;
      const tick = () => {
        if (!isMounted) return;
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index += 1;
          timeoutId = setTimeout(tick, speed);
        } else {
          setIsDone(true);
        }
      };
      tick();
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      isMounted = false;
      clearTimeout(initialDelay);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [text, active, speed, delay]);

  return (
    <span className="relative inline-block">
      {displayedText}
      {active && !isDone && (
        <span className="inline-block w-[3px] h-[0.9em] bg-[#B8975A] ml-1 animate-pulse align-middle" />
      )}
    </span>
  );
};

interface HeroProps {
  isReady: boolean;
}

export default function Hero({ isReady }: HeroProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [visibleVideoKey, setVisibleVideoKey] = useState<ActiveVideoKey>('forward-0');
  const [playbackRequest, setPlaybackRequest] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('forward');
  const currentPointRef = useRef<HeroPoint>(0);
  const isVideoRunningRef = useRef(false);
  const scrollDirectionRef = useRef<ScrollDirection>('forward');
  const activeClipRef = useRef<{ direction: ScrollDirection; index: number; targetPoint: HeroPoint } | null>(null);
  const fourthVideoExitLockUntilRef = useRef(0);
  const hasStartedInitialPlaybackRef = useRef(false);
  const playbackTokenRef = useRef(0);
  const visibleVideoKeyRef = useRef<ActiveVideoKey>('forward-0');
  const videoRefs = useRef<Record<ActiveVideoKey, HTMLVideoElement | null>>({
    'forward-0': null,
    'forward-1': null,
    'forward-2': null,
    'forward-3': null,
    'reverse-0': null,
    'reverse-1': null,
    'reverse-2': null,
    'reverse-3': null,
  });

  const activeVideoKey = `${scrollDirection}-${activeVideoIndex}` as ActiveVideoKey;

  const syncPoint = (newPoint: HeroPoint) => {
    currentPointRef.current = newPoint;
  };

  const lockHeroAtTop = () => {
    const lenis = getLenis();
    lenis?.stop();
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });
  };

  const releaseHeroScroll = () => {
    getLenis()?.start();
  };

  const resetVideo = (video: HTMLVideoElement) => {
    video.pause();
    try {
      if (video.currentTime !== 0) {
        video.currentTime = 0;
      }
    } catch {
      // Some browsers need metadata first; the play routine handles that path.
    }
  };

  const scrollToNarrative = () => {
    const lenis = getLenis();
    const nextSection = document.getElementById('narrative');

    isVideoRunningRef.current = false;
    releaseHeroScroll();

    if (lenis) {
      lenis.scrollTo('#narrative');
      return;
    }

    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const pauseHeroVideos = () => {
    (Object.values(videoRefs.current) as Array<HTMLVideoElement | null>).forEach((video) => {
      video?.pause();
    });
  };

  const playClip = (clipIndex: number, direction: ScrollDirection, targetPoint: HeroPoint) => {
    if (clipIndex < 0 || clipIndex > 3) return;

    pauseHeroVideos();
    isVideoRunningRef.current = true;
    activeClipRef.current = { direction, index: clipIndex, targetPoint };
    scrollDirectionRef.current = direction;
    lockHeroAtTop();
    fourthVideoExitLockUntilRef.current = clipIndex === 3 && direction === 'forward' ? performance.now() + 450 : 0;
    setScrollDirection(direction);
    setActiveVideoIndex(clipIndex);
    setPlaybackRequest((request) => request + 1);
  };

  const handleNextSegment = () => {
    const point = currentPointRef.current;

    if (point === 0) playClip(0, 'forward', 1);
    if (point === 1) playClip(1, 'forward', 2);
    if (point === 2) playClip(2, 'forward', 3);
    if (point === 3) playClip(3, 'forward', 4);
  };

  const handlePrevSegment = () => {
    const point = currentPointRef.current;

    if (point === 1) playClip(0, 'reverse', 0);
    if (point === 2) playClip(1, 'reverse', 1);
    if (point === 3) playClip(2, 'reverse', 2);
    if (point === 4) playClip(3, 'reverse', 3);
  };

  const handleHeroClickSkip = () => {
    const activeClip = activeClipRef.current;

    if (!isVideoRunningRef.current || !activeClip) return;

    if (activeClip.direction === 'forward') {
      if (activeClip.index >= 3) {
        releaseFourthVideoToPage();
        return;
      }

      currentPointRef.current = (activeClip.index + 1) as HeroPoint;
      playClip(activeClip.index + 1, 'forward', (activeClip.index + 2) as HeroPoint);
      return;
    }

    if (activeClip.index <= 0) {
      pauseHeroVideos();
      syncPoint(0);
      isVideoRunningRef.current = false;
      activeClipRef.current = null;
      lockHeroAtTop();
      return;
    }

    currentPointRef.current = activeClip.index as HeroPoint;
    playClip(activeClip.index - 1, 'reverse', (activeClip.index - 1) as HeroPoint);
  };

  const releaseFourthVideoToPage = () => {
    syncPoint(4);
    isVideoRunningRef.current = false;
    activeClipRef.current = null;
    releaseHeroScroll();
  };

  useEffect(() => {
    const activeVideo = videoRefs.current[activeVideoKey];
    if (!activeVideo) return;

    const token = ++playbackTokenRef.current;
    const allVideos = Object.values(videoRefs.current) as Array<HTMLVideoElement | null>;
    allVideos.forEach((video) => {
      if (video && video !== activeVideo && video !== videoRefs.current[visibleVideoKeyRef.current]) {
        video.pause();
      }
    });

    if (!isReady || !activeClipRef.current) {
      resetVideo(activeVideo);
      activeVideo.load();
      return () => {};
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let hasStarted = false;
    let hasPromoted = false;

    const cleanup = () => {
      activeVideo.removeEventListener('loadedmetadata', onLoadedMetadata);
      activeVideo.removeEventListener('seeked', onSeeked);
      activeVideo.removeEventListener('canplay', onCanPlay);
      activeVideo.removeEventListener('playing', onPlaying);
      if (timeoutId) clearTimeout(timeoutId);
    };

    const promoteActiveVideo = () => {
      if (playbackTokenRef.current !== token || hasPromoted) return;
      hasPromoted = true;
      visibleVideoKeyRef.current = activeVideoKey;
      setVisibleVideoKey(activeVideoKey);
      const activeClip = activeClipRef.current;
      if (activeClip && `${activeClip.direction}-${activeClip.index}` === activeVideoKey) {
        setActiveSegment(activeClip.index);
      }
      cleanup();
      allVideos.forEach((video) => {
        if (video && video !== activeVideo) {
          video.pause();
        }
      });
    };

    const startPlayback = () => {
      if (playbackTokenRef.current !== token || hasStarted) return;
      hasStarted = true;
      activeVideo.play().catch(() => {});
    };

    const onPlaying = () => {
      promoteActiveVideo();
      cleanup();
    };

    const onLoadedMetadata = () => {
      if (playbackTokenRef.current !== token) return;
      try {
        activeVideo.currentTime = 0;
      } catch {
        // Keep waiting for browser seek resolution.
      }
    };

    const onSeeked = () => {
      if (playbackTokenRef.current !== token) return;
      if (activeVideo.currentTime <= 0.05) {
        startPlayback();
      }
    };

    const onCanPlay = () => {
      if (playbackTokenRef.current !== token) return;
      if (activeVideo.currentTime <= 0.05) {
        startPlayback();
      }
    };

    activeVideo.addEventListener('loadedmetadata', onLoadedMetadata);
    activeVideo.addEventListener('seeked', onSeeked);
    activeVideo.addEventListener('canplay', onCanPlay);
    activeVideo.addEventListener('playing', onPlaying);

    resetVideo(activeVideo);
    activeVideo.load();

    timeoutId = setTimeout(() => {
      if (playbackTokenRef.current !== token) return;
      startPlayback();
    }, 300);

    return cleanup;
  }, [activeVideoKey, playbackRequest, isReady]);

  useEffect(() => {
    scrollDirectionRef.current = scrollDirection;
  }, [scrollDirection]);

  useEffect(() => {
    visibleVideoKeyRef.current = visibleVideoKey;
  }, [visibleVideoKey]);

  useEffect(() => {
    const videos = Object.values(videoRefs.current) as Array<HTMLVideoElement | null>;
    videos.forEach((video) => {
      video?.load();
    });
  }, []);

  useEffect(() => {
    if (!isReady || hasStartedInitialPlaybackRef.current) return;

    hasStartedInitialPlaybackRef.current = true;
    playClip(0, 'forward', 1);
  }, [isReady]);

  useEffect(() => {
    const heroRoot = pinRef.current;
    if (!heroRoot) return;

    const isHeroControlZone = () => {
      const rect = heroRoot.getBoundingClientRect();
      return Math.abs(rect.top) <= 2;
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 5) return;

      const activeClip = activeClipRef.current;
      const currentPoint = currentPointRef.current;

      if (isVideoRunningRef.current) {
        if (activeClip?.direction === 'forward' && activeClip.index === 3 && e.deltaY > 0) {
          if (performance.now() < fourthVideoExitLockUntilRef.current) {
            e.preventDefault();
            return;
          }

          releaseFourthVideoToPage();
          return;
        }

        e.preventDefault();
        return;
      }

      if (currentPoint !== 4) {
        e.preventDefault();
        lockHeroAtTop();
        if (e.deltaY > 0) {
          handleNextSegment();
        } else {
          handlePrevSegment();
        }
        return;
      }

      if (!isHeroControlZone()) return;

      if (e.deltaY > 0) {
        releaseHeroScroll();
        return;
      }

      if (e.deltaY < 0) {
        e.preventDefault();
        handlePrevSegment();
      }
    };

    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) < 15) return;

      const activeClip = activeClipRef.current;
      const currentPoint = currentPointRef.current;

      if (isVideoRunningRef.current) {
        if (activeClip?.direction === 'forward' && activeClip.index === 3 && deltaY > 0) {
          if (performance.now() < fourthVideoExitLockUntilRef.current) {
            e.preventDefault();
            return;
          }

          releaseFourthVideoToPage();
          return;
        }

        e.preventDefault();
        return;
      }

      if (currentPoint !== 4) {
        e.preventDefault();
        lockHeroAtTop();
        if (deltaY > 0) {
          handleNextSegment();
        } else {
          handlePrevSegment();
        }
        return;
      }

      if (!isHeroControlZone()) return;

      if (deltaY > 0) {
        releaseHeroScroll();
        return;
      }

      if (deltaY < 0) {
        e.preventDefault();
        handlePrevSegment();
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0 || !isVideoRunningRef.current) return;
      e.preventDefault();
      handleHeroClickSkip();
    };

    window.addEventListener('wheel', handleWheel, { passive: false, capture: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, capture: true });
    window.addEventListener('click', handleClick, { passive: false, capture: true });

    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('click', handleClick, { capture: true });
      const activeLenis = getLenis();
      activeLenis?.start();
    };
  }, []);

  return (
    <div
      className="relative w-full h-[100svh] bg-[#111009] overflow-hidden select-none"
      ref={pinRef}
    >
      {[...HERO_FORWARD_VIDEOS.map((src, idx) => ({
        src,
        key: `forward-${idx}` as ActiveVideoKey,
      })), ...HERO_REVERSE_VIDEOS.map((src, idx) => ({
        src,
        key: `reverse-${idx}` as ActiveVideoKey,
      }))].map(({ src, key }) => {
        const isVisible = key === visibleVideoKey;

        return (
          <video
            key={key}
            src={src}
            muted
            playsInline
            preload="auto"
            onEnded={() => {
              if (key !== activeVideoKey) return;

              const activeClip = activeClipRef.current;
              if (!activeClip) return;

              syncPoint(activeClip.targetPoint);

              isVideoRunningRef.current = false;
              activeClipRef.current = null;
              if (activeClip?.targetPoint === 4) {
                releaseHeroScroll();
              } else {
                lockHeroAtTop();
              }
            }}
            ref={(el) => {
              videoRefs.current[key] = el;
            }}
            className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-200 ease-linear"
            style={{
              opacity: isVisible ? 1 : 0,
              zIndex: isVisible ? 2 : 1,
              willChange: 'opacity',
            }}
          />
        );
      })}

      <div className="absolute inset-0 bg-gradient-to-b from-[#111009]/30 via-[#111009]/45 to-[#111009]/85 z-10 pointer-events-none" />

      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none overflow-hidden select-none">
        <img
          src={logo}
          alt="Zavari Haus Watermark Logo"
          className="w-[85%] max-w-[550px] md:max-w-[700px] aspect-square object-contain opacity-[0.05] pointer-events-none select-none transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-start justify-center max-w-[1400px] mx-auto px-8 md:px-[120px]">
        <div className="relative w-full min-h-[160px] md:min-h-[260px]">
          {TEXT_SEGMENTS.map((segment, idx) => (
            <div
              key={idx}
              className="absolute inset-0 flex flex-col items-start justify-center pointer-events-none"
              style={{
                pointerEvents: activeSegment === idx ? 'auto' : 'none',
              }}
            >
              <h1 className="font-display text-white text-[42px] sm:text-[54px] md:text-[clamp(52px,7vw,96px)] font-light select-text mb-6 min-h-[1.2em] leading-[0.98] tracking-normal">
                <TypewriterText text={segment.headline} active={activeSegment === idx} speed={30} delay={100} />
              </h1>
              <p
                className="font-sans text-[13px] md:text-[16px] text-white/70 tracking-[0.12em] transition-all duration-[600ms] pl-4 border-l-2 border-[#B8975A]/60 ml-1 uppercase"
                style={{
                  opacity: activeSegment === idx ? 1 : 0,
                  transform: activeSegment === idx ? 'translateY(0)' : 'translateY(12px)',
                  filter: activeSegment === idx ? 'blur(0)' : 'blur(4px)',
                  transitionDelay: activeSegment === idx ? '1100ms' : '0ms',
                }}
              >
                {segment.subline}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div
          className="group flex flex-col items-center gap-2.5 text-white transition-all duration-500 cursor-default select-none"
          aria-hidden="true"
        >
          <div className="relative flex items-center justify-center h-9 w-5 border-[1.5px] border-white/60 rounded-full">
            <div className="absolute top-2 w-[3px] h-1.5 bg-white rounded-full animate-mouse-wheel" />
          </div>
          <span className="font-sans text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 transition-all duration-300 group-hover:text-[#B8975A]/90 group-hover:opacity-100">
            Scroll
          </span>
        </div>
      </div>
    </div>
  );
}
