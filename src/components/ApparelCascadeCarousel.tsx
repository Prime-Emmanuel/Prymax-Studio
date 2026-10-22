import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Maximize2, 
  RotateCw, 
  Check, 
  Grid, 
  X,
  Sparkles
} from 'lucide-react';
import { APPAREL_ITEMS } from '../data/agencyData';
import { ApparelItem } from '../types';

export const ApparelCascadeCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [viewMode, setViewMode] = useState<'cascade' | 'grid'>('cascade');
  const [selectedColorway, setSelectedColorway] = useState<number>(0);
  const [lightboxItem, setLightboxItem] = useState<ApparelItem | null>(null);

  const activeItem = APPAREL_ITEMS[activeIndex];

  // Rotation automatique douce (pause lors du toucher)
  useEffect(() => {
    if (!isAutoplay || viewMode === 'grid') return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % APPAREL_ITEMS.length);
      setFlipped(false);
      setSelectedColorway(0);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoplay, viewMode]);

  const handleNext = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev + 1) % APPAREL_ITEMS.length);
    setFlipped(false);
    setSelectedColorway(0);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setActiveIndex((prev) => (prev - 1 + APPAREL_ITEMS.length) % APPAREL_ITEMS.length);
    setFlipped(false);
    setSelectedColorway(0);
  };

  const handleSelectCard = (index: number) => {
    setIsAutoplay(false);
    setActiveIndex(index);
    setFlipped(false);
    setSelectedColorway(0);
  };

  return (
    <section id="creations" className="py-16 sm:py-24 bg-[#08090B] relative overflow-hidden border-t border-b border-white/[0.08]">
      
      {/* Lueur subtile en fond */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-[#E5B54F]/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* En-tête de section simple et direct */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E5B54F] mb-2.5">
              <span>Collection Textile &amp; Graphisme</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>PRYMAX STUDIO</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight text-balance">
              Nos modèles de t-shirts &amp; pulls personnalisés
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 max-w-xl mt-2.5">
              Découvrez nos créations avec les cartes empilées ci-dessous. Cliquez ou glissez pour faire défiler les modèles et voir les détails des tissus.
            </p>
          </div>

          {/* Boutons d'affichage (Pile ou Grille) adaptés au mobile */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <div className="flex items-center bg-zinc-900 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setViewMode('cascade')}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'cascade' 
                    ? 'bg-[#E5B54F] text-[#08090B] shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Vue Cartes Empilées</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`min-h-[38px] px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'grid' 
                    ? 'bg-[#E5B54F] text-[#08090B] shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>Tous les Modèles</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            VUE CARTES EMPILÉES (CAROUSEL EN CASCADE)
           ========================================================================= */}
        {viewMode === 'cascade' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Colonne Gauche : Les cartes empilées l'une sur l'autre */}
            <div className="lg:col-span-7 relative h-[460px] sm:h-[560px] flex items-center justify-center perspective-1000">
              
              {/* Conteneur des cartes en cascade */}
              <div className="relative w-full max-w-[360px] sm:max-w-[420px] h-[440px] sm:h-[520px]">
                {APPAREL_ITEMS.map((item, index) => {
                  const offset = (index - activeIndex + APPAREL_ITEMS.length) % APPAREL_ITEMS.length;
                  const isActive = offset === 0;

                  if (offset > 3) return null;

                  // Positionnement 3D pour l'effet de cartes empilées
                  const scale = 1 - offset * 0.06;
                  const translateY = offset * 14;
                  const translateX = offset * 18;
                  const rotateZ = offset * 3;
                  const opacity = 1 - offset * 0.22;
                  const zIndex = 30 - offset * 5;

                  return (
                    <motion.div
                      key={item.id}
                      onClick={() => !isActive && handleSelectCard(index)}
                      initial={false}
                      animate={{
                        scale,
                        y: translateY,
                        x: translateX,
                        rotateZ,
                        opacity,
                        zIndex
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24
                      }}
                      className={`absolute inset-0 rounded-2xl overflow-hidden cursor-pointer select-none transition-shadow ${
                        isActive 
                          ? 'border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.85)]' 
                          : 'border border-white/10 hover:border-white/20 shadow-lg'
                      }`}
                      style={{
                        transformOrigin: 'bottom center',
                        backgroundColor: '#121418'
                      }}
                    >
                      <div className="w-full h-full relative group">
                        
                        {/* Recto (Photo du vêtement) vs Verso (Détails tissus) */}
                        {!flipped || !isActive ? (
                          <>
                            <img
                              src={item.image}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />

                            {/* Dégradé sombre pour que le texte soit parfaitement lisible */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#08090B] via-[#08090B]/30 to-transparent" />

                            {/* Badge du haut */}
                            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs">
                              <span className="font-mono px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-white rounded font-medium">
                                {item.code} · {item.category}
                              </span>

                              {isActive && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxItem(item);
                                  }}
                                  className="min-w-[36px] min-h-[36px] flex items-center justify-center p-2 bg-black/80 hover:bg-black text-white rounded-md border border-white/10 transition-colors"
                                  title="Agrandir l'image"
                                >
                                  <Maximize2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>

                            {/* Titre et détails sur la carte */}
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                              <div className="text-[11px] font-bold text-[#E5B54F] mb-1">
                                {item.weightGsm}g/m² · Tissu Épais
                              </div>
                              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white line-clamp-1">
                                {item.title}
                              </h3>
                              <p className="text-xs text-zinc-300 mt-1 line-clamp-2">
                                {item.tagline}
                              </p>
                            </div>
                          </>
                        ) : (
                          /* Verso : Fiche simple et claire */
                          <div className="w-full h-full p-6 bg-[#0E1015] flex flex-col justify-between text-white overflow-y-auto">
                            <div>
                              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                                <div>
                                  <span className="text-[10px] font-mono uppercase text-[#E5B54F]">Détails de Fabrication</span>
                                  <h4 className="text-base sm:text-lg font-bold">{item.title}</h4>
                                </div>
                                <span className="font-mono text-xs text-zinc-400">{item.code}</span>
                              </div>

                              <div className="space-y-2.5 text-xs mb-4">
                                <div className="p-3 bg-zinc-900 rounded border border-white/5">
                                  <span className="text-zinc-400 block mb-0.5 text-[11px]">Matière</span>
                                  <span className="font-semibold text-white">{item.material}</span>
                                </div>

                                <div className="p-3 bg-zinc-900 rounded border border-white/5">
                                  <span className="text-zinc-400 block mb-0.5 text-[11px]">Type d'impression / broderie</span>
                                  <span className="font-semibold text-white">{item.printTechnique}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                  {item.specs.map((sp, i) => (
                                    <div key={i} className="p-2.5 bg-zinc-900/60 rounded border border-white/5">
                                      <div className="text-zinc-400 text-[10px] uppercase font-mono">{sp.label}</div>
                                      <div className="text-white font-medium text-xs mt-0.5">{sp.value}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setFlipped(false);
                              }}
                              className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded text-white text-xs font-semibold"
                            >
                              ← Retourner la carte
                            </button>
                          </div>
                        )}

                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Barre de commandes sous les cartes (Grandes zones tactiles) */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-zinc-900/90 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full shadow-2xl z-40">
                <button
                  onClick={handlePrev}
                  className="min-w-[40px] min-h-[40px] flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  aria-label="Modèle précédent"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {APPAREL_ITEMS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectCard(idx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        idx === activeIndex 
                          ? 'w-6 bg-[#E5B54F]' 
                          : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                      }`}
                      aria-label={`Aller au modèle ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="min-w-[40px] min-h-[40px] flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                  aria-label="Modèle suivant"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Colonne Droite : Explications simples du modèle sélectionné */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="p-6 sm:p-8 bg-[#101216] rounded-2xl border border-white/10 shadow-xl">
                
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-mono text-[#E5B54F]">
                    MODÈLE {activeItem.code} · {activeItem.category}
                  </div>

                  <button
                    onClick={() => setFlipped(!flipped)}
                    className="min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-lg border border-white/10 transition-colors cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>{flipped ? 'Voir la Photo' : 'Détails Tissu'}</span>
                  </button>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                  {activeItem.title}
                </h3>

                <p className="text-sm text-zinc-300 leading-relaxed mb-5">
                  {activeItem.description}
                </p>

                {/* Explication pratique pour le client */}
                <div className="mb-5 p-3.5 bg-zinc-900/80 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5B54F]" />
                    <span>Pourquoi c'est un excellent choix ?</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {activeItem.simpleDescription}
                  </p>
                </div>

                {/* Choix des couleurs */}
                <div className="mb-6">
                  <div className="text-xs font-semibold text-zinc-400 mb-2">
                    Couleurs disponibles :
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {activeItem.colorways.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColorway(i)}
                        className={`min-h-[36px] flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                          selectedColorway === i 
                            ? 'border-[#E5B54F] bg-white/5 text-white' 
                            : 'border-white/10 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <span 
                          className="w-3 h-3 rounded-full border border-white/20 shrink-0" 
                          style={{ backgroundColor: c.hex }} 
                        />
                        <span>{c.name}</span>
                        {selectedColorway === i && <Check className="w-3 h-3 text-[#E5B54F]" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bouton pour commander ou demander un devis */}
                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="#devis"
                    className="w-full sm:flex-1 min-h-[46px] text-center py-3 text-xs font-bold uppercase tracking-wider text-[#08090B] bg-[#E5B54F] hover:bg-[#F2C768] rounded-lg transition-colors flex items-center justify-center"
                  >
                    Estimer le Prix en FCFA
                  </a>
                  <button
                    onClick={() => setLightboxItem(activeItem)}
                    className="w-full sm:w-auto min-h-[46px] px-4 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Agrandir
                  </button>
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* =========================================================================
             VUE TOUS LES MODÈLES (GRILLE)
             ========================================================================= */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {APPAREL_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                className="group bg-[#111317] rounded-xl overflow-hidden border border-white/10 hover:border-white/25 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-black">
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-black/80 backdrop-blur-md rounded text-[10px] font-mono text-white">
                    {item.code}
                  </div>
                  <button
                    onClick={() => setLightboxItem(item)}
                    className="absolute bottom-2.5 right-2.5 p-2 bg-black/80 hover:bg-black text-white rounded transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-semibold text-[#E5B54F] mb-1">
                      {item.category} · {item.weightGsm}g/m²
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      {item.simpleDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-zinc-400">
                      {item.specs[0].value}
                    </span>
                    <button
                      onClick={() => {
                        setActiveIndex(idx);
                        setViewMode('cascade');
                      }}
                      className="text-xs font-semibold text-[#E5B54F] hover:underline cursor-pointer"
                    >
                      Voir en détail →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modale d'agrandissement de l'image */}
      {lightboxItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150"
          onClick={() => setLightboxItem(null)}
        >
          <div 
            className="relative max-w-4xl max-h-[90vh] bg-[#101216] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="md:w-3/5 bg-black flex items-center justify-center p-3 sm:p-4">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[60vh] md:max-h-[75vh] w-auto object-contain rounded-lg"
              />
            </div>

            <div className="md:w-2/5 p-5 sm:p-6 flex flex-col justify-between text-white overflow-y-auto">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-[#E5B54F]">{lightboxItem.code} · ZOOM MODÈLE</span>
                  <button
                    onClick={() => setLightboxItem(null)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-lg font-bold mb-1.5">{lightboxItem.title}</h3>
                <p className="text-xs text-zinc-300 mb-4">{lightboxItem.tagline}</p>

                <div className="space-y-2 text-xs mb-4">
                  <div className="p-2.5 bg-zinc-900 rounded border border-white/5">
                    <span className="text-zinc-400 block text-[10px] uppercase font-mono">Tissu</span>
                    <span className="text-white font-medium">{lightboxItem.material}</span>
                  </div>

                  <div className="p-2.5 bg-zinc-900 rounded border border-white/5">
                    <span className="text-zinc-400 block text-[10px] uppercase font-mono">Impression</span>
                    <span className="text-white font-medium">{lightboxItem.printTechnique}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-zinc-400 font-medium">{lightboxItem.weightGsm}g/m²</span>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="px-4 py-2 bg-[#E5B54F] text-[#08090B] text-xs font-bold uppercase rounded-lg"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
