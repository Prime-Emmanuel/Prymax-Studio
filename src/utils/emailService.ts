export type SupportedEmailLanguage = 'fr' | 'en';

export interface EmailDemandPayload {
  type: 'newsletter' | 'configurator' | 'contact-devis' | 'devis' | 'contact';
  language?: SupportedEmailLanguage;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  services?: string[];
  options?: Record<string, string | string[]>;
  budget?: string;
  deadline?: string;
  message?: string;
}

export interface EmailDemandResult {
  ok: boolean;
  referenceId: string;
  type?: string;
  language?: SupportedEmailLanguage;
  alreadySubscribed?: boolean;
  message?: string;
  error?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Détecte la langue active du site ('fr' ou 'en').
 * Vérifie dans l'ordre :
 * 1. Paramètre d'URL (?lang=en / ?lang=fr)
 * 2. Préférence stockée (localStorage: prymax_lang / lang / language)
 * 3. Attribut <html lang="..."> du document (ex: traduction navigateur ou état DOM)
 * 4. Langue du navigateur si <html lang> n'est pas défini
 * 5. Français ('fr') par défaut
 */
export function detectActiveWebsiteLanguage(): SupportedEmailLanguage {
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = (params.get('lang') || params.get('language') || '').trim().toLowerCase();
      if (urlLang === 'en' || urlLang.startsWith('en-')) return 'en';
      if (urlLang === 'fr' || urlLang.startsWith('fr-')) return 'fr';
    } catch {
      // Ignorer erreurs d'URL
    }

    try {
      const storedLang = (
        localStorage.getItem('prymax_lang') ||
        localStorage.getItem('lang') ||
        localStorage.getItem('language') ||
        localStorage.getItem('i18nextLng') ||
        ''
      )
        .trim()
        .toLowerCase();
      if (storedLang === 'en' || storedLang.startsWith('en-')) return 'en';
      if (storedLang === 'fr' || storedLang.startsWith('fr-')) return 'fr';
    } catch {
      // Ignorer restrictions localStorage
    }
  }

  if (typeof document !== 'undefined' && document.documentElement) {
    const htmlLang = (document.documentElement.getAttribute('lang') || '').trim().toLowerCase();
    if (htmlLang === 'en' || htmlLang.startsWith('en-')) return 'en';
    if (htmlLang === 'fr' || htmlLang.startsWith('fr-')) return 'fr';
  }

  if (typeof navigator !== 'undefined' && navigator.language) {
    const navLang = navigator.language.trim().toLowerCase();
    if (navLang.startsWith('en')) return 'en';
  }

  return 'fr';
}

export async function sendDemandEmail(
  payload: EmailDemandPayload,
  callbacks?: {
    onSlowRequest?: (hint: string) => void;
  }
): Promise<EmailDemandResult> {
  const language: SupportedEmailLanguage =
    payload.language === 'en' || payload.language === 'fr'
      ? payload.language
      : detectActiveWebsiteLanguage();

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw new Error(
      language === 'en'
        ? 'No internet connection detected. Please check your network and try again.'
        : 'Aucune connexion Internet détectée. Veuillez vérifier votre réseau et réessayer.'
    );
  }

  const normalizedEmail = (payload.email || '').trim().toLowerCase();

  // Validation stricte de l'adresse email pour les 3 formulaires
  if (!normalizedEmail || !EMAIL_REGEX.test(normalizedEmail)) {
    throw new Error(
      language === 'en'
        ? 'Please enter a valid email address (e.g. name@company.com).'
        : 'Veuillez saisir une adresse email valide (ex: nom@entreprise.com).'
    );
  }

  if (payload.type !== 'newsletter') {
    if (!payload.name || payload.name.trim().length < 2) {
      throw new Error(
        language === 'en'
          ? 'Please provide your full name or company name.'
          : 'Veuillez renseigner votre nom complet ou le nom de votre entreprise.'
      );
    }
  }

  const slowTimer1 = setTimeout(() => {
    callbacks?.onSlowRequest?.(
      language === 'en' ? 'Almost there, just a second...' : 'Presque prêt, encore une seconde...'
    );
  }, 1200);

  const slowTimer2 = setTimeout(() => {
    callbacks?.onSlowRequest?.(
      language === 'en'
        ? 'Connection is slightly slow, finalizing transmission...'
        : 'Connexion légèrement lente, finalisation de la transmission...'
    );
  }, 3200);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        email: normalizedEmail,
        language,
      }),
      signal: controller.signal,
    });

    clearTimeout(slowTimer1);
    clearTimeout(slowTimer2);
    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (!response.ok || !data || data.ok !== true) {
      throw new Error(
        data?.error ||
          (language === 'en'
            ? 'An error occurred while sending your request. Please try again.'
            : 'Une erreur est survenue lors de la transmission. Veuillez réessayer.')
      );
    }

    const refId = data.referenceId;

    if (payload.type !== 'newsletter') {
      try {
        const history = JSON.parse(localStorage.getItem('prymax_demands_history') || '[]');
        history.unshift({
          referenceId: refId,
          createdAt: new Date().toISOString(),
          ...payload,
          language,
        });
        localStorage.setItem('prymax_demands_history', JSON.stringify(history.slice(0, 20)));
      } catch {
        // Ignorer si localStorage est restreint
      }
    }

    return {
      ok: true,
      referenceId: refId,
      type: data.type,
      language: data.language || language,
      alreadySubscribed: Boolean(data.alreadySubscribed),
      message: data.message,
    };
  } catch (err) {
    clearTimeout(slowTimer1);
    clearTimeout(slowTimer2);
    clearTimeout(timeoutId);

    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error(
        language === 'en'
          ? 'The connection timed out (unstable internet connection). Please check your network and try again.'
          : 'Le délai de connexion a expiré (connexion Internet instable). Veuillez vérifier votre réseau et réessayer.'
      );
    }
    throw err instanceof Error
      ? err
      : new Error(
          language === 'en'
            ? 'Unable to send your request right now.'
            : 'Impossible de transmettre la demande pour le moment.'
        );
  }
}
