import React, { useState, useRef } from 'react';
import { SERVICES } from '../data/agencyData';
import { ServiceItem } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';

interface DisciplinesProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenContact: () => void;
  onNavigate: (route: string) => void;
}

export const Disciplines: React.FC<DisciplinesProps> = ({ 
  onSelectService, 
  onOpenContact, 
  onNavigate 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const total = SERVICES.length;

  const scrollToCard = (index: number) => {
    const validIndex = (index + total) % total;
    setCurrentIndex(validIndex);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollTo({
        left: validIndex * (cardWidth > 640 ? 460 : 320),
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    scrollToCard(currentIndex + 1);
  };

  const handlePrev = () => {
    scrollToCard(currentIndex - 1);
  };

  return (
    <section id="services" className="py-16 sm:py-24 md:py-28 bg-[#08090D] relative scroll-mt-20 overflow-hidden border-t border-white/[0.08]">
      {/* Halo subtil en arrière-plan */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#E5B54F]/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* =========================================================================
            EN-TÊTE AVEC COMMANDES DE NAVIGATION HORIZONTALE BIEN VISIBLES ET DÉGAGÉES
           ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white mb-2.5">
              <span className="text-[#E5B54F]">Services PRYMAX STUDIO</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Solutions Sur-Mesure</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance">
              Des expertises digitales d'élite conçues pour les entreprises
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl">
              Faites défiler horizontalement nos prestations d'exception. Chaque carte présente un aperçu complet avec accès à sa page dédiée.
            </p>
          </div>

          {/* Commandes Horizontales : Entièrement visibles et dégagées des cartes */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <div className="font-mono text-xs text-zinc-400 mr-2">
              <span className="text-white font-bold">0{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>0{total}</span>
            </div>

            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 border border-white/15 hover:border-[#E5B54F]/50 flex items-center justify-center text-white transition-all cursor-pointer shadow-lg"
              aria-label="Prestation précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 border border-white/15 hover:border-[#E5B54F]/50 flex items-center justify-center text-white transition-all cursor-pointer shadow-lg"
              aria-label="Prestation suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            ORGANISATION HORIZONTALE DES CARTES (TOUTES VISIBLES, DONT E-COMMERCE)
           ========================================================================= */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-8 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {SERVICES.map((service, index) => {
            return (
              <div
                key={service.id}
                className="w-[88vw] sm:w-[440px] md:w-[460px] shrink-0 snap-start select-none"
              >
                {/* Conteneur externe de la carte avec liseré lumineux doré en flux continu */}
                <div className="relative p-[1.5px] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] h-full group">
                  
                  {/* Faisceau doré rotatif sur les bordures */}
                  <div 
                    className="absolute -inset-[150%] animate-gold-border-flow pointer-events-none opacity-80"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, rgba(229,181,79,0.1) 40deg, #E5B54F 80deg, #FFF0B3 100deg, rgba(229,181,79,0.5) 120deg, transparent 180deg, transparent 360deg)'
                    }}
                  />

                  {/* Intérieur de la Carte Service */}
                  <div className="relative rounded-[27px] bg-[#0E1015] border border-white/10 p-5 sm:p-7 flex flex-col justify-between h-full">
                    
                    <div>
                      {/* Image 4K haute résolution avec badge */}
                      <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-black shrink-0 border border-white/10 shadow-lg mb-5">
                        <img
                          src={service.image}
                          alt={service.title}
                          width={460}
                          height={288}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                        
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg bg-black/85 backdrop-blur-md text-[#E5B54F] border border-[#E5B54F]/30">
                            {service.number}
                          </span>
                          {service.badge && (
                            <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-white border border-white/20">
                              {service.badge}
                            </span>
                          )}
                        </div>

                        {service.stats && (
                          <div className="absolute bottom-3 left-3 text-[11px] font-mono text-zinc-300 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10">
                            {service.stats}
                          </div>
                        )}
                      </div>

                      {/* Titre & Résumé */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight group-hover:text-white transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-zinc-400 mb-5 leading-relaxed">
                        {service.tagline}
                      </p>

                      {/* Spécifications et livrables clés */}
                      <div className="space-y-2 mb-6">
                        {service.deliverables.slice(0, 3).map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B54F] shrink-0 mt-0.5" />
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pied de Carte avec bouton propre sans mention déplacée */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => onSelectService(service)}
                        className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>En savoir plus</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onNavigate('services')}
                        className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                      >
                        <span>Catalogue</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicateurs de progression (Points placés bien en bas avec zone tactile >= 44px) */}
        <div className="mt-4 flex items-center justify-center gap-1">
          {SERVICES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToCard(idx)}
              className="p-3 flex items-center justify-center cursor-pointer group"
              aria-label={`Aller au service ${idx + 1}`}
            >
              <span
                className={`h-2 rounded-full transition-all block ${
                  idx === currentIndex
                    ? 'w-8 bg-[#E5B54F]'
                    : 'w-2 bg-white/25 group-hover:bg-white/50'
                }`}
              />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
