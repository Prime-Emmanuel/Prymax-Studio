import React from 'react';
import { ScopeEstimator } from '../components/ScopeEstimator';
import { Sparkles, ArrowRight, ShieldCheck, Clock, FileText, CheckCircle2 } from 'lucide-react';

interface PricingPageProps {
  onPreloadBrief: (modules: string[], totalFcfa: number, tier: string) => void;
  onOpenContact: () => void;
  onNavigate: (route: string) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({
  onPreloadBrief,
  onOpenContact,
  onNavigate
}) => {
  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
      {/* En-tête */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Accueil
          </button>
          <span>/</span>
          <span className="text-white font-semibold">Délais &amp; Devis</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E5B54F]" />
          <span>Transparence Totale · Tarifs FCFA &amp; Délais Maîtrisés</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
          Estimez votre projet en toute clarté
        </h1>
        <p className="text-zinc-300 text-sm sm:text-lg max-w-2xl mt-4 leading-relaxed">
          Sélectionnez vos besoins pour visualiser les délais d'exécution et obtenir instantanément une estimation chiffrée en FCFA sans surprise.
        </p>
      </div>

      {/* Répéteur du ScopeEstimator intégré */}
      <ScopeEstimator onPreloadBrief={onPreloadBrief} />

      {/* Engagements de livraison */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#0F1015] border border-white/10 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#E5B54F] shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Délais Rigoureux</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              De 24h pour un logo à 1-4 jours pour un site web vitrine professionnel. Planning fixé dès le départ.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1015] border border-white/10 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-[#3B82F6] shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Garantie &amp; Assistance</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Correction des anomalies, accompagnement à la prise en main et cession des droits des livrables.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0F1015] border border-white/10 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-emerald-400 shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white mb-1">Paiements Flexibles</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Acompte de démarrage et solde à la livraison. Règlements acceptés par Orange Money, MTN MoMo ou Virement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
