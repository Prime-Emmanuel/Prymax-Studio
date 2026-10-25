// Vercel Serverless Function & Backend Handler — Système d'Emails PRYMAX STUDIO via Resend
import fs from 'fs';
import path from 'path';

const DEFAULT_STUDIO_EMAIL = 'prymaxstudio@gmail.com';
const DEFAULT_SENDER = 'PRYMAX STUDIO <hello@prymaxstudio.com>';
const VERIFIED_LOGO_URL = 'https://www.prymaxstudio.com/assets/branding/logo_transparent.png';

// Stockage en mémoire (pour l'instance en cours) + fichier local (en développement)
const memorySubscribers = new Set();

function getLocalSubscribersFilePath() {
  return path.resolve(process.cwd(), 'data', 'newsletter-subscribers.json');
}

function readLocalSubscribers() {
  try {
    const filePath = getLocalSubscribersFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed
          .map(item => (typeof item === 'string' ? item.toLowerCase() : item.email?.toLowerCase()))
          .filter(Boolean);
      }
    }
  } catch {
    // Environnement en lecture seule (ex: Vercel Serverless sans disque persistant)
  }
  return [];
}

function saveLocalSubscriber(email) {
  const normalized = email.trim().toLowerCase();
  memorySubscribers.add(normalized);
  try {
    const filePath = getLocalSubscribersFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const existing = readLocalSubscribers();
    if (!existing.includes(normalized)) {
      existing.push(normalized);
      fs.writeFileSync(
        filePath,
        JSON.stringify(
          existing.map(e => ({ email: e, subscribedAt: new Date().toISOString() })),
          null,
          2
        ),
        'utf-8'
      );
    }
    return true;
  } catch {
    return false;
  }
}

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed);
}

/**
 * Valide et normalise la langue ('fr' ou 'en').
 * Utilise 'fr' par défaut si aucune langue valide n'est fournie.
 */
export function normalizeLanguage(lang) {
  if (typeof lang === 'string') {
    const cleaned = lang.trim().toLowerCase();
    if (cleaned === 'en' || cleaned.startsWith('en-') || cleaned.startsWith('en_')) {
      return 'en';
    }
    if (cleaned === 'fr' || cleaned.startsWith('fr-') || cleaned.startsWith('fr_')) {
      return 'fr';
    }
  }
  return 'fr';
}

function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getCleanClientName(rawName) {
  if (!rawName || typeof rawName !== 'string') return '';
  const trimmed = rawName.trim();
  if (!trimmed) return '';
  const genericPlaceholders = ['visiteur', 'visitor', 'client', 'madame, monsieur', 'non renseigné'];
  if (genericPlaceholders.includes(trimmed.toLowerCase())) return '';
  return trimmed;
}

// ============================================================================
// GABARIT MINIMALISTE AGENCE — FOND BLANC (#FFFFFF), TYPO NOIRE, ACCENT #B99A5B
// ============================================================================

