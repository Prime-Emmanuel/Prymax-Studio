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
    ({ title, message, type, duration = 4500 }: Omit<ToastItem, 'id'>) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setToasts(prev => [...prev.slice(-3), { id, title, message, type, duration }]);

      if (duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, duration);
      }
      return id;
    },
    [dismissToast]
  );

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

      {/* Conteneur de pop-ups notifications flottantes */}
      <div
        className="fixed top-20 right-4 sm:right-6 z-[90] flex flex-col gap-2.5 max-w-[360px] w-[calc(100vw-2rem)] pointer-events-none"
        aria-live="polite"
      >
        {toasts.map(toast => {
          const isSuccess = toast.type === 'success';
          const isError = toast.type === 'error';
          const isWarning = toast.type === 'warning';
          const isLoading = toast.type === 'loading';

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto relative overflow-hidden rounded-2xl border p-4 shadow-[0_18px_45px_rgba(0,0,0,0.75)] backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-top-2 ${
                isSuccess
                  ? 'bg-[#0D1310]/95 border-emerald-500/35 text-white'
                  : isError
                  ? 'bg-[#160D0F]/95 border-rose-500/40 text-white'
                  : isWarning
                  ? 'bg-[#16120B]/95 border-amber-500/40 text-white'
                  : 'bg-[#0E1016]/95 border-white/15 text-white'
              }`}
            >
              {/* Liseré lumineux supérieur */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] ${
                  isSuccess
                    ? 'bg-gradient-to-r from-emerald-400 via-[#E5B54F] to-emerald-500'
                    : isError
                    ? 'bg-gradient-to-r from-rose-500 to-orange-500'
                    : isWarning
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-500'
                    : 'bg-gradient-to-r from-[#E5B54F] via-[#3B82F6] to-white'
                }`}
              />

              <div className="flex items-start gap-3">
                <div className="mt-0.5 shrink-0">
                  {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
                  {isWarning && <WifiOff className="w-5 h-5 text-amber-400" />}
                  {isLoading && <Loader2 className="w-5 h-5 text-[#E5B54F] animate-spin" />}
                  {toast.type === 'info' && (
                    isOnline ? (
                      <Sparkles className="w-5 h-5 text-[#E5B54F]" />
                    ) : (
                      <Wifi className="w-5 h-5 text-[#3B82F6]" />
                    )
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold tracking-wide text-white leading-snug">
                    {toast.title}
                  </div>
                  {toast.message && (
                    <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                      {toast.message}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => dismissToast(toast.id)}
                  className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                  aria-label="Fermer la notification"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
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
