import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Disciplines } from './components/Disciplines';
import { ClientPartners } from './components/ClientPartners';
import { StudioSection } from './components/StudioSection';
import { ScopeEstimator } from './components/ScopeEstimator';
import { ContactDrawer } from './components/ContactDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preloadedModules, setPreloadedModules] = useState<string[]>([]);
  const [preloadedTotalFcfa, setPreloadedTotalFcfa] = useState<number | undefined>(undefined);
  const [preloadedTier, setPreloadedTier] = useState<string | undefined>(undefined);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handlePreloadBrief = (modules: string[], totalFcfa: number, tier: string) => {
    setPreloadedModules(modules);
    setPreloadedTotalFcfa(totalFcfa);
    setPreloadedTier(tier);
    setIsContactOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#08090D] text-[#F5F7FA] flex flex-col selection:bg-white selection:text-black">
      {/* Navigation Flottante & Détachée avec Extrémités Arrondies */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Contenu Principal */}
      <main className="flex-1">
        {/* Section Hero Conforme au Design avec Animations et Planche de Marque Réelle */}
        <Hero onOpenContact={handleOpenContact} />

        {/* Services Clés en Main avec Branding mis en valeur */}
        <Disciplines />

        {/* Projets & Références Réelles */}
        <ClientPartners />

        {/* Présentation du Studio, Approche & Valeurs */}
        <StudioSection />

        {/* Transparence Totale : Tarifs en FCFA & Formulaire Devis Personnalisé */}
        <ScopeEstimator onPreloadBrief={handlePreloadBrief} />
      </main>

      {/* Tiroir de Brief et Devis Rapide */}
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        preloadedModules={preloadedModules}
        preloadedTotalFcfa={preloadedTotalFcfa}
        preloadedTier={preloadedTier}
      />

      {/* Bouton Flottant WhatsApp Stylé (+237 681 078 004) */}
      <FloatingWhatsApp />

      {/* Pied de Page Épuré */}
      <Footer onOpenContact={handleOpenContact} />
    </div>
  );
}
