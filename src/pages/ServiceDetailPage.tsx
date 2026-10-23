import React from 'react';
import { ServiceItem } from '../types';
import { ArrowLeft, CheckCircle2, ShieldCheck, ArrowUpRight, MessageCircle, Clock, Zap, Star } from 'lucide-react';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onBack: () => void;
  onOpenContact: () => void;
  onNavigate: (route: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onOpenContact,
  onNavigate
}) => {
  const whatsappUrl = `https://wa.me/237681078004?text=${encodeURIComponent(
    `Bonjour PRYMAX STUDIO, je souhaite me renseigner et obtenir un devis pour votre service : ${service.title}`
  )}`;

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
      {/* Bouton Retour & Fil d'Ariane */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux services</span>
        </button>

        <span className="text-zinc-600">/</span>
        <span className="text-xs font-mono text-zinc-400 truncate">{service.title}</span>
      </div>

      {/* Hero du Service */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-[#E5B54F]/10 border border-[#E5B54F]/30 text-[#E5B54F]">
              {service.number}
            </span>
            {service.badge && (
              <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/10 border border-white/15 text-white">
                {service.badge}
              </span>
            )}
            <span className="text-xs text-zinc-500">· Douala, Cameroun</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {service.title}
          </h1>

          <p className="text-base sm:text-xl text-zinc-300 font-medium leading-relaxed mb-6">
            {service.tagline}
          </p>

          <p className="text-sm text-zinc-400 leading-relaxed mb-8">
            {service.summary}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenContact}
              className="px-7 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold transition-all shadow-[0_4px_25px_rgba(255,255,255,0.25)] flex items-center gap-2 cursor-pointer group"
            >
              <span>Demander un devis pour ce service</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Échanger sur WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Image 4K Présentation avec liseré lumineux */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-950 aspect-[4/3]">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Accompagnement PRYMAX STUDIO</div>
                <div className="text-[11px] text-zinc-400">Freelance haut de gamme · Douala, Cameroun</div>
              </div>
              <Star className="w-4 h-4 text-[#E5B54F] fill-[#E5B54F]" />
            </div>
          </div>
        </div>
      </div>

      {/* Détails : Livrables & Technologies */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        {/* Colonne Livrables */}
        <div className="md:col-span-7 bg-[#0F1015] border border-white/10 rounded-3xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#E5B54F]" />
            <span>Livrables et spécifications complètes</span>
          </h2>
          <p className="text-xs text-zinc-400 mb-6">
            Chaque élément fait l'objet d'un contrôle rigoureux avant toute mise en ligne ou remise finale.
          </p>

          <div className="space-y-3.5">
            {service.deliverables.map((item, idx) => (
              <div 
                key={idx}
                className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-3"
              >
                <div className="w-5 h-5 rounded-md bg-[#E5B54F]/20 border border-[#E5B54F]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[10px] font-bold text-[#E5B54F]">✓</span>
                </div>
                <span className="text-xs sm:text-sm text-zinc-200 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne Idéal Pour & Technologies */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-[#0F1015] border border-white/10 rounded-3xl p-6 sm:p-7">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#E5B54F]" />
              <span>Pour qui ce service est-il idéal ?</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {service.idealFor}
            </p>
          </div>

          <div className="bg-[#0F1015] border border-white/10 rounded-3xl p-6 sm:p-7">
            <h3 className="text-base font-bold text-white mb-3">
              Technologies &amp; Outils déployés
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.technologies.map((t, i) => (
                <span 
                  key={i}
                  className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#0F1015] border border-white/10 rounded-3xl p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Garantie &amp; Suivi</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Assistance réactive après livraison, formation à l'administration et disponibilité directe via WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* CTA de bas de page */}
      <div className="text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#12141A] to-[#0A0B0E] border border-white/10">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Prêt à démarrer avec {service.title} ?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto mb-6">
          Recevez une estimation chiffrée gratuite et sans engagement sous quelques heures.
        </p>
        <button
          onClick={onOpenContact}
          className="px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all shadow-xl cursor-pointer"
        >
          Demander mon devis détaillé
        </button>
      </div>
    </div>
  );
};
