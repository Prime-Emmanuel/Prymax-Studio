import React, { useState } from 'react';
import { PRICING_MODULES } from '../data/agencyData';
import { Check, Clock, AlertCircle, FileText, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { CustomQuoteModal } from './CustomQuoteModal';

interface ScopeEstimatorProps {
  onPreloadBrief: (selectedModules: string[], totalFcfa: number, tier: string) => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>(['price-logo', 'price-pro']);
  const [isCustomQuoteOpen, setIsCustomQuoteOpen] = useState(false);

  const toggleModule = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(m => m !== id) : prev) 
        : [...prev, id]
    );
  };

  const selectedModules = PRICING_MODULES.filter(m => selectedIds.includes(m.id));

  return (
    <section id="devis" className="py-20 sm:py-28 bg-[#090A0D] border-t border-white/[0.08] relative scroll-mt-20">
      
      {/* Halo subtil monochrome */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* En-tête de la section */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white mb-2.5">
            <span>Délais d'Exécution &amp; Devis</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>PRYMAX STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Des délais d'exécution maîtrisés et garantis
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
            Chez PRYMAX STUDIO, chaque prestation est exécutée avec rigueur selon des délais précis. Sélectionnez vos besoins pour obtenir directement votre devis personnalisé.
          </p>
        </div>

        {/* Grille principale des modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Colonne Gauche : Sélection des prestations (7 colonnes) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span className="font-semibold uppercase text-zinc-300">Sélectionnez vos besoins :</span>
              <span className="text-[11px] font-mono text-white font-semibold">{selectedIds.length} sélectionné(s)</span>
            </div>

            {PRICING_MODULES.map((item) => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleModule(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 select-none ${
                    isSelected
                      ? 'bg-[#121419] border-white shadow-lg shadow-white/5'
                      : 'bg-[#0E0F13] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-3">
                      <div 
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                          isSelected 
                            ? 'bg-white border-white text-zinc-950' 
                            : 'border-zinc-700 bg-zinc-900'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                            {item.name}
                          </h3>
                          <span className="text-[10px] font-mono uppercase text-zinc-300 px-2 py-0.5 bg-white/10 rounded-md">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Affichage du délai seul */}
                    <div className="sm:text-right shrink-0 self-start sm:self-auto pl-8 sm:pl-0">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold font-mono">
                        <Clock className="w-3.5 h-3.5 text-white" />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Note spécifique au textile si applicable */}
                  {item.note && (
                    <div className="pt-2.5 border-t border-white/5 text-[11px] text-zinc-400 leading-relaxed italic bg-black/20 p-2.5 rounded-xl">
                      {item.note}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Avertissement important sur les durées et les éléments */}
            <div className="p-4 sm:p-5 bg-zinc-900/90 border border-white/10 rounded-2xl text-zinc-300 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold text-white block mb-0.5">Note importante sur les délais :</span>
                Toutes ces durées sont basées sur le fait que le client fournisse l'ensemble des éléments nécessaires à la réalisation du travail (textes, photos, logos existants, validations).
              </div>
            </div>

          </div>

          {/* Colonne Droite : Récapitulatif & Bouton Devis Personnalisé vers WhatsApp */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#101217] border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-white" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">
                    Devis Personnalisé
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white uppercase px-2.5 py-1 bg-white/10 rounded-full border border-white/20">
                  Direct WhatsApp
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Votre Demande Sur-Mesure
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Obtenez une proposition détaillée ajustée à vos objectifs, votre secteur et vos délais.
                </p>
              </div>

              {/* Prestations sélectionnées avec délais */}
              <div className="p-4 bg-zinc-900/80 rounded-2xl border border-white/5 space-y-2.5">
                <div className="text-[11px] font-mono text-zinc-400 uppercase flex items-center justify-between">
                  <span>Prestations cochées ({selectedModules.length})</span>
                  <span className="text-white font-semibold">Délais garantis</span>
                </div>
                <div className="space-y-2 text-xs text-zinc-300">
                  {selectedModules.map(m => (
                    <div key={m.id} className="flex items-center justify-between gap-2 py-0.5">
                      <span className="truncate font-medium text-white">· {m.name}</span>
                      <span className="font-mono text-white text-[11px] shrink-0 bg-white/10 px-2 py-0.5 rounded">
                        {m.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Garanties Studio */}
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Cession 100% des droits et fichiers sources HD</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Respect strict des délais annoncés</span>
                </div>
              </div>

              {/* LE BOUTON UNIQUE : DEVIS PERSONNALISÉ QUI ENVOIE SUR WHATSAPP */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    const selectedList = selectedModules.map(m => `• ${m.name} (Délai : ${m.duration})`).join('\n');
                    const message = encodeURIComponent(
                      `*DEMANDE DE DEVIS PERSONNALISÉ — PRYMAX STUDIO*\n\n` +
                      `Bonjour PRYMAX STUDIO, je souhaite un devis personnalisé pour les prestations suivantes :\n\n` +
                      `${selectedList}\n\n` +
                      `Merci de me recontacter pour échanger sur mon projet.`
                    );
                    window.open(`https://wa.me/237681078004?text=${message}`, '_blank');
                  }}
                  className="w-full min-h-[50px] py-3.5 bg-white hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,255,255,0.2)] cursor-pointer group"
                >
                  <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Devis Personnalisé (WhatsApp)</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>

                {/* Option alternative discrète pour formulaire complet */}
                <button
                  onClick={() => setIsCustomQuoteOpen(true)}
                  className="w-full py-2 text-center text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  Ou remplir notre formulaire détaillé avec cahier des charges ↗
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Modale de Devis Personnalisé Approfondi */}
      <CustomQuoteModal
        isOpen={isCustomQuoteOpen}
        onClose={() => setIsCustomQuoteOpen(false)}
      />

    </section>
  );
};
