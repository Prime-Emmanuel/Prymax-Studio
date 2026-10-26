import React, { useState } from 'react';
import {
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Phone,
  ArrowUpRight,
  Loader2,
  Check,
} from 'lucide-react';
import { sendDemandEmail, detectActiveWebsiteLanguage } from '../utils/emailService';
import { useToast } from '../context/ToastContext';

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

const PROJECT_TYPE_CARDS = [
  'Création de Site Web Entreprise',
  'Site One-Page Express',
  'Branding & Logo Original',
  'Boutique en Ligne E-Commerce',
  'Design Graphique & Mockups Textiles',
  'Référencement SEO & Visibilité',
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slowHint, setSlowHint] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const toggleProjectType = (item: string) => {
    setSelectedTypes(prev =>
      prev.includes(item) ? prev.filter(t => t !== item) : [...prev, item]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSlowHint(null);
    setIsSubmitting(true);
    const activeLanguage = detectActiveWebsiteLanguage();

    try {
      const result = await sendDemandEmail(
        {
          type: 'contact-devis',
          language: activeLanguage,
          name: fullName,
          email,
          phone,
          services: selectedTypes,
          message,
          website_url: honeypot,
        },
        {
          onSlowRequest: hint => {
            setSlowHint(hint);
            showToast({
              title: 'Envoi en cours',
              message: hint,
              type: 'info',
              duration: 3000,
            });
          },
        }
      );

      setSubmittedRef(result.referenceId);
      showToast({
        title: 'Message transmis avec succès',
        message: `Votre demande (${result.referenceId}) a bien été envoyée par email.`,
        type: 'success',
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      showToast({
        title: 'Impossible d’envoyer le message',
        message: msg,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      setSlowHint(null);
    }
  };

  const whatsappDirectUrl = `https://wa.me/237681078004?text=${encodeURIComponent(
    `Bonjour PRYMAX STUDIO, je vous contacte depuis la page Contact de votre site web pour échanger sur mon projet.`
  )}`;

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
          <span className="text-white font-semibold">Contact &amp; Échange Direct</span>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#E5B54F]" />
          <span>Disponible pour vos projets digitaux et de marque</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
          Parlons concrètement de votre projet
        </h1>
        <p className="text-zinc-300 text-sm sm:text-lg max-w-2xl mt-4 leading-relaxed">
          Que ce soit pour un site web pour entreprise, une refonte, un logo ou une boutique e-commerce, nous vous répondons rapidement avec une proposition claire.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Colonne Coordonnées directes */}
        <div className="lg:col-span-5 space-y-6">
          {/* Carte Contact Direct */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0e1a14] to-[#0A0D0B] border border-emerald-500/20 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Canal le plus réactif</h3>
            <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">
              Discutez directement en direct, envoyez vos maquettes ou vos références pour un premier avis technique gratuit.
            </p>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Échanger en direct</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Carte Coordonnées & Email */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1015] border border-white/10 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                <Clock className="w-5 h-5 text-[#E5B54F]" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-400">Disponibilité</h4>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                  Lundi au Samedi · 8h00 – 19h00
                </div>
                <div className="text-xs text-zinc-400 mt-1">
                  Interventions et suivi de projet continu
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 border-t border-white/5">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                <Mail className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-400">Email Officiel</h4>
                <a
                  href="mailto:prymaxstudio@gmail.com"
                  className="text-sm sm:text-base font-bold text-white hover:text-zinc-300 hover:underline mt-0.5 block"
                >
                  prymaxstudio@gmail.com
                </a>
                <div className="text-xs text-zinc-400 mt-1">
                  Réponse garantie sous 24h ouvrées
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 pt-4 border-t border-white/5">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-400">Téléphone Direct</h4>
                <a
                  href="tel:+237681078004"
                  className="text-sm sm:text-base font-bold text-white hover:text-zinc-300 mt-0.5 block"
                >
                  +237 681 078 004
                </a>
                <div className="text-xs text-zinc-400 mt-1">
                  Lundi au Samedi · 8h00 – 19h00
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Formulaire Direct */}
        <div className="lg:col-span-7 bg-[#0F1015] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {!submittedRef ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Envoyer un message ou demander un devis
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                Sélectionnez le type de projet et vos coordonnées pour recevoir une étude de faisabilité et un tarif clair par email.
              </p>

              {/* Champ anti-robot invisible (Honeypot) */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-website-url">Site web (ne pas remplir)</label>
                <input
                  id="contact-website-url"
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Nom complet ou Nom de l'Entreprise <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="ex: Patrick Mbia / TPI Engineering"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Adresse Email <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="ex: contact@entreprise.com"
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    maxLength={40}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="ex: +237 6XX XXX XXX"
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-2">
                  Type de projet (Sélection libre)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PROJECT_TYPE_CARDS.map(item => {
                    const active = selectedTypes.includes(item);
                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleProjectType(item)}
                        className={`p-3 rounded-xl border text-xs text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          active
                            ? 'bg-white/[0.09] border-[#E5B54F] text-white font-bold'
                            : 'bg-zinc-900/80 border-white/10 text-zinc-300 hover:border-white/25'
                        }`}
                      >
                        <span>{item}</span>
                        {active && <Check className="w-3.5 h-3.5 text-[#E5B54F] shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Décrivez brièvement votre besoin (optionnel)
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Décrivez votre activité, vos attentes ou votre calendrier..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                />
              </div>

              {slowHint && (
                <div className="text-xs text-[#E5B54F] font-medium animate-pulse">
                  {slowHint}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Envoi en cours...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Demander un devis</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 text-[11px] text-zinc-400 pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Données confidentielles · Devis gratuit et sans engagement</span>
              </div>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-xs font-mono uppercase text-[#E5B54F] font-bold">
                RÉFÉRENCE : {submittedRef}
              </div>
              <h3 className="text-2xl font-bold text-white">
                Message bien reçu, {fullName} !
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Votre demande a été transmise avec succès à l'équipe PRYMAX STUDIO. Une confirmation a été adressée à <span className="text-white font-bold">{email}</span>.
              </p>
              <button
                onClick={() => setSubmittedRef(null)}
                className="px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs text-white font-semibold transition-colors cursor-pointer"
              >
                Envoyer une autre demande
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
