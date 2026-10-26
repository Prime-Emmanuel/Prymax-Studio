import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Send, Loader2, Check } from 'lucide-react';
import { sendDemandEmail, detectActiveWebsiteLanguage } from '../utils/emailService';
import { useToast } from '../context/ToastContext';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preloadedModules?: string[];
  preloadedTotalFcfa?: number;
  preloadedTier?: string;
}

const BUDGET_CARDS = [
  'Moins de 150 000 FCFA',
  '150 000 – 350 000 FCFA',
  '350 000 – 700 000 FCFA',
  'Plus de 700 000 FCFA',
];

export const ContactDrawer: React.FC<ContactDrawerProps> = ({
  isOpen,
  onClose,
  preloadedModules = [],
  preloadedTotalFcfa,
}) => {
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budgetRangeFcfa, setBudgetRangeFcfa] = useState('150 000 – 350 000 FCFA');
  const [brief, setBrief] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slowHint, setSlowHint] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesList = [
    'Création de Logo & Identité Visuelle',
    'Création de Site Web Entreprise',
    'Boutique en Ligne E-Commerce',
    'Design Graphique & Mockups Textiles',
    'Référencement Google & SEO',
  ];

  useEffect(() => {
    if (preloadedModules.length > 0) {
      const mapped = preloadedModules.map(m => {
        if (m === 'mod-logo') return 'Création de Logo & Identité Visuelle';
        if (m === 'mod-web') return 'Création de Site Web Entreprise';
        if (m === 'mod-ecom') return 'Boutique en Ligne E-Commerce';
        if (m === 'mod-apparel') return 'Design Graphique & Mockups Textiles';
        if (m === 'mod-seo') return 'Référencement Google & SEO';
        return m;
      });
      setSelectedServices(mapped);
    }
    if (preloadedTotalFcfa) {
      if (preloadedTotalFcfa < 150000) setBudgetRangeFcfa('Moins de 150 000 FCFA');
      else if (preloadedTotalFcfa < 350000) setBudgetRangeFcfa('150 000 – 350 000 FCFA');
      else if (preloadedTotalFcfa < 700000) setBudgetRangeFcfa('350 000 – 700 000 FCFA');
      else setBudgetRangeFcfa('Plus de 700 000 FCFA');
    }
  }, [preloadedModules, preloadedTotalFcfa]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleService = (item: string) => {
    setSelectedServices(prev =>
      prev.includes(item) ? prev.filter(d => d !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSlowHint(null);
    setIsSubmitting(true);
    const activeLanguage = detectActiveWebsiteLanguage();

    try {
      const result = await sendDemandEmail(
        {
          type: 'contact-devis',
          language: activeLanguage,
          name: fullName,
          email,
          phone,
          company,
          services: selectedServices,
          budget: budgetRangeFcfa,
          message: brief,
          website_url: honeypot,
        },
        {
          onSlowRequest: hint => {
            setSlowHint(hint);
            showToast({
              title: 'Traitement en cours',
              message: hint,
              type: 'info',
              duration: 3000,
            });
          },
        }
      );

      setSubmittedRef(result.referenceId);
      showToast({
        title: 'Demande envoyée avec succès',
        message: `Référence ${result.referenceId} — Notre équipe a bien reçu votre dossier.`,
        type: 'success',
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      setErrorMsg(msg);
      showToast({
        title: 'Vérifiez votre saisie',
        message: msg,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      setSlowHint(null);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setCompany('');
    setBrief('');
    setErrorMsg('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0E1015] border-l border-white/10 h-full overflow-y-auto p-5 sm:p-8 flex flex-col justify-between text-white shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <div>
          {/* En-tête */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                PRYMAX STUDIO · Contact &amp; Devis
              </span>
            </div>
            <button
              onClick={onClose}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submittedRef ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1.5">
                  Parlons de votre projet
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Sélectionnez vos besoins et indiquez vos coordonnées. Vous recevrez une confirmation par email ainsi qu'une proposition adaptée.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Champ anti-robot invisible (Honeypot) */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="drawer-website-url">Site web (ne pas remplir)</label>
                <input
                  id="drawer-website-url"
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                />
              </div>

              {/* Nom & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="contact@entreprise.com"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                  />
                </div>
              </div>

              {/* Téléphone & Entreprise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    maxLength={40}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+237 6XX XX XX XX"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Nom de votre Entreprise / Marque
                  </label>
                  <input
                    type="text"
                    maxLength={120}
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Votre entreprise"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                  />
                </div>
              </div>

              {/* Services demandés en cartes sélectionnables */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  Quels services vous intéressent ? (Optionnel)
                </label>
                <div className="grid grid-cols-1 gap-1.5">
                  {servicesList.map((service, idx) => {
                    const isChecked = selectedServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => toggleService(service)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all min-h-[42px] text-left ${
                          isChecked
                            ? 'bg-white/[0.09] border-white text-white font-semibold'
                            : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <span>{service}</span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                            isChecked
                              ? 'bg-white border-white text-zinc-950 font-bold'
                              : 'border-zinc-700'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget en petites cartes */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  Budget indicatif (FCFA)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {BUDGET_CARDS.map(b => {
                    const active = budgetRangeFcfa === b;
                    return (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudgetRangeFcfa(b)}
                        className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all cursor-pointer text-left flex items-center justify-between gap-1.5 ${
                          active
                            ? 'bg-white/[0.09] border-[#E5B54F] text-white font-bold'
                            : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <span className="truncate">{b}</span>
                        {active && <Check className="w-3 h-3 text-[#E5B54F] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Détails du projet */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Précision complémentaire (optionnel)
                </label>
                <textarea
                  rows={2}
                  value={brief}
                  onChange={e => setBrief(e.target.value)}
                  placeholder="Objectif particulier ou lien de référence..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                />
              </div>

              {slowHint && (
                <div className="text-xs text-[#E5B54F] font-medium animate-pulse">
                  {slowHint}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] py-3.5 bg-white hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(255,255,255,0.2)] cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Demander un devis</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>

              <div className="text-xs font-mono uppercase text-[#E5B54F] mb-1.5 font-bold">
                DEMANDE ENVOYÉE AVEC SUCCÈS
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Merci {fullName} !
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mb-6 leading-relaxed">
                Votre demande a bien été transmise par email à l'équipe PRYMAX STUDIO. Un accusé de réception a été envoyé à <span className="text-white font-semibold">{email}</span>.
              </p>

              <div className="w-full max-w-md p-4 bg-zinc-900 rounded-xl border border-white/5 text-left mb-6 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Numéro de Référence :</span>
                  <span className="font-mono text-white font-bold">{submittedRef}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Email :</span>
                  <span className="text-white">{email}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Budget estimé :</span>
                  <span className="font-mono text-white font-bold">{budgetRangeFcfa}</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="min-h-[44px] px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-xs font-semibold uppercase transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          )}
        </div>

        {/* Pied de formulaire rassurant */}
        <div className="pt-4 border-t border-white/10 flex items-center gap-2.5 text-[11px] text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-white shrink-0" />
          <span>Vos informations restent 100% confidentielles. Pas de spam.</span>
        </div>
      </div>
    </div>
  );
};
