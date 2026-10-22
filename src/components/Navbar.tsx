import React, { useState, useEffect, useRef } from 'react';
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
  ArrowRight
} from 'lucide-react';

interface NavbarProps {
  onOpenContact: () => void;
}

interface ServiceDropdownItem {
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
}

const SERVICE_ITEMS: ServiceDropdownItem[] = [
  {
    title: 'Web Design & Development',
    description: 'Sites vitrines ultra-rapides, plateformes sur-mesure et e-commerce.',
    icon: Layout,
    href: '#services'
  },
  {
    title: 'Applications Mobiles',
    description: 'Applications iOS et Android fluides, intuitives et performantes.',
    icon: Smartphone,
    href: '#services'
  },
  {
    title: 'Branding & Identité Visuelle',
    description: 'Logos sur-mesure, chartes graphiques complètes et univers de marque.',
    icon: Sparkles,
    href: '#services'
  },
  {
    title: 'Design Graphique',
    description: 'Affiches, supports digitaux, packaging et papeterie d’entreprise.',
    icon: Palette,
    href: '#services'
  },
  {
    title: 'Solutions Digitales & SEO',
    description: 'Référencement Google, vitesse d’exécution et acquisition client.',
    icon: TrendingUp,
    href: '#services'
  },
  {
    title: 'UI/UX & Stratégie Produit',
    description: 'Maquettes Figma interactives, parcours utilisateur et conversion.',
    icon: Compass,
    href: '#services'
  }
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'services' | 'projets' | 'studio' | 'contact' | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  // Détection du scroll pour compacter la navbar de façon élégante
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Détection de section active
      const scrollPos = window.scrollY + 200;
      const servicesEl = document.getElementById('services');
      const projetsEl = document.getElementById('projets') || document.getElementById('clients');
      const studioEl = document.getElementById('studio');

      if (studioEl && scrollPos >= studioEl.offsetTop) {
        setActiveSection('studio');
      } else if (projetsEl && scrollPos >= projetsEl.offsetTop) {
        setActiveSection('projets');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop) {
        setActiveSection('services');
      } else {
        setActiveSection(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermeture du dropdown au clic en dehors et touche Echap
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

  // Bloquer le scroll d'arrière-plan quand le menu mobile plein écran est ouvert
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

  const handleServiceClick = (href: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled 
          ? 'bg-[#08090D]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-xl' 
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-6 h-full">
        
        {/* =========================================================================
            ZONE 1 : LOGO OFFICIEL PRYMAX STUDIO (Sans vêtements ni digital)
           ========================================================================= */}
        <a 
          href="#" 
          className="group flex items-center gap-3 whitespace-nowrap shrink-0 transition-opacity hover:opacity-95"
          aria-label="Accueil PRYMAX STUDIO"
        >
          <img 
            src="/src/assets/branding/icon_prymax.png" 
            alt="Logo PRYMAX STUDIO" 
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-md shadow-sm"
          />
          <span className="font-display font-extrabold text-base sm:text-lg tracking-wider text-white">
            PRYMAX <span className="font-light text-zinc-400">STUDIO</span>
          </span>
        </a>

        {/* =========================================================================
            ZONE 2 : NAVIGATION PRINCIPALE DESKTOP
           ========================================================================= */}
        <nav 
          className="hidden md:flex items-center gap-7 lg:gap-8 text-[13px] font-medium text-zinc-300"
          aria-label="Navigation principale"
        >
          {/* Item Services avec Dropdown structuré */}
          <div className="relative">
            <button
              ref={dropdownButtonRef}
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              className={`flex items-center gap-1.5 py-1.5 transition-colors duration-150 cursor-pointer ${
                servicesDropdownOpen || activeSection === 'services'
                  ? 'text-white font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
            >
              <span>Services</span>
              <ChevronDown 
                className={`w-3.5 h-3.5 transition-transform duration-200 text-zinc-400 ${
                  servicesDropdownOpen ? 'rotate-180 text-[#1E5EFF]' : ''
                }`} 
              />
              {activeSection === 'services' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E5EFF] rounded-full" />
              )}
            </button>

            {/* Le Dropdown élégant et spacieux */}
            {servicesDropdownOpen && (
              <div 
                ref={dropdownRef}
                onMouseLeave={() => setServicesDropdownOpen(false)}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-[#0E1015] border border-white/10 rounded-2xl shadow-2xl p-5 text-white animate-in fade-in slide-in-from-top-2 duration-150 z-50"
              >
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {SERVICE_ITEMS.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <a
                        key={idx}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleServiceClick(item.href);
                        }}
                        className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-white/[0.05] transition-colors duration-150 border border-transparent hover:border-white/5"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#1E5EFF]/10 border border-[#1E5EFF]/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-[#1E5EFF] transition-colors duration-150">
                          <IconComponent className="w-4 h-4 text-[#1E5EFF] group-hover/item:text-white transition-colors duration-150" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white group-hover/item:text-[#1E5EFF] transition-colors duration-150 flex items-center gap-1">
                            <span>{item.title}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-snug mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs px-2">
                  <span className="text-[11px] text-zinc-400">
                    Des solutions créatives et techniques sur-mesure
                  </span>
                  <a
                    href="#services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleServiceClick('#services');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E5EFF] hover:text-blue-400 transition-colors"
                  >
                    <span>Découvrir tous nos services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Lien Projets */}
          <a 
            href="#projets" 
            className={`relative py-1.5 transition-colors duration-150 ${
              activeSection === 'projets' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            <span>Projets</span>
            {activeSection === 'projets' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E5EFF] rounded-full" />
            )}
          </a>

          {/* Lien Studio */}
          <a 
            href="#studio" 
            className={`relative py-1.5 transition-colors duration-150 ${
              activeSection === 'studio' ? 'text-white font-semibold' : 'hover:text-white'
            }`}
          >
            <span>Studio</span>
            {activeSection === 'studio' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E5EFF] rounded-full" />
            )}
          </a>

          {/* Lien Contact */}
          <button 
            onClick={onOpenContact}
            className="py-1.5 text-zinc-300 hover:text-white transition-colors duration-150 cursor-pointer"
          >
            <span>Contact</span>
          </button>
        </nav>

        {/* =========================================================================
            ZONE 3 : BOUTON PRINCIPAL DÉMARRER UN PROJET / DEMANDER UN DEVIS
           ========================================================================= */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenContact}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide text-white bg-[#1E5EFF] hover:bg-[#184FD8] active:bg-[#1340B5] rounded-xl transition-all duration-150 shadow-[0_0_20px_rgba(30,94,255,0.35)] hover:shadow-[0_0_25px_rgba(30,94,255,0.5)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5EFF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#08090D]"
          >
            <span>Démarrer un projet</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Bouton Menu Mobile (Touch target >= 44x44px) */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E5EFF]"
            aria-label="Ouvrir le menu de navigation"
            aria-expanded={mobileMenuOpen}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>

      {/* =========================================================================
          MENU MOBILE PLEIN ÉCRAN SUR-MESURE (Custom Full-Screen Mobile Overlay)
         ========================================================================= */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-[#08090D]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menu mobile"
        >
          {/* Haut du menu mobile avec Logo et bouton Fermer */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-3">
              <img 
                src="/src/assets/branding/icon_prymax.png" 
                alt="Logo PRYMAX STUDIO" 
                className="w-8 h-8 object-contain rounded-md"
              />
              <span className="font-display font-bold text-lg text-white">
                PRYMAX <span className="font-light text-zinc-400">STUDIO</span>
              </span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
              aria-label="Fermer le menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Liste des grands liens tactiles avec espacement généreux */}
          <div className="flex-1 py-8 flex flex-col justify-center gap-6">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-3 px-2">
                Navigation
              </div>

              <div className="space-y-2">
                <a
                  href="#services"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[52px] px-3 flex items-center justify-between text-2xl font-bold text-white hover:text-[#1E5EFF] transition-colors rounded-xl hover:bg-white/[0.04]"
                >
                  <span>Services</span>
                  <span className="text-sm font-mono text-zinc-600">01</span>
                </a>

                <a
                  href="#projets"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[52px] px-3 flex items-center justify-between text-2xl font-bold text-white hover:text-[#1E5EFF] transition-colors rounded-xl hover:bg-white/[0.04]"
                >
                  <span>Projets</span>
                  <span className="text-sm font-mono text-zinc-600">02</span>
                </a>

                <a
                  href="#studio"
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-h-[52px] px-3 flex items-center justify-between text-2xl font-bold text-white hover:text-[#1E5EFF] transition-colors rounded-xl hover:bg-white/[0.04]"
                >
                  <span>Studio</span>
                  <span className="text-sm font-mono text-zinc-600">03</span>
                </a>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full min-h-[52px] px-3 flex items-center justify-between text-2xl font-bold text-white hover:text-[#1E5EFF] transition-colors rounded-xl hover:bg-white/[0.04] text-left cursor-pointer"
                >
                  <span>Contact</span>
                  <span className="text-sm font-mono text-zinc-600">04</span>
                </button>
              </div>
            </div>

            {/* Aperçu rapide des expertises */}
            <div className="p-4 bg-zinc-900/60 rounded-2xl border border-white/5">
              <div className="text-xs font-semibold text-zinc-300 mb-2">
                Nos expertises clés :
              </div>
              <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                <span className="px-2.5 py-1 bg-white/5 rounded-lg">Web Design</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-lg">Applications Mobiles</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-lg">Branding &amp; Logos</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-lg">Solutions Digitales</span>
              </div>
            </div>
          </div>

          {/* CTA visible en bas du menu mobile */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full min-h-[50px] flex items-center justify-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-[#1E5EFF] hover:bg-[#184FD8] rounded-xl transition-colors shadow-lg cursor-pointer"
            >
              <span>Démarrer un projet</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-center text-[11px] text-zinc-500">
              Devis estimatif gratuit et réponse garantie sous 24h.
            </p>
          </div>

        </div>
      )}
    </header>
  );
};
