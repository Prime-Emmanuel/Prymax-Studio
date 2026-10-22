import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  return (
    <footer className="bg-[#050608] border-t border-white/[0.08] text-white pt-16 pb-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Grille principale du footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Marque et description simple */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/src/assets/branding/icon_prymax.png" 
                alt="PRYMAX STUDIO" 
                className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded"
              />
              <span className="font-display text-xl sm:text-2xl font-extrabold tracking-wider text-white">
                PRYMAX <span className="font-light text-zinc-400">STUDIO</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-md leading-relaxed mb-6">
              Studio digital d'excellence. Nous accompagnons les entrepreneurs et les entreprises pour créer des sites web haute performance, des applications mobiles et des identités visuelles fortes.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-500 font-mono">
              <span>SITES WEB</span>
              <span aria-hidden="true" className="text-zinc-700">/</span>
              <span>APPLICATIONS MOBILES</span>
              <span aria-hidden="true" className="text-zinc-700">/</span>
              <span>BRANDING</span>
              <span aria-hidden="true" className="text-zinc-700">/</span>
              <span>TARIFS EN FCFA</span>
            </div>
          </div>

          {/* Liens du site alignés avec la nouvelle navigation */}
          <div className="lg:col-span-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3.5">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors py-1 inline-block">
                  Services
                </a>
              </li>
              <li>
                <a href="#projets" className="hover:text-white transition-colors py-1 inline-block">
                  Projets
                </a>
              </li>
              <li>
                <a href="#studio" className="hover:text-white transition-colors py-1 inline-block">
                  Studio (Approche &amp; Valeurs)
                </a>
              </li>
              <li>
                <a href="#devis" className="hover:text-white transition-colors py-1 inline-block">
                  Simulateur de Devis (FCFA)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF] mb-3">
                Un projet en tête ?
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Contactez notre équipe aujourd'hui pour obtenir une proposition claire et un devis personnalisé.
              </p>
              <button
                onClick={onOpenContact}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#1E5EFF] hover:bg-[#184FD8] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
              >
                <span>Démarrer un projet</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Barre de copyright sobre */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} PRYMAX STUDIO. Tous droits réservés.
          </div>
          <div className="text-zinc-600 text-[11px]">
            Conçu pour être rapide, élégant et ergonomique sur tous les écrans.
          </div>
        </div>

      </div>
    </footer>
  );
};
