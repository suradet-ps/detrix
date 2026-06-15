import { json } from '@sveltejs/kit';
import { env as privateEnv } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const SESSION_MAX_AGE = 3600;

export const POST: RequestHandler = async ({ request, cookies }) => {
  const env = privateEnv as Record<string, string>;
  const secretKey = env.SECRET_ADD_POST_KEY;
  if (!secretKey) {
    return json({ success: false, error: 'Server configuration error' }, { status: 500 });
  }

  const body = await request.json();
  const { secret_key } = body as Record<string, string | undefined>;

  if (!secret_key || secret_key !== secretKey) {
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
