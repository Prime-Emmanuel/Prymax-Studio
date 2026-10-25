import React from 'react';
import { WifiOff, Sparkles } from 'lucide-react';
import iconPrymax from '../assets/branding/icon_prymax.png';

interface PageTransitionLoaderProps {
  isActive: boolean;
  statusMessage?: string | null;
  isOffline?: boolean;
}

export const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({
  isActive,
  statusMessage,
  isOffline = false,
}) => {
  if (!isActive) return null;

  return (
    <div
      className="fixed inset-0 z-[105] pointer-events-none flex flex-col justify-between"
      aria-live="polite"
    >
      {/* Barre supérieure ultra-fluide */}
      <div className="w-full h-[3px] bg-white/5 overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#E5B54F] via-white to-[#3B82F6] shadow-[0_0_16px_rgba(255,255,255,0.85)] transition-all duration-300"
          style={{ width: statusMessage ? '88%' : '68%' }}
        />
      </div>

      {/* Voile subtil de transition */}
      <div className="fixed inset-0 bg-[#050608]/65 backdrop-blur-sm flex items-center justify-center transition-opacity duration-200">
        <div className="px-6 py-4 rounded-2xl bg-[#0D0F14]/95 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col items-center gap-3 text-center max-w-xs mx-4">
          {/* Anneau lumineux animé avec logo PRYMAX */}
          <div className="relative w-11 h-11 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <div className="absolute inset-0 rounded-full border-2 border-t-white border-r-[#E5B54F] border-b-transparent border-l-transparent animate-spin" />
            <img
              src={iconPrymax}
              alt="PRYMAX STUDIO"
              className="w-6 h-6 object-contain rounded-sm"
            />
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-white font-semibold flex items-center justify-center gap-1.5">
              {isOffline ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300">Connexion instable</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-[#E5B54F]" />
                  <span>PRYMAX STUDIO</span>
                </>
              )}
            </div>

            {statusMessage && (
              <p className="text-xs text-zinc-300 leading-snug animate-in fade-in">
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
