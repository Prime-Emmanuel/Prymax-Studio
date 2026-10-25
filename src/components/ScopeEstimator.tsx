import React, { useState, useRef } from 'react';
import { PRICING_MODULES } from '../data/agencyData';
import {
  Check,
  Clock,
  AlertCircle,
  FileText,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Layers,
  Target,
  Palette,
  Cpu,
  Wallet,
  FileCheck,
  Send,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import {
  CustomQuoteModal,
  SECTOR_CARDS,
  GOAL_CARDS,
  STYLE_CARDS,
  FEATURE_CARDS,
  CONTENT_CARDS,
  DEADLINE_CARDS,
  BUDGET_CARDS,
} from './CustomQuoteModal';
import { sendDemandEmail, detectActiveWebsiteLanguage } from '../utils/emailService';
import { useToast } from '../context/ToastContext';

interface ScopeEstimatorProps {
  onPreloadBrief: (selectedModules: string[], totalFcfa: number, tier: string) => void;
}

export const ScopeEstimator: React.FC<ScopeEstimatorProps> = () => {
  const { showToast } = useToast();

  // Aucune prestation pré-sélectionnée : l'utilisateur est totalement libre
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isCustomQuoteOpen, setIsCustomQuoteOpen] = useState(false);

  // États du formulaire interactif par cartes
  const [selectedSector, setSelectedSector] = useState<string>('');
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedContent, setSelectedContent] = useState<string>('');
  const [selectedDeadline, setSelectedDeadline] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');

  // Coordonnées minimales de réception
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCompany, setClientCompany] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [slowHint, setSlowHint] = useState<string | null>(null);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const configuratorRef = useRef<HTMLDivElement>(null);

  const toggleModule = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const toggleMulti = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(list.includes(value) ? list.filter(i => i !== value) : [...list, value]);
  };

  const selectedModules = PRICING_MODULES.filter(m => selectedIds.includes(m.id));

  const scrollToConfigurator = () => {
    if (configuratorRef.current) {
      configuratorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setIsCustomQuoteOpen(true);
    }
  };

  const handleCardFormSubmit = async (e: React.FormEvent) => {
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
          email: clientEmail,
          phone: clientPhone,
          company: clientCompany,
          services: selectedModules.map(m => `${m.name} (${m.duration})`),
          budget: selectedBudget || 'À définir selon options',
          deadline: selectedDeadline || 'Standard',
          options: {
            Secteur: selectedSector || 'Non précisé',
            Objectifs: selectedGoals,
            'Style visuel': selectedStyle || 'Non précisé',
            Fonctionnalités: selectedFeatures,
            'État des contenus': selectedContent || 'Non précisé',
          },
        },
        {
          onSlowRequest: hint => {
            setSlowHint(hint);
            showToast({
              title: 'Transmission en cours',
              message: hint,
              type: 'info',
              duration: 3000,
            });
          },
        }
      );

      setSubmittedRef(result.referenceId);
      showToast({
        title: 'Demande de devis envoyée avec succès',
        message: `Référence ${result.referenceId} — Un accusé de réception a été transmis.`,
        type: 'success',
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Une erreur est survenue.';
      showToast({
        title: 'Vérifiez vos informations',
        message: msg,
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      setSlowHint(null);
    }
  };

  return (
    <section
      id="devis"
      className="py-20 sm:py-28 bg-[#090A0D] border-t border-white/[0.08] relative scroll-mt-20"
    >
      {/* Halo subtil monochrome */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/[0.02] blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        {/* En-tête de la section */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-white mb-2.5">
            <span>Délais d'Exécution &amp; Devis</span>
            <span aria-hidden="true" className="text-zinc-600">
              ·
            </span>
            <span>PRYMAX STUDIO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight text-balance">
            Des délais d'exécution maîtrisés et garantis
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3 leading-relaxed">
            Chez PRYMAX STUDIO, chaque prestation est exécutée avec rigueur selon des délais précis. Sélectionnez librement un ou plusieurs services, ou configurez directement vos options ci-dessous.
          </p>
        </div>

        {/* Grille principale des modules */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Colonne Gauche : Sélection libre des prestations (7 colonnes) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
              <span className="font-semibold uppercase text-zinc-300">
                Sélectionnez vos besoins (optionnel) :
              </span>
              <span className="text-[11px] font-mono text-white font-semibold">
                {selectedIds.length} sélectionné(s)
              </span>
            </div>

            {PRICING_MODULES.map(item => {
              const isSelected = selectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleModule(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 select-none ${
                    isSelected
                      ? 'bg-[#121419] border-white shadow-lg shadow-white/5'
                      : 'bg-[#0E0F13] border-white/5 hover:border-white/15'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-colors shrink-0 ${
                          isSelected
                            ? 'bg-white border-white text-zinc-950'
                            : 'border-zinc-700 bg-zinc-900'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                            {item.name}
                          </h3>
                          <span className="text-[10px] font-mono uppercase text-zinc-300 px-2 py-0.5 bg-white/10 rounded-md">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 leading-snug">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Affichage du délai seul */}
                    <div className="sm:text-right shrink-0 self-start sm:self-auto pl-8 sm:pl-0">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-semibold font-mono">
                        <Clock className="w-3.5 h-3.5 text-white" />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Note spécifique au textile si applicable */}
                  {item.note && (
                    <div className="pt-2.5 border-t border-white/5 text-[11px] text-zinc-400 leading-relaxed italic bg-black/20 p-2.5 rounded-xl">
                      {item.note}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Bouton élégant "Demander un devis" qui apparaît juste en dessous dès qu'au moins 1 service est sélectionné */}
            {selectedIds.length > 0 && (
              <div className="pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <button
                  type="button"
                  onClick={scrollToConfigurator}
                  className="w-full min-h-[52px] py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E5B54F] via-[#f3cf7a] to-[#E5B54F] text-zinc-950 font-extrabold text-xs uppercase tracking-widest shadow-[0_8px_30px_rgba(229,181,79,0.28)] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Demander un devis ({selectedIds.length} prestation{selectedIds.length > 1 ? 's' : ''})</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}

            {/* Avertissement important sur les durées et les éléments */}
            <div className="p-4 sm:p-5 bg-zinc-900/90 border border-white/10 rounded-2xl text-zinc-300 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-white shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-bold text-white block mb-0.5">
                  Note importante sur les délais :
                </span>
                Toutes ces durées sont basées sur le fait que le client fournisse l'ensemble des éléments nécessaires à la réalisation du travail (textes, photos, logos existants, validations).
              </div>
            </div>
          </div>

          {/* Colonne Droite : Carte Devis Personnalisé (sans mention Direct WhatsApp) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="bg-[#101217] border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E5B54F]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-white">
                    Devis Personnalisé
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Votre Demande Sur-Mesure
                </h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Obtenez une proposition détaillée ajustée à vos objectifs, votre secteur et vos délais.
                </p>
              </div>

              {/* Prestations sélectionnées avec délais */}
              <div className="p-4 bg-zinc-900/80 rounded-2xl border border-white/5 space-y-2.5">
                <div className="text-[11px] font-mono text-zinc-400 uppercase flex items-center justify-between">
                  <span>Prestations cochées ({selectedModules.length})</span>
                  <span className="text-white font-semibold">Délais garantis</span>
                </div>
                {selectedModules.length > 0 ? (
                  <div className="space-y-2 text-xs text-zinc-300">
                    {selectedModules.map(m => (
                      <div key={m.id} className="flex items-center justify-between gap-2 py-0.5">
                        <span className="truncate font-medium text-white">· {m.name}</span>
                        <span className="font-mono text-white text-[11px] shrink-0 bg-white/10 px-2 py-0.5 rounded">
                          {m.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-400 italic py-1">
                    Aucune prestation sélectionnée pour l'instant. Vous pouvez cocher des prestations à gauche ou personnaliser directement votre besoin ci-dessous.
                  </p>
                )}
              </div>

              {/* Garanties Studio */}
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Cession 100% des droits et fichiers sources HD</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>Respect strict des délais annoncés</span>
                </div>
              </div>

              {/* Bouton Devis Personnalisé sans aucune mention de redirection */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={scrollToConfigurator}
                  className="w-full min-h-[50px] py-3.5 bg-white hover:bg-zinc-200 active:bg-zinc-300 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,255,255,0.2)] cursor-pointer group"
                >
                  <FileText className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Devis Personnalisé</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CONFIGURATEUR INTERACTIF PAR CARTES (SÉLECTION D'OPTIONS SANS SAISIE LOURDE)
           ========================================================================= */}
        <div
          ref={configuratorRef}
          className="mt-16 sm:mt-24 pt-14 border-t border-white/10 scroll-mt-24"
        >
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#E5B54F] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Configurateur Visuel Sur-Mesure</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Personnalisez les options de votre projet
            </h3>
            <p className="text-zinc-300 text-xs sm:text-sm mt-2 leading-relaxed">
              Sélectionnez simplement les cartes qui correspondent à vos attentes. Aucun long texte à rédiger : cliquez sur vos préférences et recevez votre étude personnalisée par email.
            </p>
          </div>

          {!submittedRef ? (
            <form
              onSubmit={handleCardFormSubmit}
              className="bg-[#0D0F14] border border-white/10 rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl space-y-8"
            >
              {/* Étape 1 : Secteur */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    <Layers className="w-4 h-4 text-[#E5B54F]" />
                    <span>1. Votre Secteur d'Activité</span>
                  </div>
                  <span className="text-[11px] text-zinc-400">Cliquez pour choisir</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {SECTOR_CARDS.map(card => {
                    const active = selectedSector === card.label;
                    return (
                      <button
                        type="button"
                        key={card.id}
                        onClick={() => setSelectedSector(active ? '' : card.label)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          active
                            ? 'bg-white/[0.08] border-[#E5B54F] shadow-[0_0_25px_rgba(229,181,79,0.14)]'
                            : 'bg-[#12151C] border-white/[0.07] hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {card.label}
                          </span>
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
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

              {/* Étape 2 : Objectifs */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    <Target className="w-4 h-4 text-[#3B82F6]" />
                    <span>2. Objectifs Principaux</span>
                  </div>
                  <span className="text-[11px] text-zinc-400">Choix multiples</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {GOAL_CARDS.map(card => {
                    const active = selectedGoals.includes(card.label);
                    return (
                      <button
                        type="button"
                        key={card.id}
                        onClick={() => toggleMulti(card.label, selectedGoals, setSelectedGoals)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                          active
                            ? 'bg-white/[0.08] border-white shadow-[0_0_25px_rgba(255,255,255,0.1)]'
                            : 'bg-[#12151C] border-white/[0.07] hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs sm:text-sm font-bold text-white">
                            {card.label}
                          </span>
                          <span
                            className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 ${
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

              {/* Étape 3 : Style Visuel */}
              <div className="space-y-3.5">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  <Palette className="w-4 h-4 text-[#E5B54F]" />
                  <span>3. Style Visuel Souhaité</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {STYLE_CARDS.map(card => {
                    const active = selectedStyle === card.label;
                    return (
                      <button
                        type="button"
                        key={card.id}
                        onClick={() => setSelectedStyle(active ? '' : card.label)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                          active
                            ? 'bg-white/[0.08] border-[#E5B54F]'
                            : 'bg-[#12151C] border-white/[0.07] hover:border-white/25'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white">{card.label}</span>
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
                              active
                                ? 'bg-[#E5B54F] border-[#E5B54F] text-zinc-950'
                                : 'border-zinc-700'
                            }`}
                          >
                            {active && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </span>
                        </div>
                        <span className="text-[11px] text-zinc-400 leading-snug">{card.sub}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Étape 4 : Fonctionnalités Clés */}
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                    <Cpu className="w-4 h-4 text-[#3B82F6]" />
                    <span>4. Fonctionnalités &amp; Options Clés</span>
                  </div>
                  <span className="text-[11px] text-zinc-400">Choix multiples</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {FEATURE_CARDS.map(feat => {
                    const active = selectedFeatures.includes(feat);
                    return (
                      <button
                        type="button"
                        key={feat}
                        onClick={() => toggleMulti(feat, selectedFeatures, setSelectedFeatures)}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          active
                            ? 'bg-white text-zinc-950 border-white font-bold shadow-lg'
                            : 'bg-[#12151C] border-white/[0.07] text-zinc-300 hover:border-white/25'
                        }`}
                      >
                        <span className="leading-snug">{feat}</span>
                        {active && <Check className="w-3.5 h-3.5 shrink-0 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Étapes 5, 6, 7 : Contenus, Délai & Budget en cartes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                    <FileCheck className="w-4 h-4 text-[#E5B54F]" />
                    <span>5. État de vos contenus</span>
                  </div>
                  <div className="space-y-2">
                    {CONTENT_CARDS.map(c => {
                      const active = selectedContent === c.label;
                      return (
                        <button
                          type="button"
                          key={c.id}
                          onClick={() => setSelectedContent(active ? '' : c.label)}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            active
                              ? 'bg-white/[0.08] border-white text-white'
                              : 'bg-[#12151C] border-white/[0.07] text-zinc-300 hover:border-white/25'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold">{c.label}</div>
                            <div className="text-[11px] text-zinc-400">{c.sub}</div>
                          </div>
                          {active && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                    <Clock className="w-4 h-4 text-[#3B82F6]" />
                    <span>6. Délai souhaité</span>
                  </div>
                  <div className="space-y-2">
                    {DEADLINE_CARDS.map(d => {
                      const active = selectedDeadline === d.label;
                      return (
                        <button
                          type="button"
                          key={d.id}
                          onClick={() => setSelectedDeadline(active ? '' : d.label)}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            active
                              ? 'bg-white/[0.08] border-white text-white'
                              : 'bg-[#12151C] border-white/[0.07] text-zinc-300 hover:border-white/25'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold">{d.label}</div>
                            <div className="text-[11px] text-zinc-400">{d.sub}</div>
                          </div>
                          {active && <Check className="w-3.5 h-3.5 text-white shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                    <Wallet className="w-4 h-4 text-[#E5B54F]" />
                    <span>7. Fourchette Budgétaire</span>
                  </div>
                  <div className="space-y-2">
                    {BUDGET_CARDS.map(b => {
                      const active = selectedBudget === b.label;
                      return (
                        <button
                          type="button"
                          key={b.id}
                          onClick={() => setSelectedBudget(active ? '' : b.label)}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            active
                              ? 'bg-white/[0.08] border-[#E5B54F] text-white'
                              : 'bg-[#12151C] border-white/[0.07] text-zinc-300 hover:border-white/25'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold">{b.label}</div>
                            <div className="text-[11px] text-zinc-400">{b.sub}</div>
                          </div>
                          {active && <Check className="w-3.5 h-3.5 text-[#E5B54F] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Étape finale : Coordonnées rapides de réception */}
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  8. Vos Coordonnées de Réception
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <input
                    type="text"
                    required
                    aria-label="Votre nom complet"
                    autoComplete="name"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Votre nom complet *"
                    className="w-full min-h-[46px] bg-[#12151C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-white"
                  />
                  <input
                    type="email"
                    required
                    aria-label="Votre adresse email"
                    autoComplete="email"
                    value={clientEmail}
                    onChange={e => setClientEmail(e.target.value)}
                    placeholder="Votre adresse email *"
                    className="w-full min-h-[46px] bg-[#12151C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-white"
                  />
                  <input
                    type="tel"
                    aria-label="Votre numéro de téléphone (optionnel)"
                    autoComplete="tel"
                    value={clientPhone}
                    onChange={e => setClientPhone(e.target.value)}
                    placeholder="Téléphone (optionnel)"
                    className="w-full min-h-[46px] bg-[#12151C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    aria-label="Nom de votre entreprise ou marque"
                    autoComplete="organization"
                    value={clientCompany}
                    onChange={e => setClientCompany(e.target.value)}
                    placeholder="Entreprise / Marque"
                    className="w-full min-h-[46px] bg-[#12151C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-400 focus:outline-none focus:border-white"
                  />
                </div>

                {slowHint && (
                  <div className="text-xs text-[#E5B54F] font-medium animate-pulse">
                    {slowHint}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[11px] text-zinc-400">
                    Réception instantanée et étude personnalisée sous 24h ouvrées.
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[260px] min-h-[50px] px-8 py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(255,255,255,0.2)] cursor-pointer disabled:opacity-60"
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
                </div>
              </div>
            </form>
          ) : (
            <div className="bg-[#0D0F14] border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center mx-auto text-emerald-400">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="text-xs font-mono uppercase text-[#E5B54F] font-bold tracking-wider">
                DOSSIER ENREGISTRÉ · {submittedRef}
              </div>
              <h4 className="text-2xl font-bold text-white">
                Merci {clientName}, votre demande de devis a été envoyée !
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
                Nous avons bien reçu vos sélections et un email de confirmation a été adressé à <span className="text-white font-semibold">{clientEmail}</span>. Notre équipe revient vers vous sous 24h ouvrées.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedRef(null)}
                className="mt-2 px-6 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Faire une nouvelle simulation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modale de Devis Personnalisé Approfondi */}
      <CustomQuoteModal
        isOpen={isCustomQuoteOpen}
        onClose={() => setIsCustomQuoteOpen(false)}
        preselectedServices={selectedModules.map(m => m.name)}
      />
    </section>
  );
};
