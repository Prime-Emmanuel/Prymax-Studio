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
  MessageCircle
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
    title: 'Branding & Identité Visuelle',
    description: 'Logos originaux, typographies et chartes graphiques de marque.',
    icon: Sparkles,
    href: '#services'
  },
  {
    title: 'Web Design & Développement',
    description: 'Sites One-Page, vitrines ultra-rapides et plateformes sur-mesure.',
    icon: Layout,
    href: '#services'
  },
  {
    title: 'E-Commerce & Vente en Ligne',
    description: 'Boutiques sécurisées avec paiement Mobile Money et Carte.',
    icon: TrendingUp,
    href: '#services'
  },
  {
    title: 'Applications Mobiles',
    description: 'Interfaces réactives et ergonomiques conçues pour smartphone.',
    icon: Smartphone,
    href: '#services'
  },
  {
    title: 'Design Graphique & Mockups',
    description: 'Rendus 3D ultra-réalistes pour t-shirts, pulls et papeterie.',
    icon: Palette,
    href: '#services'
  },
  {
    title: 'SEO & Visibilité Google',
    description: 'Positionnement Google Maps et acquisition de clients locaux.',
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

  // Détection du scroll pour adapter le style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + 250;
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

  // Fermeture des menus au clic en dehors et touche Echap
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

  // Bloquer le scroll d'arrière-plan quand le menu mobile flottant est ouvert
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

  const handleNavigate = (href: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* =========================================================================
          NAVBAR FLOTTANTE DÉTACHÉE DES BORDS AVEC BORDURE ANIMÉE EN FLUX CONTINU
         ========================================================================= */}
      <header className="fixed top-3 sm:top-5 inset-x-3 sm:inset-x-6 md:inset-x-8 max-w-[1240px] mx-auto z-40 transition-all duration-300">
        
        {/* Conteneur externe arrondi avec flux de couleur continu sur la bordure */}
        <div className="relative p-[1.5px] rounded-full overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.7)] group">
          
          {/* Faisceau lumineux continu qui tourne le long du contour arrondi (Monochrome Blanc / Argent) */}
          <div 
            className="absolute -inset-[150%] animate-border-flow pointer-events-none opacity-85"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.85) 60deg, #FFFFFF 90deg, rgba(255,255,255,0.7) 120deg, transparent 180deg, transparent 360deg)'
            }}
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
            <a 
              href="#" 
              className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group/logo"
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
            </a>

            {/* Navigation Desktop centrale */}
            <nav 
              className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold text-zinc-300"
              aria-label="Navigation principale"
            >
              {/* Dropdown Services */}
              <div className="relative">
                <button
                  ref={dropdownButtonRef}
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  className={`flex items-center gap-1.5 py-1.5 transition-colors cursor-pointer ${
                    servicesDropdownOpen || activeSection === 'services'
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
                  {activeSection === 'services' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                  )}
                </button>

                {/* Panneau déroulant spacieux et organisé */}
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
                          <a
                            key={idx}
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigate(item.href);
                            }}
                            className="group/item flex items-start gap-3 p-3 rounded-2xl hover:bg-white/[0.08] transition-colors border border-transparent hover:border-white/10"
                          >
                            <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover/item:bg-white transition-colors">
                              <IconComponent className="w-4 h-4 text-white group-hover/item:text-black transition-colors" />
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-white group-hover/item:text-white transition-colors">
                                {item.title}
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
                        Du logo au site web complet
                      </span>
                      <a
                        href="#services"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigate('#services');
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-white hover:text-zinc-300 transition-colors"
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
                className={`relative py-1.5 transition-colors ${
                  activeSection === 'projets' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>Projets</span>
                {activeSection === 'projets' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                )}
              </a>

              {/* Lien Studio */}
              <a 
                href="#studio" 
                className={`relative py-1.5 transition-colors ${
                  activeSection === 'studio' ? 'text-white font-bold' : 'hover:text-white'
                }`}
              >
                <span>Studio</span>
                {activeSection === 'studio' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white rounded-full" />
                )}
              </a>

              {/* Lien Délais & Devis */}
              <a 
                href="#devis" 
                className="py-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <span>Délais &amp; Devis</span>
              </a>
            </nav>

            {/* Action principale Demander un devis (Bouton Blanc Épuré) */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={onOpenContact}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 text-xs font-bold text-zinc-950 bg-white hover:bg-zinc-200 active:bg-zinc-300 rounded-full transition-all duration-150 shadow-[0_2px_18px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                <span>DEMANDER UN DEVIS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Bouton Menu Mobile (tactile >= 44x44px) */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 min-w-[42px] min-h-[42px] flex items-center justify-center text-zinc-200 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors cursor-pointer"
                aria-label="Ouvrir le menu de navigation"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
          MENU MOBILE EXACTEMENT COMME LA RÉFÉRENCE (mobile-menu-ps.webp)
          Carte flottante détachée des bords, blanc immaculé/clean, icônes & séparateur
         ========================================================================= */}
      {mobileMenuOpen && (
        <>
          {/* Arrière-plan transparent pour fermer au clic en dehors */}
          <div 
            className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-150"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Carte flottante du menu mobile (style exact de mobile-menu-ps.webp) */}
          <div 
            className="md:hidden fixed top-18 sm:top-20 right-3 sm:right-6 z-50 w-[275px] sm:w-[300px] bg-white text-zinc-800 rounded-3xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.45)] border border-zinc-200/90 animate-in zoom-in-95 fade-in duration-150 select-none"
            role="menu"
            aria-label="Menu mobile"
          >
            {/* Élément 1 : Highlighted/Pill style (comme 'Profile' dans la référence) */}
            <a
              href="#services"
              role="menuitem"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('#services');
              }}
              className="flex items-center gap-3 px-3.5 py-3 rounded-2xl bg-zinc-100/90 text-zinc-950 font-semibold text-sm transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-zinc-200/80 flex items-center justify-center text-zinc-900 shrink-0">
                <Sparkles className="w-4 h-4 text-zinc-900" />
              </div>
              <span className="truncate">Nos Services</span>
            </a>

            {/* Élément 2 : Projets */}
            <a
              href="#projets"
              role="menuitem"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('#projets');
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 font-medium text-sm transition-colors mt-1"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 shrink-0">
                <Layout className="w-4 h-4" />
              </div>
              <span className="truncate">Projets &amp; Travaux</span>
            </a>

            {/* Élément 3 : Studio */}
            <a
              href="#studio"
              role="menuitem"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('#studio');
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 font-medium text-sm transition-colors"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <span className="truncate">Le Studio (Approche)</span>
            </a>

            {/* Élément 4 : Délais & Devis */}
            <a
              href="#devis"
              role="menuitem"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate('#devis');
              }}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50 font-medium text-sm transition-colors"
            >
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-500 shrink-0">
                <Palette className="w-4 h-4" />
              </div>
              <span className="truncate">Délais &amp; Devis</span>
            </a>

            {/* Ligne de séparation subtile (comme au-dessus de 'Sign out' dans la référence) */}
            <div className="my-2 border-t border-zinc-100" />

            {/* Élément 5 : Bouton Devis / CTA */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-zinc-900 hover:bg-zinc-50 font-semibold text-sm transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 flex items-center justify-center text-white shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
                <span>Demander un devis</span>
              </div>
              <span className="text-xs text-zinc-900 font-bold">↗</span>
            </button>

            {/* Élément 6 : Contact WhatsApp direct */}
            <a
              href="https://wa.me/237681078004?text=Bonjour%20PRYMAX%20STUDIO%2C%20je%20souhaite%20un%20devis%20pour%20mon%20projet."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3.5 py-2 rounded-2xl text-emerald-700 hover:bg-emerald-50 font-medium text-xs transition-colors mt-0.5"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100/80 flex items-center justify-center text-emerald-600 shrink-0">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="truncate">WhatsApp</span>
            </a>

          </div>
        </>
      )}
    </>
  );
};
