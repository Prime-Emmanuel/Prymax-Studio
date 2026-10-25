import React, { useEffect, useState } from 'react';

interface InitialSplashLoaderProps {
  onComplete: () => void;
}

interface LetterConfig {
  char: string;
  initialTransform: string;
  delayMs: number;
}

const PRYMAX_LETTERS: LetterConfig[] = [
  { char: 'P', initialTransform: 'translate3d(-18px, -8px, 0) scale(0.92)', delayMs: 0 },
  { char: 'R', initialTransform: 'translate3d(0px, -16px, 0) scale(0.92)', delayMs: 35 },
  { char: 'Y', initialTransform: 'translate3d(0px, 16px, 0) scale(0.92)', delayMs: 70 },
  { char: 'M', initialTransform: 'translate3d(16px, -14px, 0) scale(0.92)', delayMs: 105 },
  { char: 'A', initialTransform: 'translate3d(-16px, 14px, 0) scale(0.92)', delayMs: 140 },
  { char: 'X', initialTransform: 'translate3d(18px, 8px, 0) scale(0.92)', delayMs: 175 },
];

export const InitialSplashLoader: React.FC<InitialSplashLoaderProps> = ({ onComplete }) => {
  // Démarre avec la première lettre déjà révélée pour éviter tout écran vide initial
  const [visibleCount, setVisibleCount] = useState(1);
  const [isWordComplete, setIsWordComplete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      onComplete();
      return;
    }

    const timers: Array<ReturnType<typeof setTimeout>> = [];

    PRYMAX_LETTERS.forEach((letter, idx) => {
      if (idx === 0) return;
      const t = setTimeout(() => {
        setVisibleCount(idx + 1);
      }, letter.delayMs);
      timers.push(t);
    });

    const glowTimer = setTimeout(() => {
      setIsWordComplete(true);
    }, 210);
    timers.push(glowTimer);

    const exitTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 390);
    timers.push(exitTimer);

    const doneTimer = setTimeout(() => {
      try {
        sessionStorage.setItem('prymax_splash_seen', '1');
      } catch {
        // Ignore storage errors
      }
      onComplete();
    }, 580);
    timers.push(doneTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed top-20 sm:top-24 inset-x-0 z-[120] flex items-center justify-center select-none pointer-events-none px-4 will-change-[opacity,transform] transition-[opacity,transform] duration-200 ${
        isFadingOut ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
      }`}
      aria-hidden="true"
    >
      {/* Capsule cinétique flottante : préserve l'animation signature P R Y M A X sans occulter le Hero ni retarder le LCP */}
      <div className="relative px-7 sm:px-10 py-4 sm:py-5 rounded-3xl bg-[#05060A]/90 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col items-center">
        {/* Halo lumineux central animé uniquement par transform et opacity (GPU composited) */}
        <div
          className={`absolute w-[240px] sm:w-[340px] h-[110px] sm:h-[140px] rounded-full pointer-events-none will-change-[transform,opacity] transition-[transform,opacity] duration-250 ${
            isWordComplete
              ? 'opacity-100 scale-110 bg-gradient-to-r from-[#E5B54F]/25 via-white/30 to-[#3B82F6]/25 blur-[45px]'
              : 'opacity-25 scale-90 bg-white/10 blur-[35px]'
          }`}
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2.5 sm:gap-4">
            {PRYMAX_LETTERS.map((item, idx) => {
              const isRevealed = visibleCount > idx;
              return (
                <span
                  key={item.char}
                  style={{
                    transform: isRevealed ? 'translate3d(0, 0, 0) scale(1)' : item.initialTransform,
                    opacity: isRevealed ? 1 : 0,
                    textShadow: '0 0 20px rgba(255,255,255,0.55), 0 0 40px rgba(229,181,79,0.35)',
                    transition:
                      'transform 200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 160ms ease-out',
                  }}
                  className="font-display text-2xl sm:text-4xl font-black tracking-widest text-white inline-block will-change-[transform,opacity]"
                >
                  {item.char}
                </span>
              );
            })}
          </div>

          <div className="mt-2.5 flex flex-col items-center">
            <div
              className={`h-[1.5px] w-36 sm:w-48 rounded-full bg-gradient-to-r from-transparent via-white to-transparent will-change-[transform,opacity] transition-[transform,opacity] duration-200 ${
                isWordComplete
                  ? 'opacity-90 scale-x-100 shadow-[0_0_16px_rgba(255,255,255,0.85)]'
                  : 'opacity-0 scale-x-25'
              }`}
            />
            <span
              className={`mt-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.42em] text-zinc-300 will-change-[transform,opacity] transition-[transform,opacity] duration-200 ${
                isWordComplete ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-1'
              }`}
            >
              STUDIO DIGITAL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
