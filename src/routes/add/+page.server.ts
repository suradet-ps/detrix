import { getSupabase } from '$lib/supabase/client';
import { json, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

const SECRET_KEY = process.env['VITE_ADD_POST_SECRET_KEY'] as string | undefined;

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  create: async ({ request }: RequestEvent) => {
    let body: Record<string, unknown>;

    const contentType = request.headers.get('content-type') ?? '';

    if (contentType.includes('application/json')) {
      body = await request.json();
    } else {
      const fd = await request.formData();
      body = Object.fromEntries(fd);
    }

    const title = body['title'] as string | undefined;
    const description = (body['description'] as string) ?? null;
    const category = body['category'] as string | undefined;
    const start_date = body['start_date'] as string | undefined;
    const end_date = (body['end_date'] as string) ?? null;
    const secretKey = body['secret_key'] as string | undefined;

    if (!secretKey || secretKey !== SECRET_KEY) {
      return json({ success: false, error: 'รหัสสำหรับบันทึกผลงานไม่ถูกต้อง!' }, { status: 401 });
    }

    if (!title?.trim()) {
      return json({ success: false, error: 'กรุณากรอกชื่อเรื่อง' }, { status: 400 });
    }

    if (!category) {
      return json({ success: false, error: 'กรุณาเลือกประเภท' }, { status: 400 });
    }

    if (!start_date) {
      return json({ success: false, error: 'กรุณากรอกวันที่' }, { status: 400 });
    }

    const supabase = getSupabase();

    const { error: dbError } = await supabase.from('portfolio_items').insert([
      {
        title: title.trim(),
        description: description?.trim() || null,
        category,
        start_date,
        end_date: end_date?.trim() || null
      }
    ]);

    if (dbError) {
      return json(
        { success: false, error: `เกิดข้อผิดพลาด: ${dbError.message}` },
        { status: 500 }
      );
    }

    return json({ success: true });
  }
};
