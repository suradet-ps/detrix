import type { Handle, HandleServerError } from '@sveltejs/kit';

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

function addSecurityHeaders(response: Response): void {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
}

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const requestCounts = new Map<string, RateLimitRecord>();
const CLEANUP_INTERVAL_MS = 60_000;

setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of requestCounts) {
    if (now > record.resetAt) {
      requestCounts.delete(ip);
    }
  }
}, CLEANUP_INTERVAL_MS);

function rateLimit(ip: string, maxRequests = 30, windowMs = 60000): boolean {
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

const WRITE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

function log(level: 'info' | 'error', message: string, meta?: Record<string, unknown>): void {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta
  };
  if (level === 'error') {
    console.error(JSON.stringify(entry));
  } else {
    console.log(JSON.stringify(entry));
  }
}

export const handle: Handle = async ({ event, resolve }) => {
  const start = Date.now();
  const method = event.request.method;
  const url = event.url.pathname;
  const ip = event.request.headers.get('x-forwarded-for') ?? event.getClientAddress() ?? 'unknown';

  if (WRITE_METHODS.has(method)) {
    const origin = event.request.headers.get('origin');
    const referer = event.request.headers.get('referer');
    const host = event.request.headers.get('host');

    if (host) {
      let requestHost: string | null = null;

      if (origin) {
        try {
          requestHost = new URL(origin).host;
        } catch {
          return new Response(JSON.stringify({ error: 'Invalid origin' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } else if (referer) {
        try {
          requestHost = new URL(referer).host;
        } catch {
          // Referer is optional, don't block on invalid referer
        }
      }

      if (requestHost && requestHost !== host) {
        log('info', 'CSRF rejection', { ip, url, origin: requestHost });
        return new Response(JSON.stringify({ error: 'Cross-site request forbidden' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    if (!rateLimit(ip)) {
      log('info', 'Rate limit exceeded', { ip, url });
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': '60' }
      });
    }
  }

  const response = await resolve(event);

  addSecurityHeaders(response);

  const duration = Date.now() - start;
  log('info', 'request', { method, url, status: response.status, duration, ip });

  return response;
};

export const handleError: HandleServerError = async ({ error, event }) => {
  log('error', 'Unhandled server error', {
    url: event.url.pathname,
    method: event.request.method,
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined
  });

  return {
    message: 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง',
    code: 500
  };
};
