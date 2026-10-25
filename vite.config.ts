import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import type {Plugin} from 'vite';
import {processEmailRequest} from './api/send-email.js';

function resendApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'prymax-resend-api',
    configureServer(server) {
      server.middlewares.use('/api/send-email', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, error: 'Méthode non autorisée' }));
          return;
        }

        let rawBody = '';
        req.on('data', chunk => {
          rawBody += chunk;
        });

        req.on('end', async () => {
          try {
            const payload = rawBody ? JSON.parse(rawBody) : {};
            const result = await processEmailRequest(payload, env);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (err: unknown) {
            const statusCode =
              err && typeof err === 'object' && 'statusCode' in err && typeof (err as {statusCode?: unknown}).statusCode === 'number'
                ? (err as {statusCode: number}).statusCode
                : 500;
            const message =
              err instanceof Error ? err.message : 'Erreur lors du traitement de la demande.';
            res.statusCode = statusCode;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: false, error: message }));
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
