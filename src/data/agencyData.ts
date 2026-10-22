import { ApparelItem, ServiceItem, ClientPartner, ScopeOption } from '../types';

export const APPAREL_ITEMS: ApparelItem[] = [
  {
    id: 'px-tee-01',
    code: 'PX-01',
    title: 'T-Shirt Oversize PRYMAX',
    category: 'T-Shirt',
    image: '/src/assets/images/prymax_tee_showcase_1792593146600.jpg',
    tagline: 'Coton lourd 310g très résistant avec logo P argenté et coupe moderne',
    description: 'Un t-shirt haut de gamme conçu pour durer des années sans rétrécir ni déteindre. Flocage et broderie ultra-nets de notre logo P métallique sur la poitrine, avec étiquettes soignées.',
    material: '100% Coton Peigné Épais (Qualité Supérieure)',
    weightGsm: 310,
    printTechnique: 'Sérigraphie Haute Définition + Finition Métallique',
    colorways: [
      { name: 'Noir Profond', hex: '#0D0E11' },
      { name: 'Blanc Cassé', hex: '#E6E4DD' },
      { name: 'Gris Béton', hex: '#484B52' }
    ],
    specs: [
      { label: 'Grammage', value: '310 g/m² (Coton très épais)' },
      { label: 'Coupe', value: 'Oversize confortable (épaules tombantes)' },
      { label: 'Col', value: 'Col rond renforcé qui ne se détend pas' },
      { label: 'Finition', value: 'Étiquette tissée PRYMAX sur le bas' }
    ],
    simpleDescription: 'Idéal pour le personnel de votre entreprise, vos événements ou lancer votre propre marque de vêtements.'
  },
  {
    id: 'px-pullover-02',
    code: 'PX-02',
    title: 'Pull Crewneck PRYMAX',
    category: 'Pull & Sweat',
    image: '/src/assets/images/prymax_pullover_showcase_1792593162349.jpg',
    tagline: 'Sweat sans capuche en molleton épais avec broderie soignée sur la poitrine',
    description: 'Pull chaud et élégant en molleton 460g. Le logo métallique est brodé avec précision au fil résistant, pour un rendu classe qui passe aussi bien au bureau qu’en sortie.',
    material: '100% Molleton Français Organique Doux',
    weightGsm: 460,
    printTechnique: 'Broderie en relief argentée haute précision',
    colorways: [
      { name: 'Gris Anthracite', hex: '#2B2D31' },
      { name: 'Sable Clair', hex: '#D2CBBF' },
      { name: 'Noir Nuit', hex: '#121316' }
    ],
    specs: [
      { label: 'Tissu', value: 'Molleton gratté doux à l’intérieur' },
      { label: 'Coutures', value: 'Doubles coutures renforcées' },
      { label: 'Bords', value: 'Poignets et bas élastiques solides' },
      { label: 'Toucher', value: 'Lavage adoucissant effet velours' }
    ],
    simpleDescription: 'Parfait pour donner une image professionnelle et moderne à vos équipes.'
  },
  {
    id: 'px-hoodie-03',
    code: 'PX-03',
    title: 'Sweat à Capuche Épais (Hoodie)',
    category: 'Hoodie',
    image: '/src/assets/images/apparel_graphic_hoodie_1792588769879.jpg',
    tagline: 'Sweat à capuche double épaisseur avec poche cachée et design géométrique',
    description: 'Capuche doublée qui tient bien droite sans cordons gênants. Tissu 500g ultra-confortable avec impressions graphiques précises qui résistent aux lavages intensifs.',
    material: '80% Coton / 20% Polyester Anti-Rétrécissement',
    weightGsm: 500,
    printTechnique: 'Impression textile thermique + Broderie ton sur ton',
    colorways: [
      { name: 'Craie Claire', hex: '#F0EFEA' },
      { name: 'Onyx Fumé', hex: '#1A1B1E' },
      { name: 'Gris Titane', hex: '#4B4F56' }
    ],
    specs: [
      { label: 'Poids', value: '500 g/m² (Très chaud et robuste)' },
      { label: 'Capuche', value: 'Double couche sans cordon traînant' },
      { label: 'Poche', value: 'Poche kangourou intégrée' },
      { label: 'Manches', value: 'Bords-côtes longs et ajustés' }
    ],
    simpleDescription: 'Le classique streetwear indispensable, personnalisé aux couleurs de votre projet.'
  },
  {
    id: 'px-identity-04',
    code: 'PX-04',
    title: 'Packaging & Cartes de Visite de Luxe',
    category: 'Packaging & Logo',
    image: '/src/assets/images/branding_identity_mockup_1792588771026.jpg',
    tagline: 'Boîtes rigides aimantées, cartes de visite gaufrées et guide complet de votre marque',
    description: 'Tout ce qu’il faut pour que votre marque fasse une première impression inoubliable : cartes de visite texturées, dorure or ou argent, et emballages cadeaux rigides.',
    material: 'Papier Coton Épais 600g & Carton Rigide Recyclable',
    weightGsm: 600,
    printTechnique: 'Gaufrage en creux + Dorure à chaud brillante',
    colorways: [
      { name: 'Noir Mat & Or', hex: '#161719' },
      { name: 'Ivoire Naturel', hex: '#EBE5D8' },
      { name: 'Gris Ardoise', hex: '#3C4048' }
    ],
    specs: [
      { label: 'Support', value: 'Carton rigide 1800g recouvert de papier mat' },
      { label: 'Cartes', value: 'Papier coton épais 600g au toucher soyeux' },
      { label: 'Fermeture', value: 'Aimant invisible sécurisé' },
      { label: 'Livrables', value: 'Fichiers vectoriels prêts pour impression' }
    ],
    simpleDescription: 'Pour présenter vos devis, produits ou cartes avec un standing haut de gamme.'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'srv-web',
    number: '01',
    title: 'Création de Sites Web & Applications',
    tagline: 'Des sites ultra-rapides, magnifiques sur téléphone et ordinateur, qui transforment vos visiteurs en clients.',
    summary: 'Nous créons des sites web sur-mesure (sites vitrines d’entreprise, boutiques e-commerce, plateformes de gestion). Vos pages se chargent en moins d’une seconde et s’affichent parfaitement sur tous les smartphones.',
    deliverables: [
      'Site vitrine moderne adapté à 100% sur mobile',
      'Boutique en ligne avec paiement sécurisé (Mobile Money, Carte)',
      'Formulaire de contact et bouton WhatsApp direct',
      'Vitesse de chargement ultra-rapide (pas d’attente)',
      'Nom de domaine et adresse email professionnelle (.com / .ci / .sn)'
    ],
    technologies: ['React', 'Next.js', 'WordPress / Headless', 'Mobile First', 'WhatsApp API'],
    idealFor: 'Entreprises, commerces et créateurs qui veulent un site professionnel qui inspire confiance et vend.'
  },
  {
    id: 'srv-brand',
    number: '02',
    title: 'Design Graphique & Création de Logo',
    tagline: 'Un logo unique et une identité visuelle marquante qui donne immédiatement une image sérieuse à votre entreprise.',
    summary: 'Votre logo est la première chose que vos clients voient. Nous dessinons des logos modernes, mémorables et faciles à utiliser partout : sur vos affiches, vos réseaux sociaux, vos factures et vos enseignes.',
    deliverables: [
      'Création de logo original (fourni en haute résolution et vectoriel)',
      'Déclinaisons pour profil WhatsApp, Instagram, Facebook et LinkedIn',
      'Charte graphique (choix des couleurs officielles et des polices)',
      'Design de cartes de visite, papier en-tête et devis/factures',
      'Fichiers sources complets (vous êtes 100% propriétaire)'
    ],
    technologies: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Vectoriel Haute Définition'],
    idealFor: 'Nouvelles entreprises ou sociétés qui souhaitent moderniser leur image et se démarquer de la concurrence.'
  },
  {
    id: 'srv-apparel',
    number: '03',
    title: 'Conception de Vêtements & T-shirts / Pulls',
    tagline: 'Design graphique et fabrication de t-shirts, polos, sweats et pulls personnalisés de haute qualité.',
    summary: 'Ne faites plus de t-shirts basiques qui s’abîment au premier lavage. Nous réalisons le design graphique de vos vêtements et vous accompagnons sur le choix des meilleurs tissus, coupes et techniques d’impression.',
    deliverables: [
      'Design graphique original pour l’avant, le dos et les manches',
      'Fiches techniques prêtes pour l’atelier d’impression ou de confection',
      'Choix des tissus (coton lourd 250g-310g, molleton 400g+)',
      'Conseils sur la technique (flocage, sérigraphie, broderie en relief)',
      'Design de packaging et étiquettes personnalisées'
    ],
    technologies: ['Design Textile', 'Mockups 3D Réalistes', 'Fiches Usine', 'Sérigraphie & Broderie'],
    idealFor: 'Marques de streetwear, entreprises qui équipent leur personnel, ou organisateurs d’événements.'
  },
  {
    id: 'srv-seo',
    number: '04',
    title: 'Solutions Digitales & Référencement Google',
    tagline: 'Faites apparaître votre entreprise en tête des recherches Google et gagnez de nouveaux clients chaque semaine.',
    summary: 'Un beau site ne sert à rien si personne ne le trouve. Nous configurons votre présence Google (Google Maps, Google My Business, mots-clés de votre ville) pour que les clients qui recherchent vos services tombent directement sur vous.',
    deliverables: [
      'Configuration et optimisation de votre fiche Google My Business',
      'Référencement local pour sortir en 1er sur les recherches de votre ville',
      'Connexion avec WhatsApp Business et vos réseaux sociaux',
      'Statistiques claires : voyez combien de personnes vous contactent',
      'Formation simple pour mettre à jour vos contenus en toute autonomie'
    ],
    technologies: ['Google My Business', 'SEO Local', 'Google Maps', 'Analytics'],
    idealFor: 'Toutes les entreprises locales qui veulent recevoir des appels et des messages WhatsApp réguliers.'
  }
];

