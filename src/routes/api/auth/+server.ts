import { json } from '@sveltejs/kit';
import { SECRET_ADD_POST_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

const SECRET_KEY = SECRET_ADD_POST_KEY;
if (!SECRET_KEY) {
  throw new Error('SECRET_ADD_POST_KEY is not configured');
}

const SESSION_MAX_AGE = 3600;

export const POST: RequestHandler = async ({ request, cookies }) => {
  const body = await request.json();
  const { secret_key } = body as Record<string, string | undefined>;

  if (!secret_key || secret_key !== SECRET_KEY) {
    return json({ success: false, error: 'รหัสสำหรับบันทึกผลงานไม่ถูกต้อง!' }, { status: 401 });
  }

  const sessionToken = crypto.randomUUID();

  cookies.set('portfolio_session', sessionToken, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE
  });

  return json({ success: true });
};
