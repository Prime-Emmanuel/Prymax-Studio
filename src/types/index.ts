export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  technologies: string[];
  idealFor: string;
  image: string;
  badge?: string;
  stats?: string;
}

export interface ClientPartner {
  id: string;
  name: string;
  sector: string;
  serviceProvided: string;
  highlight: string;
  logo: string;
  image?: string;
  website?: string;
  status?: string;
  tag?: string;
}

export interface PricingModule {
  id: string;
  name: string;
  category: string;
  priceDisplay: string;
  minPriceFcfa: number;
  maxPriceFcfa?: number;
  duration: string;
  description: string;
  deliverables: string[];
  note?: string;
}

export type PageRoute = 
  | 'home'
  | 'services'
  | 'service-detail'
  | 'projets'
  | 'studio'
  | 'devis'
  | 'contact';