function renderMinimalistClientEmail({ lang, subject, paragraphs, signOffLine1, signOffLine2 }) {
  const htmlLang = lang === 'en' ? 'en' : 'fr';
  const ctaLabel = lang === 'en' ? 'Visit prymaxstudio.com' : 'Visiter prymaxstudio.com';

  const paragraphsHtml = paragraphs
    .map((p, index) => {
      const isGreeting = index === 0;
      return `<p style="margin:0 0 ${isGreeting ? '22px' : '18px'} 0;color:${
        isGreeting ? '#111111' : '#1A1A1A'
      };font-size:15px;line-height:1.75;font-weight:${isGreeting ? '500' : '400'};">${p}</p>`;
    })
    .join('\n              ');

  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#FFFFFF;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111111;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#FFFFFF;width:100%;margin:0;padding:0;">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;margin:0 auto;background-color:#FFFFFF;text-align:left;">
          <!-- Logo en haut à gauche + fin filet doré #B99A5B -->
          <tr>
            <td align="left" style="padding:24px 16px 24px 16px;">
              <a href="https://prymaxstudio.com" target="_blank" style="display:inline-block;text-decoration:none;">
                <img
                  src="${VERIFIED_LOGO_URL}"
                  alt="PRYMAX STUDIO"
                  width="106"
                  style="display:block;width:106px;max-width:110px;height:auto;border:0;outline:none;text-decoration:none;"
                />
              </a>
              <div style="width:36px;height:2px;background-color:#B99A5B;margin-top:22px;"></div>
            </td>
          </tr>

          <!-- Contenu principal aligné à gauche -->
          <tr>
            <td align="left" style="padding:4px 16px 36px 16px;font-size:15px;line-height:1.75;color:#1A1A1A;">
              ${paragraphsHtml}

              <p style="margin:28px 0 32px 0;color:#111111;font-size:15px;line-height:1.65;">
                ${escapeHtml(signOffLine1)}<br />
                <strong style="font-weight:600;color:#111111;">${escapeHtml(signOffLine2)}</strong>
              </p>

              <!-- Bouton discret vers le site web -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0;">
                <tr>
                  <td align="left" style="border-radius:6px;background-color:#111111;">
                    <a
                      href="https://prymaxstudio.com"
                      target="_blank"
                      style="display:inline-block;padding:11px 22px;font-size:12px;font-weight:600;letter-spacing:0.5px;color:#FFFFFF;text-decoration:none;border-radius:6px;"
                    >
                      ${escapeHtml(ctaLabel)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pied de page sobre -->
          <tr>
            <td align="left" style="padding:24px 16px 28px 16px;border-top:1px solid #EAEAEA;font-size:12px;line-height:1.6;color:#666666;">
              <div style="font-weight:600;color:#111111;letter-spacing:0.5px;margin-bottom:4px;">
                PRYMAX STUDIO
              </div>
              <div>
                <a href="https://prymaxstudio.com" target="_blank" style="color:#1A1A1A;text-decoration:none;">prymaxstudio.com</a>
                <span style="color:#B99A5B;padding:0 6px;">&middot;</span>
                <a href="mailto:prymaxstudio@gmail.com" style="color:#1A1A1A;text-decoration:none;">prymaxstudio@gmail.com</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * EMAIL 1 : Confirmation d'inscription à la Newsletter ("Restez informé")
 * Version FR ou EN séparée selon la langue active
 */
export function buildNewsletterConfirmationEmail(lang = 'fr') {
  const normalizedLang = normalizeLanguage(lang);

  if (normalizedLang === 'en') {
    const subject = "Welcome to PRYMAX STUDIO | You're subscribed";
    const paragraphs = [
      'Hello,',
      'Welcome to PRYMAX STUDIO, and thank you for subscribing.',
      "You'll receive our latest news, strategic insights, digital inspiration, and behind-the-scenes updates from our studio.",
      'Our goal is to share useful ideas and perspectives to help you strengthen your brand and digital presence.',
    ];
    const signOffLine1 = 'See you soon,';
    const signOffLine2 = 'The PRYMAX STUDIO Team';

    return {
      subject,
      html: renderMinimalistClientEmail({
        lang: 'en',
        subject,
        paragraphs,
        signOffLine1,
        signOffLine2,
      }),
      text: `${paragraphs.join('\n\n')}\n\n${signOffLine1}\n${signOffLine2}\n\nhttps://prymaxstudio.com | prymaxstudio@gmail.com`,
    };
  }

  const subject = 'Bienvenue chez PRYMAX STUDIO | Vous êtes inscrit';
  const paragraphs = [
    'Bonjour,',
    'Bienvenue chez PRYMAX STUDIO et merci de votre inscription.',
    'Vous recevrez nos actualités, nos analyses stratégiques, nos inspirations digitales et les coulisses de nos réalisations.',
    'Nous souhaitons vous partager des idées pertinentes et des perspectives utiles pour faire évoluer votre marque et renforcer votre présence digitale.',
  ];
  const signOffLine1 = 'À très bientôt,';
  const signOffLine2 = "L'équipe PRYMAX STUDIO";

  return {
    subject,
    html: renderMinimalistClientEmail({
      lang: 'fr',
      subject,
      paragraphs,
      signOffLine1,
      signOffLine2,
    }),
    text: `${paragraphs.join('\n\n')}\n\n${signOffLine1}\n${signOffLine2}\n\nhttps://prymaxstudio.com | prymaxstudio@gmail.com`,
  };
}

/**
 * EMAIL 2 : Confirmation Client — Configurateur Visuel Sur-Mesure
 * Version FR ou EN séparée selon la langue active
 */
export function buildConfiguratorConfirmationEmail(payload, lang = 'fr') {
  const normalizedLang = normalizeLanguage(lang);
  const clientName = getCleanClientName(payload?.name);

  if (normalizedLang === 'en') {
    const subject = 'Your Custom Project Request | PRYMAX STUDIO';
    const greetingHtml = clientName ? `Hello ${escapeHtml(clientName)},` : 'Hello,';
    const greetingText = clientName ? `Hello ${clientName},` : 'Hello,';
    const paragraphsHtml = [
      greetingHtml,
      'Thank you for taking the time to customize your project options with PRYMAX STUDIO.',
      'We have received your selections and contact details. Our team is currently reviewing your project preferences to prepare a tailored assessment aligned with your goals.',
      'We will get back to you within 24 business hours with a clear and structured proposal.',
      'If you would like to share any additional details in the meantime, simply reply to this email.',
    ];
    const paragraphsText = [
      greetingText,
      'Thank you for taking the time to customize your project options with PRYMAX STUDIO.',
      'We have received your selections and contact details. Our team is currently reviewing your project preferences to prepare a tailored assessment aligned with your goals.',
      'We will get back to you within 24 business hours with a clear and structured proposal.',
      'If you would like to share any additional details in the meantime, simply reply to this email.',
    ];
    const signOffLine1 = 'Best regards,';
    const signOffLine2 = 'The PRYMAX STUDIO Team';

    return {
      subject,
      html: renderMinimalistClientEmail({
        lang: 'en',
        subject,
        paragraphs: paragraphsHtml,
        signOffLine1,
        signOffLine2,
      }),
      text: `${paragraphsText.join('\n\n')}\n\n${signOffLine1}\n${signOffLine2}\n\nhttps://prymaxstudio.com | prymaxstudio@gmail.com`,
    };
  }

  const subject = 'Confirmation de votre projet sur-mesure | PRYMAX STUDIO';
  const greetingHtml = clientName ? `Bonjour ${escapeHtml(clientName)},` : 'Bonjour,';
  const greetingText = clientName ? `Bonjour ${clientName},` : 'Bonjour,';
  const paragraphsHtml = [
    greetingHtml,
    "Merci d'avoir pris le temps de personnaliser les options de votre projet avec PRYMAX STUDIO.",
    'Nous avons bien reçu vos sélections ainsi que vos coordonnées. Notre équipe analyse actuellement vos besoins afin de préparer une étude personnalisée et adaptée à vos objectifs.',
    'Nous reviendrons vers vous sous 24h ouvrées avec une proposition claire et structurée.',
    "Si vous souhaitez partager des éléments complémentaires d'ici là, vous pouvez répondre directement à cet email.",
  ];
  const paragraphsText = [
    greetingText,
    "Merci d'avoir pris le temps de personnaliser les options de votre projet avec PRYMAX STUDIO.",
    'Nous avons bien reçu vos sélections ainsi que vos coordonnées. Notre équipe analyse actuellement vos besoins afin de préparer une étude personnalisée et adaptée à vos objectifs.',
    'Nous reviendrons vers vous sous 24h ouvrées avec une proposition claire et structurée.',
    "Si vous souhaitez partager des éléments complémentaires d'ici là, vous pouvez répondre directement à cet email.",
  ];
  const signOffLine1 = 'Bien cordialement,';
  const signOffLine2 = "L'équipe PRYMAX STUDIO";

  return {
    subject,
    html: renderMinimalistClientEmail({
      lang: 'fr',
      subject,
      paragraphs: paragraphsHtml,
      signOffLine1,
      signOffLine2,
    }),
    text: `${paragraphsText.join('\n\n')}\n\n${signOffLine1}\n${signOffLine2}\n\nhttps://prymaxstudio.com | prymaxstudio@gmail.com`,
  };
}

/**
 * EMAIL 3 : Confirmation Client — Formulaire "PRYMAX STUDIO · Contact & Devis"
 * Version FR ou EN séparée selon la langue active
 */
export function buildContactQuoteConfirmationEmail(payload, lang = 'fr') {
  const normalizedLang = normalizeLanguage(lang);
  const clientName = getCleanClientName(payload?.name);

  if (normalizedLang === 'en') {
    const subject = "We've Received Your Quote Request | PRYMAX STUDIO";
    const greetingHtml = clientName ? `Hello ${escapeHtml(clientName)},` : 'Hello,';
    const greetingText = clientName ? `Hello ${clientName},` : 'Hello,';
    const paragraphsHtml = [
      greetingHtml,
      'Thank you for contacting PRYMAX STUDIO.',
      'We have received your quote request. Our team is reviewing your project and the information provided so we can come back to you with a clear, relevant approach tailored to your goals.',
      'We will follow up with you shortly regarding the next steps.',
      'Feel free to reply directly to this email if you would like to add any details or share a useful document.',
    ];
    const paragraphsText = [
      greetingText,
      'Thank you for contacting PRYMAX STUDIO.',
      'We have received your quote request. Our team is reviewing your project and the information provided so we can come back to you with a clear, relevant approach tailored to your goals.',
      'We will follow up with you shortly regarding the next steps.',
      'Feel free to reply directly to this email if you would like to add any details or share a useful document.',
    ];
    const signOffLine1 = 'Best regards,';
    const signOffLine2 = 'The PRYMAX STUDIO Team';

    return {
      subject,
      html: renderMinimalistClientEmail({
        lang: 'en',
        subject,
        paragraphs: paragraphsHtml,
        signOffLine1,
        signOffLine2,
      }),
      text: `${paragraphsText.join('\n\n')}\n\n${signOffLine1}\n${signOffLine2}\n\nhttps://prymaxstudio.com | prymaxstudio@gmail.com`,
    };
  }

  const subject = 'Confirmation de votre demande de devis | PRYMAX STUDIO';
  const greetingHtml = clientName ? `Bonjour ${escapeHtml(clientName)},` : 'Bonjour,';
  const greetingText = clientName ? `Bonjour ${clientName},` : 'Bonjour,';
  const paragraphsHtml = [
    greetingHtml,
    "Merci d'avoir contacté PRYMAX STUDIO.",
    'Votre demande de devis a bien été reçue. Notre équipe prend connaissance de votre projet et des informations transmises afin de vous proposer une approche claire, pertinente et adaptée à vos objectifs.',
    'Nous reviendrons vers vous dans les meilleurs délais pour la suite de votre demande.',
    'Vous pouvez répondre directement à cet email si vous souhaitez ajouter une précision ou partager un document utile.',
  ];
  const paragraphsText = [
    greetingText,
    "Merci d'avoir contacté PRYMAX STUDIO.",
    'Votre demande de devis a bien été reçue. Notre équipe prend connaissance de votre projet et des informations transmises afin de vous proposer une approche claire, pertinente et adaptée à vos objectifs.',
    'Nous reviendrons vers vous dans les meilleurs délais pour la suite de votre demande.',
    'Vous pouvez répondre directement à cet email si vous souhaitez ajouter une précision ou partager un document utile.',
  ];
  const signOffLine1 = 'Bien cordialement,';
  const signOffLine2 = "L'équipe PRYMAX STUDIO";

  return {
    subject,
    html: renderMinimalistClientEmail({
      lang: 'fr',
      subject,
      paragraphs: paragraphsHtml,
      signOffLine1,
      signOffLine2,
    }),
    text: `${paragraphsText.join('\n\n')}\n\n${signOffLine1}\n${signOffLine2}\n\nhttps://prymaxstudio.com | prymaxstudio@gmail.com`,
  };
}

/**
 * Notification interne envoyée à prymaxstudio@gmail.com
 */
function buildStudioNotificationHtml(payload, refId, lang = 'fr') {
  const {
    type = 'devis',
    name = 'Visiteur',
    email = 'Non renseigné',
    phone = 'Non renseigné',
    company = 'Non renseigné',
    services = [],
    options = {},
    budget = 'Non précisé',
    deadline = 'Non précisé',
    message = '',
  } = payload;

  const servicesHtml =
    Array.isArray(services) && services.length > 0
      ? services.map(s => `<li style="margin-bottom:6px;">${escapeHtml(s)}</li>`).join('')
      : '<li>Aucune prestation spécifique cochée</li>';

  const optionsEntries = Object.entries(options || {}).filter(([, v]) =>
    Array.isArray(v) ? v.length > 0 : Boolean(v)
  );

  const optionsHtml =
    optionsEntries.length > 0
      ? optionsEntries
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">${escapeHtml(
                k
              )}</td><td style="padding:8px 12px;border-bottom:1px solid #222;color:#fff;font-size:13px;font-weight:600;">${escapeHtml(
                Array.isArray(v) ? v.join(', ') : v
              )}</td></tr>`
          )
          .join('')
      : '';

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8" /></head>
<body style="font-family:Inter,system-ui,sans-serif;background:#050608;color:#F5F7FA;padding:24px;">
  <div style="background:#0B0D12;color:#F5F7FA;padding:28px;border-radius:16px;max-width:640px;margin:0 auto;border:1px solid #27272a;">
    <div style="border-bottom:1px solid #27272a;padding-bottom:16px;margin-bottom:24px;">
      <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#B99A5B;font-weight:700;">PRYMAX STUDIO · NOTIFICATION INTERNE (${escapeHtml(
        refId
      )})</span>
      <h1 style="margin:6px 0 0;font-size:20px;color:#ffffff;">Nouvelle soumission : ${escapeHtml(
        type.toUpperCase()
      )}</h1>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:20px;background:#101217;border-radius:12px;overflow:hidden;">
      <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Nom / Contact</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#fff;font-size:14px;font-weight:700;">${escapeHtml(
        name
      )}</td></tr>
      <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#fff;font-size:13px;">${escapeHtml(
        email
      )}</td></tr>
      <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Téléphone</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#fff;font-size:13px;">${escapeHtml(
        phone
      )}</td></tr>
      <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Entreprise</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#fff;font-size:13px;">${escapeHtml(
        company
      )}</td></tr>
      <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Budget estimé</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#B99A5B;font-size:13px;font-weight:700;">${escapeHtml(
        budget
      )}</td></tr>
      <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Délai souhaité</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#fff;font-size:13px;">${escapeHtml(
        deadline
      )}</td></tr>
      <tr><td style="padding:10px 14px;color:#a1a1aa;font-size:13px;">Langue email client</td><td style="padding:10px 14px;color:#fff;font-size:13px;text-transform:uppercase;">${escapeHtml(
        lang
      )}</td></tr>
    </table>

    <div style="margin-bottom:20px;">
      <h3 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#a1a1aa;margin-bottom:8px;">Prestations sélectionnées</h3>
      <ul style="background:#101217;padding:16px 16px 16px 32px;border-radius:12px;margin:0;color:#fff;font-size:13px;">
        ${servicesHtml}
      </ul>
    </div>

    ${
      optionsHtml
        ? `
      <div style="margin-bottom:20px;">
        <h3 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#a1a1aa;margin-bottom:8px;">Options du Configurateur</h3>
        <table style="width:100%;border-collapse:collapse;background:#101217;border-radius:12px;overflow:hidden;">
          ${optionsHtml}
        </table>
      </div>
    `
        : ''
    }

    ${
      message
        ? `
      <div style="margin-bottom:20px;">
        <h3 style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#a1a1aa;margin-bottom:8px;">Message / Précisions</h3>
        <div style="background:#101217;padding:14px;border-radius:12px;color:#e4e4e7;font-size:13px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
          message
        )}</div>
      </div>
    `
        : ''
    }
  </div>
</body>
</html>`;
}

