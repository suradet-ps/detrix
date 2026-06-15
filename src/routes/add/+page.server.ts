import { getSupabase } from '$lib/supabase/client';
import { error, json, type RequestEvent } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { SECRET_ADD_POST_KEY } from '$env/static/private';

const SECRET_KEY = SECRET_ADD_POST_KEY;
if (!SECRET_KEY) {
  throw new Error('SECRET_ADD_POST_KEY is not configured');
}

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

    const trimmedTitle = title?.trim() ?? '';
    const trimmedDescription = description?.trim() || null;
    const trimmedEndDate = end_date?.trim() || null;

    if (!trimmedTitle) {
      return json({ success: false, error: 'กรุณากรอกชื่อเรื่อง' }, { status: 400 });
    }

    if (trimmedTitle.length > 500) {
      return json({ success: false, error: 'ชื่อเรื่องต้องไม่เกิน 500 ตัวอักษร' }, { status: 400 });
    }

    if (trimmedDescription && trimmedDescription.length > 5000) {
      return json({ success: false, error: 'รายละเอียดต้องไม่เกิน 5,000 ตัวอักษร' }, { status: 400 });
    }

    const validCategories = ['วิทยากร', 'ผลงานวิชาการ', 'การประชุม/อบรม', 'นวัตกรรม'];
    if (!category || !validCategories.includes(category)) {
      return json({ success: false, error: 'กรุณาเลือกประเภทที่ถูกต้อง' }, { status: 400 });
    }

    if (!start_date) {
      return json({ success: false, error: 'กรุณากรอกวันที่' }, { status: 400 });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(start_date)) {
      return json({ success: false, error: 'รูปแบบวันที่ไม่ถูกต้อง (YYYY-MM-DD)' }, { status: 400 });
    }

    if (trimmedEndDate && !/^\d{4}-\d{2}-\d{2}$/.test(trimmedEndDate)) {
      return json({ success: false, error: 'รูปแบบวันที่สิ้นสุดไม่ถูกต้อง (YYYY-MM-DD)' }, { status: 400 });
    }

    const supabase = getSupabase();

    const { error: dbError } = await supabase.from('portfolio_items').insert([
      {
        title: trimmedTitle,
        description: trimmedDescription,
        category,
        start_date,
        end_date: trimmedEndDate
      }
    ]);

    if (dbError) {
      console.error('Database insert error:', dbError.message);
      return json(
        { success: false, error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง' },
        { status: 500 }
      );
    }

    return json({ success: true });
  }
};
