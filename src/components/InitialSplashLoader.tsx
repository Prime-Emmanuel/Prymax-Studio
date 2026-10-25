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
  { char: 'P', initialTransform: 'translate3d(-70px, -25px, 0) scale(0.82)', delayMs: 120 },
  { char: 'R', initialTransform: 'translate3d(0px, -65px, 0) scale(0.82)', delayMs: 300 },
  { char: 'Y', initialTransform: 'translate3d(0px, 65px, 0) scale(0.82)', delayMs: 480 },
  { char: 'M', initialTransform: 'translate3d(55px, -55px, 0) scale(0.82)', delayMs: 660 },
  { char: 'A', initialTransform: 'translate3d(-55px, 55px, 0) scale(0.82)', delayMs: 840 },
  { char: 'X', initialTransform: 'translate3d(70px, 25px, 0) scale(0.82)', delayMs: 1020 },
];

export const InitialSplashLoader: React.FC<InitialSplashLoaderProps> = ({ onComplete }) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [isWordComplete, setIsWordComplete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const timers: Array<ReturnType<typeof setTimeout>> = [];

    // Apparition séquentielle lettre par lettre depuis différentes directions
    PRYMAX_LETTERS.forEach((letter, idx) => {
      const t = setTimeout(() => {
        setVisibleCount(idx + 1);
      }, letter.delayMs);
      timers.push(t);
    });

    // Illumination centrale une fois le mot P R Y M A X complet
    const glowTimer = setTimeout(() => {
      setIsWordComplete(true);
    }, 1350);
    timers.push(glowTimer);

    // Fondu de sortie fluide vers le site
    const exitTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2250);
    timers.push(exitTimer);

    const doneTimer = setTimeout(() => {
      onComplete();
    }, 2700);
    timers.push(doneTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[120] bg-[#030406] flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-500 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Chargement de PRYMAX STUDIO"
    >
      {/* Halo lumineux central qui s'intensifie lorsque le mot est complet */}
      <div
        className={`absolute w-[340px] sm:w-[520px] h-[180px] sm:h-[240px] rounded-full pointer-events-none transition-all duration-700 ${
          isWordComplete
            ? 'opacity-100 scale-110 bg-gradient-to-r from-[#E5B54F]/25 via-white/30 to-[#3B82F6]/25 blur-[85px]'
            : 'opacity-15 scale-75 bg-white/10 blur-[60px]'
        }`}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        {/* Lettres blanches P R Y M A X arrivant de directions distinctes */}
        <div className="flex items-center justify-center gap-3 sm:gap-5 md:gap-7">
          {PRYMAX_LETTERS.map((item, idx) => {
            const isRevealed = visibleCount > idx;
            return (
              <span
                key={item.char}
                style={{
                  transform: isRevealed ? 'translate3d(0, 0, 0) scale(1)' : item.initialTransform,
                  opacity: isRevealed ? 1 : 0,
                  textShadow: isWordComplete
                    ? '0 0 28px rgba(255,255,255,0.95), 0 0 58px rgba(229,181,79,0.55), 0 0 90px rgba(255,255,255,0.35)'
                    : isRevealed
                    ? '0 0 14px rgba(255,255,255,0.3)'
                    : 'none',
                  transition:
                    'transform 520ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease-out, text-shadow 650ms ease-out',
                }}
                className="font-display text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-white inline-block will-change-transform"
              >
                {item.char}
              </span>
            );
          })}
        </div>

        {/* Ligne lumineuse et sous-titre subtil révélés à la complétion du mot */}
        <div className="mt-6 flex flex-col items-center">
          <div
            className={`h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent transition-all duration-700 ${
              isWordComplete
                ? 'w-44 sm:w-64 opacity-90 shadow-[0_0_20px_rgba(255,255,255,0.9)]'
                : 'w-8 opacity-0'
            }`}
          />
          <span
            className={`mt-3 font-mono text-[10px] sm:text-xs uppercase tracking-[0.45em] text-zinc-300 transition-all duration-500 ${
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