async function sendResendEmail(apiKey, emailPayload, attempt = 1) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailPayload),
  });

  if (response.status === 429 && attempt < 3) {
    await new Promise(resolve => setTimeout(resolve, 750 * attempt));
    return sendResendEmail(apiKey, emailPayload, attempt + 1);
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const err = new Error(data?.message || data?.error || `Erreur Resend (${response.status})`);
    err.statusCode = response.status >= 400 && response.status < 600 ? response.status : 502;
    throw err;
  }
  return data;
}

/**
 * Gestion des abonnés Newsletter via Resend Audiences (si RESEND_AUDIENCE_ID est défini)
 * + vérification locale en développement.
 */
async function checkAndSaveNewsletterSubscriber(apiKey, audienceId, rawEmail, lang = 'fr') {
  const normalizedEmail = rawEmail.trim().toLowerCase();
  const duplicateMsg =
    lang === 'en'
      ? 'This email address is already subscribed to the PRYMAX STUDIO newsletter.'
      : 'Cette adresse email est déjà inscrite à la newsletter PRYMAX STUDIO.';

  // 1. Vérification doublon en mémoire ou fichier local (dev)
  const localList = readLocalSubscribers();
  if (memorySubscribers.has(normalizedEmail) || localList.includes(normalizedEmail)) {
    const dupError = new Error(duplicateMsg);
    dupError.statusCode = 409;
    throw dupError;
  }

  // 2. Si RESEND_AUDIENCE_ID est configuré, vérifier et enregistrer dans Resend Audiences
  if (audienceId && audienceId.trim() !== '') {
    const cleanAudienceId = audienceId.trim();

    const listRes = await fetch(`https://api.resend.com/audiences/${cleanAudienceId}/contacts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (listRes.ok) {
      const listData = await listRes.json().catch(() => ({}));
      const contacts = Array.isArray(listData?.data) ? listData.data : [];
      const alreadyExists = contacts.some(
        c => typeof c.email === 'string' && c.email.trim().toLowerCase() === normalizedEmail
      );
      if (alreadyExists) {
        memorySubscribers.add(normalizedEmail);
        const dupError = new Error(duplicateMsg);
        dupError.statusCode = 409;
        throw dupError;
      }
    }

    const createRes = await fetch(`https://api.resend.com/audiences/${cleanAudienceId}/contacts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: normalizedEmail,
        unsubscribed: false,
      }),
    });

    if (!createRes.ok) {
      const errData = await createRes.json().catch(() => ({}));
      const storageErr = new Error(
        errData?.message ||
          (lang === 'en'
            ? 'Unable to save subscriber to Resend Audience.'
            : "Impossible d'enregistrer l'abonné dans la liste Resend Audience.")
      );
      storageErr.statusCode = 502;
      throw storageErr;
    }

    saveLocalSubscriber(normalizedEmail);
    return { persistentStorage: 'resend_audience', persisted: true };
  }

  // 3. Sauvegarde locale (fichier JSON sur serveur local + mémoire)
  const savedToFile = saveLocalSubscriber(normalizedEmail);
  return {
    persistentStorage: savedToFile ? 'local_file' : 'ephemeral_memory_only',
    persisted: false,
  };
}

