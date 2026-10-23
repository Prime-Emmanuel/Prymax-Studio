import { ServiceItem, ClientPartner, PricingModule } from '../types';
import brandingMockup from '../assets/images/branding_identity_mockup_1792588771026.jpg';
import enterpriseHero from '../assets/images/digital_enterprise_hero_1792588771383.jpg';
import apparelMockup from '../assets/images/apparel_graphic_tshirt_1792588752439.jpg';
import ecommerceMockup from '../assets/images/ecommerce_shop_mockup_1792768581525.jpg';
import seoMockup from '../assets/images/seo_analytics_mockup_1792768595308.jpg';
import iconPrymax from '../assets/branding/icon_prymax.png';

export const PRYMAX_PLACEHOLDER_LOGO = iconPrymax;

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-web',
    number: '01',
    title: 'Création de Sites Web pour Entreprises',
    tagline: 'Sites vitrines d\'exception, One-Page percutants et plateformes sur-mesure ultra-rapides et 100% responsives.',
    summary: 'Nous concevons des sites internet modernes, sécurisés et performants, pensés dès la première seconde pour inspirer une confiance absolue, valoriser vos services d\'entreprise et convertir les visiteurs en clients qualifiés.',
    deliverables: [
      'Structure 100% adaptée et fluide sur tous les smartphones, tablettes et ordinateurs',
      'Boutons d\'action directs et formulaires de devis interactifs',
      'Vitesse de chargement ultra-rapide (Core Web Vitals optimisés)',
      'Nom de domaine sécurisé (HTTPS) et configuration d\'emails professionnels',
      'Architecture technique moderne, référencement naturel et sécurité renforcée',
      'Mise en ligne soignée et assistance après livraison'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Mobile First', 'API Integration', 'SEO Schema'],
    idealFor: 'Entreprises, cabinets d\'ingénierie, PME, commerces, agences et professionnels exigeants.',
    image: enterpriseHero,
    badge: 'Cœur de Métier · Business',
    stats: '100% Mobile & Ultra-Rapide'
  },
  {
    id: 'srv-branding',
    number: '02',
    title: 'Branding & Identité Visuelle de Marque',
    tagline: 'Logos originaux haut de gamme, chartes graphiques complètes et univers de marque intemporels.',
    summary: 'Le branding est le socle de toute entreprise prospère. Nous sculptons votre identité visuelle complète : logo principal, déclinaisons pour réseaux sociaux, palettes harmonieuses, choix typographiques et supports de marque professionnels.',
    deliverables: [
      'Logo original haute résolution vectoriel (HD sans aucune perte de qualité)',
      'Déclinaisons complètes (icônes profil, formats horizontaux, verticaux et monochromes)',
      'Palette de couleurs officielles et guide typographique de prestige',
      'Design de cartes de visite, papier en-tête, factures et devis professionnels',
      'Fichiers sources complets avec pleine cession de droits d\'exploitation commerciale'
    ],
    technologies: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Vectoriel Print & Digital HD'],
    idealFor: 'Nouvelles marques ou entreprises en quête d\'une image forte et immédiatement mémorable.',
    image: brandingMockup,
    badge: 'Identité Pure',
    stats: 'Livraison HD vectorielle'
  },
  {
    id: 'srv-ecom',
    number: '03',
    title: 'E-Commerce & Boutiques en Ligne',
    tagline: 'Vendez vos produits 24h/24 avec encaissement sécurisé par Mobile Money et Cartes bancaires.',
    summary: 'Une boutique en ligne élégante, simple à utiliser pour vos acheteurs et intuitive à administrer pour vous. Gestion des stocks en direct, notifications instantanées de commande et tunnel d\'achat sans la moindre friction.',
    deliverables: [
      'Catalogue de produits avec photos en haute qualité, filtres, variantes et fiches détaillées',
      'Paiement en ligne sécurisé (Orange Money, MTN MoMo, Wave, Cartes Visa / Mastercard)',
      'Panier d\'achat intuitif et processus de commande rapide en un clic',
      'Gestion des commandes, alertes instantanées et suivi automatique des stocks',
      'Formation claire pour ajouter vos futurs articles en toute autonomie'
    ],
    technologies: ['E-Commerce Engine', 'Stripe / Mobile Money Gateways', 'Inventory Sync', 'Mobile Checkout'],
    idealFor: 'Commerçants, marques de prêt-à-porter, boutiques spécialisées voulant vendre partout.',
    image: ecommerceMockup,
    badge: 'Vente 24h/24',
    stats: 'Paiements Sécurisés Intégrés'
  },
  {
    id: 'srv-textile',
    number: '04',
    title: 'Design Graphique & Mockups Textiles 3D',
    tagline: 'Conception visuelle de t-shirts, pulls et sweats présentés sur des mockups photoréalistes d\'élite.',
    summary: 'Nous réalisons le design graphique de vos vêtements avec une esthétique moderne et percutante. Vous recevez les visuels prêts pour l\'atelier sur des mockups haute définition. Vous imprimez chez votre atelier partenaire, ou nous pouvons vous orienter vers un tiers à vos frais.',
    deliverables: [
      'Création graphique originale pour l\'avant, le dos et les manches',
      'Présentation photo sur mockups 3D ultra-réalistes pour vos réseaux et précommandes',
      'Fichiers d\'impression haute définition prêts pour sérigraphie, DTF ou flocage',
      'Conseils techniques sur le placement, dimensions et choix des contrastes textiles'
    ],
    technologies: ['Design Graphique', 'Rendu 3D Photoréaliste', 'Fichiers HD Print Ateliers'],
    idealFor: 'Marques de streetwear, entreprises équipant leur personnel, associations et événements.',
    image: apparelMockup,
    badge: 'Rendu Photoréaliste',
    stats: 'Fichiers HD prêts atelier'
  },
  {
    id: 'srv-seo',
    number: '05',
    title: 'Référencement & Visibilité Google (SEO)',
    tagline: 'Positionnez votre entreprise en tête des recherches locales et attirez des clients qualifiés chaque jour.',
    summary: 'Soyez visible exactement là où vos clients cherchent. Optimisation de votre fiche d\'établissement Google Maps et Google My Business pour générer des appels et demandes régulières.',
    deliverables: [
      'Création et optimisation complète de votre fiche Google My Business',
      'Positionnement sur Google Maps pour les recherches locales stratégiques',
      'Structure sémantique et balises Schema.org adaptées à votre activité',
      'Conseils et gabarits pour collecter des avis clients élogieux et constants'
    ],
    technologies: ['Google My Business', 'SEO Local Google Maps', 'Schema.org JSON-LD', 'Analytics'],
    idealFor: 'Entreprises locales voulant capter les clients en recherche active de leurs services.',
    image: seoMockup,
    badge: 'Acquisition Locale',
    stats: 'Top Résultats Google Maps'
  }
];

