import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type SupportedLanguage = 'fr' | 'en' | 'es' | 'de' | 'pt' | 'it';

export interface LanguageOption {
  code: SupportedLanguage;
  shortLabel: string;
  name: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'fr', shortLabel: 'FR', name: 'French', nativeName: 'Français' },
  { code: 'en', shortLabel: 'EN', name: 'English', nativeName: 'English' },
  { code: 'es', shortLabel: 'ES', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', shortLabel: 'DE', name: 'German', nativeName: 'Deutsch' },
  { code: 'pt', shortLabel: 'PT', name: 'Portuguese', nativeName: 'Português' },
  { code: 'it', shortLabel: 'IT', name: 'Italian', nativeName: 'Italiano' },
];

export interface NavbarTranslations {
  services: string;
  projects: string;
  portal: string;
  about: string;
  contact: string;
  home: string;
  quoteCta: string;
  openServicesPage: string;
  servicesTagline: string;
  portalBadge: string;
  languageLabel: string;
  serviceItems: {
    webTitle: string;
    webDesc: string;
    brandTitle: string;
    brandDesc: string;
    ecomTitle: string;
    ecomDesc: string;
    designTitle: string;
    designDesc: string;
    seoTitle: string;
    seoDesc: string;
  };
}

export const NAVBAR_TRANSLATIONS: Record<SupportedLanguage, NavbarTranslations> = {
  fr: {
    services: 'Nos Services',
    projects: 'Projets et entreprises',
    portal: 'Portail client',
    about: 'À propos',
    contact: 'Contact',
    home: 'Accueil',
    quoteCta: 'Demander un devis',
    openServicesPage: 'Ouvrir la page des services',
    servicesTagline: "Du site web pour entreprise au branding d'exception",
    portalBadge: 'Espace',
    languageLabel: 'Langue du site',
    serviceItems: {
      webTitle: 'Création de Sites Web Entreprises',
      webDesc: 'Vitrines ultra-rapides, One-Page et plateformes web sur-mesure.',
      brandTitle: 'Branding & Identité Visuelle',
      brandDesc: 'Logos originaux, typographies et chartes graphiques de marque.',
      ecomTitle: 'E-Commerce & Vente en Ligne',
      ecomDesc: 'Boutiques sécurisées avec paiement Mobile Money et Carte.',
      designTitle: 'Design Graphique & Mockups 3D',
      designDesc: 'Rendus photoréalistes pour t-shirts, pulls et papeterie.',
      seoTitle: 'SEO & Visibilité Google Maps',
      seoDesc: 'Positionnement local et acquisition de clients qualifiés.',
    },
  },
  en: {
    services: 'Services',
    projects: 'Projects & Clients',
    portal: 'Client Portal',
    about: 'About Us',
    contact: 'Contact',
    home: 'Home',
    quoteCta: 'Request a Quote',
    openServicesPage: 'Explore all services',
    servicesTagline: 'From corporate websites to signature brand identity',
    portalBadge: 'Portal',
    languageLabel: 'Website language',
    serviceItems: {
      webTitle: 'Corporate Web Development',
      webDesc: 'Ultra-fast showcase sites, One-Page & custom web platforms.',
      brandTitle: 'Branding & Visual Identity',
      brandDesc: 'Bespoke logos, typography systems & complete brand guidelines.',
      ecomTitle: 'E-Commerce & Online Stores',
      ecomDesc: 'Secure storefronts with Mobile Money & Card checkout.',
      designTitle: 'Graphic Design & 3D Mockups',
      designDesc: 'Photorealistic apparel renders, hoodies & corporate stationery.',
      seoTitle: 'SEO & Google Maps Visibility',
      seoDesc: 'Local search rankings & qualified client acquisition.',
    },
  },
  es: {
    services: 'Servicios',
    projects: 'Proyectos y Clientes',
    portal: 'Portal Cliente',
    about: 'Estudio',
    contact: 'Contacto',
    home: 'Inicio',
    quoteCta: 'Solicitar presupuesto',
    openServicesPage: 'Ver todos los servicios',
    servicesTagline: 'Desde sitios corporativos hasta branding de alto impacto',
    portalBadge: 'Acceso',
    languageLabel: 'Idioma del sitio',
    serviceItems: {
      webTitle: 'Diseño Web Corporativo',
      webDesc: 'Sitios web ultrarrápidos, One-Page y plataformas a medida.',
      brandTitle: 'Branding e Identidad Visual',
      brandDesc: 'Logotipos exclusivos, tipografías y manuales de marca.',
      ecomTitle: 'E-Commerce y Tiendas Online',
      ecomDesc: 'Tiendas seguras con pagos por tarjeta y Mobile Money.',
      designTitle: 'Diseño Gráfico y Mockups 3D',
      designDesc: 'Renders fotorrealistas para prendas textiles y papelería.',
      seoTitle: 'SEO y Visibilidad en Google',
      seoDesc: 'Posicionamiento local y captación de clientes cualificados.',
    },
  },
  de: {
    services: 'Leistungen',
    projects: 'Projekte & Kunden',
    portal: 'Kundenportal',
    about: 'Über uns',
    contact: 'Kontakt',
    home: 'Startseite',
    quoteCta: 'Angebot anfordern',
    openServicesPage: 'Alle Leistungen ansehen',
    servicesTagline: 'Von Unternehmens-Websites bis zum exklusiven Branding',
    portalBadge: 'Zugang',
    languageLabel: 'Sprache wählen',
    serviceItems: {
      webTitle: 'Unternehmens-Websites',
      webDesc: 'Ultraschnelle Webpräsenzen, One-Pager & Maßanfertigungen.',
      brandTitle: 'Branding & Markenidentität',
      brandDesc: 'Individuelle Logos, Typografie & ganzheitliches Corporate Design.',
      ecomTitle: 'E-Commerce & Online-Shops',
      ecomDesc: 'Sichere Shopsysteme mit Karten- und Mobile-Money-Zahlung.',
      designTitle: 'Grafikdesign & 3D-Mockups',
      designDesc: 'Fotorealistische Produkt- und Textilvisualisierungen.',
      seoTitle: 'SEO & Google-Sichtbarkeit',
      seoDesc: 'Lokale Top-Platzierungen und gezielte Kundengewinnung.',
    },
  },
  pt: {
    services: 'Serviços',
    projects: 'Projetos e Clientes',
    portal: 'Portal do Cliente',
    about: 'Sobre nós',
    contact: 'Contacto',
    home: 'Início',
    quoteCta: 'Pedir orçamento',
    openServicesPage: 'Ver todos os serviços',
    servicesTagline: 'De sites empresariais a identidades visuais de excelência',
    portalBadge: 'Acesso',
    languageLabel: 'Idioma do site',
    serviceItems: {
      webTitle: 'Criação de Sites Empresariais',
      webDesc: 'Sites ultrarrápidos, One-Page e plataformas web sob medida.',
      brandTitle: 'Branding e Identidade Visual',
      brandDesc: 'Logótipos exclusivos, tipografia e manuais de marca.',
      ecomTitle: 'E-Commerce e Lojas Online',
      ecomDesc: 'Lojas seguras com pagamento por Cartão e Mobile Money.',
      designTitle: 'Design Gráfico e Mockups 3D',
      designDesc: 'Renders fotorrealistas para vestuário e estacionário.',
      seoTitle: 'SEO e Visibilidade no Google',
      seoDesc: 'Posicionamento local e captação de clientes qualificados.',
    },
  },
  it: {
    services: 'Servizi',
    projects: 'Progetti e Clienti',
    portal: 'Portale Clienti',
    about: 'Chi siamo',
    contact: 'Contatti',
    home: 'Home',
    quoteCta: 'Richiedi preventivo',
    openServicesPage: 'Scopri tutti i servizi',
    servicesTagline: 'Dai siti web aziendali al branding d’eccellenza',
    portalBadge: 'Area',
    languageLabel: 'Lingua del sito',
    serviceItems: {
      webTitle: 'Siti Web per Aziende',
      webDesc: 'Siti vetrina ultraveloci, One-Page e piattaforme su misura.',
      brandTitle: 'Branding e Identità Visiva',
      brandDesc: 'Loghi distintivi, tipografia e linee guida del brand.',
      ecomTitle: 'E-Commerce e Vendita Online',
      ecomDesc: 'Store sicuri con pagamenti tramite Carta e Mobile Money.',
      designTitle: 'Graphic Design e Mockup 3D',
      designDesc: 'Render fotorealistici per abbigliamento e coordinati.',
      seoTitle: 'SEO e Visibilità su Google',
      seoDesc: 'Posizionamento locale e acquisizione di clienti qualificati.',
    },
  },
};

type TranslationRecord = Record<Exclude<SupportedLanguage, 'fr'>, string>;

/**
 * Exhaustive, curated professional agency phrase dictionary covering all components,
 * pages, services, client cases, pricing modules, configurators, modals, and forms.
 */
