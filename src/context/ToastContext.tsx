import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CheckCircle2, AlertCircle, WifiOff, Wifi, Loader2, Sparkles, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';

export interface ToastItem {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  showToast: (toast: Omit<ToastItem, 'id'>) => string;
  dismissToast: (id: string) => void;
  isOnline: boolean;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({ title, message, type, duration = 5500 }: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      // Keep the latest notification focused in the center
      setToasts([{ id, title, message, type, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
      return id;
    },
    [dismissToast]
  );

  // Fermeture avec la touche Échap
  useEffect(() => {
    if (toasts.length === 0) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const current = toasts[toasts.length - 1];
        if (current && current.type !== 'loading') {
          dismissToast(current.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toasts, dismissToast]);

  // Surveillance automatique de la connexion Internet
  useEffect(() => {
    const handleOffline = () => {
      setIsOnline(false);
      showToast({
        title: 'Connexion Internet interrompue',
        message: 'Votre connexion semble instable ou coupée. Vos saisies restent sauvegardées.',
        type: 'warning',
        duration: 7000,
      });
    };

    const handleOnline = () => {
      setIsOnline(true);
      showToast({
        title: 'Connexion rétablie',
        message: 'Vous êtes de nouveau connecté à Internet.',
        type: 'success',
        duration: 3500,
      });
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [showToast]);

  const activeToast = toasts[toasts.length - 1];

  return (
    <ToastContext.Provider value={{ showToast, dismissToast, isOnline }}>
      {children}

      {/* Bannière discrète en cas de perte de connexion Internet */}
      {!isOnline && (
        <div className="fixed top-0 inset-x-0 z-[95] bg-amber-500/95 backdrop-blur-md text-zinc-950 px-4 py-2 text-xs font-bold flex items-center justify-center gap-2 shadow-lg animate-in fade-in">
          <WifiOff className="w-3.5 h-3.5 shrink-0" />
          <span>Connexion Internet instable ou hors-ligne — Mode de sauvegarde locale actif</span>
        </div>
      )}

      {/* Notification centrée avec arrière-plan du site flouté */}
      {activeToast && (() => {
        const isSuccess = activeToast.type === 'success';
        const isError = activeToast.type === 'error';
        const isWarning = activeToast.type === 'warning';
        const isLoading = activeToast.type === 'loading';

        return (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-live="assertive"
            onClick={() => {
              if (!isLoading) dismissToast(activeToast.id);
            }}
          >
            <div
              key={activeToast.id}
              onClick={e => e.stopPropagation()}
              className={`relative w-full max-w-md overflow-hidden rounded-3xl border p-6 sm:p-8 text-center shadow-[0_28px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-300 animate-in zoom-in-95 fade-in ${
                isSuccess
                  ? 'bg-[#0B120F]/95 border-emerald-500/40 text-white'
                  : isError
                  ? 'bg-[#150C0E]/95 border-rose-500/40 text-white'
                  : isWarning
                  ? 'bg-[#15110A]/95 border-amber-500/40 text-white'
                  : 'bg-[#0C0E14]/95 border-[#E5B54F]/40 text-white'
              }`}
            >
              {/* Halo lumineux d'ambiance */}
              <div
                className={`pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-48 rounded-full blur-3xl opacity-25 ${
                  isSuccess
                    ? 'bg-emerald-500'
                    : isError
                    ? 'bg-rose-500'
                    : isWarning
                    ? 'bg-amber-500'
                    : 'bg-[#E5B54F]'
                }`}
              />

              {/* Liseré lumineux supérieur */}
              <div
                className={`absolute top-0 left-0 right-0 h-[3px] ${
                  isSuccess
                    ? 'bg-gradient-to-r from-emerald-400 via-[#E5B54F] to-emerald-500'
                    : isError
                    ? 'bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500'
                    : isWarning
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400'
                    : 'bg-gradient-to-r from-[#E5B54F] via-[#3B82F6] to-[#E5B54F]'
                }`}
              />

              {/* Bouton de fermeture supérieur droit */}
              {!isLoading && (
                <button
                  type="button"
                  onClick={() => dismissToast(activeToast.id)}
                  className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Fermer la notification"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Icône centrale */}
              <div className="relative mx-auto mb-5 flex items-center justify-center">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-inner ${
                    isSuccess
                      ? 'bg-emerald-500/15 border-emerald-500/35 text-emerald-400 shadow-emerald-500/10'
                      : isError
                      ? 'bg-rose-500/15 border-rose-500/35 text-rose-400 shadow-rose-500/10'
                      : isWarning
                      ? 'bg-amber-500/15 border-amber-500/35 text-amber-400 shadow-amber-500/10'
                      : 'bg-[#E5B54F]/15 border-[#E5B54F]/35 text-[#E5B54F] shadow-[#E5B54F]/10'
                  }`}
                >
                  {isSuccess && <CheckCircle2 className="w-8 h-8 text-emerald-400" />}
                  {isError && <AlertCircle className="w-8 h-8 text-rose-400" />}
                  {isWarning && <WifiOff className="w-8 h-8 text-amber-400" />}
                  {isLoading && <Loader2 className="w-8 h-8 text-[#E5B54F] animate-spin" />}
                  {activeToast.type === 'info' && (
                    isOnline ? (
                      <Sparkles className="w-8 h-8 text-[#E5B54F]" />
                    ) : (
                      <Wifi className="w-8 h-8 text-[#3B82F6]" />
                    )
                  )}
                </div>
              </div>

              {/* En-tête de marque */}
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 mb-2">
                PRYMAX STUDIO
              </div>

              {/* Titre */}
              <h3 className="text-lg sm:text-xl font-display font-bold tracking-tight text-white leading-snug">
                {activeToast.title}
              </h3>

              {/* Message */}
              {activeToast.message && (
                <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 leading-relaxed max-w-sm mx-auto">
                  {activeToast.message}
                </p>
              )}

              {/* Bouton d'action pour fermer */}
              {!isLoading && (
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => dismissToast(activeToast.id)}
                    className={`w-full py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer ${
                      isSuccess
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20'
                        : isError
                        ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/20'
                        : isWarning
                        ? 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20'
                        : 'bg-[#E5B54F] hover:bg-[#f0c362] text-zinc-950 shadow-lg shadow-[#E5B54F]/20'
                    }`}
                  >
                    Continuer
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
};
