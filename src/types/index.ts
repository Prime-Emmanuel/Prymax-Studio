export interface ApparelItem {
  id: string;
  code: string;
  title: string;
  category: 'T-Shirt' | 'Pull & Sweat' | 'Hoodie' | 'Packaging & Logo';
  image: string;
  tagline: string;
  description: string;
  material: string;
  weightGsm: number;
  printTechnique: string;
  colorways: { name: string; hex: string }[];
  specs: { label: string; value: string }[];
  simpleDescription: string;
}

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
  status: 'Projet Livré' | 'En Cours' | 'Partenaire';
  highlight: string;
}

export interface ScopeOption {
  id: string;
  name: string;
  category: string;
  baseCostFcfa: number;
  timeWeeks: number;
  deliverables: string[];
}
