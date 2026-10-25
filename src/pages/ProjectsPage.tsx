import React from 'react';
import { CLIENT_PARTNERS, PRYMAX_PLACEHOLDER_LOGO } from '../data/agencyData';
import { ExternalLink, ShieldCheck, CheckCircle2, Sparkles, ArrowUpRight, Globe, Layers } from 'lucide-react';
import heroPlancheMarque from '../assets/branding/hero_planche_marque.webp';

interface ProjectsPageProps {
  onOpenContact: () => void;
  onNavigate: (route: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenContact, onNavigate }) => {
  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
      {/* En-tête */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Accueil
          </button>
          <span>/</span>
          <span className="text-white font-semibold">Projets &amp; Entreprises</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E5B54F]" />
          <span>Entreprises Accompagnées · Références Officielles</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
          Entreprises et marques qui nous font confiance
        </h1>
        <p className="text-zinc-300 text-sm sm:text-lg max-w-2xl mt-4 leading-relaxed">
          Découvrez les entreprises pour lesquelles nous concevons des sites web, des identités visuelles et des solutions digitales sur-mesure.
        </p>
      </div>

      {/* Projet Vedette : DG — Dieu Est Grand */}
      <div className="mb-16 rounded-3xl bg-[#0F1015] border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B54F]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-xs font-semibold text-white">
              <span>Projet Phare · Mode &amp; Streetwear</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              DG — Dieu Est Grand
            </h2>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
              Création complète de l'identité de marque, logotype vectoriel haute définition avec croix stylisée et déclinaisons visuelles textiles réalistes sur t-shirts et pulls à capuche bordeaux.
            </p>

            <div className="space-y-2 pt-2 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E5B54F]" />
                <span>Identité visuelle originale &amp; pleine cession de droits</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E5B54F]" />
                <span>Mockups 3D réalistes pour communication réseaux sociaux</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#E5B54F]" />
                <span>Charte graphique complète &amp; planche officielle</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <span className="text-xs font-mono text-zinc-400">Statut : Déployé avec succès</span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs text-white font-semibold">Référence Officielle</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-black aspect-[16/10] shadow-xl">
              <img 
                src={heroPlancheMarque} 
                alt="Planche de marque DG par PRYMAX STUDIO" 
                width={640}
                height={400}
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Titre Grille Entreprises Partenaires */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Portefeuille d'entreprises clientes
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Chaque carte présente le logo officiel, l'image de l'entreprise et son lien web direct.
          </p>
        </div>
        <span className="font-mono text-xs text-[#E5B54F] px-3 py-1 rounded-full bg-[#E5B54F]/10 border border-[#E5B54F]/20 hidden sm:inline-block">
          {CLIENT_PARTNERS.length} Entreprises Actives
        </span>
      </div>

      {/* Grille des 6 entreprises partenaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
        {CLIENT_PARTNERS.map((partner) => {
          const hasCustomImage = partner.image && partner.image.trim() !== '';
          const hasWebsite = partner.website && partner.website.trim() !== '' && partner.website !== 'in development';

          return (
            <div
              key={partner.id}
              className="group relative rounded-3xl bg-[#0F1015] border border-white/10 hover:border-[#E5B54F]/40 transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between shadow-xl hover:shadow-[0_10px_35px_rgba(229,181,79,0.1)] overflow-hidden"
            >
              {/* Liseré lumineux running au survol */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5B54F]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Image principale ou Placeholder PRYMAX STUDIO */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-white/10 bg-zinc-950 flex items-center justify-center">
                  {hasCustomImage ? (
                    <img 
                      src={partner.image} 
                      alt={partner.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    /* Placeholder stylé avec l'emblème PRYMAX STUDIO officiel */
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#12141A] via-[#0E0F14] to-[#161822] p-6 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/15 flex items-center justify-center shadow-inner mb-2 group-hover:scale-110 transition-transform">
                        <img 
                          src={PRYMAX_PLACEHOLDER_LOGO} 
                          alt="PRYMAX STUDIO Placeholder" 
                          className="w-10 h-10 object-contain drop-shadow"
                        />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                        PRYMAX STUDIO DESIGN
                      </span>
                    </div>
                  )}

                  {/* Badge Secteur / Tag */}
                  {partner.tag && (
                    <span className="absolute top-3 left-3 text-[10px] font-mono font-semibold uppercase px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-white border border-white/15">
                      {partner.tag}
                    </span>
                  )}
                </div>

                {/* En-tête : Logo + Nom */}
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-12 h-12 rounded-xl bg-white p-1 border border-white/20 shrink-0 overflow-hidden shadow-sm flex items-center justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`Logo ${partner.name}`}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white truncate group-hover:text-white transition-colors">
                      {partner.name}
                    </h3>
                    <div className="text-xs text-zinc-400 truncate">
                      {partner.sector}
                    </div>
                  </div>
                </div>

                {/* Description de la mission */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {partner.highlight}
                </p>

                <div className="text-[11px] text-zinc-400 font-mono mb-4 bg-white/[0.02] p-2.5 rounded-xl border border-white/5">
                  <span className="text-zinc-500 block mb-0.5">Prestation :</span>
                  <span className="text-zinc-200">{partner.serviceProvided}</span>
                </div>
              </div>

              {/* Pied de carte avec lien de site web */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
                {hasWebsite ? (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-[#E5B54F] transition-colors group/link"
                  >
                    <Globe className="w-3.5 h-3.5 text-zinc-400 group-hover/link:text-[#E5B54F]" />
                    <span className="underline-offset-4 hover:underline">Visiter le site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span>Site en développement</span>
                  </span>
                )}

                <button
                  onClick={onOpenContact}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-[11px] transition-all cursor-pointer"
                >
                  Projet Similaire
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* CTA Collaboration */}
      <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-white/10 text-center relative overflow-hidden">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Votre entreprise mérite un site web et une image de marque d'exception
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-6">
          Nous collaborons avec les entreprises ambitieuses pour créer des plateformes digitales qui font la différence.
        </p>
        <button
          onClick={onOpenContact}
          className="px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer"
        >
          Démarrer une collaboration
        </button>
      </div>
    </div>
  );
};
