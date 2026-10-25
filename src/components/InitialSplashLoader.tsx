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
  { char: 'P', initialTransform: 'translate3d(-35px, -12px, 0) scale(0.9)', delayMs: 20 },
  { char: 'R', initialTransform: 'translate3d(0px, -30px, 0) scale(0.9)', delayMs: 65 },
  { char: 'Y', initialTransform: 'translate3d(0px, 30px, 0) scale(0.9)', delayMs: 110 },
  { char: 'M', initialTransform: 'translate3d(28px, -28px, 0) scale(0.9)', delayMs: 155 },
  { char: 'A', initialTransform: 'translate3d(-28px, 28px, 0) scale(0.9)', delayMs: 200 },
  { char: 'X', initialTransform: 'translate3d(35px, 12px, 0) scale(0.9)', delayMs: 245 },
];

export const InitialSplashLoader: React.FC<InitialSplashLoaderProps> = ({ onComplete }) => {
  const [visibleCount, setVisibleCount] = useState(0);
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
      const t = setTimeout(() => {
        setVisibleCount(idx + 1);
      }, letter.delayMs);
      timers.push(t);
    });

    const glowTimer = setTimeout(() => {
      setIsWordComplete(true);
    }, 320);
    timers.push(glowTimer);

    const exitTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 520);
    timers.push(exitTimer);

    const doneTimer = setTimeout(() => {
      try {
        sessionStorage.setItem('prymax_splash_seen', '1');
      } catch {
        // Ignore storage errors
      }
      onComplete();
    }, 760);
    timers.push(doneTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[120] bg-[#030406]/95 backdrop-blur-md flex flex-col items-center justify-center select-none overflow-hidden pointer-events-none will-change-[opacity] transition-opacity duration-250 ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      {/* Halo lumineux central animé uniquement par transform et opacity (GPU composited) */}
      <div
        className={`absolute w-[340px] sm:w-[520px] h-[180px] sm:h-[240px] rounded-full pointer-events-none will-change-[transform,opacity] transition-[transform,opacity] duration-300 ${
          isWordComplete
            ? 'opacity-100 scale-110 bg-gradient-to-r from-[#E5B54F]/25 via-white/30 to-[#3B82F6]/25 blur-[85px]'
            : 'opacity-20 scale-90 bg-white/10 blur-[60px]'
        }`}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7">
          {PRYMAX_LETTERS.map((item, idx) => {
            const isRevealed = visibleCount > idx;
            return (
              <span
                key={item.char}
                style={{
                  transform: isRevealed ? 'translate3d(0, 0, 0) scale(1)' : item.initialTransform,
                  opacity: isRevealed ? 1 : 0,
                  textShadow: '0 0 24px rgba(255,255,255,0.6), 0 0 48px rgba(229,181,79,0.35)',
                  transition:
                    'transform 260ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease-out',
                }}
                className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-white inline-block will-change-[transform,opacity]"
              >
                {item.char}
              </span>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div
            className={`h-[1.5px] w-44 sm:w-64 rounded-full bg-gradient-to-r from-transparent via-white to-transparent will-change-[transform,opacity] transition-[transform,opacity] duration-300 ${
              isWordComplete
                ? 'opacity-90 scale-x-100 shadow-[0_0_20px_rgba(255,255,255,0.9)]'
                : 'opacity-0 scale-x-25'
            }`}
          />
          <span
            className={`mt-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.45em] text-zinc-300 will-change-[transform,opacity] transition-[transform,opacity] duration-250 ${
              isWordComplete ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            STUDIO DIGITAL
          </span>
        </div>
      </div>
    </div>
  );
};