export const CLIENT_PARTNERS: ClientPartner[] = [
  {
    id: 'cl-tpi',
    name: 'TPI Engineering Group',
    sector: 'Ingénierie & Infrastructures',
    serviceProvided: 'Identité Visuelle, Présentation Corporate & Présence Digitale',
    highlight: 'Accompagnement d\'un groupe d\'ingénierie civile d\'envergure moderne et technique.',
    logo: 'https://i.ibb.co/BHPNWGMM/logo-tpi.jpg',
    image: 'https://i.ibb.co/chbhpJsn/R-ception-moderne-TP1-Engineering-Group.png',
    tag: 'Ingénierie BTP'
  },
  {
    id: 'cl-kribi',
    name: 'Kribi Paradise',
    sector: 'Hôtellerie, Tourisme & Séjour Balnéaire',
    serviceProvided: 'Conception Web & Expérience Visuelle',
    highlight: 'Plateforme d\'hébergement et villégiature côtière de standing à Kribi.',
    logo: 'https://i.ibb.co/Cpq7d0T6/logo-kp.png',
    website: 'https://kribiparadise.com',
    status: 'En ligne',
    tag: 'Tourisme & Luxe'
  },
  {
    id: 'cl-south',
    name: 'South Estates and Houses',
    sector: 'Immobilier & Résidences de Prestige',
    serviceProvided: 'Développement Web Immobilier & Catalogue de Biens',
    highlight: 'Vitrine digitale pour investissements immobiliers et locations haut de gamme.',
    logo: 'https://i.ibb.co/Kxwtmysx/logo-south.png',
    website: 'https://southestatescmr.vercel.app/',
    status: 'En ligne',
    tag: 'Immobilier'
  },
  {
    id: 'cl-pasy',
    name: 'Pasy Phones',
    sector: 'Smartphones & High-Tech Mobile',
    serviceProvided: 'Boutique E-Commerce & Catalogue Produits Connectés',
    highlight: 'Boutique digitale dédiée aux smartphones dernière génération et accessoires.',
    logo: 'https://i.ibb.co/dswkW45g/logo-pasy.png',
    website: 'https://pasyphones.store',
    status: 'En ligne',
    tag: 'E-Commerce Tech'
  },
  {
    id: 'cl-den',
    name: 'D.E.N Autocare',
    sector: 'Automobile, Detailing & Mécanique de Précision',
    serviceProvided: 'Site Web Professionnel & Image de Marque Premium',
    highlight: 'Plateforme digitale pour centre d\'entretien automobile d\'élite et esthétique carrosserie.',
    logo: 'https://i.ibb.co/RpF37gBb/logo-den.png',
    image: 'https://i.ibb.co/BVdcwXW5/image-den.png',
    website: 'https://den-autocare.com',
    status: 'En ligne',
    tag: 'Auto & Detailing'
  },
  {
    id: 'cl-apo',
    name: 'APO GROUP',
    sector: 'Communication Stratégique & Relations Publiques',
    serviceProvided: 'Architecture Web & Plateforme Panafricaine',
    highlight: 'Conception et refonte d\'une interface moderne pour groupe de communication international.',
    logo: 'https://i.ibb.co/1GGvpb6P/logo-apo.png',
    website: 'in development',
    status: 'En cours de développement',
    tag: 'Médias & RP'
  }
];

