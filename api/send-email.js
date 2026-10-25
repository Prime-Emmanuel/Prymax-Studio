// Vercel Serverless Function — Envoi d'emails via Resend REST API
// Compatible nativement avec Vercel sans dépendance externe lourde

const STUDIO_EMAIL = process.env.STUDIO_NOTIFICATION_EMAIL || 'prymaxstudio@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'PRYMAX STUDIO <contact@prymaxstudio.com>';

function buildStudioHtml(payload, refId) {
  const {
    type = 'devis',
    name = 'Client',
    email = 'Non renseigné',
    phone = 'Non renseigné',
    company = 'Non renseigné',
    services = [],
    options = {},
    budget = 'Non précisé',
    deadline = 'Non précisé',
    message = ''
  } = payload;

  const servicesHtml = Array.isArray(services) && services.length > 0
    ? services.map(s => `<li style="margin-bottom:6px;">${s}</li>`).join('')
    : '<li>Aucune prestation spécifique pré-cochée</li>';

  const optionsEntries = Object.entries(options || {}).filter(([, v]) =>
    Array.isArray(v) ? v.length > 0 : Boolean(v)
  );

  const optionsHtml = optionsEntries.length > 0
    ? optionsEntries
        .map(([k, v]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">${k}</td><td style="padding:8px 12px;border-bottom:1px solid #222;color:#fff;font-size:13px;font-weight:600;">${Array.isArray(v) ? v.join(', ') : v}</td></tr>`)
        .join('')
    : '';

  return `
    <div style="font-family:Inter,system-ui,sans-serif;background:#08090D;color:#F5F7FA;padding:32px;border-radius:16px;max-width:640px;margin:0 auto;border:1px solid #27272a;">
      <div style="border-bottom:1px solid #27272a;padding-bottom:16px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#E5B54F;font-weight:700;">PRYMAX STUDIO · NOTIFICATION DIRECTE</span>
          <h1 style="margin:6px 0 0;font-size:22px;color:#ffffff;">Nouvelle demande (${type.toUpperCase()})</h1>
        </div>
        <span style="font-family:monospace;background:#18181b;border:1px solid #3f3f46;color:#E5B54F;padding:6px 10px;border-radius:8px;font-size:12px;">${refId}</span>
      </div>

      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;background:#101217;border-radius:12px;overflow:hidden;">
        <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Nom / Contact</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#fff;font-size:14px;font-weight:700;">${name}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Email</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#fff;font-size:13px;">${email}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Téléphone</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#fff;font-size:13px;">${phone}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Entreprise</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#fff;font-size:13px;">${company}</td></tr>
        <tr><td style="padding:10px 14px;border-bottom:1px solid #222;color:#a1a1aa;font-size:13px;">Budget estimé</td><td style="padding:10px 14px;border-bottom:1px solid #222;color:#E5B54F;font-size:13px;font-weight:700;">${budget}</td></tr>
        <tr><td style="padding:10px 14px;color:#a1a1aa;font-size:13px;">Délai souhaité</td><td style="padding:10px 14px;color:#fff;font-size:13px;">${deadline}</td></tr>
      </table>

      <div style="margin-bottom:20px;">
        <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#a1a1aa;margin-bottom:10px;">Prestations sélectionnées</h3>
        <ul style="background:#101217;padding:16px 16px 16px 32px;border-radius:12px;margin:0;color:#fff;font-size:13px;">
          ${servicesHtml}
        </ul>
      </div>

      ${optionsHtml ? `
        <div style="margin-bottom:20px;">
          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#a1a1aa;margin-bottom:10px;">Options du Configurateur Sur-Mesure</h3>
          <table style="width:100%;border-collapse:collapse;background:#101217;border-radius:12px;overflow:hidden;">
            ${optionsHtml}
          </table>
        </div>
      ` : ''}

      ${message ? `
        <div style="margin-bottom:20px;">
          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:1px;color:#a1a1aa;margin-bottom:8px;">Notes & Précisions</h3>
          <div style="background:#101217;padding:14px;border-radius:12px;color:#e4e4e7;font-size:13px;line-height:1.6;white-space:pre-wrap;">${message}</div>
        </div>
      ` : ''}

      <div style="margin-top:28px;padding-top:16px;border-top:1px solid #27272a;font-size:11px;color:#71717a;text-align:center;">
        PRYMAX STUDIO · Système Automatisé de Gestion des Demandes
      </div>
    </div>
  `;
}

function buildClientAutoReplyHtml(payload, refId) {
  const { name = 'Madame, Monsieur', type = 'devis', services = [] } = payload;
  const isNewsletter = type === 'newsletter';

  return `
    <div style="font-family:Inter,system-ui,sans-serif;background:#08090D;color:#F5F7FA;padding:32px;border-radius:16px;max-width:600px;margin:0 auto;border:1px solid #27272a;">
      <div style="border-bottom:1px solid #27272a;padding-bottom:16px;margin-bottom:24px;">
        <span style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#E5B54F;font-weight:700;">PRYMAX STUDIO</span>
        <h1 style="margin:6px 0 0;font-size:20px;color:#ffffff;">
          ${isNewsletter ? 'Bienvenue dans le réseau PRYMAX STUDIO' : 'Confirmation de réception de votre demande'}
        </h1>
      </div>

      <p style="font-size:14px;line-height:1.6;color:#e4e4e7;">
        Bonjour <strong>${name}</strong>,
      </p>

      <p style="font-size:14px;line-height:1.6;color:#d4d4d8;">
        ${isNewsletter
          ? 'Votre inscription a bien été enregistrée. Vous recevrez nos prochaines analyses stratégiques, études de cas et nouveautés digitales.'
          : `Nous avons bien reçu votre demande (Référence <strong>${refId}</strong>). Notre direction technique analyse actuellement vos besoins afin de vous transmettre une proposition sur-mesure sous 24h ouvrées.`
        }
      </p>

      ${!isNewsletter && Array.isArray(services) && services.length > 0 ? `
        <div style="background:#101217;border:1px solid #27272a;padding:16px;border-radius:12px;margin:20px 0;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#E5B54F;margin-bottom:8px;font-weight:700;">Récapitulatif de vos choix</div>
          <div style="font-size:13px;color:#ffffff;line-height:1.6;">
            ${services.map(s => `• ${s}`).join('<br/>')}
          </div>
        </div>
      ` : ''}

      <p style="font-size:13px;line-height:1.6;color:#a1a1aa;margin-top:24px;">
        Cordialement,<br/>
        <strong style="color:#ffffff;">L'équipe PRYMAX STUDIO</strong><br/>
        <a href="mailto:prymaxstudio@gmail.com" style="color:#E5B54F;text-decoration:none;">prymaxstudio@gmail.com</a>
      </p>
    </div>
  `;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Méthode non autorisée' });
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const refId = `PX-${Math.floor(100000 + Math.random() * 900000)}`;
    const apiKey = process.env.RESEND_API_KEY;

    // Si la clé RESEND_API_KEY est configurée, on envoie les emails via Resend
    if (apiKey && apiKey.trim() !== '') {
      const subjectMap = {
        devis: `[DEVIS ${refId}] Nouvelle demande de ${payload.name || 'Client'}`,
        contact: `[CONTACT ${refId}] Nouveau message de ${payload.name || 'Client'}`,
        newsletter: `[NEWSLETTER] Nouvel abonné : ${payload.email || ''}`
      };

      const studioResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: FROM_EMAIL,
          to: [STUDIO_EMAIL],
          reply_to: payload.email || STUDIO_EMAIL,
          subject: subjectMap[payload.type] || `[PRYMAX ${refId}] Nouvelle demande`,
          html: buildStudioHtml(payload, refId)
        })
      });

      if (!studioResponse.ok) {
        const errData = await studioResponse.json().catch(() => ({}));
        return res.status(502).json({
          ok: false,
          error: errData.message || 'Erreur lors de la transmission via Resend.'
        });
      }

      // Envoi automatique de l'accusé de réception au client s'il a renseigné son email
      if (payload.email && payload.email.includes('@')) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: FROM_EMAIL,
            to: [payload.email.trim()],
            reply_to: STUDIO_EMAIL,
            subject: payload.type === 'newsletter'
              ? 'Bienvenue chez PRYMAX STUDIO — Inscription confirmée'
              : `Votre demande ${refId} a bien été reçue — PRYMAX STUDIO`,
            html: buildClientAutoReplyHtml(payload, refId)
          })
        }).catch(() => {
          // En mode sandbox Resend sans domaine vérifié, l'envoi vers un tiers peut être restreint :
          // on ne bloque pas la confirmation principale destinée au studio.
        });
      }

      return res.status(200).json({
        ok: true,
        referenceId: refId,
        mode: 'resend_live'
      });
    }

    // Mode pré-configuration (si RESEND_API_KEY n'est pas encore renseignée dans les variables d'environnement)
    return res.status(200).json({
      ok: true,
      referenceId: refId,
      mode: 'ready_for_resend_key'
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Erreur interne du serveur'
    });
  }
}
