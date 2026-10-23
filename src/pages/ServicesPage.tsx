import React from 'react';
import { SERVICES } from '../data/agencyData';
import { ServiceItem } from '../types';
import { ArrowRight, Sparkles, CheckCircle2, Shield, ArrowUpRight, MessageCircle } from 'lucide-react';

interface ServicesPageProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenContact: () => void;
  onNavigate: (route: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onOpenContact,
  onNavigate
}) => {
  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
      {/* Fil d'Ariane / Header */}
      <div className="mb-10 sm:mb-14">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Accueil
          </button>
          <span>/</span>
          <span className="text-white font-semibold">Nos Services</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E5B54F]" />
          <span>Expertises Digitales &amp; Créatives d'Élite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
          Des solutions sur-mesure pour propulser votre entreprise
        </h1>
        <p className="text-zinc-300 text-sm sm:text-lg max-w-2xl mt-4 leading-relaxed">
          De la conception de sites web haute performance au branding d'exception, nous accompagnons les entreprises avec exigence, rigueur et créativité.
        </p>
      </div>

      {/* Grille détaillée des services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-16">
        {SERVICES.map((service, index) => (
          <div 
            key={service.id}
            className="group relative rounded-3xl bg-[#0F1015] border border-white/10 hover:border-[#E5B54F]/50 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl hover:shadow-[0_10px_40px_rgba(229,181,79,0.12)]"
          >
            {/* Liseré lumineux au survol */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E5B54F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Image d'en-tête 4K */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 border-b border-white/10">
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1015] via-transparent to-black/30" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-[#E5B54F] border border-[#E5B54F]/30">
                  {service.number}
                </span>
                {service.badge && (
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-white/10 backdrop-blur-md text-white border border-white/20">
                    {service.badge}
                  </span>
                )}
              </div>

              {service.stats && (
                <div className="absolute bottom-3 right-3 text-[11px] font-mono px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-zinc-300 border border-white/10">
                  {service.stats}
                </div>
              )}
            </div>

            {/* Contenu */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2.5 group-hover:text-white transition-colors">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                  {service.summary}
                </p>

                {/* Livrables inclus */}
                <div className="space-y-2 mb-6">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-2">
                    Livrables Clés Inclus :
                  </div>
                  {service.deliverables.slice(0, 4).map((d, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B54F] shrink-0 mt-0.5" />
                      <span className="leading-snug">{d}</span>
                    </div>
                  ))}
                </div>

                {/* Badges technologies */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.technologies.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] font-mono text-zinc-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#E5B54F] transition-colors cursor-pointer group/link"
                >
                  <span>Détails &amp; Fiche Complète</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </button>

                <button
                  onClick={onOpenContact}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <span>Demander un devis</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Bannière de contact direct */}
      <div className="rounded-3xl bg-gradient-to-r from-[#12141C] via-[#101217] to-[#12141C] border border-white/10 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="max-w-xl text-center md:text-left">
          <span className="text-xs font-mono uppercase text-[#E5B54F] font-semibold tracking-wider block mb-1">
            Besoin d'un accompagnement personnalisé ?
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Discutons directement de vos objectifs d'entreprise
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Nous intervenons rapidement et avec rigueur pour concevoir votre site web et votre image de marque.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-all cursor-pointer shadow-lg"
          >
            Demander un devis
          </button>
          <button
            onClick={onOpenContact}
            className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Nous contacter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
