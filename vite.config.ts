import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import type {Plugin} from 'vite';

function resendApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'prymax-resend-api',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'Method Not Allowed' }));
          return;
        }

        let rawBody = '';
        req.on('data', chunk => {
          rawBody += chunk;
        });

        req.on('end', async () => {
          try {
            const payload = rawBody ? JSON.parse(rawBody) : {};
            const refId = `PX-${Math.floor(100000 + Math.random() * 900000)}`;
            const apiKey = env.RESEND_API_KEY || process.env.RESEND_API_KEY;
            const fromEmail = env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL || 'PRYMAX STUDIO <contact@prymaxstudio.com>';
            const studioEmail = env.STUDIO_NOTIFICATION_EMAIL || process.env.STUDIO_NOTIFICATION_EMAIL || 'prymaxstudio@gmail.com';

            if (apiKey && apiKey.trim() !== '' && !apiKey.includes('votre_cle_api')) {
              const response = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${apiKey}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  from: fromEmail,
                  to: [studioEmail],
                  reply_to: payload.email || studioEmail,
                  subject: `[PRYMAX ${refId}] Nouvelle demande (${payload.type || 'devis'}) — ${payload.name || payload.email || 'Client'}`,
                  html: `<div style="font-family:sans-serif;padding:24px;background:#08090D;color:#fff;border-radius:12px;">
                    <h2 style="color:#E5B54F;margin-top:0;">Nouvelle demande PRYMAX STUDIO (${refId})</h2>
                    <p><strong>Nom :</strong> ${payload.name || 'Non précisé'}</p>
                    <p><strong>Email :</strong> ${payload.email || 'Non précisé'}</p>
                    <p><strong>Téléphone :</strong> ${payload.phone || 'Non précisé'}</p>
                    <p><strong>Entreprise :</strong> ${payload.company || 'Non précisé'}</p>
                    <p><strong>Budget :</strong> ${payload.budget || 'Non précisé'}</p>
                    <p><strong>Délai :</strong> ${payload.deadline || 'Non précisé'}</p>
                    <p><strong>Services :</strong> ${(payload.services || []).join(', ') || 'Aucun'}</p>
                    <p><strong>Options :</strong> ${JSON.stringify(payload.options || {})}</p>
                    <p><strong>Message :</strong> ${payload.message || 'Aucun'}</p>
                  </div>`
                }),
              });

              if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                res.statusCode = 502;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ ok: false, error: err.message || 'Erreur Resend' }));
                return;
              }

              if (payload.email && payload.email.includes('@')) {
                await fetch('https://api.resend.com/emails', {
                  method: 'POST',
                  headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    from: fromEmail,
                    to: [payload.email.trim()],
                    reply_to: studioEmail,
                    subject: payload.type === 'newsletter'
                      ? 'Bienvenue chez PRYMAX STUDIO — Inscription confirmée'
                      : `Confirmation de votre demande ${refId} — PRYMAX STUDIO`,
                    html: `<div style="font-family:sans-serif;padding:24px;background:#08090D;color:#fff;border-radius:12px;">
                      <h2 style="color:#E5B54F;margin-top:0;">PRYMAX STUDIO</h2>
                      <p>Bonjour ${payload.name || ''},</p>
                      <p>Nous avons bien reçu votre demande (Réf: <strong>${refId}</strong>). Notre équipe vous répond sous 24h ouvrées.</p>
                    </div>`
                  }),
                }).catch(() => {});
              }

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, referenceId: refId, mode: 'resend_live' }));
              return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, referenceId: refId, mode: 'ready_for_resend_key' }));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false, error: err instanceof Error ? err.message : 'Server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/',
    plugins: [react(), tailwindcss(), resendApiPlugin(env)],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
