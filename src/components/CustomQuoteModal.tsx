import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Send,
  Sparkles,
  Check,
  Loader2,
  Layers,
  Target,
  Palette,
  Cpu,
  Clock,
  Wallet,
  FileCheck,
} from 'lucide-react';
import { sendDemandEmail, detectActiveWebsiteLanguage } from '../utils/emailService';
import { useToast } from '../context/ToastContext';

interface CustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServices?: string[];
}

export const SECTOR_CARDS = [
  { id: 'b2b', label: 'Entreprise & Services B2B', sub: 'Cabinet, ingénierie, conseil' },
  { id: 'ecom', label: 'Commerce & Boutique', sub: 'Vente de produits, distribution' },
  { id: 'immo', label: 'Immobilier & BTP', sub: 'Promotion, architecture, logistique' },
  { id: 'fashion', label: 'Mode & Marque Textile', sub: 'Prêt-à-porter, streetwear, accessoires' },
  { id: 'hospitality', label: 'Tourisme, Hôtel & Restaurant', sub: 'Réservation, loisirs, événementiel' },
  { id: 'other', label: 'Autre Projet Sur-Mesure', sub: 'Startup, institution, projet spécial' },
];

export const GOAL_CARDS = [
  { id: 'leads', label: 'Obtenir plus de clients', sub: 'Génération de demandes qualifiées' },
  { id: 'credibility', label: 'Image haut de gamme', sub: 'Inspirer confiance immédiatement' },
  { id: 'sales', label: 'Vendre en ligne 24h/24', sub: 'Catalogue & encaissement fluide' },
  { id: 'visibility', label: 'Dominer sur Google', sub: 'Référencement SEO & visibilité' },
  { id: 'rebrand', label: 'Refonte complète', sub: 'Moderniser une identité ou un site' },
  { id: 'launch', label: 'Lancement de marque', sub: 'Partir sur des bases solides' },
];

export const STYLE_CARDS = [
  { id: 'luxury-dark', label: 'Luxe & Sombre', sub: 'Noir profond, touches dorées & épurées' },
  { id: 'minimal-light', label: 'Minimaliste & Lumineux', sub: 'Clair, aéré et ultra-moderne' },
  { id: 'corporate', label: 'Corporate & Structuré', sub: 'Institutionnel, sobre et rassurant' },
  { id: 'bold', label: 'Créatif & Audacieux', sub: 'Animations marquantes & fort impact' },
];

export const FEATURE_CARDS = [
  'Design Mobile-First Ultra-Rapide',
  'Formulaire & Devis par Email',
  'Paiement Mobile Money / Carte',
  'Galerie Projets / Catalogue HD',
  'Version Bilingue (FR / EN)',
  'Optimisation Google (SEO)',
  'Espace / Portail Client',
  'Identité Visuelle & Logo Vectoriel',
];

export const CONTENT_CARDS = [
  { id: 'ready', label: 'Éléments déjà prêts', sub: 'Textes, photos et logo disponibles' },
  { id: 'partial', label: 'En cours de préparation', sub: 'Une partie des contenus est prête' },
  { id: 'full-help', label: 'Accompagnement complet', sub: 'PRYMAX conçoit textes et visuels' },
];

export const DEADLINE_CARDS = [
  { id: 'urgent', label: 'Express (24h – 72h)', sub: 'Priorité absolue' },
  { id: 'fast', label: '1 à 2 semaines', sub: 'Idéal pour lancement rapide' },
  { id: 'month', label: 'Dans le mois', sub: 'Planning structuré' },
  { id: 'flexible', label: 'Flexible', sub: 'Selon vos recommandations' },
];

export const BUDGET_CARDS = [
  { id: 'tier-1', label: 'Moins de 100 000 FCFA', sub: 'Logo, visuels ou One-Page simple' },
  { id: 'tier-2', label: '100 000 – 250 000 FCFA', sub: 'Site vitrine pro ou pack identité' },
  { id: 'tier-3', label: '250 000 – 500 000 FCFA', sub: 'Site complet avancé ou E-Commerce' },
  { id: 'tier-4', label: '500 000+ FCFA', sub: 'Projet d’envergure sur-mesure' },
];

