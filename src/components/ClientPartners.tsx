import React, { useState } from 'react';
import { ClientPartner } from '../types';
import { INITIAL_CLIENTS } from '../data/agencyData';
import { Building2, Plus, CheckCircle, Trash2, Tag, ShieldCheck } from 'lucide-react';

export const ClientPartners: React.FC = () => {
  const [clients, setClients] = useState<ClientPartner[]>(INITIAL_CLIENTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newClientSector, setNewClientSector] = useState('');
  const [newClientService, setNewClientService] = useState('');
  const [newClientStatus, setNewClientStatus] = useState<'Projet Livré' | 'En Cours' | 'Partenaire'>('Projet Livré');
  const [newClientHighlight, setNewClientHighlight] = useState('');

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newEntry: ClientPartner = {
      id: `cl-${Date.now()}`,
      name: newClientName.trim(),
      sector: newClientSector.trim() || 'Commerce & Services',
      serviceProvided: newClientService.trim() || 'Site Web & Identité Graphique',
      status: newClientStatus,
      highlight: newClientHighlight.trim() || 'Projet livré avec succès'
    };

    setClients([newEntry, ...clients]);
    setNewClientName('');
    setNewClientSector('');
    setNewClientService('');
    setNewClientHighlight('');
    setShowAddForm(false);
  };

  const handleRemoveClient = (id: string) => {
    setClients(clients.filter(c => c.id !== id));
  };

  return (
    <section id="projets" className="py-16 sm:py-24 bg-[#08090B] relative scroll-mt-20">
      <div id="clients" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* En-tête de section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E5B54F] mb-2.5">
              <span>Entreprises &amp; Références</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>PRYMAX STUDIO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Les entreprises qui nous font confiance
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-xl">
              Toutes les entreprises fictives ont été retirées. Voici l’espace structuré pour afficher vos vrais clients actuels et passés.
            </p>
          </div>

          {/* Bouton pour ajouter facilement vos vraies entreprises */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="min-h-[44px] self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#08090B] bg-[#E5B54F] hover:bg-[#F2C768] rounded-lg transition-colors cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Fermer le formulaire' : 'Ajouter un Vrai Client'}</span>
          </button>
        </div>

        {/* Formulaire simple d'ajout de client en direct */}
        {showAddForm && (
          <form 
            onSubmit={handleAddClient} 
            className="mb-12 p-6 sm:p-8 bg-[#121419] border border-[#E5B54F]/40 rounded-2xl shadow-2xl animate-in fade-in duration-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-[#E5B54F]" />
              <h3 className="text-lg font-bold text-white">Ajouter une entreprise / client réel</h3>
            </div>
            <p className="text-xs text-zinc-400 mb-6">
              Renseignez le nom de votre client et la prestation réalisée pour l'afficher immédiatement sur votre site.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Nom de l'entreprise cliente *
                </label>
                <input
                  type="text"
                  required
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  placeholder="ex: Kroma BTP, Salon Prestige..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Secteur d'activité
                </label>
                <input
                  type="text"
                  value={newClientSector}
                  onChange={(e) => setNewClientSector(e.target.value)}
                  placeholder="ex: Mode, Restauration, Immobilier..."
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Statut de la collaboration
                </label>
                <select
                  value={newClientStatus}
                  onChange={(e) => setNewClientStatus(e.target.value as any)}
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#E5B54F]"
                >
                  <option value="Projet Livré">Projet Livré</option>
                  <option value="En Cours">En Cours</option>
                  <option value="Partenaire">Partenaire Récurrent</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Prestation réalisée
                </label>
                <input
                  type="text"
                  value={newClientService}
                  onChange={(e) => setNewClientService(e.target.value)}
                  placeholder="ex: Site E-commerce + 100 T-shirts floqués"
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Résultat ou détail marquant
                </label>
                <input
                  type="text"
                  value={newClientHighlight}
                  onChange={(e) => setNewClientHighlight(e.target.value)}
                  placeholder="ex: +40% de ventes en ligne en 2 mois"
                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E5B54F]"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#E5B54F] hover:bg-[#F2C768] text-[#08090B] font-bold text-xs uppercase rounded-lg transition-colors cursor-pointer"
              >
                Enregistrer la Référence
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2.5 bg-zinc-800 text-zinc-400 hover:text-white rounded-lg text-xs"
              >
                Annuler
              </button>
            </div>
          </form>
        )}

        {/* Liste des entreprises clientes réelles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clients.map((client) => (
            <div
              key={client.id}
              className="bg-[#111317] border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono uppercase text-zinc-400">
                    {client.sector}
                  </span>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                    client.status === 'Projet Livré'
                      ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                      : client.status === 'En Cours'
                      ? 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                      : 'border-[#E5B54F]/30 text-[#E5B54F] bg-[#E5B54F]/10'
                  }`}>
                    {client.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#E5B54F] transition-colors">
                  {client.name}
                </h3>

                <div className="p-3 bg-zinc-900/70 rounded-lg border border-white/5 text-xs text-zinc-300 mb-4">
                  <div className="text-[10px] font-mono text-zinc-500 uppercase mb-0.5">Prestation :</div>
                  <div className="font-medium text-white">{client.serviceProvided}</div>
                </div>

                <div className="text-xs text-zinc-400 flex items-start gap-1.5">
                  <span className="text-[#E5B54F] font-bold">✓</span>
                  <span>{client.highlight}</span>
                </div>
              </div>

              {/* Bouton de suppression pratique si besoin */}
              <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500">Client Référencé</span>
                <button
                  onClick={() => handleRemoveClient(client.id)}
                  className="p-1.5 text-zinc-500 hover:text-rose-400 rounded transition-colors"
                  title="Supprimer cette référence"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Message d'accompagnement */}
        <div className="mt-8 p-4 bg-zinc-900/50 rounded-xl border border-white/5 flex items-center gap-3 text-xs text-zinc-400">
          <ShieldCheck className="w-5 h-5 text-[#E5B54F] shrink-0" />
          <span>
            Cet espace est prêt pour accueillir tous vos vrais logos de clients, photos de réalisations ou témoignages au fur et à mesure de vos projets.
          </span>
        </div>

      </div>
    </section>
  );
};
