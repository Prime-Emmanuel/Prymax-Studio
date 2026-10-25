import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Disciplines } from './components/Disciplines';
import { ClientPartners } from './components/ClientPartners';
import { StudioSection } from './components/StudioSection';
import { ScopeEstimator } from './components/ScopeEstimator';
import { ContactDrawer } from './components/ContactDrawer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';
import { InitialSplashLoader } from './components/InitialSplashLoader';
import { PageTransitionLoader } from './components/PageTransitionLoader';
import { ToastProvider, useToast } from './context/ToastContext';

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

function AppShell() {
  const { showToast, isOnline } = useToast();

  // Écran d'ouverture initial P R Y M A X
  const [showInitialSplash, setShowInitialSplash] = useState(true);

  // Transition fluide entre les pages
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [transitionHint, setTransitionHint] = useState<string | null>(null);
  const transitionTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preloadedModules, setPreloadedModules] = useState<string[]>([]);
  const [preloadedTotalFcfa, setPreloadedTotalFcfa] = useState<number | undefined>(undefined);
  const [preloadedTier, setPreloadedTier] = useState<string | undefined>(undefined);

  const clearTransitionTimers = () => {
    transitionTimersRef.current.forEach(clearTimeout);
    transitionTimersRef.current = [];
  };

  const triggerSmoothTransition = (applyRoute: () => void) => {
    clearTransitionTimers();

    if (!navigator.onLine) {
      setTransitionHint('Connexion Internet instable — ouverture depuis le cache local...');
      showToast({
        title: 'Connexion Internet instable',
        message: 'Certaines images haute définition peuvent mettre une seconde de plus à charger.',
        type: 'warning',
        duration: 3800,
      });
    } else {
      setTransitionHint(null);
    }

    setIsPageTransitioning(true);

    // Si le réseau ou le rendu prend un peu plus de temps, afficher un message rassurant
    const slowTimer1 = setTimeout(() => {
      setTransitionHint('Presque prêt, encore une seconde...');
    }, 320);

    const slowTimer2 = setTimeout(() => {
      setTransitionHint('Finalisation de l’affichage...');
    }, 850);

    // Mesure du temps réel de rendu de la nouvelle vue via requestAnimationFrame
    const applyTimer = setTimeout(() => {
      applyRoute();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const finishTimer = setTimeout(() => {
            clearTransitionTimers();
            setIsPageTransitioning(false);
            setTransitionHint(null);
          }, 220);
          transitionTimersRef.current.push(finishTimer);
        });
      });
    }, 160);

    transitionTimersRef.current.push(slowTimer1, slowTimer2, applyTimer);
  };

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
        if (['services', 'projets', 'studio', 'devis', 'contact', 'portail'].includes(path)) {
          setCurrentRoute(path);
        } else {
          setCurrentRoute('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      clearTransitionTimers();
    };
  }, []);

  const navigate = (route: string) => {
    const targetRoute = route as PageRoute;
    if (targetRoute === currentRoute) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    triggerSmoothTransition(() => {
      setCurrentRoute(targetRoute);
      try {
        const url = targetRoute === 'home' ? '/' : `/${targetRoute}`;
        window.history.pushState({ route: targetRoute }, '', url);
      } catch {
        // Ignorer si environnement sandboxed
      }
    });
  };

  const handleSelectService = (service: ServiceItem) => {
    triggerSmoothTransition(() => {
      setSelectedService(service);
      setCurrentRoute('service-detail');
      try {
        window.history.pushState(
          { route: 'service-detail', serviceId: service.id },
          '',
          `/services/${service.id}`
        );
      } catch {
        // Ignorer
      }
    });
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
      {/* Écran d'ouverture initial P R Y M A X avec lettres animées et halo lumineux */}
      {showInitialSplash && (
        <InitialSplashLoader onComplete={() => setShowInitialSplash(false)} />
      )}

      {/* Animation de chargement rapide et fluide lors des changements de page */}
      <PageTransitionLoader
        isActive={isPageTransitioning}
        statusMessage={transitionHint}
        isOffline={!isOnline}
      />

      {/* Navigation Flottante avec animation 3 couleurs (Or, Bleu, Blanc) */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenContact={handleOpenContact}
      />

      {/* Contenu Switcher de Pages Dédiées */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <>
            <Hero
              onOpenContact={handleOpenContact}
              onNavigate={navigate}
            />

            <Disciplines
              onSelectService={handleSelectService}
              onOpenContact={handleOpenContact}
              onNavigate={navigate}
            />

            <ClientPartners
              onOpenContact={handleOpenContact}
              onNavigate={navigate}
            />

            <StudioSection />

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

export default function App() {
  return (
    <ToastProvider>
      <AppShell />
      <Analytics />
    </ToastProvider>
  );
}
