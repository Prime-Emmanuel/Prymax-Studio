export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  technologies: string[];
  idealFor: string;
}

export interface ClientPartner {
  id: string;
  name: string;
  sector: string;
  serviceProvided: string;
  highlight: string;
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
