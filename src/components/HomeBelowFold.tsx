import React from 'react';
import { Disciplines } from './Disciplines';
import { ClientPartners } from './ClientPartners';
import { StudioSection } from './StudioSection';
import { ScopeEstimator } from './ScopeEstimator';
import { ServiceItem } from '../types';

interface HomeBelowFoldProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenContact: () => void;
  onNavigate: (route: string) => void;
  onPreloadBrief: (modules: string[], totalFcfa: number, tier: string) => void;
}

export const HomeBelowFold: React.FC<HomeBelowFoldProps> = ({
  onSelectService,
  onOpenContact,
  onNavigate,
  onPreloadBrief,
}) => {
  return (
    <>
      <Disciplines
        onSelectService={onSelectService}
        onOpenContact={onOpenContact}
        onNavigate={onNavigate}
      />

      <ClientPartners
        onOpenContact={onOpenContact}
        onNavigate={onNavigate}
      />

      <StudioSection />

      <ScopeEstimator onPreloadBrief={onPreloadBrief} />
    </>
  );
};