const RAW_PHRASE_DICTIONARY: Record<string, TranslationRecord> = {
  // ===========================================================================
  // 1. GLOBAL NAVIGATION & COMMON ACTIONS
  // ===========================================================================
  "Accueil": {
    en: "Home",
    es: "Inicio",
    de: "Startseite",
    pt: "Início",
    it: "Home",
  },
  "Nos Services": {
    en: "Our Services",
    es: "Nuestros Servicios",
    de: "Unsere Leistungen",
    pt: "Nossos Serviços",
    it: "I Nostri Servizi",
  },
  "Projets & Entreprises": {
    en: "Projects & Clients",
    es: "Proyectos y Empresas",
    de: "Projekte & Unternehmen",
    pt: "Projetos e Empresas",
    it: "Progetti e Aziende",
  },
  "Projets & Travaux": {
    en: "Projects & Case Studies",
    es: "Proyectos y Trabajos",
    de: "Projekte & Referenzen",
    pt: "Projetos e Trabalhos",
    it: "Progetti e Lavori",
  },
  "Le Studio": {
    en: "The Studio",
    es: "El Estudio",
    de: "Das Studio",
    pt: "O Estúdio",
    it: "Lo Studio",
  },
  "Délais & Devis": {
    en: "Timelines & Quotes",
    es: "Plazos y Presupuesto",
    de: "Zeitplan & Angebot",
    pt: "Prazos e Orçamento",
    it: "Tempi e Preventivi",
  },
  "Contact Direct": {
    en: "Direct Contact",
    es: "Contacto Directo",
    de: "Direktkontakt",
    pt: "Contacto Direto",
    it: "Contatto Diretto",
  },
  "Portail Client": {
    en: "Client Portal",
    es: "Portal Cliente",
    de: "Kundenportal",
    pt: "Portal do Cliente",
    it: "Portale Clienti",
  },
  "Demander un devis": {
    en: "Request a Quote",
    es: "Solicitar presupuesto",
    de: "Angebot anfordern",
    pt: "Pedir orçamento",
    it: "Richiedi preventivo",
  },
  "Nous contacter": {
    en: "Contact Us",
    es: "Contáctenos",
    de: "Kontakt aufnehmen",
    pt: "Contacte-nos",
    it: "Contattaci",
  },
  "En savoir plus": {
    en: "Learn more",
    es: "Más información",
    de: "Mehr erfahren",
    pt: "Saber mais",
    it: "Scopri di più",
  },
  "Catalogue": {
    en: "Catalog",
    es: "Catálogo",
    de: "Katalog",
    pt: "Catálogo",
    it: "Catalogo",
  },
  "Fermer": {
    en: "Close",
    es: "Cerrar",
    de: "Schließen",
    pt: "Fechar",
    it: "Chiudi",
  },
  "Envoi en cours...": {
    en: "Sending...",
    es: "Enviando...",
    de: "Wird gesendet...",
    pt: "A enviar...",
    it: "Invio in corso...",
  },
  "Retour aux services": {
    en: "Back to services",
    es: "Volver a servicios",
    de: "Zurück zu Leistungen",
    pt: "Voltar aos serviços",
    it: "Torna ai servizi",
  },

  // ===========================================================================
  // 2. DISCIPLINES / SERVICES SECTION (HOMEPAGE & SERVICES PAGE)
  // ===========================================================================
  "Services PRYMAX STUDIO": {
    en: "PRYMAX STUDIO Services",
    es: "Servicios PRYMAX STUDIO",
    de: "PRYMAX STUDIO Leistungen",
    pt: "Serviços PRYMAX STUDIO",
    it: "Servizi PRYMAX STUDIO",
  },
  "Solutions Sur-Mesure": {
    en: "Tailor-Made Solutions",
    es: "Soluciones a Medida",
    de: "Maßgeschneiderte Lösungen",
    pt: "Soluções Sob Medida",
    it: "Soluzioni Su Misura",
  },
  "Des expertises digitales d'élite conçues pour les entreprises": {
    en: "Elite digital expertise engineered for modern businesses",
    es: "Experiencia digital de élite diseñada para las empresas",
    de: "Erstklassige digitale Kompetenz für moderne Unternehmen",
    pt: "Especialidades digitais de elite concebidas para empresas",
    it: "Competenze digitali d'élite progettate per le aziende",
  },
  "Faites défiler horizontalement nos prestations d'exception. Chaque carte présente un aperçu complet avec accès à sa page dédiée.": {
    en: "Scroll horizontally through our signature services. Each card provides a comprehensive overview with direct access to its dedicated page.",
    es: "Deslice horizontalmente nuestras prestaciones de élite. Cada tarjeta ofrece un resumen completo con acceso a su página dedicada.",
    de: "Scrollen Sie horizontal durch unsere Premium-Leistungen. Jede Karte bietet einen Überblick mit direktem Zugang zur Detailseite.",
    pt: "Deslize horizontalmente pelos nossos serviços de excelência. Cada cartão apresenta uma visão completa com acesso à sua página dedicada.",
    it: "Scorri orizzontalmente i nostri servizi d'eccellenza. Ogni scheda offre una panoramica completa con accesso alla pagina dedicata.",
  },
  "Expertises Digitales & Créatives d'Élite": {
    en: "Elite Digital & Creative Expertise",
    es: "Experiencia Digital y Creativa de Élite",
    de: "Exzellente Digitale & Kreative Kompetenz",
    pt: "Especialidades Digitais e Criativas de Elite",
    it: "Competenze Digitali e Creative d'Élite",
  },
  "Des solutions sur-mesure pour propulser votre entreprise": {
    en: "Tailor-made digital solutions to propel your business forward",
    es: "Soluciones a medida para impulsar su empresa",
    de: "Maßgeschneiderte Lösungen für den Erfolg Ihres Unternehmens",
    pt: "Soluções sob medida para impulsionar a sua empresa",
    it: "Soluzioni su misura per far crescere la tua azienda",
  },
  "De la conception de sites web haute performance au branding d'exception, nous accompagnons les entreprises avec exigence, rigueur et créativité.": {
    en: "From high-performance web development to signature brand identity, we partner with ambitious companies through rigor, precision, and creativity.",
    es: "Desde el diseño de sitios web de alto rendimiento hasta el branding de excepción, acompañamos a las empresas con rigor y creatividad.",
    de: "Von hochperformanten Websites bis hin zu starkem Branding begleiten wir Unternehmen mit Präzision, Anspruch und Kreativität.",
    pt: "Do desenvolvimento de sites de alta performance ao branding de excelência, acompanhamos empresas com rigor e criatividade.",
    it: "Dalla creazione di siti web ad alte prestazioni al branding d'eccellenza, affianchiamo le aziende con rigore e creatività.",
  },
  "Livrables Clés Inclus :": {
    en: "Key Deliverables Included:",
    es: "Entregables Clave Incluidos:",
    de: "Enthaltene Kernleistungen:",
    pt: "Entregáveis Principais Incluídos:",
    it: "Deliverable Principali Inclusi:",
  },
  "Détails & Fiche Complète": {
    en: "Full Specifications & Details",
    es: "Detalles y Ficha Completa",
    de: "Details & Leistungsblatt",
    pt: "Detalhes e Ficha Completa",
    it: "Dettagli e Scheda Completa",
  },
  "Besoin d'un accompagnement personnalisé ?": {
    en: "Need personalized guidance?",
    es: "¿Necesita un acompañamiento personalizado?",
    de: "Wünschen Sie eine persönliche Beratung?",
    pt: "Precisa de um acompanhamento personalizado?",
    it: "Hai bisogno di una consulenza personalizzata?",
  },
  "Discutons directement de vos objectifs d'entreprise": {
    en: "Let's discuss your business objectives directly",
    es: "Hablemos directamente sobre sus objetivos empresariales",
    de: "Lassen Sie uns direkt über Ihre Unternehmensziele sprechen",
    pt: "Vamos conversar diretamente sobre os objetivos da sua empresa",
    it: "Parliamo direttamente dei tuoi obiettivi aziendali",
  },
  "Nous intervenons rapidement et avec rigueur pour concevoir votre site web et votre image de marque.": {
    en: "We act swiftly and with precision to craft your corporate website and brand identity.",
    es: "Intervenimos con rapidez y rigor para diseñar su sitio web y su imagen de marca.",
    de: "Wir arbeiten schnell und präzise, um Ihre Website und Ihren Markenauftritt zu gestalten.",
    pt: "Atuamos com rapidez e rigor para conceber o seu site web e a sua imagem de marca.",
    it: "Interveniamo con rapidità e rigore per progettare il tuo sito web e la tua immagine di marca.",
  },

  // ===========================================================================
  // 3. SERVICE DETAIL PAGE
  // ===========================================================================
  "Demander un devis pour ce service": {
    en: "Request a quote for this service",
    es: "Solicitar presupuesto para este servicio",
    de: "Angebot für diese Leistung anfordern",
    pt: "Pedir orçamento para este serviço",
    it: "Richiedi un preventivo per questo servizio",
  },
  "Contacter le studio": {
    en: "Contact the studio",
    es: "Contactar al estudio",
    de: "Studio kontaktieren",
    pt: "Contactar o estúdio",
    it: "Contatta lo studio",
  },
  "Accompagnement PRYMAX STUDIO": {
    en: "PRYMAX STUDIO Dedicated Support",
    es: "Acompañamiento PRYMAX STUDIO",
    de: "PRYMAX STUDIO Betreuung",
    pt: "Acompanhamento PRYMAX STUDIO",
    it: "Affiancamento PRYMAX STUDIO",
  },
  "Conception Digitale & Sur-Mesure": {
    en: "Bespoke Digital Engineering",
    es: "Diseño Digital a Medida",
    de: "Maßgeschneidertes Digital Design",
    pt: "Conceção Digital Sob Medida",
    it: "Progettazione Digitale Su Misura",
  },
  "Livrables et spécifications complètes": {
    en: "Complete deliverables & specifications",
    es: "Entregables y especificaciones completas",
    de: "Vollständige Leistungen & Spezifikationen",
    pt: "Entregáveis e especificações completas",
    it: "Deliverable e specifiche complete",
  },
  "Chaque élément fait l'objet d'un contrôle rigoureux avant toute mise en ligne ou remise finale.": {
    en: "Every deliverable undergoes strict quality assurance prior to launch or final handover.",
    es: "Cada elemento pasa por un control riguroso antes de su publicación o entrega final.",
    de: "Jedes Element wird vor dem Go-Live oder der Übergabe einer strengen Qualitätsprüfung unterzogen.",
    pt: "Cada elemento passa por um controlo rigoroso antes da publicação ou entrega final.",
    it: "Ogni elemento è sottoposto a un rigoroso controllo qualità prima della messa online o consegna finale.",
  },
  "Pour qui ce service est-il idéal ?": {
    en: "Who is this service ideal for?",
    es: "¿Para quién es ideal este servicio?",
    de: "Für wen ist diese Leistung ideal?",
    pt: "Para quem é ideal este serviço?",
    it: "Per chi è ideale questo servizio?",
  },
  "Technologies & Outils déployés": {
    en: "Deployed Technologies & Stack",
    es: "Tecnologías y Herramientas",
    de: "Eingesetzte Technologien & Tools",
    pt: "Tecnologias e Ferramentas",
    it: "Tecnologie e Strumenti utilizzati",
  },
  "Garantie & Suivi": {
    en: "Warranty & Ongoing Support",
    es: "Garantía y Seguimiento",
    de: "Garantie & Betreuung",
    pt: "Garantia e Acompanhamento",
    it: "Garanzia e Supporto",
  },
  "Assistance réactive après livraison, formation à l'administration et disponibilité directe via WhatsApp.": {
    en: "Responsive post-launch support, admin training, and direct availability via WhatsApp.",
    es: "Asistencia reactiva tras la entrega, formación de administración y disponibilidad vía WhatsApp.",
    de: "Schneller Support nach Übergabe, Admin-Schulung und direkte Erreichbarkeit per WhatsApp.",
    pt: "Assistência rápida após a entrega, formação de gestão e disponibilidade direta via WhatsApp.",
    it: "Assistenza reattiva post-consegna, formazione all'amministrazione e disponibilità diretta su WhatsApp.",
  },
  "Recevez une estimation chiffrée gratuite et sans engagement sous quelques heures.": {
    en: "Receive a free, no-obligation cost estimate within a few hours.",
    es: "Reciba una estimación gratuita y sin compromiso en pocas horas.",
    de: "Erhalten Sie innerhalb weniger Stunden eine kostenlose, unverbindliche Kostenschätzung.",
    pt: "Receba uma estimativa gratuita e sem compromisso em poucas horas.",
    it: "Ricevi una stima gratuita e senza impegno entro poche ore.",
  },
  "Demander mon devis détaillé": {
    en: "Request my detailed quote",
    es: "Solicitar mi presupuesto detallado",
    de: "Detailliertes Angebot anfordern",
    pt: "Pedir o meu orçamento detalhado",
    it: "Richiedi il mio preventivo dettagliato",
  },

  // ===========================================================================
  // 4. ALL 5 SERVICES DATA (agencyData.ts)
  // ===========================================================================
  "Création de Sites Web pour Entreprises": {
    en: "Corporate Website Development",
    es: "Creación de Sitios Web para Empresas",
    de: "Unternehmens-Websites & Webentwicklung",
    pt: "Criação de Sites Web para Empresas",
    it: "Creazione di Siti Web per Aziende",
  },
  "Sites vitrines d'exception, One-Page percutants et plateformes sur-mesure ultra-rapides et 100% responsives.": {
    en: "Exceptional showcase websites, high-impact One-Pagers, and ultra-fast, 100% responsive custom platforms.",
    es: "Sitios corporativos de excepción, One-Page impactantes y plataformas a medida ultrarrápidas y 100% responsivas.",
    de: "Exzellente Unternehmens-Websites, überzeugende One-Pager und ultraschnelle, 100% responsive Plattformen.",
    pt: "Sites institucionais de excelência, One-Page impactantes e plataformas sob medida ultrarrápidas e 100% responsivas.",
    it: "Siti vetrina d'eccellenza, One-Page d'impatto e piattaforme su misura ultraveloci e 100% responsive.",
  },
  "Nous concevons des sites internet modernes, sécurisés et performants, pensés dès la première seconde pour inspirer une confiance absolue, valoriser vos services d'entreprise et convertir les visiteurs en clients qualifiés.": {
    en: "We engineer modern, secure, high-performance websites designed from the very first second to inspire absolute trust, showcase your corporate services, and convert visitors into qualified clients.",
    es: "Diseñamos sitios web modernos, seguros y potentes, pensados desde el primer segundo para inspirar confianza absoluta, valorizar sus servicios y convertir visitantes en clientes.",
    de: "Wir entwickeln moderne, sichere und leistungsstarke Websites, die vom ersten Moment an Vertrauen schaffen, Ihre Leistungen optimal präsentieren und Besucher in Kunden verwandeln.",
    pt: "Concebemos sites modernos, seguros e de alta performance, pensados desde o primeiro segundo para inspirar confiança absoluta, valorizar os seus serviços e converter visitantes em clientes.",
    it: "Progettiamo siti web moderni, sicuri e performanti, pensati fin dal primo istante per ispirare fiducia assoluta, valorizzare i tuoi servizi e convertire i visitatori in clienti qualificati.",
  },
  "Structure 100% adaptée et fluide sur tous les smartphones, tablettes et ordinateurs": {
    en: "100% responsive layout across all smartphones, tablets, and desktop screens",
    es: "Estructura 100% adaptada y fluida en todos los smartphones, tablets y ordenadores",
    de: "100% responsives und flüssiges Layout auf allen Smartphones, Tablets und Desktops",
    pt: "Estrutura 100% adaptada e fluida em todos os smartphones, tablets e computadores",
    it: "Struttura 100% adattiva e fluida su tutti gli smartphone, tablet e computer",
  },
  "Boutons d'action directs et formulaires de devis interactifs": {
    en: "Direct call-to-action buttons and interactive quote request forms",
    es: "Botones de acción directa y formularios de presupuesto interactivos",
    de: "Direkte Handlungsaufforderungen und interaktive Angebotsformulare",
    pt: "Botões de ação direta e formulários de orçamento interativos",
    it: "Pulsanti di azione diretta e moduli di preventivo interattivi",
  },
  "Vitesse de chargement ultra-rapide (Core Web Vitals optimisés)": {
    en: "Ultra-fast loading speeds (optimized Core Web Vitals)",
    es: "Velocidad de carga ultrarrápida (Core Web Vitals optimizados)",
    de: "Ultraschnelle Ladezeiten (optimierte Core Web Vitals)",
    pt: "Velocidade de carregamento ultrarrápida (Core Web Vitals otimizados)",
    it: "Velocità di caricamento ultraveloce (Core Web Vitals ottimizzati)",
  },
  "Nom de domaine sécurisé (HTTPS) et configuration d'emails professionnels": {
    en: "Secure domain name (HTTPS) and professional email configuration",
    es: "Dominio seguro (HTTPS) y configuración de correos profesionales",
    de: "Sichere Domain (HTTPS) und Einrichtung professioneller E-Mail-Postfächer",
    pt: "Domínio seguro (HTTPS) e configuração de e-mails profissionais",
    it: "Dominio sicuro (HTTPS) e configurazione di email professionali",
  },
  "Architecture technique moderne, référencement naturel et sécurité renforcée": {
    en: "Modern technical architecture, organic SEO foundation, and hardened security",
    es: "Arquitectura técnica moderna, posicionamiento SEO natural y seguridad reforzada",
    de: "Moderne technische Architektur, Suchmaschinenoptimierung und gehärtete Sicherheit",
    pt: "Arquitetura técnica moderna, SEO orgânico e segurança reforçada",
    it: "Architettura tecnica moderna, posizionamento SEO organico e sicurezza avanzata",
  },
  "Mise en ligne soignée et assistance après livraison": {
    en: "Seamless deployment and dedicated post-launch support",
    es: "Puesta en línea impecable y asistencia tras la entrega",
    de: "Sorgfältiger Go-Live und zuverlässiger Support nach der Übergabe",
    pt: "Publicação cuidada e assistência após a entrega",
    it: "Messa online curata e assistenza post-consegna",
  },
  "Entreprises, cabinets d'ingénierie, PME, commerces, agences et professionnels exigeants.": {
    en: "Corporations, engineering firms, SMEs, retailers, agencies, and discerning professionals.",
    es: "Empresas, estudios de ingeniería, pymes, comercios, agencias y profesionales exigentes.",
    de: "Unternehmen, Ingenieurbüros, KMU, Handel, Agenturen und anspruchsvolle Dienstleister.",
    pt: "Empresas, gabinetes de engenharia, PMEs, comércios, agências e profissionais exigentes.",
    it: "Aziende, studi di ingegneria, PMI, attività commerciali, agenzie e professionisti esigenti.",
  },
  "Cœur de Métier · Business": {
    en: "Core Expertise · Business",
    es: "Especialidad Principal · Business",
    de: "Kernkompetenz · Business",
    pt: "Especialidade Principal · Business",
    it: "Core Business · Aziende",
  },
  "100% Mobile & Ultra-Rapide": {
    en: "100% Mobile & Ultra-Fast",
    es: "100% Móvil y Ultrarrápido",
    de: "100% Mobil & Ultraschnell",
    pt: "100% Mobile e Ultrarrápido",
    it: "100% Mobile e Ultraveloce",
  },

  "Branding & Identité Visuelle de Marque": {
    en: "Branding & Visual Brand Identity",
    es: "Branding e Identidad Visual de Marca",
    de: "Branding & Visuelle Markenidentität",
    pt: "Branding e Identidade Visual de Marca",
    it: "Branding e Identità Visiva di Marca",
  },
  "Logos originaux haut de gamme, chartes graphiques complètes et univers de marque intemporels.": {
    en: "High-end bespoke logos, comprehensive brand guidelines, and timeless brand worlds.",
    es: "Logotipos originales de alta gama, manuales de identidad completos y universos de marca atemporales.",
    de: "Exklusive Original-Logos, umfassende Design-Richtlinien und zeitlose Markenwelten.",
    pt: "Logótipos originais de alto padrão, manuais de identidade completos e universos de marca intemporais.",
    it: "Loghi originali di fascia alta, brand book completi e universi di marca senza tempo.",
  },
  "Le branding est le socle de toute entreprise prospère. Nous sculptons votre identité visuelle complète : logo principal, déclinaisons pour réseaux sociaux, palettes harmonieuses, choix typographiques et supports de marque professionnels.": {
    en: "Branding is the foundation of every thriving business. We sculpt your complete visual identity: primary logo, social media variations, harmonious color palettes, typography systems, and corporate stationery.",
    es: "El branding es la base de toda empresa próspera. Esculpimos su identidad visual completa: logotipo principal, versiones para redes sociales, paletas armónicas, tipografías y papelería corporativa.",
    de: "Branding ist das Fundament jedes erfolgreichen Unternehmens. Wir gestalten Ihre gesamte visuelle Identität: Hauptlogo, Social-Media-Varianten, Farbwelten, Typografie und Geschäftsunterlagen.",
    pt: "O branding é a base de qualquer empresa de sucesso. Esculpimos a sua identidade visual completa: logótipo principal, versões para redes sociais, paletas harmoniosas, tipografia e estacionário.",
    it: "Il branding è la base di ogni impresa di successo. Plasmiamo la tua identità visiva completa: logo principale, declinazioni social, palette cromatiche, tipografia e coordinati aziendali.",
  },
  "Logo original haute résolution vectoriel (HD sans aucune perte de qualité)": {
    en: "High-resolution original vector logo (lossless HD scalability)",
    es: "Logotipo original vectorial en alta resolución (HD sin pérdida de calidad)",
    de: "Originales Vektor-Logo in höchster Auflösung (verlustfreie HD-Skalierbarkeit)",
    pt: "Logótipo original vetorial em alta resolução (HD sem perda de qualidade)",
    it: "Logo originale vettoriale ad alta risoluzione (HD senza perdita di qualità)",
  },
  "Déclinaisons complètes (icônes profil, formats horizontaux, verticaux et monochromes)": {
    en: "Complete variations (profile icons, horizontal, vertical, and monochrome lockups)",
    es: "Variaciones completas (iconos de perfil, formatos horizontales, verticales y monocromos)",
    de: "Komplette Varianten (Profil-Icons, horizontale, vertikale und monochrome Formate)",
    pt: "Declinações completas (ícones de perfil, formatos horizontais, verticais e monocromáticos)",
    it: "Declinazioni complete (icone profilo, formati orizzontali, verticali e monocromatici)",
  },
  "Palette de couleurs officielles et guide typographique de prestige": {
    en: "Official brand color system and executive typography guide",
    es: "Paleta de colores oficial y guía tipográfica de prestigio",
    de: "Offizielle Farbpalette und repräsentativer Typografie-Leitfaden",
    pt: "Paleta de cores oficial e guia tipográfico de prestígio",
    it: "Palette colori ufficiale e guida tipografica di prestigio",
  },
  "Design de cartes de visite, papier en-tête, factures et devis professionnels": {
    en: "Business cards, letterhead, invoice templates, and corporate stationery design",
    es: "Diseño de tarjetas de visita, membretes, facturas y presupuestos profesionales",
    de: "Design von Visitenkarten, Briefpapier, Rechnungs- und Angebotsvorlagen",
    pt: "Design de cartões de visita, papel timbrado, faturas e orçamentos profissionais",
    it: "Design di biglietti da visita, carta intestata, fatture e preventivi professionali",
  },
  "Fichiers sources complets avec pleine cession de droits d'exploitation commerciale": {
    en: "Full source files included with complete commercial copyright transfer",
    es: "Archivos fuente completos con cesión total de derechos de explotación comercial",
    de: "Vollständige Quelldateien inklusive uneingeschränkter kommerzieller Nutzungsrechte",
    pt: "Ficheiros editáveis completos com cedência total de direitos de exploração comercial",
    it: "File sorgente completi con piena cessione dei diritti di utilizzo commerciale",
  },
  "Nouvelles marques ou entreprises en quête d'une image forte et immédiatement mémorable.": {
    en: "Emerging brands or established companies seeking a powerful, unforgettable identity.",
    es: "Nuevas marcas o empresas en busca de una imagen sólida e inmediatamente memorable.",
    de: "Neue Marken oder Unternehmen, die einen starken, unverwechselbaren Auftritt suchen.",
    pt: "Novas marcas ou empresas à procura de uma imagem forte e imediatamente memorável.",
    it: "Nuovi brand o aziende in cerca di un'immagine forte e immediatamente memorabile.",
  },
  "Identité Pure": {
    en: "Pure Identity",
    es: "Identidad Pura",
    de: "Markenidentität",
    pt: "Identidade Pura",
    it: "Identità Pura",
  },
  "Livraison HD vectorielle": {
    en: "HD Vector Delivery",
    es: "Entrega HD Vectorial",
    de: "HD-Vektor-Lieferung",
    pt: "Entrega HD Vetorial",
    it: "Consegna HD Vettoriale",
  },

  "E-Commerce & Boutiques en Ligne": {
    en: "E-Commerce & Online Stores",
    es: "E-Commerce y Tiendas Online",
    de: "E-Commerce & Online-Shops",
    pt: "E-Commerce e Lojas Online",
    it: "E-Commerce e Boutique Online",
  },
  "Vendez vos produits 24h/24 avec encaissement sécurisé par Mobile Money et Cartes bancaires.": {
    en: "Sell your products 24/7 with secure checkout via Mobile Money and credit/debit cards.",
    es: "Venda sus productos 24/7 con cobro seguro mediante Mobile Money y tarjetas bancarias.",
    de: "Verkaufen Sie Ihre Produkte rund um die Uhr mit sicherer Zahlung per Mobile Money und Karte.",
    pt: "Venda os seus produtos 24h/24 com pagamento seguro por Mobile Money e Cartões bancários.",
    it: "Vendi i tuoi prodotti 24/7 con pagamenti sicuri tramite Mobile Money e Carte bancarie.",
  },
  "Une boutique en ligne élégante, simple à utiliser pour vos acheteurs et intuitive à administrer pour vous. Gestion des stocks en direct, notifications instantanées de commande et tunnel d'achat sans la moindre friction.": {
    en: "An elegant online store that is effortless for shoppers and intuitive for you to manage. Live inventory tracking, instant order notifications, and a frictionless checkout funnel.",
    es: "Una tienda online elegante, sencilla para sus compradores e intuitiva de administrar. Gestión de stock en tiempo real, notificaciones instantáneas y proceso de compra sin fricciones.",
    de: "Ein eleganter Online-Shop, einfach für Ihre Kunden und intuitiv in der Verwaltung. Bestandsverwaltung in Echtzeit, Sofort-Benachrichtigungen und reibungsloser Checkout.",
    pt: "Uma loja online elegante, simples para os seus compradores e intuitiva de gerir. Gestão de stock em tempo real, notificações instantâneas e checkout sem fricção.",
    it: "Uno store online elegante, semplice per gli acquirenti e intuitivo da gestire. Gestione scorte in tempo reale, notifiche d'ordine istantanee e checkout fluido.",
  },
  "Catalogue de produits avec photos en haute qualité, filtres, variantes et fiches détaillées": {
    en: "Product catalog with HD photography, smart filters, variants, and detailed product pages",
    es: "Catálogo de productos con fotos en alta calidad, filtros, variantes y fichas detalladas",
    de: "Produktkatalog mit HD-Bildern, Filtern, Produktvarianten und detaillierten Produktseiten",
    pt: "Catálogo de produtos com fotos de alta qualidade, filtros, variantes e fichas detalhadas",
    it: "Catalogo prodotti con foto ad alta qualità, filtri, varianti e schede dettagliate",
  },
  "Paiement en ligne sécurisé (Orange Money, MTN MoMo, Wave, Cartes Visa / Mastercard)": {
    en: "Secure online checkout (Orange Money, MTN MoMo, Wave, Visa / Mastercard)",
    es: "Pago online seguro (Orange Money, MTN MoMo, Wave, Tarjetas Visa / Mastercard)",
    de: "Sichere Online-Zahlung (Orange Money, MTN MoMo, Wave, Visa / Mastercard)",
    pt: "Pagamento online seguro (Orange Money, MTN MoMo, Wave, Cartões Visa / Mastercard)",
    it: "Pagamento online sicuro (Orange Money, MTN MoMo, Wave, Carte Visa / Mastercard)",
  },
  "Panier d'achat intuitif et processus de commande rapide en un clic": {
    en: "Intuitive shopping cart and fast one-click checkout experience",
    es: "Carrito de compras intuitivo y proceso de pedido rápido en un clic",
    de: "Intuitiver Warenkorb und schneller Bestellprozess mit wenigen Klicks",
    pt: "Carrinho de compras intuitivo e processo de encomenda rápido num clique",
    it: "Carrello intuitivo e processo d'ordine rapido in un clic",
  },
  "Gestion des commandes, alertes instantanées et suivi automatique des stocks": {
    en: "Order management dashboard, instant alerts, and automated inventory tracking",
    es: "Gestión de pedidos, alertas instantáneas y seguimiento automático de inventario",
    de: "Bestellverwaltung, Sofort-Benachrichtigungen und automatische Bestandskontrolle",
    pt: "Gestão de encomendas, alertas instantâneos e controlo automático de stock",
    it: "Gestione ordini, avvisi istantanei e monitoraggio automatico delle scorte",
  },
  "Formation claire pour ajouter vos futurs articles en toute autonomie": {
    en: "Clear training session so you can add future products independently",
    es: "Formación clara para añadir sus futuros productos con total autonomía",
    de: "Verständliche Schulung, damit Sie künftige Artikel selbstständig einpflegen können",
    pt: "Formação clara para adicionar os seus futuros artigos com total autonomia",
    it: "Formazione chiara per aggiungere i tuoi futuri articoli in piena autonomia",
  },
  "Commerçants, marques de prêt-à-porter, boutiques spécialisées voulant vendre partout.": {
    en: "Retailers, fashion labels, and specialty stores looking to sell everywhere.",
    es: "Comerciantes, marcas de moda y tiendas especializadas que desean vender sin límites.",
    de: "Händler, Modemarken und Fachgeschäfte, die überregional verkaufen möchten.",
    pt: "Comerciantes, marcas de vestuário e lojas especializadas que querem vender em todo o lado.",
    it: "Commercianti, brand di moda e negozi specializzati che vogliono vendere ovunque.",
  },
  "Vente 24h/24": {
    en: "24/7 Sales",
    es: "Venta 24/7",
    de: "24/7 Verkauf",
    pt: "Venda 24h/24",
    it: "Vendita 24/7",
  },
  "Paiements Sécurisés Intégrés": {
    en: "Integrated Secure Payments",
    es: "Pagos Seguros Integrados",
    de: "Integrierte Sichere Zahlungen",
    pt: "Pagamentos Seguros Integrados",
    it: "Pagamenti Sicuri Integrati",
  },

  "Design Graphique & Mockups Textiles 3D": {
    en: "Graphic Design & 3D Apparel Mockups",
    es: "Diseño Gráfico y Mockups Textiles 3D",
    de: "Grafikdesign & 3D-Textil-Mockups",
    pt: "Design Gráfico e Mockups Têxteis 3D",
    it: "Graphic Design e Mockup Tessili 3D",
  },
  "Conception visuelle de t-shirts, pulls et sweats présentés sur des mockups photoréalistes d'élite.": {
    en: "Visual design for t-shirts, hoodies, and sweatshirts showcased on photorealistic 3D mockups.",
    es: "Diseño visual de camisetas, sudaderas y prendas presentado en mockups fotorrealistas de élite.",
    de: "Visuelles Design für T-Shirts, Hoodies und Sweatshirts auf fotorealistischen 3D-Mockups.",
    pt: "Conceção visual de t-shirts, camisolas e hoodies apresentados em mockups fotorrealistas de elite.",
    it: "Progettazione visiva di t-shirt, felpe e capi presentati su mockup fotorealistici d'élite.",
  },
  "Nous réalisons le design graphique de vos vêtements avec une esthétique moderne et percutante. Vous recevez les visuels prêts pour l'atelier sur des mockups haute définition. Vous imprimez chez votre atelier partenaire, ou nous pouvons vous orienter vers un tiers à vos frais.": {
    en: "We craft striking graphic designs for your apparel line. You receive print-ready files showcased on high-definition 3D mockups. Print with your preferred workshop, or let us refer you to a trusted third-party printer at your expense.",
    es: "Realizamos el diseño gráfico de sus prendas con una estética moderna e impactante. Recibirá los archivos listos para taller en mockups de alta definición. Puede imprimir en su taller habitual o con un proveedor recomendado.",
    de: "Wir entwerfen das Grafikdesign Ihrer Kleidung mit moderner Ästhetik. Sie erhalten druckfertige Dateien auf hochauflösenden Mockups. Drucken Sie bei Ihrem Wunschpartner oder über unsere Partnerdruckereien.",
    pt: "Realizamos o design gráfico do seu vestuário com uma estética moderna e impactante. Recebe os visuais prontos para estamparia em mockups de alta definição. Imprima na sua gráfica ou através de um parceiro recomendado.",
    it: "Realizziamo il graphic design dei tuoi capi con un'estetica moderna e d'impatto. Ricevi i file pronti per la stampa su mockup ad alta definizione. Stampa presso il tuo laboratorio o tramite un partner consigliato.",
  },
  "Création graphique originale pour l'avant, le dos et les manches": {
    en: "Original graphic artwork for front, back, and sleeve placements",
    es: "Creación gráfica original para parte frontal, espalda y mangas",
    de: "Originales Grafikdesign für Vorderseite, Rücken und Ärmel",
    pt: "Criação gráfica original para frente, costas e mangas",
    it: "Creazione grafica originale per fronte, retro e maniche",
  },
  "Présentation photo sur mockups 3D ultra-réalistes pour vos réseaux et précommandes": {
    en: "Ultra-realistic 3D mockup renders ready for social media and pre-orders",
    es: "Presentación en mockups 3D ultrarrealistas para redes sociales y preventas",
    de: "Ultrascharfe 3D-Mockup-Präsentation für Social Media und Vorbestellungen",
    pt: "Apresentação em mockups 3D ultrarrealistas para redes sociais e pré-vendas",
    it: "Presentazione su mockup 3D ultrarealistici per social media e preordini",
  },
  "Fichiers d'impression haute définition prêts pour sérigraphie, DTF ou flocage": {
    en: "High-definition print files ready for screen printing, DTF, or embroidery",
    es: "Archivos de impresión en alta definición listos para serigrafía, DTF o vinilo",
    de: "Hochauflösende Druckdateien für Siebdruck, DTF oder Flockdruck",
    pt: "Ficheiros de impressão de alta definição prontos para serigrafia, DTF ou estampagem",
    it: "File di stampa ad alta definizione pronti per serigrafia, DTF o stampa a caldo",
  },
  "Conseils techniques sur le placement, dimensions et choix des contrastes textiles": {
    en: "Technical guidance on placement, sizing, and fabric color contrast",
    es: "Asesoramiento técnico sobre ubicación, dimensiones y contrastes textiles",
    de: "Technische Beratung zu Platzierung, Maßen und Textilkontrasten",
    pt: "Aconselhamento técnico sobre posicionamento, dimensões e contrastes têxteis",
    it: "Consulenza tecnica su posizionamento, dimensioni e contrasti tessili",
  },
  "Marques de streetwear, entreprises équipant leur personnel, associations et événements.": {
    en: "Streetwear labels, companies outfitting staff, associations, and corporate events.",
    es: "Marcas de streetwear, empresas que equipan a su personal, asociaciones y eventos.",
    de: "Streetwear-Labels, Unternehmen mit Teamkleidung, Vereine und Events.",
    pt: "Marcas de streetwear, empresas que equipam as suas equipas, associações e eventos.",
    it: "Brand streetwear, aziende che vestono il proprio team, associazioni ed eventi.",
  },
  "Rendu Photoréaliste": {
    en: "Photorealistic Render",
    es: "Render Fotorrealista",
    de: "Fotorealistisches 3D",
    pt: "Render Fotorrealista",
    it: "Render Fotorealistico",
  },
  "Fichiers HD prêts atelier": {
    en: "Print-Ready HD Files",
    es: "Archivos HD listos taller",
    de: "Druckfertige HD-Dateien",
    pt: "Ficheiros HD prontos",
    it: "File HD pronti stampa",
  },

  "Référencement & Visibilité Google (SEO)": {
    en: "Search Engine Optimization & Google Visibility (SEO)",
    es: "Posicionamiento y Visibilidad en Google (SEO)",
    de: "Suchmaschinenoptimierung & Google-Sichtbarkeit (SEO)",
    pt: "Posicionamento e Visibilidade no Google (SEO)",
    it: "Posizionamento e Visibilità su Google (SEO)",
  },
  "Positionnez votre entreprise en tête des recherches locales et attirez des clients qualifiés chaque jour.": {
    en: "Rank your business at the top of local search results and attract qualified clients every day.",
    es: "Posicione su empresa en los primeros resultados locales y atraiga clientes cualificados cada día.",
    de: "Platzieren Sie Ihr Unternehmen ganz oben in lokalen Suchanfragen und gewinnen Sie täglich neue Kunden.",
    pt: "Posicione a sua empresa no topo das pesquisas locais e atraia clientes qualificados todos os dias.",
    it: "Posiziona la tua azienda in cima alle ricerche locali e attira clienti qualificati ogni giorno.",
  },
  "Soyez visible exactement là où vos clients cherchent. Optimisation de votre fiche d'établissement Google Maps et Google My Business pour générer des appels et demandes régulières.": {
    en: "Be visible right where your customers are searching. Complete optimization of your Google Maps and Google Business Profile to drive steady calls and inquiries.",
    es: "Sea visible exactamente donde buscan sus clientes. Optimización de su ficha de Google Maps y Google Business Profile para generar llamadas y solicitudes constantes.",
    de: "Werden Sie genau dort gefunden, wo Ihre Kunden suchen. Optimierung Ihres Google Maps- und Google Unternehmensprofils für regelmäßige Anrufe und Anfragen.",
    pt: "Seja visível exatamente onde os seus clientes procuram. Otimização do seu perfil Google Maps e Google Business para gerar chamadas e pedidos regulares.",
    it: "Fatti trovare esattamente dove cercano i tuoi clienti. Ottimizzazione della scheda Google Maps e Google Business Profile per generare chiamate e contatti costanti.",
  },
  "Création et optimisation complète de votre fiche Google My Business": {
    en: "Creation and full optimization of your Google Business Profile",
    es: "Creación y optimización completa de su ficha de Google Business",
    de: "Erstellung und vollständige Optimierung Ihres Google Unternehmensprofils",
    pt: "Criação e otimização completa da sua ficha Google Business",
    it: "Creazione e ottimizzazione completa della scheda Google Business",
  },
  "Positionnement sur Google Maps pour les recherches locales stratégiques": {
    en: "Strategic local ranking on Google Maps for high-intent searches",
    es: "Posicionamiento en Google Maps para búsquedas locales estratégicas",
    de: "Top-Positionierung auf Google Maps für relevante lokale Suchanfragen",
    pt: "Posicionamento no Google Maps para pesquisas locais estratégicas",
    it: "Posizionamento su Google Maps per le ricerche locali strategiche",
  },
  "Structure sémantique et balises Schema.org adaptées à votre activité": {
    en: "Semantic HTML structure and Schema.org structured data tailored to your industry",
    es: "Estructura semántica y etiquetas Schema.org adaptadas a su actividad",
    de: "Semantische Struktur und Schema.org-Auszeichnung passend zu Ihrer Branche",
    pt: "Estrutura semântica e dados Schema.org adaptados à sua atividade",
    it: "Struttura semantica e markup Schema.org calibrati per la tua attività",
  },
  "Conseils et gabarits pour collecter des avis clients élogieux et constants": {
    en: "Actionable templates and strategy to collect consistent 5-star client reviews",
    es: "Plantillas y estrategia para recopilar reseñas positivas constantes",
    de: "Leitfäden und Vorlagen zum kontinuierlichen Aufbau positiver Kundenbewertungen",
    pt: "Estratégias e modelos para recolher avaliações positivas constantes",
    it: "Consigli e modelli per raccogliere recensioni clienti eccellenti e costanti",
  },
  "Entreprises locales voulant capter les clients en recherche active de leurs services.": {
    en: "Local businesses looking to capture high-intent customers actively searching for their services.",
    es: "Empresas locales que desean captar clientes en búsqueda activa de sus servicios.",
    de: "Lokale Unternehmen, die kaufbereite Kunden bei der aktiven Suche gewinnen möchten.",
    pt: "Empresas locais que pretendem captar clientes à procura ativa dos seus serviços.",
    it: "Aziende locali che vogliono intercettare clienti alla ricerca attiva dei loro servizi.",
  },
  "Acquisition Locale": {
    en: "Local Acquisition",
    es: "Captación Local",
    de: "Lokale Kundengewinnung",
    pt: "Aquisição Local",
    it: "Acquisizione Locale",
  },
  "Top Résultats Google Maps": {
    en: "Top Google Maps Results",
    es: "Top Resultados Google Maps",
    de: "Top Google Maps Platzierung",
    pt: "Top Resultados Google Maps",
    it: "Top Risultati Google Maps",
  },

  // ===========================================================================
  // 5. CLIENT PARTNERS & PROJECTS (ClientPartners.tsx, ProjectsPage.tsx, agencyData.ts)
  // ===========================================================================
  "Entreprises Clientes": {
    en: "Client Companies",
    es: "Empresas Clientes",
    de: "Kundenunternehmen",
    pt: "Empresas Clientes",
    it: "Aziende Clienti",
  },
  "Collaborations & Références": {
    en: "Partnerships & Case Studies",
    es: "Colaboraciones y Referencias",
    de: "Kooperationen & Referenzen",
    pt: "Colaborações e Referências",
    it: "Collaborazioni e Referenze",
  },
  "Les entreprises qui avancent avec PRYMAX STUDIO": {
    en: "Forward-thinking companies growing with PRYMAX STUDIO",
    es: "Las empresas que avanzan con PRYMAX STUDIO",
    de: "Unternehmen, die mit PRYMAX STUDIO wachsen",
    pt: "As empresas que avançam com a PRYMAX STUDIO",
    it: "Le aziende che crescono con PRYMAX STUDIO",
  },
  "Présentation stylisée des entreprises partenaires : logos officiels, visuels projets et accès direct à leurs plateformes web.": {
    en: "Curated showcase of our partner companies: official logos, project visuals, and direct links to their live web platforms.",
    es: "Presentación de nuestras empresas asociadas: logotipos oficiales, visuales de proyectos y acceso directo a sus plataformas web.",
    de: "Ausgewählte Partnerunternehmen im Überblick: Offizielle Logos, Projekt-Einblicke und direkter Zugang zu ihren Webplattformen.",
    pt: "Apresentação das empresas parceiras: logótipos oficiais, visuais de projetos e acesso direto às suas plataformas web.",
    it: "Presentazione delle aziende partner: loghi ufficiali, visual dei progetti e accesso diretto alle loro piattaforme web.",
  },
  "Présentation Cascade": {
    en: "Cascade Deck",
    es: "Vista en Cascada",
    de: "Kaskaden-Ansicht",
    pt: "Vista em Cascata",
    it: "Vista a Cascata",
  },
  "Toutes les Entreprises": {
    en: "All Companies",
    es: "Todas las Empresas",
    de: "Alle Unternehmen",
    pt: "Todas as Empresas",
    it: "Tutte le Aziende",
  },
  "Mission Réalisée :": {
    en: "Delivered Scope:",
    es: "Misión Realizada:",
    de: "Ausgeführte Leistung:",
    pt: "Missão Realizada:",
    it: "Progetto Realizzato:",
  },
  "Prestation :": {
    en: "Service Delivered:",
    es: "Prestación:",
    de: "Leistung:",
    pt: "Serviço:",
    it: "Servizio:",
  },
  "Visiter le site officiel": {
    en: "Visit official website",
    es: "Visitar sitio oficial",
    de: "Offizielle Website besuchen",
    pt: "Visitar site oficial",
    it: "Visita il sito ufficiale",
  },
  "Visiter le site": {
    en: "Visit website",
    es: "Visitar sitio",
    de: "Website besuchen",
    pt: "Visitar site",
    it: "Visita il sito",
  },
  "Visiter": {
    en: "Visit",
    es: "Visitar",
    de: "Besuchen",
    pt: "Visitar",
    it: "Visita",
  },
  "Site en cours de développement": {
    en: "Platform in active development",
    es: "Sitio en desarrollo",
    de: "Website in Entwicklung",
    pt: "Site em desenvolvimento",
    it: "Sito in fase di sviluppo",
  },
  "Site en développement": {
    en: "In development",
    es: "En desarrollo",
    de: "In Entwicklung",
    pt: "Em desenvolvimento",
    it: "In sviluppo",
  },
  "En développement": {
    en: "In development",
    es: "En desarrollo",
    de: "In Entwicklung",
    pt: "Em desenvolvimento",
    it: "In sviluppo",
  },
  "Demander un projet similaire": {
    en: "Request a similar project",
    es: "Solicitar un proyecto similar",
    de: "Ähnliches Projekt anfragen",
    pt: "Pedir um projeto semelhante",
    it: "Richiedi un progetto simile",
  },
  "Projet Similaire": {
    en: "Similar Project",
    es: "Proyecto Similar",
    de: "Ähnliches Projekt",
    pt: "Projeto Semelhante",
    it: "Progetto Simile",
  },
  "Devis →": {
    en: "Quote →",
    es: "Presupuesto →",
    de: "Angebot →",
    pt: "Orçamento →",
    it: "Preventivo →",
  },
  "Référence Phare": {
    en: "Flagship Case Study",
    es: "Proyecto Destacado",
    de: "Leuchtturmprojekt",
    pt: "Referência de Destaque",
    it: "Progetto di Punta",
  },
  "Identité Visuelle, Logo vectoriel & Collection Textile officielle": {
    en: "Visual Identity, Vector Logo & Official Apparel Collection",
    es: "Identidad Visual, Logotipo Vectorial y Colección Textil Oficial",
    de: "Visuelle Identität, Vektor-Logo & Offizielle Textilkollektion",
    pt: "Identidade Visual, Logótipo Vetorial e Coleção Têxtil Oficial",
    it: "Identità Visiva, Logo Vettoriale e Collezione Tessile Ufficiale",
  },
  "Voir tous les projets": {
    en: "View all projects",
    es: "Ver todos los proyectos",
    de: "Alle Projekte ansehen",
    pt: "Ver todos os projetos",
    it: "Vedi tutti i progetti",
  },
  "Rejoindre nos clients": {
    en: "Become a client",
    es: "Unirse a nuestros clientes",
    de: "Kunde werden",
    pt: "Juntar-se aos clientes",
    it: "Unisciti ai nostri clienti",
  },

  // Partner entries
  "Ingénierie & Infrastructures": {
    en: "Engineering & Infrastructure",
    es: "Ingeniería e Infraestructuras",
    de: "Ingenieurwesen & Infrastruktur",
    pt: "Engenharia e Infraestruturas",
    it: "Ingegneria e Infrastrutture",
  },
  "Identité Visuelle, Présentation Corporate & Présence Digitale": {
    en: "Visual Identity, Corporate Presentation & Digital Presence",
    es: "Identidad Visual, Presentación Corporativa y Presencia Digital",
    de: "Visuelle Identität, Unternehmenspräsentation & Digitale Präsenz",
    pt: "Identidade Visual, Apresentação Corporativa e Presença Digital",
    it: "Identità Visiva, Presentazione Corporate e Presenza Digitale",
  },
  "Accompagnement d'un groupe d'ingénierie civile d'envergure moderne et technique.": {
    en: "Brand and digital transformation for a modern civil engineering group.",
    es: "Acompañamiento de un grupo de ingeniería civil de envergadura moderna y técnica.",
    de: "Begleitung einer modernen Unternehmensgruppe für Bauingenieurwesen und Technik.",
    pt: "Acompanhamento de um grupo de engenharia civil de dimensão moderna e técnica.",
    it: "Affiancamento a un gruppo di ingegneria civile dal profilo moderno e tecnico.",
  },
  "Ingénierie BTP": {
    en: "Civil Engineering",
    es: "Ingeniería Civil",
    de: "Bauingenieurwesen",
    pt: "Engenharia Civil",
    it: "Ingegneria Civile",
  },
  "Hôtellerie, Tourisme & Séjour Balnéaire": {
    en: "Hospitality, Tourism & Coastal Resort",
    es: "Hotelería, Turismo y Estancia Costera",
    de: "Hotellerie, Tourismus & Küstenresort",
    pt: "Hotelaria, Turismo e Estadia Balnear",
    it: "Ospitalità, Turismo e Resort Balneare",
  },
  "Conception Web & Expérience Visuelle": {
    en: "Web Design & Visual Experience",
    es: "Diseño Web y Experiencia Visual",
    de: "Webdesign & Visuelles Erlebnis",
    pt: "Web Design e Experiência Visual",
    it: "Web Design ed Esperienza Visiva",
  },
  "Plateforme d'hébergement et villégiature côtière de standing à Kribi.": {
    en: "Upscale coastal resort and hospitality booking platform in Kribi.",
    es: "Plataforma de alojamiento y complejo turístico costero de lujo en Kribi.",
    de: "Plattform für gehobene Küstenunterkünfte und Urlaubsaufenthalte in Kribi.",
    pt: "Plataforma de alojamento e estância costeira de prestígio em Kribi.",
    it: "Piattaforma di ospitalità e soggiorno balneare di prestigio a Kribi.",
  },
  "Tourisme & Luxe": {
    en: "Luxury Hospitality",
    es: "Turismo y Lujo",
    de: "Tourismus & Luxus",
    pt: "Turismo e Luxo",
    it: "Turismo e Lusso",
  },
  "Immobilier & Résidences de Prestige": {
    en: "Real Estate & Luxury Residences",
    es: "Inmobiliaria y Residencias de Prestigio",
    de: "Immobilien & Exklusive Residenzen",
    pt: "Imobiliário e Residências de Prestígio",
    it: "Immobiliare e Residenze di Prestigio",
  },
  "Développement Web Immobilier & Catalogue de Biens": {
    en: "Real Estate Web Platform & Property Catalog",
    es: "Desarrollo Web Inmobiliario y Catálogo de Propiedades",
    de: "Immobilien-Webentwicklung & Objektkatalog",
    pt: "Desenvolvimento Web Imobiliário e Catálogo de Imóveis",
    it: "Sviluppo Web Immobiliare e Catalogo Proprietà",
  },
  "Vitrine digitale pour investissements immobiliers et locations haut de gamme.": {
    en: "Digital showcase for real estate investments and high-end property rentals.",
    es: "Vitrina digital para inversiones inmobiliarias y alquileres de alta gama.",
    de: "Digitale Plattform für Immobilieninvestitionen und hochwertige Vermietungen.",
    pt: "Montra digital para investimentos imobiliários e arrendamentos de alto padrão.",
    it: "Vetrina digitale per investimenti immobiliari e locazioni di fascia alta.",
  },
  "Immobilier": {
    en: "Real Estate",
    es: "Inmobiliaria",
    de: "Immobilien",
    pt: "Imobiliário",
    it: "Immobiliare",
  },
  "Smartphones & High-Tech Mobile": {
    en: "Smartphones & Consumer Tech",
    es: "Smartphones y Alta Tecnología Móvil",
    de: "Smartphones & Mobile High-Tech",
    pt: "Smartphones e Tecnologia Mobile",
    it: "Smartphone e High-Tech Mobile",
  },
  "Boutique E-Commerce & Catalogue Produits Connectés": {
    en: "E-Commerce Storefront & Connected Devices Catalog",
    es: "Tienda E-Commerce y Catálogo de Dispositivos",
    de: "E-Commerce-Shop & Produktkatalog",
    pt: "Loja E-Commerce e Catálogo de Produtos",
    it: "Store E-Commerce e Catalogo Prodotti Tech",
  },
  "Boutique digitale dédiée aux smartphones dernière génération et accessoires.": {
    en: "Digital storefront dedicated to next-generation smartphones and premium accessories.",
    es: "Tienda digital dedicada a smartphones de última generación y accesorios.",
    de: "Digitaler Store für Smartphones der neuesten Generation und Zubehör.",
    pt: "Loja digital dedicada a smartphones de última geração e acessórios.",
    it: "Store digitale dedicato a smartphone di ultima generazione e accessori.",
  },
  "Automobile, Detailing & Mécanique de Précision": {
    en: "Automotive, Detailing & Precision Mechanics",
    es: "Automoción, Detailing y Mecánica de Precisión",
    de: "Automobil, Detailing & Präzisionsmechanik",
    pt: "Automóvel, Detailing e Mecânica de Precisão",
    it: "Automotive, Detailing e Meccanica di Precisione",
  },
  "Site Web Professionnel & Image de Marque Premium": {
    en: "Corporate Website & Premium Brand Identity",
    es: "Sitio Web Profesional e Imagen de Marca Premium",
    de: "Professionelle Website & Premium-Markenauftritt",
    pt: "Site Profissional e Imagem de Marca Premium",
    it: "Sito Web Professionale e Brand Image Premium",
  },
  "Plateforme digitale pour centre d'entretien automobile d'élite et esthétique carrosserie.": {
    en: "Digital platform for an elite automotive care and bodywork detailing center.",
    es: "Plataforma digital para centro de cuidado automotriz de élite y estética vehicular.",
    de: "Digitale Plattform für ein erstklassiges Autopflege- und Detailing-Zentrum.",
    pt: "Plataforma digital para centro de estética e manutenção automóvel de elite.",
    it: "Piattaforma digitale per centro di cura auto d'élite e detailing carrozzeria.",
  },
  "Communication Stratégique & Relations Publiques": {
    en: "Strategic Communications & Public Relations",
    es: "Comunicación Estratégica y Relaciones Públicas",
    de: "Strategische Kommunikation & Public Relations",
    pt: "Comunicação Estratégica e Relações Públicas",
    it: "Comunicazione Strategica e Pubbliche Relazioni",
  },
  "Architecture Web & Plateforme Panafricaine": {
    en: "Web Architecture & Pan-African Platform",
    es: "Arquitectura Web y Plataforma Panafricana",
    de: "Web-Architektur & Panafrikanische Plattform",
    pt: "Arquitetura Web e Plataforma Pan-Africana",
    it: "Architettura Web e Piattaforma Panafricana",
  },
  "Conception et refonte d'une interface moderne pour groupe de communication international.": {
    en: "Design and modernization of a web interface for an international communications group.",
    es: "Diseño y renovación de una interfaz moderna para un grupo de comunicación internacional.",
    de: "Konzeption und Redesign einer modernen Oberfläche für eine internationale Kommunikationsgruppe.",
    pt: "Conceção e remodelação de uma interface moderna para grupo de comunicação internacional.",
    it: "Progettazione e restyling di un'interfaccia moderna per un gruppo di comunicazione internazionale.",
  },
  "Médias & RP": {
    en: "Media & PR",
    es: "Medios y RR.PP.",
    de: "Medien & PR",
    pt: "Media e RP",
    it: "Media e PR",
  },

  // ProjectsPage specific
  "Entreprises Accompagnées · Références Officielles": {
    en: "Partner Companies · Official References",
    es: "Empresas Acompañadas · Referencias Oficiales",
    de: "Betreute Unternehmen · Offizielle Referenzen",
    pt: "Empresas Acompanhadas · Referências Oficiais",
    it: "Aziende Partner · Referenze Ufficiali",
  },
  "Entreprises et marques qui nous font confiance": {
    en: "Companies and brands that trust our studio",
    es: "Empresas y marcas que confían en nosotros",
    de: "Unternehmen und Marken, die uns vertrauen",
    pt: "Empresas e marcas que confiam em nós",
    it: "Aziende e brand che si affidano a noi",
  },
  "Découvrez les entreprises pour lesquelles nous concevons des sites web, des identités visuelles et des solutions digitales sur-mesure.": {
    en: "Discover the companies for which we craft bespoke websites, visual identities, and high-impact digital solutions.",
    es: "Descubra las empresas para las que diseñamos sitios web, identidades visuales y soluciones digitales a medida.",
    de: "Entdecken Sie die Unternehmen, für die wir maßgeschneiderte Websites, Markenidentitäten und digitale Lösungen entwickeln.",
    pt: "Descubra as empresas para as quais criamos sites web, identidades visuais e soluções digitais sob medida.",
    it: "Scopri le aziende per cui progettiamo siti web, identità visive e soluzioni digitali su misura.",
  },
  "Projet Phare · Mode & Streetwear": {
    en: "Flagship Project · Fashion & Streetwear",
    es: "Proyecto Destacado · Moda y Streetwear",
    de: "Leuchtturmprojekt · Mode & Streetwear",
    pt: "Projeto de Destaque · Moda e Streetwear",
    it: "Progetto di Punta · Moda e Streetwear",
  },
  "Création complète de l'identité de marque, logotype vectoriel haute définition avec croix stylisée et déclinaisons visuelles textiles réalistes sur t-shirts et pulls à capuche bordeaux.": {
    en: "Complete brand identity creation, high-definition vector logotype with stylized cross emblem, and realistic 3D apparel mockups on burgundy t-shirts and hoodies.",
    es: "Creación completa de la identidad de marca, logotipo vectorial de alta definición con cruz estilizada y mockups textiles realistas en camisetas y sudaderas burdeos.",
    de: "Komplette Markenidentität, hochauflösendes Vektor-Logo mit stilisiertem Kreuz und realistische Textil-Mockups auf bordeauxfarbenen T-Shirts und Hoodies.",
    pt: "Criação completa da identidade de marca, logótipo vetorial de alta definição com cruz estilizada e mockups têxteis realistas em t-shirts e hoodies bordô.",
    it: "Creazione completa dell'identità di marca, logotipo vettoriale HD con croce stilizzata e mockup tessili realistici su t-shirt e felpe bordeaux.",
  },
  "Identité visuelle originale & pleine cession de droits": {
    en: "Original visual identity & full copyright transfer",
    es: "Identidad visual original y cesión total de derechos",
    de: "Originale Markenidentität & volle Rechteübertragung",
    pt: "Identidade visual original e cedência total de direitos",
    it: "Identità visiva originale e piena cessione dei diritti",
  },
  "Mockups 3D réalistes pour communication réseaux sociaux": {
    en: "Realistic 3D mockups for social media campaigns",
    es: "Mockups 3D realistas para comunicación en redes sociales",
    de: "Realistische 3D-Mockups für Social-Media-Kampagnen",
    pt: "Mockups 3D realistas para comunicação nas redes sociais",
    it: "Mockup 3D realistici per la comunicazione sui social media",
  },
  "Charte graphique complète & planche officielle": {
    en: "Complete brand guidelines & official presentation board",
    es: "Manual de identidad completo y lámina oficial",
    de: "Vollständiges Brand Book & offizielle Markenpräsentation",
    pt: "Manual de identidade completo e prancha oficial",
    it: "Brand book completo e tavola di presentazione ufficiale",
  },
  "Statut : Déployé avec succès": {
    en: "Status: Successfully Deployed",
    es: "Estado: Desplegado con éxito",
    de: "Status: Erfolgreich veröffentlicht",
    pt: "Estado: Lançado com sucesso",
    it: "Stato: Pubblicato con successo",
  },
  "Référence Officielle": {
    en: "Official Reference",
    es: "Referencia Oficial",
    de: "Offizielle Referenz",
    pt: "Referência Oficial",
    it: "Referenza Ufficiale",
  },
  "Portefeuille d'entreprises clientes": {
    en: "Client Portfolio",
    es: "Cartera de empresas clientes",
    de: "Portfolio unserer Kundenunternehmen",
    pt: "Portefólio de empresas clientes",
    it: "Portfolio di aziende clienti",
  },
  "Chaque carte présente le logo officiel, l'image de l'entreprise et son lien web direct.": {
    en: "Each card showcases the official logo, company visual, and direct website link.",
    es: "Cada tarjeta presenta el logotipo oficial, la imagen de la empresa y su enlace web directo.",
    de: "Jede Karte zeigt das offizielle Logo, das Unternehmensbild und den direkten Website-Link.",
    pt: "Cada cartão apresenta o logótipo oficial, a imagem da empresa e a ligação direta para o site.",
    it: "Ogni scheda mostra il logo ufficiale, l'immagine aziendale e il link diretto al sito web.",
  },
  "Votre entreprise mérite un site web et une image de marque d'exception": {
    en: "Your business deserves an exceptional website and brand identity",
    es: "Su empresa merece un sitio web y una imagen de marca excepcionales",
    de: "Ihr Unternehmen verdient eine exzellente Website und Markenidentität",
    pt: "A sua empresa merece um site web e uma imagem de marca de excelência",
    it: "La tua azienda merita un sito web e un'immagine di marca d'eccellenza",
  },
  "Nous collaborons avec les entreprises ambitieuses pour créer des plateformes digitales qui font la différence.": {
    en: "We partner with ambitious companies to build digital platforms that make a lasting impact.",
    es: "Colaboramos con empresas ambiciosas para crear plataformas digitales que marcan la diferencia.",
    de: "Wir arbeiten mit ambitionierten Unternehmen zusammen, um digitale Plattformen mit echtem Mehrwert zu schaffen.",
    pt: "Colaboramos com empresas ambiciosas para criar plataformas digitais que fazem a diferença.",
    it: "Collaboriamo con aziende ambiziose per creare piattaforme digitali che fanno la differenza.",
  },
  "Démarrer une collaboration": {
    en: "Start a collaboration",
    es: "Iniciar una colaboración",
    de: "Zusammenarbeit starten",
    pt: "Iniciar uma colaboração",
    it: "Avvia una collaborazione",
  },

  // ===========================================================================
  // 6. STUDIO SECTION & STUDIO PAGE
  // ===========================================================================
  "Qui Sommes-Nous": {
    en: "Who We Are",
    es: "Quiénes Somos",
    de: "Über Uns",
    pt: "Quem Somos",
    it: "Chi Siamo",
  },
  "L'ADN PRYMAX STUDIO": {
    en: "The PRYMAX STUDIO DNA",
    es: "El ADN de PRYMAX STUDIO",
    de: "Die PRYMAX STUDIO DNA",
    pt: "O ADN da PRYMAX STUDIO",
    it: "Il DNA di PRYMAX STUDIO",
  },
  "Un studio digital guidé par la précision, l'écoute et le résultat": {
    en: "A digital studio driven by precision, active listening, and measurable results",
    es: "Un estudio digital guiado por la precisión, la escucha y los resultados",
    de: "Ein Digitalstudio, geleitet von Präzision, Verständnis und messbaren Ergebnissen",
    pt: "Um estúdio digital guiado pela precisão, escuta ativa e resultados",
    it: "Uno studio digitale guidato da precisione, ascolto e risultati concreti",
  },
  "Chez PRYMAX STUDIO, nous refusons les sites génériques et les promesses creuses. Nous allions rigueur technique et sensibilité esthétique pour concevoir des produits digitaux qui marquent durablement les esprits.": {
    en: "At PRYMAX STUDIO, we reject generic templates and empty promises. We combine engineering rigor with refined aesthetics to craft digital products that leave a lasting impression.",
    es: "En PRYMAX STUDIO rechazamos los sitios genéricos y las promesas vacías. Unimos rigor técnico y sensibilidad estética para crear productos digitales memorables.",
    de: "Bei PRYMAX STUDIO lehnen wir Standard-Vorlagen und leere Versprechen ab. Wir verbinden technische Präzision mit ästhetischem Anspruch für nachhaltige digitale Produkte.",
    pt: "Na PRYMAX STUDIO, recusamos sites genéricos e promessas vazias. Aliamos rigor técnico e sensibilidade estética para conceber produtos digitais marcantes.",
    it: "In PRYMAX STUDIO rifiutiamo i siti generici e le promesse vuote. Uniamo rigore tecnico e sensibilità estetica per creare prodotti digitali che lasciano il segno.",
  },
  "Pilier 01": {
    en: "Pillar 01",
    es: "Pilar 01",
    de: "Säule 01",
    pt: "Pilar 01",
    it: "Pilastro 01",
  },
  "Pilier 02": {
    en: "Pillar 02",
    es: "Pilar 02",
    de: "Säule 02",
    pt: "Pilar 02",
    it: "Pilastro 02",
  },
  "Pilier 03": {
    en: "Pillar 03",
    es: "Pilar 03",
    de: "Säule 03",
    pt: "Pilar 03",
    it: "Pilastro 03",
  },
  "Clarté & Simplicité": {
    en: "Clarity & Simplicity",
    es: "Claridad y Simplicidad",
    de: "Klarheit & Einfachheit",
    pt: "Clareza e Simplicidade",
    it: "Chiarezza e Semplicità",
  },
  "Pas de jargon prétentieux. Nous traduisons vos besoins en solutions concrètes : des sites limpides, des logos faciles à décliner et des processus simples.": {
    en: "No pretentious jargon. We translate your business needs into concrete solutions: crystal-clear websites, versatile logos, and streamlined workflows.",
    es: "Sin jerga innecesaria. Traducimos sus necesidades en soluciones concretas: sitios claros, logotipos versátiles y procesos sencillos.",
    de: "Kein unnötiger Fachjargon. Wir übersetzen Ihre Anforderungen in konkrete Lösungen: klare Websites, vielseitige Logos und einfache Prozesse.",
    pt: "Sem jargão complexo. Traduzimos as suas necessidades em soluções concretas: sites claros, logótipos versáteis e processos simples.",
    it: "Nessun gergo superfluo. Traduciamo le tue esigenze in soluzioni concrete: siti chiari, loghi versatili e processi semplici.",
  },
  "Communication directe & fluide": {
    en: "Direct & seamless communication",
    es: "Comunicación directa y fluida",
    de: "Direkte & reibungslose Kommunikation",
    pt: "Comunicação direta e fluida",
    it: "Comunicazione diretta e fluida",
  },
  "Performance & Mobile-First": {
    en: "Performance & Mobile-First",
    es: "Rendimiento y Mobile-First",
    de: "Performance & Mobile-First",
    pt: "Performance e Mobile-First",
    it: "Performance e Mobile-First",
  },
  "Plus de 80% de vos clients vous découvrent sur smartphone. Chaque interface est calibrée pour charger en moins d'une seconde et réagir au doigt et à l'œil.": {
    en: "Over 80% of your clients discover you on mobile. Every interface is calibrated to load in under a second and respond effortlessly to every touch.",
    es: "Más del 80% de sus clientes lo descubren desde el móvil. Cada interfaz está calibrada para cargar en menos de un segundo con fluidez total.",
    de: "Über 80 % Ihrer Kunden entdecken Sie auf dem Smartphone. Jede Oberfläche ist auf blitzschnelle Ladezeiten und perfekte mobile Bedienung optimiert.",
    pt: "Mais de 80% dos seus clientes descobrem-no no smartphone. Cada interface é calibrada para carregar em menos de um segundo com fluidez total.",
    it: "Oltre l'80% dei tuoi clienti ti scopre da smartphone. Ogni interfaccia è calibrata per caricarsi in meno di un secondo e rispondere istantaneamente.",
  },
  "Optimisation mobile garantie": {
    en: "Guaranteed mobile optimization",
    es: "Optimización móvil garantizada",
    de: "Garantierte Mobile-Optimierung",
    pt: "Otimização mobile garantida",
    it: "Ottimizzazione mobile garantita",
  },
  "Engagement & Suivi": {
    en: "Commitment & Follow-Up",
    es: "Compromiso y Seguimiento",
    de: "Engagement & Betreuung",
    pt: "Compromisso e Acompanhamento",
    it: "Impegno e Affiancamento",
  },
  "Nous ne disparaissons pas après la livraison. Vous bénéficiez d'une assistance réactive, de formations simples et d'un accompagnement sur la durée.": {
    en: "We don't disappear after launch. You benefit from responsive support, straightforward training, and long-term partnership.",
    es: "No desaparecemos tras la entrega. Disfrute de asistencia reactiva, formación sencilla y acompañamiento continuo.",
    de: "Wir verschwinden nach der Übergabe nicht. Sie profitieren von schnellem Support, verständlichen Schulungen und langfristiger Begleitung.",
    pt: "Não desaparecemos após a entrega. Beneficia de assistência rápida, formação simples e acompanhamento contínuo.",
    it: "Non scompariamo dopo la consegna. Benefici di assistenza reattiva, formazione semplice e supporto continuo nel tempo.",
  },
  "Accompagnement après livraison": {
    en: "Dedicated post-launch support",
    es: "Acompañamiento tras la entrega",
    de: "Betreuung nach Projektübergabe",
    pt: "Acompanhamento pós-entrega",
    it: "Supporto post-consegna",
  },
  "Notre Promesse": {
    en: "Our Promise",
    es: "Nuestra Promesa",
    de: "Unser Versprechen",
    pt: "A Nossa Promessa",
    it: "La Nostra Promessa",
  },
  "Vous êtes 100% propriétaire de vos créations et de votre code.": {
    en: "You own 100% of your creative assets and source code.",
    es: "Usted es 100% propietario de sus diseños y de su código.",
    de: "Sie erhalten 100 % Eigentum an Ihren Designs und Ihrem Quellcode.",
    pt: "É 100% proprietário das suas criações e do seu código.",
    it: "Sei proprietario al 100% delle tue creazioni e del tuo codice.",
  },
  "Aucun abonnement captif, aucun frais caché. Tous les fichiers sources, logos vectoriels et accès administrateurs vous sont remis à la livraison.": {
    en: "No lock-in subscriptions, no hidden fees. All source files, vector logos, and full administrator credentials are handed over upon delivery.",
    es: "Sin suscripciones cautivas ni costes ocultos. Todos los archivos fuente, logotipos vectoriales y accesos de administrador se entregan al finalizar.",
    de: "Keine Knebelabos, keine versteckten Kosten. Alle Quelldateien, Vektor-Logos und Admin-Zugänge werden Ihnen bei Lieferung vollständig übergeben.",
    pt: "Sem subscrições cativas nem custos ocultos. Todos os ficheiros editáveis, logótipos vetoriais e acessos de administrador são entregues no final.",
    it: "Nessun abbonamento vincolante, nessun costo nascosto. Tutti i file sorgente, i loghi vettoriali e gli accessi amministratore ti vengono consegnati.",
  },
  "Garantie Studio": {
    en: "Studio Guarantee",
    es: "Garantía del Estudio",
    de: "Studio-Garantie",
    pt: "Garantia do Estúdio",
    it: "Garanzia Studio",
  },
  "Sans engagement": {
    en: "No lock-in",
    es: "Sin permanencia",
    de: "Ohne Vertragsbindung",
    pt: "Sem fidelização",
    it: "Senza vincoli",
  },

  // StudioPage specific
  "Studio Digital Indépendant d'Élite": {
    en: "Elite Independent Digital Studio",
    es: "Estudio Digital Independiente de Élite",
    de: "Unabhängiges Premium-Digitalstudio",
    pt: "Estúdio Digital Independente de Elite",
    it: "Studio Digitale Indipendente d'Élite",
  },
  "L'exigence du sur-mesure, l'agilité d'un studio indépendant": {
    en: "Bespoke craftsmanship with the agility of an independent studio",
    es: "La exigencia de lo hecho a medida, la agilidad de un estudio independiente",
    de: "Maßgeschneiderte Exzellenz mit der Agilität eines unabhängigen Studios",
    pt: "A exigência do sob medida com a agilidade de um estúdio independente",
    it: "L'eccellenza del su misura, l'agilità di uno studio indipendente",
  },
  "Chez PRYMAX STUDIO, nous travaillons avec un niveau d'exigence sans compromis. Pas d'intermédiaire, pas de bureaucratie : vous échangez directement avec les créateurs de votre produit.": {
    en: "At PRYMAX STUDIO, we work with uncompromising standards. No middlemen, no bureaucracy: you collaborate directly with the creators building your product.",
    es: "En PRYMAX STUDIO trabajamos con un nivel de exigencia sin concesiones. Sin intermediarios ni burocracia: habla directamente con los creadores de su proyecto.",
    de: "Bei PRYMAX STUDIO arbeiten wir mit kompromisslosem Qualitätsanspruch. Keine Zwischenhändler, keine Bürokratie: Sie sprechen direkt mit den Entwicklern Ihres Projekts.",
    pt: "Na PRYMAX STUDIO, trabalhamos com um nível de exigência sem compromissos. Sem intermediários nem burocracia: fala diretamente com os criadores do seu produto.",
    it: "In PRYMAX STUDIO lavoriamo con standard qualitativi senza compromessi. Nessun intermediario, nessuna burocrazia: dialoghi direttamente con i creatori del tuo progetto.",
  },
  "ADN & Philosophie PRYMAX STUDIO": {
    en: "PRYMAX STUDIO DNA & Philosophy",
    es: "ADN y Filosofía de PRYMAX STUDIO",
    de: "DNA & Philosophie von PRYMAX STUDIO",
    pt: "ADN e Filosofia PRYMAX STUDIO",
    it: "DNA e Filosofia PRYMAX STUDIO",
  },
  "« Nous croyons que chaque entreprise mérite une vitrine digitale aussi prestigieuse que son savoir-faire. »": {
    en: "“We believe every company deserves a digital presence as prestigious as its expertise.”",
    es: "«Creemos que cada empresa merece una vitrina digital tan prestigiosa como su saber hacer.»",
    de: "„Wir glauben, dass jedes Unternehmen eine digitale Präsenz verdient, die so erstklassig ist wie sein eigenes Know-how.“",
    pt: "«Acreditamos que cada empresa merece uma presença digital tão prestigiada quanto o seu saber-fazer.»",
    it: "«Crediamo che ogni azienda meriti una vetrina digitale prestigiosa quanto il proprio savoir-faire.»",
  },
  "Dans un monde numérique saturé de templates génériques et de sites lents, PRYMAX STUDIO a été fondé pour apporter une alternative haut de gamme aux entreprises exigeantes. Nous concevons chaque site, chaque logo et chaque détail comme une pièce unique d'artisanat digital.": {
    en: "In a digital landscape saturated with generic templates and sluggish websites, PRYMAX STUDIO was founded to offer a high-end alternative for discerning businesses. We craft every website, logo, and interaction as a bespoke piece of digital craftsmanship.",
    es: "En un entorno digital saturado de plantillas genéricas y sitios lentos, PRYMAX STUDIO nació para ofrecer una alternativa de alta gama a empresas exigentes. Diseñamos cada sitio, cada logotipo y cada detalle como una pieza única de artesanía digital.",
    de: "In einer digitalen Welt voller Standard-Templates und langsamer Seiten wurde PRYMAX STUDIO gegründet, um anspruchsvollen Unternehmen eine hochwertige Alternative zu bieten. Jede Website und jedes Logo entsteht als digitale Maßarbeit.",
    pt: "Num mundo digital saturado de modelos genéricos e sites lentos, a PRYMAX STUDIO foi fundada para oferecer uma alternativa de alto padrão a empresas exigentes. Concebemos cada site e cada logótipo como uma peça única de artesanato digital.",
    it: "In un mondo digitale saturo di template generici e siti lenti, PRYMAX STUDIO è nato per offrire un'alternativa di fascia alta alle aziende esigenti. Progettiamo ogni sito, logo e dettaglio come un pezzo unico di artigianato digitale.",
  },
  "Sur-mesure & Mobile-First": {
    en: "Bespoke & Mobile-First",
    es: "A medida y Mobile-First",
    de: "Maßarbeit & Mobile-First",
    pt: "Sob medida e Mobile-First",
    it: "Su misura e Mobile-First",
  },
  "Sur-Mesure": {
    en: "Bespoke",
    es: "A Medida",
    de: "Maßarbeit",
    pt: "Sob Medida",
    it: "Su Misura",
  },
  "Architecture dédiée & épurée": {
    en: "Clean, dedicated architecture",
    es: "Arquitectura dedicada y depurada",
    de: "Dedizierte & klare Architektur",
    pt: "Arquitetura dedicada e depurada",
    it: "Architettura dedicata ed essenziale",
  },
  "Direct": {
    en: "Direct",
    es: "Directo",
    de: "Direkt",
    pt: "Direto",
    it: "Diretto",
  },
  "Échanges réactifs & continus": {
    en: "Responsive & continuous dialogue",
    es: "Comunicación reactiva y continua",
    de: "Schneller & direkter Austausch",
    pt: "Comunicação rápida e contínua",
    it: "Dialogo reattivo e continuo",
  },
  "Nos Engagements Piliers": {
    en: "Our Core Commitments",
    es: "Nuestros Compromisos Clave",
    de: "Unsere Grundprinzipien",
    pt: "Os Nossos Compromissos Base",
    it: "I Nostri Impegni Fondamentali",
  },
  "Comment nous garantissons l'excellence": {
    en: "How we guarantee excellence",
    es: "Cómo garantizamos la excelencia",
    de: "Wie wir höchste Qualität garantieren",
    pt: "Como garantimos a excelência",
    it: "Come garantiamo l'eccellenza",
  },
  "Zéro jargon inutile. Nous traduisons vos objectifs business en fonctionnalités claires, interfaces intuitives et chartes graphiques immédiatement applicables.": {
    en: "Zero unnecessary jargon. We translate your business goals into clear features, intuitive interfaces, and immediately actionable brand guidelines.",
    es: "Cero jerga innecesaria. Traducimos sus objetivos de negocio en funcionalidades claras, interfaces intuitivas y manuales de marca aplicables al instante.",
    de: "Kein unnötiges Fachchinesisch. Wir übersetzen Ihre Geschäftsziele in klare Funktionen, intuitive Oberflächen und sofort nutzbare Design-Richtlinien.",
    pt: "Zero jargão desnecessário. Traduzimos os seus objetivos de negócio em funcionalidades claras, interfaces intuitivas e manuais de marca práticos.",
    it: "Zero gergo inutile. Traduciamo i tuoi obiettivi di business in funzionalità chiare, interfacce intuitive e linee guida immediatamente applicabili.",
  },
  "Communication transparente": {
    en: "Transparent communication",
    es: "Comunicación transparente",
    de: "Transparente Kommunikation",
    pt: "Comunicação transparente",
    it: "Comunicazione trasparente",
  },
  "Performance 100% Mobile": {
    en: "100% Mobile Performance",
    es: "Rendimiento 100% Móvil",
    de: "100% Mobile Performance",
    pt: "Performance 100% Mobile",
    it: "Performance 100% Mobile",
  },
  "La majorité de vos clients naviguent sur smartphone. Chaque site est optimisé pour charger instantanément même en connexion modeste.": {
    en: "The majority of your customers browse on smartphones. Every website is engineered to load instantaneously, even on modest mobile connections.",
    es: "La mayoría de sus clientes navegan desde el móvil. Cada sitio está optimizado para cargar al instante incluso con conexiones modestas.",
    de: "Die Mehrheit Ihrer Kunden nutzt das Smartphone. Jede Website lädt selbst bei schwächerer Verbindung blitzschnell.",
    pt: "A maioria dos seus clientes navega no smartphone. Cada site é otimizado para carregar instantaneamente mesmo em ligações móveis moderadas.",
    it: "La maggior parte dei tuoi clienti naviga da smartphone. Ogni sito è ottimizzato per caricarsi istantaneamente anche su connessioni mobili lente.",
  },
  "Score Core Web Vitals élevé": {
    en: "Top Core Web Vitals scores",
    es: "Puntuación Core Web Vitals alta",
    de: "Top Core Web Vitals Werte",
    pt: "Pontuação Core Web Vitals elevada",
    it: "Punteggio Core Web Vitals elevato",
  },
  "Accompagnement & Suivi": {
    en: "Guidance & Long-Term Support",
    es: "Acompañamiento y Seguimiento",
    de: "Begleitung & Support",
    pt: "Acompanhamento e Suporte",
    it: "Affiancamento e Supporto",
  },
  "La livraison n'est que le début. Vous bénéficiez d'une assistance réactive, d'une formation vidéo claire et d'une disponibilité continue pour vos futures évolutions.": {
    en: "Delivery is only the beginning. You receive responsive support, clear walkthroughs, and ongoing availability for future enhancements.",
    es: "La entrega es solo el comienzo. Disfrute de asistencia reactiva, formación clara y disponibilidad continua para futuras evoluciones.",
    de: "Die Übergabe ist erst der Anfang. Sie erhalten schnellen Support, klare Einweisungen und kontinuierliche Begleitung für künftige Erweiterungen.",
    pt: "A entrega é apenas o começo. Beneficia de assistência rápida, formação clara e disponibilidade contínua para futuras evoluções.",
    it: "La consegna è solo l'inizio. Benefici di assistenza reattiva, formazione chiara e disponibilità continua per i futuri sviluppi.",
  },
  "Disponibilité continue": {
    en: "Continuous availability",
    es: "Disponibilidad continua",
    de: "Kontinuierliche Erreichbarkeit",
    pt: "Disponibilidade contínua",
    it: "Disponibilità continua",
  },
  "Notre processus de création en 4 étapes": {
    en: "Our 4-step creation workflow",
    es: "Nuestro proceso de creación en 4 etapas",
    de: "Unser 4-stufiger Entstehungsprozess",
    pt: "O nosso processo de criação em 4 etapas",
    it: "Il nostro processo creativo in 4 fasi",
  },
  "01 · Découverte & Brief": {
    en: "01 · Discovery & Brief",
    es: "01 · Descubrimiento y Brief",
    de: "01 · Analyse & Briefing",
    pt: "01 · Descoberta e Brief",
    it: "01 · Analisi e Brief",
  },
  "Analyse de vos besoins": {
    en: "Requirements Analysis",
    es: "Análisis de sus necesidades",
    de: "Bedarfsanalyse",
    pt: "Análise das suas necessidades",
    it: "Analisi delle tue esigenze",
  },
  "Échange approfondi sur vos cibles, vos concurrents et vos objectifs chiffrés.": {
    en: "In-depth discussion of your target audience, competitors, and measurable business goals.",
    es: "Análisis detallado de su público objetivo, competidores y metas comerciales.",
    de: "Fundierter Austausch über Zielgruppen, Wettbewerb und messbare Unternehmensziele.",
    pt: "Análise aprofundada do seu público-alvo, concorrentes e objetivos de negócio.",
    it: "Confronto approfondito su pubblico target, competitor e obiettivi di business.",
  },
  "02 · Design & Prototype": {
    en: "02 · Design & Prototype",
    es: "02 · Diseño y Prototipo",
    de: "02 · Design & Prototyp",
    pt: "02 · Design e Protótipo",
    it: "02 · Design e Prototipo",
  },
  "Création visuelle": {
    en: "Visual Art Direction",
    es: "Creación visual",
    de: "Visuelle Gestaltung",
    pt: "Criação visual",
    it: "Creazione visiva",
  },
  "Maquettes interactives, propositions de logos ou design d'interfaces adaptées.": {
    en: "Interactive prototypes, bespoke logo concepts, and tailored UI/UX architecture.",
    es: "Maquetas interactivas, propuestas de logotipos o diseño de interfaces a medida.",
    de: "Interaktive Prototypen, Logo-Entwürfe und maßgeschneidertes Interface-Design.",
    pt: "Maquetes interativas, propostas de logótipos e design de interfaces sob medida.",
    it: "Mockup interattivi, proposte di logo e design di interfacce su misura.",
  },
  "03 · Développement & Tests": {
    en: "03 · Engineering & QA",
    es: "03 · Desarrollo y Pruebas",
    de: "03 · Entwicklung & Tests",
    pt: "03 · Desenvolvimento e Testes",
    it: "03 · Sviluppo e Test",
  },
  "Codage & Optimisation": {
    en: "Coding & Optimization",
    es: "Programación y Optimización",
    de: "Programmierung & Optimierung",
    pt: "Código e Otimização",
    it: "Sviluppo e Ottimizzazione",
  },
  "Intégration responsive, sécurisation HTTPS, tests de vitesse et formulaires interactifs.": {
    en: "Responsive engineering, HTTPS security hardening, speed benchmarks, and interactive forms.",
    es: "Integración responsiva, seguridad HTTPS, pruebas de velocidad y formularios interactivos.",
    de: "Responsive Umsetzung, HTTPS-Absicherung, Geschwindigkeitstests und interaktive Formulare.",
    pt: "Integração responsiva, segurança HTTPS, testes de velocidade e formulários interativos.",
    it: "Integrazione responsive, sicurezza HTTPS, test di velocità e moduli interattivi.",
  },
  "04 · Livraison & Suivi": {
    en: "04 · Launch & Support",
    es: "04 · Entrega y Seguimiento",
    de: "04 · Go-Live & Betreuung",
    pt: "04 · Entrega e Suporte",
    it: "04 · Consegna e Supporto",
  },
  "Mise en ligne officielle": {
    en: "Official Go-Live",
    es: "Lanzamiento oficial",
    de: "Offizieller Go-Live",
    pt: "Lançamento oficial",
    it: "Messa online ufficiale",
  },
  "Déploiement sur nom de domaine, remise des fichiers sources et formation.": {
    en: "Custom domain deployment, full source file handover, and team onboarding.",
    es: "Despliegue en su dominio, entrega de archivos fuente y formación.",
    de: "Deployment auf Ihrer Domain, Übergabe aller Quelldateien und Einweisung.",
    pt: "Publicação no seu domínio, entrega dos ficheiros fonte e formação.",
    it: "Pubblicazione sul tuo dominio, consegna dei file sorgente e formazione.",
  },
  "Prêt à collaborer avec PRYMAX STUDIO ?": {
    en: "Ready to collaborate with PRYMAX STUDIO?",
    es: "¿Listo para colaborar con PRYMAX STUDIO?",
    de: "Bereit für die Zusammenarbeit mit PRYMAX STUDIO?",
    pt: "Pronto para colaborar com a PRYMAX STUDIO?",
    it: "Pronto a collaborare con PRYMAX STUDIO?",
  },
  "Notre équipe est à votre écoute pour concevoir votre futur projet digital.": {
    en: "Our team is ready to listen and engineer your next digital project.",
    es: "Nuestro equipo está a su disposición para diseñar su próximo proyecto digital.",
    de: "Unser Team steht bereit, um Ihr nächstes digitales Projekt zu realisieren.",
    pt: "A nossa equipa está disponível para conceber o seu próximo projeto digital.",
    it: "Il nostro team è a tua disposizione per progettare il tuo prossimo progetto digitale.",
  },

  // ===========================================================================
  // 7. PRICING MODULES & SCOPE ESTIMATOR / CUSTOM QUOTE MODAL
  // ===========================================================================
  "Délais d'Exécution & Devis": {
    en: "Turnaround Times & Quote",
    es: "Plazos de Ejecución y Presupuesto",
    de: "Umsetzungsdauer & Angebot",
    pt: "Prazos de Execução e Orçamento",
    it: "Tempi di Esecuzione e Preventivo",
  },
  "Des délais d'exécution maîtrisés et garantis": {
    en: "Guaranteed, predictable turnaround times",
    es: "Plazos de ejecución controlados y garantizados",
    de: "Verlässliche und garantierte Umsetzungszeiten",
    pt: "Prazos de execução controlados e garantidos",
    it: "Tempi di realizzazione certi e garantiti",
  },
  "Chez PRYMAX STUDIO, chaque prestation est exécutée avec rigueur selon des délais précis. Sélectionnez librement un ou plusieurs services, ou configurez directement vos options ci-dessous.": {
    en: "At PRYMAX STUDIO, every project is executed with precision on a clear schedule. Select one or more services below, or customize your project specifications directly.",
    es: "En PRYMAX STUDIO, cada servicio se ejecuta con rigor según plazos definidos. Seleccione libremente uno o varios servicios, o configure sus opciones a continuación.",
    de: "Bei PRYMAX STUDIO wird jede Leistung präzise und termingerecht umgesetzt. Wählen Sie frei eine oder mehrere Leistungen oder konfigurieren Sie Ihr Projekt direkt unten.",
    pt: "Na PRYMAX STUDIO, cada serviço é executado com rigor dentro de prazos definidos. Selecione livremente um ou mais serviços ou configure diretamente as suas opções abaixo.",
    it: "In PRYMAX STUDIO ogni servizio viene eseguito con rigore secondo tempistiche precise. Seleziona liberamente uno o più servizi o configura direttamente le tue opzioni qui sotto.",
  },
  "Sélectionnez vos besoins (optionnel) :": {
    en: "Select your desired services (optional):",
    es: "Seleccione sus necesidades (opcional):",
    de: "Wählen Sie Ihre gewünschten Leistungen (optional):",
    pt: "Selecione as suas necessidades (opcional):",
    it: "Seleziona i servizi desiderati (opzionale):",
  },
  "Note importante sur les délais :": {
    en: "Important note regarding timelines:",
    es: "Nota importante sobre los plazos:",
    de: "Wichtiger Hinweis zu den Lieferzeiten:",
    pt: "Nota importante sobre os prazos:",
    it: "Nota importante sulle tempistiche:",
  },
  "Toutes ces durées sont basées sur le fait que le client fournisse l'ensemble des éléments nécessaires à la réalisation du travail (textes, photos, logos existants, validations).": {
    en: "All turnaround times assume timely provision of required project materials by the client (copy, photography, existing brand assets, and approvals).",
    es: "Todos los plazos se basan en que el cliente proporcione los elementos necesarios para el proyecto (textos, fotos, logotipos existentes y validaciones).",
    de: "Alle Zeitangaben setzen voraus, dass der Kunde die erforderlichen Projektunterlagen (Texte, Bilder, vorhandene Logos, Freigaben) rechtzeitig bereitstellt.",
    pt: "Todos estes prazos pressupõem o envio atempado dos elementos necessários pelo cliente (textos, fotografias, logótipos existentes e validações).",
    it: "Tutte le tempistiche presuppongono che il cliente fornisca tempestivamente i materiali necessari (testi, foto, loghi esistenti e approvazioni).",
  },
  "Devis Personnalisé": {
    en: "Custom Quote",
    es: "Presupuesto Personalizado",
    de: "Individuelles Angebot",
    pt: "Orçamento Personalizado",
    it: "Preventivo Personalizzato",
  },
  "Votre Demande Sur-Mesure": {
    en: "Your Tailored Proposal",
    es: "Su Solicitud a Medida",
    de: "Ihre Maßgeschneiderte Anfrage",
    pt: "O Seu Pedido Sob Medida",
    it: "La Tua Richiesta Su Misura",
  },
  "Obtenez une proposition détaillée ajustée à vos objectifs, votre secteur et vos délais.": {
    en: "Receive a detailed proposal tailored to your business goals, industry, and timeline.",
    es: "Obtenga una propuesta detallada ajustada a sus objetivos, sector y plazos.",
    de: "Erhalten Sie ein detailliertes Angebot, abgestimmt auf Ihre Ziele, Branche und Zeitplanung.",
    pt: "Obtenha uma proposta detalhada ajustada aos seus objetivos, setor e prazos.",
    it: "Ottieni una proposta dettagliata calibrata sui tuoi obiettivi, settore e tempistiche.",
  },
  "Délais garantis": {
    en: "Guaranteed timelines",
    es: "Plazos garantizados",
    de: "Garantierte Lieferzeit",
    pt: "Prazos garantidos",
    it: "Tempi garantiti",
  },
  "Aucune prestation sélectionnée pour l'instant. Vous pouvez cocher des prestations à gauche ou personnaliser directement votre besoin ci-dessous.": {
    en: "No services selected yet. Check any services on the left or customize your project requirements directly below.",
    es: "Aún no ha seleccionado ningún servicio. Puede marcar servicios a la izquierda o personalizar directamente su solicitud abajo.",
    de: "Noch keine Leistung ausgewählt. Wählen Sie links Leistungen aus oder konfigurieren Sie Ihr Projekt direkt weiter unten.",
    pt: "Nenhum serviço selecionado de momento. Pode marcar serviços à esquerda ou personalizar diretamente o seu pedido abaixo.",
    it: "Nessun servizio selezionato al momento. Puoi spuntare i servizi a sinistra o personalizzare direttamente la tua richiesta qui sotto.",
  },
  "Cession 100% des droits et fichiers sources HD": {
    en: "100% copyright ownership & HD source files",
    es: "Cesión del 100% de los derechos y archivos fuente HD",
    de: "100% Nutzungsrechte & HD-Quelldateien inklusive",
    pt: "Cedência de 100% dos direitos e ficheiros fonte HD",
    it: "Cessione del 100% dei diritti e file sorgente HD",
  },
  "Respect strict des délais annoncés": {
    en: "Strict adherence to agreed delivery schedules",
    es: "Cumplimiento estricto de los plazos acordados",
    de: "Strikte Einhaltung der vereinbarten Termine",
    pt: "Cumprimento rigoroso dos prazos anunciados",
    it: "Rispetto rigoroso delle tempistiche concordate",
  },

  // Pricing modules (agencyData.ts)
  "Création de Logo": {
    en: "Logo Design",
    es: "Creación de Logotipo",
    de: "Logo-Design",
    pt: "Criação de Logótipo",
    it: "Creazione Logo",
  },
  "Branding & Identité": {
    en: "Branding & Identity",
    es: "Branding e Identidad",
    de: "Branding & Identität",
    pt: "Branding e Identidade",
    it: "Branding e Identità",
  },
  "24 heures": {
    en: "24 hours",
    es: "24 horas",
    de: "24 Stunden",
    pt: "24 horas",
    it: "24 ore",
  },
  "Logo original pour démarrer votre activité avec une image soignée.": {
    en: "Bespoke original logo to launch or elevate your business with a polished image.",
    es: "Logotipo original para impulsar su actividad con una imagen profesional.",
    de: "Originales Logo für einen professionellen und starken Markenauftritt.",
    pt: "Logótipo original para iniciar ou elevar a sua atividade com uma imagem cuidada.",
    it: "Logo originale per avviare o valorizzare la tua attività con un'immagine curata.",
  },
  "Site Web One-Page (Single Page)": {
    en: "One-Page Website (Single Page)",
    es: "Sitio Web One-Page (Página Única)",
    de: "One-Page Website (Einzelseite)",
    pt: "Site Web One-Page (Página Única)",
    it: "Sito Web One-Page (Pagina Singola)",
  },
  "Développement Web": {
    en: "Web Development",
    es: "Desarrollo Web",
    de: "Webentwicklung",
    pt: "Desenvolvimento Web",
    it: "Sviluppo Web",
  },
  "1 à 3 jours": {
    en: "1 to 3 days",
    es: "1 a 3 días",
    de: "1 bis 3 Tage",
    pt: "1 a 3 dias",
    it: "1–3 giorni",
  },
  "Une page unique élégante et ultra-rapide qui présente l'essentiel de votre offre.": {
    en: "An elegant, ultra-fast single-page website presenting the core of your business offer.",
    es: "Una página única elegante y ultrarrápida que presenta lo esencial de su oferta.",
    de: "Eine elegante, ultraschnelle Einzelseite, die Ihr Angebot perfekt auf den Punkt bringt.",
    pt: "Uma página única elegante e ultrarrápida que apresenta o essencial da sua oferta.",
    it: "Una pagina singola elegante e ultraveloce che presenta l'essenziale della tua offerta.",
  },
  "Site Web Professionnel (Vitrine)": {
    en: "Corporate Showcase Website",
    es: "Sitio Web Profesional (Corporativo)",
    de: "Professionelle Unternehmens-Website",
    pt: "Site Web Profissional (Institucional)",
    it: "Sito Web Professionale (Vetrina)",
  },
  "1 à 4 jours": {
    en: "1 to 4 days",
    es: "1 a 4 días",
    de: "1 bis 4 Tage",
    pt: "1 a 4 dias",
    it: "1–4 giorni",
  },
  "Site complet multi-pages pour valoriser votre entreprise et rassurer vos clients.": {
    en: "Complete multi-page corporate website to elevate your company and build client trust.",
    es: "Sitio completo multipágina para valorizar su empresa y generar confianza.",
    de: "Umfassende mehrseitige Website, die Ihr Unternehmen repräsentiert und Vertrauen schafft.",
    pt: "Site completo multipágina para valorizar a sua empresa e transmitir confiança.",
    it: "Sito completo multipagina per valorizzare la tua azienda e rassicurare i clienti.",
  },
  "Site E-Commerce (Boutique en Ligne)": {
    en: "E-Commerce Website (Online Store)",
    es: "Sitio E-Commerce (Tienda Online)",
    de: "E-Commerce-Website (Online-Shop)",
    pt: "Site E-Commerce (Loja Online)",
    it: "Sito E-Commerce (Store Online)",
  },
  "Vente en Ligne": {
    en: "Online Commerce",
    es: "Venta Online",
    de: "Online-Handel",
    pt: "Venda Online",
    it: "Vendita Online",
  },
  "1 à 7 jours": {
    en: "1 to 7 days",
    es: "1 a 7 días",
    de: "1 bis 7 Tage",
    pt: "1 a 7 dias",
    it: "1–7 giorni",
  },
  "Boutique en ligne complète avec panier d'achat et passerelles de paiement.": {
    en: "Full-featured online store with shopping cart and integrated payment gateways.",
    es: "Tienda online completa con carrito de compras y pasarelas de pago integradas.",
    de: "Kompletter Online-Shop mit Warenkorb und integrierten Zahlungssystemen.",
    pt: "Loja online completa com carrinho de compras e métodos de pagamento integrados.",
    it: "Store online completo con carrello e gateway di pagamento integrati.",
  },
  "Site Web Sur-Mesure (Personnalisé)": {
    en: "Bespoke Web Platform (Custom)",
    es: "Sitio Web a Medida (Personalizado)",
    de: "Maßgeschneiderte Web-Plattform",
    pt: "Site Web Sob Medida (Personalizado)",
    it: "Piattaforma Web Su Misura (Custom)",
  },
  "Délai à déterminer selon cahier des charges": {
    en: "Timeline defined per technical specifications",
    es: "Plazo según especificaciones técnicas",
    de: "Dauer je nach Pflichtenheft",
    pt: "Prazo a definir conforme caderno de encargos",
    it: "Tempistiche definite in base alle specifiche",
  },
  "Plateforme web avancée avec fonctionnalités personnalisées selon vos besoins précis.": {
    en: "Advanced web platform with custom architecture and features tailored to your exact specifications.",
    es: "Plataforma web avanzada con funcionalidades personalizadas según sus necesidades exactas.",
    de: "Anspruchsvolle Webplattform mit individuellen Funktionen exakt nach Ihren Vorgaben.",
    pt: "Plataforma web avançada com funcionalidades personalizadas segundo as suas necessidades.",
    it: "Piattaforma web avanzata con funzionalità personalizzate secondo le tue esigenze.",
  },
  "Design Visuel Textile (T-Shirts, Pulls sur Mockups)": {
    en: "Apparel Graphic Design (T-Shirts & Hoodies on 3D Mockups)",
    es: "Diseño Visual Textil (Camisetas y Sudaderas en Mockups)",
    de: "Textil-Grafikdesign (T-Shirts & Hoodies auf 3D-Mockups)",
    pt: "Design Visual Têxtil (T-Shirts e Hoodies em Mockups)",
    it: "Graphic Design Tessile (T-Shirt e Felpe su Mockup 3D)",
  },
  "Design Textile & Mockups": {
    en: "Apparel Design & Mockups",
    es: "Diseño Textil y Mockups",
    de: "Textildesign & Mockups",
    pt: "Design Têxtil e Mockups",
    it: "Design Tessile e Mockup",
  },
  "48 heures": {
    en: "48 hours",
    es: "48 horas",
    de: "48 Stunden",
    pt: "48 horas",
    it: "48 ore",
  },
  "Design visuel et présentation sur mockups. Le client peut imprimer où il le souhaite, ou nous pouvons confier l'impression à un tiers aux frais du client.": {
    en: "Visual artwork and 3D mockup presentation. Print with your own workshop, or let us coordinate printing with a third-party partner at your expense.",
    es: "Diseño visual y presentación en mockups. El cliente puede imprimir donde desee, o podemos gestionar la impresión con un tercero a cargo del cliente.",
    de: "Grafikdesign und Präsentation auf Mockups. Sie können frei wählen, wo Sie drucken lassen, oder wir vermitteln eine Partnerdruckerei auf Ihre Kosten.",
    pt: "Design visual e apresentação em mockups. O cliente pode imprimir onde desejar, ou podemos encaminhar a impressão para um parceiro a cargo do cliente.",
    it: "Graphic design e presentazione su mockup. Il cliente può stampare dove preferisce, oppure possiamo affidare la stampa a un partner esterno a carico del cliente.",
  },
  "Important : Nous réalisons uniquement le design visuel et la présentation sur mockups. L'impression physique peut être réalisée par vos soins ou confiée à un tiers à vos frais.": {
    en: "Note: We provide the graphic design and 3D mockup presentation. Physical printing can be handled by your own supplier or arranged through a third party at your expense.",
    es: "Importante: Realizamos únicamente el diseño visual y la presentación en mockups. La impresión física corre por su cuenta o mediante un proveedor externo.",
    de: "Hinweis: Wir erstellen das Grafikdesign und die Mockup-Präsentation. Der physische Textildruck erfolgt durch Sie oder über einen Drittanbieter auf Ihre Kosten.",
    pt: "Importante: Realizamos apenas o design visual e a apresentação em mockups. A impressão física pode ser feita por si ou confiada a terceiros a seu cargo.",
    it: "Importante: Realizziamo esclusivamente il design visivo e i mockup. La stampa fisica può essere gestita da te o affidata a terzi a tue spese.",
  },
  "Visibilité & Référencement Google (SEO)": {
    en: "Google Visibility & Local SEO",
    es: "Visibilidad y Posicionamiento Google (SEO)",
    de: "Google-Sichtbarkeit & Lokales SEO",
    pt: "Visibilidade e Posicionamento Google (SEO)",
    it: "Visibilità e Posizionamento Google (SEO)",
  },
  "Marketing & Visibilité": {
    en: "Marketing & Visibility",
    es: "Marketing y Visibilidad",
    de: "Marketing & Sichtbarkeit",
    pt: "Marketing e Visibilidade",
    it: "Marketing e Visibilità",
  },
  "Variable (dépendant des algorithmes Google et de l'activité)": {
    en: "Variable (depends on Google indexing & market competition)",
    es: "Variable (según algoritmos de Google y sector)",
    de: "Variabel (abhängig von Google-Indexierung & Branche)",
    pt: "Variável (consoante os algoritmos da Google e o setor)",
    it: "Variabile (in base agli algoritmi Google e al settore)",
  },
  "Positionnement de votre fiche d'entreprise et optimisation des mots-clés pour capter des clients.": {
    en: "Google Business Profile ranking and local keyword optimization to capture high-intent leads.",
    es: "Posicionamiento de su ficha de empresa y optimización de palabras clave para captar clientes.",
    de: "Optimierung Ihres Unternehmensprofils und relevanter Suchbegriffe zur gezielten Kundengewinnung.",
    pt: "Posicionamento da sua ficha de empresa e otimização de palavras-chave para captar clientes.",
    it: "Posizionamento della scheda aziendale e ottimizzazione delle parole chiave per acquisire clienti.",
  },

  // ===========================================================================
  // 8. VISUAL CONFIGURATOR & CARDS (ScopeEstimator.tsx & CustomQuoteModal.tsx)
  // ===========================================================================
  "Configurateur Visuel Sur-Mesure": {
    en: "Interactive Project Configurator",
    es: "Configurador Visual a Medida",
    de: "Interaktiver Projekt-Konfigurator",
    pt: "Configurador Visual Sob Medida",
    it: "Configuratore Visivo Su Misura",
  },
  "Configurateur Sur-Mesure": {
    en: "Custom Configurator",
    es: "Configurador a Medida",
    de: "Projekt-Konfigurator",
    pt: "Configurador Sob Medida",
    it: "Configuratore Su Misura",
  },
  "Personnalisez les options de votre projet": {
    en: "Customize your project specifications",
    es: "Personalice las opciones de su proyecto",
    de: "Passen Sie die Optionen Ihres Projekts an",
    pt: "Personalize as opções do seu projeto",
    it: "Personalizza le opzioni del tuo progetto",
  },
  "Configurez votre devis en quelques clics": {
    en: "Configure your custom quote in a few clicks",
    es: "Configure su presupuesto en pocos clics",
    de: "Konfigurieren Sie Ihr Angebot mit wenigen Klicks",
    pt: "Configure o seu orçamento em poucos cliques",
    it: "Configura il tuo preventivo in pochi clic",
  },
  "Sélectionnez simplement les cartes qui correspondent à vos attentes. Aucun long texte à rédiger : cliquez sur vos préférences et recevez votre étude personnalisée par email.": {
    en: "Simply select the cards that match your vision. No lengthy forms to write: click your preferences and receive a tailored study by email.",
    es: "Seleccione simplemente las tarjetas que correspondan a sus expectativas. Sin textos largos: elija sus preferencias y reciba su estudio por correo.",
    de: "Wählen Sie einfach die Karten aus, die Ihren Vorstellungen entsprechen. Kein langer Text nötig: Klicken Sie Ihre Präferenzen an und erhalten Sie Ihr Angebot per E-Mail.",
    pt: "Selecione simplesmente os cartões que correspondem às suas expectativas. Sem textos longos: clique nas suas preferências e receba o seu estudo por e-mail.",
    it: "Seleziona semplicemente le schede che rispecchiano le tue esigenze. Nessun testo lungo da scrivere: clicca sulle tue preferenze e ricevi lo studio via email.",
  },
  "Sélectionnez simplement les cartes correspondant à votre vision. Vous êtes libre de choisir uniquement ce qui vous concerne.": {
    en: "Simply select the cards matching your vision. Feel free to choose only what applies to your project.",
    es: "Seleccione las tarjetas que correspondan a su visión. Es libre de elegir solo lo que aplique a su proyecto.",
    de: "Wählen Sie einfach die passenden Karten aus. Sie entscheiden frei, welche Punkte für Ihr Projekt relevant sind.",
    pt: "Selecione simplesmente os cartões que correspondem à sua visão. É livre de escolher apenas o que lhe diz respeito.",
    it: "Seleziona semplicemente le schede corrispondenti alla tua visione. Sei libero di scegliere solo ciò che ti riguarda.",
  },
  "1. Votre Secteur d'Activité": {
    en: "1. Your Industry Sector",
    es: "1. Su Sector de Actividad",
    de: "1. Ihre Branche",
    pt: "1. O Seu Setor de Atividade",
    it: "1. Il Tuo Settore di Attività",
  },
  "Cliquez pour choisir": {
    en: "Click to select",
    es: "Haga clic para elegir",
    de: "Zum Auswählen klicken",
    pt: "Clique para escolher",
    it: "Clicca per scegliere",
  },
  "2. Objectifs Principaux": {
    en: "2. Primary Objectives",
    es: "2. Objetivos Principales",
    de: "2. Hauptziele",
    pt: "2. Objetivos Principais",
    it: "2. Obiettivi Principali",
  },
  "2. Objectifs Principaux (Choix multiples)": {
    en: "2. Primary Objectives (Multiple choice)",
    es: "2. Objetivos Principales (Selección múltiple)",
    de: "2. Hauptziele (Mehrfachauswahl)",
    pt: "2. Objetivos Principais (Escolha múltipla)",
    it: "2. Obiettivi Principali (Scelta multipla)",
  },
  "Choix multiples": {
    en: "Multiple choice",
    es: "Selección múltiple",
    de: "Mehrfachauswahl",
    pt: "Escolha múltipla",
    it: "Scelta multipla",
  },
  "3. Style Visuel Souhaité": {
    en: "3. Desired Visual Style",
    es: "3. Estilo Visual Deseado",
    de: "3. Gewünschter Visueller Stil",
    pt: "3. Estilo Visual Pretendido",
    it: "3. Stile Visivo Desiderato",
  },
  "3. Style Visuel & Direction Artistique": {
    en: "3. Visual Style & Art Direction",
    es: "3. Estilo Visual y Dirección Artística",
    de: "3. Visueller Stil & Art Direction",
    pt: "3. Estilo Visual e Direção Artística",
    it: "3. Stile Visivo e Direzione Artistica",
  },
  "4. Fonctionnalités & Options Clés": {
    en: "4. Key Features & Options",
    es: "4. Funcionalidades y Opciones Clave",
    de: "4. Wichtige Funktionen & Optionen",
    pt: "4. Funcionalidades e Opções Principais",
    it: "4. Funzionalità e Opzioni Chiave",
  },
  "4. Fonctionnalités & Modules Souhaités": {
    en: "4. Desired Features & Modules",
    es: "4. Funcionalidades y Módulos Deseados",
    de: "4. Gewünschte Funktionen & Module",
    pt: "4. Funcionalidades e Módulos Pretendidos",
    it: "4. Funzionalità e Moduli Desiderati",
  },
  "5. État de vos contenus": {
    en: "5. Content Readiness",
    es: "5. Estado de sus contenidos",
    de: "5. Status Ihrer Inhalte",
    pt: "5. Estado dos seus conteúdos",
    it: "5. Stato dei tuoi contenuti",
  },
  "5. Vos Contenus": {
    en: "5. Your Content",
    es: "5. Sus Contenidos",
    de: "5. Ihre Inhalte",
    pt: "5. Os Seus Conteúdos",
    it: "5. I Tuoi Contenuti",
  },
  "6. Délai souhaité": {
    en: "6. Desired Timeline",
    es: "6. Plazo deseado",
    de: "6. Gewünschter Zeitrahmen",
    pt: "6. Prazo pretendido",
    it: "6. Tempistica desiderata",
  },
  "6. Délai Souhaité": {
    en: "6. Desired Timeline",
    es: "6. Plazo Deseado",
    de: "6. Gewünschter Zeitrahmen",
    pt: "6. Prazo Pretendido",
    it: "6. Tempistica Desiderata",
  },
  "7. Fourchette Budgétaire": {
    en: "7. Budget Range",
    es: "7. Rango Presupuestario",
    de: "7. Budgetrahmen",
    pt: "7. Faixa Orçamental",
    it: "7. Fascia di Budget",
  },
  "7. Budget Envisagé": {
    en: "7. Estimated Budget",
    es: "7. Presupuesto Estimado",
    de: "7. Geplantes Budget",
    pt: "7. Orçamento Previsto",
    it: "7. Budget Previsto",
  },
  "8. Vos Coordonnées de Réception": {
    en: "8. Your Contact Details",
    es: "8. Sus Datos de Contacto",
    de: "8. Ihre Kontaktdaten",
    pt: "8. Os Seus Dados de Contacto",
    it: "8. I Tuoi Dati di Contatto",
  },
  "8. Vos coordonnées pour recevoir votre devis": {
    en: "8. Your contact details to receive your quote",
    es: "8. Sus datos para recibir su presupuesto",
    de: "8. Ihre Kontaktdaten für das Angebot",
    pt: "8. Os seus dados para receber o orçamento",
    it: "8. I tuoi recapiti per ricevere il preventivo",
  },
  "Réception instantanée et étude personnalisée sous 24h ouvrées.": {
    en: "Instant confirmation and personalized proposal within 24 business hours.",
    es: "Confirmación instantánea y estudio personalizado en 24h laborables.",
    de: "Sofortige Bestätigung und individuelles Angebot innerhalb von 24 Werkstunden.",
    pt: "Receção imediata e estudo personalizado em 24 horas úteis.",
    it: "Conferma immediata e studio personalizzato entro 24 ore lavorative.",
  },
  "Faire une nouvelle simulation": {
    en: "Start a new estimate",
    es: "Realizar una nueva simulación",
    de: "Neue Konfiguration starten",
    pt: "Fazer uma nova simulação",
    it: "Avvia una nuova simulazione",
  },

  // Sector Cards
  "Entreprise & Services B2B": {
    en: "Corporate & B2B Services",
    es: "Empresa y Servicios B2B",
    de: "Unternehmen & B2B-Dienste",
    pt: "Empresa e Serviços B2B",
    it: "Azienda e Servizi B2B",
  },
  "Cabinet, ingénierie, conseil": {
    en: "Consulting, engineering, corporate firm",
    es: "Consultoría, ingeniería, despacho",
    de: "Kanzlei, Ingenieurwesen, Beratung",
    pt: "Consultoria, engenharia, gabinete",
    it: "Studio professionale, ingegneria, consulenza",
  },
  "Commerce & Boutique": {
    en: "Retail & Online Store",
    es: "Comercio y Tienda",
    de: "Handel & Shop",
    pt: "Comércio e Loja",
    it: "Commercio e Boutique",
  },
  "Vente de produits, distribution": {
    en: "Product sales, retail & distribution",
    es: "Venta de productos, distribución",
    de: "Produktverkauf & Vertrieb",
    pt: "Venda de produtos, distribuição",
    it: "Vendita prodotti, distribuzione",
  },
  "Immobilier & BTP": {
    en: "Real Estate & Construction",
    es: "Inmobiliaria y Construcción",
    de: "Immobilien & Bauwesen",
    pt: "Imobiliário e Construção",
    it: "Immobiliare e Costruzioni",
  },
  "Promotion, architecture, logistique": {
    en: "Property development, architecture, logistics",
    es: "Promoción, arquitectura, logística",
    de: "Projektentwicklung, Architektur, Logistik",
    pt: "Promoção, arquitetura, logística",
    it: "Sviluppo immobiliare, architettura, logistica",
  },
  "Mode & Marque Textile": {
    en: "Fashion & Apparel Brand",
    es: "Moda y Marca Textil",
    de: "Mode & Textilmarke",
    pt: "Moda e Marca Têxtil",
    it: "Moda e Brand Tessile",
  },
  "Prêt-à-porter, streetwear, accessoires": {
    en: "Ready-to-wear, streetwear, accessories",
    es: "Prêt-à-porter, streetwear, accesorios",
    de: "Streetwear, Kollektionen, Accessoires",
    pt: "Pronto-a-vestir, streetwear, acessórios",
    it: "Prêt-à-porter, streetwear, accessori",
  },
  "Tourisme, Hôtel & Restaurant": {
    en: "Hospitality, Hotel & Dining",
    es: "Turismo, Hotel y Restaurante",
    de: "Tourismus, Hotel & Gastronomie",
    pt: "Turismo, Hotel e Restauração",
    it: "Turismo, Hotel e Ristorazione",
  },
  "Réservation, loisirs, événementiel": {
    en: "Booking, leisure, events",
    es: "Reservas, ocio, eventos",
    de: "Buchung, Freizeit, Events",
    pt: "Reservas, lazer, eventos",
    it: "Prenotazioni, tempo libero, eventi",
  },
  "Autre Projet Sur-Mesure": {
    en: "Other Custom Project",
    es: "Otro Proyecto a Medida",
    de: "Anderes Individuelles Projekt",
    pt: "Outro Projeto Sob Medida",
    it: "Altro Progetto Su Misura",
  },
  "Startup, institution, projet spécial": {
    en: "Startup, institution, special initiative",
    es: "Startup, institución, proyecto especial",
    de: "Startup, Institution, Sonderprojekt",
    pt: "Startup, instituição, projeto especial",
    it: "Startup, istituzione, progetto speciale",
  },

  // Goal Cards
  "Obtenir plus de clients": {
    en: "Acquire more clients",
    es: "Conseguir más clientes",
    de: "Mehr Kunden gewinnen",
    pt: "Conquistar mais clientes",
    it: "Acquisire più clienti",
  },
  "Génération de demandes qualifiées": {
    en: "Qualified lead generation",
    es: "Generación de contactos cualificados",
    de: "Qualifizierte Anfragen generieren",
    pt: "Geração de contactos qualificados",
    it: "Generazione di contatti qualificati",
  },
  "Image haut de gamme": {
    en: "Premium brand image",
    es: "Imagen de alta gama",
    de: "Erstklassiges Markenimage",
    pt: "Imagem de alto padrão",
    it: "Immagine di fascia alta",
  },
  "Inspirer confiance immédiatement": {
    en: "Inspire immediate trust",
    es: "Inspirar confianza de inmediato",
    de: "Sofortiges Vertrauen schaffen",
    pt: "Inspirar confiança imediata",
    it: "Ispirare fiducia immediata",
  },
  "Vendre en ligne 24h/24": {
    en: "Sell online 24/7",
    es: "Vender online 24/7",
    de: "24/7 online verkaufen",
    pt: "Vender online 24h/24",
    it: "Vendere online 24/7",
  },
  "Catalogue & encaissement fluide": {
    en: "Product catalog & seamless checkout",
    es: "Catálogo y cobro fluido",
    de: "Produktkatalog & einfacher Checkout",
    pt: "Catálogo e pagamento fluido",
    it: "Catalogo e pagamenti fluidi",
  },
  "Dominer sur Google": {
    en: "Rank higher on Google",
    es: "Destacar en Google",
    de: "Top-Rankings bei Google",
    pt: "Destacar-se no Google",
    it: "Primeggiare su Google",
  },
  "Référencement SEO & visibilité": {
    en: "SEO rankings & local visibility",
    es: "Posicionamiento SEO y visibilidad",
    de: "SEO-Optimierung & Sichtbarkeit",
    pt: "Posicionamento SEO e visibilidade",
    it: "Posizionamento SEO e visibilità",
  },
  "Refonte complète": {
    en: "Complete redesign",
    es: "Renovación completa",
    de: "Kompletter Relaunch",
    pt: "Remodelação completa",
    it: "Restyling completo",
  },
  "Moderniser une identité ou un site": {
    en: "Modernize an existing brand or website",
    es: "Modernizar una identidad o sitio web",
    de: "Marke oder Website modernisieren",
    pt: "Modernizar uma identidade ou site",
    it: "Modernizzare un brand o un sito web",
  },
  "Lancement de marque": {
    en: "New brand launch",
    es: "Lanzamiento de marca",
    de: "Marken-Launch",
    pt: "Lançamento de marca",
    it: "Lancio nuovo brand",
  },
  "Partir sur des bases solides": {
    en: "Start on a rock-solid foundation",
    es: "Empezar sobre bases sólidas",
    de: "Auf einem starken Fundament starten",
    pt: "Começar com bases sólidas",
    it: "Partire su basi solide",
  },

  // Style Cards
  "Luxe & Sombre": {
    en: "Luxury & Dark",
    es: "Lujo y Oscuro",
    de: "Luxuriös & Dunkel",
    pt: "Luxo e Escuro",
    it: "Lusso e Dark",
  },
  "Noir profond, touches dorées & épurées": {
    en: "Deep obsidian, refined gold accents",
    es: "Negro profundo, toques dorados y elegantes",
    de: "Tiefschwarz, edle Goldakzente & klares Design",
    pt: "Preto profundo, toques dourados e elegantes",
    it: "Nero profondo, accenti dorati ed essenziali",
  },
  "Minimaliste & Lumineux": {
    en: "Minimalist & Light",
    es: "Minimalista y Luminoso",
    de: "Minimalistisch & Hell",
    pt: "Minimalista e Luminoso",
    it: "Minimalista e Luminoso",
  },
  "Clair, aéré et ultra-moderne": {
    en: "Bright, airy, and ultra-modern",
    es: "Claro, espacioso y ultramoderno",
    de: "Hell, luftig und hochmodern",
    pt: "Claro, amplo e ultramoderno",
    it: "Chiaro, arioso e ultramoderno",
  },
  "Corporate & Structuré": {
    en: "Corporate & Structured",
    es: "Corporativo y Estructurado",
    de: "Corporate & Strukturiert",
    pt: "Corporativo e Estruturado",
    it: "Corporate e Strutturato",
  },
  "Institutionnel, sobre et rassurant": {
    en: "Executive, authoritative, and trustworthy",
    es: "Institucional, sobrio y confiable",
    de: "Seriös, klar gegliedert und vertrauenswürdig",
    pt: "Institucional, sóbrio e confiável",
    it: "Istituzionale, sobrio e affidabile",
  },
  "Créatif & Audacieux": {
    en: "Creative & Bold",
    es: "Creativo y Audaz",
    de: "Kreativ & Ausdrucksstark",
    pt: "Criativo e Audaz",
    it: "Creativo e Audace",
  },
  "Animations marquantes & fort impact": {
    en: "Signature motion & high visual impact",
    es: "Animaciones memorables y gran impacto",
    de: "Markante Animationen & starke Wirkung",
    pt: "Animações marcantes e forte impacto",
    it: "Animazioni d'impatto e forte personalità",
  },

  // Feature Cards
  "Design Mobile-First Ultra-Rapide": {
    en: "Ultra-Fast Mobile-First Design",
    es: "Diseño Mobile-First Ultrarrápido",
    de: "Ultraschnelles Mobile-First-Design",
    pt: "Design Mobile-First Ultrarrápido",
    it: "Design Mobile-First Ultraveloce",
  },
  "Formulaire & Devis par Email": {
    en: "Interactive Quote & Email Forms",
    es: "Formulario y Presupuesto por Email",
    de: "Kontakt- & Angebotsformular per E-Mail",
    pt: "Formulário e Orçamento por E-mail",
    it: "Modulo Contatti e Preventivo via Email",
  },
  "Paiement Mobile Money / Carte": {
    en: "Mobile Money / Card Checkout",
    es: "Pago Mobile Money / Tarjeta",
    de: "Mobile Money / Kartenzahlung",
    pt: "Pagamento Mobile Money / Cartão",
    it: "Pagamento Mobile Money / Carta",
  },
  "Galerie Projets / Catalogue HD": {
    en: "HD Project Gallery / Catalog",
    es: "Galería de Proyectos / Catálogo HD",
    de: "HD-Projektgalerie / Produktkatalog",
    pt: "Galeria de Projetos / Catálogo HD",
    it: "Galleria Progetti / Catalogo HD",
  },
  "Version Bilingue (FR / EN)": {
    en: "Multilingual Website Support",
    es: "Versión Multilingüe (FR / EN)",
    de: "Mehrsprachige Website (FR / EN)",
    pt: "Versão Multilingue (FR / EN)",
    it: "Versione Multilingua (FR / EN)",
  },
  "Optimisation Google (SEO)": {
    en: "Google Search Optimization (SEO)",
    es: "Optimización en Google (SEO)",
    de: "Google-Suchmaschinenoptimierung (SEO)",
    pt: "Otimização para Google (SEO)",
    it: "Ottimizzazione per Google (SEO)",
  },
  "Espace / Portail Client": {
    en: "Dedicated Client Portal",
    es: "Área / Portal de Clientes",
    de: "Kundenbereich / Kundenportal",
    pt: "Área / Portal do Cliente",
    it: "Area / Portale Clienti",
  },
  "Identité Visuelle & Logo Vectoriel": {
    en: "Visual Identity & Vector Logo",
    es: "Identidad Visual y Logo Vectorial",
    de: "Markenidentität & Vektor-Logo",
    pt: "Identidade Visual e Logótipo Vetorial",
    it: "Identità Visiva e Logo Vettoriale",
  },

  // Content Cards
  "Éléments déjà prêts": {
    en: "Assets ready to go",
    es: "Materiales ya listos",
    de: "Inhalte bereits vorhanden",
    pt: "Elementos já prontos",
    it: "Materiali già pronti",
  },
  "Textes, photos et logo disponibles": {
    en: "Copy, photos, and logo are available",
    es: "Textos, fotos y logotipo disponibles",
    de: "Texte, Fotos und Logo liegen vor",
    pt: "Textos, fotos e logótipo disponíveis",
    it: "Testi, foto e logo disponibili",
  },
  "En cours de préparation": {
    en: "Currently in preparation",
    es: "En preparación",
    de: "In Vorbereitung",
    pt: "Em preparação",
    it: "In fase di preparazione",
  },
  "Une partie des contenus est prête": {
    en: "Some content assets are ready",
    es: "Parte de los contenidos está lista",
    de: "Ein Teil der Inhalte ist bereits fertig",
    pt: "Parte dos conteúdos já está pronta",
    it: "Una parte dei contenuti è pronta",
  },
  "Accompagnement complet": {
    en: "Full content creation",
    es: "Acompañamiento completo",
    de: "Komplette Inhaltserstellung",
    pt: "Acompanhamento completo",
    it: "Supporto completo sui contenuti",
  },
  "PRYMAX conçoit textes et visuels": {
    en: "PRYMAX crafts copywriting and visuals",
    es: "PRYMAX redacta textos y crea visuales",
    de: "PRYMAX erstellt Texte und Bildwelt",
    pt: "A PRYMAX cria textos e visuais",
    it: "PRYMAX realizza testi e visual",
  },

  // Deadline Cards
  "Express (24h – 72h)": {
    en: "Express (24h – 72h)",
    es: "Exprés (24h – 72h)",
    de: "Express (24h – 72h)",
    pt: "Expresso (24h – 72h)",
    it: "Express (24h – 72h)",
  },
  "Priorité absolue": {
    en: "Top priority",
    es: "Prioridad absoluta",
    de: "Höchste Priorität",
    pt: "Prioridade máxima",
    it: "Priorità assoluta",
  },
  "1 à 2 semaines": {
    en: "1 to 2 weeks",
    es: "1 a 2 semanas",
    de: "1 bis 2 Wochen",
    pt: "1 a 2 semanas",
    it: "1–2 settimane",
  },
  "Idéal pour lancement rapide": {
    en: "Ideal for a swift launch",
    es: "Ideal para un lanzamiento rápido",
    de: "Ideal für einen schnellen Start",
    pt: "Ideal para lançamento rápido",
    it: "Ideale per un lancio rapido",
  },
  "Dans le mois": {
    en: "Within a month",
    es: "Dentro del mes",
    de: "Innerhalb eines Monats",
    pt: "Dentro de um mês",
    it: "Entro il mese",
  },
  "Planning structuré": {
    en: "Structured milestone schedule",
    es: "Planificación estructurada",
    de: "Strukturierter Projektplan",
    pt: "Planeamento estruturado",
    it: "Pianificazione strutturata",
  },
  "Flexible": {
    en: "Flexible",
    es: "Flexible",
    de: "Flexibel",
    pt: "Flexível",
    it: "Flessibile",
  },
  "Selon vos recommandations": {
    en: "Based on studio recommendations",
    es: "Según nuestras recomendaciones",
    de: "Nach Empfehlung des Studios",
    pt: "Segundo as nossas recomendações",
    it: "Secondo le nostre raccomandazioni",
  },

  // Budget Cards
  "Moins de 100 000 FCFA": {
    en: "Under 100,000 FCFA",
    es: "Menos de 100 000 FCFA",
    de: "Unter 100.000 FCFA",
    pt: "Menos de 100 000 FCFA",
    it: "Meno di 100.000 FCFA",
  },
  "Logo, visuels ou One-Page simple": {
    en: "Logo, visuals, or starter One-Page",
    es: "Logo, visuales o One-Page básico",
    de: "Logo, Visuals oder einfacher One-Pager",
    pt: "Logótipo, visuais ou One-Page simples",
    it: "Logo, visual o One-Page essenziale",
  },
  "100 000 – 250 000 FCFA": {
    en: "100,000 – 250,000 FCFA",
    es: "100 000 – 250 000 FCFA",
    de: "100.000 – 250.000 FCFA",
    pt: "100 000 – 250 000 FCFA",
    it: "100.000 – 250.000 FCFA",
  },
  "Site vitrine pro ou pack identité": {
    en: "Corporate website or brand identity pack",
    es: "Sitio corporativo pro o pack identidad",
    de: "Profi-Website oder Marken-Paket",
    pt: "Site institucional pro ou pack identidade",
    it: "Sito vetrina pro o pacchetto identità",
  },
  "250 000 – 500 000 FCFA": {
    en: "250,000 – 500,000 FCFA",
    es: "250 000 – 500 000 FCFA",
    de: "250.000 – 500.000 FCFA",
    pt: "250 000 – 500 000 FCFA",
    it: "250.000 – 500.000 FCFA",
  },
  "Site complet avancé ou E-Commerce": {
    en: "Advanced multi-page site or E-Commerce",
    es: "Sitio completo avanzado o E-Commerce",
    de: "Umfangreiche Website oder E-Commerce",
    pt: "Site completo avançado ou E-Commerce",
    it: "Sito completo avanzato o E-Commerce",
  },
  "500 000+ FCFA": {
    en: "500,000+ FCFA",
    es: "500 000+ FCFA",
    de: "500.000+ FCFA",
    pt: "500 000+ FCFA",
    it: "500.000+ FCFA",
  },
  "Projet d'envergure sur-mesure": {
    en: "Large-scale bespoke platform",
    es: "Proyecto de gran envergadura a medida",
    de: "Großprojekt & Maßanfertigung",
    pt: "Projeto de grande dimensão sob medida",
    it: "Progetto su misura di ampia scala",
  },

  // PricingPage specific
  "Transparence Totale · Tarifs FCFA & Délais Maîtrisés": {
    en: "Full Transparency · Clear FCFA Pricing & Timelines",
    es: "Transparencia Total · Tarifas FCFA y Plazos Controlados",
    de: "Volle Transparenz · Klare FCFA-Preise & Termine",
    pt: "Transparência Total · Tarifas FCFA e Prazos Controlados",
    it: "Totale Trasparenza · Tariffe FCFA e Tempi Certi",
  },
  "Estimez votre projet en toute clarté": {
    en: "Estimate your project with complete clarity",
    es: "Estime su proyecto con total claridad",
    de: "Kalkulieren Sie Ihr Projekt mit voller Transparenz",
    pt: "Estime o seu projeto com total clareza",
    it: "Stima il tuo progetto in totale chiarezza",
  },
  "Sélectionnez vos besoins pour visualiser les délais d'exécution et obtenir instantanément une estimation chiffrée en FCFA sans surprise.": {
    en: "Select your requirements to view turnaround times and receive a transparent, surprise-free estimate in FCFA.",
    es: "Seleccione sus necesidades para ver los plazos de ejecución y obtener al instante una estimación clara en FCFA.",
    de: "Wählen Sie Ihre gewünschten Leistungen, um die Umsetzungsdauer und eine transparente Kostenschätzung in FCFA zu erhalten.",
    pt: "Selecione as suas necessidades para visualizar os prazos de execução e obter uma estimativa transparente em FCFA.",
    it: "Seleziona le tue esigenze per visualizzare i tempi di consegna e ottenere una stima trasparente in FCFA.",
  },
  "Délais Rigoureux": {
    en: "Strict Turnaround Times",
    es: "Plazos Rigurosos",
    de: "Verbindliche Lieferzeiten",
    pt: "Prazos Rigorosos",
    it: "Tempi Rigorosi",
  },
  "De 24h pour un logo à 1-4 jours pour un site web vitrine professionnel. Planning fixé dès le départ.": {
    en: "From 24h for a logo to 1–4 days for a corporate website. Milestones locked in from day one.",
    es: "Desde 24h para un logotipo hasta 1-4 días para un sitio corporativo. Calendario fijado desde el inicio.",
    de: "Von 24 Std. für ein Logo bis 1–4 Tage für eine Unternehmens-Website. Fester Zeitplan von Beginn an.",
    pt: "De 24h para um logótipo a 1-4 dias para um site institucional. Planeamento definido desde o início.",
    it: "Da 24 ore per un logo a 1–4 giorni per un sito vetrina professionale. Pianificazione definita fin dall'inizio.",
  },
  "Garantie & Assistance": {
    en: "Warranty & Support",
    es: "Garantía y Asistencia",
    de: "Garantie & Support",
    pt: "Garantia e Assistência",
    it: "Garanzia e Assistenza",
  },
  "Correction des anomalies, accompagnement à la prise en main et cession des droits des livrables.": {
    en: "Bug resolution, onboarding training, and full intellectual property transfer of all deliverables.",
    es: "Corrección de incidencias, acompañamiento inicial y cesión total de derechos de los entregables.",
    de: "Fehlerbehebung, Einweisung ins System und vollständige Übertragung aller Nutzungsrechte.",
    pt: "Correção de anomalias, acompanhamento inicial e cedência total dos direitos dos entregáveis.",
    it: "Risoluzione anomalie, formazione all'uso e cessione completa dei diritti sui deliverable.",
  },
  "Paiements Flexibles": {
    en: "Flexible Payment Terms",
    es: "Pagos Flexibles",
    de: "Flexible Zahlungsmodalitäten",
    pt: "Pagamentos Flexíveis",
    it: "Pagamenti Flessibili",
  },
  "Acompte de démarrage et solde à la livraison. Règlements acceptés par Orange Money, MTN MoMo ou Virement.": {
    en: "Initial deposit to kick off and balance upon delivery. Payments accepted via Orange Money, MTN MoMo, or Bank Transfer.",
    es: "Anticipo al iniciar y saldo a la entrega. Pagos aceptados por Orange Money, MTN MoMo o transferencia.",
    de: "Anzahlung bei Projektstart und Restbetrag bei Übergabe. Zahlung per Orange Money, MTN MoMo oder Überweisung.",
    pt: "Adiantamento inicial e saldo na entrega. Pagamentos aceites por Orange Money, MTN MoMo ou Transferência.",
    it: "Acconto iniziale e saldo alla consegna. Pagamenti accettati tramite Orange Money, MTN MoMo o Bonifico.",
  },

  // ===========================================================================
  // 9. CONTACT DRAWER & CONTACT PAGE
  // ===========================================================================
  "PRYMAX STUDIO · Contact & Devis": {
    en: "PRYMAX STUDIO · Contact & Quote",
    es: "PRYMAX STUDIO · Contacto y Presupuesto",
    de: "PRYMAX STUDIO · Kontakt & Angebot",
    pt: "PRYMAX STUDIO · Contacto e Orçamento",
    it: "PRYMAX STUDIO · Contatti e Preventivo",
  },
  "Parlons de votre projet": {
    en: "Let's discuss your project",
    es: "Hablemos de su proyecto",
    de: "Lassen Sie uns über Ihr Projekt sprechen",
    pt: "Vamos falar sobre o seu projeto",
    it: "Parliamo del tuo progetto",
  },
  "Sélectionnez vos besoins et indiquez vos coordonnées. Vous recevrez une confirmation par email ainsi qu'une proposition adaptée.": {
    en: "Select your needs and enter your contact details. You will receive an email confirmation along with a tailored proposal.",
    es: "Seleccione sus necesidades e indique sus datos. Recibirá una confirmación por correo junto con una propuesta a medida.",
    de: "Wählen Sie Ihre gewünschten Leistungen und geben Sie Ihre Kontaktdaten an. Sie erhalten umgehend eine Bestätigung und ein passendes Angebot.",
    pt: "Selecione as suas necessidades e indique os seus dados. Receberá uma confirmação por e-mail e uma proposta adaptada.",
    it: "Seleziona le tue esigenze e inserisci i tuoi recapiti. Riceverai una conferma via email e una proposta su misura.",
  },
  "Votre Nom complet *": {
    en: "Your Full Name *",
    es: "Su Nombre completo *",
    de: "Ihr vollständiger Name *",
    pt: "O seu Nome completo *",
    it: "Il tuo Nome completo *",
  },
  "Nom complet *": {
    en: "Full Name *",
    es: "Nombre completo *",
    de: "Vollständiger Name *",
    pt: "Nome completo *",
    it: "Nome completo *",
  },
  "Adresse Email": {
    en: "Email Address",
    es: "Correo Electrónico",
    de: "E-Mail-Adresse",
    pt: "Endereço de E-mail",
    it: "Indirizzo Email",
  },
  "Adresse Email *": {
    en: "Email Address *",
    es: "Correo Electrónico *",
    de: "E-Mail-Adresse *",
    pt: "Endereço de E-mail *",
    it: "Indirizzo Email *",
  },
  "Dossier fictif de démonstration :": {
    en: "Demo project reference:",
    es: "Expediente de demostración:",
    de: "Demo-Projektreferenz:",
    pt: "Processo de demonstração:",
    it: "Pratica dimostrativa:",
  },
  "Connexion instable": {
    en: "Unstable connection",
    es: "Conexión inestable",
    de: "Instabile Verbindung",
    pt: "Ligação instável",
    it: "Connessione instabile",
  },
  "Presque prêt, encore une seconde...": {
    en: "Almost ready, just a moment...",
    es: "Casi listo, un segundo más...",
    de: "Fast bereit, einen Moment noch...",
    pt: "Quase pronto, só mais um segundo...",
    it: "Quasi pronto, ancora un istante...",
  },
  "Finalisation de l'affichage...": {
    en: "Finalizing display...",
    es: "Finalizando la visualización...",
    de: "Ansicht wird fertiggestellt...",
    pt: "A finalizar a apresentação...",
    it: "Finalizzazione della visualizzazione...",
  },
  "Connexion Internet instable — ouverture depuis le cache local...": {
    en: "Unstable connection — loading from local cache...",
    es: "Conexión inestable — abriendo desde caché local...",
    de: "Instabile Verbindung — Laden aus lokalem Cache...",
    pt: "Ligação instável — a abrir a partir da cache local...",
    it: "Connessione instabile — apertura dalla cache locale...",
  },
  "Téléphone": {
    en: "Phone Number",
    es: "Teléfono",
    de: "Telefonnummer",
    pt: "Telefone",
    it: "Telefono",
  },
  "Nom de votre Entreprise / Marque": {
    en: "Company / Brand Name",
    es: "Nombre de su Empresa / Marca",
    de: "Unternehmens- / Markenname",
    pt: "Nome da sua Empresa / Marca",
    it: "Nome Azienda / Brand",
  },
  "Quels services vous intéressent ? (Optionnel)": {
    en: "Which services are you interested in? (Optional)",
    es: "¿Qué servicios le interesan? (Opcional)",
    de: "Welche Leistungen interessieren Sie? (Optional)",
    pt: "Quais os serviços que lhe interessam? (Opcional)",
    it: "Quali servizi ti interessano? (Opzionale)",
  },
  "Création de Logo & Identité Visuelle": {
    en: "Logo Design & Visual Identity",
    es: "Creación de Logo e Identidad Visual",
    de: "Logo-Design & Markenidentität",
    pt: "Criação de Logótipo e Identidade Visual",
    it: "Creazione Logo e Identità Visiva",
  },
  "Création de Site Web Entreprise": {
    en: "Corporate Website Development",
    es: "Creación de Sitio Web Corporativo",
    de: "Unternehmens-Website erstellen",
    pt: "Criação de Site Empresarial",
    it: "Creazione Sito Web Aziendale",
  },
  "Boutique en Ligne E-Commerce": {
    en: "E-Commerce Online Store",
    es: "Tienda Online E-Commerce",
    de: "E-Commerce Online-Shop",
    pt: "Loja Online E-Commerce",
    it: "Boutique Online E-Commerce",
  },
  "Design Graphique & Mockups Textiles": {
    en: "Graphic Design & Apparel Mockups",
    es: "Diseño Gráfico y Mockups Textiles",
    de: "Grafikdesign & Textil-Mockups",
    pt: "Design Gráfico e Mockups Têxteis",
    it: "Graphic Design e Mockup Tessili",
  },
  "Référencement Google & SEO": {
    en: "Google Rankings & Local SEO",
    es: "Posicionamiento Google y SEO",
    de: "Google-Sichtbarkeit & SEO",
    pt: "Posicionamento Google e SEO",
    it: "Posizionamento Google e SEO",
  },
  "Budget indicatif (FCFA)": {
    en: "Indicative Budget (FCFA)",
    es: "Presupuesto orientativo (FCFA)",
    de: "Ungefährer Budgetrahmen (FCFA)",
    pt: "Orçamento indicativo (FCFA)",
    it: "Budget indicativo (FCFA)",
  },
  "Moins de 150 000 FCFA": {
    en: "Under 150,000 FCFA",
    es: "Menos de 150 000 FCFA",
    de: "Unter 150.000 FCFA",
    pt: "Menos de 150 000 FCFA",
    it: "Meno di 150.000 FCFA",
  },
  "150 000 – 350 000 FCFA": {
    en: "150,000 – 350,000 FCFA",
    es: "150 000 – 350 000 FCFA",
    de: "150.000 – 350.000 FCFA",
    pt: "150 000 – 350 000 FCFA",
    it: "150.000 – 350.000 FCFA",
  },
  "350 000 – 700 000 FCFA": {
    en: "350,000 – 700,000 FCFA",
    es: "350 000 – 700 000 FCFA",
    de: "350.000 – 700.000 FCFA",
    pt: "350 000 – 700 000 FCFA",
    it: "350.000 – 700.000 FCFA",
  },
  "Plus de 700 000 FCFA": {
    en: "Over 700,000 FCFA",
    es: "Más de 700 000 FCFA",
    de: "Über 700.000 FCFA",
    pt: "Mais de 700 000 FCFA",
    it: "Oltre 700.000 FCFA",
  },
  "Précision complémentaire (optionnel)": {
    en: "Additional details (optional)",
    es: "Detalles adicionales (opcional)",
    de: "Zusätzliche Angaben (optional)",
    pt: "Detalhes adicionais (opcional)",
    it: "Dettagli aggiuntivi (opzionale)",
  },
  "DEMANDE ENVOYÉE AVEC SUCCÈS": {
    en: "REQUEST SENT SUCCESSFULLY",
    es: "SOLICITUD ENVIADA CON ÉXITO",
    de: "ANFRAGE ERFOLGREICH GESENDET",
    pt: "PEDIDO ENVIADO COM SUCESSO",
    it: "RICHIESTA INVIATA CON SUCCESSO",
  },
  "Numéro de Référence :": {
    en: "Reference Number:",
    es: "Número de Referencia:",
    de: "Referenznummer:",
    pt: "Número de Referência:",
    it: "Numero di Riferimento:",
  },
  "Budget estimé :": {
    en: "Estimated Budget:",
    es: "Presupuesto estimado:",
    de: "Geschätztes Budget:",
    pt: "Orçamento estimado:",
    it: "Budget stimato:",
  },
  "Vos informations restent 100% confidentielles. Pas de spam.": {
    en: "Your information remains 100% confidential. Zero spam.",
    es: "Su información es 100% confidencial. Sin spam.",
    de: "Ihre Daten werden 100 % vertraulich behandelt. Kein Spam.",
    pt: "As suas informações permanecem 100% confidenciais. Sem spam.",
    it: "I tuoi dati restano confidenziali al 100%. Nessuno spam.",
  },

  // ContactPage specific
  "Contact & Échange Direct": {
    en: "Contact & Direct Inquiry",
    es: "Contacto y Comunicación Directa",
    de: "Kontakt & Direkter Austausch",
    pt: "Contacto e Conversa Direta",
    it: "Contatto e Dialogo Diretto",
  },
  "Disponible pour vos projets digitaux et de marque": {
    en: "Available for your digital and brand projects",
    es: "Disponibles para sus proyectos digitales y de marca",
    de: "Verfügbar für Ihre Digital- und Markenprojekte",
    pt: "Disponível para os seus projetos digitais e de marca",
    it: "Disponibili per i tuoi progetti digitali e di brand",
  },
  "Parlons concrètement de votre projet": {
    en: "Let's talk concretely about your project",
    es: "Hablemos concretamente de su proyecto",
    de: "Sprechen wir konkret über Ihr Projekt",
    pt: "Vamos falar concretamente sobre o seu projeto",
    it: "Parliamo concretamente del tuo progetto",
  },
  "Que ce soit pour un site web pour entreprise, une refonte, un logo ou une boutique e-commerce, nous vous répondons rapidement avec une proposition claire.": {
    en: "Whether for a corporate website, a redesign, a logo, or an e-commerce store, we respond swiftly with a clear, actionable proposal.",
    es: "Ya sea para un sitio corporativo, una renovación, un logotipo o una tienda online, le respondemos rápidamente con una propuesta clara.",
    de: "Ob Unternehmens-Website, Redesign, Logo oder Online-Shop – wir antworten Ihnen schnell mit einem klaren Angebot.",
    pt: "Seja para um site empresarial, uma remodelação, um logótipo ou uma loja e-commerce, respondemos rapidamente com uma proposta clara.",
    it: "Che si tratti di un sito aziendale, un restyling, un logo o uno store e-commerce, ti rispondiamo rapidamente con una proposta chiara.",
  },
  "Canal le plus réactif": {
    en: "Fastest Response Channel",
    es: "El canal más rápido",
    de: "Schnellster Kommunikationsweg",
    pt: "Canal mais rápido",
    it: "Il canale più rapido",
  },
  "Discutez directement en direct, envoyez vos maquettes ou vos références pour un premier avis technique gratuit.": {
    en: "Chat live with our team, share your references or mockups, and get a free initial technical assessment.",
    es: "Chatee en directo, envíe sus bocetos o referencias para recibir una primera valoración técnica gratuita.",
    de: "Chatten Sie direkt mit uns, senden Sie Entwürfe oder Referenzen für eine kostenlose technische Ersteinschätzung.",
    pt: "Converse em direto, envie as suas referências ou maquetes para um primeiro parecer técnico gratuito.",
    it: "Chatta in tempo reale, invia i tuoi riferimenti o bozze per una prima valutazione tecnica gratuita.",
  },
  "Échanger en direct": {
    en: "Chat live on WhatsApp",
    es: "Hablar en directo",
    de: "Direkt im Chat sprechen",
    pt: "Conversar em direto",
    it: "Chatta in diretta",
  },
  "Disponibilité": {
    en: "Availability",
    es: "Disponibilidad",
    de: "Erreichbarkeit",
    pt: "Disponibilidade",
    it: "Disponibilità",
  },
  "Lundi au Samedi · 8h00 – 19h00": {
    en: "Monday to Saturday · 8:00 AM – 7:00 PM",
    es: "Lunes a Sábado · 8:00 – 19:00",
    de: "Montag bis Samstag · 08:00 – 19:00 Uhr",
    pt: "Segunda a Sábado · 8h00 – 19h00",
    it: "Lunedì – Sabato · 8:00 – 19:00",
  },
  "Interventions et suivi de projet continu": {
    en: "Continuous project execution and client support",
    es: "Intervenciones y seguimiento continuo de proyectos",
    de: "Laufende Projektbetreuung und Umsetzung",
    pt: "Intervenções e acompanhamento contínuo de projetos",
    it: "Interventi e monitoraggio continuo del progetto",
  },
  "Email Officiel": {
    en: "Official Email",
    es: "Correo Oficial",
    de: "Offizielle E-Mail",
    pt: "E-mail Oficial",
    it: "Email Ufficiale",
  },
  "Réponse garantie sous 24h ouvrées": {
    en: "Guaranteed response within 24 business hours",
    es: "Respuesta garantizada en 24h laborables",
    de: "Garantierte Antwort innerhalb von 24 Werkstunden",
    pt: "Resposta garantida em 24h úteis",
    it: "Risposta garantita entro 24 ore lavorative",
  },
  "Téléphone Direct": {
    en: "Direct Phone",
    es: "Teléfono Directo",
    de: "Direktwahl",
    pt: "Telefone Direto",
    it: "Telefono Diretto",
  },
  "Envoyer un message ou demander un devis": {
    en: "Send a message or request a quote",
    es: "Enviar un mensaje o solicitar presupuesto",
    de: "Nachricht senden oder Angebot anfordern",
    pt: "Enviar mensagem ou pedir orçamento",
    it: "Invia un messaggio o richiedi un preventivo",
  },
  "Sélectionnez le type de projet et vos coordonnées pour recevoir une étude de faisabilité et un tarif clair par email.": {
    en: "Select your project type and contact details to receive a feasibility study and transparent quote by email.",
    es: "Seleccione el tipo de proyecto y sus datos para recibir un estudio de viabilidad y presupuesto claro por correo.",
    de: "Wählen Sie die Projektart und Ihre Kontaktdaten, um eine Machbarkeitsprüfung und ein klares Angebot per E-Mail zu erhalten.",
    pt: "Selecione o tipo de projeto e os seus dados para receber um estudo de viabilidade e orçamento claro por e-mail.",
    it: "Seleziona il tipo di progetto e i tuoi recapiti per ricevere uno studio di fattibilità e un preventivo chiaro via email.",
  },
  "Nom complet ou Nom de l'Entreprise": {
    en: "Full Name or Company Name",
    es: "Nombre completo o Nombre de la Empresa",
    de: "Vollständiger Name oder Firmenname",
    pt: "Nome completo ou Nome da Empresa",
    it: "Nome completo o Nome dell'Azienda",
  },
  "Type de projet (Sélection libre)": {
    en: "Project Type (Select any)",
    es: "Tipo de proyecto (Selección libre)",
    de: "Projektart (Freie Auswahl)",
    pt: "Tipo de projeto (Seleção livre)",
    it: "Tipo di progetto (Selezione libera)",
  },
  "Site One-Page Express": {
    en: "Express One-Page Website",
    es: "Sitio One-Page Exprés",
    de: "Express One-Page Website",
    pt: "Site One-Page Expresso",
    it: "Sito One-Page Express",
  },
  "Branding & Logo Original": {
    en: "Branding & Original Logo",
    es: "Branding y Logotipo Original",
    de: "Branding & Original-Logo",
    pt: "Branding e Logótipo Original",
    it: "Branding e Logo Originale",
  },
  "Référencement SEO & Visibilité": {
    en: "SEO Rankings & Visibility",
    es: "Posicionamiento SEO y Visibilidad",
    de: "SEO-Optimierung & Sichtbarkeit",
    pt: "Posicionamento SEO e Visibilidade",
    it: "Posizionamento SEO e Visibilità",
  },
  "Décrivez brièvement votre besoin (optionnel)": {
    en: "Briefly describe your project needs (optional)",
    es: "Describa brevemente su necesidad (opcional)",
    de: "Beschreiben Sie kurz Ihr Vorhaben (optional)",
    pt: "Descreva brevemente a sua necessidade (opcional)",
    it: "Descrivi brevemente la tua esigenza (opzionale)",
  },
  "Données confidentielles · Devis gratuit et sans engagement": {
    en: "Confidential data · Free, no-obligation quote",
    es: "Datos confidenciales · Presupuesto gratuito y sin compromiso",
    de: "Vertrauliche Daten · Kostenloses & unverbindliches Angebot",
    pt: "Dados confidenciais · Orçamento gratuito e sem compromisso",
    it: "Dati confidenziali · Preventivo gratuito e senza impegno",
  },
  "Envoyer une autre demande": {
    en: "Send another request",
    es: "Enviar otra solicitud",
    de: "Weitere Anfrage senden",
    pt: "Enviar outro pedido",
    it: "Invia un'altra richiesta",
  },

  // ===========================================================================
  // 10. CLIENT PORTAL PAGE (ClientPortalPage.tsx)
  // ===========================================================================
  "Espace Privé & Suivi de Projet": {
    en: "Private Workspace & Project Tracker",
    es: "Espacio Privado y Seguimiento de Proyecto",
    de: "Privater Bereich & Projekt-Tracking",
    pt: "Espaço Privado e Acompanhamento de Projeto",
    it: "Area Privata e Monitoraggio Progetto",
  },
  "Prévisualisez l'interface de suivi dédiée à nos clients pour consulter l'avancement d'un projet web et récupérer les livrables.": {
    en: "Preview our dedicated client tracking interface to monitor real-time project progress and download deliverables.",
    es: "Previsualice la interfaz de seguimiento dedicada a nuestros clientes para consultar el avance del proyecto y descargar entregables.",
    de: "Testen Sie unsere Kunden-Tracking-Oberfläche in der Vorschau, um den Projektfortschritt einzusehen und Dateien herunterzuladen.",
    pt: "Pré-visualize a interface de acompanhamento dedicada aos nossos clientes para consultar o progresso do projeto e descarregar entregáveis.",
    it: "Visualizza in anteprima l'interfaccia dedicata ai nostri clienti per monitorare l'avanzamento del progetto e scaricare i file.",
  },
  "Code d'accès (Aperçu Démonstration)": {
    en: "Access Code (Interactive Demo Preview)",
    es: "Código de acceso (Vista previa de demostración)",
    de: "Zugangscode (Interaktive Demo-Vorschau)",
    pt: "Código de acesso (Pré-visualização Demo)",
    it: "Codice d'accesso (Anteprima Demo)",
  },
  "Entrez « DEMO » pour explorer l'interface de suivi projet (aucune donnée client réelle n'est exposée sur cet aperçu public).": {
    en: "Enter “DEMO” to explore the project tracker interface (no real client data is exposed in this public preview).",
    es: "Introduzca «DEMO» para explorar la interfaz de seguimiento (no se exponen datos reales de clientes en esta vista pública).",
    de: "Geben Sie „DEMO“ ein, um das Projekt-Dashboard zu testen (in dieser Vorschau werden keine echten Kundendaten angezeigt).",
    pt: "Introduza «DEMO» para explorar a interface de acompanhamento (nenhum dado real de cliente é exposto nesta demonstração).",
    it: "Inserisci «DEMO» per esplorare l'interfaccia di monitoraggio (nessun dato reale dei clienti è esposto in questa anteprima).",
  },
  "Prévisualiser l'espace projet": {
    en: "Preview project workspace",
    es: "Previsualizar el espacio del proyecto",
    de: "Projektbereich-Vorschau öffnen",
    pt: "Pré-visualizar espaço do projeto",
    it: "Anteprima spazio progetto",
  },
  "Vous souhaitez démarrer un projet réel ?": {
    en: "Looking to start a real project?",
    es: "¿Desea iniciar un proyecto real?",
    de: "Möchten Sie ein echtes Projekt starten?",
    pt: "Deseja iniciar um projeto real?",
    it: "Vuoi avviare un progetto reale?",
  },
  "Demander l'ouverture d'un projet": {
    en: "Request a new project kickoff",
    es: "Solicitar la apertura de un proyecto",
    de: "Neues Projekt anfragen",
    pt: "Solicitar a abertura de um projeto",
    it: "Richiedi l'apertura di un progetto",
  },
  "APERÇU DÉMONSTRATION · PORTAIL CLIENT": {
    en: "INTERACTIVE DEMO · CLIENT PORTAL",
    es: "VISTA DEMO · PORTAL CLIENTE",
    de: "DEMO-VORSCHAU · KUNDENPORTAL",
    pt: "PRÉ-VISUALIZAÇÃO DEMO · PORTAL CLIENTE",
    it: "ANTEPRIMA DEMO · PORTALE CLIENTI",
  },
  "Aperçu du tableau de bord projet": {
    en: "Project Dashboard Preview",
    es: "Vista previa del panel de proyecto",
    de: "Vorschau des Projekt-Dashboards",
    pt: "Pré-visualização do painel de projeto",
    it: "Anteprima della dashboard di progetto",
  },
  "Quitter l'aperçu": {
    en: "Exit preview",
    es: "Salir de la vista previa",
    de: "Vorschau beenden",
    pt: "Sair da pré-visualização",
    it: "Esci dall'anteprima",
  },
  "Phase Actuelle": {
    en: "Current Phase",
    es: "Fase Actual",
    de: "Aktuelle Phase",
    pt: "Fase Atual",
    it: "Fase Attuale",
  },
  "Intégration responsive et optimisation Core Web Vitals en cours.": {
    en: "Responsive UI engineering and Core Web Vitals optimization in progress.",
    es: "Integración responsiva y optimización Core Web Vitals en curso.",
    de: "Responsive Umsetzung und Core Web Vitals Optimierung laufen.",
    pt: "Integração responsiva e otimização Core Web Vitals em curso.",
    it: "Integrazione responsive e ottimizzazione Core Web Vitals in corso.",
  },
  "Avancement : 75%": {
    en: "Progress: 75%",
    es: "Avance: 75%",
    de: "Fortschritt: 75%",
    pt: "Progresso: 75%",
    it: "Avanzamento: 75%",
  },
  "Identité & Fichiers": {
    en: "Brand Assets & Files",
    es: "Identidad y Archivos",
    de: "Marken-Assets & Dateien",
    pt: "Identidade e Ficheiros",
    it: "Identità e File",
  },
  "Logos HD Prêts": {
    en: "HD Logos Ready",
    es: "Logos HD Listos",
    de: "HD-Logos Bereit",
    pt: "Logótipos HD Prontos",
    it: "Loghi HD Pronti",
  },
  "Déclinaisons vectorielles (SVG, PNG fond transparent, PDF Print).": {
    en: "Vector master files (SVG, transparent PNG, print-ready PDF).",
    es: "Versiones vectoriales (SVG, PNG fondo transparente, PDF Print).",
    de: "Vektor-Dateien (SVG, transparentes PNG, Druck-PDF).",
    pt: "Versões vetoriais (SVG, PNG fundo transparente, PDF Print).",
    it: "Declinazioni vettoriali (SVG, PNG sfondo trasparente, PDF Print).",
  },
  "Télécharger le pack (ZIP)": {
    en: "Download asset pack (ZIP)",
    es: "Descargar paquete (ZIP)",
    de: "Asset-Paket herunterladen (ZIP)",
    pt: "Descarregar pacote (ZIP)",
    it: "Scarica pacchetto (ZIP)",
  },
  "Assistance Dédiée": {
    en: "Dedicated Support",
    es: "Asistencia Dedicada",
    de: "Persönlicher Support",
    pt: "Assistência Dedicada",
    it: "Assistenza Dedicata",
  },
  "Support Actif": {
    en: "Active Support",
    es: "Soporte Activo",
    de: "Support Aktiv",
    pt: "Suporte Ativo",
    it: "Supporto Attivo",
  },
  "Votre interlocuteur dédié est disponible en direct.": {
    en: "Your dedicated project manager is available live.",
    es: "Su gestor de proyecto dedicado está disponible en directo.",
    de: "Ihr persönlicher Ansprechpartner ist direkt erreichbar.",
    pt: "O seu gestor de projeto dedicado está disponível em direto.",
    it: "Il tuo project manager dedicato è disponibile in diretta.",
  },
  "Envoyer un message": {
    en: "Send a message",
    es: "Enviar un mensaje",
    de: "Nachricht senden",
    pt: "Enviar mensagem",
    it: "Invia un messaggio",
  },

  // ===========================================================================
  // 11. FOOTER & FLOATING WHATSAPP
  // ===========================================================================
  "Collaboration & Croissance": {
    en: "Partnership & Growth",
    es: "Colaboración y Crecimiento",
    de: "Zusammenarbeit & Wachstum",
    pt: "Colaboração e Crescimento",
    it: "Collaborazione e Crescita",
  },
  "Prêt à digitaliser votre activité avec PRYMAX STUDIO ?": {
    en: "Ready to elevate your business digitally with PRYMAX STUDIO?",
    es: "¿Listo para digitalizar su negocio con PRYMAX STUDIO?",
    de: "Bereit, Ihr Unternehmen mit PRYMAX STUDIO digital voranzubringen?",
    pt: "Pronto para digitalizar o seu negócio com a PRYMAX STUDIO?",
    it: "Pronto a digitalizzare la tua attività con PRYMAX STUDIO?",
  },
  "Obtenez un site web ultra-rapide, une identité visuelle marquante et une visibilité locale renforcée. Échangeons dès aujourd'hui sur votre projet.": {
    en: "Get an ultra-fast corporate website, a striking brand identity, and stronger local visibility. Let's discuss your project today.",
    es: "Obtenga un sitio web ultrarrápido, una identidad visual impactante y mayor visibilidad local. Hablemos hoy mismo sobre su proyecto.",
    de: "Sichern Sie sich eine ultraschnelle Website, eine starke Markenidentität und mehr lokale Sichtbarkeit. Sprechen wir noch heute über Ihr Projekt.",
    pt: "Obtenha um site ultrarrápido, uma identidade visual marcante e maior visibilidade local. Vamos conversar hoje mesmo sobre o seu projeto.",
    it: "Ottieni un sito web ultraveloce, un'identità visiva distintiva e maggiore visibilità locale. Parliamo oggi stesso del tuo progetto.",
  },
  "Studio digital de référence spécialisé en design web haute performance, branding d'exception et visibilité numérique.": {
    en: "Premier digital studio specializing in high-performance web development, signature branding, and search visibility.",
    es: "Estudio digital de referencia especializado en diseño web de alto rendimiento, branding de excepción y visibilidad digital.",
    de: "Führendes Digitalstudio für hochperformantes Webdesign, exzellentes Branding und digitale Sichtbarkeit.",
    pt: "Estúdio digital de referência especializado em web design de alta performance, branding de excelência e visibilidade digital.",
    it: "Studio digitale di riferimento specializzato in web design ad alte prestazioni, branding d'eccellenza e visibilità digitale.",
  },
  "Email :": {
    en: "Email:",
    es: "Email:",
    de: "E-Mail:",
    pt: "E-mail:",
    it: "Email:",
  },
  "Contact :": {
    en: "Contact:",
    es: "Contacto:",
    de: "Kontakt:",
    pt: "Contacto:",
    it: "Contatto:",
  },
  "Réseaux Officiels": {
    en: "Official Channels",
    es: "Redes Oficiales",
    de: "Offizielle Kanäle",
    pt: "Redes Oficiais",
    it: "Canali Ufficiali",
  },
  "Restez informé": {
    en: "Stay Informed",
    es: "Manténgase informado",
    de: "Bleiben Sie informiert",
    pt: "Mantenha-se informado",
    it: "Resta aggiornato",
  },
  "Recevez nos analyses stratégiques et les coulisses de nos réalisations studio.": {
    en: "Receive our strategic digital insights and behind-the-scenes studio case studies.",
    es: "Reciba nuestros análisis estratégicos y los detalles de nuestras realizaciones.",
    de: "Erhalten Sie unsere strategischen Analysen und Einblicke hinter die Kulissen unseres Studios.",
    pt: "Receba as nossas análises estratégicas e os bastidores das realizações do estúdio.",
    it: "Ricevi le nostre analisi strategiche e il dietro le quinte dei nostri progetti.",
  },
  "Inscription confirmée !": {
    en: "Subscription confirmed!",
    es: "¡Suscripción confirmada!",
    de: "Anmeldung bestätigt!",
    pt: "Subscrição confirmada!",
    it: "Iscrizione confermata!",
  },
  "Afficher l'aperçu de l'email reçu ↗": {
    en: "View confirmation email preview ↗",
    es: "Ver vista previa del correo recibido ↗",
    de: "Vorschau der Bestätigungs-E-Mail ansehen ↗",
    pt: "Ver pré-visualização do e-mail recebido ↗",
    it: "Visualizza anteprima dell'email ricevuta ↗",
  },
  "Conception Digitale & Web Haute Performance": {
    en: "High-Performance Web & Digital Engineering",
    es: "Diseño Digital y Web de Alto Rendimiento",
    de: "High-Performance Webdesign & Digitale Entwicklung",
    pt: "Conceção Digital e Web de Alta Performance",
    it: "Progettazione Digitale e Web ad Alte Prestazioni",
  },
  "Échanger sur WhatsApp (+237 681 078 004)": {
    en: "Chat on WhatsApp (+237 681 078 004)",
    es: "Chatear por WhatsApp (+237 681 078 004)",
    de: "Per WhatsApp chatten (+237 681 078 004)",
    pt: "Conversar no WhatsApp (+237 681 078 004)",
    it: "Chatta su WhatsApp (+237 681 078 004)",
  },

  // ===========================================================================
  // 12. INPUT PLACEHOLDERS
  // ===========================================================================
  "Votre nom complet *": {
    en: "Your full name *",
    es: "Su nombre completo *",
    de: "Ihr vollständiger Name *",
    pt: "O seu nome completo *",
    it: "Il tuo nome completo *",
  },
  "Votre adresse email *": {
    en: "Your email address *",
    es: "Su correo electrónico *",
    de: "Ihre E-Mail-Adresse *",
    pt: "O seu endereço de e-mail *",
    it: "Il tuo indirizzo email *",
  },
  "Téléphone (optionnel)": {
    en: "Phone number (optional)",
    es: "Teléfono (opcional)",
    de: "Telefonnummer (optional)",
    pt: "Telefone (opcional)",
    it: "Telefono (opzionale)",
  },
  "Entreprise / Marque": {
    en: "Company / Brand",
    es: "Empresa / Marca",
    de: "Unternehmen / Marke",
    pt: "Empresa / Marca",
    it: "Azienda / Brand",
  },
  "Entrez votre adresse email...": {
    en: "Enter your email address...",
    es: "Introduzca su correo electrónico...",
    de: "Ihre E-Mail-Adresse eingeben...",
    pt: "Introduza o seu endereço de e-mail...",
    it: "Inserisci il tuo indirizzo email...",
  },
  "Votre nom": {
    en: "Your name",
    es: "Su nombre",
    de: "Ihr Name",
    pt: "O seu nome",
    it: "Il tuo nome",
  },
  "Votre entreprise": {
    en: "Your company",
    es: "Su empresa",
    de: "Ihr Unternehmen",
    pt: "A sua empresa",
    it: "La tua azienda",
  },
  "Objectif particulier ou lien de référence...": {
    en: "Specific goal or reference link...",
    es: "Objetivo específico o enlace de referencia...",
    de: "Besonderes Ziel oder Referenzlink...",
    pt: "Objetivo específico ou link de referência...",
    it: "Obiettivo specifico o link di riferimento...",
  },
  "ex: Patrick Mbia / TPI Engineering": {
    en: "e.g. Patrick Mbia / TPI Engineering",
    es: "ej: Patrick Mbia / TPI Engineering",
    de: "z. B. Patrick Mbia / TPI Engineering",
    pt: "ex: Patrick Mbia / TPI Engineering",
    it: "es: Patrick Mbia / TPI Engineering",
  },
  "ex: contact@entreprise.com": {
    en: "e.g. contact@company.com",
    es: "ej: contacto@empresa.com",
    de: "z. B. kontakt@unternehmen.de",
    pt: "ex: contacto@empresa.com",
    it: "es: contatto@azienda.it",
  },
  "contact@entreprise.com": {
    en: "contact@company.com",
    es: "contacto@empresa.com",
    de: "kontakt@unternehmen.de",
    pt: "contacto@empresa.com",
    it: "contatto@azienda.it",
  },
  "Décrivez votre activité, vos attentes ou votre calendrier...": {
    en: "Describe your business, expectations, or timeline...",
    es: "Describa su actividad, sus expectativas o su calendario...",
    de: "Beschreiben Sie Ihr Vorhaben, Ihre Ziele oder Ihren Zeitplan...",
    pt: "Descreva a sua atividade, expectativas ou calendário...",
    it: "Descrivi la tua attività, le tue aspettative o le tempistiche...",
  },
  "Exemple : DEMO ou PX-CLIENT-2026": {
    en: "Example: DEMO or PX-CLIENT-2026",
    es: "Ejemplo: DEMO o PX-CLIENT-2026",
    de: "Beispiel: DEMO oder PX-CLIENT-2026",
    pt: "Exemplo: DEMO ou PX-CLIENT-2026",
    it: "Esempio: DEMO o PX-CLIENT-2026",
  },
};

