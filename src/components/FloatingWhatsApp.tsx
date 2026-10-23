import React from 'react';

export const FloatingWhatsApp: React.FC = () => {
  const phoneNumber = '237681078004';
  const defaultMessage = encodeURIComponent('Bonjour PRYMAX STUDIO, je souhaite des informations sur vos services de création de sites web et obtenir un devis.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <aside aria-label="Contact direct WhatsApp" className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center group">
      {/* Tooltip discret au survol sur desktop */}
      <div className="hidden sm:block mr-3 px-3 py-1.5 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Échanger sur WhatsApp (+237 681 078 004)
      </div>

      {/* Bouton Flottant WhatsApp Authentique */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter PRYMAX STUDIO sur WhatsApp (+237 681 078 004)"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.7)] transition-all duration-200 cursor-pointer relative"
      >
        {/* Point vert vif avec halo pulsant signalant la disponibilité en direct */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow">
          <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-ping opacity-75" />
          <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full absolute" />
        </span>

        {/* Véritable icône SVG officielle WhatsApp */}
        <svg
          viewBox="0 0 32 32"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-white drop-shadow-sm"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.01 2.002c-7.72 0-14 6.27-14 13.99 0 2.47.64 4.87 1.87 7L2 30l7.21-1.89c2.06 1.12 4.38 1.71 6.8 1.71 7.72 0 14-6.27 14-13.99 0-7.72-6.28-14-14-13.828zm0 25.59c-2.11 0-4.17-.57-5.97-1.64l-.43-.25-4.44 1.16 1.18-4.33-.28-.44c-1.18-1.87-1.8-4.04-1.8-6.27 0-6.43 5.23-11.66 11.66-11.66 3.12 0 6.05 1.22 8.25 3.42s3.42 5.14 3.42 8.25c.01 6.44-5.22 11.66-11.59 11.66zm6.39-8.73c-.35-.18-2.07-1.02-2.39-1.14-.32-.12-.55-.18-.78.18-.23.35-.9 1.14-1.1 1.38-.2.23-.41.26-.76.09-.35-.18-1.48-.55-2.82-1.74-1.04-.93-1.74-2.08-1.94-2.43-.2-.35-.02-.54.15-.72.16-.16.35-.41.53-.62.18-.2.23-.35.35-.59.12-.23.06-.44-.03-.62-.09-.18-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6-.2-.01-.44-.01-.67-.01s-.62.09-.94.44c-.32.35-1.24 1.21-1.24 2.96s1.27 3.43 1.45 3.67c.18.23 2.5 3.82 6.06 5.35.85.37 1.51.59 2.02.76.85.27 1.63.23 2.24.14.68-.1 2.07-.85 2.36-1.67.29-.82.29-1.53.2-1.67-.08-.14-.32-.23-.67-.41z" />
        </svg>
      </a>
    </aside>
  );
};
