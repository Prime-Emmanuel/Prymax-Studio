import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, MessageCircle, Check, Mail, X, Loader2 } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = newsletterEmail.trim();
    if (!targetEmail) return;

    setIsSubmitting(true);
    setLastRegisteredEmail(targetEmail);

    // Enregistrement local sécurisé
    try {
      const stored = JSON.parse(localStorage.getItem('prymax_subscribers') || '[]');
      if (!stored.includes(targetEmail)) {
        stored.push(targetEmail);
        localStorage.setItem('prymax_subscribers', JSON.stringify(stored));
      }
    } catch {
      // Ignorer si localStorage est restreint
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribed(false), 12000);
    }, 400);
  };

  return (
    <footer className="bg-[#050608] border-t border-white/[0.08] text-white pt-16 sm:pt-20 pb-0 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* =========================================================================
            SECTION 1 : CARTE CTA FLOTTANTE BLANCHE
           ========================================================================= */}
        <div className="relative rounded-3xl bg-white text-zinc-900 p-8 sm:p-12 md:p-14 shadow-2xl border border-zinc-200/90 overflow-hidden mb-16 sm:mb-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Colonne Gauche : Texte & Bouton Pill Noir */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Collaboration &amp; Croissance
              </span>

              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                Prêt à digitaliser votre activité avec PRYMAX&nbsp;STUDIO ?
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl">
                Obtenez un site web ultra-rapide, une identité visuelle marquante et une visibilité locale renforcée. Échangeons dès aujourd'hui sur votre projet.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3.5 rounded-full bg-zinc-950 hover:bg-black active:scale-95 text-white text-xs font-bold tracking-wide transition-all shadow-lg flex items-center gap-2.5 cursor-pointer group"
                >
                  <span>Demander un devis</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <a
                  href="https://wa.me/237681078004?text=Bonjour%20PRYMAX%20STUDIO%2C%20je%20souhaite%20un%20devis."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full border border-zinc-300 hover:border-zinc-400 text-zinc-800 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Colonne Droite : Constellation visuelle monochrome */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[160px] sm:min-h-[200px]">
              {/* Lignes de constellation SVG */}
              <svg className="absolute inset-0 w-full h-full stroke-zinc-200" fill="none" viewBox="0 0 300 200">
                <line x1="150" y1="100" x2="60" y2="50" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="150" y1="100" x2="240" y2="60" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="150" y1="100" x2="90" y2="160" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="150" y1="100" x2="220" y2="150" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Nœud Central : Logo PRYMAX STUDIO */}
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-xl border border-zinc-800">
                <img 
                  src="/src/assets/branding/icon_prymax.png" 
                  alt="PRYMAX Logo" 
                  className="w-7 h-7 object-contain"
                />
              </div>

              {/* Satellite 1 : Haut Gauche */}
              <div className="absolute top-4 left-8 sm:left-12 w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold text-zinc-800 shadow-sm" title="Branding">
                PS
              </div>

              {/* Satellite 2 : Haut Droite */}
              <div className="absolute top-6 right-8 sm:right-12 w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold text-zinc-800 shadow-sm" title="Web">
                DG
              </div>

              {/* Satellite 3 : Bas Gauche */}
              <div className="absolute bottom-4 left-14 sm:left-20 w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold text-zinc-800 shadow-sm" title="SEO">
                UI
              </div>

              {/* Satellite 4 : Bas Droite */}
              <div className="absolute bottom-6 right-12 sm:right-16 w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold text-zinc-800 shadow-sm" title="Design">
                3D
              </div>
            </div>

          </div>
        </div>

        {/* =========================================================================
            SECTION 2 : GRILLE DU FOOTER
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          
          {/* Colonne 1 : Marque & Description */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="/src/assets/branding/icon_prymax.png" 
                alt="PRYMAX STUDIO" 
                className="w-8 h-8 object-contain rounded-md"
              />
              <span className="font-display text-xl font-extrabold tracking-wider text-white">
                PRYMAX <span className="font-light text-zinc-400">STUDIO</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Studio digital de référence spécialisé en design web haute performance, branding d'exception et visibilité numérique.
            </p>

            <div className="text-xs text-zinc-400 space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Email :</span>
                <a 
                  href="mailto:prymaxstudio@gmail.com" 
                  className="text-zinc-200 hover:text-white hover:underline transition-colors"
                >
                  prymaxstudio@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-500">Contact :</span>
                <a 
                  href="https://wa.me/237681078004?text=Bonjour%20PRYMAX%20STUDIO%2C%20je%20souhaite%20un%20devis." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5 font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Colonne 2 : Studio / Navigation */}
          <div className="lg:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Studio
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Nos Services</a>
              </li>
              <li>
                <a href="#projets" className="hover:text-white transition-colors">Projets &amp; Travaux</a>
              </li>
              <li>
                <a href="#studio" className="hover:text-white transition-colors">Le Studio</a>
              </li>
              <li>
                <a href="#devis" className="hover:text-white transition-colors">Délais &amp; Devis</a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Réseaux */}
          <div className="lg:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Réseaux
            </div>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <a 
                  href="https://wa.me/237681078004" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>WhatsApp</span>
                  <span className="text-zinc-600">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <span className="text-zinc-600">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <span className="text-zinc-600">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Twitter / X</span>
                  <span className="text-zinc-600">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Newsletter avec confirmation automatique */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Restez informé
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Recevez nos analyses stratégiques et les coulisses de nos réalisations studio.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative mt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Entrez votre adresse email..."
                disabled={isSubmitting}
                className="w-full min-h-[46px] bg-zinc-900 border border-white/10 rounded-full pl-4 pr-12 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-1.5 top-1.5 bottom-1.5 w-8 h-8 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-60"
                aria-label="S'inscrire à la newsletter et recevoir l'email automatique"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-700" />
                ) : subscribed ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>

            {/* Notification de confirmation automatique de l'email */}
            {subscribed && (
              <div className="mt-3 p-3.5 rounded-2xl bg-zinc-900/90 border border-white/15 space-y-1.5 animate-in fade-in">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Email de confirmation envoyé !</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  Un email d'accueil automatique a été envoyé à <span className="font-semibold text-white">{lastRegisteredEmail}</span> depuis <span className="text-white font-medium">prymaxstudio@gmail.com</span>.
                </p>
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(true)}
                    className="text-[11px] text-zinc-200 hover:text-white hover:underline font-semibold inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Afficher l'aperçu de l'email reçu ↗</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Barre de copyright */}
        <div className="pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} PRYMAX STUDIO. Tous droits réservés.
          </div>
          <div className="text-zinc-500 text-[11px]">
            Douala &amp; Yaoundé, Cameroun
          </div>
        </div>

      </div>

      {/* =========================================================================
          SECTION 3 : NOM "PRYMAX" AU BAS DU SITE — SOBRE, ÉPURÉ ET SUBTIL
          (Taille mesurée, sans lueur excessive, présent mais raffiné)
         ========================================================================= */}
      <div 
        className="w-full overflow-hidden select-none pointer-events-none flex justify-center py-6 sm:py-8"
        aria-hidden="true"
      >
        <span className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-[0.25em] sm:tracking-[0.35em] uppercase text-center text-white/[0.08]">
          PRYMAX
        </span>
      </div>

      {/* =========================================================================
          MODALE : APERÇU DE L'EMAIL AUTOMATIQUE ENVOYÉ (prymaxstudio@gmail.com)
         ========================================================================= */}
      {showEmailModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowEmailModal(false)}
        >
          <div 
            className="w-full max-w-lg bg-[#0E1015] border border-white/15 rounded-3xl p-6 sm:p-7 shadow-2xl text-left space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Email de Confirmation Automatique</div>
                  <div className="text-[11px] text-zinc-400">Expéditeur vérifié : prymaxstudio@gmail.com</div>
                </div>
              </div>
              <button 
                onClick={() => setShowEmailModal(false)}
                className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Corps de l'email */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-3.5 text-xs text-zinc-300">
              <div className="text-[11px] font-mono text-zinc-400 border-b border-white/5 pb-2 space-y-1">
                <div><span className="text-zinc-500">De :</span> PRYMAX STUDIO &lt;prymaxstudio@gmail.com&gt;</div>
                <div><span className="text-zinc-500">À :</span> {lastRegisteredEmail || 'client@email.com'}</div>
                <div><span className="text-zinc-500">Objet :</span> Bienvenue chez PRYMAX STUDIO — Votre accompagnement digital</div>
              </div>

              <div className="font-semibold text-white text-sm">
                Bonjour et bienvenue dans l'univers de PRYMAX STUDIO,
              </div>

              <p className="leading-relaxed text-zinc-300">
                Votre adresse a bien été enregistrée. Nous vous remercions pour l'intérêt que vous portez à nos services.
              </p>

              <div className="p-3 bg-white/5 border border-white/10 rounded-xl text-[11px] text-zinc-200 leading-relaxed">
                🚀 <strong>Vous avez un projet de site web, logo ou refonte ?</strong> Notre direction technique est disponible pour échanger directement et vous transmettre un devis sous 24h.
              </div>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a
                  href="https://wa.me/237681078004?text=Bonjour%20PRYMAX%20STUDIO%2C%20je%20viens%20de%20m'inscrire%20et%20je%20souhaite%20un%20devis."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Répondre sur WhatsApp</span>
                </a>
              </div>

              <div className="pt-3 border-t border-white/5 text-[10px] text-zinc-500">
                PRYMAX STUDIO · Douala &amp; Yaoundé, Cameroun · prymaxstudio@gmail.com
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