export async function processEmailRequest(payload, envConfig = {}) {
  const apiKey = (envConfig.RESEND_API_KEY || process.env.RESEND_API_KEY || '').trim();
  const studioEmail = (
    envConfig.STUDIO_NOTIFICATION_EMAIL ||
    process.env.STUDIO_NOTIFICATION_EMAIL ||
    DEFAULT_STUDIO_EMAIL
  ).trim();
  const fromEmail = (
    envConfig.RESEND_FROM_EMAIL ||
    process.env.RESEND_FROM_EMAIL ||
    DEFAULT_SENDER
  ).trim();
  const audienceId = (
    envConfig.RESEND_AUDIENCE_ID ||
    process.env.RESEND_AUDIENCE_ID ||
    ''
  ).trim();

  // Validation et normalisation de la langue ('fr' par défaut)
  const language = normalizeLanguage(payload?.language);

  if (!apiKey || apiKey === 're_votre_cle_api_resend') {
    const err = new Error(
      language === 'en'
        ? 'The email service is not active yet: server variable RESEND_API_KEY is missing.'
        : "Le service d'envoi d'emails n'est pas encore actif : la variable serveur RESEND_API_KEY est manquante."
    );
    err.statusCode = 500;
    throw err;
  }

  const type = payload?.type || 'contact-devis';
  const clientEmail = (payload?.email || '').trim();
  const refId = `PX-${Math.floor(100000 + Math.random() * 900000)}`;

  // Validation stricte de l'adresse email client pour les 3 flux
  if (!isValidEmail(clientEmail)) {
    const err = new Error(
      language === 'en'
        ? 'Please enter a valid email address (e.g. name@company.com).'
        : 'Veuillez saisir une adresse email valide (ex: nom@entreprise.com).'
    );
    err.statusCode = 400;
    throw err;
  }

  // ==========================================================================
  // FLUX 1 : NEWSLETTER DU FOOTER ("Restez informé")
  // ==========================================================================
  if (type === 'newsletter') {
    const storageStatus = await checkAndSaveNewsletterSubscriber(
      apiKey,
      audienceId,
      clientEmail,
      language
    );

    const newsletterEmail = buildNewsletterConfirmationEmail(language);

    // 1. Envoi de l'email de bienvenue au visiteur dans sa langue (FR ou EN)
    await sendResendEmail(apiKey, {
      from: 'PRYMAX STUDIO <hello@prymaxstudio.com>',
      to: [clientEmail],
      reply_to: 'prymaxstudio@gmail.com',
      subject: newsletterEmail.subject,
      html: newsletterEmail.html,
      text: newsletterEmail.text,
    });

    // 2. Notification interne à prymaxstudio@gmail.com
    await sendResendEmail(apiKey, {
      from: fromEmail,
      to: [studioEmail],
      reply_to: clientEmail,
      subject: `[NEWSLETTER] Nouvel abonné (${language.toUpperCase()}) : ${clientEmail}`,
      html: buildStudioNotificationHtml(
        {
          type: 'newsletter',
          name: getCleanClientName(payload?.name) || clientEmail,
          email: clientEmail,
          message: `Nouvelle inscription à la newsletter "Restez informé" (langue email : ${language.toUpperCase()}, stockage : ${storageStatus.persistentStorage}).`,
        },
        refId,
        language
      ),
    });

    return {
      ok: true,
      referenceId: refId,
      type: 'newsletter',
      language,
      storage: storageStatus.persistentStorage,
      persisted: storageStatus.persisted,
    };
  }

  // Validation du nom pour les formulaires projet / contact
  if (!payload?.name || String(payload.name).trim().length < 2) {
    const err = new Error(
      language === 'en'
        ? 'Please provide your full name or company name.'
        : 'Veuillez renseigner votre nom complet ou le nom de votre entreprise.'
    );
    err.statusCode = 400;
    throw err;
  }

  // ==========================================================================
  // FLUX 2 : CONFIGURATEUR VISUEL SUR-MESURE
  // ==========================================================================
  if (type === 'configurator') {
    // 1. Envoi des détails complets à prymaxstudio@gmail.com
    await sendResendEmail(apiKey, {
      from: fromEmail,
      to: [studioEmail],
      reply_to: clientEmail,
      subject: `[CONFIGURATEUR ${refId}] Nouveau projet sur-mesure — ${payload.name}`,
      html: buildStudioNotificationHtml(payload, refId, language),
    });

    // 2. Envoi de l'email de confirmation au client dans sa langue (FR ou EN)
    const configuratorEmail = buildConfiguratorConfirmationEmail(payload, language);
    await sendResendEmail(apiKey, {
      from: 'PRYMAX STUDIO <hello@prymaxstudio.com>',
      to: [clientEmail],
      reply_to: 'prymaxstudio@gmail.com',
      subject: configuratorEmail.subject,
      html: configuratorEmail.html,
      text: configuratorEmail.text,
    });

    return {
      ok: true,
      referenceId: refId,
      type: 'configurator',
      language,
    };
  }

  // ==========================================================================
  // FLUX 3 : FORMULAIRE CONTACT & DEVIS ("PRYMAX STUDIO · Contact & Devis")
  // ==========================================================================
  // 1. Envoi des détails de la demande à prymaxstudio@gmail.com
  await sendResendEmail(apiKey, {
    from: fromEmail,
    to: [studioEmail],
    reply_to: clientEmail,
    subject: `[CONTACT & DEVIS ${refId}] Nouvelle demande — ${payload.name}`,
    html: buildStudioNotificationHtml(payload, refId, language),
  });

  // 2. Envoi de l'email de confirmation au client dans sa langue (FR ou EN)
  const contactQuoteEmail = buildContactQuoteConfirmationEmail(payload, language);
  await sendResendEmail(apiKey, {
    from: 'PRYMAX STUDIO <hello@prymaxstudio.com>',
    to: [clientEmail],
    reply_to: 'prymaxstudio@gmail.com',
    subject: contactQuoteEmail.subject,
    html: contactQuoteEmail.html,
    text: contactQuoteEmail.text,
  });

  return {
    ok: true,
    referenceId: refId,
    type: 'contact-devis',
    language,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Méthode non autorisée' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const result = await processEmailRequest(payload);
    return res.status(200).json(result);
  } catch (error) {
    const statusCode = error?.statusCode || 500;
    return res.status(statusCode).json({
      ok: false,
      error:
        error instanceof Error ? error.message : 'Erreur lors du traitement de la demande.',
    });
  }
}
