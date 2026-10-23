import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Disciplines } from './components/Disciplines';
import { ClientPartners } from './components/ClientPartners';
import { StudioSection } from './components/StudioSection';
import { ScopeEstimator } from './components/ScopeEstimator';
import { ContactDrawer } from './components/ContactDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

// Pages dédiées
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { StudioPage } from './pages/StudioPage';
import { PricingPage } from './pages/PricingPage';
import { ContactPage } from './pages/ContactPage';
import { ClientPortalPage } from './pages/ClientPortalPage';
import { ScrollToTop } from './components/ScrollToTop';

import { PageRoute, ServiceItem } from './types';
import { SERVICES } from './data/agencyData';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preloadedModules, setPreloadedModules] = useState<string[]>([]);
  const [preloadedTotalFcfa, setPreloadedTotalFcfa] = useState<number | undefined>(undefined);
  const [preloadedTier, setPreloadedTier] = useState<string | undefined>(undefined);

  // Synchronisation avec l'historique du navigateur
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;
      if (state && state.route) {
        setCurrentRoute(state.route);
        if (state.serviceId) {
          const found = SERVICES.find(s => s.id === state.serviceId);
          if (found) setSelectedService(found);
        }
      } else {
        const path = window.location.pathname.replace('/', '') as PageRoute;
        if (['services', 'projets', 'studio', 'devis', 'contact'].includes(path)) {
          setCurrentRoute(path);
        } else {
          setCurrentRoute('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: string) => {
    const targetRoute = route as PageRoute;
    setCurrentRoute(targetRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const url = targetRoute === 'home' ? '/' : `/${targetRoute}`;
      window.history.pushState({ route: targetRoute }, '', url);
    } catch {
      // Ignore si environnement sandboxed
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    setSelectedService(service);
    setCurrentRoute('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      window.history.pushState(
        { route: 'service-detail', serviceId: service.id }, 
        '', 
        `/services/${service.id}`
      );
    } catch {
      // Ignore
    }
  };

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
      {/* Navigation Flottante avec animation 3 couleurs (Or, Bleu, Blanc) et menu mobile avec bouton (X) */}
      <Navbar 
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenContact={handleOpenContact} 
      />

      {/* Contenu Switcher de Pages Dédiées */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <>
            {/* Hero avec titre axé Création de Sites Web Entreprises & Arrière-plan mobile stylé */}
            <Hero 
              onOpenContact={handleOpenContact} 
              onNavigate={navigate}
            />

            {/* Section Services avec cartes stylées en cascade 3D, liseré doré lumineux running, et bouton Inquire */}
            <Disciplines 
              onSelectService={handleSelectService}
              onOpenContact={handleOpenContact}
              onNavigate={navigate}
            />

            {/* Section Entreprises avec les 6 entreprises demandées, logos officiels et liens web */}
            <ClientPartners 
              onOpenContact={handleOpenContact}
              onNavigate={navigate}
            />

            {/* Présentation du Studio et Méthode Freelance */}
            <StudioSection />

            {/* Transparence Totale : Tarifs FCFA & Devis */}
            <ScopeEstimator onPreloadBrief={handlePreloadBrief} />
          </>
        )}

        {currentRoute === 'services' && (
          <ServicesPage 
            onSelectService={handleSelectService}
            onOpenContact={handleOpenContact}
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'service-detail' && (
          <ServiceDetailPage 
            service={selectedService || SERVICES[0]}
            onBack={() => navigate('services')}
            onOpenContact={handleOpenContact}
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'projets' && (
          <ProjectsPage 
            onOpenContact={handleOpenContact}
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'studio' && (
          <StudioPage 
            onOpenContact={handleOpenContact}
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'devis' && (
          <PricingPage 
            onPreloadBrief={handlePreloadBrief}
            onOpenContact={handleOpenContact}
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'contact' && (
          <ContactPage 
            onNavigate={navigate}
          />
        )}

        {currentRoute === 'portail' && (
          <ClientPortalPage 
            onNavigate={navigate}
            onOpenContact={handleOpenContact}
          />
        )}
      </main>

      {/* Tiroir de Brief et Devis Rapide */}
      <ContactDrawer
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        preloadedModules={preloadedModules}
        preloadedTotalFcfa={preloadedTotalFcfa}
        preloadedTier={preloadedTier}
      />

      {/* Bouton Flottant WhatsApp Authentique */}
      <FloatingWhatsApp />

      {/* Bouton Élégant Retour en Haut de Page */}
      <ScrollToTop />

      {/* Pied de Page Épuré */}
      <Footer 
        onOpenContact={handleOpenContact} 
        onNavigate={navigate}
      />
    </div>
  );
}
