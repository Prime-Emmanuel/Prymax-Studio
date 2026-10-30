import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InitialSplashLoader } from './components/InitialSplashLoader';
import { ToastProvider, useToast } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';

import { PageRoute, ServiceItem } from './types';

// Sections sous la ligne de flottaison chargées de manière différée pour réduire de >50% le JS critique du premier écran
const HomeBelowFold = lazy(() =>
  import('./components/HomeBelowFold').then(m => ({ default: m.HomeBelowFold }))
);
const Footer = lazy(() =>
  import('./components/Footer').then(m => ({ default: m.Footer }))
);
const FloatingWhatsApp = lazy(() =>
  import('./components/FloatingWhatsApp').then(m => ({ default: m.FloatingWhatsApp }))
);
const ScrollToTop = lazy(() =>
  import('./components/ScrollToTop').then(m => ({ default: m.ScrollToTop }))
);
const PageTransitionLoader = lazy(() =>
  import('./components/PageTransitionLoader').then(m => ({ default: m.PageTransitionLoader }))
);

// Chargement différé des pages secondaires et du tiroir de contact
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then(m => ({ default: m.ServicesPage }))
);
const ServiceDetailPage = lazy(() =>
  import('./pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage }))
);
const ProjectsPage = lazy(() =>
  import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage }))
);
const StudioPage = lazy(() =>
  import('./pages/StudioPage').then(m => ({ default: m.StudioPage }))
);
const PricingPage = lazy(() =>
  import('./pages/PricingPage').then(m => ({ default: m.PricingPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then(m => ({ default: m.ContactPage }))
);
const ClientPortalPage = lazy(() =>
  import('./pages/ClientPortalPage').then(m => ({ default: m.ClientPortalPage }))
);
const ContactDrawer = lazy(() =>
  import('./components/ContactDrawer').then(m => ({ default: m.ContactDrawer }))
);

const ROUTE_TITLES: Record<PageRoute, string> = {
  home: 'PRYMAX STUDIO — Création de Sites Web pour Entreprises & Branding',
  services: 'Nos Services Digitaux & Branding | PRYMAX STUDIO',
  'service-detail': 'Détail du Service | PRYMAX STUDIO',
  projets: 'Projets & Entreprises Clientes | PRYMAX STUDIO',
  studio: 'Le Studio & Notre ADN | PRYMAX STUDIO',
  devis: 'Délais d’Exécution & Devis Sur-Mesure | PRYMAX STUDIO',
  contact: 'Contact & Demande de Devis | PRYMAX STUDIO',
  portail: 'Portail Client & Suivi de Projet | PRYMAX STUDIO',
};

function getInitialRoute(): PageRoute {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '') as PageRoute;
  if (['services', 'projets', 'studio', 'devis', 'contact', 'portail'].includes(path)) {
    return path;
  }
  return 'home';
}

function AppShell() {
  const { showToast, isOnline } = useToast();

  // Écran d'ouverture initial P R Y M A X (joué une seule fois par session, sans masquer le Hero)
  const [showInitialSplash, setShowInitialSplash] = useState<boolean>(() => {
    try {
      return typeof sessionStorage !== 'undefined' && !sessionStorage.getItem('prymax_splash_seen');
    } catch {
      return false;
    }
  });

  // Transition fluide entre les pages
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [transitionHint, setTransitionHint] = useState<string | null>(null);
  const transitionTimersRef = useRef<Array<ReturnType<typeof setTimeout>>>([]);

  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getInitialRoute);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [preloadedModules, setPreloadedModules] = useState<string[]>([]);
  const [preloadedTotalFcfa, setPreloadedTotalFcfa] = useState<number | undefined>(undefined);
  const [preloadedTier, setPreloadedTier] = useState<string | undefined>(undefined);

  // Mise à jour dynamique du titre et de l'URL canonique pour le SEO
  useEffect(() => {
    const title =
      currentRoute === 'service-detail' && selectedService
        ? `${selectedService.title} | PRYMAX STUDIO`
        : ROUTE_TITLES[currentRoute] || ROUTE_TITLES.home;
    document.title = title;

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) {
      const pathSuffix =
        currentRoute === 'home'
          ? '/'
          : currentRoute === 'service-detail' && selectedService
            ? `/services/${selectedService.id}`
            : `/${currentRoute}`;
      canonicalEl.href = `https://www.prymaxstudio.com${pathSuffix}`;
    }
  }, [currentRoute, selectedService]);

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

    const slowTimer1 = setTimeout(() => {
      setTransitionHint('Presque prêt, encore une seconde...');
    }, 320);

    const slowTimer2 = setTimeout(() => {
      setTransitionHint('Finalisation de l’affichage...');
    }, 850);

    const applyTimer = setTimeout(() => {
      applyRoute();
      window.scrollTo({ top: 0, behavior: 'smooth' });

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const finishTimer = setTimeout(() => {
            clearTransitionTimers();
            setIsPageTransitioning(false);
            setTransitionHint(null);
          }, 180);
          transitionTimersRef.current.push(finishTimer);
        });
      });
    }, 120);

    transitionTimersRef.current.push(slowTimer1, slowTimer2, applyTimer);
  };

  // Synchronisation avec l'historique du navigateur
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const state = e.state;
      if (state && state.route) {
        setCurrentRoute(state.route);
        if (state.serviceId) {
          import('./data/agencyData').then(({ SERVICES }) => {
            const found = SERVICES.find(s => s.id === state.serviceId);
            if (found) setSelectedService(found);
          });
        }
      } else {
        setCurrentRoute(getInitialRoute());
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
      const nextTitle = ROUTE_TITLES[targetRoute] || ROUTE_TITLES.home;
      document.title = nextTitle;
      setCurrentRoute(targetRoute);
      try {
        const url = targetRoute === 'home' ? '/' : `/${targetRoute}`;
        window.history.pushState({ route: targetRoute }, nextTitle, url);
      } catch {
        // Ignorer si environnement sandboxed
      }
    });
  };

  const handleSelectService = (service: ServiceItem) => {
    triggerSmoothTransition(() => {
      const nextTitle = `${service.title} | PRYMAX STUDIO`;
      document.title = nextTitle;
      setSelectedService(service);
      setCurrentRoute('service-detail');
      try {
        window.history.pushState(
          { route: 'service-detail', serviceId: service.id },
          nextTitle,
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
      {/* Capsule cinétique initiale P R Y M A X (non bloquante pour le Hero) */}
      {showInitialSplash && (
        <InitialSplashLoader onComplete={() => setShowInitialSplash(false)} />
      )}

      {/* Animation de chargement rapide et fluide lors des changements de page */}
      {isPageTransitioning && (
        <Suspense fallback={null}>
          <PageTransitionLoader
            isActive={isPageTransitioning}
            statusMessage={transitionHint}
            isOffline={!isOnline}
          />
        </Suspense>
      )}

      {/* Navigation Flottante avec animation 3 couleurs (Or, Bleu, Blanc) */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenContact={handleOpenContact}
      />

      {/* Contenu Switcher de Pages Dédiées */}
      <main className="flex-1">
        {currentRoute === 'home' ? (
          <>
            <Hero
              onOpenContact={handleOpenContact}
              onNavigate={navigate}
            />

            <Suspense fallback={<div className="min-h-screen bg-[#08090D]" aria-hidden="true" />}>
              <HomeBelowFold
                onSelectService={handleSelectService}
                onOpenContact={handleOpenContact}
                onNavigate={navigate}
                onPreloadBrief={handlePreloadBrief}
              />
            </Suspense>
          </>
        ) : (
          <Suspense fallback={<div className="min-h-[60vh]" />}>
            {currentRoute === 'services' && (
              <ServicesPage
                onSelectService={handleSelectService}
                onOpenContact={handleOpenContact}
                onNavigate={navigate}
              />
            )}

            {currentRoute === 'service-detail' && (
              <ServiceDetailPage
                service={selectedService}
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
          </Suspense>
        )}
      </main>

      {/* Tiroir de Brief et Devis Rapide (chargé à la demande) */}
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactDrawer
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            preloadedModules={preloadedModules}
            preloadedTotalFcfa={preloadedTotalFcfa}
            preloadedTier={preloadedTier}
          />
        </Suspense>
      )}

      {/* Éléments flottants et Pied de Page (chargés de manière différée sous la ligne de flottaison) */}
      <Suspense fallback={null}>
        <FloatingWhatsApp />
        <ScrollToTop />
        <Footer
          onOpenContact={handleOpenContact}
          onNavigate={navigate}
        />
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <AppShell />
      </ToastProvider>
    </LanguageProvider>
  );
}
