import React from 'react';
import { CLIENT_PARTNERS } from '../data/agencyData';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ClientPartners: React.FC = () => {
  return (
    <section id="projets" className="py-20 sm:py-28 bg-[#090A0D] relative scroll-mt-20 border-t border-white/[0.08]">
      <div id="clients" className="sr-only" />
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* En-tête de section sobre et prestigieux */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white mb-2.5">
            <span>Références &amp; Collaborations</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>PRYMAX STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Des marques et projets accompagnés avec succès
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
            Chaque collaboration fait l'objet d'un accompagnement personnalisé pour sublimer l'identité visuelle et maximiser la portée digitale de nos partenaires.
          </p>
        </div>

        {/* Grille des collaborations réelles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Projet réel DG - Dieu Est Grand */}
          <div className="bg-[#101217] border border-white/10 hover:border-white/30 rounded-3xl p-6 sm:p-8 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase text-white px-2.5 py-0.5 bg-white/10 rounded-md border border-white/15">
                  Mode &amp; Textile
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Projet Déployé
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                DG — Dieu Est Grand
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Création de l'identité de marque complète, logo emblème typographique avec croix stylisée et déclinaisons visuelles textiles pour t-shirts et sweats à capuche.
              </p>

              <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-white/10 bg-black">
                <img 
                  src="/src/assets/branding/hero_planche_marque.png" 
                  alt="Planche de marque DG par Prymax Studio" 
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Logo original vectoriel haute définition</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Mockups 3D réalistes t-shirts et hoodies bordeaux</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Planche de présentation officielle de la marque</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
              <span className="font-mono">Branding · Textile · Design</span>
              <span className="text-white font-semibold">Référence Officielle</span>
            </div>
          </div>

          {/* Espace prêt pour les prochains partenaires */}
          <div className="bg-[#101217] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-mono uppercase text-zinc-400 px-2.5 py-0.5 bg-white/5 rounded-md">
                  Partenariats &amp; Entreprises
                </span>
                <span className="text-xs font-mono text-zinc-500">
                  Accompagnement Continu
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Votre Entreprise Ici
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Nous accompagnons les commerces, créateurs, indépendants et PME pour concevoir leurs sites web, logos et supports marketing.
              </p>

              <div className="aspect-[16/10] rounded-2xl border border-dashed border-white/15 bg-zinc-950/50 flex flex-col items-center justify-center p-6 text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-white mb-1">
                  Rejoignez nos clients satisfaits
                </div>
                <p className="text-xs text-zinc-400 max-w-xs">
                  Chaque projet est traité avec exigence, dans le respect strict de vos délais et de vos attentes.
                </p>
              </div>

              <div className="space-y-2 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Sites web rapides et adaptés aux smartphones</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Design graphique soigné et démarquage garanti</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <span>Suivi direct et réactif via WhatsApp</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-zinc-400">Prêt à démarrer ?</span>
              <a href="#devis" className="text-white font-bold hover:underline">
                Demander un Devis →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
