import React, { useState } from 'react';
import { SCOPE_MODULES } from '../data/agencyData';
import { Check, Calculator, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';

interface ScopeEstimatorProps {
  onPreloadBrief: (selectedModules: string[], totalFcfa: number, tier: string) => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = ({ onPreloadBrief }) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['mod-logo', 'mod-web', 'mod-apparel']);
  const [tier, setTier] = useState<'standard' | 'complete' | 'premium'>('complete');
  const [timeline, setTimeline] = useState<'normal' | 'express'>('normal');

  const toggleModule = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(m => m !== id) : prev) 
        : [...prev, id]
    );
  };

  // Coefficients simples
  const tierMultiplier = tier === 'standard' ? 1.0 : tier === 'complete' ? 1.3 : 1.7;
  const speedMultiplier = timeline === 'express' ? 1.2 : 1.0;

  const rawBaseSum = SCOPE_MODULES
    .filter(m => selectedIds.includes(m.id))
    .reduce((acc, m) => acc + m.baseCostFcfa, 0);

  const estimatedTotalFcfa = Math.round((rawBaseSum * tierMultiplier * speedMultiplier) / 5000) * 5000;

  const totalWeeks = Math.max(
    ...SCOPE_MODULES.filter(m => selectedIds.includes(m.id)).map(m => m.timeWeeks),
    2
  ) + (tier === 'premium' ? 2 : tier === 'complete' ? 1 : 0);

  const adjustedWeeks = timeline === 'express' ? Math.max(Math.round(totalWeeks * 0.7), 1) : totalWeeks;

  return (
    <section id="devis" className="py-16 sm:py-24 bg-[#090A0D] border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* En-tête simple et transparent */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E5B54F] mb-2.5">
            <span>Transparence Totale</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Tarifs en FCFA</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Estimez le prix de votre projet en FCFA
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-2.5">
            Cochez les services dont vous avez besoin pour obtenir instantanément une estimation claire, sans surprise, adaptée à votre budget.
          </p>
        </div>

        {/* Configuration interactive adaptée mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Colonne Gauche : Sélection des modules */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="text-xs font-semibold uppercase text-zinc-300 mb-2">
              Choisissez vos prestations :
            </div>

            {SCOPE_MODULES.map((module) => {
              const isSelected = selectedIds.includes(module.id);
              return (
                <div
                  key={module.id}
                  onClick={() => toggleModule(module.id)}
                  className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 select-none min-h-[56px] ${
                    isSelected
                      ? 'bg-[#121419] border-[#E5B54F] shadow-md'
                      : 'bg-[#0E0F12] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div 
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                        isSelected 
                          ? 'bg-[#E5B54F] border-[#E5B54F] text-[#08090B]' 
                          : 'border-zinc-700 bg-zinc-900'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm sm:text-base font-bold text-white">{module.name}</span>
                        <span className="text-[10px] font-mono uppercase text-[#E5B54F] px-1.5 py-0.2 bg-[#E5B54F]/10 rounded">
                          {module.category}
                        </span>
                      </div>
                      
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-zinc-300">
                        {module.deliverables.map((deliv, idx) => (
                          <span key={idx} className="flex items-center gap-1">
                            <span className="text-[#E5B54F]">·</span>
                            <span>{deliv}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm sm:text-base font-bold font-mono text-[#E5B54F] tabular-nums">
                      {module.baseCostFcfa.toLocaleString('fr-FR')} <span className="text-xs font-normal text-zinc-400">FCFA</span>
                    </div>
                    <div className="text-[10px] text-zinc-400">
                      ~{module.timeWeeks} sem.
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Options de Formule et Rapidité */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3">
              {/* Formule */}
              <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/5">
                <span className="text-xs font-semibold text-zinc-300 block mb-2">
                  Niveau d'accompagnement :
                </span>
                <div className="grid grid-cols-3 gap-1 p-1 bg-black/60 rounded-lg">
                  {(['standard', 'complete', 'premium'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className={`min-h-[36px] py-1 text-xs font-semibold capitalize rounded-md transition-colors cursor-pointer ${
                        tier === t 
                          ? 'bg-[#E5B54F] text-[#08090B]' 
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {t === 'standard' ? 'Essentiel' : t === 'complete' ? 'Complet' : 'Sur-Mesure'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vitesse */}
              <div className="p-3.5 bg-zinc-900/60 rounded-xl border border-white/5">
                <span className="text-xs font-semibold text-zinc-300 block mb-2">
                  Délai souhaité :
                </span>
                <div className="grid grid-cols-2 gap-1 p-1 bg-black/60 rounded-lg">
                  {(['normal', 'express'] as const).map(vel => (
                    <button
                      key={vel}
                      onClick={() => setTimeline(vel)}
                      className={`min-h-[36px] py-1 text-xs font-semibold capitalize rounded-md transition-colors cursor-pointer ${
                        timeline === vel 
                          ? 'bg-[#E5B54F] text-[#08090B]' 
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {vel === 'normal' ? 'Normal' : 'Express (+20%)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Colonne Droite : Récapitulatif clair du devis estimatif */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#121419] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-[#E5B54F]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">Estimation Totale</span>
                </div>
                <span className="text-[10px] font-mono text-[#E5B54F] uppercase px-2 py-0.5 border border-[#E5B54F]/30 rounded">
                  {tier === 'standard' ? 'Pack Essentiel' : tier === 'complete' ? 'Pack Complet' : 'Pack Sur-Mesure'}
                </span>
              </div>

              {/* Affichage du Prix en FCFA avec séparateurs de milliers */}
              <div className="mb-6">
                <div className="text-xs text-zinc-400 uppercase font-mono">
                  Montant Estimatif du Devis
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-mono text-white tabular-nums tracking-tight mt-1">
                  {estimatedTotalFcfa.toLocaleString('fr-FR')}
                  <span className="text-sm font-bold text-[#E5B54F] ml-2 font-sans">FCFA</span>
                </div>
                <p className="text-xs text-zinc-300 mt-2">
                  *Comprend la livraison des fichiers complets, la mise en ligne et l'assistance technique.
                </p>
              </div>

              {/* Indicateurs de délai et nombre de prestations */}
              <div className="grid grid-cols-2 gap-3 p-3.5 bg-zinc-900/80 rounded-xl border border-white/5 mb-6">
                <div>
                  <div className="text-[10px] uppercase font-mono text-zinc-400">Délai estimé</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-white tabular-nums">
                    {adjustedWeeks} <span className="text-xs font-normal text-zinc-400">Semaines</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-mono text-zinc-400">Services choisis</div>
                  <div className="text-base sm:text-lg font-bold font-mono text-[#E5B54F] tabular-nums">
                    {selectedIds.length} <span className="text-xs font-normal text-zinc-400">Prestations</span>
                  </div>
                </div>
              </div>

              {/* Garanties simples */}
              <div className="space-y-2 mb-6 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E5B54F] shrink-0" />
                  <span>Devis gratuit sans aucun engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#E5B54F] shrink-0" />
                  <span>Échange direct et facile sur WhatsApp</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E5B54F] shrink-0" />
                  <span>Vous êtes 100% propriétaire de vos créations</span>
                </div>
              </div>

              {/* Bouton d'action pour envoyer la demande */}
              <button
                onClick={() => onPreloadBrief(selectedIds, estimatedTotalFcfa, tier)}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wider bg-[#E5B54F] hover:bg-[#F2C768] text-[#08090B] rounded-lg transition-all shadow-lg cursor-pointer"
              >
                <span>Envoyer ce Devis &amp; Être Recontacté</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
