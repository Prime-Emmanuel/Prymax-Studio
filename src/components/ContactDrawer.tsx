import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Send, MessageCircle, Phone } from 'lucide-react';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  preloadedModules?: string[];
  preloadedTotalFcfa?: number;
  preloadedTier?: string;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({
  isOpen,
  onClose,
  preloadedModules = [],
  preloadedTotalFcfa,
  preloadedTier
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budgetRangeFcfa, setBudgetRangeFcfa] = useState('200 000 – 500 000 FCFA');
  const [brief, setBrief] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const servicesList = [
    'Création de Logo & Identité Visuelle',
    'Création de Site Web (Adapté Mobile)',
    'Boutique en Ligne (E-Commerce)',
    'Conception de T-shirts & Vêtements Personnalisés',
    'Référencement Google & Solutions Digitales'
  ];

  // Synchronisation avec les données du simulateur
  useEffect(() => {
    if (preloadedModules.length > 0) {
      const mapped = preloadedModules.map(m => {
        if (m === 'mod-logo') return 'Création de Logo & Identité Visuelle';
        if (m === 'mod-web') return 'Création de Site Web (Adapté Mobile)';
        if (m === 'mod-ecom') return 'Boutique en Ligne (E-Commerce)';
        if (m === 'mod-apparel') return 'Conception de T-shirts & Vêtements Personnalisés';
        if (m === 'mod-seo') return 'Référencement Google & Solutions Digitales';
        return m;
      });
      setSelectedServices(mapped);
    }
    if (preloadedTotalFcfa) {
      if (preloadedTotalFcfa < 300000) setBudgetRangeFcfa('Moins de 300 000 FCFA');
      else if (preloadedTotalFcfa < 700000) setBudgetRangeFcfa('300 000 – 700 000 FCFA');
      else if (preloadedTotalFcfa < 1200000) setBudgetRangeFcfa('700 000 – 1 200 000 FCFA');
      else setBudgetRangeFcfa('Plus de 1 200 000 FCFA');
    }
  }, [preloadedModules, preloadedTotalFcfa]);

  // Gestion de la touche Echap pour fermer le tiroir
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || (!phone.trim() && !email.trim())) {
      setErrorMsg('Veuillez indiquer au moins votre nom et un numéro de téléphone ou email.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setCompany('');
    setBrief('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl bg-[#0E1015] border-l border-white/10 h-full overflow-y-auto p-5 sm:p-8 flex flex-col justify-between text-white shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* En-tête */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-[#E5B54F]">
                PRYMAX STUDIO · Contact &amp; Devis
              </span>
            </div>
            <button
              onClick={onClose}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-1.5">
                  Parlons de votre projet
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Remplissez ce formulaire très simple. Nous vous répondons rapidement avec une proposition claire adaptée à votre budget.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Nom & Téléphone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ex: Marc Koffi"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Téléphone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="ex: +225 07 00 00 00"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                  />
                </div>
              </div>

              {/* Email & Entreprise */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Adresse Email (optionnel)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@entreprise.com"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Nom de votre Entreprise / Marque
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ex: Kroma Shop, Cabinet Alpha..."
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                  />
                </div>
              </div>

              {/* Services demandés */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  Quels services vous intéressent ?
                </label>
                <div className="space-y-1.5">
                  {servicesList.map((service, idx) => {
                    const isChecked = selectedServices.includes(service);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleService(service)}
                        className={`p-2.5 sm:p-3 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-colors min-h-[42px] ${
                          isChecked
                            ? 'bg-zinc-800 border-[#E5B54F] text-white'
                            : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <span>{service}</span>
                        <div className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                          isChecked ? 'bg-[#1E5EFF] border-[#1E5EFF] text-white font-bold' : 'border-zinc-700'
                        }`}>
                          {isChecked && '✓'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Budget en FCFA */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Budget indicatif (en FCFA)
                </label>
                <select
                  value={budgetRangeFcfa}
                  onChange={(e) => setBudgetRangeFcfa(e.target.value)}
                  className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#1E5EFF]"
                >
                  <option value="Moins de 150 000 FCFA">Moins de 150 000 FCFA (Logo ou projet d'amorçage)</option>
                  <option value="150 000 – 350 000 FCFA">150 000 – 350 000 FCFA</option>
                  <option value="350 000 – 700 000 FCFA">350 000 – 700 000 FCFA (Site Web Complet / Application)</option>
                  <option value="700 000 – 1 500 000 FCFA">700 000 – 1 500 000 FCFA (E-commerce &amp; Pack Complet)</option>
                  <option value="Plus de 1 500 000 FCFA">Plus de 1 500 000 FCFA (Projet d'Envergure)</option>
                </select>
              </div>

              {/* Détails du projet */}
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Décrivez brièvement votre besoin
                </label>
                <textarea
                  rows={3}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder="ex: Je souhaite concevoir un site web moderne pour mon entreprise avec une identité visuelle marquante..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#1E5EFF]"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3.5 bg-[#1E5EFF] hover:bg-[#184FD8] active:bg-[#1340B5] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(30,94,255,0.4)] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma Demande de Devis</span>
              </button>
            </form>
          ) : (
            /* Confirmation */
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>

              <div className="text-xs font-mono uppercase text-[#E5B54F] mb-1.5">
                DEMANDE ENVOYÉE AVEC SUCCÈS
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Merci {fullName} !
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mb-6 leading-relaxed">
                Votre demande a bien été transmise à l'équipe PRYMAX STUDIO. Nous vous recontacterons très rapidement sur WhatsApp ou par téléphone.
              </p>

              <div className="w-full max-w-md p-4 bg-zinc-900 rounded-xl border border-white/5 text-left mb-6 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Numéro de Référence :</span>
                  <span className="font-mono text-white font-bold">PX-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Téléphone :</span>
                  <span className="text-white">{phone}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Budget estimé :</span>
                  <span className="font-mono text-[#E5B54F] font-bold">{budgetRangeFcfa}</span>
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
          <ShieldCheck className="w-4 h-4 text-[#E5B54F] shrink-0" />
          <span>Vos informations restent 100% confidentielles. Pas de spam.</span>
        </div>

      </div>
    </div>
  );
};
