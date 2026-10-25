export interface EmailDemandPayload {
  type: 'devis' | 'contact' | 'newsletter';
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
  mode?: string;
  error?: string;
}

export async function sendDemandEmail(
  payload: EmailDemandPayload,
  callbacks?: {
    onSlowRequest?: (hint: string) => void;
  }
): Promise<EmailDemandResult> {
  // Vérification de la connexion Internet
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw new Error(
      'Aucune connexion Internet détectée. Veuillez vérifier votre réseau et réessayer.'
    );
  }

  // Validation des champs selon le type de formulaire
  if (payload.type === 'newsletter') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!payload.email || !emailRegex.test(payload.email.trim())) {
      throw new Error('Veuillez saisir une adresse email valide (ex: nom@entreprise.com).');
    }
  } else {
    if (!payload.name || payload.name.trim().length < 2) {
      throw new Error('Veuillez renseigner votre nom complet ou le nom de votre entreprise.');
    }
    if ((!payload.email || !payload.email.trim()) && (!payload.phone || !payload.phone.trim())) {
      throw new Error('Veuillez indiquer au moins votre adresse email ou votre numéro de téléphone.');
    }
    if (payload.email && payload.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(payload.email.trim())) {
        throw new Error("Le format de l'adresse email saisie semble incorrect.");
      }
    }
  }

  // Timers progressifs si la requête prend du temps (connexion lente)
  const slowTimer1 = setTimeout(() => {
    callbacks?.onSlowRequest?.('Presque prêt, encore une seconde...');
  }, 1200);

  const slowTimer2 = setTimeout(() => {
    callbacks?.onSlowRequest?.('Connexion légèrement lente, finalisation de la transmission...');
  }, 3200);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(slowTimer1);
    clearTimeout(slowTimer2);
    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (!response.ok || (data && data.ok === false)) {
      throw new Error(
        data?.error || 'Une erreur est survenue lors de la transmission. Veuillez réessayer.'
      );
    }

    const refId = data?.referenceId || `PX-${Math.floor(100000 + Math.random() * 900000)}`;

    // Sauvegarde locale de sécurité de l'historique des demandes
    try {
      const history = JSON.parse(localStorage.getItem('prymax_demands_history') || '[]');
      history.unshift({
        referenceId: refId,
        createdAt: new Date().toISOString(),
        ...payload,
      });
      localStorage.setItem('prymax_demands_history', JSON.stringify(history.slice(0, 20)));
    } catch {
      // Ignorer si le stockage local est restreint
    }

    return {
      ok: true,
      referenceId: refId,
      mode: data?.mode || 'resend_live',
    };
  } catch (err) {
    clearTimeout(slowTimer1);
    clearTimeout(slowTimer2);
    clearTimeout(timeoutId);

    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error(
        'Le délai de connexion a expiré (connexion Internet instable). Veuillez vérifier votre réseau et réessayer.'
      );
    }
    throw err instanceof Error
      ? err
      : new Error('Impossible de transmettre la demande pour le moment.');
  }
}