export const PRICING_MODULES: PricingModule[] = [
  {
    id: 'price-logo',
    name: 'Création de Logo',
    category: 'Branding & Identité',
    priceDisplay: '10 000 FCFA',
    minPriceFcfa: 10000,
    duration: '24 heures',
    description: 'Logo original pour démarrer votre activité avec une image soignée.',
    deliverables: [
      'Logo original livré en haute définition',
      'Format profil réseaux sociaux & WhatsApp',
      'Fichiers avec fond transparent (PNG) et fond blanc/noir',
      'Livraison express en 24h'
    ]
  },
  {
    id: 'price-onepage',
    name: 'Site Web One-Page (Single Page)',
    category: 'Développement Web',
    priceDisplay: '90 000 à 120 000 FCFA',
    minPriceFcfa: 90000,
    maxPriceFcfa: 120000,
    duration: '1 à 3 jours',
    description: 'Une page unique élégante et ultra-rapide qui présente l’essentiel de votre offre.',
    deliverables: [
      'Site one-page moderne 100% adapté aux smartphones',
      'Section Présentation, Services, Témoignages & Contact',
      'Bouton d’appel direct et lien WhatsApp',
      'Nom de domaine et mise en ligne inclus'
    ]
  },
  {
    id: 'price-pro',
    name: 'Site Web Professionnel (Vitrine)',
    category: 'Développement Web',
    priceDisplay: '150 000 à 350 000 FCFA',
    minPriceFcfa: 150000,
    maxPriceFcfa: 350000,
    duration: '1 à 4 jours',
    description: 'Site complet multi-pages pour valoriser votre entreprise et rassurer vos clients.',
    deliverables: [
      'Plusieurs pages dédiées (Accueil, Services détaillés, À propos, Contact)',
      'Design sur-mesure aligné sur votre charte graphique',
      'Formulaire de demande de devis intégré',
      'Optimisation pour chargement instantané sur mobile'
    ]
  },
  {
    id: 'price-ecom',
    name: 'Site E-Commerce (Boutique en Ligne)',
    category: 'Vente en Ligne',
    priceDisplay: '375 000 à 1 000 000 FCFA',
    minPriceFcfa: 375000,
    maxPriceFcfa: 100000,
    duration: '1 à 7 jours',
    description: 'Boutique en ligne complète avec panier d’achat et passerelles de paiement.',
    deliverables: [
      'Catalogue de produits avec gestion des stocks',
      'Intégration paiements (Mobile Money, Carte bancaire)',
      'Espace gestionnaire simple pour gérer vos commandes',
      'Formation d’utilisation incluse'
    ]
  },
  {
    id: 'price-custom',
    name: 'Site Web Sur-Mesure (Personnalisé)',
    category: 'Sur-Mesure',
    priceDisplay: 'À partir de 500 000 FCFA',
    minPriceFcfa: 500000,
    duration: 'Délai à déterminer selon cahier des charges',
    description: 'Plateforme web avancée avec fonctionnalités personnalisées selon vos besoins précis.',
    deliverables: [
      'Architecture technique sur-mesure (portail, application web)',
      'Fonctionnalités avancées sur spécifications',
      'Accompagnement et suivi dédié de bout en bout'
    ]
  },
  {
    id: 'price-textile',
    name: 'Design Visuel Textile (T-Shirts, Pulls sur Mockups)',
    category: 'Design Textile & Mockups',
    priceDisplay: '10 000 à 50 000 FCFA',
    minPriceFcfa: 10000,
    maxPriceFcfa: 50000,
    duration: '48 heures',
    description: 'Design visuel et présentation sur mockups. Le client peut imprimer où il le souhaite, ou nous pouvons confier l’impression à un tiers aux frais du client.',
    deliverables: [
      'Design visuel avant, arrière et/ou manches selon vos besoins',
      'Rendus 3D ultra-réalistes sur mockups pour votre communication',
      'Fichiers sources HD prêts pour impression textile',
      'Orientation vers nos ateliers partenaires au besoin (frais d’impression à la charge du client)'
    ],
    note: 'Important : Nous réalisons uniquement le design visuel et la présentation sur mockups. L’impression physique peut être réalisée par vos soins ou confiée à un tiers à vos frais.'
  },
  {
    id: 'price-seo',
    name: 'Visibilité & Référencement Google (SEO)',
    category: 'Marketing & Visibilité',
    priceDisplay: '50 000 à 300 000 FCFA',
    minPriceFcfa: 50000,
    maxPriceFcfa: 300000,
    duration: 'Variable (dépendant des algorithmes Google et de l’activité)',
    description: 'Positionnement de votre fiche d’entreprise et optimisation des mots-clés pour capter des clients.',
    deliverables: [
      'Optimisation de fiche Google My Business et présence Google Maps',
      'Ciblage des recherches locales dans votre secteur',
      'Conseils stratégiques pour maximiser les prises de contact'
    ]
  }
];