export const CustomQuoteModal: React.FC<CustomQuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedServices = [],
}) => {
  const { showToast } = useToast();

  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedContent, setSelectedContent] = useState<string>('');
  const [selectedDeadline, setSelectedDeadline] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');

  const [clientName, setClientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [extraNote, setExtraNote] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slowHint, setSlowHint] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleMulti = (value: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(list.includes(value) ? list.filter(i => i !== value) : [...list, value]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSlowHint(null);
    setIsSubmitting(true);
    const activeLanguage = detectActiveWebsiteLanguage();

    try {
      const result = await sendDemandEmail(
        {
          type: 'configurator',
          language: activeLanguage,
          name: clientName,
          email,
          phone,
          company: companyName,
          services: preselectedServices,
          budget: selectedBudget || 'Non précisé',
          deadline: selectedDeadline || 'Non précisé',
          options: {
            Secteur: selectedSector || 'Non précisé',
            Objectifs: selectedGoals,
            'Style visuel': selectedStyle || 'Non précisé',
            Fonctionnalités: selectedFeatures,
            'État des contenus': selectedContent || 'Non précisé',
          },
          message: extraNote,
          website_url: honeypot,
        },
        {
          onSlowRequest: hint => {
            setSlowHint(hint);
            showToast({
              title: 'Traitement en cours',
              message: hint,
              type: 'info',
              duration: 3000,
            });
          },
        }
      );

      setSubmittedRef(result.referenceId);
      showToast({
        title: 'Devis transmis avec succès',
        message: `Votre demande (${result.referenceId}) a bien été envoyée par email.`,
        type: 'success',
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erreur lors de la soumission.';
      showToast({
        title: 'Impossible d’envoyer la demande',
        message: msg,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      setSlowHint(null);
    }
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setClientName('');
    setEmail('');
    setPhone('');
    setCompanyName('');
    setExtraNote('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0B0C10] border border-white/15 rounded-3xl p-5 sm:p-8 md:p-10 text-white shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* En-tête */}
        <div className="flex items-start justify-between border-b border-white/10 pb-5 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E5B54F] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Configurateur Sur-Mesure</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Configurez votre devis en quelques clics
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Sélectionnez simplement les cartes correspondant à votre vision. Vous êtes libre de choisir uniquement ce qui vous concerne.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-zinc-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 transition-colors shrink-0 ml-4 cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submittedRef ? (
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* 1. Secteur */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <Layers className="w-4 h-4 text-[#E5B54F]" />
                <span>1. Votre Secteur d'Activité</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {SECTOR_CARDS.map(card => {
                  const active = selectedSector === card.label;
                  return (
                    <button
                      type="button"
                      key={card.id}
                      onClick={() => setSelectedSector(active ? '' : card.label)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                        active
                          ? 'bg-white/[0.09] border-[#E5B54F] shadow-[0_0_20px_rgba(229,181,79,0.15)]'
                          : 'bg-[#111319] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">{card.label}</span>
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center border text-[10px] shrink-0 ${
                            active
                              ? 'bg-[#E5B54F] border-[#E5B54F] text-zinc-950'
                              : 'border-zinc-700'
                          }`}
                        >
                          {active && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400">{card.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Objectifs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <Target className="w-4 h-4 text-[#3B82F6]" />
                <span>2. Objectifs Principaux (Choix multiples)</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {GOAL_CARDS.map(card => {
                  const active = selectedGoals.includes(card.label);
                  return (
                    <button
                      type="button"
                      key={card.id}
                      onClick={() => toggleMulti(card.label, selectedGoals, setSelectedGoals)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                        active
                          ? 'bg-white/[0.09] border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                          : 'bg-[#111319] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-white">{card.label}</span>
                        <span
                          className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] shrink-0 ${
                            active ? 'bg-white border-white text-zinc-950' : 'border-zinc-700'
                          }`}
                        >
                          {active && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </span>
                      </div>
                      <span className="text-[11px] text-zinc-400">{card.sub}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Style Visuel */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <Palette className="w-4 h-4 text-[#E5B54F]" />
                <span>3. Style Visuel &amp; Direction Artistique</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STYLE_CARDS.map(card => {
                  const active = selectedStyle === card.label;
                  return (
                    <button
                      type="button"
                      key={card.id}
                      onClick={() => setSelectedStyle(active ? '' : card.label)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        active
                          ? 'bg-white/[0.09] border-[#E5B54F]'
                          : 'bg-[#111319] border-white/10 hover:border-white/25'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{card.label}</div>
                        <div className="text-[11px] text-zinc-400 mt-0.5">{card.sub}</div>
                      </div>
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
                          active
                            ? 'bg-[#E5B54F] border-[#E5B54F] text-zinc-950'
                            : 'border-zinc-700'
                        }`}
                      >
                        {active && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 4. Fonctionnalités */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                <Cpu className="w-4 h-4 text-[#3B82F6]" />
                <span>4. Fonctionnalités &amp; Modules Souhaités</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {FEATURE_CARDS.map(feat => {
                  const active = selectedFeatures.includes(feat);
                  return (
                    <button
                      type="button"
                      key={feat}
                      onClick={() => toggleMulti(feat, selectedFeatures, setSelectedFeatures)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                        active
                          ? 'bg-white text-zinc-950 border-white font-bold shadow-md'
                          : 'bg-[#111319] border-white/10 text-zinc-300 hover:border-white/25'
                      }`}
                    >
                      <span className="leading-snug">{feat}</span>
                      {active && <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 5. État des contenus, Délai & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Contenus */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <FileCheck className="w-3.5 h-3.5 text-[#E5B54F]" />
                  <span>5. Vos Contenus</span>
                </div>
                <div className="space-y-2">
                  {CONTENT_CARDS.map(c => {
                    const active = selectedContent === c.label;
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => setSelectedContent(active ? '' : c.label)}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-white/[0.09] border-white text-white'
                            : 'bg-[#111319] border-white/10 text-zinc-300 hover:border-white/25'
                        }`}
                      >
                        <div className="text-xs font-bold">{c.label}</div>
                        <div className="text-[10px] text-zinc-400">{c.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Délai */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>6. Délai Souhaité</span>
                </div>
                <div className="space-y-2">
                  {DEADLINE_CARDS.map(d => {
                    const active = selectedDeadline === d.label;
                    return (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => setSelectedDeadline(active ? '' : d.label)}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-white/[0.09] border-white text-white'
                            : 'bg-[#111319] border-white/10 text-zinc-300 hover:border-white/25'
                        }`}
                      >
                        <div className="text-xs font-bold">{d.label}</div>
                        <div className="text-[10px] text-zinc-400">{d.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white">
                  <Wallet className="w-3.5 h-3.5 text-[#E5B54F]" />
                  <span>7. Budget Envisagé</span>
                </div>
                <div className="space-y-2">
                  {BUDGET_CARDS.map(b => {
                    const active = selectedBudget === b.label;
                    return (
                      <button
                        type="button"
                        key={b.id}
                        onClick={() => setSelectedBudget(active ? '' : b.label)}
                        className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          active
                            ? 'bg-white/[0.09] border-[#E5B54F] text-white'
                            : 'bg-[#111319] border-white/10 text-zinc-300 hover:border-white/25'
                        }`}
                      >
                        <div className="text-xs font-bold">{b.label}</div>
                        <div className="text-[10px] text-zinc-400">{b.sub}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 8. Coordonnées de réception */}
            <div className="p-4 sm:p-6 bg-[#111319] rounded-2xl border border-white/10 space-y-4">
              {/* Champ anti-robot invisible (Honeypot) */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="quote-website-url">Site web (ne pas remplir)</label>
                <input
                  id="quote-website-url"
                  type="text"
                  name="website_url"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                />
              </div>

              <div className="text-xs font-bold uppercase tracking-wider text-white">
                8. Vos coordonnées pour recevoir votre devis
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs text-zinc-300 mb-1 font-medium">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Votre nom"
                    className="w-full min-h-[44px] bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-300 mb-1 font-medium">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={254}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="contact@entreprise.com"
                    className="w-full min-h-[44px] bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-300 mb-1 font-medium">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    maxLength={40}
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+237 6XX XX XX XX"
                    className="w-full min-h-[44px] bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-300 mb-1 font-medium">
                    Entreprise / Marque (optionnel)
                  </label>
                  <input
                    type="text"
                    maxLength={120}
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="Nom de votre structure"
                    className="w-full min-h-[44px] bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-zinc-300 mb-1 font-medium">
                  Précision complémentaire (optionnel)
                </label>
                <input
                  type="text"
                  maxLength={1000}
                  value={extraNote}
                  onChange={e => setExtraNote(e.target.value)}
                  placeholder="Lien d'inspiration ou détail particulier..."
                  className="w-full min-h-[44px] bg-zinc-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {slowHint && (
              <div className="text-center text-xs text-[#E5B54F] font-medium animate-pulse">
                {slowHint}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full min-h-[52px] py-4 bg-white hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-[0_4px_25px_rgba(255,255,255,0.2)] cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmission en cours...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Demander un devis</span>
                </>
              )}
            </button>
          </form>
        ) : (
          <div className="py-10 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="text-xs font-mono uppercase text-[#E5B54F] font-bold tracking-wider">
              RÉFÉRENCE DOSSIER : {submittedRef}
            </div>
            <h3 className="text-2xl font-bold text-white">
              Demande bien reçue, {clientName} !
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md leading-relaxed">
              Votre configuration sur-mesure a été transmise par email à PRYMAX STUDIO. Un accusé de réception a également été généré pour <span className="text-white font-semibold">{email}</span>.
            </p>

            <button
              onClick={handleReset}
              className="mt-4 px-6 py-3 bg-white text-zinc-950 hover:bg-zinc-200 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Fermer la fenêtre
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