function normalizePhrase(input: string): string {
  return input
    .replace(/\u00A0/g, ' ')
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Build normalized lookup table once
const NORMALIZED_DICTIONARY = new Map<string, TranslationRecord>();
for (const [key, value] of Object.entries(RAW_PHRASE_DICTIONARY)) {
  NORMALIZED_DICTIONARY.set(normalizePhrase(key), value);
}

/**
 * Translates dynamic strings with numbers or interpolated names (e.g. "2 sélectionné(s)",
 * "Prestations cochées (3)", "Demander un devis (2 prestations)", "· Création de Logo", etc.)
 */
function translateDynamicPattern(
  normalized: string,
  lang: Exclude<SupportedLanguage, 'fr'>
): string | null {
  // 1. "{N} sélectionné(s)"
  const selectedMatch = normalized.match(/^(\d+)\s+sélectionné\(s\)$/i);
  if (selectedMatch) {
    const n = selectedMatch[1];
    const map: Record<Exclude<SupportedLanguage, 'fr'>, string> = {
      en: `${n} selected`,
      es: `${n} seleccionado(s)`,
      de: `${n} ausgewählt`,
      pt: `${n} selecionado(s)`,
      it: `${n} selezionato/i`,
    };
    return map[lang];
  }

  // 2. "Prestations cochées ({N})"
  const checkedMatch = normalized.match(/^Prestations cochées\s*\((\d+)\)$/i);
  if (checkedMatch) {
    const n = checkedMatch[1];
    const map: Record<Exclude<SupportedLanguage, 'fr'>, string> = {
      en: `Selected services (${n})`,
      es: `Servicios marcados (${n})`,
      de: `Ausgewählte Leistungen (${n})`,
      pt: `Serviços selecionados (${n})`,
      it: `Servizi selezionati (${n})`,
    };
    return map[lang];
  }

  // 3. "Demander un devis ({N} prestation(s))"
  const quoteCountMatch = normalized.match(/^Demander un devis\s*\((\d+)\s+prestations?\)$/i);
  if (quoteCountMatch) {
    const n = Number(quoteCountMatch[1]);
    const map: Record<Exclude<SupportedLanguage, 'fr'>, string> = {
      en: `Request a quote (${n} service${n > 1 ? 's' : ''})`,
      es: `Solicitar presupuesto (${n} servicio${n > 1 ? 's' : ''})`,
      de: `Angebot anfordern (${n} Leistung${n > 1 ? 'en' : ''})`,
      pt: `Pedir orçamento (${n} serviço${n > 1 ? 's' : ''})`,
      it: `Richiedi preventivo (${n} servizi${n === 1 ? 'o' : ''})`,
    };
    return map[lang];
  }

  // 4. "· {Service Name}"
  if (normalized.startsWith('· ')) {
    const inner = normalizePhrase(normalized.slice(2));
    const entry = NORMALIZED_DICTIONARY.get(inner);
    if (entry && entry[lang]) {
      return `· ${entry[lang]}`;
    }
  }

  // 5. "{N} Entreprises Actives"
  const activeCompaniesMatch = normalized.match(/^(\d+)\s+Entreprises Actives$/i);
  if (activeCompaniesMatch) {
    const n = activeCompaniesMatch[1];
    const map: Record<Exclude<SupportedLanguage, 'fr'>, string> = {
      en: `${n} Active Companies`,
      es: `${n} Empresas Activas`,
      de: `${n} Aktive Unternehmen`,
      pt: `${n} Empresas Ativas`,
      it: `${n} Aziende Attive`,
    };
    return map[lang];
  }

  // 6. "© {YEAR} PRYMAX STUDIO. Tous droits réservés."
  const copyrightMatch = normalized.match(/^©\s*(\d{4})\s+PRYMAX STUDIO\.\s*Tous droits réservés\.$/i);
  if (copyrightMatch) {
    const year = copyrightMatch[1];
    const map: Record<Exclude<SupportedLanguage, 'fr'>, string> = {
      en: `© ${year} PRYMAX STUDIO. All rights reserved.`,
      es: `© ${year} PRYMAX STUDIO. Todos los derechos reservados.`,
      de: `© ${year} PRYMAX STUDIO. Alle Rechte vorbehalten.`,
      pt: `© ${year} PRYMAX STUDIO. Todos os direitos reservados.`,
      it: `© ${year} PRYMAX STUDIO. Tutti i diritti riservati.`,
    };
    return map[lang];
  }

  // 7. "Prêt à démarrer avec {Service} ?"
  const readyMatch = normalized.match(/^Prêt à démarrer avec\s+(.+?)\s*\?$/i);
  if (readyMatch) {
    const rawService = normalizePhrase(readyMatch[1]);
    const translatedService = NORMALIZED_DICTIONARY.get(rawService)?.[lang] || rawService;
    const map: Record<Exclude<SupportedLanguage, 'fr'>, string> = {
      en: `Ready to get started with ${translatedService}?`,
      es: `¿Listo para comenzar con ${translatedService}?`,
      de: `Bereit zu starten mit ${translatedService}?`,
      pt: `Pronto para começar com ${translatedService}?`,
      it: `Pronto a iniziare con ${translatedService}?`,
    };
    return map[lang];
  }

  return null;
}

function lookupTranslation(
  sourceRaw: string,
  lang: SupportedLanguage
): string | null {
  if (lang === 'fr') return sourceRaw;
  const normalized = normalizePhrase(sourceRaw);
  if (!normalized) return null;

  const exact = NORMALIZED_DICTIONARY.get(normalized);
  if (exact && exact[lang]) {
    return exact[lang];
  }

  return translateDynamicPattern(normalized, lang);
}

interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  tNav: NavbarTranslations;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'fr',
  setLanguage: () => {},
  tNav: NAVBAR_TRANSLATIONS.fr,
  languages: SUPPORTED_LANGUAGES,
});

function getInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'fr';
  try {
    const saved = window.localStorage.getItem('prymax_lang')?.toLowerCase().trim() as SupportedLanguage | undefined;
    if (saved && SUPPORTED_LANGUAGES.some(l => l.code === saved)) {
      return saved;
    }
  } catch {
    // Ignore storage access errors
  }
  return 'fr';
}

const originalTextMap = new WeakMap<Text, string>();
const lastTranslatedValueMap = new WeakMap<Text, string>();
const originalPlaceholderMap = new WeakMap<Element, string>();

let isApplyingTranslations = false;

function applyCleanTranslationsToDOM(lang: SupportedLanguage) {
  if (typeof document === 'undefined' || !document.body || isApplyingTranslations) return;
  isApplyingTranslations = true;

  try {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT' || tag === 'CODE') {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let currentNode = walker.nextNode() as Text | null;
    while (currentNode) {
      const currentValue = currentNode.nodeValue || '';
      const trimmed = currentValue.trim();

      if (trimmed.length > 1) {
        const previousTranslated = lastTranslatedValueMap.get(currentNode);
        // If React updated the text node underneath us with new French text, update our stored source
        if (!originalTextMap.has(currentNode) || (previousTranslated && currentValue !== previousTranslated)) {
          const candidateTranslation = lookupTranslation(currentValue, 'en');
          if (candidateTranslation !== null) {
            originalTextMap.set(currentNode, currentValue);
          }
        }

        const sourceRaw = originalTextMap.get(currentNode);
        if (sourceRaw) {
          if (lang === 'fr') {
            if (currentNode.nodeValue !== sourceRaw) {
              currentNode.nodeValue = sourceRaw;
            }
            lastTranslatedValueMap.set(currentNode, sourceRaw);
          } else {
            const translated = lookupTranslation(sourceRaw, lang);
            if (translated) {
              const leadingSpace = sourceRaw.match(/^\s*/)?.[0] || '';
              const trailingSpace = sourceRaw.match(/\s*$/)?.[0] || '';
              const finalString = `${leadingSpace}${translated}${trailingSpace}`;
              if (currentNode.nodeValue !== finalString) {
                currentNode.nodeValue = finalString;
              }
              lastTranslatedValueMap.set(currentNode, finalString);
            }
          }
        }
      }

      currentNode = walker.nextNode() as Text | null;
    }

    // Translate input/textarea placeholders cleanly
    const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
    inputs.forEach(el => {
      const currentPlaceholder = el.getAttribute('placeholder') || '';
      if (!originalPlaceholderMap.has(el)) {
        if (lookupTranslation(currentPlaceholder, 'en') !== null) {
          originalPlaceholderMap.set(el, currentPlaceholder);
        }
      }
      const sourcePlaceholder = originalPlaceholderMap.get(el);
      if (sourcePlaceholder) {
        if (lang === 'fr') {
          if (el.getAttribute('placeholder') !== sourcePlaceholder) {
            el.setAttribute('placeholder', sourcePlaceholder);
          }
        } else {
          const translated = lookupTranslation(sourcePlaceholder, lang);
          if (translated && el.getAttribute('placeholder') !== translated) {
            el.setAttribute('placeholder', translated);
          }
        }
      }
    });
  } finally {
    isApplyingTranslations = false;
  }
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(getInitialLanguage);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem('prymax_lang', lang);
    } catch {
      // Ignore storage errors
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    applyCleanTranslationsToDOM(language);

    let rafId: number | null = null;
    const scheduleTranslationPass = () => {
      if (isApplyingTranslations) return;
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        applyCleanTranslationsToDOM(language);
        rafId = null;
      });
    };

    const observer = new MutationObserver(() => {
      scheduleTranslationPass();
    });

    if (typeof document !== 'undefined' && document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        tNav: NAVBAR_TRANSLATIONS[language] || NAVBAR_TRANSLATIONS.fr,
        languages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export function useLanguage() {
  return useContext(LanguageContext);
}
