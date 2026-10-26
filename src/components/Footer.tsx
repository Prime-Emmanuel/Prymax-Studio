import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, MessageCircle, Check, Mail, X, Loader2 } from 'lucide-react';
import iconPrymax from '../assets/branding/icon_prymax.webp';
import { sendDemandEmail, detectActiveWebsiteLanguage, SupportedEmailLanguage } from '../utils/emailService';
import { useToast } from '../context/ToastContext';

interface FooterProps {
  onOpenContact: () => void;
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onNavigate }) => {
  const { showToast } = useToast();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastRegisteredEmail, setLastRegisteredEmail] = useState('');
  const [lastEmailLang, setLastEmailLang] = useState<SupportedEmailLanguage>('fr');
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleFooterNav = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const targetEmail = newsletterEmail.trim();
    if (!targetEmail) return;

    const activeLanguage = detectActiveWebsiteLanguage();
    setIsSubmitting(true);
    setSubscribed(false);

    try {
      const result = await sendDemandEmail(
        {
          type: 'newsletter',
          email: targetEmail,
          language: activeLanguage,
          website_url: honeypot,
        },
        {
          onSlowRequest: hint => {
            showToast({
              title: activeLanguage === 'en' ? 'Subscribing...' : 'Inscription en cours',
              message: hint,
              type: 'info',
              duration: 2800,
            });
          },
        }
      );

      setNewsletterEmail('');

      if (result.alreadySubscribed) {
        showToast({
          title: activeLanguage === 'en' ? 'Already subscribed' : 'Vous êtes déjà inscrit',
          message:
            result.message ||
            (activeLanguage === 'en'
              ? 'This email address is already subscribed to the PRYMAX STUDIO newsletter.'
              : 'Cette adresse email est déjà inscrite à la newsletter PRYMAX STUDIO.'),
          type: 'info',
        });
        return;
      }

      setLastRegisteredEmail(targetEmail.toLowerCase());
      setLastEmailLang(activeLanguage);
      setSubscribed(true);
      showToast({
        title:
          activeLanguage === 'en'
            ? "Welcome to PRYMAX STUDIO | You're subscribed"
            : 'Bienvenue chez PRYMAX STUDIO | Vous êtes inscrit',
        message:
          activeLanguage === 'en'
            ? `A confirmation email has been sent to ${targetEmail.toLowerCase()}.`
            : `Un email de confirmation a été envoyé à ${targetEmail.toLowerCase()}.`,
        type: 'success',
      });
      setTimeout(() => setSubscribed(false), 12000);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : activeLanguage === 'en'
            ? 'Unable to complete your subscription.'
            : 'Impossible de finaliser votre inscription.';
      showToast({
        title: activeLanguage === 'en' ? 'Subscription incomplete' : 'Inscription non complétée',
        message: msg,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#050608] border-t border-white/[0.08] text-white pt-16 sm:pt-20 pb-0 overflow-hidden relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* =========================================================================
            SECTION 1 : CARTE CTA FLOTTANTE BLANCHE
           ========================================================================= */}
        <div className="relative rounded-3xl bg-white text-zinc-900 p-6 sm:p-10 md:p-14 shadow-2xl border border-zinc-200/90 overflow-hidden mb-14 sm:mb-20">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Colonne Gauche : Texte & Bouton Pill Noir */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-600">
                Collaboration &amp; Croissance
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 leading-tight">
                Prêt à digitaliser votre activité avec PRYMAX&nbsp;STUDIO ?
              </h2>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-xl">
                Obtenez un site web ultra-rapide, une identité visuelle marquante et une visibilité locale renforcée. Échangeons dès aujourd'hui sur votre projet.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={onOpenContact}
                  className="px-6 py-3.5 rounded-full bg-zinc-950 hover:bg-black active:scale-95 text-white text-xs font-bold tracking-wide transition-all shadow-lg flex items-center gap-2.5 cursor-pointer group min-h-[44px]"
                >
                  <span>Demander un devis</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                <button
                  onClick={onOpenContact}
                  className="px-5 py-3 rounded-full border border-zinc-300 hover:border-zinc-400 text-zinc-800 text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>Nous contacter</span>
                </button>
              </div>
            </div>

            {/* Colonne Droite : Constellation visuelle monochrome responsive */}
            <div className="lg:col-span-5 relative flex items-center justify-center w-full max-w-[280px] sm:max-w-[320px] mx-auto aspect-[3/2] py-4">
              {/* Lignes de constellation SVG adaptatives */}
              <svg className="absolute inset-0 w-full h-full stroke-zinc-200 pointer-events-none" fill="none" viewBox="0 0 300 200" preserveAspectRatio="xMidYMid meet">
                <line x1="150" y1="100" x2="60" y2="50" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="150" y1="100" x2="240" y2="60" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="150" y1="100" x2="90" y2="160" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="150" y1="100" x2="220" y2="150" strokeWidth="1" strokeDasharray="3 3" />
              </svg>

              {/* Nœud Central : Logo PRYMAX STUDIO */}
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center shadow-xl border border-zinc-800">
                <img 
                  src={iconPrymax} 
                  alt="PRYMAX Logo" 
                  width={28}
                  height={28}
                  loading="lazy"
                  decoding="async"
                  className="w-7 h-7 object-contain"
                />
              </div>

              {/* Satellite 1 : Haut Gauche */}
              <div className="absolute top-[12%] left-[10%] w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold text-zinc-800 shadow-sm" title="Branding">
                PS
              </div>

              {/* Satellite 2 : Haut Droite */}
              <div className="absolute top-[15%] right-[10%] w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold text-zinc-800 shadow-sm" title="Web">
                DG
              </div>

              {/* Satellite 3 : Bas Gauche */}
              <div className="absolute bottom-[12%] left-[16%] w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold text-zinc-800 shadow-sm" title="SEO">
                UI
              </div>

              {/* Satellite 4 : Bas Droite */}
              <div className="absolute bottom-[15%] right-[14%] w-8 h-8 rounded-full bg-zinc-100 border border-zinc-300 flex items-center justify-center text-[10px] font-bold text-zinc-800 shadow-sm" title="Design">
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
                src={iconPrymax} 
                alt="PRYMAX STUDIO" 
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
                className="w-8 h-8 object-contain rounded-md"
              />
              <span className="font-display text-xl font-extrabold tracking-wider text-white">
                PRYMAX <span className="font-light text-zinc-400">STUDIO</span>
              </span>
            </div>

            <p className="text-xs text-zinc-300 max-w-sm leading-relaxed">
              Studio digital de référence spécialisé en design web haute performance, branding d'exception et visibilité numérique.
            </p>

            <div className="text-xs text-zinc-300 space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Email :</span>
                <a 
                  href="mailto:prymaxstudio@gmail.com" 
                  className="text-zinc-200 hover:text-white hover:underline transition-colors py-1"
                >
                  prymaxstudio@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">Contact :</span>
                <a 
                  href="https://wa.me/237681078004?text=Bonjour%20PRYMAX%20STUDIO%2C%20je%20souhaite%20un%20devis." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5 font-medium py-1"
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
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li>
                <button 
                  onClick={() => handleFooterNav('services')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1.5 inline-block"
                >
                  Nos Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('projets')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1.5 inline-block"
                >
                  Projets &amp; Travaux
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('studio')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1.5 inline-block"
                >
                  Le Studio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('devis')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1.5 inline-block"
                >
                  Délais &amp; Devis
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterNav('contact')} 
                  className="hover:text-white transition-colors cursor-pointer text-left py-1.5 inline-block"
                >
                  Contact Direct
                </button>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Réseaux */}
          <div className="lg:col-span-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Réseaux Officiels
            </div>
            <ul className="space-y-1.5 text-xs text-zinc-300">
              <li>
                <a 
                  href="https://tiktok.com/@prymaxstudio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 py-1.5"
                >
                  <span>TikTok</span>
                  <span className="text-zinc-400" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://instagram.com/prymaxstudio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 py-1.5"
                >
                  <span>Instagram</span>
                  <span className="text-zinc-400" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/237681078004" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 py-1.5"
                >
                  <span>WhatsApp</span>
                  <span className="text-zinc-400" aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://facebook.com/prymaxstudio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 py-1.5"
                >
                  <span>Facebook</span>
                  <span className="text-zinc-400" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Newsletter avec confirmation automatique */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              Restez informé
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Recevez nos analyses stratégiques et les coulisses de nos réalisations studio.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="relative mt-2">
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="footer-website-url">Ne pas remplir ce champ</label>
                <input
                  id="footer-website-url"
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Votre adresse email pour la newsletter
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Entrez votre adresse email..."
                disabled={isSubmitting}
                className="w-full min-h-[48px] bg-zinc-900 border border-white/10 rounded-full pl-4 pr-14 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-white disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-1.5 top-1.5 bottom-1.5 w-9 h-9 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 flex items-center justify-center transition-colors cursor-pointer disabled:opacity-60"
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
                  <span>Inscription confirmée !</span>
                </div>
                <p className="text-[11px] text-zinc-300 leading-snug">
                  Un email de confirmation a été envoyé à <span className="font-semibold text-white">{lastRegisteredEmail}</span> par <span className="text-white font-medium">PRYMAX STUDIO &lt;hello@prymaxstudio.com&gt;</span>.
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
        <div className="pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
          <div>
            &copy; {new Date().getFullYear()} PRYMAX STUDIO. Tous droits réservés.
          </div>
          <div className="text-zinc-400 text-[11px]">
            Conception Digitale &amp; Web Haute Performance
          </div>
        </div>

      </div>

      {/* =========================================================================
          SECTION 3 : NOM "PRYMAX" AU BAS DU SITE — SOBRE, ÉPURÉ ET SUBTIL
          (Taille mesurée, sans lueur excessive, présent mais raffiné)
         ========================================================================= */}
      <div 
        className="w-full overflow-hidden select-none pointer-events-none flex justify-center py-6 sm:py-8 px-4"
        aria-hidden="true"
      >
        <span className="font-display font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.18em] sm:tracking-[0.3em] uppercase text-center text-white/[0.08] max-w-full">
          PRYMAX
        </span>
      </div>

      {/* =========================================================================
          MODALE : APERÇU DE L'EMAIL AUTOMATIQUE ENVOYÉ (hello@prymaxstudio.com)
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
                  <div className="text-xs font-semibold text-white">
                    {lastEmailLang === 'en' ? 'Automatic Confirmation Email' : 'Email de Confirmation Automatique'}
                  </div>
                  <div className="text-[11px] text-zinc-400">PRYMAX STUDIO &lt;hello@prymaxstudio.com&gt;</div>
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

            {/* En-têtes de l'email */}
            <div className="text-[11px] font-mono text-zinc-400 px-1 space-y-1">
              <div><span className="text-zinc-500">{lastEmailLang === 'en' ? 'From:' : 'De :'}</span> PRYMAX STUDIO &lt;hello@prymaxstudio.com&gt;</div>
              <div><span className="text-zinc-500">{lastEmailLang === 'en' ? 'Reply-To:' : 'Répondre à :'}</span> prymaxstudio@gmail.com</div>
              <div><span className="text-zinc-500">{lastEmailLang === 'en' ? 'To:' : 'À :'}</span> {lastRegisteredEmail || 'client@email.com'}</div>
              <div>
                <span className="text-zinc-500">{lastEmailLang === 'en' ? 'Subject:' : 'Objet :'}</span>{' '}
                {lastEmailLang === 'en'
                  ? "Welcome to PRYMAX STUDIO | You're subscribed"
                  : 'Bienvenue chez PRYMAX STUDIO | Vous êtes inscrit'}
              </div>
            </div>

            {/* Corps de l'email minimaliste fond blanc */}
            <div className="p-6 rounded-2xl bg-white text-[#111111] border border-zinc-200 space-y-4 text-xs leading-relaxed">
              <div>
                <img
                  src="https://www.prymaxstudio.com/assets/branding/logo_transparent.png"
                  alt="PRYMAX STUDIO"
                  className="w-[104px] h-auto block"
                />
                <div className="w-9 h-[2px] bg-[#B99A5B] mt-4" />
              </div>

              {lastEmailLang === 'en' ? (
                <div className="space-y-3 text-[#1A1A1A]">
                  <p className="font-medium text-[#111111]">Hello,</p>
                  <p>Welcome to PRYMAX STUDIO, and thank you for subscribing.</p>
                  <p>
                    You&apos;ll receive our latest news, strategic insights, digital inspiration, and behind-the-scenes updates from our studio.
                  </p>
                  <p>
                    Our goal is to share useful ideas and perspectives to help you strengthen your brand and digital presence.
                  </p>
                  <p className="pt-2 text-[#111111]">
                    See you soon,
                    <br />
                    <strong className="font-semibold">The PRYMAX STUDIO Team</strong>
                  </p>
                </div>
              ) : (
                <div className="space-y-3 text-[#1A1A1A]">
                  <p className="font-medium text-[#111111]">Bonjour,</p>
                  <p>Bienvenue chez PRYMAX STUDIO et merci de votre inscription.</p>
                  <p>
                    Vous recevrez nos actualités, nos analyses stratégiques, nos inspirations digitales et les coulisses de nos réalisations.
                  </p>
                  <p>
                    Nous souhaitons vous partager des idées pertinentes et des perspectives utiles pour faire évoluer votre marque et renforcer votre présence digitale.
                  </p>
                  <p className="pt-2 text-[#111111]">
                    À très bientôt,
                    <br />
                    <strong className="font-semibold">L&apos;équipe PRYMAX STUDIO</strong>
                  </p>
                </div>
              )}

              <div className="pt-3 border-t border-zinc-200 text-[11px] text-zinc-500">
                <div className="font-semibold text-[#111111]">PRYMAX STUDIO</div>
                <div>prymaxstudio.com · prymaxstudio@gmail.com</div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                {lastEmailLang === 'en' ? 'Close' : 'Fermer'}
              </button>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
};
