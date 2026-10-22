import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Send, Sparkles, HelpCircle, MessageCircle, FileText } from 'lucide-react';

interface CustomQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomQuoteModal: React.FC<CustomQuoteModalProps> = ({ isOpen, onClose }) => {
  const [clientName, setClientName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessActivity, setBusinessActivity] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([]);
  const [contentStatus, setContentStatus] = useState('Textes et photos en cours de préparation');
  const [budgetFcfa, setBudgetFcfa] = useState('150 000 – 350 000 FCFA');
  const [deadline, setDeadline] = useState('Dans les 2 à 4 semaines');
  const [inspirations, setInspirations] = useState('');
  const [detailedNotes, setDetailedNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const needsList = [
    'Création de Logo & Identité Visuelle',
    'Site Web One-Page (Présentation Simple)',
    'Site Web Vitrine Professionnel Multi-pages',
    'Boutique en Ligne E-Commerce (Paiement Mobile Money)',
    'Design Graphique & Mockups Vêtements (T-shirts, Pulls)',
    'Visibilité & Référencement Google (SEO Local)',
    'Refonte d’un Site Web Existant'
  ];

  // Gestion de la fermeture par la touche Échap
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

  const toggleNeed = (need: string) => {
    setSelectedNeeds(prev => 
      prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !whatsapp.trim()) {
      setErrorMsg('Veuillez renseigner au moins votre nom et votre numéro WhatsApp / Téléphone.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setClientName('');
    setWhatsapp('');
    setEmail('');
    setBusinessName('');
    setBusinessActivity('');
    setTargetAudience('');
    setSelectedNeeds([]);
    setInspirations('');
    setDetailedNotes('');
    onClose();
  };

  // Préparation du lien WhatsApp avec le résumé du questionnaire
  const whatsappSummary = encodeURIComponent(
    `*DEVIS PERSONNALISÉ PRYMAX STUDIO*\n` +
    `Nom : ${clientName}\n` +
    `Entreprise : ${businessName || 'Non précisé'}\n` +
    `Activité : ${businessActivity || 'Non précisé'}\n` +
    `Besoins : ${selectedNeeds.length > 0 ? selectedNeeds.join(', ') : 'Général'}\n` +
    `Budget estimé : ${budgetFcfa}\n` +
    `Délai souhaité : ${deadline}\n` +
    `Précisions : ${detailedNotes || 'Aucune'}`
  );

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl bg-[#0D0E12] border border-white/10 rounded-3xl p-6 sm:p-10 text-white shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* En-tête */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1E5EFF]/10 border border-[#1E5EFF]/30 flex items-center justify-center text-[#1E5EFF]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#1E5EFF]">
                Questionnaire Approfondi
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Demande de Devis Personnalisé
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Pour vous fournir un devis juste, précis et adapté à la réalité de votre entreprise, merci de remplir ces quelques détails essentiels. Nous prenons le temps d’étudier chaque réponse.
            </p>

            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl">
                {errorMsg}
              </div>
            )}

            {/* SECTION 1 : Coordonnées de contact */}
            <div className="p-4 sm:p-5 bg-zinc-900/40 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                1. Vos coordonnées &amp; Votre Entreprise
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Votre Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="ex: Emmanuel Primz"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#1E5EFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Numéro WhatsApp / Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="ex: +237 6XX XX XX XX"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#1E5EFF]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Nom de votre entreprise ou marque
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="ex: DG - Dieu Est Grand"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#1E5EFF]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Adresse email (optionnel)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contact@entreprise.com"
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#1E5EFF]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Quelle est l’activité principale de votre entreprise ?
                </label>
                <input
                  type="text"
                  value={businessActivity}
                  onChange={(e) => setBusinessActivity(e.target.value)}
                  placeholder="ex: Vente de vêtements streetwear, cabinet de conseil, salon de beauté..."
                  className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#1E5EFF]"
                />
              </div>
            </div>

            {/* SECTION 2 : Prestations souhaitées */}
            <div className="p-4 sm:p-5 bg-zinc-900/40 rounded-2xl border border-white/5 space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                2. Quels sont les services recherchés ? (Sélectionnez ceux qui s'appliquent)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {needsList.map((need, idx) => {
                  const isChecked = selectedNeeds.includes(need);
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleNeed(need)}
                      className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-[#1E5EFF]/15 border-[#1E5EFF] text-white font-medium'
                          : 'bg-zinc-900/60 border-white/5 text-zinc-400 hover:border-white/15'
                      }`}
                    >
                      <span className="leading-snug">{need}</span>
                      <div className={`w-4 h-4 rounded-md flex items-center justify-center border text-[10px] shrink-0 ml-2 ${
                        isChecked ? 'bg-[#1E5EFF] border-[#1E5EFF] text-white font-bold' : 'border-zinc-700'
                      }`}>
                        {isChecked && '✓'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 3 : Budget en FCFA & Délais */}
            <div className="p-4 sm:p-5 bg-zinc-900/40 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                3. Budget indicatif &amp; Échéance
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Fourchette budgétaire envisagée (FCFA)
                  </label>
                  <select
                    value={budgetFcfa}
                    onChange={(e) => setBudgetFcfa(e.target.value)}
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E5EFF]"
                  >
                    <option value="10 000 – 50 000 FCFA">10 000 – 50 000 FCFA (Logo ou Mockup Textile)</option>
                    <option value="90 000 – 150 000 FCFA">90 000 – 150 000 FCFA (Site One-Page)</option>
                    <option value="150 000 – 350 000 FCFA">150 000 – 350 000 FCFA (Site Vitrine Professionnel)</option>
                    <option value="375 000 – 700 000 FCFA">375 000 – 700 000 FCFA (Boutique E-Commerce)</option>
                    <option value="500 000 – 1 000 000 FCFA">500 000 – 1 000 000 FCFA (Sur-Mesure Avancé)</option>
                    <option value="Plus de 1 000 000 FCFA">Plus de 1 000 000 FCFA (Projet Majeur)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Quand souhaitez-vous lancer le projet ?
                  </label>
                  <select
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E5EFF]"
                  >
                    <option value="Immédiatement (cette semaine)">Immédiatement (cette semaine)</option>
                    <option value="Dans les 1 à 2 semaines">Dans les 1 à 2 semaines</option>
                    <option value="Dans les 2 à 4 semaines">Dans les 2 à 4 semaines</option>
                    <option value="Dans le mois prochain">Dans le mois prochain</option>
                    <option value="En phase de réflexion">En phase de réflexion / information</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Avez-vous déjà préparé vos contenus (textes, photos, logo) ?
                </label>
                <select
                  value={contentStatus}
                  onChange={(e) => setContentStatus(e.target.value)}
                  className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E5EFF]"
                >
                  <option value="Oui, tous mes éléments sont prêts">Oui, tous mes éléments sont prêts</option>
                  <option value="Textes et photos en cours de préparation">Textes et photos en cours de préparation</option>
                  <option value="Non, j’ai besoin que vous m’aidiez pour les textes/visuels">Non, j’ai besoin que vous m’aidiez pour les textes et visuels</option>
                </select>
              </div>
            </div>

            {/* SECTION 4 : Précisions et inspirations */}
            <div className="p-4 sm:p-5 bg-zinc-900/40 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#1E5EFF]">
                4. Exemples &amp; Remarques particulières
              </h3>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Avez-vous des exemples de sites ou de marques qui vous inspirent ? (liens ou noms)
                </label>
                <input
                  type="text"
                  value={inspirations}
                  onChange={(e) => setInspirations(e.target.value)}
                  placeholder="ex: j'aime le style minimaliste de Nike, ce site concurrent..."
                  className="w-full min-h-[44px] bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#1E5EFF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Remarques ou questions importantes pour notre équipe
                </label>
                <textarea
                  rows={3}
                  value={detailedNotes}
                  onChange={(e) => setDetailedNotes(e.target.value)}
                  placeholder="Expliquez-nous vos objectifs spécifiques, vos fonctionnalités souhaitées ou toute précision utile..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#1E5EFF]"
                />
              </div>
            </div>

            {/* Bouton de soumission principal */}
            <button
              type="submit"
              className="w-full min-h-[50px] py-3.5 bg-[#1E5EFF] hover:bg-[#184FD8] active:bg-[#1340B5] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(30,94,255,0.4)] cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Transmettre Mon Questionnaire de Devis</span>
            </button>
          </form>
        ) : (
          /* Confirmation personnalisée avec option WhatsApp direct */
          <div className="py-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#1E5EFF]/10 border border-[#1E5EFF]/30 flex items-center justify-center mb-5 text-[#1E5EFF]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="text-xs font-mono uppercase text-[#1E5EFF] mb-1.5">
              DOSSIER DE DEVIS ENREGISTRÉ
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Merci {clientName} !
            </h3>
            <p className="text-sm text-zinc-300 max-w-md mb-6 leading-relaxed">
              Votre questionnaire a été transmis à l’équipe de direction de PRYMAX STUDIO. Nous analysons vos besoins pour vous proposer une solution sur-mesure.
            </p>

            {/* Option d'envoi direct sur WhatsApp pour un traitement instantané */}
            <div className="w-full max-w-md p-4 bg-zinc-900 rounded-2xl border border-white/10 mb-6 text-left">
              <div className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1E5EFF]" />
                <span>Traitement Prioritaire via WhatsApp</span>
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Vous souhaitez une réponse immédiate ? Vous pouvez envoyer directement le récapitulatif de votre demande sur notre WhatsApp officiel :
              </p>
              <a
                href={`https://wa.me/237681078004?text=${whatsappSummary}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[46px] flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white stroke-[#25D366]" />
                <span>Envoyer le récapitulatif sur WhatsApp</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Fermer la fenêtre
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
