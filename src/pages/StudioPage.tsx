import React from 'react';
import { Target, Zap, HeartHandshake, ShieldCheck, CheckCircle2, Award, Clock, Sparkles, MessageCircle, ArrowUpRight } from 'lucide-react';
import iconPrymax from '../assets/branding/icon_prymax.png';

interface StudioPageProps {
  onOpenContact: () => void;
  onNavigate: (route: string) => void;
}

export const StudioPage: React.FC<StudioPageProps> = ({ onOpenContact, onNavigate }) => {
  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
      {/* En-tête */}
      <div className="mb-12 sm:mb-16">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3">
          <button 
            onClick={() => onNavigate('home')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Accueil
          </button>
          <span>/</span>
          <span className="text-white font-semibold">Le Studio</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E5B54F]" />
          <span>Freelance Studio Indépendant · Douala, Cameroun</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
          L'exigence du sur-mesure, l'agilité d'un studio indépendant
        </h1>
        <p className="text-zinc-300 text-sm sm:text-lg max-w-2xl mt-4 leading-relaxed">
          Chez PRYMAX STUDIO, nous travaillons en freelance avec un niveau d'exigence sans compromis. Pas d'intermédiaire, pas de bureaucratie : vous échangez directement avec le créateur de votre produit.
        </p>
      </div>

      {/* Carte Manifesto */}
      <div className="rounded-3xl bg-gradient-to-br from-[#111319] via-[#0D0E13] to-[#141620] border border-white/15 p-6 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
        <div className="max-w-3xl space-y-5">
          <div className="flex items-center gap-3">
            <img src={iconPrymax} alt="PRYMAX Logo" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              ADN &amp; Philosophie PRYMAX STUDIO
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
            « Nous croyons que chaque entreprise mérite une vitrine digitale aussi prestigieuse que son savoir-faire. »
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Dans un monde numérique saturé de templates génériques et de sites lents, PRYMAX STUDIO a été fondé pour apporter une alternative haut de gamme aux entreprises du Cameroun et d'ailleurs. Nous concevons chaque site, chaque logo et chaque détail comme une pièce unique d'artisanat digital.
          </p>

          <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/10 text-xs">
            <div>
              <div className="font-mono text-xl sm:text-2xl font-extrabold text-white">100%</div>
              <div className="text-zinc-400 mt-0.5">Sur-mesure &amp; Mobile-First</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-extrabold text-white">Douala</div>
              <div className="text-zinc-400 mt-0.5">Base d'opérations principale</div>
            </div>
            <div>
              <div className="font-mono text-xl sm:text-2xl font-extrabold text-white">Direct</div>
              <div className="text-zinc-400 mt-0.5">Contact WhatsApp réactif</div>
            </div>
          </div>
        </div>
      </div>

      {/* Les 3 Piliers */}
      <div className="mb-16">
        <div className="text-xs font-mono uppercase tracking-widest text-[#E5B54F] font-semibold mb-2">
          Nos Engagements Piliers
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-8">
          Comment nous garantissons l'excellence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1015] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                <Target className="w-6 h-6 text-[#E5B54F]" />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                Pilier 01
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Clarté &amp; Simplicité
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Zéro jargon inutile. Nous traduisons vos objectifs business en fonctionnalités claires, interfaces intuitives et chartes graphiques immédiatement applicables.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E5B54F]" />
              <span>Communication transparente</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1015] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                <Zap className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                Pilier 02
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Performance 100% Mobile
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Au Cameroun et en Afrique, la majorité de vos clients naviguent sur smartphone. Chaque site est optimisé pour charger instantanément même en connexion modeste.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6]" />
              <span>Score Core Web Vitals élevé</span>
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1015] border border-white/10 hover:border-white/30 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white mb-6">
                <HeartHandshake className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
                Pilier 03
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Accompagnement &amp; Suivi
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                La livraison n'est que le début. Vous bénéficiez d'une assistance réactive, d'une formation vidéo claire et d'une disponibilité continue pour vos futures évolutions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-zinc-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Disponibilité continue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Processus de Travail */}
      <div className="mb-16 rounded-3xl bg-[#0B0C10] border border-white/10 p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
          Notre processus de création en 4 étapes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <span className="font-mono text-xs text-[#E5B54F] font-bold">01 · Découverte &amp; Brief</span>
            <h4 className="text-sm font-bold text-white">Analyse de vos besoins</h4>
            <p className="text-xs text-zinc-400">Échange approfondi sur vos cibles, vos concurrents et vos objectifs chiffrés.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <span className="font-mono text-xs text-[#3B82F6] font-bold">02 · Design &amp; Prototype</span>
            <h4 className="text-sm font-bold text-white">Création visuelle</h4>
            <p className="text-xs text-zinc-400">Maquettes interactives, propositions de logos ou design d'interfaces adaptées.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <span className="font-mono text-xs text-emerald-400 font-bold">03 · Développement &amp; Tests</span>
            <h4 className="text-sm font-bold text-white">Codage &amp; Optimisation</h4>
            <p className="text-xs text-zinc-400">Intégration responsive, sécurisation HTTPS, tests vitesse et intégration WhatsApp.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
            <span className="font-mono text-xs text-white font-bold">04 · Livraison &amp; Suivi</span>
            <h4 className="text-sm font-bold text-white">Mise en ligne officielle</h4>
            <p className="text-xs text-zinc-400">Déploiement sur nom de domaine, remise des fichiers sources et formation.</p>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="text-center p-8 sm:p-12 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col items-center">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Prêt à collaborer avec PRYMAX STUDIO ?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mb-6">
          Nous sommes basés à Douala, Cameroun et disponibles pour vos projets partout dans le monde.
        </p>
        <button
          onClick={onOpenContact}
          className="px-8 py-3.5 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl cursor-pointer"
        >
          Demander un devis sans engagement
        </button>
      </div>
    </div>
  );
};
