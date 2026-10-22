import React from 'react';
import { ArrowUpRight, Star, CheckCircle, Smartphone, Globe, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-[#08090D] text-white">
      {/* Lueur subtile en arrière-plan */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[500px] bg-[#1E5EFF]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* =========================================================================
              COLONNE GAUCHE : TEXTE, AVATARS ET CTA (Conforme au design de référence)
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Badge Avis / Satisfaction style Trustpilot */}
            <div className="self-start inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-xs text-zinc-300 mb-6">
              <div className="w-4 h-4 rounded bg-[#1E5EFF] flex items-center justify-center text-white text-[10px]">
                <Star className="w-2.5 h-2.5 fill-current" />
              </div>
              <span className="font-semibold text-white">4.9 sur 5</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400">Satisfaction clients certifiée</span>
            </div>

            {/* Titre principal avec avatars circulaires intégrés et mot en italique */}
            <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-extrabold tracking-tight text-white leading-[1.08] mb-6 text-balance">
              Connectez votre{' '}
              <span className="inline-flex items-center align-middle mx-1 -mt-1.5 gap-0">
                <span className="inline-flex items-center -space-x-2">
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#08090D] overflow-hidden inline-block bg-zinc-800 shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                      alt="Client" 
                      className="w-full h-full object-cover" 
                    />
                  </span>
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#08090D] overflow-hidden inline-block bg-zinc-700 shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" 
                      alt="Client" 
                      className="w-full h-full object-cover" 
                    />
                  </span>
                  <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#08090D] overflow-hidden inline-block bg-zinc-600 shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" 
                      alt="Client" 
                      className="w-full h-full object-cover" 
                    />
                  </span>
                </span>
              </span>{' '}
              <span className="font-serif italic font-normal text-[#1E5EFF] tracking-normal">
                Monde
              </span>{' '}
              au Digital.
            </h1>

            {/* Paragraphe de description simple et percutant */}
            <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl mb-8">
              PRYMAX STUDIO conçoit vos sites web sur-mesure, applications mobiles et identités visuelles pour propulser votre entreprise et conquérir de nouveaux marchés.
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

            {/* Rangée de statistiques clé (comme sur la référence) */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-4 sm:gap-8 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                  100<span className="text-sm font-semibold text-[#1E5EFF] ml-0.5">%</span>
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
                  50<span className="text-sm font-semibold text-[#1E5EFF] ml-0.5">+</span>
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Projets Déployés
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              COLONNE DROITE : PORTRAIT STUDIO ARQUÉ ET LES 4 BADGES FLOTTANTS
             ========================================================================= */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Conteneur principal de l'image avec arrondi doux (arche moderne) */}
            <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] rounded-[36px] sm:rounded-[44px] overflow-hidden border border-white/10 shadow-2xl bg-[#121418]">
              
              <img
                src="/src/assets/images/hero_creative_portrait_1792664030358.jpg"
                alt="Studio PRYMAX"
                className="w-full h-full object-cover object-center"
              />

              {/* Dégradé léger en bas pour la profondeur */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 1 (Haut Gauche) : Bleu avec grand chiffre 50+
               ------------------------------------------------------------- */}
            <div className="absolute -top-3 -left-3 sm:-left-6 p-3 sm:p-4 rounded-2xl bg-[#1E5EFF] text-white shadow-2xl border border-blue-400/30 z-20 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="text-xl sm:text-2xl font-black font-mono leading-none mb-1">
                50+
              </div>
              <div className="text-[11px] font-medium leading-tight text-blue-100 max-w-[90px]">
                Projets Livrés avec Succès
              </div>
            </div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 2 (Bas Gauche) : Carte blanche avec pills d'expertise
               ------------------------------------------------------------- */}
            <div className="absolute -bottom-4 -left-2 sm:-left-8 p-4 rounded-2xl bg-white text-zinc-900 shadow-2xl border border-black/5 z-20 max-w-[210px] sm:max-w-[230px] animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="text-xs font-bold text-zinc-900 mb-2">
                Nos Expertises Clés
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] font-semibold text-[#1E5EFF] bg-[#1E5EFF]/10 px-2 py-0.5 rounded-md">
                  + Web Design
                </span>
                <span className="text-[10px] font-semibold text-[#1E5EFF] bg-[#1E5EFF]/10 px-2 py-0.5 rounded-md">
                  + Mobile
                </span>
                <span className="text-[10px] font-semibold text-[#1E5EFF] bg-[#1E5EFF]/10 px-2 py-0.5 rounded-md">
                  + Branding
                </span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 3 (Haut Droite) : Pastilles blanches avec checkmarks
               ------------------------------------------------------------- */}
            <div className="absolute top-10 -right-2 sm:-right-6 flex flex-col gap-2 z-20 animate-in fade-in slide-in-from-right-2 duration-300">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-xl border border-black/5">
                <CheckCircle className="w-3.5 h-3.5 text-[#1E5EFF]" />
                <span>Sites Web &amp; E-Commerce</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-zinc-900 text-xs font-bold shadow-xl border border-black/5 self-end">
                <CheckCircle className="w-3.5 h-3.5 text-[#1E5EFF]" />
                <span>Applications Mobiles</span>
              </div>
            </div>

            {/* -------------------------------------------------------------
                BADGE FLOTTANT 4 (Bas Droite) : Badge bleu avec 100% sur-mesure
               ------------------------------------------------------------- */}
            <div className="absolute -bottom-3 -right-2 sm:-right-4 p-3.5 sm:p-4 rounded-2xl bg-[#1E5EFF] text-white shadow-2xl border border-blue-400/30 z-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="text-xl sm:text-2xl font-black font-mono leading-none mb-1">
                100%
              </div>
              <div className="text-[11px] font-medium leading-tight text-blue-100 max-w-[100px]">
                Sur-Mesure &amp; Accompagnement
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
