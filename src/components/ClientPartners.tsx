import React, { useState } from 'react';
import { CLIENT_PARTNERS, PRYMAX_PLACEHOLDER_LOGO } from '../data/agencyData';
import { ClientPartner } from '../types';
import { 
  Globe, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Grid3X3,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { motion } from 'motion/react';

interface ClientPartnersProps {
  onOpenContact: () => void;
  onNavigate?: (route: string) => void;
}

export const ClientPartners: React.FC<ClientPartnersProps> = ({ onOpenContact, onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'cascade' | 'grid'>('cascade');
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const total = CLIENT_PARTNERS.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    else if (diff < -50) handlePrev();
    setTouchStartX(null);
  };

  return (
    <section id="projets" className="py-16 sm:py-24 md:py-28 bg-[#090A0D] relative scroll-mt-20 border-t border-white/[0.08] overflow-hidden">
      <div id="clients" className="sr-only" />
      
      {/* Halo subtil */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-white/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* En-tête */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white mb-2.5">
              <span className="text-[#E5B54F]">Entreprises Clientes</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Collaborations &amp; Références</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight text-balance">
              Les entreprises qui avancent avec PRYMAX STUDIO
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl">
              Présentation stylisée des entreprises partenaires : logos officiels, visuels projets et accès direct à leurs plateformes web.
            </p>
          </div>

          {/* Commutateur Cascade / Grille */}
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
              <span>Présentation Cascade</span>
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
              <span>Toutes les Entreprises</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            PRÉSENTATION STYLE SERVICE : CASCADING 3D DECK OU GRILLE RAFFINÉE
           ========================================================================= */}
        {viewMode === 'cascade' ? (
          <div className="relative max-w-4xl mx-auto">
            {/* Conteneur de pile en cascade */}
            <div 
              className="relative min-h-[560px] sm:min-h-[500px] flex items-center justify-center select-none"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {CLIENT_PARTNERS.map((partner, index) => {
                const offset = (index - activeIndex + total) % total;
                if (offset > 2) return null;

                const isCurrent = offset === 0;
                const zIndex = 30 - offset * 10;
                const scale = 1 - offset * 0.05;
                const translateY = offset * 20;
                const opacity = 1 - offset * 0.28;

                const hasCustomImage = partner.image && partner.image.trim() !== '';
                const hasWebsite = partner.website && partner.website.trim() !== '' && partner.website !== 'in development';

                return (
                  <motion.div
                    key={partner.id}
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
                    className={`absolute inset-x-0 mx-auto w-full max-w-3xl ${
                      isCurrent ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                  >
                    {/* Conteneur avec liseré lumineux doré en flux continu */}
                    <div className="relative p-[1.5px] rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.85)] group">
                      
                      {/* Liseré lumineux running */}
                      <div 
                        className="absolute -inset-[150%] animate-gold-border-flow pointer-events-none opacity-85"
                        style={{
                          background: 'conic-gradient(from 0deg, transparent 0deg, rgba(229,181,79,0.1) 40deg, #E5B54F 80deg, #FFF0B3 100deg, rgba(229,181,79,0.5) 120deg, transparent 180deg, transparent 360deg)'
                        }}
                      />

                      {/* Intérieur de la Carte Entreprise */}
                      <div className="relative rounded-[27px] bg-[#0E1015] border border-white/10 p-5 sm:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                        
                        {/* Image de l'entreprise ou Placeholder Prymax */}
                        <div className="relative w-full md:w-5/12 aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950 shrink-0 border border-white/10 shadow-lg flex items-center justify-center">
                          {hasCustomImage ? (
                            <img
                              src={partner.image}
                              alt={partner.name}
                              width={400}
                              height={300}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#12141A] via-[#0E0F14] to-[#161822] p-6 text-center">
                              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center shadow-inner mb-2 group-hover:scale-110 transition-transform">
                                <img 
                                  src={PRYMAX_PLACEHOLDER_LOGO} 
                                  alt="PRYMAX STUDIO Placeholder" 
                                  width={40}
                                  height={40}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-10 h-10 object-contain drop-shadow"
                                />
                              </div>
                              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                                PRYMAX STUDIO
                              </span>
                            </div>
                          )}

                          <div className="absolute top-3 left-3 flex items-center gap-2">
                            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[#E5B54F] border border-[#E5B54F]/30">
                              0{index + 1}
                            </span>
                            {partner.tag && (
                              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-md text-white border border-white/20">
                                {partner.tag}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Informations & Logo Entreprise */}
                        <div className="w-full md:w-7/12 flex flex-col justify-between">
                          <div>
                            {/* Logo + Nom */}
                            <div className="flex items-center gap-3.5 mb-3.5">
                              <div className="w-12 h-12 rounded-xl bg-white p-1 border border-white/20 shrink-0 overflow-hidden shadow-sm flex items-center justify-center">
                                <img 
                                  src={partner.logo} 
                                  alt={`Logo ${partner.name}`}
                                  width={48}
                                  height={48}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-contain"
                                />
                              </div>

                              <div className="min-w-0">
                                <h3 className="text-xl sm:text-2xl font-bold text-white truncate">
                                  {partner.name}
                                </h3>
                                <div className="text-xs text-zinc-400 truncate">
                                  {partner.sector}
                                </div>
                              </div>
                            </div>

                            <p className="text-xs sm:text-sm text-zinc-300 mb-4 leading-relaxed">
                              {partner.highlight}
                            </p>

                            <div className="text-xs text-zinc-300 bg-white/[0.03] p-3 rounded-xl border border-white/5 mb-5">
                              <span className="text-zinc-400 font-mono text-[10px] uppercase block mb-0.5">Mission Réalisée :</span>
                              <span className="text-zinc-200">{partner.serviceProvided}</span>
                            </div>
                          </div>

                          {/* Liens Web et Contact */}
                          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                            {hasWebsite ? (
                              <a
                                href={partner.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                              >
                                <Globe className="w-3.5 h-3.5" />
                                <span>Visiter le site officiel</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-xs">
                                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                                <span>Site en cours de développement</span>
                              </div>
                            )}

                            <button
                              onClick={onOpenContact}
                              className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                            >
                              <span>Demander un projet similaire</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Commandes Flèches et Points de navigation */}
            <div className="mt-8 flex items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 border border-white/10 hover:border-[#E5B54F]/40 flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                  aria-label="Entreprise précédente"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 border border-white/10 hover:border-[#E5B54F]/40 flex items-center justify-center text-white transition-all cursor-pointer shadow-md"
                  aria-label="Entreprise suivante"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Indicateurs de progression avec zone tactile confortable */}
              <div className="flex items-center gap-0.5">
                {CLIENT_PARTNERS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className="p-2.5 flex items-center justify-center cursor-pointer group"
                    aria-label={`Aller à l'entreprise ${idx + 1}`}
                  >
                    <span
                      className={`h-2 rounded-full transition-all block ${
                        idx === activeIndex
                          ? 'w-7 bg-[#E5B54F]'
                          : 'w-2 bg-white/25 group-hover:bg-white/50'
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Compteur 01 / 06 */}
              <div className="font-mono text-xs text-zinc-400">
                <span className="text-white font-bold">0{activeIndex + 1}</span>
                <span className="mx-1">/</span>
                <span>0{total}</span>
              </div>
            </div>
          </div>
        ) : (
          /* =========================================================================
              MODE GRILLE DES 6 ENTREPRISES PARTENAIRES
             ========================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLIENT_PARTNERS.map((partner, index) => {
              const hasCustomImage = partner.image && partner.image.trim() !== '';
              const hasWebsite = partner.website && partner.website.trim() !== '' && partner.website !== 'in development';

              return (
                <div
                  key={partner.id}
                  className="group relative rounded-3xl bg-[#0E1015] border border-white/10 hover:border-[#E5B54F]/50 transition-all p-5 flex flex-col justify-between shadow-xl"
                >
                  <div>
                    {/* Image ou Placeholder Prymax */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-white/10 bg-zinc-950 flex items-center justify-center">
                      {hasCustomImage ? (
                        <img 
                          src={partner.image} 
                          alt={partner.name}
                          width={400}
                          height={250}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#12141A] to-[#0E0F14] p-4 text-center">
                          <img 
                            src={PRYMAX_PLACEHOLDER_LOGO} 
                            alt="PRYMAX Logo" 
                            width={40}
                            height={40}
                            loading="lazy"
                            decoding="async"
                            className="w-10 h-10 object-contain drop-shadow mb-1" 
                          />
                          <span className="text-[10px] font-mono text-zinc-400">PRYMAX STUDIO</span>
                        </div>
                      )}
                    </div>

                    {/* Logo & Nom */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white p-1 border border-white/20 shrink-0 overflow-hidden flex items-center justify-center">
                        <img src={partner.logo} alt={partner.name} width={40} height={40} loading="lazy" decoding="async" className="w-full h-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-white truncate">{partner.name}</h3>
                        <div className="text-[11px] text-zinc-400 truncate">{partner.sector}</div>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-300 line-clamp-2 mb-4">
                      {partner.highlight}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    {hasWebsite ? (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-white hover:text-[#E5B54F] inline-flex items-center gap-1.5"
                      >
                        <Globe className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Visiter</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-amber-400 font-mono text-[10px]">En développement</span>
                    )}

                    <button
                      onClick={onOpenContact}
                      className="text-zinc-400 hover:text-white text-xs font-semibold cursor-pointer"
                    >
                      Devis →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Projet Référence Phare DG */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#101217] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
              <Sparkles className="w-6 h-6 text-[#E5B54F]" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-[#E5B54F] font-semibold">Référence Phare</div>
              <h3 className="text-lg sm:text-xl font-bold text-white">DG — Dieu Est Grand</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Identité Visuelle, Logo vectoriel &amp; Collection Textile officielle</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onNavigate && (
              <button
                onClick={() => onNavigate('projets')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Voir tous les projets
              </button>
            )}
            <button
              onClick={onOpenContact}
              className="px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <span>Rejoindre nos clients</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
