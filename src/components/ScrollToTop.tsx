import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <aside aria-label="Remonter en haut de page" className="fixed bottom-5 left-5 sm:bottom-7 sm:left-7 z-40 group">
      <button
        onClick={scrollToTop}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0E1015]/90 hover:bg-black active:scale-95 backdrop-blur-md border border-white/20 hover:border-[#E5B54F]/70 text-zinc-300 hover:text-white flex items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_30px_rgba(229,181,79,0.25)] transition-all duration-200 cursor-pointer"
        aria-label="Retourner en haut de la page"
      >
        <ArrowUp className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>

      {/* Tooltip desktop */}
      <span className="hidden sm:block absolute left-full ml-2.5 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-white/10 text-[10px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
        Haut de page
      </span>
    </aside>
  );
};
