import React from 'react';
import { Target, Zap, Shield, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const StudioSection: React.FC = () => {
  return (
    <section id="studio" className="py-20 sm:py-28 bg-[#08090D] relative border-t border-white/[0.08] scroll-mt-20">
      
      {/* Halo subtil monochrome */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-white/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* En-tête */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white mb-3">
            <span>Qui Sommes-Nous</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>L'ADN PRYMAX STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Un studio digital guidé par la précision, l'écoute et le résultat
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg mt-4 leading-relaxed">
            Chez PRYMAX STUDIO, nous refusons les sites génériques et les promesses creuses. Nous allions rigueur technique et sensibilité esthétique pour concevoir des produits digitaux qui marquent durablement les esprits.
          </p>
        </div>

        {/* Les 3 Piliers de Notre Approche */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          
          <div className="p-7 sm:p-8 bg-[#101217] rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                Pilier 01
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Clarté &amp; Simplicité
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Pas de jargon prétentieux. Nous traduisons vos besoins en solutions concrètes : des sites limpides, des logos faciles à décliner et des processus simples.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Communication directe &amp; fluide</span>
            </div>
          </div>

          <div className="p-7 sm:p-8 bg-[#101217] rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                Pilier 02
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Performance &amp; Mobile-First
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Plus de 80% de vos clients vous découvrent sur smartphone. Chaque interface est calibrée pour charger en moins d'une seconde et réagir au doigt et à l'œil.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Optimisation mobile garantie</span>
            </div>
          </div>

          <div className="p-7 sm:p-8 bg-[#101217] rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                <HeartHandshake className="w-6 h-6 text-white" />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                Pilier 03
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Engagement &amp; Suivi
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Nous ne disparaissons pas après la livraison. Vous bénéficiez d'une assistance réactive, de formations simples et d'un accompagnement sur la durée.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Accompagnement après livraison</span>
            </div>
          </div>

        </div>

        {/* Encadré d'engagement moral et éthique */}
        <div className="p-8 sm:p-10 bg-gradient-to-r from-[#101217] via-zinc-900/60 to-[#101217] rounded-2xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-[11px] font-mono uppercase tracking-wider text-white block mb-2">
              Notre Promesse
            </span>
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Vous êtes 100% propriétaire de vos créations et de votre code.
            </h4>
            <p className="text-xs sm:text-sm text-zinc-400">
              Aucun abonnement captif, aucun frais caché. Tous les fichiers sources, logos vectoriels et accès administrateurs vous sont remis à la livraison.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div className="text-xs font-semibold text-white">
              Garantie Studio<br />
              <span className="text-zinc-400 font-normal">Sans engagement</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
