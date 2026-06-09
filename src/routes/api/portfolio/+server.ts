import { json } from '@sveltejs/kit';
import { getSupabase } from '$lib/supabase/client';
import type { RequestHandler } from './$types';

const SECRET_KEY = process.env['VITE_ADD_POST_SECRET_KEY'] as string | undefined;

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { title, description, category, start_date, end_date, secretKey } = body as Record<string, string | undefined>;

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

  const { error: dbError, data } = await supabase
    .from('portfolio_items')
    .insert([
      {
        title: title.trim(),
        description: description?.trim() || null,
        category,
        start_date,
        end_date: end_date?.trim() || null
      }
    ])
    .select()
    .single();

  if (dbError) {
    return json(
      { success: false, error: `เกิดข้อผิดพลาด: ${dbError.message}` },
      { status: 500 }
    );
  }

  return json({ success: true, data }, { status: 201 });
};
