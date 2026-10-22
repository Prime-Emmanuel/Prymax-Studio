import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Star, CheckCircle, Sparkles, Code, Palette } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#08090D] text-white">
      {/* Lueur subtile en arrière-plan */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-[#1E5EFF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* =========================================================================
              COLONNE GAUCHE : TEXTE & CTA AVEC ANIMATION FADE-IN DEPUIS LA GAUCHE
             ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            
            {/* Badge Avis / Satisfaction style Trustpilot */}
            <div className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-zinc-300 mb-6">
              <div className="w-4 h-4 rounded bg-[#1E5EFF] flex items-center justify-center text-white text-[10px]">
                <Star className="w-2.5 h-2.5 fill-current" />
              </div>
              <span className="font-semibold text-white">4.9 sur 5</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-300">98% de satisfaction client</span>
            </div>

            {/* Titre principal avec mini-badges de savoir-faire authentiques (pas de faux avatars IA) */}
            <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-extrabold tracking-tight text-white leading-[1.08] mb-6 text-balance">
              Connectez votre{' '}
              <span className="inline-flex items-center align-middle mx-1 -mt-1.5 gap-1.5">
                <span className="inline-flex items-center -space-x-1.5 bg-black/40 p-1 rounded-full border border-white/10 shadow-lg">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#1E5EFF] flex items-center justify-center text-white shadow-sm" title="Branding">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white shadow-sm border border-white/10" title="Code & Web">
                    <Code className="w-3.5 h-3.5 text-[#1E5EFF]" />
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white shadow-sm border border-white/10" title="Design">
                    <Palette className="w-3.5 h-3.5 text-amber-400" />
                  </span>
                </span>
              </span>{' '}
              <span className="font-serif italic font-normal text-[#1E5EFF] tracking-normal">
                Marque
              </span>{' '}
              au{' '}
              <span className="bg-gradient-to-r from-[#FFE58F] via-[#F5D061] to-[#E5B54F] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,208,97,0.55)] font-black">
                Monde
              </span>{' '}
              Digital.
            </h1>

            {/* Paragraphe de description direct et professionnel */}
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl mb-8">
              PRYMAX STUDIO conçoit vos sites web sur-mesure, vos logos et vos identités visuelles pour démarquer votre entreprise et attirer des clients qualifiés.
            </p>

            {/* Bouton d'action principal Bleu Électrique (#1E5EFF) */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={onOpenContact}
                className="min-h-[50px] px-7 py-3.5 text-sm font-semibold text-white bg-[#1E5EFF] hover:bg-[#184FD8] active:bg-[#1340B5] rounded-xl transition-all duration-150 shadow-[0_4px_25px_rgba(30,94,255,0.4)] hover:shadow-[0_6px_30px_rgba(30,94,255,0.55)] flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Démarrer un projet — Gratuit</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>

            {/* Rangée de statistiques clé (98% satisfaction, 5+ ans, 10+ projets) */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 sm:gap-8 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  98<span className="text-sm font-semibold text-[#1E5EFF] ml-0.5">%</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Satisfaction Client
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  5<span className="text-sm font-semibold text-[#1E5EFF] ml-0.5">+ Ans</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  D'Expérience Studio
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  10<span className="text-sm font-semibold text-[#1E5EFF] ml-0.5">+</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Projets Déployés
                </div>
              </div>
            </div>

          </motion.div>

          {/* =========================================================================
              COLONNE DROITE : PLANCHE DE MARQUE RÉELLE AVEC ANIMATION FADE-IN DEPUIS LE HAUT
             ========================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            
            {/* Conteneur principal avec l'image authentique entièrement visible (contained) */}
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] aspect-[4/5] rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#480004] flex items-center justify-center p-2.5 sm:p-3.5">
              
              <img
                src="/src/assets/branding/hero_planche_marque.png"
                alt="Planche de marque DG créée par PRYMAX STUDIO"
                className="w-full h-full object-contain object-center drop-shadow-xl"
              />
            </div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 1 (Haut Gauche) : 10+ Projets Réalisés
               ------------------------------------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-3 -left-2 sm:-left-6 p-3 sm:p-4 rounded-2xl bg-[#1E5EFF] text-white shadow-2xl border border-blue-400/30 z-20"
            >
              <div className="text-xl sm:text-2xl font-black font-mono leading-none mb-1">
                10+
              </div>
              <div className="text-[11px] font-medium leading-tight text-blue-100 max-w-[90px]">
                Projets Réalisés avec Succès
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 2 (Bas Gauche) : Carte blanche avec pills d'expertise
               ------------------------------------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="absolute -bottom-4 -left-2 sm:-left-6 p-4 rounded-2xl bg-white text-zinc-900 shadow-2xl border border-black/5 z-20 max-w-[210px] sm:max-w-[230px]"
            >
              <div className="text-xs font-bold text-zinc-900 mb-2">
                Nos Expertises Clés
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-semibold text-[#1E5EFF] bg-[#1E5EFF]/10 px-2 py-0.5 rounded-md">
                  + Branding
                </span>
                <span className="text-[10px] font-semibold text-[#1E5EFF] bg-[#1E5EFF]/10 px-2 py-0.5 rounded-md">
                  + Web Design
                </span>
                <span className="text-[10px] font-semibold text-[#1E5EFF] bg-[#1E5EFF]/10 px-2 py-0.5 rounded-md">
                  + Mobile
                </span>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 3 (Haut Droite) : Pastilles blanches avec checkmarks
               ------------------------------------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute top-8 -right-2 sm:-right-6 flex flex-col gap-2 z-20"
            >
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-xl border border-black/5">
                <CheckCircle className="w-3.5 h-3.5 text-[#1E5EFF]" />
                <span>Sites Web &amp; E-Commerce</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-xl border border-black/5 self-end">
                <CheckCircle className="w-3.5 h-3.5 text-[#1E5EFF]" />
                <span>Identité &amp; Logos</span>
              </div>
            </motion.div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 4 (Bas Droite) : 98% Satisfaction Clients
               ------------------------------------------------------------- */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="absolute -bottom-3 -right-2 sm:-right-4 p-3.5 sm:p-4 rounded-2xl bg-[#1E5EFF] text-white shadow-2xl border border-blue-400/30 z-20"
            >
              <div className="text-xl sm:text-2xl font-black font-mono leading-none mb-1">
                98%
              </div>
              <div className="text-[11px] font-medium leading-tight text-blue-100 max-w-[100px]">
                Satisfaction Clients Certifiée
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
