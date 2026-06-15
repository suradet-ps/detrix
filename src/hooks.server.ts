import type { Handle, HandleServerError } from '@sveltejs/kit';

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "connect-src 'self' https://*.supabase.co",
    "frame-ancestors 'none'"
  ].join('; ')
};

function addSecurityHeaders(response: Response): Response {
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  return response;
}

const requestCounts = new Map<string, { count: number; resetAt: number }>();

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

export const handle: Handle = async ({ event, resolve }) => {
  const start = Date.now();
  const method = event.request.method;
  const url = event.url.pathname;
  const ip = event.request.headers.get('x-forwarded-for') ?? event.getClientAddress() ?? 'unknown';

  if (WRITE_METHODS.has(method)) {
    const origin = event.request.headers.get('origin');
    const host = event.request.headers.get('host');
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return new Response(JSON.stringify({ error: 'Cross-site request forbidden' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch {
        return new Response(JSON.stringify({ error: 'Invalid origin' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    if (!rateLimit(ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Please try again later.' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json', 'Retry-After': '60' }
      });
    }
  }

  const response = await resolve(event);

  addSecurityHeaders(response);

  const duration = Date.now() - start;
  console.log(`${method} ${url} ${response.status} ${duration}ms - ${ip}`);

  return response;
};

export const handleError: HandleServerError = async ({ error, event }) => {
  console.error('Unhandled server error:', {
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
