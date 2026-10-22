import { ServiceItem, ClientPartner, PricingModule } from '../types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-branding',
    number: '01',
    title: 'Branding & Identité Visuelle',
    tagline: 'Création de logos originaux, typographies sur-mesure et univers de marque complets.',
    summary: 'Le branding est le cœur battant de votre business. Nous concevons une identité visuelle forte et intemporelle : logo principal, déclinaisons pour réseaux sociaux, charte graphique et papeterie professionnelle.',
    deliverables: [
      'Logo original haute résolution (vectoriel HD sans perte de qualité)',
      'Déclinaisons complètes (icônes profil, formats horizontaux et verticaux)',
      'Palette de couleurs officielles et choix typographiques harmonieux',
      'Design de cartes de visite, papier en-tête et devis/factures',
      'Fichiers sources complets avec pleine cession de droits'
    ],
    technologies: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Vectoriel Print & Digital'],
    idealFor: 'Nouvelles entreprises ou marques souhaitant inspirer confiance immédiate et s’imposer sur leur marché.'
  },
  {
    id: 'srv-web',
    number: '02',
    title: 'Développement Web & Sites Sur-Mesure',
    tagline: 'Sites One-Page, vitrines professionnelles et plateformes sur-mesure rapides et 100% mobile-friendly.',
    summary: 'Nous concevons des sites internet modernes et percutants qui captent l’attention de vos visiteurs et les incitent à vous contacter immédiatement via WhatsApp ou formulaire.',
    deliverables: [
      'Structure 100% adaptée et fluide sur tous les smartphones et ordinateurs',
      'Bouton de contact WhatsApp direct et formulaires optimisés',
      'Vitesse de chargement ultra-rapide (Core Web Vitals optimisés)',
      'Nom de domaine sécurisé (HTTPS) et configuration emails professionnels',
      'Mise en ligne soignée et assistance après livraison'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Mobile First', 'WhatsApp Integration'],
    idealFor: 'Professionnels, cabinets, PME et créateurs voulant une présence web prestigieuse et efficace.'
  },
  {
    id: 'srv-ecom',
    number: '03',
    title: 'E-Commerce & Boutiques en Ligne',
    tagline: 'Vendez vos produits 24h/24 avec paiement sécurisé (Mobile Money, Carte bancaire).',
    summary: 'Une boutique en ligne élégante, simple à utiliser pour vos clients et facile à gérer pour vous. Gestion des stocks, notifications automatiques et parcours d’achat sans friction.',
    deliverables: [
      'Catalogue de produits avec photos en haute qualité, filtres et variantes',
      'Paiement en ligne sécurisé (Orange Money, MTN MoMo, Wave, Cartes)',
      'Panier d’achat intuitif et processus de commande rapide',
      'Gestion des commandes et alertes instantanées',
      'Formation claire pour ajouter vos futurs articles en toute autonomie'
    ],
    technologies: ['E-Commerce Engine', 'Stripe / Mobile Money Gateways', 'Stock Manager'],
    idealFor: 'Commerçants et marques souhaitant automatiser leurs ventes et toucher des clients partout dans le monde.'
  },
  {
    id: 'srv-textile',
    number: '04',
    title: 'Design Graphique & Mockups Textiles',
    tagline: 'Conception visuelle de t-shirts, pulls et sweats présentés sur des mockups ultra-réalistes.',
    summary: 'Nous réalisons le design graphique de vos vêtements avec une esthétique moderne. Vous recevez les visuels prêts pour impression sur mockups haute définition. Vous imprimez chez votre imprimeur habituel, ou nous pouvons vous orienter vers un tiers à vos frais.',
    deliverables: [
      'Création graphique originale pour l’avant, le dos et les manches',
      'Présentation photo sur mockups 3D réalistes pour vos réseaux et précommandes',
      'Fichiers d’impression haute définition prêts pour atelier de sérigraphie ou flocage',
      'Conseils techniques sur le choix des tissus et techniques recommandées'
    ],
    technologies: ['Design Graphique', 'Mockups 3D Réalistes', 'Fichiers HD Print'],
    idealFor: 'Marques de vêtements, entreprises équipant leur personnel, associations et événements.'
  },
  {
    id: 'srv-seo',
    number: '05',
    title: 'Référencement & Visibilité Google (SEO)',
    tagline: 'Positionnez votre entreprise en tête des recherches locales et attirez des clients qualifiés.',
    summary: 'Soyez visible là où vos clients cherchent. Optimisation de votre présence sur Google Maps et Google My Business pour générer des appels et messages réguliers.',
    deliverables: [
      'Création et optimisation complète de votre fiche Google My Business',
      'Positionnement sur Google Maps pour les recherches locales',
      'Structure sémantique et mots-clés stratégiques sur votre activité',
      'Conseils pour collecter des avis clients positifs'
    ],
    technologies: ['Google My Business', 'SEO Local', 'Google Maps'],
    idealFor: 'Entreprises locales voulant capter les clients de leur ville en recherche active de services.'
  }
];

export const CLIENT_PARTNERS: ClientPartner[] = [
  {
    id: 'cl-dg',
    name: 'DG — Dieu Est Grand',
    sector: 'Mode & Streetwear Textile',
    serviceProvided: 'Identité Visuelle, Logo & Design Capsule Vêtements',
    highlight: 'Planche de marque complète, logo emblème et mockups t-shirts/hoodies'
  },
  {
    id: 'cl-corporate',
    name: 'Partenaires & Entreprises Clientes',
    sector: 'B2B & Commerce',
    serviceProvided: 'Sites Web, Identités & Solutions Digitales',
    highlight: 'Accompagnement continu sur mesure et projets livrés'
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
