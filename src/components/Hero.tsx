import React from 'react';
import { ArrowUpRight, Star, Sparkles, Code, Palette } from 'lucide-react';
import { useLanguage, SupportedLanguage } from '../context/LanguageContext';

interface HeroProps {
  onOpenContact: () => void;
  onNavigate?: (route: string) => void;
}

const HERO_CONTENT: Record<
  SupportedLanguage,
  {
    badge: string;
    h1Prefix: string;
    h1Italic: string;
    h1Middle: string;
    h1Highlight: string;
    subtitle: string;
    cta: string;
    stat1Label: string;
    stat2Unit: string;
    stat2Label: string;
    stat3Label: string;
    imageBadge: string;
  }
> = {
  fr: {
    badge: "Design Web & Solutions Digitales d'Élite",
    h1Prefix: 'Nous concevons des',
    h1Italic: 'Sites Web',
    h1Middle: "d'exception pour les",
    h1Highlight: 'Entreprises',
    subtitle:
      'PRYMAX STUDIO conçoit vos sites internet sur-mesure pour entreprises, vos logos et vos identités de marque pour vous démarquer et convertir vos visiteurs en clients fidèles.',
    cta: 'Démarrer un projet',
    stat1Label: 'Satisfaction Client',
    stat2Unit: '+ Ans',
    stat2Label: 'Expérience',
    stat3Label: 'Projets Déployés',
    imageBadge: 'Identité Visuelle Officielle DG',
  },
  en: {
    badge: 'Elite Web Design & Digital Solutions',
    h1Prefix: 'We craft exceptional',
    h1Italic: 'Websites',
    h1Middle: 'engineered for',
    h1Highlight: 'Businesses',
    subtitle:
      'PRYMAX STUDIO designs bespoke corporate websites, distinctive logos, and signature brand identities to set you apart and turn visitors into loyal clients.',
    cta: 'Start a Project',
    stat1Label: 'Client Satisfaction',
    stat2Unit: '+ Yrs',
    stat2Label: 'Experience',
    stat3Label: 'Deployed Projects',
    imageBadge: 'Official DG Brand Identity',
  },
  es: {
    badge: 'Diseño Web y Soluciones Digitales de Élite',
    h1Prefix: 'Diseñamos',
    h1Italic: 'Sitios Web',
    h1Middle: 'excepcionales para',
    h1Highlight: 'Empresas',
    subtitle:
      'PRYMAX STUDIO diseña sitios web corporativos a medida, logotipos e identidades de marca para destacar su negocio y convertir a sus visitantes en clientes fieles.',
    cta: 'Iniciar un proyecto',
    stat1Label: 'Satisfacción Cliente',
    stat2Unit: '+ Años',
    stat2Label: 'Experiencia',
    stat3Label: 'Proyectos Desplegados',
    imageBadge: 'Identidad Visual Oficial DG',
  },
  de: {
    badge: 'Exzellentes Webdesign & Digitale Lösungen',
    h1Prefix: 'Wir entwickeln exklusive',
    h1Italic: 'Websites',
    h1Middle: 'nach Maß für',
    h1Highlight: 'Unternehmen',
    subtitle:
      'PRYMAX STUDIO gestaltet maßgeschneiderte Unternehmens-Websites, Logos und starke Markenidentitäten, die Sie abheben und Besucher in treue Kunden verwandeln.',
    cta: 'Projekt starten',
    stat1Label: 'Kundenzufriedenheit',
    stat2Unit: '+ J.',
    stat2Label: 'Erfahrung',
    stat3Label: 'Realisierte Projekte',
    imageBadge: 'Offizielle DG Markenidentität',
  },
  pt: {
    badge: 'Web Design e Soluções Digitais de Elite',
    h1Prefix: 'Criamos',
    h1Italic: 'Sites Web',
    h1Middle: 'de excelência para',
    h1Highlight: 'Empresas',
    subtitle:
      'A PRYMAX STUDIO desenvolve sites empresariais sob medida, logótipos e identidades de marca para destacar o seu negócio e converter visitantes em clientes fiéis.',
    cta: 'Iniciar um projeto',
    stat1Label: 'Satisfação do Cliente',
    stat2Unit: '+ Anos',
    stat2Label: 'Experiência',
    stat3Label: 'Projetos Lançados',
    imageBadge: 'Identidade Visual Oficial DG',
  },
  it: {
    badge: 'Web Design e Soluzioni Digitali d’Élite',
    h1Prefix: 'Progettiamo',
    h1Italic: 'Siti Web',
    h1Middle: 'd’eccellenza per le',
    h1Highlight: 'Aziende',
    subtitle:
      'PRYMAX STUDIO realizza siti web aziendali su misura, loghi e identità di marca distintive per valorizzare la tua impresa e convertire i visitatori in clienti fedeli.',
    cta: 'Avvia un progetto',
    stat1Label: 'Soddisfazione Clienti',
    stat2Unit: '+ Anni',
    stat2Label: 'Esperienza',
    stat3Label: 'Progetti Lanciati',
    imageBadge: 'Identità Visiva Ufficiale DG',
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const { language } = useLanguage();
  const content = HERO_CONTENT[language] || HERO_CONTENT.fr;

  return (
    <section className="relative pt-28 pb-14 sm:pt-32 sm:pb-16 md:pt-40 md:pb-24 overflow-hidden bg-[#08090D] text-white">
      {/* =========================================================================
          ARRIÈRE-PLAN AMBIANT MOBILE & DESKTOP (Zéro octet réseau, rendu instantané)
         ========================================================================= */}
      <div
        className="sm:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(229, 181, 79, 0.14) 0%, rgba(59, 130, 246, 0.06) 45%, rgba(8, 9, 13, 0.98) 85%)',
        }}
        aria-hidden="true"
      />

      {/* Halo subtil monochrome & doré sur desktop */}
      <div
        className="hidden sm:block absolute top-0 right-1/4 w-[600px] h-[500px] bg-gradient-to-br from-white/[0.04] to-[#E5B54F]/[0.03] blur-[140px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* =========================================================================
              COLONNE GAUCHE : TITRE ENTREPRISES, TEXTE, CTA AVEC UNDERLINE ANIMÉ & STATS
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Badge Avis & Expertise */}
            <div className="self-start inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-xs text-zinc-300 mb-6 shadow-sm">
              <div className="w-4 h-4 rounded-full bg-[#E5B54F] flex items-center justify-center text-zinc-950 text-[10px] font-bold">
                <Star className="w-2.5 h-2.5 fill-current" />
              </div>
              <span className="font-bold text-white">4.9 / 5</span>
              <span className="text-zinc-400" aria-hidden="true">·</span>
              <span className="text-zinc-200">{content.badge}</span>
            </div>

            {/* Titre principal : Sites Web d'exception pour les Entreprises */}
            <h1 className="text-3xl sm:text-5xl lg:text-[62px] font-extrabold tracking-tight text-white leading-[1.12] sm:leading-[1.08] mb-6 text-balance">
              {content.h1Prefix}{' '}
              <span className="hidden sm:inline-flex items-center align-middle mx-1 -mt-1.5 gap-1.5">
                <span className="inline-flex items-center -space-x-1.5 bg-black/50 p-1 rounded-full border border-white/15 shadow-xl">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-zinc-950 shadow-sm" title="Sites Web & Code">
                    <Code className="w-3.5 h-3.5 text-zinc-950" />
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white shadow-sm border border-white/10" title="Branding & Identité">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white shadow-sm border border-white/10" title="Design Graphique">
                    <Palette className="w-3.5 h-3.5 text-[#E5B54F]" />
                  </span>
                </span>
              </span>{' '}
              <span className="font-serif italic font-normal text-white tracking-normal">
                {content.h1Italic}
              </span>{' '}
              {content.h1Middle}{' '}
              <span className="bg-gradient-to-r from-[#FFE58F] via-[#F5D061] to-[#E5B54F] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(245,208,97,0.55)] font-black">
                {content.h1Highlight}
              </span>.
            </h1>

            {/* Paragraphe de description clair et engageant */}
            <p className="text-sm sm:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl mb-7 sm:mb-8">
              {content.subtitle}
            </p>

            {/* Bouton d'action principal Blanc avec animation subtile de soulignement */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-10 sm:mb-12">
              <div className="relative inline-flex flex-col items-center">
                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 text-sm font-bold text-zinc-950 bg-white hover:bg-zinc-200 active:bg-zinc-300 rounded-xl transition-all duration-150 shadow-[0_4px_25px_rgba(255,255,255,0.25)] hover:shadow-[0_6px_30px_rgba(255,255,255,0.35)] flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>{content.cta}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>

                {/* Animation subtile de soulignement sous le bouton (GPU composited) */}
                <div 
                  className="w-4/5 h-[2.5px] mt-2 rounded-full animate-underline-shimmer pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, #E5B54F 50%, transparent 100%)'
                  }}
                />
              </div>
            </div>

            {/* =========================================================================
                STATISTIQUES RESTYLÉES : "EXPÉRIENCE" (ET NON "EXPÉRIENCE STUDIO")
               ========================================================================= */}
            <div className="pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-3 sm:gap-8 max-w-lg">
              {/* Stat 1 : Satisfaction Client */}
              <div className="p-2 sm:p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:-translate-y-0.5 transition-transform">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  98<span className="text-xs sm:text-sm font-bold text-[#E5B54F] ml-0.5">%</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-300 mt-1 font-medium">
                  {content.stat1Label}
                </div>
              </div>

              {/* Stat 2 : Expérience */}
              <div className="p-2 sm:p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:-translate-y-0.5 transition-transform">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  5<span className="text-xs sm:text-sm font-bold text-[#E5B54F] ml-0.5">{content.stat2Unit}</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-300 mt-1 font-medium">
                  {content.stat2Label}
                </div>
              </div>

              {/* Stat 3 : Projets Déployés */}
              <div className="p-2 sm:p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:-translate-y-0.5 transition-transform">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  10<span className="text-xs sm:text-sm font-bold text-[#E5B54F] ml-0.5">+</span>
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-300 mt-1 font-medium">
                  {content.stat3Label}
                </div>
              </div>
            </div>

          </div>

          {/* =========================================================================
              COLONNE DROITE : PLANCHE DE MARQUE DG RÉELLE (Élément LCP prioritaire)
             ========================================================================= */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            
            {/* Conteneur principal avec l'image authentique WebP responsive */}
            <div className="relative w-full max-w-[340px] sm:max-w-[440px] aspect-[4/5] rounded-[24px] sm:rounded-[36px] overflow-hidden border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] bg-[#480004] flex items-center justify-center p-2.5 sm:p-3.5 group">
              
              <img
                src="/assets/branding/hero_planche_marque.webp"
                srcSet="/assets/branding/hero_planche_marque_sm.webp 600w, /assets/branding/hero_planche_marque.webp 880w"
                sizes="(max-width: 640px) 320px, 412px"
                width={440}
                height={550}
                fetchPriority="high"
                decoding="async"
                alt="Planche de marque DG créée par PRYMAX STUDIO"
                className="w-full h-full object-contain object-center drop-shadow-xl group-hover:scale-105 transition-transform duration-700"
              />

              {/* Tag discret sur l'image */}
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3 h-3 text-[#E5B54F]" />
                <span>{content.imageBadge}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
