import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ApparelCascadeCarousel } from './components/ApparelCascadeCarousel';
import { Disciplines } from './components/Disciplines';
import { ClientPartners } from './components/ClientPartners';
import { StudioSection } from './components/StudioSection';
import { ScopeEstimator } from './components/ScopeEstimator';
import { ContactDrawer } from './components/ContactDrawer';
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
    <div className="min-h-screen bg-[#08090D] text-[#F5F7FA] flex flex-col selection:bg-[#1E5EFF] selection:text-white">
      {/* Navigation Flottante & Sticky Haute Performance */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Contenu Principal */}
      <main className="flex-1">
        {/* Section Hero Conforme au Design de Référence */}
        <Hero onOpenContact={handleOpenContact} />

        {/* Services & Disciplines Clés en Main */}
        <Disciplines />

        {/* Le Carrousel de Cartes en Cascade de Créations & Vêtements */}
        <ApparelCascadeCarousel />

        {/* Projets & Entreprises Partenaires Réelles */}
        <ClientPartners />

        {/* Présentation du Studio, Approche & Valeurs */}
        <StudioSection />

        {/* Simulateur de Devis en FCFA */}
        <ScopeEstimator onPreloadBrief={handlePreloadBrief} />
      </main>

      {/* Formulaire de Contact & Devis en Français */}
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        preloadedModules={preloadedModules}
        preloadedTotalFcfa={preloadedTotalFcfa}
        preloadedTier={preloadedTier}
      />

      {/* Pied de Page Épuré */}
      <Footer onOpenContact={handleOpenContact} />
    </div>
  );
}
