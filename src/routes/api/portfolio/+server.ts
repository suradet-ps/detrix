import { json } from '@sveltejs/kit';
import { getSupabase } from '$lib/supabase/client';
import type { RequestHandler } from './$types';
import { SECRET_ADD_POST_KEY } from '$env/static/private';

const SECRET_KEY = SECRET_ADD_POST_KEY;
if (!SECRET_KEY) {
  throw new Error('SECRET_ADD_POST_KEY is not configured');
}

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const { title, description, category, start_date, end_date, secretKey } = body as Record<string, string | undefined>;

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

  const { error: dbError, data } = await supabase
    .from('portfolio_items')
    .insert([
      {
        title: trimmedTitle,
        description: trimmedDescription,
        category,
        start_date,
        end_date: trimmedEndDate
      }
    ])
    .select()
    .single();

  if (dbError) {
    console.error('Database insert error:', dbError.message);
    return json(
      { success: false, error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง' },
      { status: 500 }
    );
  }

  return json({ success: true, data }, { status: 201 });
};
