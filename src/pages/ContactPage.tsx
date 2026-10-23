import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, Send, CheckCircle2, ShieldCheck, Sparkles, Phone, ArrowUpRight } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Création de Site Web Entreprise');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setSubmitted(true);
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
          <span>Douala, Cameroun · Disponible pour projets partout dans le monde</span>
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
          {/* Carte WhatsApp Direct */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0e1a14] to-[#0A0D0B] border border-emerald-500/20 shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366] mb-4">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Canal le plus rapide : WhatsApp</h3>
            <p className="text-xs sm:text-sm text-zinc-300 mb-6 leading-relaxed">
              Discutez directement en direct, envoyez vos maquettes ou vos références pour un premier avis technique gratuit.
            </p>
            <a
              href={whatsappDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Écrire sur WhatsApp (+237 681 078 004)</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Carte Localisation & Email */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0F1015] border border-white/10 space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0">
                <MapPin className="w-5 h-5 text-[#E5B54F]" />
              </div>
              <div>
                <h4 className="text-xs font-mono uppercase text-zinc-400">Localisation</h4>
                <div className="text-sm sm:text-base font-bold text-white mt-0.5">Douala, Cameroun</div>
                <div className="text-xs text-zinc-400 mt-1">Interventions à distance et sur site professionnel</div>
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
                <div className="text-xs text-zinc-400 mt-1">Réponse garantie sous 24h ouvrées</div>
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
                <div className="text-xs text-zinc-400 mt-1">Lundi au Samedi · 8h00 – 19h00</div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Formulaire Direct */}
        <div className="lg:col-span-7 bg-[#0F1015] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Envoyer un message ou demander un devis
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6">
                Remplissez ces quelques informations et nous vous répondrons avec une étude de faisabilité et un tarif clair.
              </p>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Nom complet ou Nom de l'Entreprise <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ex: Patrick Mbia / TPI Engineering"
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Téléphone / WhatsApp <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="ex: +237 6XX XXX XXX"
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    Adresse Email (facultatif)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ex: contact@entreprise.com"
                    className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Type de projet
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-white"
                >
                  <option value="Création de Site Web Entreprise">Création de Site Web Entreprise (Vitrine / Multi-pages)</option>
                  <option value="Site One-Page Express">Site One-Page Express (1 à 3 jours)</option>
                  <option value="Branding & Logo Original">Branding, Logo Original &amp; Charte Graphique</option>
                  <option value="Boutique en Ligne E-Commerce">Boutique en Ligne E-Commerce (Paiements Mobile Money)</option>
                  <option value="Design Graphique & Mockups Textiles">Design Graphique &amp; Mockups Textiles 3D</option>
                  <option value="Référencement SEO & Google Maps">Référencement SEO &amp; Google Maps Douala</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  Décrivez brièvement votre besoin
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Décrivez votre activité, vos attentes ou votre calendrier..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma demande de devis</span>
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
              <h3 className="text-2xl font-bold text-white">Message bien reçu, {fullName} !</h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Votre demande a été transmise avec succès à l'équipe PRYMAX STUDIO à Douala. Nous reprenons contact avec vous dans la journée au <span className="text-white font-bold">{phone}</span>.
              </p>
              <button
                onClick={() => setSubmitted(false)}
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
