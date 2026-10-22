import React, { useState } from 'react';
import { SERVICES } from '../data/agencyData';
import { ServiceItem } from '../types';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

export const Disciplines: React.FC = () => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#090A0D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* En-tête simple et clair */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E5B54F] mb-2.5">
            <span>Ce que nous faisons pour vous</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Services PRYMAX STUDIO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
            Des solutions concrètes pour développer votre entreprise
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
            Pas de jargon compliqué. Nous vous livrons des outils fiables, esthétiques et efficaces pour attirer des clients et valoriser votre image de marque.
          </p>
        </div>

        {/* Grille des 4 services principaux */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group bg-[#111317] border border-white/10 hover:border-white/25 rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-zinc-600 group-hover:text-[#E5B54F] transition-colors tabular-nums">
                    {service.number}.
                  </span>
                  <span className="text-[11px] font-mono text-[#E5B54F] uppercase tracking-wider px-2 py-0.5 bg-[#E5B54F]/10 rounded border border-[#E5B54F]/20">
                    Service Clé en Main
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2.5">
                  {service.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">
                  {service.tagline}
                </p>

                {/* Liste des points clés */}
                <div className="space-y-2 mb-6">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <span className="text-[#E5B54F] font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bouton détail et technologies simples */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-[11px] text-zinc-400 font-medium">
                  {service.deliverables.length} éléments inclus
                </span>

                <button
                  onClick={() => setActiveModalService(service)}
                  className="min-h-[40px] px-3.5 py-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#E5B54F] hover:text-[#F2C768] hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Voir le détail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Modale explicative du service */}
      {activeModalService && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-150"
          onClick={() => setActiveModalService(null)}
        >
          <div 
            className="bg-[#121419] border border-white/15 rounded-2xl max-w-xl w-full p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#E5B54F] font-bold">{activeModalService.number}.</span>
                <span className="text-xs uppercase font-mono text-zinc-400">Détails du Service</span>
              </div>
              <button 
                onClick={() => setActiveModalService(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold mb-2">{activeModalService.title}</h3>
            <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">{activeModalService.summary}</p>

            <div className="mb-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#E5B54F] mb-3">
                Ce que nous vous livrons exactement :
              </h4>
              <div className="space-y-2">
                {activeModalService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs p-3 bg-zinc-900 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#E5B54F] shrink-0 mt-0.5" />
                    <span className="text-zinc-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 p-3.5 bg-zinc-900/80 rounded-xl border border-white/5">
              <h4 className="text-[11px] font-mono uppercase text-zinc-400 mb-1">À qui s'adresse ce service ?</h4>
              <p className="text-xs text-zinc-200 leading-relaxed">
                {activeModalService.idealFor}
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <a 
                href="#devis"
                onClick={() => setActiveModalService(null)}
                className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-[#E5B54F] text-[#08090B] rounded-lg hover:bg-[#F2C768] transition-colors flex items-center justify-center"
              >
                Calculer mon Tarif (FCFA)
              </a>
              <button
                onClick={() => setActiveModalService(null)}
                className="text-xs text-zinc-400 hover:text-white"
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
