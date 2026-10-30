import React, { useState, useEffect, useRef } from 'react';
const iconPrymax = '/assets/branding/icon_prymax.webp';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ArrowUpRight, 
  Layout, 
  Sparkles, 
  Palette, 
  TrendingUp, 
  Compass,
  ArrowRight,
  Phone,
  Briefcase,
  KeyRound,
  Info,
  Home,
  Globe,
  Check
} from 'lucide-react';
import { PageRoute } from '../types';
import { useLanguage } from '../context/LanguageContext';

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

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenContact }) => {
  const { language, setLanguage, tNav, languages } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  const serviceItems: ServiceDropdownItem[] = [
    {
      title: tNav.serviceItems.webTitle,
      description: tNav.serviceItems.webDesc,
      icon: Layout
    },
    {
      title: tNav.serviceItems.brandTitle,
      description: tNav.serviceItems.brandDesc,
      icon: Sparkles
    },
    {
      title: tNav.serviceItems.ecomTitle,
      description: tNav.serviceItems.ecomDesc,
      icon: TrendingUp
    },
    {
      title: tNav.serviceItems.designTitle,
      description: tNav.serviceItems.designDesc,
      icon: Palette
    },
    {
      title: tNav.serviceItems.seoTitle,
      description: tNav.serviceItems.seoDesc,
      icon: Compass
    }
  ];

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
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node) &&
        langButtonRef.current &&
        !langButtonRef.current.contains(event.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesDropdownOpen(false);
        setLangDropdownOpen(false);
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
    setLangDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  const currentLangOption = languages.find(l => l.code === language) || languages[0];

  return (
    <>
      {/* =========================================================================
          NAVBAR FLOTTANTE AVEC FAISCEAUX LUMINEUX 3 COULEURS EN FONDU ENCHAÎNÉ PARFAIT
         ========================================================================= */}
      <header className="fixed top-3 sm:top-5 inset-x-3 sm:inset-x-6 md:inset-x-8 max-w-[1240px] mx-auto z-40 transition-all duration-300">
        
        {/* Conteneur externe avec 3 couches rotatives de couleur en fondu enchaîné continu */}
        <div className="relative p-[1.5px] rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.7)] group">
          
          {/* Masque arrondi pour les faisceaux lumineux uniquement afin de ne pas couper les menus déroulants */}
          <div className="  absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            {/* Faisceau 1 : Or (#E5B54F) */}
            <div 
              className="absolute -inset-[150%] animate-beam-gold pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(229,181,79,0.15) 30deg, #E5B54F 75deg, #FFF0B3 95deg, rgba(229,181,79,0.6) 120deg, transparent 180deg, transparent 360deg)'
              }}
            />

            {/* Faisceau 2 : Bleu (#3B82F6) */}
            <div 
              className="absolute -inset-[150%] animate-beam-blue pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(59,130,246,0.15) 30deg, #3B82F6 75deg, #93C5FD 95deg, rgba(59,130,246,0.6) 120deg, transparent 180deg, transparent 360deg)'
              }}
            />

            {/* Faisceau 3 : Blanc (#FFFFFF) */}
            <div 
              className="absolute -inset-[150%] animate-beam-white pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.15) 30deg, #FFFFFF 75deg, #E4E4E7 95deg, rgba(255,255,255,0.6) 120deg, transparent 180deg, transparent 360deg)'
              }}
            />
          </div>

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
                width={32}
                height={32}
                decoding="async"
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain rounded-md shadow-sm group-hover/logo:scale-105 transition-transform"
              />
              <span className="font-display font-extrabold text-sm sm:text-base tracking-wider text-white">
                PRYMAX <span className="font-light text-zinc-400">STUDIO</span>
              </span>
            </button>

            {/* Navigation Desktop centrale avec pages dédiées */}
            <nav 
              className="hidden md:flex items-center gap-5 lg:gap-7 text-xs font-semibold text-zinc-300"
              aria-label="Navigation principale"
            >
              {/* Dropdown Services */}
              <div className="relative">
                <button
                  ref={dropdownButtonRef}
                  onClick={() => handleRouteClick('services')}
                  onMouseEnter={() => {
                    setLangDropdownOpen(false);
                    setServicesDropdownOpen(true);
                  }}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                    currentRoute === 'services' || currentRoute === 'service-detail'
                      ? 'text-white font-bold'
                      : 'text-zinc-300 hover:text-white'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                >
                  <span>{tNav.services}</span>
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
                      {serviceItems.map((item, idx) => {
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
                        {tNav.servicesTagline}
                      </span>
                      <button
                        onClick={() => handleRouteClick('services')}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-[#E5B54F] transition-colors cursor-pointer"
                      >
                        <span>{tNav.openServicesPage}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Page dédiée Projets & Entreprises */}
              <button 
                onClick={() => handleRouteClick('projets')}
                className={`relative py-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  currentRoute === 'projets' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>{tNav.projects}</span>
                {currentRoute === 'projets' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_white]" />
                )}
              </button>

              {/* Page Portail client */}
              <button 
                onClick={() => handleRouteClick('portail')}
                className={`relative py-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  currentRoute === 'portail' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>{tNav.portal}</span>
                {currentRoute === 'portail' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_white]" />
                )}
              </button>

              {/* Page À propos / Studio */}
              <button 
                onClick={() => handleRouteClick('studio')}
                className={`relative py-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  currentRoute === 'studio' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>{tNav.about}</span>
                {currentRoute === 'studio' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_white]" />
                )}
              </button>

              {/* Page dédiée Contact */}
              <button 
                onClick={() => handleRouteClick('contact')}
                className={`relative py-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  currentRoute === 'contact' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>{tNav.contact}</span>
                {currentRoute === 'contact' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full shadow-[0_0_8px_white]" />
                )}
              </button>
            </nav>

            {/* Actions : Sélecteur de Langue Stylé, Demander un devis & Bouton Hamburger Mobile */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Sélecteur de langue élégant (FR, EN, ES, DE, PT, IT) */}
              <div className="relative">
                <button
                  ref={langButtonRef}
                  type="button"
                  onClick={() => {
                    setServicesDropdownOpen(false);
                    setLangDropdownOpen(prev => !prev);
                  }}
                  aria-label={tNav.languageLabel}
                  aria-expanded={langDropdownOpen}
                  className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-[#E5B54F]/50 text-zinc-200 hover:text-white transition-all duration-200 cursor-pointer group/lang"
                >
                  <Globe className="w-3.5 h-3.5 text-[#E5B54F] group-hover/lang:rotate-12 transition-transform duration-200" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-white">
                    {currentLangOption.shortLabel}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${
                      langDropdownOpen ? 'rotate-180 text-[#E5B54F]' : ''
                    }`}
                  />
                </button>

                {langDropdownOpen && (
                  <div
                    ref={langDropdownRef}
                    role="menu"
                    aria-label={tNav.languageLabel}
                    className="absolute right-0 top-full mt-3 w-48 bg-[#0E1015]/98 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-1.5 text-white animate-in fade-in slide-in-from-top-2 duration-150 z-50"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-400 border-b border-white/[0.08] mb-1">
                      {tNav.languageLabel}
                    </div>
                    <div className="space-y-0.5">
                      {languages.map(option => {
                        const isActive = option.code === language;
                        return (
                          <button
                            key={option.code}
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setLanguage(option.code);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                              isActive
                                ? 'bg-[#E5B54F]/15 text-white font-bold border border-[#E5B54F]/30'
                                : 'text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent'
                            }`}
                          >
                            <span className="flex items-center gap-2.5">
                              <span
                                className={`inline-flex items-center justify-center w-6 h-5 rounded-md text-[10px] font-mono font-bold tracking-wider ${
                                  isActive
                                    ? 'bg-[#E5B54F] text-zinc-950'
                                    : 'bg-white/10 text-zinc-300'
                                }`}
                              >
                                {option.shortLabel}
                              </span>
                              <span>{option.nativeName}</span>
                            </span>
                            {isActive && <Check className="w-3.5 h-3.5 text-[#E5B54F]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={onOpenContact}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-bold text-zinc-950 bg-white hover:bg-zinc-200 active:bg-zinc-300 rounded-full transition-all duration-150 shadow-[0_2px_18px_rgba(255,255,255,0.2)] cursor-pointer whitespace-nowrap"
              >
                <span>{tNav.quoteCta}</span>
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
          MENU MOBILE REDESSINÉ : ACCUEIL, PROJETS ET ENTREPRISES, PORTAIL CLIENT,
          A PROPOS, CONTACT — AVEC ICÔNES ÉLÉGANTES ET ANIMATION SOIGNÉE
         ========================================================================= */}
      {mobileMenuOpen && (
        <>
          {/* Arrière-plan flouté pour fermer au clic extérieur */}
          <div 
            className="md:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Tiroir élégant du menu mobile */}
          <div 
            className="md:hidden fixed top-16 sm:top-20 left-3 right-3 sm:left-auto sm:right-6 sm:w-[350px] max-w-[calc(100vw-24px)] z-50 bg-[#0E1015]/95 backdrop-blur-2xl text-zinc-100 rounded-[28px] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.9)] border border-white/15 animate-in zoom-in-95 fade-in duration-200 select-none max-h-[85vh] overflow-y-auto"
            role="menu"
            aria-label="Menu mobile PRYMAX STUDIO"
          >
            {/* Barre d'en-tête du menu mobile avec bouton (X) stylé */}
            <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <img src={iconPrymax} alt="Logo" width={24} height={24} decoding="async" className="w-6 h-6 object-contain rounded-md" />
                <span className="font-display font-extrabold text-sm tracking-wider text-white">
                  PRYMAX <span className="text-zinc-400 font-light">STUDIO</span>
                </span>
              </div>

              {/* Bouton de fermeture stylé */}
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 border border-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-all cursor-pointer shadow-sm"
                aria-label="Fermer le menu"
              >
                <X className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* LISTE DES 5 ÉLÉMENTS DEMANDÉS PAR L'UTILISATEUR */}
            <div className="space-y-1.5">
              {/* 1. Accueil */}
              <button
                role="menuitem"
                onClick={() => handleRouteClick('home')}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all text-left cursor-pointer min-h-[46px] ${
                  currentRoute === 'home'
                    ? 'bg-white text-zinc-950 shadow-md font-bold'
                    : 'text-zinc-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  currentRoute === 'home' ? 'bg-zinc-900 text-white' : 'bg-white/10 text-zinc-300'
                }`}>
                  <Home className="w-4 h-4" />
                </div>
                <span className="truncate">{tNav.home}</span>
              </button>

              {/* 2. Projets et entreprises */}
              <button
                role="menuitem"
                onClick={() => handleRouteClick('projets')}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all text-left cursor-pointer min-h-[46px] ${
                  currentRoute === 'projets'
                    ? 'bg-white text-zinc-950 shadow-md font-bold'
                    : 'text-zinc-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  currentRoute === 'projets' ? 'bg-zinc-900 text-white' : 'bg-white/10 text-zinc-300'
                }`}>
                  <Briefcase className="w-4 h-4" />
                </div>
                <span className="truncate">{tNav.projects}</span>
              </button>

              {/* 3. Portail client */}
              <button
                role="menuitem"
                onClick={() => handleRouteClick('portail')}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all text-left cursor-pointer min-h-[46px] ${
                  currentRoute === 'portail'
                    ? 'bg-white text-zinc-950 shadow-md font-bold'
                    : 'text-zinc-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  currentRoute === 'portail' ? 'bg-zinc-900 text-white' : 'bg-white/10 text-zinc-300'
                }`}>
                  <KeyRound className="w-4 h-4 text-[#E5B54F]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="truncate">{tNav.portal}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E5B54F]/20 text-[#E5B54F] border border-[#E5B54F]/30">{tNav.portalBadge}</span>
                </div>
              </button>

              {/* 4. À propos */}
              <button
                role="menuitem"
                onClick={() => handleRouteClick('studio')}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all text-left cursor-pointer min-h-[46px] ${
                  currentRoute === 'studio'
                    ? 'bg-white text-zinc-950 shadow-md font-bold'
                    : 'text-zinc-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  currentRoute === 'studio' ? 'bg-zinc-900 text-white' : 'bg-white/10 text-zinc-300'
                }`}>
                  <Info className="w-4 h-4" />
                </div>
                <span className="truncate">{tNav.about}</span>
              </button>

              {/* 5. Contact */}
              <button
                role="menuitem"
                onClick={() => handleRouteClick('contact')}
                className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all text-left cursor-pointer min-h-[46px] ${
                  currentRoute === 'contact'
                    ? 'bg-white text-zinc-950 shadow-md font-bold'
                    : 'text-zinc-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  currentRoute === 'contact' ? 'bg-zinc-900 text-white' : 'bg-white/10 text-zinc-300'
                }`}>
                  <Phone className="w-4 h-4" />
                </div>
                <span className="truncate">{tNav.contact}</span>
              </button>
            </div>

            {/* Sélecteur de langue mobile (6 langues) */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 px-1 mb-2">
                <Globe className="w-3.5 h-3.5 text-[#E5B54F]" />
                <span>{tNav.languageLabel}</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {languages.map(option => {
                  const isActive = option.code === language;
                  return (
                    <button
                      key={option.code}
                      type="button"
                      onClick={() => setLanguage(option.code)}
                      className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#E5B54F] text-zinc-950 font-bold shadow-sm'
                          : 'bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10'
                      }`}
                    >
                      <span className="font-mono text-[10px] uppercase">{option.shortLabel}</span>
                      <span className="truncate text-[11px]">{option.nativeName}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Séparateur */}
            <div className="my-3 border-t border-white/10" />

            {/* Bouton d'action principal propre */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-zinc-950 bg-white hover:bg-zinc-200 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-left min-h-[46px] shadow-lg"
            >
              <span>{tNav.quoteCta}</span>
              <ArrowUpRight className="w-4 h-4 text-zinc-950" />
            </button>

            {/* Email de contact direct propre */}
            <div className="pt-3 mt-2 border-t border-white/10 text-[11px] text-zinc-400 px-2 flex items-center justify-between">
              <span>prymaxstudio@gmail.com</span>
              <span className="text-zinc-300 font-medium">Studio Digital</span>
            </div>

          </div>
        </>
      )}
    </>
  );
};
