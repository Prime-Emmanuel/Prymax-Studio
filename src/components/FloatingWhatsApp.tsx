import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const phoneNumber = '237681078004';
  const defaultMessage = encodeURIComponent('Bonjour PRYMAX STUDIO, je souhaite des informations sur vos services et obtenir un devis.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="Contact direct WhatsApp" className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center">

      {/* Bouton Flottant WhatsApp Stylé */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter PRYMAX STUDIO sur WhatsApp"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.6)] transition-all duration-200 cursor-pointer relative"
      >
        {/* Point vert subtil signalant la disponibilité */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 bg-[#25D366] rounded-full animate-pulse" />
        </span>
        <MessageCircle className="w-7 h-7 fill-white stroke-[#25D366]" />
      </a>
    </aside>
  );
};
