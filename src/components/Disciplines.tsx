import React, { useState } from 'react';
import { SERVICES } from '../data/agencyData';
import { ServiceItem } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  Grid3X3,
  MessageCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'cascade' | 'grid'>('cascade');
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const total = SERVICES.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Gestion du swipe tactile
  const handleTouchStart = (e: React.TouchEvent) => {
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX === null) return;
    const diff = dragStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setDragStartX(null);
  };

  const currentService = SERVICES[activeIndex];

  return (
    <section id="services" className="py-16 sm:py-24 md:py-28 bg-[#08090D] relative scroll-mt-20 overflow-hidden border-t border-white/[0.08]">
      {/* Halo subtil en arrière-plan */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#E5B54F]/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white mb-2.5">
              <span className="text-[#E5B54F]">Services PRYMAX STUDIO</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Douala, Cameroun</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance">
              Des expertises digitales d'élite conçues pour les entreprises
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl">
              Faites glisser les cartes en cascade ou utilisez les flèches pour parcourir nos prestations. Chaque service dispose d'une page dédiée complète.
            </p>
          </div>

          {/* Commutateur de vue : Cascade 3D ou Grille */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setViewMode('cascade')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'cascade'
                  ? 'bg-white text-zinc-950 shadow-md font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-400'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Cascade 3D</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-white text-zinc-950 shadow-md font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-400'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Vue Grille</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            MODE 1 : CASCADING 3D CARD STACK AVEC LISERÉ DORÉ LUMINEUX EN FLUX CONTINU
           ========================================================================= */}
        {viewMode === 'cascade' ? (
          <div className="relative max-w-4xl mx-auto">
            {/* Conteneur de la pile en cascade 3D */}
            <div 
              className="relative min-h-[580px] sm:min-h-[520px] flex items-center justify-center select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {SERVICES.map((service, index) => {
                // Calcul du décalage relatif par rapport à activeIndex
                const offset = (index - activeIndex + total) % total;
                const isCurrent = offset === 0;
                const isNext = offset === 1;
                const isNextNext = offset === 2;

                // On n'affiche que les 3 cartes supérieures de la pile pour préserver l'illusion 3D
                if (offset > 2) return null;

                const zIndex = 30 - offset * 10;
                const scale = 1 - offset * 0.05;
                const translateY = offset * 20;
                const opacity = 1 - offset * 0.28;

                return (
                  <motion.div
                    key={service.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{
                      opacity,
                      scale,
                      y: translateY,
                      zIndex,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24,
                    }}
                    className={`absolute inset-x-0 mx-auto w-full max-w-3xl transition-shadow ${
                      isCurrent ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                  >
                    {/* Conteneur externe de la carte avec liseré lumineux doré en flux continu */}
                    <div className="relative p-[1.5px] rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] group">
                      
                      {/* Faisceau doré qui tourne le long du contour de la carte */}
                      <div 
                        className="absolute -inset-[150%] animate-gold-border-flow pointer-events-none opacity-85"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(229,181,79,0.1) 40deg, #E5B54F 80deg, #FFF2BD 100deg, rgba(229,181,79,0.6) 120deg, transparent 180deg, transparent 360deg)'
                        }}
                      />

                      {/* Intérieur de la Carte Service */}
                      <div className="relative rounded-[27px] bg-[#0E1015] border border-white/10 p-5 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                        
                        {/* Visuel 4K haute résolution */}
                        <div className="relative w-full md:w-5/12 aspect-[4/3] rounded-2xl overflow-hidden bg-black shrink-0 border border-white/10 shadow-lg">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          
                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="font-mono text-xs font-extrabold px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[#E5B54F] border border-[#E5B54F]/30">
                              {service.number}
                            </span>
                            {service.badge && (
                              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-white border border-white/20">
                                {service.badge}
                              </span>
                            )}
                          </div>

                          {service.stats && (
                            <div className="absolute bottom-3 left-3 text-[11px] font-mono text-zinc-300 px-2 py-0.5 rounded bg-black/75 backdrop-blur-md border border-white/10">
                              {service.stats}
                            </div>
                          )}
                        </div>

                        {/* Informations & Actions */}
                        <div className="w-full md:w-7/12 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-mono uppercase text-[#E5B54F] tracking-widest font-semibold">
                                PRESTATION D'ÉLITE
                              </span>
                              <span className="text-[11px] font-mono text-zinc-500">
                                {service.deliverables.length} éléments inclus
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">
                              {service.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-zinc-400 mb-5 leading-relaxed">
                              {service.tagline}
                            </p>

                            {/* Spécifications clés */}
                            <div className="space-y-2 mb-6">
                              {service.deliverables.slice(0, 3).map((item, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B54F] shrink-0 mt-0.5" />
                                  <span className="leading-snug">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bouton Inquire & Accès Page Dédiée */}
                          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                            <button
                              onClick={() => onSelectService(service)}
                              className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer group/inq"
                            >
                              <span>Inquire / En savoir plus</span>
                              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/inq:translate-x-0.5 group-hover/inq:-translate-y-0.5" />
                            </button>

                            <button
                              onClick={() => onNavigate('services')}
                              className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                            >
                              <span>Voir tout le catalogue</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Commandes de Navigation de la Cascade : Flèches Précédent / Suivant & Indicateur */}
            <div className="mt-8 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 border border-white/10 hover:border-[#E5B54F]/40 flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                  aria-label="Service précédent"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 border border-white/10 hover:border-[#E5B54F]/40 flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                  aria-label="Service suivant"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Indicateurs de progression (Points) */}
              <div className="flex items-center gap-1.5">
                {SERVICES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === activeIndex
                        ? 'w-7 bg-[#E5B54F]'
                        : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Aller au service ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Compteur 01 / 05 */}
              <div className="font-mono text-xs text-zinc-400">
                <span className="text-white font-bold">{SERVICES[activeIndex].number}</span>
                <span className="mx-1">/</span>
                <span>0{total}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Mode 2 : Vue Grille Complète */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="group relative rounded-3xl bg-[#0E1015] border border-white/10 hover:border-[#E5B54F]/50 transition-all p-6 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/10">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2.5 left-2.5 font-mono text-xs font-bold px-2 py-0.5 rounded bg-black/80 text-[#E5B54F]">
                      {service.number}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-xs text-zinc-400 mb-4">{service.tagline}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => onSelectService(service)}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-all cursor-pointer"
                  >
                    Inquire / Détails
                  </button>
                  <button
                    onClick={() => onSelectService(service)}
                    className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span>Fiche</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
