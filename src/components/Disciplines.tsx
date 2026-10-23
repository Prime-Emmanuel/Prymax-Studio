import React, { useState } from 'react';
import { SERVICES } from '../data/agencyData';
import { ServiceItem } from '../types';
import { ArrowRight, CheckCircle2, X, Sparkles } from 'lucide-react';

export const Disciplines: React.FC = () => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-16 sm:py-24 md:py-28 bg-[#08090D] relative scroll-mt-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* En-tête simple et clair */}
        <div className="max-w-3xl mb-12 sm:mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white mb-2.5">
            <span>Services PRYMAX STUDIO</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Branding, Web &amp; Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance">
            Des expertises pointues pour donner du relief à votre marque
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
            Du logo initial à la création de votre site web et vos supports de communication, nous concevons chaque livrable avec minutie et exigence.
          </p>
        </div>

        {/* Grille des services avec Branding en tête */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {SERVICES.map((service) => {
            const isBranding = service.id === 'srv-branding';
            return (
              <div
                key={service.id}
                className={`group bg-[#101217] border rounded-2xl p-5 sm:p-7 transition-all duration-200 flex flex-col justify-between ${
                  isBranding 
                    ? 'border-white/30 shadow-xl shadow-white/5 md:col-span-2 lg:col-span-1' 
                    : 'border-white/10 hover:border-white/25'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-zinc-600 group-hover:text-white transition-colors tabular-nums">
                      {service.number}.
                    </span>
                    {isBranding ? (
                      <span className="text-[10px] font-mono font-semibold text-white uppercase tracking-wider px-2.5 py-1 bg-white/10 rounded-md border border-white/20 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-white" />
                        <span>Cœur de Métier</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider px-2 py-0.5 bg-white/5 rounded">
                        Expertise
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2.5 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                    {service.tagline}
                  </p>

                  {/* Liste des points clés */}
                  <div className="space-y-2 mb-6">
                    {service.deliverables.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <span className="text-white font-bold mt-0.5">✓</span>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bouton détail */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {service.deliverables.length} éléments inclus
                  </span>

                  <button
                    onClick={() => setActiveModalService(service)}
                    className="min-h-[36px] px-3 py-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-zinc-300 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Modale explicative du service */}
      {activeModalService && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
          onClick={() => setActiveModalService(null)}
        >
          <div 
            className="bg-[#101217] border border-white/15 rounded-3xl max-w-xl w-full p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-white font-bold">{activeModalService.number}.</span>
                <span className="text-xs uppercase font-mono text-zinc-400">Présentation du Service</span>
              </div>
              <button 
                onClick={() => setActiveModalService(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-2xl font-bold mb-2.5">{activeModalService.title}</h3>
            <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">{activeModalService.summary}</p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
                Livrables complets inclus :
              </h4>
              <div className="space-y-2">
                {activeModalService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs p-3 bg-zinc-900/80 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span className="text-zinc-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 p-4 bg-zinc-900/60 rounded-2xl border border-white/5">
              <h4 className="text-[11px] font-mono uppercase text-zinc-400 mb-1">À qui s'adresse ce service ?</h4>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {activeModalService.idealFor}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a 
                href="#devis"
                onClick={() => setActiveModalService(null)}
                className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl transition-colors flex items-center justify-center shadow-lg"
              >
                Consulter les Délais &amp; Devis
              </a>
              <button
                onClick={() => setActiveModalService(null)}
                className="text-xs text-zinc-400 hover:text-white cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
