import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Star, Sparkles, Code, Palette, MapPin } from 'lucide-react';
import heroPlancheMarque from '../assets/branding/hero_planche_marque.png';
import enterpriseHeroImg from '../assets/images/digital_enterprise_hero_1792588771383.jpg';

interface HeroProps {
  onOpenContact: () => void;
  onNavigate?: (route: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onNavigate }) => {
  return (
    <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#08090D] text-white">
      {/* =========================================================================
          ARRIÈRE-PLAN HERO MOBILE STYLÉ (Image de fond professionnelle avec dégradé sombre)
         ========================================================================= */}
      <div className="sm:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        <img 
          src={enterpriseHeroImg} 
          alt="PRYMAX STUDIO Création de sites web" 
          className="w-full h-full object-cover object-center filter saturate-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090D]/80 via-[#08090D]/90 to-[#08090D]" />
      </div>

      {/* Halo subtil monochrome & doré sur desktop */}
      <div className="hidden sm:block absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-to-br from-white/[0.04] to-[#E5B54F]/[0.03] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* =========================================================================
              COLONNE GAUCHE : TITRE ENTREPRISES, TEXTE, CTA AVEC UNDERLINE ANIMÉ & STATS
             ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            
            {/* Badge Avis & Localisation Douala, Cameroun */}
            <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-xs text-zinc-300 mb-6 shadow-sm">
              <div className="w-4 h-4 rounded-full bg-[#E5B54F] flex items-center justify-center text-zinc-950 text-[10px] font-bold">
                <Star className="w-2.5 h-2.5 fill-current" />
              </div>
              <span className="font-bold text-white">4.9 / 5</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-200">Freelance Studio</span>
              <span className="text-zinc-500">·</span>
              <span className="flex items-center gap-1 text-[#E5B54F] font-semibold">
                <MapPin className="w-3 h-3 text-[#E5B54F]" />
                <span>Douala, Cameroun</span>
              </span>
            </div>

            {/* Titre principal : Sites Web d'exception pour les Entreprises */}
            <h1 className="text-3xl sm:text-5xl lg:text-[62px] font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.08] mb-6 text-balance">
              Nous concevons des{' '}
              <span className="hidden sm:inline-flex items-center align-middle mx-1 -mt-1.5 gap-1.5">
                <span className="inline-flex items-center -space-x-1.5 bg-black/50 p-1 rounded-full border border-white/15 shadow-xl">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-zinc-950 shadow-sm" title="Sites Web & Code">
                    <Code className="w-3.5 h-3.5 text-zinc-950" />
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white shadow-sm border border-white/10" title="Branding & Identité">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white shadow-sm border border-white/10" title="Design Graphique">
                    <Palette className="w-3.5 h-3.5 text-[#E5B54F]" />
                  </span>
                </span>
              </span>{' '}
              <span className="font-serif italic font-normal text-white tracking-normal">
                Sites Web
              </span>{' '}
              d'exception pour les{' '}
              <span className="bg-gradient-to-r from-[#FFE58F] via-[#F5D061] to-[#E5B54F] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,208,97,0.55)] font-black">
                Entreprises
              </span>.
            </h1>

            {/* Paragraphe de description clair et engageant */}
            <p className="text-sm sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl mb-7 sm:mb-8">
              PRYMAX STUDIO conçoit vos sites internet sur-mesure pour entreprises, vos logos et vos identités de marque pour vous démarquer et convertir vos visiteurs en clients fidèles.
            </p>

            {/* Bouton d'action principal Blanc avec animation subtile de soulignement */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-10 sm:mb-12">
              <div className="relative inline-flex flex-col items-center">
                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 active:bg-zinc-300 rounded-xl transition-all duration-150 shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.35)] flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Démarrer un projet — Gratuit</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {/* Animation subtile de soulignement sous le bouton */}
                <div 
                  className="w-4/5 h-[2.5px] mt-2 rounded-full animate-underline-shimmer pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #E5B54F 50%, transparent 100%)'
                  }}
                />
              </div>
            </div>

            {/* =========================================================================
                STATISTIQUES RESTYLÉES : "EXPÉRIENCE" (ET NON "EXPÉRIENCE STUDIO")
               ========================================================================= */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-3 sm:gap-8 max-w-lg">
              {/* Stat 1 : Satisfaction Client */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-2 sm:p-3 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  98<span className="text-xs sm:text-sm font-bold text-[#E5B54F] ml-0.5">%</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-300 mt-1 font-medium">
                  Satisfaction Client
                </div>
              </motion.div>

              {/* Stat 2 : Expérience (exactement ce que l'utilisateur a demandé) */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-2 sm:p-3 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  5<span className="text-xs sm:text-sm font-bold text-[#E5B54F] ml-0.5">+ Ans</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-300 mt-1 font-medium">
                  Expérience
                </div>
              </motion.div>

              {/* Stat 3 : Projets Déployés */}
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-2 sm:p-3 rounded-2xl bg-white/[0.02] border border-white/5"
              >
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  10<span className="text-xs sm:text-sm font-bold text-[#E5B54F] ml-0.5">+</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-300 mt-1 font-medium">
                  Projets Déployés
                </div>
              </motion.div>
            </div>

          </motion.div>

          {/* =========================================================================
              COLONNE DROITE : PLANCHE DE MARQUE DG RÉELLE
             ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
          >
            
            {/* Conteneur principal avec l'image authentique */}
            <div className="relative w-full max-w-[340px] sm:max-w-[440px] aspect-[4/5] rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#480004] flex items-center justify-center p-2.5 sm:p-3.5 group">
              
              <img
                src={heroPlancheMarque}
                alt="Planche de marque DG créée par PRYMAX STUDIO"
                className="w-full h-full object-contain object-center drop-shadow-xl group-hover:scale-105 transition-transform duration-700"
              />

              {/* Tag discret sur l'image */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3 h-3 text-[#E5B54F]" />
                <span>Identité Visuelle Officielle DG</span>
              </div>

              {/* Tag localisation Douala */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-300 flex items-center gap-1 shadow-md">
                <MapPin className="w-3 h-3 text-[#E5B54F]" />
                <span>Douala, Cameroun</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
