import React, { useState } from 'react';
import { Shield, KeyRound, ArrowRight, Download, CheckCircle2, Clock } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface ClientPortalPageProps {
  onNavigate: (route: string) => void;
  onOpenContact: () => void;
}

export const ClientPortalPage: React.FC<ClientPortalPageProps> = ({ onNavigate, onOpenContact }) => {
  const { showToast } = useToast();
  const [accessCode, setAccessCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim().length >= 4) {
      setIsAuthenticated(true);
      setErrorMsg('');
      showToast({
        title: 'Connexion réussie',
        message: 'Bienvenue sur votre espace projet PRYMAX STUDIO.',
        type: 'success',
      });
    } else {
      const msg = "Veuillez saisir votre code d'accès client (au moins 4 caractères) fourni par PRYMAX STUDIO.";
      setErrorMsg(msg);
      showToast({
        title: 'Code d’accès invalide',
        message: msg,
        type: 'error',
      });
    }
  };

  return (
    <div className="pt-28 pb-20 sm:pt-36 sm:pb-28 max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
      {/* Fil d'Ariane */}
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 mb-6">
        <button 
          onClick={() => onNavigate('home')} 
          className="hover:text-white transition-colors cursor-pointer"
        >
          Accueil
        </button>
        <span>/</span>
        <span className="text-white font-semibold">Portail Client</span>
      </div>

      {!isAuthenticated ? (
        <div className="max-w-xl mx-auto text-center py-10 sm:py-16">
          <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <KeyRound className="w-8 h-8 text-[#E5B54F]" />
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            Espace Privé &amp; Suivi de Projet
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
            Consultez l'avancement de votre site web, téléchargez vos livrables vectoriels et vos accès en toute sécurité.
          </p>

          <form onSubmit={handleLogin} className="bg-[#0E1015] border border-white/10 rounded-3xl p-6 sm:p-8 text-left space-y-4 shadow-2xl">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Code d'accès Projet
              </label>
              <input
                type="text"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Exemple : PX-884920"
                className="w-full bg-zinc-900 border border-white/15 rounded-xl px-4 py-3.5 text-xs text-white placeholder-zinc-500 font-mono tracking-wider focus:outline-none focus:border-[#E5B54F]"
              />
              <span className="text-[11px] text-zinc-500 mt-1 block">
                Indiquez le code fourni lors de la validation de votre devis (ou entrez « DEMO »).
              </span>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-xs">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>Accéder à mon espace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 text-xs text-zinc-400">
            <span>Vous n'avez pas encore de code ? </span>
            <button
              onClick={onOpenContact}
              className="text-[#E5B54F] font-semibold hover:underline cursor-pointer"
            >
              Demander l'ouverture d'un projet
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in">
          {/* Tableau de bord client */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-[#0E1015] border border-white/10">
            <div>
              <span className="text-xs font-mono text-[#E5B54F] uppercase font-bold tracking-wider">
                ESPACE SÉCURISÉ CLIENT
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">
                Bienvenue sur votre tableau de bord projet
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Projet : <span className="text-white font-mono font-bold">PX-CLIENT-2026</span>
              </p>
            </div>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="self-start sm:self-center px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-zinc-300 border border-white/10 transition-colors cursor-pointer"
            >
              Déconnexion
            </button>
          </div>

          {/* Grille de statut */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0E1015] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Phase Actuelle</span>
                <Clock className="w-4 h-4 text-[#E5B54F]" />
              </div>
              <div className="text-xl font-bold text-white">Développement Web</div>
              <p className="text-xs text-zinc-400">Intégration responsive et optimisation Core Web Vitals en cours.</p>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#E5B54F] h-full w-3/4 rounded-full" />
              </div>
              <span className="text-[11px] font-mono text-zinc-400 block text-right">Avancement : 75%</span>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1015] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Identité &amp; Fichiers</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-white">Logos HD Prêts</div>
              <p className="text-xs text-zinc-400">Déclinaisons vectorielles (SVG, PNG fond transparent, PDF Print).</p>
              <button
                onClick={() =>
                  showToast({
                    title: 'Préparation des livrables HD',
                    message: 'Le téléchargement sécurisé de votre archive ZIP démarre.',
                    type: 'info',
                  })
                }
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger le pack (ZIP)</span>
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E1015] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-400">Assistance Dédiée</span>
                <Shield className="w-4 h-4 text-[#3B82F6]" />
              </div>
              <div className="text-xl font-bold text-white">Support Actif</div>
              <p className="text-xs text-zinc-400">Votre interlocuteur dédié est disponible en direct.</p>
              <button
                onClick={onOpenContact}
                className="w-full py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <span>Envoyer un message</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