export const INITIAL_CLIENTS: ClientPartner[] = [
  {
    id: 'cl-01',
    name: 'Votre Entreprise Partenaire #1',
    sector: 'Commerce / Distribution',
    serviceProvided: 'Site Web & Identité Visuelle',
    status: 'Partenaire',
    highlight: 'Remplaçable facilement par vos vraies références'
  },
  {
    id: 'cl-02',
    name: 'Votre Entreprise Partenaire #2',
    sector: 'Mode & Habillement',
    serviceProvided: 'Collection T-shirts & Merchandising',
    status: 'Projet Livré',
    highlight: 'Structure prête pour intégrer vos vrais clients'
  },
  {
    id: 'cl-03',
    name: 'Votre Entreprise Partenaire #3',
    sector: 'Services & B2B',
    serviceProvided: 'Logo, Cartes de Visite & Digital',
    status: 'En Cours',
    highlight: 'Ajoutez vos clients directement ci-dessous'
  }
];

export const SCOPE_MODULES: ScopeOption[] = [
  {
    id: 'mod-logo',
    name: 'Création de Logo & Identité Visuelle',
    category: 'Design Graphique',
    baseCostFcfa: 100000,
    timeWeeks: 1,
    deliverables: [
      'Logo original en plusieurs formats',
      'Formats profil réseaux sociaux & WhatsApp',
      'Design carte de visite & papier en-tête',
      'Fichiers sources HD imprimables'
    ]
  },
  {
    id: 'mod-web',
    name: 'Site Web Professionnel (Mobile & PC)',
    category: 'Développement Web',
    baseCostFcfa: 350000,
    timeWeeks: 3,
    deliverables: [
      'Design moderne 100% adapté smartphone',
      'Bouton WhatsApp direct & formulaire',
      'Présentation claire de vos services',
      'Nom de domaine et emails pro inclus'
    ]
  },
  {
    id: 'mod-ecom',
    name: 'Boutique en Ligne (E-Commerce)',
    category: 'Vente en Ligne',
    baseCostFcfa: 550000,
    timeWeeks: 4,
    deliverables: [
      'Catalogue de produits avec photos & prix',
      'Paiement en ligne sécurisé (Mobile Money & Carte)',
      'Gestion des commandes et notifications client',
      'Formation pour ajouter vos produits'
    ]
  },
  {
    id: 'mod-apparel',
    name: 'Ligne de Vêtements (T-Shirts / Pulls)',
    category: 'Merchandising & Textile',
    baseCostFcfa: 200000,
    timeWeeks: 2,
    deliverables: [
      'Design graphique des visuels (devant / dos)',
      'Conseil sur le grammage tissu (250g à 500g)',
      'Fiches de production pour l’imprimeur',
      'Visualisations 3D réalistes avant fabrication'
    ]
  },
  {
    id: 'mod-seo',
    name: 'Visibilité Google & Référencement Local',
    category: 'Solutions Digitales',
    baseCostFcfa: 150000,
    timeWeeks: 1,
    deliverables: [
      'Fiche Google My Business vérifiée et optimisée',
      'Apparition sur Google Maps',
      'Mots-clés ciblés sur votre ville',
      'Rapport simple des appels et visites'
    ]
  }
];
