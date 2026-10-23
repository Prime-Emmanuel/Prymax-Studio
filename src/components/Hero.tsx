import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Star, CheckCircle, Sparkles, Code, Palette } from 'lucide-react';
import heroPlancheMarque from '../assets/branding/hero_planche_marque.png';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#08090D] text-white">
      {/* Halo subtil monochrome en arrière-plan */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-white/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* =========================================================================
              COLONNE GAUCHE : TEXTE & CTA AVEC ANIMATION FADE-IN DEPUIS LA GAUCHE
             ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            
            {/* Badge Avis / Satisfaction style Trustpilot Monochrome */}
            <div className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-zinc-300 mb-6">
              <div className="w-4 h-4 rounded bg-white flex items-center justify-center text-zinc-950 text-[10px]">
                <Star className="w-2.5 h-2.5 fill-current" />
              </div>
              <span className="font-semibold text-white">4.9 sur 5</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-300">98% de satisfaction client</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-3xl sm:text-5xl lg:text-[64px] font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.08] mb-6 text-balance">
              Connectez votre{' '}
              <span className="hidden sm:inline-flex items-center align-middle mx-1 -mt-1.5 gap-1.5">
                <span className="inline-flex items-center -space-x-1.5 bg-black/40 p-1 rounded-full border border-white/15 shadow-lg">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-zinc-950 shadow-sm" title="Branding">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white shadow-sm border border-white/10" title="Code & Web">
                    <Code className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white shadow-sm border border-white/10" title="Design">
                    <Palette className="w-3.5 h-3.5 text-zinc-300" />
                  </span>
                </span>
              </span>{' '}
              <span className="font-serif italic font-normal text-white tracking-normal">
                Marque
              </span>{' '}
              au{' '}
              <span className="bg-gradient-to-r from-[#FFE58F] via-[#F5D061] to-[#E5B54F] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,208,97,0.55)] font-black">
                Monde
              </span>{' '}
              Digital.
            </h1>

            {/* Paragraphe de description direct et professionnel */}
            <p className="text-sm sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl mb-7 sm:mb-8">
              PRYMAX STUDIO conçoit vos sites web sur-mesure, vos logos et vos identités visuelles pour démarquer votre entreprise et attirer des clients qualifiés.
            </p>

            {/* Bouton d'action principal Blanc Épuré */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-10 sm:mb-12">
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto min-h-[50px] px-8 py-3.5 text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 active:bg-zinc-300 rounded-xl transition-all duration-150 shadow-[0_4px_25px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Démarrer un projet — Gratuit</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Rangée de statistiques clé (98% satisfaction, 5+ ans, 10+ projets) */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-3 sm:gap-8 max-w-lg">
              <div>
                <div className="text-xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  98<span className="text-xs sm:text-sm font-semibold text-zinc-400 ml-0.5">%</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-400 mt-1">
                  Satisfaction Client
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  5<span className="text-xs sm:text-sm font-semibold text-zinc-400 ml-0.5">+ Ans</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-400 mt-1">
                  Expérience Studio
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  10<span className="text-xs sm:text-sm font-semibold text-zinc-400 ml-0.5">+</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-400 mt-1">
                  Projets Déployés
                </div>
              </div>
            </div>

          </motion.div>

          {/* =========================================================================
              COLONNE DROITE : PLANCHE DE MARQUE RÉELLE AVEC ANIMATION FADE-IN
             ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
          >
            
            {/* Conteneur principal avec l'image authentique entièrement visible (contained) */}
            <div className="relative w-full max-w-[340px] sm:max-w-[440px] aspect-[4/5] rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#480004] flex items-center justify-center p-2.5 sm:p-3.5">
              
              <img
                src={heroPlancheMarque}
                alt="Planche de marque DG créée par PRYMAX STUDIO"
                className="w-full h-full object-contain object-center drop-shadow-xl"
              />

              {/* Tag discret mobile sur l'image (haut gauche) */}
              <div className="sm:hidden absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3 h-3 text-white" />
                <span>Identité Visuelle Officielle</span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                CARTES TRUST DÉDIÉES MOBILE (< sm) — ZÉRO COLLISION, ZÉRO DÉBORDEMENT
               ------------------------------------------------------------- */}
            <div className="sm:hidden grid grid-cols-2 gap-2.5 w-full max-w-[340px] mt-3.5">
              <div className="p-3 rounded-2xl bg-[#101217] border border-white/15 text-left shadow-lg">
                <div className="text-lg font-black font-mono text-white leading-none mb-1">
                  10+
                </div>
                <div className="text-[11px] text-zinc-300 font-medium">
                  Projets Réalisés
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white text-zinc-950 text-left shadow-lg">
                <div className="text-lg font-black font-mono leading-none mb-1">
                  98%
                </div>
                <div className="text-[11px] text-zinc-800 font-semibold">
                  Satisfaction Client
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 1 (Haut Gauche) — ACTIF SUR TABLETTE & DESKTOP (sm:)
               ------------------------------------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden sm:block absolute -top-3 -left-4 md:-left-6 p-3 sm:p-4 rounded-2xl bg-[#0D0E12] text-white shadow-2xl border border-white/20 z-20 pointer-events-none"
            >
              <div className="text-xl sm:text-2xl font-black font-mono leading-none mb-1 text-white">
                10+
              </div>
              <div className="text-[11px] font-medium leading-tight text-zinc-300 max-w-[90px]">
                Projets Réalisés avec Succès
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 2 (Bas Gauche) — ACTIF SUR TABLETTE & DESKTOP (sm:)
               ------------------------------------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="hidden sm:block absolute -bottom-4 -left-4 md:-left-6 p-4 rounded-2xl bg-white text-zinc-900 shadow-2xl border border-black/10 z-20 max-w-[210px] sm:max-w-[230px] pointer-events-none"
            >
              <div className="text-xs font-bold text-zinc-900 mb-2">
                Nos Expertises Clés
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-semibold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md">
                  + Branding
                </span>
                <span className="text-[10px] font-semibold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md">
                  + Web Design
                </span>
                <span className="text-[10px] font-semibold text-zinc-900 bg-zinc-100 px-2 py-0.5 rounded-md">
                  + Mobile
                </span>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 3 (Haut Droite) — ACTIF SUR TABLETTE & DESKTOP (sm:)
               ------------------------------------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden sm:flex absolute top-8 -right-4 md:-right-6 flex-col gap-2 z-20 pointer-events-none"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-xl border border-black/5">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-950" />
                <span>Sites Web &amp; E-Commerce</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-xl border border-black/5 self-end">
                <CheckCircle className="w-3.5 h-3.5 text-zinc-950" />
                <span>Identité &amp; Logos</span>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 4 (Bas Droite) — ACTIF SUR TABLETTE & DESKTOP (sm:)
               ------------------------------------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="hidden sm:block absolute -bottom-3 -right-3 md:-right-4 p-3.5 sm:p-4 rounded-2xl bg-[#0D0E12] text-white shadow-2xl border border-white/20 z-20 pointer-events-none"
            >
              <div className="text-xl sm:text-2xl font-black font-mono leading-none mb-1 text-white">
                98%
              </div>
              <div className="text-[11px] font-medium leading-tight text-zinc-300 max-w-[100px]">
                Satisfaction Clients Certifiée
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
