import React, { useState, useEffect, useRef } from 'react';
import iconPrymax from '../assets/branding/icon_prymax.png';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowUpRight, 
  Layout, 
  Smartphone, 
  Sparkles, 
  Palette, 
  TrendingUp, 
  Compass,
  ArrowRight,
  Phone,
  MessageCircle,
  Briefcase,
  Layers,
  MapPin
} from 'lucide-react';
import { PageRoute } from '../types';

interface NavbarProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenContact: () => void;
}

interface ServiceDropdownItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

const SERVICE_ITEMS: ServiceDropdownItem[] = [
  {
    title: 'Création de Sites Web Entreprises',
    description: 'Vitrines ultra-rapides, One-Page et plateformes web sur-mesure.',
    icon: Layout
  },
  {
    title: 'Branding & Identité Visuelle',
    description: 'Logos originaux, typographies et chartes graphiques de marque.',
    icon: Sparkles
  },
  {
    title: 'E-Commerce & Vente en Ligne',
    description: 'Boutiques sécurisées avec paiement Orange Money, MTN et Carte.',
    icon: TrendingUp
  },
  {
    title: 'Design Graphique & Mockups 3D',
    description: 'Rendus photoréalistes pour t-shirts, pulls et papeterie.',
    icon: Palette
  },
  {
    title: 'SEO & Visibilité Google Maps',
    description: 'Positionnement local à Douala et acquisition de clients qualifiés.',
    icon: Compass
  }
];

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermeture des menus au clic extérieur & touche Echap
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target as Node)
      ) {
        setServicesDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Bloquer le scroll d'arrière-plan quand le menu mobile est ouvert
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleRouteClick = (route: PageRoute) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <>
      {/* =========================================================================
          NAVBAR FLOTTANTE DÉTACHÉE AVEC BORDURE ANIMÉE EN 3 COULEURS (OR, BLEU, BLANC)
         ========================================================================= */}
      <header className="fixed top-3 sm:top-5 inset-x-3 sm:inset-x-6 md:inset-x-8 max-w-[1240px] mx-auto z-40 transition-all duration-300">
        
        {/* Conteneur externe arrondi avec faisceau lumineux rotatif 3 couleurs */}
        <div className="relative p-[1.5px] rounded-full overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.7)] group">
          
          {/* Faisceau lumineux qui alterne cycliquement : Or -> Bleu -> Blanc */}
          <div 
            className="absolute -inset-[150%] animate-navbar-beam pointer-events-none opacity-90"
          />

          {/* Intérieur de la Navbar */}
          <div 
            className={`relative w-full px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 flex items-center justify-between gap-4 ${
              isScrolled
                ? 'bg-[#08090D]/95 backdrop-blur-xl'
                : 'bg-[#0B0C11]/90 backdrop-blur-md'
            }`}
          >
            {/* Logo officiel PRYMAX STUDIO */}
            <button 
              onClick={() => handleRouteClick('home')}
              className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group/logo cursor-pointer text-left focus:outline-none"
              aria-label="Accueil PRYMAX STUDIO"
            >
              <img 
                src={iconPrymax} 
                alt="Logo PRYMAX STUDIO" 
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-md shadow-sm group-hover/logo:scale-105 transition-transform"
              />
              <span className="font-display font-extrabold text-sm sm:text-base tracking-wider text-white">
                PRYMAX <span className="font-light text-zinc-400">STUDIO</span>
              </span>
            </button>

            {/* Navigation Desktop centrale avec pages dédiées */}
            <nav 
              className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold text-zinc-300"
              aria-label="Navigation principale"
            >
              {/* Dropdown Services -> Ouvre la page dédiée /services */}
              <div className="relative">
                <button
                  ref={dropdownButtonRef}
                  onClick={() => handleRouteClick('services')}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer ${
                    currentRoute === 'services' || currentRoute === 'service-detail'
                      ? 'text-white font-bold'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                >
                  <span>Nos Services</span>
                  <ChevronDown 
                    className={`w-3.5 h-3.5 transition-transform duration-200 text-zinc-400 ${
                      servicesDropdownOpen ? 'rotate-180 text-white' : ''
                    }`} 
                  />
                  {(currentRoute === 'services' || currentRoute === 'service-detail') && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_white]" />
                  )}
                </button>

                {/* Panneau déroulant avec accès à la page dédiée */}
                {servicesDropdownOpen && (
                  <div 
                    ref={dropdownRef}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[590px] bg-[#0E1015] border border-white/15 rounded-3xl shadow-2xl p-5 text-white animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  >
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {SERVICE_ITEMS.map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                          <button
                            key={idx}
                            onClick={() => handleRouteClick('services')}
                            className="group/item flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.08] transition-colors border border-transparent hover:border-white/10 text-left w-full cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-white transition-colors">
                              <IconComponent className="w-4 h-4 text-white group-hover/item:text-black transition-colors" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white group-hover/item:text-[#E5B54F] transition-colors">
                                {item.title}
                              </div>
                              <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                                {item.description}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs px-2">
                      <span className="text-[11px] text-zinc-400">
                        Du site web pour entreprise au branding d'exception
                      </span>
                      <button
                        onClick={() => handleRouteClick('services')}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#E5B54F] transition-colors cursor-pointer"
                      >
                        <span>Ouvrir la page des services</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Page dédiée Projets & Entreprises */}
              <button 
                onClick={() => handleRouteClick('projets')}
                className={`relative py-1.5 transition-colors cursor-pointer ${
                  currentRoute === 'projets' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>Projets</span>
                {currentRoute === 'projets' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_white]" />
                )}
              </button>

              {/* Page dédiée Studio */}
              <button 
                onClick={() => handleRouteClick('studio')}
                className={`relative py-1.5 transition-colors cursor-pointer ${
                  currentRoute === 'studio' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>Studio</span>
                {currentRoute === 'studio' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_white]" />
                )}
              </button>

              {/* Page dédiée Délais & Devis */}
              <button 
                onClick={() => handleRouteClick('devis')}
                className={`relative py-1.5 transition-colors cursor-pointer ${
                  currentRoute === 'devis' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>Délais &amp; Devis</span>
                {currentRoute === 'devis' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_white]" />
                )}
              </button>

              {/* Page dédiée Contact */}
              <button 
                onClick={() => handleRouteClick('contact')}
                className={`relative py-1.5 transition-colors cursor-pointer ${
                  currentRoute === 'contact' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>Contact</span>
                {currentRoute === 'contact' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_white]" />
                )}
              </button>
            </nav>

            {/* Actions : Demander un devis & Bouton Hamburger Mobile */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={onOpenContact}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-bold text-zinc-950 bg-white hover:bg-zinc-200 active:bg-zinc-300 rounded-full transition-all duration-150 shadow-[0_2px_18px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                <span>DEMANDER UN DEVIS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Bouton Menu Mobile */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 min-w-[42px] min-h-[42px] flex items-center justify-center text-zinc-200 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors cursor-pointer"
                aria-label="Ouvrir le menu de navigation"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MENU MOBILE AVEC PAGES DÉDIÉES ET BOUTON FERMER (X) TRÈS ÉLÉGANT
         ========================================================================= */}
      {mobileMenuOpen && (
        <>
          {/* Arrière-plan flouté pour fermer au clic extérieur */}
          <div 
            className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Carte flottante du menu mobile */}
          <div 
            className="md:hidden fixed top-16 sm:top-20 left-3 right-3 sm:left-auto sm:right-6 sm:w-[340px] max-w-[calc(100vw-24px)] z-50 bg-[#0E1015] text-zinc-100 rounded-3xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-white/15 animate-in zoom-in-95 fade-in duration-150 select-none max-h-[85vh] overflow-y-auto"
            role="menu"
            aria-label="Menu mobile PRYMAX STUDIO"
          >
            {/* Barre supérieure avec bouton Fermer (X) stylé */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img src={iconPrymax} alt="Logo" className="w-6 h-6 object-contain rounded" />
                <span className="text-xs font-extrabold tracking-wider text-white">
                  PRYMAX STUDIO
                </span>
              </div>

              {/* Bouton (X) très soigné et tactile */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer"
                aria-label="Fermer le menu mobile"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Élément 1 : Accueil */}
            <button
              role="menuitem"
              onClick={() => handleRouteClick('home')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-colors text-left cursor-pointer min-h-[44px] ${
                currentRoute === 'home'
                  ? 'bg-white/10 text-white font-bold border border-white/15'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <span className="truncate">Accueil</span>
            </button>

            {/* Élément 2 : Nos Services */}
            <button
              role="menuitem"
              onClick={() => handleRouteClick('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-colors text-left cursor-pointer mt-1 min-h-[44px] ${
                currentRoute === 'services' || currentRoute === 'service-detail'
                  ? 'bg-white/10 text-white font-bold border border-white/15'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-[#E5B54F]/20 text-[#E5B54F] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="truncate">Nos Services Dédiés</span>
            </button>

            {/* Élément 3 : Projets & Entreprises */}
            <button
              role="menuitem"
              onClick={() => handleRouteClick('projets')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-colors text-left cursor-pointer mt-1 min-h-[44px] ${
                currentRoute === 'projets'
                  ? 'bg-white/10 text-white font-bold border border-white/15'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 text-zinc-300 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="truncate">Projets &amp; Entreprises</span>
            </button>

            {/* Élément 4 : Le Studio */}
            <button
              role="menuitem"
              onClick={() => handleRouteClick('studio')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-colors text-left cursor-pointer mt-1 min-h-[44px] ${
                currentRoute === 'studio'
                  ? 'bg-white/10 text-white font-bold border border-white/15'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 text-zinc-300 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <span className="truncate">Le Studio (Approche)</span>
            </button>

            {/* Élément 5 : Délais & Devis */}
            <button
              role="menuitem"
              onClick={() => handleRouteClick('devis')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-colors text-left cursor-pointer mt-1 min-h-[44px] ${
                currentRoute === 'devis'
                  ? 'bg-white/10 text-white font-bold border border-white/15'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 text-zinc-300 flex items-center justify-center shrink-0">
                <Palette className="w-4 h-4" />
              </div>
              <span className="truncate">Délais &amp; Devis FCFA</span>
            </button>

            {/* Élément 6 : Contact */}
            <button
              role="menuitem"
              onClick={() => handleRouteClick('contact')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-medium text-sm transition-colors text-left cursor-pointer mt-1 min-h-[44px] ${
                currentRoute === 'contact'
                  ? 'bg-white/10 text-white font-bold border border-white/15'
                  : 'text-zinc-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 text-zinc-300 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span className="truncate">Contact Direct</span>
            </button>

            {/* Ligne de séparation */}
            <div className="my-2 border-t border-white/10" />

            {/* Bouton CTA Demande de Devis */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-zinc-950 bg-white hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-left min-h-[46px] shadow-lg"
            >
              <span>Demander un devis</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-950" />
            </button>

            {/* Contact WhatsApp */}
            <a
              href="https://wa.me/237681078004?text=Bonjour%20PRYMAX%20STUDIO%2C%20je%20souhaite%20un%20devis%20pour%20mon%20projet."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-emerald-400 hover:bg-emerald-500/10 font-semibold text-xs transition-colors mt-1.5 min-h-[44px]"
            >
              <div className="w-7 h-7 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="truncate">WhatsApp : +237 681 078 004</span>
            </a>

            {/* Localisation strictly Douala, Cameroun */}
            <div className="pt-2.5 mt-2 border-t border-white/10 text-[11px] text-zinc-400 px-3 flex items-center justify-between">
              <span className="truncate">prymaxstudio@gmail.com</span>
              <span className="flex items-center gap-1 text-white font-medium">
                <MapPin className="w-3 h-3 text-[#E5B54F]" />
                <span>Douala, Cameroun</span>
              </span>
            </div>

          </div>
        </>
      )}
    </>
  );
};
